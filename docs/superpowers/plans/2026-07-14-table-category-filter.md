# Table Category Filter Fix — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the table shortcode's category filter actually work from Markdown, as a data-table feature.

**Architecture:** The filter becomes a data-table feature. Hinode's shortcode forwards `filter` / `filter-col`; the partial normalizes a comma-separated string into a slice and marks any filtered table as a data table, so simple-datatables always initialises and `dt.search()` always drives the filtering. That makes the module's DOM-fallback branch unreachable, so it is deleted along with the wrapped-table bug it carries. Because a data table needs the module's JS *and* its per-page CSS — both gated on page opt-in — the partial warns at build time when the page has not opted in.

**Tech Stack:** Hugo templates, shortcodes and render hooks; simple-datatables v10.2.0; Hugo i18n.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-14-table-category-filter-design.md`. Read it first.
- Two repositories, siblings under `/Users/mark/Development/GitHub/gethinode/`: `hinode` (branch
  `fix/table-category-filter`, already created and checked out, carrying the spec commit) and
  `mod-simple-datatables` (currently on `main` — Task 5 branches it).
- **`filter` implies a data table.** Setting `filter` alone must add the `data-table` class. This is
  safe: in simple-datatables v10.2.0 `options.searchable` gates only the search *input* and a wrapper
  class — it does **not** guard the public `search()` method. A DataTable with sorting, paging and
  search all off is still filterable.
- `filter`'s declared type is `[string, slice]`. A shortcode named parameter is **always** a string,
  and mod-utils validates an argument's kind against `accepts` **without casting between kinds**. The
  partial must therefore split a string itself. `range` over a string is a Hugo error.
- `filter-col` is zero-indexed and defaults to `1`.
- Per `CLAUDE.md`: never use `or` as fallback logic for a boolean argument — `or false <fallback>`
  returns the fallback and discards an explicit `false`.
- Commits follow Angular Conventional Commits (a commitlint pre-commit hook enforces this). Body
  lines must not exceed 100 characters. If a hook reformats files, re-stage and commit again.
- **The branch must contain at least one `feat:` or `fix:` commit**, because gethinode merges with
  merge commits and semantic-release reads the individual commits, not the PR title. `refactor`,
  `style`, `test`, `chore`, `docs` and `build` produce **no release**.
- **Never run `npm run build:example` or `npm run start:example`** — their prebuild hooks re-vendor
  Hugo modules from the remote and would wipe the local `mod-simple-datatables` override that Task 5
  needs. Use the project-pinned binary with `node_modules/.bin` on `PATH`:

  ```bash
  PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn
  ```

  (The `PATH` entry is required or Hugo cannot find PostCSS.)
- Export the scratch path once per shell:

  ```bash
  export SCRATCH=/private/tmp/claude-501/-Users-mark-Development-GitHub-gethinode-hinode/491eb2c0-b0cd-401d-9256-134afea0e318/scratchpad
  ```

- An existing scratch script `$SCRATCH/verify-table-wrap.mjs` guards the (already-shipped) wrap
  feature. Task 3 adds tables to the shared fixture page, which changes its table count — Task 3
  updates that script accordingly. Neither script is committed.

## File Structure

| File | Repo | Responsibility |
| --- | --- | --- |
| `i18n/*.yaml` (8 files) | hinode | The filter button group's two UI strings. |
| `data/structures/table.yml` | hinode | Structure comment: filtering also needs the module. |
| `layouts/_partials/utilities/AddModule.html` | hinode | Render-time module dependency (currently broken). |
| `layouts/_shortcodes/table.html` | hinode | Forwards `filter` / `filter-col` to the partial. |
| `layouts/_partials/assets/table.html` | hinode | Normalizes `filter`; `filter` implies a data table; warns on missing opt-in. |
| `exampleSite/content/en/table-demo.md` | hinode | Fixture: a filter-only table and a filter + sort + wrap table. |
| `assets/js/modules/simple-datatables/simple-datatables.load.js` | mod-simple-datatables | Filter click handler; the DOM fallback is deleted. |

---

### Task 1: i18n strings and the structure comment

Independent of everything else, and lands the strings before any task renders a filter button, so no
i18n warnings are ever emitted.

**Files:**

- Modify: `i18n/en.yaml`, `i18n/nl.yaml`, `i18n/de.yaml`, `i18n/fr.yaml`, `i18n/pl.yaml`,
  `i18n/pt-br.yaml`, `i18n/zh-hans.yaml`, `i18n/zh-hant.yaml`
- Modify: `data/structures/table.yml:1-3`

**Interfaces:**

- Produces: the i18n ids `tableFilterLabel` and `tableFilterAll`, which
  `layouts/_partials/assets/table.html` already calls via `T`.

- [ ] **Step 1: Add the two keys to all eight language files**

The files are flat YAML lists of `- id:` / `translation:` pairs. Append both entries to the end of
each file, keeping the existing two-space indentation under `translation`.

`i18n/en.yaml`:

```yaml
- id: tableFilterLabel
  translation: "Filter"
- id: tableFilterAll
  translation: "All"
```

`i18n/nl.yaml`:

```yaml
- id: tableFilterLabel
  translation: "Filter"
- id: tableFilterAll
  translation: "Alle"
```

`i18n/de.yaml`:

```yaml
- id: tableFilterLabel
  translation: "Filter"
- id: tableFilterAll
  translation: "Alle"
```

`i18n/fr.yaml`:

```yaml
- id: tableFilterLabel
  translation: "Filtre"
- id: tableFilterAll
  translation: "Tout"
```

`i18n/pl.yaml`:

```yaml
- id: tableFilterLabel
  translation: "Filtr"
- id: tableFilterAll
  translation: "Wszystkie"
```

`i18n/pt-br.yaml`:

```yaml
- id: tableFilterLabel
  translation: "Filtro"
- id: tableFilterAll
  translation: "Todos"
```

`i18n/zh-hans.yaml`:

```yaml
- id: tableFilterLabel
  translation: "筛选"
- id: tableFilterAll
  translation: "全部"
```

`i18n/zh-hant.yaml`:

```yaml
- id: tableFilterLabel
  translation: "篩選"
- id: tableFilterAll
  translation: "全部"
```

The English strings match the `| default` fallbacks the partial already uses, so no English site's
rendered output changes.

- [ ] **Step 2: Update the structure comment**

In `data/structures/table.yml`, the file opens with:

```yaml
comment: >-
  Makes a Markdown table responsive with horizontal scrolling on smaller screens.
  Sorting, paging, and searching require the simple-datatables module.
```

Change the second sentence to include filtering:

```yaml
comment: >-
  Makes a Markdown table responsive with horizontal scrolling on smaller screens.
  Sorting, paging, searching, and filtering require the simple-datatables module.
```

- [ ] **Step 3: Verify every key parses and resolves**

```bash
export SCRATCH=/private/tmp/claude-501/-Users-mark-Development-GitHub-gethinode-hinode/491eb2c0-b0cd-401d-9256-134afea0e318/scratchpad
for f in i18n/*.yaml; do node -e "
  const y=require('fs').readFileSync('$f','utf8');
  const ids=[...y.matchAll(/^- id: (\S+)/gm)].map(m=>m[1]);
  const dup=ids.filter((v,i)=>ids.indexOf(v)!==i);
  const missing=['tableFilterLabel','tableFilterAll'].filter(k=>!ids.includes(k));
  console.log('$f', missing.length?'MISSING '+missing:'ok', dup.length?'DUPLICATE '+dup:'');
"; done
```

Expected: `ok` for all eight files, and no duplicates.

- [ ] **Step 4: Build with i18n warnings on**

```bash
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --printI18nWarnings --logLevel warn 2>&1 | grep -i "i18n\|ERROR" || echo "no i18n warnings"
```

Expected: `no i18n warnings`.

- [ ] **Step 5: Lint and commit**

```bash
npm test
git add i18n data/structures/table.yml
git commit -m "fix(i18n): add the missing table filter translations

tableFilterLabel and tableFilterAll were called by the table partial but existed
in no language file, so they were untranslatable and emitted i18n warnings. The
partial only rendered because it passes a default to T.

Also records in the table structure that filtering, like sorting, paging and
searching, needs the simple-datatables module."
```

---

### Task 2: Fix `AddModule.html`

A latent bug found while designing this. The partial is currently unused, so nothing changes
behaviourally — but it is the sanctioned way for a partial to declare a render-time module
dependency, and it is a landmine for the next caller.

**Files:**

- Modify: `layouts/_partials/utilities/AddModule.html`

**Interfaces:**

- Produces: `partial "utilities/AddModule.html" (dict "module" "<name>")` appends `<name>` to the
  page's `dependencies` scratch without discarding what is already there.

- [ ] **Step 1: Write a failing test**

The partial is unused in the theme, so build a throwaway Hugo site that exercises it directly.

```bash
export SCRATCH=/private/tmp/claude-501/-Users-mark-Development-GitHub-gethinode-hinode/491eb2c0-b0cd-401d-9256-134afea0e318/scratchpad
T=$SCRATCH/addmodule-test
rm -rf $T && mkdir -p $T/layouts/_partials/utilities $T/content
printf 'title = "t"\nbaseURL = "/"\n' > $T/hugo.toml
printf -- '---\ntitle: x\n---\n' > $T/content/_index.md
cp layouts/_partials/utilities/AddModule.html $T/layouts/_partials/utilities/
cat > $T/layouts/index.html <<'EOF'
{{ partial "utilities/AddModule.html" (dict "module" "alpha") }}
{{ partial "utilities/AddModule.html" (dict "module" "beta") }}
{{ partial "utilities/AddModule.html" (dict "module" "alpha") }}
RESULT: {{ delimit (page.Scratch.Get "dependencies") "," }}
EOF
node_modules/.bin/hugo --quiet -s $T --destination $T/public
grep RESULT $T/public/index.html
```

Expected (the bug): `RESULT:` — an **empty** list. Adding `beta` discarded `alpha`, then re-adding
`alpha` wiped the list entirely.

Why: the partial calls `complement $dependencies (slice .)`, and Hugo's `complement` returns the
elements of the **last** collection that are not in the others. So `complement ["alpha"] ["beta"]`
is `["beta"]` — and the partial then *sets* `dependencies` to that, replacing rather than appending.
`complement ["alpha"] ["alpha"]` is `[]`, which empties it.

- [ ] **Step 2: Fix the partial**

Replace the whole of `layouts/_partials/utilities/AddModule.html` with:

```hugo
{{ with .module }}
	{{- $dependencies := page.Scratch.Get "dependencies" -}}
	{{- if reflect.IsSlice $dependencies -}}
		{{- $dependencies = $dependencies | append . | uniq -}}
	{{ else }}
		{{- $dependencies = slice . -}}
	{{ end }}
	{{- page.Scratch.Set "dependencies" $dependencies -}}
{{ end }}
```

This matches how `head/head.html:22` and `footer/scripts.html:126` already merge the scratch when
they read it (`append … | uniq`). Keep the file's existing tab indentation.

- [ ] **Step 3: Re-run the test**

```bash
cp layouts/_partials/utilities/AddModule.html $SCRATCH/addmodule-test/layouts/_partials/utilities/
node_modules/.bin/hugo --quiet -s $SCRATCH/addmodule-test --destination $SCRATCH/addmodule-test/public
grep RESULT $SCRATCH/addmodule-test/public/index.html
```

Expected: `RESULT: alpha,beta` — both modules retained, and the duplicate `alpha` deduplicated
rather than destroying the list.

- [ ] **Step 4: Lint and commit**

```bash
npm test
git add layouts/_partials/utilities/AddModule.html
git commit -m "fix(utilities): stop AddModule discarding existing dependencies

AddModule used complement to add a module to the page's dependencies scratch,
but complement returns the elements of the LAST collection absent from the
others - so it replaced the list with the single module being added, and wiped
it entirely when re-adding one already present. Append and deduplicate instead,
matching how head.html and scripts.html merge the same scratch."
```

---

### Task 3: Wire the filter up, and make it imply a data table

The core of the fix. After this task the filter is reachable from Markdown and renders as a data
table.

**Files:**

- Modify: `layouts/_shortcodes/table.html:22-35`
- Modify: `layouts/_partials/assets/table.html:19-59` and `:110`
- Modify: `exampleSite/content/en/table-demo.md`

**Interfaces:**

- Consumes: the i18n ids `tableFilterLabel` / `tableFilterAll` (Task 1).
- Produces: on a filtered table, the `data-table` class plus the attributes
  `data-filter-col="<int>"` and `data-filter-id="table-filter-<hash>"`; a button group whose buttons
  carry `data-filter-table="<same id>"` and `data-filter-value="<category>"` (empty for "All").
  Task 5's JavaScript reads all of these. The `data-filter-container` attribute is **removed**.

- [ ] **Step 1: Add the fixture tables**

Append to `exampleSite/content/en/table-demo.md`. The page's frontmatter already declares
`modules: ["simple-datatables"]`, which the filter needs.

````markdown
## Filter-only table

{{< table filter="widget, gadget" filter-col="1" class="fixture-filter" >}}
| Name    | Type   | Description                                                        |
|---------|--------|--------------------------------------------------------------------|
| alpha   | widget | The first record, with a description long enough to need wrapping.  |
| bravo   | gadget | The second record, also with a fairly long trailing description.    |
| charlie | widget | The third record. Short.                                            |
| delta   | gadget | The fourth record, whose description runs on for a little while.    |
{{< /table >}}

## Filtered, sortable, wrapped data table

{{< table filter="widget,gadget" filter-col="1" sortable="true" paginate="true" pagination="2" wrap="true" class="fixture-filter-wrap" >}}
| Name    | Type   | Description                                                        |
|---------|--------|--------------------------------------------------------------------|
| alpha   | widget | The first record, with a description long enough to need wrapping.  |
| bravo   | gadget | The second record, also with a fairly long trailing description.    |
| charlie | widget | The third record. Short.                                            |
| delta   | gadget | The fourth record, whose description runs on for a little while.    |
{{< /table >}}
````

Note the deliberate space in `filter="widget, gadget"` on the first table — it exercises the
whitespace trimming.

- [ ] **Step 2: Write the failing verification script**

Create `$SCRATCH/verify-table-filter.mjs` (scratch — never commit it):

```js
import { readFileSync } from 'node:fs'

const html = readFileSync('exampleSite/public/en/table-demo/index.html', 'utf8')

const checks = []
const check = (name, pass, detail = '') => checks.push({ name, pass, detail })

// Pull out each fixture table's <table> start tag, matching the class as an exact token.
// A substring match would make `fixture-filter` also match `fixture-filter-wrap`.
const tag = cls => {
  for (const m of html.matchAll(/<table class="([^"]*)"[^>]*>/g)) {
    if (m[1].split(/\s+/).includes(cls)) return m[0]
  }
  return ''
}
const filterOnly = tag('fixture-filter')
const filterWrap = tag('fixture-filter-wrap')

check('filter-only table is rendered', filterOnly.length > 0)
check('filter+wrap table is rendered', filterWrap.length > 0)

// `filter` implies a data table: the class must be present even with no sortable/paginate/searchable.
check(
  'filter alone marks the table as a data table',
  /\bdata-table\b/.test(filterOnly),
  filterOnly
)
check(
  'filter alone does NOT enable sorting/paging/search',
  !/data-table-sortable|data-table-paging|data-table-searchable/.test(filterOnly)
)

// The filter attributes the JavaScript reads.
check('filter-only table carries data-filter-col', /data-filter-col=1/.test(filterOnly))
check('filter-only table carries data-filter-id', /data-filter-id=table-filter-\w+/.test(filterOnly))

// The button group: one "All" button plus one per category.
const allBtns = html.match(/data-filter-value=""/g) ?? []
check('an All button per filtered table', allBtns.length === 2, `found ${allBtns.length}`)
check('a widget button exists', /data-filter-value="widget"/.test(html))
check('a gadget button exists', /data-filter-value="gadget"/.test(html))

// The space in filter="widget, gadget" must be trimmed, not carried into the value.
// Anchor inside the attribute: a bare /\s"/ would match whitespace before almost any quote.
const padded = [...html.matchAll(/data-filter-value="([^"]*)"/g)]
  .map(m => m[1])
  .filter(v => v !== v.trim())
check(
  'whitespace around a category value is trimmed',
  padded.length === 0,
  `padded values: ${JSON.stringify(padded)}`
)

// data-filter-container was only ever read by the deleted DOM fallback.
check('data-filter-container is gone', !/data-filter-container/.test(html))

// The filter+wrap table is still a proper wrapped data table.
check(
  'filter+wrap table is a wrapped data table',
  /data-table-wrap=true/.test(filterWrap) && /data-table-sortable=true/.test(filterWrap)
)

let failed = 0
for (const { name, pass, detail } of checks) {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${pass || !detail ? '' : ` — ${detail}`}`)
  if (!pass) failed++
}
console.log(`\n${checks.length - failed}/${checks.length} passing`)
process.exit(failed ? 1 : 0)
```

- [ ] **Step 3: Build and watch it fail**

```bash
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn \
  && node "$SCRATCH/verify-table-filter.mjs"
```

Expected: **FAIL**. The shortcode does not forward `filter`, so neither fixture table renders any
filter attributes or buttons at all. Record the output as the baseline.

- [ ] **Step 4: Forward the arguments from the shortcode**

In `layouts/_shortcodes/table.html`, the partial call currently ends with `"wrapper"` and
`"_default"`. Add the two filter arguments before `"_default"`:

```hugo
    {{ partial "assets/table.html" (dict
        "page"                   .Page
        "input"                  .Inner
        "breakpoint"             $args.breakpoint
        "class"                  $args.class
        "sortable"               $args.sortable
        "paginate"               $args.paginate
        "pagination"             (or $args.pagination $args.pagingOptionPerPage)
        "pagination-select"      (or $args.paginationSelect $args.pagingOptionPageSelect)
        "searchable"             $args.searchable
        "filter"                 $args.filter
        "filter-col"             $args.filterCol
        "wrap"                   $args.wrap
        "wrapper"                $args.wrapper
        "_default"               $args.default
    ) }}
```

- [ ] **Step 5: Normalize `filter` and make it imply a data table**

In `layouts/_partials/assets/table.html`, the "Initialize local variables" block currently reads:

```hugo
{{/* Initialize local variables */}}
{{ $breakpoint := site.Params.main.breakpoint | default "md" }}
{{ $dataTable := or $args.sortable $args.paginate $args.searchable }}
{{ $wrap := and $args.wrap (ne $breakpoint "xs") }}
```

Replace it with:

```hugo
{{/* Initialize local variables */}}
{{ $breakpoint := site.Params.main.breakpoint | default "md" }}

