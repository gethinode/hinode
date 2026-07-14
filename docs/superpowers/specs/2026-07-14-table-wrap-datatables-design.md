# Design: `wrap` support for data tables

Date: 2026-07-14
Status: Approved
Repositories: `gethinode/hinode`, `gethinode/mod-simple-datatables`, `gethinode/mod-utils`

## Problem

Hinode's table shortcode accepts a `wrap` argument that improves the readability of wide
tables on small devices: below the site's main breakpoint, the last column moves out of the
row and onto a full-width row of its own beneath it.

Separately, the `sortable`, `paginate` and `searchable` arguments turn the table into a data
table, driven by the optional `mod-simple-datatables` module.

The two cannot be combined. `mod-utils` documents this explicitly — the `wrap` argument's
comment in `data/structures/_arguments.yml` ends with *"This setting is not compatible with
data tables."* This design removes that restriction.

### Why they collide today

`layouts/_partials/assets/table.html` implements `wrap` by rendering the table **twice**:

- a *regular* variant, shown at or above the main breakpoint (`d-none d-{bp}-block`);
- a *wrapped* variant, shown below it (`d-{bp}-none`).

The wrapped variant is produced by appending a `{.table-wrap}` class to the Markdown, which
`layouts/_markup/render-table.html` detects. It then drops the last `<th>` and splits every
body row into two `<tr>` elements: one holding the first N−1 cells (bottom border suppressed
with `.table-border-bottom-wrap`) and one holding the last cell as `<td colspan="N-1">`.

When any data table flag is also set, both variants receive the `.data-table` class and the
`data-table-*` attributes, so `mod-simple-datatables` initialises simple-datatables on both.
The wrapped variant's DOM is ragged — N−1 header cells, then alternating rows of N−1 and 1
cells — which simple-datatables' uniform row model cannot represent. Sorting, paging and
searching all operate on that model, so the result is incoherent.

## Constraints

- **`mod-simple-datatables` is optional.** Hinode core must not depend on its JavaScript.
  The wrap for plain tables therefore has to be produced by Hinode, and the wrap for data
  tables has to be produced inside `mod-simple-datatables`. Two implementations of the same
  visual output are structurally unavoidable; they must be kept in sync by convention.
- **Plain tables must render correctly without JavaScript** and must remain real tables for
  assistive technology. This rules out a CSS-grid reflow (`display: grid` on a `<table>`
  drops its table semantics from the accessibility tree) and rules out moving the plain-table
  wrap into JavaScript.
- Data tables already require JavaScript, so producing their wrapped layout in JavaScript
  costs nothing.

## Key library facts

Verified against the vendored `simple-datatables` v10.2.0 bundle:

- `tableRender(data, vdom, type)` is invoked with `type` of `"main"`, `"header"`, `"print"`
  or `"message"`. Returning a node replaces the virtual DOM for that render.
- The `<table>` element's original attributes are captured once into `_tableAttributes` and
  re-applied on every render, so a `data-table-wrap` marker attribute survives re-renders.
- `THEAD` is unshifted to `childNodes[0]`, ahead of `TBODY`. (`mod-simple-datatables`'
  existing header-styling hook already relies on this.)
- `dt.update(true)` forces a full re-render while preserving the current sort, page and
  search term. `dt.refresh()` also re-renders but clears the search, so it is not suitable
  here.
- Sorting, searching and paging all run against the internal data model, never against the
  rendered DOM. A `tableRender` transform is therefore purely cosmetic.

## Design

### 1. Hinode — `layouts/_partials/assets/table.html`

Collapse to a **single** `RenderString` call producing a **single** `<table>`. Two wrap
strategies, chosen by whether the table is a data table:

**Plain table (`wrap` set, no `sortable`/`paginate`/`searchable`):**
append `{.table-wrap}` to the Markdown as today. The render hook emits the hybrid markup
described in section 2.

**Data table (`wrap` set together with any data table flag):**
do *not* append `{.table-wrap}`. Emit a uniform table and add `data-table-wrap="true"` plus
`data-table-wrap-breakpoint="<site.Params.main.breakpoint>"` alongside the existing
`data-table-*` attributes.

The plain path needs no breakpoint attribute: it encodes the breakpoint in the `d-{bp}-*`
utility classes it emits. Both paths resolve the breakpoint from the same source
(`site.Params.main.breakpoint`), as does the SCSS in section 4, so all three switch at the
same width.

The `$regular` / `$wrapped` duality, the second `RenderString` call, and the second
`.table-responsive` wrapper are all removed.

**Guard:** if the resolved main breakpoint is `xs`, `wrap` is a no-op. Bootstrap has no `xs`
display-utility infix, so `d-xs-none` does not exist. (This is a latent bug in the current
implementation, not a new one.)

