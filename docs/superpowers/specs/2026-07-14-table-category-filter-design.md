# Design: fix the table category filter

Date: 2026-07-14
Status: Approved
Repositories: `gethinode/hinode`, `gethinode/mod-simple-datatables`

## Problem

The table shortcode's category filter renders a button group above a table and narrows the
rows to a chosen category. It has never worked from Markdown, and it is broken in five
independent ways.

**1. It is unreachable.** `layouts/_shortcodes/table.html` forwards `breakpoint`, `class`,
`sortable`, `paginate`, `pagination`, `pagination-select`, `searchable`, `wrap` and `wrapper`
to `assets/table.html` — but never `filter` or `filter-col`. Both are declared in
`data/structures/table.yml`, so `{{< table filter="widget,gadget" >}}` validates cleanly and
then does nothing at all.

**2. Forwarding alone would not fix it.** `filter`'s type in `_arguments.yml` is
`[string, slice]`, and a shortcode named parameter is *always* a string. mod-utils validates
an argument's kind against `accepts` but does **not** cast between kinds. The partial would
therefore receive the raw string `"widget,gadget"` and reach `{{ range $filter }}`, which Hugo
cannot iterate over a string. Something has to split it.

**3. The behaviour lives in an optional module.** Hinode core renders the filter buttons, but
the click handler lives in `mod-simple-datatables`' `simple-datatables.load.js`. That module
declares `integration = "optional"`, and Hinode loads an optional module's assets only for
pages whose frontmatter lists it. A filter-only table — no sorting, no paging, no search —
therefore renders buttons that are inert unless the page adds
`modules: ["simple-datatables"]`.

**4. The DOM fallback breaks on wrapped tables.** When no DataTable is active, the filter
falls back to toggling `display` on each `tbody tr`, reading `row.cells[col]`. A wrapped
table renders two rows per record, and the second holds a single `<td colspan>`. With the
default `filter-col = 1`, `cells[1]` is `undefined` on that row, so its text reads as empty
and the row is hidden as soon as any filter is active — the record keeps its data row but
loses its description.

**5. The i18n keys do not exist.** `tableFilterLabel` and `tableFilterAll` are absent from
every file in `i18n/`. The partial survives only because it calls `T` with a `| default`
fallback, so the strings are untranslatable and emit i18n warnings.

## Decision: the filter is a data-table feature

The filter was originally built to work without a DataTable — commit `63a88070`'s fallback
branch is commented *"direct DOM row toggling when no DataTable is active on the table (e.g.
filter-only without sortable/paginate/searchable)"*, and `table.yml`'s comment deliberately
lists only sorting, paging and searching as needing the module. That original intent is
reversed here, deliberately.

The reason is not that a plain-table filter is unreasonable, but that the fallback is a
*second, inferior implementation of the same feature*. It toggles `display` and composes with
nothing, whereas `dt.search()` filters through simple-datatables' row model, so the filter
survives sorting, pagination and free-text search. It is also the branch carrying defect 4.
Two implementations of one feature, one of them broken, is the thing worth deleting.

### `filter` implies a data table

To keep the argument self-sufficient, setting `filter` alone marks the table as a data table.
simple-datatables then initialises with sorting, paging and search all off, and `dt.search()`
still filters it.

This is safe: in the vendored simple-datatables v10.2.0, `options.searchable` gates only the
rendering of the search *input* and the addition of a wrapper class. It does **not** guard the
public `search()` method. A DataTable with every feature disabled is still a filterable one.

The user therefore never has to enable sorting they do not want in order to get filtering.

## Design

### 1. Hinode — `layouts/_shortcodes/table.html`

Forward `filter` and `filter-col` to `assets/table.html`, alongside the arguments it already
passes.

### 2. Hinode — `layouts/_partials/assets/table.html`

**Normalise `filter`.** Accept both kinds the type declares. A slice is used as-is; a string
is split on commas, with surrounding whitespace trimmed from each value and empty values
dropped, so `filter="widget, gadget"` behaves like `filter="widget,gadget"`.

**Make `filter` imply a data table.** The existing `$dataTable` condition becomes
`or $args.sortable $args.paginate $args.searchable $args.filter`, so a filtered table always
receives the `data-table` class and is picked up by simple-datatables. The `data-filter-col`
and `data-filter-id` attributes are unchanged.

**Warn when the module is not loaded.** A data table needs the module's JavaScript *and* its
per-page stylesheet, and both are gated on the page opting in. When the partial renders a data
table on a page whose `modules` frontmatter does not list `simple-datatables`, emit a
`LogWarn` naming the page and telling the author to add
`modules: ["simple-datatables"]`. This covers `sortable`, `paginate` and `searchable` too, all
of which fail silently today.