{{/* `filter` accepts a slice or a comma-separated string. A shortcode named parameter is always a
     string, and InitArgs validates an argument's kind without casting between kinds, so a string
     arrives here unsplit - and `range` cannot iterate a string. Normalize to a slice of trimmed,
     non-empty values, so `filter="widget, gadget"` behaves like `filter="widget,gadget"`. */}}
{{ $filter := slice }}
{{ with $args.filter }}
    {{ $values := . }}
    {{ if not (reflect.IsSlice $values) }}{{ $values = split (printf "%v" $values) "," }}{{ end }}
    {{ range $values }}
        {{ $value := trim (printf "%v" .) " " }}
        {{ if $value }}{{ $filter = $filter | append $value }}{{ end }}
    {{ end }}
{{ end }}

{{/* Filtering runs through simple-datatables' row model, so it composes with sorting, paging and
     free-text search. A filtered table is therefore always a data table, even when all three are
     off: the library still initializes, and `search()` still filters it - `searchable` gates only
     the search input, not the method. This keeps `filter` self-sufficient, so an author never has
     to switch on sorting they do not want just to get filtering. */}}
{{ $dataTable := or $args.sortable $args.paginate $args.searchable (gt (len $filter) 0) }}
{{ $wrap := and $args.wrap (ne $breakpoint "xs") }}
```

- [ ] **Step 6: Use the normalized filter in the Filter block**

Further down, the Filter block currently reads:

```hugo
{{/* Filter */}}
{{ $filter := $args.filter }}
{{ $filterCol := $args.filterCol | default 1 }}
```

`$filter` is now defined above, so drop its re-declaration:

```hugo
{{/* Filter */}}
{{ $filterCol := $args.filterCol | default 1 }}
```

Leave the rest of that block (`$filterId`, the `data-filter-col` / `data-filter-id` attributes) and
the button-group markup exactly as they are — `{{ range $filter }}` now iterates a real slice.

- [ ] **Step 7: Drop the dead `data-filter-container` attribute**

The `.table-responsive` wrapper currently reads:

```hugo
        <div class="table-responsive{{- with $args.breakpoint }}-{{ . }}{{ end }} {{ $wrapper }}"{{ if $filter }} data-filter-container="{{ $filterId }}"{{ end }}>