### 2. Hinode — `layouts/_markup/render-table.html`

When `.table-wrap` is present, emit one table carrying both layouts rather than a
mobile-only structure:

```html
<table class="table table-wrap">
  <thead>
    <tr>
      <th>Name</th>
      <th>Type</th>
      <th class="d-none d-md-table-cell">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="table-border-bottom-wrap">alpha</td>
      <td class="table-border-bottom-wrap">widget</td>
      <td class="d-none d-md-table-cell">A long description…</td>
    </tr>
    <tr class="d-md-none">
      <td colspan="2">A long description…</td>
    </tr>
  </tbody>
</table>
```

The breakpoint infix (`md` above) comes from `site.Params.main.breakpoint`.

Only the last column's content is duplicated, instead of the entire table. The rendered
appearance is unchanged at every width: below the breakpoint the last header and last cell
are hidden and the `colspan` row shows; at or above it, the `colspan` row is hidden and the
table reads normally.

Consequences beyond the size reduction: the Markdown is parsed once instead of twice, and
Flexsearch no longer indexes the full text of every wrapped table twice.

### 3. mod-simple-datatables — `assets/js/modules/simple-datatables/simple-datatables.load.js`

For each `.data-table`, read `data-table-wrap`. When it is `"true"`:

1. Build `window.matchMedia("(max-width: <breakpoint - 0.02px>)")` from
   `data-table-wrap-breakpoint`, following Bootstrap's `media-breakpoint-down` convention.
2. Install a `tableRender` hook, composed with the existing header-styling hook, that
   transforms the virtual DOM **only when `type === "main"` and the media query matches**:
   - remove the last `<th>` from `THEAD`;
   - for each `TBODY` row, move the last cell into a new `<tr>` inserted immediately after,
     as a single `<td colspan="N-1">`, and add `table-border-bottom-wrap` to the N−1 cells
     that remain in the original row.
   Bail out unchanged when fewer than two cells are present.
3. Register a `change` listener on the media query that calls `dt.update(true)`, so crossing
   the breakpoint re-renders in the other mode without losing sort, page or search state.

`type === "message"` (the "no rows" / "no results" placeholder) and `type === "header"` (the
sticky-header clone) are left untouched. `type === "print"` is left unwrapped.

Because the data model stays uniform, pager row counts, sort order and search results are all
correct. The existing category-filter integration continues to work unchanged; it now
registers one DataTable instance per table instead of two.

### 4. Hinode — styling and build configuration

- Add `main-breakpoint` (from `site.Params.main.breakpoint`, default `md`) to the `$vars`
  dict in `layouts/_partials/head/stylesheet.html`, mirroring the existing `navbar-size`
  entry.
- In `assets/scss/components/_table.scss`, scope the border-suppression rule under
  `media-breakpoint-down(#{$main-breakpoint})` instead of applying it unconditionally. This
  is now required, because a single table serves both widths.
- Add `table-border-bottom-wrap` to the PurgeCSS `standard` safelist in
  `config/postcss.config.js`. In the data table path that class is added only by JavaScript,
  so it never reaches `hugo_stats.json` and would otherwise be purged on any site that uses
  `wrap` exclusively with data tables.

### 5. Documentation

- `mod-utils`: remove *"This setting is not compatible with data tables."* from the `wrap`
  comment in `data/structures/_arguments.yml`.
- Hinode: add a `release` marker to `wrap` in `data/structures/table.yml`.

## Behaviour decisions

**The last column's header is dropped below the breakpoint**, for data tables exactly as for
plain tables. That column therefore cannot be sorted on small screens; sorting by it still
works at or above the breakpoint. This keeps wrapped data tables visually identical to
wrapped plain tables, and the wrapped column is in practice a free-text description that
nobody sorts on.

**One DataTable instance per table.** The alternative — keeping two rendered tables and making
the wrapped one data-table-safe — would leave two live instances with independent state, so
resizing across the breakpoint would silently reset the reader's sort, page and search term,
and would double the DOM and the controls.

## Testing

- A wrapped data table with `sortable`, `paginate`, `searchable` and `filter` all enabled:
  verify below the breakpoint that the layout wraps, the pager counts data rows (not DOM
  rows), sorting keeps each description attached to its record, search matches against the
  wrapped column, and the category filter still applies.
- Resize across the breakpoint with a sort, a page and a search term active: verify the
  layout switches and all three survive.
- A wrapped plain table: verify the rendered appearance is unchanged from the current
  implementation at both widths, and that it still renders correctly with JavaScript
  disabled.
- A wrapped table with two columns (N−1 = 1) and with a single column: verify no breakage.
- A wrapped data table whose search yields no results: verify the "no results" message
  renders normally.
- `npm run lint` and `npm run build:example` clean.