**Drop the `data-filter-container` attribute** from the `.table-responsive` wrapper. It is
read only by the DOM fallback that section 3 deletes, so it becomes dead markup.

Note on why the opt-in cannot be automated: `utilities/AddModule.html` exists to let a partial
declare a module dependency at render time, and `footer/scripts.html` honours it — but the
module's CSS is a separate per-page stylesheet emitted by `head/head.html`, which runs *before*
the content is rendered and therefore cannot see a render-time dependency. Auto-loading would
attach the JavaScript without the CSS. Fixing that means redesigning module loading, which is
out of scope; a loud build warning is the honest alternative.

### 3. mod-simple-datatables — `simple-datatables.load.js`

Delete the DOM-fallback branch of the filter click handler. Every filtered table is now a
DataTable, so the branch is unreachable — and it is the one carrying the wrapped-table bug.
The handler reduces to: update the active button state, then call
`dt.search(filterValue, [filterCol], 'category-filter')` on each registered instance.

The named `'category-filter'` search source stays independent of the built-in search input, so
a category filter and a free-text search narrow the result set simultaneously.

### 4. Hinode — `layouts/_partials/utilities/AddModule.html`

Fix a latent bug found while designing this. The partial reads the current `dependencies`
scratch and then does:

```hugo
{{- $dependencies = complement $dependencies (slice .) -}}
{{- page.Scratch.Set "dependencies" $dependencies -}}
```

Hugo's `complement` returns the elements of the **last** collection that are not in the
others — verified empirically: `complement (slice "alpha") (slice "beta")` is `[beta]`, and
`complement (slice "alpha") (slice "alpha")` is `[]`. So the partial *replaces* the dependency
list with the single module being added, discarding everything already there — and re-adding a
module that is already present wipes the list entirely.

Replace the body with an append-and-deduplicate, matching what `head/head.html:22` and
`footer/scripts.html:126` already do when they read the scratch:

```hugo
{{- $dependencies = $dependencies | append . | uniq -}}
```

The partial is currently unused, so this is latent rather than active. It is fixed here
because the filter design depends on understanding it, and it is a landmine for the next
caller.

### 5. Hinode — `i18n/*.yaml`

Add `tableFilterLabel` (the button group's `aria-label`) and `tableFilterAll` (the label of
the always-present "show everything" button) to **all eight** language files: `en`, `nl`, `fr`,
`de`, `pl`, `pt-br`, `zh-hans`, `zh-hant`.

The English strings are `Filter` and `All`, matching the `| default` fallbacks the partial
uses today, so no rendered output changes for an English site. The other seven are translated
in kind; the two keys are short UI labels, not sentences.

Note that these belong in **Hinode's** i18n, not the module's: Hinode's partial renders the
buttons. The module's own i18n (`tablePlaceholder`, `tablesSearchTitle`, …) stays where it is,
and covers only the four languages that module ships.

### 6. Hinode — `data/structures/table.yml`

The structure comment reads *"Sorting, paging, and searching require the simple-datatables
module."* Add filtering to that list.

## Behaviour after the change

`{{< table filter="widget,gadget" >}}` renders a button group with an "All" button plus one
button per category, and filters rows by the text content of the column at `filter-col`
(zero-indexed, default `1`). It works with or without `sortable`, `paginate` and `searchable`,
and composes with all of them, because filtering runs through the row model rather than the
DOM. It works on a wrapped table, because the wrapped layout is produced by `tableRender` from
an already-filtered row model.

It requires the page to declare `modules: ["simple-datatables"]`, and says so at build time if
it does not.

## Testing

- Extend `exampleSite/content/en/table-demo.md` with a filter-only table (no `sortable` /
  `paginate` / `searchable`) and a filter-plus-wrap table.
- Verify in a browser: clicking a category narrows the rows; "All" restores them; the active
  button state follows the click.
- Verify the filter composes: with `sortable` and `paginate` on, a filter survives a sort and
  the pager recounts to the filtered set.
- Verify filter + wrap below the breakpoint: a filtered-out record's description row
  disappears along with its data row — the defect-4 scenario.
- Verify the build warning fires on a page that uses a data table without the frontmatter key,
  and does not fire on one that has it.
- Verify `filter="widget, gadget"` (with a space) yields two buttons, not one with a leading
  space.
- Verify a `filter` passed as a real slice from a partial caller still works.
- `npm run lint` and a clean `hugo` build of the exampleSite, with no i18n warnings.