```

That attribute is read only by the DOM fallback deleted in Task 5. Replace the line with:

```hugo
        <div class="table-responsive{{- with $args.breakpoint }}-{{ . }}{{ end }} {{ $wrapper }}">
```

- [ ] **Step 8: Verify a `filter` passed as a real slice still works**

The normalization has a `reflect.IsSlice` branch that no Markdown fixture can reach — a shortcode
parameter is always a string. Exercise it by calling the partial directly from a **temporary**
shortcode, so the real partial is under test.

```bash
mkdir -p exampleSite/layouts/_shortcodes
cat > exampleSite/layouts/_shortcodes/table-slice-test.html <<'EOF'
{{ partial "assets/table.html" (dict
    "page"       .Page
    "input"      .Inner
    "filter"     (slice "widget" "gadget")
    "filter-col" 1
) }}
EOF
cat > exampleSite/content/en/table-slice-test.md <<'EOF'
---
title: Table Slice Test
modules: ["simple-datatables"]
---

{{< table-slice-test >}}
| Name  | Type   |
|-------|--------|
| alpha | widget |
| bravo | gadget |
{{< /table-slice-test >}}
EOF
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn
grep -o 'data-filter-value="[^"]*"' exampleSite/public/en/table-slice-test/index.html | sort -u
```

Expected: three values — `""` (the All button), `"widget"` and `"gadget"`. A Hugo error, or a single
button, means the slice branch is broken.

Now remove the temporary files:

```bash
rm exampleSite/content/en/table-slice-test.md exampleSite/layouts/_shortcodes/table-slice-test.html
rmdir exampleSite/layouts/_shortcodes 2>/dev/null || true
```

- [ ] **Step 9: Update the wrap script's table count**

The fixture page now holds five tables, not three. In `$SCRATCH/verify-table-wrap.mjs`, change the
first check's expectation:

```js
check('one table per shortcode', tables.length === 5, `found ${tables.length}`)
```

Leave the `colspanRows.length === 6` expectation alone: the two new tables add none — the filter-only
table does not wrap, and the filter+wrap table is a data table, whose wrapped rows are produced by
JavaScript rather than by Hugo.

- [ ] **Step 10: Build and verify both scripts**

```bash
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn \
  && node "$SCRATCH/verify-table-filter.mjs" \
  && node "$SCRATCH/verify-table-wrap.mjs"
```

Expected: **both scripts fully passing**. The wrap script must stay green — this task must not
regress the shipped wrap feature.

- [ ] **Step 11: Lint and commit**

```bash
npm test
git add layouts/_shortcodes/table.html layouts/_partials/assets/table.html exampleSite/content/en/table-demo.md
git commit -m "fix(table): make the category filter reachable and self-sufficient

The shortcode never forwarded filter or filter-col, so a filter declared in
Markdown validated cleanly and then did nothing. Forward both, and split a
comma-separated string into a slice: a shortcode parameter is always a string,
InitArgs validates a kind without casting, and range cannot iterate a string.

A filtered table is now always a data table, even with sorting, paging and
search all off - filtering runs through simple-datatables' row model, so it
composes with them, and searchable gates only the search input, not the search
method. An author no longer has to enable sorting merely to get filtering.

Drops data-filter-container, which only the DOM fallback ever read."
```

---

### Task 4: Warn when the page has not opted into the module

Turns a silent failure into a build warning. This affects `sortable`, `paginate` and `searchable`
too, all of which fail silently today — it is what made an earlier test fixture vacuous.

**Files:**

- Modify: `layouts/_partials/assets/table.html`

**Interfaces:**

- Consumes: `$dataTable` (Task 3).

- [ ] **Step 1: Understand why the opt-in cannot be automated**

A data table needs the module's JavaScript **and** its per-page stylesheet. `footer/scripts.html`
runs after the content and honours the render-time `dependencies` scratch, but `head/head.html`
emits the module's stylesheet (`/css/simple-datatables.css`) **before** the content is rendered, so
it cannot see a dependency a shortcode declares mid-render. Auto-loading would attach the JavaScript
without the CSS. Do **not** call `AddModule` here. Warn instead.

- [ ] **Step 2: Add the warning**

In `layouts/_partials/assets/table.html`, immediately after the block that appends the
`data-table-wrap` attributes (the one commented "A wrapped data table is rendered uniformly…") and
before the `{{/* Filter */}}` block, insert:

```hugo
{{/* A data table needs both the module's JavaScript and its per-page stylesheet, and Hinode loads an
     optional module's assets only for pages that list it in frontmatter. head.html emits the
     stylesheet before the content is rendered, so a render-time dependency cannot add it - warn
     rather than fail silently. Skipped when the site configures the module as `core` or `critical`,
     since it then loads on every page anyway. */}}
{{ if $dataTable }}
    {{ with $args.page.Scratch.Get "modules" }}
        {{ if in (.optional | default slice) "simple-datatables" }}
            {{ $pageModules := slice | append $args.page.Params.modules }}
            {{ if not (in $pageModules "simple-datatables") }}
                {{ partial "utilities/LogWarn.html" (dict
                    "partial" "assets/table.html"
                    "warnid"  "warn-missing-module"
                    "msg"     "A sortable, paginated, searchable or filtered table requires the simple-datatables module. Add `modules: [\"simple-datatables\"]` to the page frontmatter."
                    "file"    $args.page.File
                )}}
            {{ end }}
        {{ end }}
    {{ end }}
{{ end }}
```

`baseof.html:18` sets the `modules` scratch from `utilities/InitModules.html`, whose `optional` key
lists the modules the site declares as `integration = "optional"`. The `with` guard keeps the partial
safe if it is ever rendered outside `baseof.html`. `slice | append .Params.modules` is the same
idiom `head/head.html:21` uses, and flattens a frontmatter list.

- [ ] **Step 3: Prove the warning fires**

Create a page that uses a data table without opting in:

```bash
cat > exampleSite/content/en/table-nomodule.md <<'EOF'
---
title: Table Without Module
---

{{< table sortable="true" >}}
| Name  | Type   |
|-------|--------|
| alpha | widget |
{{< /table >}}
EOF
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn 2>&1 | grep -i "simple-datatables module" || echo "NO WARNING — the check is not firing"
```

Expected: a warning naming `table-nomodule.md` and telling the author to add the frontmatter key.

- [ ] **Step 4: Prove it does NOT fire on a page that has opted in**

```bash
rm exampleSite/content/en/table-nomodule.md
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn 2>&1 | grep -i "simple-datatables module" && echo "FALSE POSITIVE — warning fired on an opted-in page" || echo "no warning (correct)"
```

Expected: `no warning (correct)`. The fixture page declares `modules: ["simple-datatables"]`, so it
must stay silent.

- [ ] **Step 5: Confirm nothing else regressed, then commit**

```bash
node "$SCRATCH/verify-table-filter.mjs" && node "$SCRATCH/verify-table-wrap.mjs"
npm test
git status --short   # table-nomodule.md must be gone
git add layouts/_partials/assets/table.html
git commit -m "fix(table): warn when a data table's module is not loaded

A sortable, paginated, searchable or filtered table needs simple-datatables'
JavaScript and its per-page stylesheet, and Hinode loads an optional module's
assets only for pages listing it in frontmatter. Omitting the key produced a
table that silently did nothing.

The opt-in cannot be added at render time: head.html emits the stylesheet before
the content renders, so a dependency declared by a shortcode would attach the
script without the styles. Warn at build time instead."
```

---

### Task 5: Delete the DOM fallback

Committed in `mod-simple-datatables`. Every filtered table is a data table after Task 3, so the
fallback branch is unreachable — and it is the branch carrying the wrapped-table bug.

**Files:**

- Modify: `../mod-simple-datatables/assets/js/modules/simple-datatables/simple-datatables.load.js`

**Interfaces:**

- Consumes: `data-filter-table` / `data-filter-value` on the buttons and `data-filter-col` /
  `data-filter-id` on the table (Task 3).

- [ ] **Step 1: Branch the module**

```bash
git -C ../mod-simple-datatables checkout -b fix/table-filter origin/main
head -1 ../mod-simple-datatables/go.mod
```

Expected: `module github.com/gethinode/mod-simple-datatables/v4`

- [ ] **Step 2: Point the exampleSite at the local module**

Two LOCAL-ONLY edits, reverted in Task 6 and **never committed**.

`exampleSite/hinode.work` — add the module:

```text
go 1.19

use .
use ../
use ../../mod-simple-datatables
```

`exampleSite/config/_default/hugo.toml` — under `[module]`, directly below the existing
`workspace = "hinode.work"` line, add a `replacements` line (the file already carries commented-out
examples of exactly this). A workspace `use` directive alone does **not** override this module —
Hugo keeps resolving it from the committed `_vendor/` copy:

```toml
  replacements = 'github.com/gethinode/mod-simple-datatables/v4 -> /Users/mark/Development/GitHub/gethinode/mod-simple-datatables/'
```

Confirm the override took:

```bash
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo config mounts -s exampleSite 2>/dev/null | grep -c "gethinode/mod-simple-datatables" || true
```

- [ ] **Step 3: Delete the fallback branch**

In `../mod-simple-datatables/assets/js/modules/simple-datatables/simple-datatables.load.js`, replace
the whole `document.querySelectorAll('[data-filter-table]')` block — including its leading comment —
with:

```js
// Category filter button group.
// Filtering runs through simple-datatables' search(term, columns, source), so it composes with
// sorting, pagination and the free-text search: the named source 'category-filter' is independent
// of the search input, so both narrow the result set at once. Hinode marks every filtered table as
// a data table, so an instance always exists by the time a button can be clicked.
document.querySelectorAll('[data-filter-table]').forEach(btn => {
    btn.addEventListener('click', function () {
        const tableId = this.getAttribute('data-filter-table')
        const filterValue = this.getAttribute('data-filter-value').toLowerCase()

        // Update active button state
        document.querySelectorAll(`[data-filter-table="${tableId}"]`).forEach(b => {
            b.classList.toggle('active', b === this)
        })

        const instances = tableFilterInstances[tableId]
        if (!instances) return

        instances.forEach(({ dt, filterCol }) => {
            dt.search(filterValue, [filterCol], 'category-filter')
        })
    })
})
```

The deleted branch iterated `tbody tr` and read `row.cells[col]`. On a wrapped table the second row
of each record holds a single `<td colspan>`, so `cells[1]` was `undefined`, its text read as empty,
and the description row was hidden whenever a filter was active. Deleting it removes the bug.

- [ ] **Step 4: Rebuild and confirm the generated HTML is unchanged**

The change is browser-side, so Hugo's output must not move.

```bash
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn \
  && node "$SCRATCH/verify-table-filter.mjs" && node "$SCRATCH/verify-table-wrap.mjs"
```

Expected: both scripts still fully passing.

- [ ] **Step 5: Commit in mod-simple-datatables**

```bash
git -C ../mod-simple-datatables add assets/js/modules/simple-datatables/simple-datatables.load.js
git -C ../mod-simple-datatables commit -m "fix(table): drop the filter's DOM fallback

Hinode now marks every filtered table as a data table, so the fallback that
toggled row display directly is unreachable. It was also the branch carrying a
bug: it read row.cells[col] across every tbody tr, but a wrapped table's second
row per record holds a single colspan cell, so cells[1] was undefined and the
description row was hidden whenever a filter was active.

Filtering now always runs through the row model, so it composes with sorting,
pagination and the free-text search."
```

---

### Task 6: Browser verification and clean-up

Nothing so far proves a button click actually filters anything.

**Files:**

- Modify: `exampleSite/hinode.work`, `exampleSite/config/_default/hugo.toml` (both reverted)
- Modify: `exampleSite/hugo_stats.json` (build artefact, committed)

- [ ] **Step 1: Serve the site on an isolated cache**

Run in the background. The isolated resource directory keeps this build from touching the shared
`hinode/resources/_gen`.

```bash
PATH="$PWD/node_modules/.bin:$PATH" HUGO_RESOURCEDIR="$SCRATCH/resources" HUGO_CACHEDIR="$SCRATCH/cache" \
  node_modules/.bin/hugo server -s exampleSite --port 1318 --disableFastRender
```

Use `127.0.0.1`, not `localhost` — an unrelated process squats on IPv6 localhost. The fixture is at
`http://127.0.0.1:1318/en/table-demo/`.

- [ ] **Step 2: Sanity-check that the module loaded**

`mod-simple-datatables` is `integration = "optional"`, so its JavaScript loads only because the
fixture page's frontmatter lists it. Confirm `typeof window.simpleDatatables === "object"` and that
`.fixture-filter` carries the `datatable-table` class. **If this fails, every check below is
vacuous — say so and stop.**

- [ ] **Step 3: Exercise the filter-only table**

On `.fixture-filter` at 1280×900:

- Three buttons: `All` (active), `Widget`, `Gadget`.
- No pager and no search input — sorting, paging and search are all off, yet the table is a
  DataTable.
- Click `Widget`: only `alpha` and `charlie` remain. Click `Gadget`: only `bravo` and `delta`.
  Click `All`: all four return.
- The active button state follows the click.
- Console clean — zero uncaught exceptions.

- [ ] **Step 4: Prove the filter composes with sort, page and search**

On `.fixture-filter-wrap` at 1280×900 (`sortable`, `paginate` with `pagination=2`, `filter`):

- Click `Widget`. The pager recounts to the **filtered** set (2 records → 1 page), not the full 4.
- Sort by Name descending. The filter survives the sort — still only widgets.
- Type `charlie` into the search box. The category filter and the free-text search narrow the set
  **together** (this is what the separate `'category-filter'` search source buys). Clear it.

- [ ] **Step 5: Prove the wrapped-table bug is gone**

This is the defect the deleted fallback carried. On `.fixture-filter-wrap` at 400×900 (below the
breakpoint, so the table wraps):

- Each visible record still shows **both** its rows — the data row and its full-width description
  row.
- Click `Widget`. The filtered-out records disappear **entirely**, and every remaining record still
  has its description row. A record showing its data row but *missing* its description row is the
  old bug.

- [ ] **Step 6: Stop the server, revert the local overrides**

```bash
git checkout exampleSite/hinode.work exampleSite/config/_default/hugo.toml
git diff --stat exampleSite/hinode.work exampleSite/config/_default/hugo.toml
```

Expected: no output — both files clean.

- [ ] **Step 7: Rebuild against the vendored module and commit the build stats**

```bash
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn
node "$SCRATCH/verify-table-filter.mjs" && node "$SCRATCH/verify-table-wrap.mjs"
npm test
```

This build uses the **vendored** mod-simple-datatables, which does not carry Task 5, so its filter
still takes the (now unreachable) fallback branch. Every assertion in both scripts is about Hugo's
output, so both must still pass.

```bash
git add exampleSite/hugo_stats.json
git commit -m "chore: update build stats"
```

- [ ] **Step 8: Confirm nothing stray is committed**

```bash
git log --oneline main..HEAD
git diff --stat main..HEAD
```

Expected: the spec, the i18n and structure change, the AddModule fix, the filter wiring, the module
warning, and the build stats. **No** `hinode.work`, **no** `exampleSite/config/_default/hugo.toml`,
**no** scratch script, **no** `table-nomodule.md`.

- [ ] **Step 9: Report the release ordering**

Summarise for the user: two branches (`hinode:fix/table-category-filter`,
`mod-simple-datatables:fix/table-filter`). The module must merge and release before Hinode is bumped
to it; until then Hinode's filter works through the fallback branch, which is functionally correct
except on a wrapped table.

---

## Notes for the reviewer

- **The filter's original design is deliberately reversed.** Commit `63a88070`'s fallback was
  written for "filter-only without sortable/paginate/searchable", and `table.yml`'s comment
  deliberately excluded filtering from the features needing the module. That intent is overturned
  here: the fallback was a second, inferior implementation — it toggled `display` and composed with
  nothing, while `dt.search()` filters through the row model and survives sorting, paging and search.
- **`filter` implying a data table** is what keeps the argument usable on its own after the fallback
  is deleted. Without it, `{{< table filter="a,b" >}}` would render dead buttons.
- **`AddModule.html` was already broken** and is fixed here even though the filter does not use it —
  the design had to establish why the module opt-in cannot be automated, which meant reading it.
