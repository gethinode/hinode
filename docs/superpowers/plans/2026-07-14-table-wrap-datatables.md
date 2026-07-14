# Table `wrap` Support for Data Tables — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the table shortcode's `wrap` argument work together with `sortable`, `paginate` and `searchable`, and render plain wrapped tables from a single Hugo render pass instead of two.

**Architecture:** Hinode renders exactly one `<table>` per shortcode invocation. A *plain* wrapped table carries both layouts in that one table, switching with Bootstrap display utilities, so it needs no JavaScript. A *data table* is rendered uniformly and marked with `data-table-wrap`; `mod-simple-datatables` then produces the wrapped layout below the breakpoint through simple-datatables' `tableRender` hook, which rewrites the virtual DOM and never the row model — so sorting, searching and paging stay correct.

**Tech Stack:** Hugo templates and render hooks, Bootstrap 5.3.8 SCSS, simple-datatables v10.2.0, PostCSS/PurgeCSS, Playwright for browser verification.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-14-table-wrap-datatables-design.md`. Read it first.
- Three repositories, all siblings under `/Users/mark/Development/GitHub/gethinode/`:
  `hinode` (branch `feat/table-wrap-datatables`, already created), `mod-simple-datatables`,
  `mod-utils`.
- The site's main breakpoint is `site.Params.main.breakpoint`, default `md`. It is the single
  source of truth for the wrap switch — the render hook, the SCSS and the JavaScript must all
  derive from it. It is **not** the table shortcode's own `breakpoint` argument, which controls
  `.table-responsive-{bp}` and is unrelated.
- Bootstrap has no `xs` infix for display utilities. When the main breakpoint resolves to `xs`,
  `wrap` is a no-op.
- `layouts/_partials/assets/args.html:83` calls the table partial with `"wrap" true` — the
  documentation argument tables are a production consumer of the plain wrap path. Its output must
  stay visually identical.
- Commits follow Angular Conventional Commits (commitlint pre-commit hook). Body lines must not
  exceed 100 characters. Types: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`.
- Per `CLAUDE.md`: never use the `or` operator as fallback logic for boolean arguments — read
  `$args.wrap` directly, because `or false <fallback>` returns the fallback.
- **Never run `npm run build:example` or `npm run start:example` while local module overrides are
  active.** Their `prestart`/`prebuild` hooks re-vendor modules from the remote and silently wipe
  the local `mod-simple-datatables` changes. Use the project-pinned binary `node_modules/.bin/hugo`
  directly. The system `hugo` is older and fails with `"modulequeries" is not a valid cache name`.
- Do not start a second `hugo server` against `exampleSite` while the user's dev server is
  running — both write to the shared `hinode/resources/_gen`, and a bad purge gets cached and
  served to the other server. Check with `lsof -i :1313` first.
- Every task references `$SCRATCH`. Export it once per shell:

  ```bash
  export SCRATCH=/private/tmp/claude-501/-Users-mark-Development-GitHub-gethinode-hinode/491eb2c0-b0cd-401d-9256-134afea0e318/scratchpad
  ```

## File Structure

| File | Repo | Responsibility |
| --- | --- | --- |
| `exampleSite/content/en/table-demo.md` | hinode | Fixture page exercising every wrap case. Committed; it is the regression target. |
| `layouts/_markup/render-table.html` | hinode | Emits the single-table hybrid markup for plain wrapped tables. |
| `layouts/_partials/assets/table.html` | hinode | One `RenderString`, one `<table>`; picks the plain or the data table wrap strategy. |
| `assets/scss/components/_table.scss` | hinode | Breakpoint-scoped border suppression; striping recomputed per record pair. |
| `assets/scss/common/_variables-dart.scss` | hinode | Re-exports `$main-breakpoint` for the dart-sass entry point. |
| `layouts/_partials/head/stylesheet.html` | hinode | Injects `main-breakpoint` into the SCSS vars. |
| `config/postcss.config.js` | hinode | Safelists the two classes that only JavaScript ever emits. |
| `assets/js/modules/simple-datatables/simple-datatables.load.js` | mod-simple-datatables | `tableRender` wrap hook + `matchMedia` re-render. |
| `data/structures/_arguments.yml` | mod-utils | Drops the "not compatible with data tables" note. |

## Known gap, deliberately not addressed

The table shortcode does not forward the `filter` / `filter-col` arguments to the partial —
`layouts/_shortcodes/table.html` simply omits them — so the category filter is unreachable from
Markdown and cannot be exercised from the exampleSite. This is pre-existing and out of scope. Task 4
therefore leaves the filter code path in `simple-datatables.load.js` functionally untouched and only
corrects its now-stale comment. Flag it to the user as a follow-up.

---

### Task 1: Fixture page and local module workspace

Sets up everything later tasks verify against, and pins down exactly how the current code fails.

**Files:**

- Create: `exampleSite/content/en/table-demo.md`
- Modify: `exampleSite/hinode.work` (local only — **must be reverted in Task 6, never committed**)

**Interfaces:**

- Produces: the page `exampleSite/public/en/table-demo/index.html`, holding three tables tagged with
  the marker classes `fixture-plain`, `fixture-data` and `fixture-two-col`. Every later task selects
  them by those classes. (`id` is *not* a valid table argument — `InitArgs` validates against
  `data/structures/table.yml`, which does not list it — so the `class` argument carries the marker.)

- [ ] **Step 1: Confirm no Hugo server is running**

```bash
lsof -i :1313 || echo "clear"
```

Expected: `clear`. If a server is listed, stop and ask the user to shut it down — building alongside
it can poison the shared CSS cache.

- [ ] **Step 2: Point the exampleSite at the local modules**

`exampleSite/config/_default/hugo.toml:112` already sets `workspace = "hinode.work"`, so Hugo reads
the workspace file. It currently contains:

```text
go 1.19

use .
use ../
```

Rewrite it as:

```text
go 1.19

use .
use ../
use ../../mod-simple-datatables
use ../../mod-utils
```

Workspace `use` directives take precedence over the vendored copies, so Hugo reads both modules
straight from the working tree.

- [ ] **Step 3: Put the local mod-simple-datatables checkout on a feature branch**

The local clone currently sits on `develop`, which is stale: its `go.mod` still declares
`github.com/gethinode/mod-simple-datatables/v3`, while Hinode requires `/v4`. The workspace `use`
directive will not resolve until this is fixed.

```bash
git -C ../mod-simple-datatables checkout -b feat/table-wrap origin/main
head -1 ../mod-simple-datatables/go.mod
```

Expected: `module github.com/gethinode/mod-simple-datatables/v4`

- [ ] **Step 4: Put the local mod-utils checkout on a feature branch**

```bash
git -C ../mod-utils checkout -b docs/table-wrap-datatables origin/main
```

- [ ] **Step 5: Write the fixture page**

Create `exampleSite/content/en/table-demo.md`. The marker classes ride on the `class` argument;
`fixture-plain` also carries `table-striped`, because striping is the case most likely to regress.

````markdown
---
title: Table Demo
---

## Plain wrapped table

{{< table wrap="true" class="table-striped fixture-plain" >}}
| Name    | Type   | Description                                                        |
|---------|--------|--------------------------------------------------------------------|
| alpha   | widget | The first record, with a description long enough to need wrapping.  |
| bravo   | gadget | The second record, also with a fairly long trailing description.    |
| charlie | widget | The third record. Short.                                            |
| delta   | gadget | The fourth record, whose description runs on for a little while.    |
{{< /table >}}

## Wrapped data table

{{< table wrap="true" sortable="true" searchable="true" paginate="true" pagination="2" class="fixture-data" >}}
| Name    | Type   | Description                                                        |
|---------|--------|--------------------------------------------------------------------|
| alpha   | widget | The first record, with a description long enough to need wrapping.  |
| bravo   | gadget | The second record, also with a fairly long trailing description.    |
| charlie | widget | The third record. Short.                                            |
| delta   | gadget | The fourth record, whose description runs on for a little while.    |
{{< /table >}}

## Two-column wrapped table

{{< table wrap="true" class="fixture-two-col" >}}
| Name  | Description                                                        |
|-------|--------------------------------------------------------------------|
| alpha | The first record, with a description long enough to need wrapping.  |
| bravo | The second record, also with a fairly long trailing description.    |
{{< /table >}}
````

- [ ] **Step 6: Write the verification script**

Create `$SCRATCH/verify-table-wrap.mjs`. It is a scratch file — do **not** commit it.

```js
import { readFileSync } from 'node:fs'

const html = readFileSync('exampleSite/public/en/table-demo/index.html', 'utf8')

const checks = []
const check = (name, pass, detail = '') => checks.push({ name, pass, detail })

// Each shortcode must render exactly one table. The duplicate-render approach produced two
// per wrapped shortcode, so the current code yields six.
const tables = html.match(/<table[\s>]/g) ?? []
check('one table per shortcode', tables.length === 3, `found ${tables.length}`)

check(
  'no duplicate-render wrappers',
  !/d-none d-md-block/.test(html)
)

// --- Plain wrapped tables carry both layouts in one table ---

check(
  'plain wrap hides the last header below the breakpoint',
  /<th class="d-none d-md-table-cell">\s*Description/.test(html)
)
check(
  'plain wrap suppresses the data row border',
  /class="table-border-bottom-wrap"/.test(html)
)
// Four records in the plain table plus two in the two-column table.
const colspanRows = html.match(/<tr class="d-md-none">/g) ?? []
check(
  'plain wrap emits one colspan row per record',
  colspanRows.length === 6,
  `found ${colspanRows.length}, expected 6 (4 plain + 2 two-column)`
)
check('plain wrap spans the remaining columns', /<td colspan="2"/.test(html))
check('two-column wrap spans its single column', /<td colspan="1"/.test(html))

// --- The data table is rendered uniformly ---
// simple-datatables builds its row model from this DOM, so it must NOT contain the split
// rows. The wrap is declared with attributes and applied by tableRender in the browser.

const dataTable =
  html.match(/<table class="[^"]*data-table[^"]*"[\s\S]*?<\/table>/)?.[0] ?? ''
check('data table is rendered', dataTable.length > 0)
check('data table declares the wrap', /data-table-wrap=true/.test(dataTable))
check(
  'data table declares the wrap breakpoint',
  /data-table-wrap-breakpoint=md/.test(dataTable)
)
check(
  'data table DOM stays uniform',
  !/table-border-bottom-wrap/.test(dataTable) && !/d-md-none/.test(dataTable),
  'the split rows must come from tableRender, not from Hugo'
)
check(
  'data table is not marked table-wrap server-side',
  !/<table class="[^"]*table-wrap[^"]*data-table/.test(html),
  'the class is added by the tableRender hook, only while wrapped'
)

let failed = 0
for (const { name, pass, detail } of checks) {
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${pass || !detail ? '' : ` — ${detail}`}`)
  if (!pass) failed++
}
console.log(`\n${checks.length - failed}/${checks.length} passing`)
process.exit(failed ? 1 : 0)
```

- [ ] **Step 7: Build and run the script to watch it fail**

```bash
node_modules/.bin/hugo --gc -s exampleSite --logLevel warn \
  && node "$SCRATCH/verify-table-wrap.mjs"
```

Expected: the build succeeds and the script **FAILS**. All three shortcodes set `wrap`, so the
current code renders each of them twice — six tables, not three. There is no `data-table-wrap`
attribute anywhere, and `d-none d-md-block` wrappers are present. Record the output; it is the
baseline.

- [ ] **Step 8: Commit the fixture**

```bash
git add exampleSite/content/en/table-demo.md
git commit -m "test(table): add exampleSite fixture for wrapped tables

Exercises a plain wrapped table with striping, a wrapped data table, and a
two-column wrapped table. Regression target for the wrap rework."
```

---

### Task 2: SCSS and build plumbing

Lands the styling the new markup depends on, before any markup changes, so no intermediate commit
renders incorrectly. Changes no HTML.

**Files:**

- Modify: `layouts/_partials/head/stylesheet.html:50-73`
- Modify: `assets/scss/common/_variables-dart.scss:28`
- Modify: `assets/scss/components/_table.scss:1-12`
- Modify: `config/postcss.config.js:20-47`

**Interfaces:**

- Produces: the SCSS variable `$main-breakpoint` (a Bootstrap breakpoint name such as `md`),
  available in both the libsass and the dart-sass entry points; and the CSS classes `table-wrap` and
  `table-border-bottom-wrap`, which Tasks 3 and 4 emit.

- [ ] **Step 1: Inject the breakpoint into the SCSS vars**

In `layouts/_partials/head/stylesheet.html`, add one entry to the `$vars` dict, directly after the
`"navbar-size"` line:

```hugo
    "navbar-size"             (site.Params.navigation.size | default "md")
    "main-breakpoint"         (site.Params.main.breakpoint | default "md")
```

- [ ] **Step 2: Re-export it for the dart-sass entry point**

`assets/scss/app.scss` uses `@import "hugo:vars"`, which makes the variables global, so libsass (the
default transpiler) needs nothing further. `assets/scss/app-dart.scss` uses `@use "hugo:vars" as h`,
so the variable must be re-exported. In `assets/scss/common/_variables-dart.scss`, add a line after
`$navbar-size`:

```scss
$navbar-size:                   h.$navbar-size;
$main-breakpoint:               h.$main-breakpoint;
```

- [ ] **Step 3: Rewrite the wrap rules in `_table.scss`**

Replace this block at the top of the file:

```scss
.table-border-bottom-wrap {
    border-bottom-style: none !important
}
```

with:

```scss
// Bootstrap stripes every odd row. A wrapped table renders two rows per record - the data row
// and the row holding the wrapped last column - so `odd` would stripe every record instead of
// alternating. Recompute the stripes per record pair.
.table-wrap.table-striped {
    > tbody > tr:nth-of-type(n) > * {
        --bs-table-color-type: initial;
        --bs-table-bg-type: initial;
    }

    > tbody > tr:nth-of-type(4n + 1) > * {
        --bs-table-color-type: var(--bs-table-striped-color);
        --bs-table-bg-type: var(--bs-table-striped-bg);
    }
}

@include media-breakpoint-down(#{$main-breakpoint}) {
    // Below the breakpoint the data row and the row holding the wrapped column must read as a
    // single record, so the data row drops its bottom border.
    .table-border-bottom-wrap {
        border-bottom-style: none !important;
    }

    // Here the second row of each pair is visible too, so it joins its record's stripe.
    .table-wrap.table-striped > tbody > tr:nth-of-type(4n + 2) > * {
        --bs-table-color-type: var(--bs-table-striped-color);
        --bs-table-bg-type: var(--bs-table-striped-bg);
    }
}
```

Two things matter here. The `:nth-of-type(n)` reset and the `4n + 1` rule have identical
specificity, so the reset **must** come first; likewise the media-query block must follow the base
block. And the `--bs-` custom properties are written out literally rather than interpolated from
`$prefix`, matching the dark-mode block further down the same file.

Why hidden rows still matter: `:nth-of-type` counts elements regardless of `display: none`, so at
desktop width the hidden `d-md-none` rows shift Bootstrap's `odd` selector onto *every* data row.

- [ ] **Step 4: Safelist the JavaScript-only classes**

In `config/postcss.config.js`, add to the `standard` safelist array, after the
`// SimpleDatatables table rendering classes (added by JS)` group:

```js
      // Hinode wrapped tables. On a data table both classes are added by SimpleDatatables'
      // tableRender hook, so they never reach hugo_stats.json and would otherwise be purged.
      'table-wrap',
      'table-border-bottom-wrap',
```

- [ ] **Step 5: Build and confirm the CSS survives purging**

The stylesheet is fingerprinted in a production build, so glob the directory rather than naming the
file.

```bash
node_modules/.bin/hugo --gc -s exampleSite --logLevel warn \
  && grep -c "table-border-bottom-wrap" exampleSite/public/css/*.css \
  && grep -c "767.98" exampleSite/public/css/*.css
```

Expected: non-zero counts for both. `767.98` confirms `media-breakpoint-down(md)` resolved into a
`max-width` query. A count of `0` for `table-border-bottom-wrap` means PurgeCSS stripped it —
recheck the safelist edit.

- [ ] **Step 6: Lint**

```bash
npm run lint:styles
```

Expected: no errors.

- [ ] **Step 7: Commit**

```bash
git add layouts/_partials/head/stylesheet.html assets/scss/common/_variables-dart.scss \
        assets/scss/components/_table.scss config/postcss.config.js
git commit -m "style(table): scope wrap styling to the main breakpoint

A wrapped table will render as a single table serving both widths, so the
border suppression has to be scoped to the breakpoint rather than applied
unconditionally, and Bootstrap's odd-row striping has to be recomputed per
record pair. Safelist both wrap classes: on a data table they are only ever
added by JavaScript."
```

---

### Task 3: One table per shortcode

Rewrites the render hook and the table partial so `wrap` produces a single table, and marks data
tables for the JavaScript hook added in Task 4. This is the task that makes Task 1's verification
script pass.

**Files:**

- Modify: `layouts/_markup/render-table.html` (full rewrite)
- Modify: `layouts/_partials/assets/table.html` (full rewrite)

**Interfaces:**

- Consumes: `table-wrap`, `table-border-bottom-wrap` (Task 2).
- Produces: on a wrapped data table, the attributes `data-table-wrap="true"` and
  `data-table-wrap-breakpoint="<name>"`, where `<name>` is a Bootstrap breakpoint key
  (`sm`/`md`/`lg`/`xl`/`xxl`). Task 4 reads both.

- [ ] **Step 1: Rewrite the render hook**

Replace the whole of `layouts/_markup/render-table.html` with:

```hugo
{{/* Adapted from https://gohugo.io/render-hooks/tables/ */}}

{{/* Wrapping moves the last column onto a row of its own below the site's main breakpoint. It is a
     no-op at `xs` (Bootstrap has no `xs` display-utility infix) and on a single-column table
     (nothing to wrap). The marker class is dropped when it does not apply, so the wrap-specific
     striping rules cannot misfire on a table that renders normally. */}}
{{ $breakpoint := site.Params.main.breakpoint | default "md" }}
{{ $cols := 0 }}
{{ range .THead }}{{ $cols = len . }}{{ end }}

{{ $attr := .Attributes }}
{{ $given := split (or $attr.class "") " " }}
{{ $wrap := and (in $given "table-wrap") (ne $breakpoint "xs") (gt $cols 1) }}

{{/* Rebuild the class list: drop empties, drop `table-wrap` when it does not apply, and ensure
     `table` is present so Bootstrap styles the element. */}}
{{ $classes := slice }}
{{ range $given }}
    {{ if and (ne . "") (or $wrap (ne . "table-wrap")) }}
        {{ $classes = $classes | append . }}
    {{ end }}
{{ end }}
{{ if not (in $classes "table") }}{{ $classes = $classes | append "table" }}{{ end }}
{{ $attr = merge $attr (dict "class" (delimit ($classes | uniq) " ")) }}

{{ $align := dict "left" "start" "center" "center" "right" "end" }}

<table
  {{- range $k, $v := $attr }}
    {{- if $v }}
      {{- printf " %s=%q" $k $v | safeHTMLAttr }}
    {{- end }}
  {{- end }}>
  <thead>
    {{- range .THead }}
      {{- $length := len . }}
      <tr>
        {{- range $i, $cell := . }}
          {{- $cellClasses := slice }}
          {{- with $cell.Alignment }}
            {{- $cellClasses = $cellClasses | append (printf "text-%s" (index $align .)) }}
          {{- end }}
          {{- if and $wrap (eq $i (sub $length 1)) }}
            {{- $cellClasses = $cellClasses | append "d-none" (printf "d-%s-table-cell" $breakpoint) }}
          {{- end }}
          <th{{ with $cellClasses }} class="{{ delimit . " " }}"{{ end }}>
            {{- $cell.Text -}}
          </th>
        {{- end }}
      </tr>
    {{- end }}
  </thead>
  <tbody>
    {{- range .TBody }}
      {{- $length := len . }}
      <tr>
        {{- range $i, $cell := . }}
          {{- $cellClasses := slice }}
          {{- with $cell.Alignment }}
            {{- $cellClasses = $cellClasses | append (printf "text-%s" (index $align .)) }}
          {{- end }}
          {{- if $wrap }}
            {{- if eq $i (sub $length 1) }}
              {{- $cellClasses = $cellClasses | append "d-none" (printf "d-%s-table-cell" $breakpoint) }}
            {{- else }}
              {{- $cellClasses = $cellClasses | append "table-border-bottom-wrap" }}
            {{- end }}
          {{- end }}
          <td{{ with $cellClasses }} class="{{ delimit . " " }}"{{ end }}>
            {{- $cell.Text -}}
          </td>
        {{- end }}
      </tr>
      {{- if $wrap }}
        {{- $last := index . (sub $length 1) }}
        <tr class="d-{{ $breakpoint }}-none">
          <td colspan="{{ sub $length 1 }}"{{ with $last.Alignment }} class="text-{{ index $align . }}"{{ end }}>
            {{- $last.Text -}}
          </td>
        </tr>
      {{- end }}
    {{- end }}
  </tbody>
</table>
```

(`slice` with no arguments returns an empty slice — `mod-utils`' own `InitArgs.html` uses the same
idiom, so it is safe.)

- [ ] **Step 2: Rewrite the table partial**

Replace the whole of `layouts/_partials/assets/table.html` with:

```hugo
{{/* 
    Copyright © 2022 - 2026 The Hinode Team / Mark Dumay. All rights reserved.
    Use of this source code is governed by The MIT License (MIT) that can be found in the LICENSE file.
    Visit gethinode.com/license for more details.
*/}}

{{/* Initialize arguments */}}
{{ $args := partial "utilities/InitArgs.html" (dict "structure" "table" "args" . "group" "partial")}}
{{ if or $args.err $args.warnmsg }}
    {{ partial (cond $args.err "utilities/LogErr.html" "utilities/LogWarn.html") (dict 
        "partial" "assets/table.html" 
        "warnid"  "warn-invalid-arguments"
        "msg"     "Invalid arguments"
        "details" ($args.errmsg | append $args.warnmsg)
        "file"    page.File
    )}}
{{ end }}

{{/* Initialize local variables */}}
{{ $breakpoint := site.Params.main.breakpoint | default "md" }}
{{ $dataTable := or $args.sortable $args.paginate $args.searchable }}
{{ $wrap := and $args.wrap (ne $breakpoint "xs") }}

{{ $class := or $args.class "" }}
{{ if $dataTable }}{{ $class = trim (printf "%s data-table" $class) " " }}{{ end }}

{{ $attributes := "" }}
{{ if $args.sortable }}{{ $attributes = printf "%s data-table-sortable=true" $attributes }}{{ end }}
{{ if $args.paginate }}
    {{ $pagination := or $args.pagination $args.pagingOptionPerPage | default 10 }}
    {{ $select := or $args.paginationSelect $args.pagingOptionPageSelect }}
    {{ $attributes = printf "%s data-table-paging=true" $attributes }}
    {{ $attributes = printf "%s data-table-paging-option-perPage=%d" $attributes $pagination }}
    {{ with $select }}
        {{ $attributes = printf "%s data-table-paging-option-perPageSelect=%s" $attributes . }}
    {{ end }}
{{ end }}
{{ if $args.searchable }}{{ $attributes = printf "%s data-table-searchable=true" $attributes }}{{ end }}

{{/* A wrapped data table is rendered uniformly: simple-datatables builds its row model from this
     DOM, and applies the wrapped layout below the breakpoint through its tableRender hook. A plain
     wrapped table carries both layouts in a single table, switched with display utilities, so it
     needs no JavaScript. */}}
{{ if and $wrap $dataTable }}
    {{ $attributes = printf "%s data-table-wrap=true data-table-wrap-breakpoint=%s" $attributes $breakpoint }}
{{ end }}

{{/* Filter */}}
{{ $filter := $args.filter }}
{{ $filterCol := $args.filterCol | default 1 }}
{{ $filterId := "" }}
{{ if $filter }}
    {{ $filterId = printf "table-filter-%s" (md5 (delimit (slice . now) "-")) }}
    {{ $attributes = printf "%s data-filter-col=%d data-filter-id=%s" $attributes $filterCol $filterId }}
{{ end }}

{{/* Main code */}}
{{ if not $args.err }}
    {{ $input := $args.input }}
    {{ if and $wrap (not $dataTable) }}{{ $input = printf "%s\n{.table-wrap}" (chomp $input) }}{{ end }}
    {{ $input = $input | $args.page.RenderString }}

    {{ $regex := `<table\s*class="(.+?)"` }}
    {{ $current := (index (index (findRESubmatch $regex $input) 0) 1) }}
    {{ $target := delimit (((split $current " ") | append "table" | append $class) | uniq) " " }}
    {{ $new := printf `<table class="%s" %s` $target (trim $attributes " ") }}
    {{ $input = replaceRE $regex $new $input 1 }}

    {{ $wrapper := $args.wrapper | default "" }}

    {{ if $filter }}
    <div class="table-filter-controls d-flex justify-content-start mb-3">
        <div class="btn-group" role="group" aria-label="{{ T "tableFilterLabel" | default "Filter" }}">
            <button type="button"
                    class="btn btn-outline-primary active"
                    data-filter-table="{{ $filterId }}"
                    data-filter-value="">{{ T "tableFilterAll" | default "All" }}</button>
            {{ range $filter }}
            <button type="button"
                    class="btn btn-outline-primary"
                    data-filter-table="{{ $filterId }}"
                    data-filter-value="{{ . }}">{{ . | title }}</button>
            {{ end }}
        </div>
    </div>
    {{ end }}

    {{ if eq $args.breakpoint "none" }}
        {{ if $wrapper }}
            <div class="{{ $wrapper }}">{{ $input | safeHTML }}</div>
        {{ else }}
            {{ $input | safeHTML }}
        {{ end }}
    {{ else }}
        <div class="table-responsive{{- with $args.breakpoint }}-{{ . }}{{ end }} {{ $wrapper }}"{{ if $filter }} data-filter-container="{{ $filterId }}"{{ end }}>
        {{ $input | safeHTML }}
        </div>
    {{ end }}
{{ end }}
```

The `inline/table.html` define block is gone, along with the `$regular` / `$wrapped` pair, the second
`RenderString` call and the second `.table-responsive` wrapper. `$args.wrap` is read directly rather
than through `or`, because `or false <fallback>` would discard an explicit `false`.

- [ ] **Step 3: Build and run the verification script**

```bash
node_modules/.bin/hugo --gc -s exampleSite --logLevel warn \
  && node "$SCRATCH/verify-table-wrap.mjs"
```

Expected: **all checks PASS**.

- [ ] **Step 4: Sanity-check the documentation argument tables**

`layouts/_partials/assets/args.html:83` calls this partial with `"wrap" true` and no data table
flags, so the argument tables on gethinode.com take the plain path. Confirm the fixture's plain
table has, for each record, a data row of three `<td>` cells followed by a
`<tr class="d-md-none">` holding one `<td colspan="2">`, and three `<th>` cells of which the last
carries `d-none d-md-table-cell`.

- [ ] **Step 5: Lint and commit**

```bash
npm run lint
git add layouts/_markup/render-table.html layouts/_partials/assets/table.html
git commit -m "refactor(table): render one table per shortcode

A wrapped table was rendered twice - once regular, once wrapped - and both
copies were emitted into the page. Render it once instead: a plain table now
carries both layouts and switches with display utilities, and a data table is
rendered uniformly and marked with data-table-wrap so simple-datatables can
apply the wrapped layout itself.

This halves the markup of a wrapped table, parses the Markdown once instead of
twice, and stops Flexsearch indexing every wrapped table twice."
```

---

### Task 4: Wrapped data tables

The `tableRender` hook in `mod-simple-datatables`. Committed in that repository.

**Files:**

- Modify: `../mod-simple-datatables/assets/js/modules/simple-datatables/simple-datatables.load.js`

**Interfaces:**

- Consumes: `data-table-wrap` and `data-table-wrap-breakpoint` on the `<table>` (Task 3); the CSS
  classes `table-wrap` and `table-border-bottom-wrap` (Task 2).

- [ ] **Step 1: Extract the existing header styling into a named function**

`tableOptions` currently holds an inline `tableRender`. Pull it out so it can be composed with the
wrap hook: delete the `tableRender: (_data, table, _type) => { … }` property from `tableOptions`,
and add this function above `tableOptions`:

```js
// Applies Bootstrap's header markup to simple-datatables' virtual DOM.
const styleHeader = (table) => {
    const thead = table.childNodes[0]
    thead.childNodes[0].childNodes.forEach(th => {
        if (!th.attributes) {
            th.attributes = {}
        }
        th.attributes.scope = "col"
        const innerHeader = th.childNodes[0]
        if (!innerHeader.attributes) {
            innerHeader.attributes = {}
        }
        let innerHeaderClass = innerHeader.attributes.class ? `${innerHeader.attributes.class} th-inner` : "th-inner"

        if (innerHeader.nodeName === "a") {
            innerHeaderClass += " sortable sortable-center both"
            if (th.attributes.class?.includes("desc")) {
                innerHeaderClass += " desc"
            } else if (th.attributes.class?.includes("asc")) {
                innerHeaderClass += " asc"
            }
        }
        innerHeader.attributes.class = innerHeaderClass
    })
    return table
}
```

- [ ] **Step 2: Add the wrap transform**

Below `styleHeader`, add:

```js
// Mirrors Bootstrap's $grid-breakpoints. A wrapped table switches layout below the site's main
// breakpoint, following Bootstrap's `media-breakpoint-down` convention.
const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200, xxl: 1400 }

// Moves the last column of every record onto a row of its own, so wide tables stay readable on
// small devices. This rewrites the virtual DOM only - never the row model - so sorting, searching
// and paging keep operating on the unmodified data, and the pager keeps counting records rather
// than rendered rows.
const wrapLastColumn = (table) => {
    const thead = table.childNodes[0]
    const tbody = table.childNodes[1]
    const headerRow = thead?.childNodes[0]
    if (!headerRow || headerRow.childNodes.length < 2 || !tbody) {
        return table
    }

    headerRow.childNodes = headerRow.childNodes.slice(0, -1)

    // Marks the table for the wrap-specific striping rules in Hinode's SCSS.
    table.attributes = {
        ...table.attributes,
        class: `${table.attributes?.class ?? ""} table-wrap`.trim()
    }

    tbody.childNodes = tbody.childNodes.flatMap(row => {
        const cells = row.childNodes
        if (!cells || cells.length < 2) {
            return [row]
        }
        const span = cells.length - 1
        const last = cells[span]

        return [
            {
                ...row,
                childNodes: cells.slice(0, span).map(cell => ({
                    ...cell,
                    attributes: {
                        ...cell.attributes,
                        class: `${cell.attributes?.class ?? ""} table-border-bottom-wrap`.trim()
                    }
                }))
            },
            {
                nodeName: "TR",
                childNodes: [{
                    ...last,
                    attributes: { ...last.attributes, colspan: String(span) }
                }]
            }
        ]
    })

    return table
}
```

- [ ] **Step 3: Give each table its own options and wire up the hook**

Replace the body of the `document.querySelectorAll('.data-table').forEach(...)` loop. `tableOptions`
becomes a template that each table copies, because each table now needs its own `tableRender`
closure:

```js
document.querySelectorAll('.data-table').forEach(tbl => {
    let perPageSelectAttr = tbl.getAttribute('data-table-paging-option-perPageSelect');
    let perPageSelect;
    if (perPageSelectAttr) {
        try {
            perPageSelect = JSON.parse(perPageSelectAttr);
        } catch (e) {
            console.error('Error parsing perPageSelect, use default value:', e);
            perPageSelect = [5, 10, 20, 50, ["{{ T "tablePerPageSelectAll" }}", -1]];
        }
    } else {
        perPageSelect = [5, 10, 20, 50, ["{{ T "tablePerPageSelectAll" }}", -1]];
    }

    const options = {
        ...tableOptions,
        sortable: (tbl.getAttribute('data-table-sortable') === 'true'),
        paging: (tbl.getAttribute('data-table-paging') === 'true'),
        searchable: (tbl.getAttribute('data-table-searchable') === 'true'),
        perPage: parseInt(tbl.getAttribute('data-table-paging-option-perPage')) || 10,
        perPageSelect: perPageSelect
    }

    // A wrapped table renders its last column on a row of its own below the main breakpoint. At
    // `xs` the max-width evaluates below zero, so the query never matches and wrapping is off -
    // matching Hinode, which does not emit the attribute at `xs` either.
    let media = null
    if (tbl.getAttribute('data-table-wrap') === 'true') {
        const name = tbl.getAttribute('data-table-wrap-breakpoint') || 'md'
        const width = breakpoints[name] ?? breakpoints.md
        media = window.matchMedia(`(max-width: ${width - 0.02}px)`)
    }

    options.tableRender = (_data, table, type) => {
        const rendered = styleHeader(table)
        // 'header' is the sticky-header clone, 'message' the no-rows placeholder and 'print' the
        // print view - none of them wrap.
        if (type !== 'main' || !media?.matches) {
            return rendered
        }
        return wrapLastColumn(rendered)
    }

    const dt = new window.simpleDatatables.DataTable(tbl, options)

    // Redraw on the other side of the breakpoint. `update(true)` keeps the active sort, page and
    // search term; `refresh()` would clear the search.
    if (media) {
        media.addEventListener('change', () => dt.update(true))
    }

    // Register instance for category filter integration
    const filterId = tbl.getAttribute('data-filter-id')
    if (filterId) {
        const filterCol = parseInt(tbl.getAttribute('data-filter-col') ?? '1')
        if (!tableFilterInstances[filterId]) tableFilterInstances[filterId] = []
        tableFilterInstances[filterId].push({ dt, filterCol })
    }
})
```

- [ ] **Step 4: Correct the stale filter comment**

The comment above `tableFilterInstances` reads *"An array is used per ID because both the regular and
responsive-wrapped table variants need to be filtered together."* That is no longer true — a wrapped
table is now a single table with a single instance. Replace it with:

```js
// Track DataTable instances keyed by filter container ID. An array is used per ID so several
// tables can share one filter button group.
const tableFilterInstances = {}
```

Leave the filter logic itself untouched.

- [ ] **Step 5: Lint the module**

```bash
(cd ../mod-simple-datatables && npx eslint assets/js --no-error-on-unmatched-pattern)
```

Expected: no errors. The file is a Hugo template (it contains `{{ T "…" }}`), so if that repository
has no ESLint configuration covering it, skip this step rather than fighting it.

- [ ] **Step 6: Rebuild Hinode's exampleSite and confirm the HTML is unchanged**

The transform runs in the browser, so the generated HTML must still show a uniform data table.

```bash
node_modules/.bin/hugo --gc -s exampleSite --logLevel warn \
  && node "$SCRATCH/verify-table-wrap.mjs"
```

Expected: all checks still PASS.

- [ ] **Step 7: Commit in mod-simple-datatables**

```bash
git -C ../mod-simple-datatables add assets/js/modules/simple-datatables/simple-datatables.load.js
git -C ../mod-simple-datatables commit -m "feat(table): support Hinode's wrap argument

Wrap the last column onto a row of its own below the main breakpoint when the
table declares data-table-wrap. The transform runs in simple-datatables'
tableRender hook, so it rewrites the virtual DOM and never the row model:
sorting, searching and paging keep operating on the unmodified data, and the
pager keeps counting records rather than rendered rows.

Crossing the breakpoint redraws through update(true), which preserves the
active sort, page and search term."
```

---

### Task 5: Browser verification

Nothing so far proves the wrapped data table actually behaves. This task drives it.

**Files:** none — verification only.

- [ ] **Step 1: Start a Hugo server on an isolated cache**

```bash
HUGO_RESOURCEDIR="$SCRATCH/resources" HUGO_CACHEDIR="$SCRATCH/cache" \
  node_modules/.bin/hugo server -s exampleSite --port 1314 --disableFastRender
```

Run it in the background. The isolated resource directory keeps this build from touching the shared
`hinode/resources/_gen`.

- [ ] **Step 2: Check the data table at desktop width**

With the Playwright MCP tools, navigate to `http://localhost:1314/en/table-demo/` and resize to
1280×900. On `.fixture-data`:

- Three column headers, all sortable.
- No `table-border-bottom-wrap` cells and no `colspan` rows — it renders as an ordinary table.
- The pager shows **2** pages: 4 records at 2 per page.

- [ ] **Step 3: Establish state, then cross the breakpoint**

- Sort by Name descending; confirm `delta` is first.
- Type `bravo` into the search box; confirm one record matches. Clear it.
- Go to page 2.
- Resize to 400×900.

Verify: the layout wraps, **and the sort is still descending and the page is still 2**. This is what
`update(true)` buys over `refresh()` — if either resets, the wrong method is being called.

- [ ] **Step 4: Exercise the data table at mobile width**

Still at 400×900, on `.fixture-data`:

- Two column headers (`Name`, `Type`); the `Description` header is gone.
- Each record renders as two rows: a data row of two cells, then a row with `colspan="2"`.
- The pager still shows **2** pages. It counts records, not the four rendered rows per page — **a
  pager reading 4 pages means the transform leaked into the row model.**
- Sorting by Name keeps each description attached to its own record.
- Searching for a word that appears **only in a description** still matches, proving the wrapped
  column is still in the searchable data.

- [ ] **Step 5: Check the empty state**

On `.fixture-data`, search for `zzzz`. The "no results" message must render as a normal single row,
not a mangled one — this exercises the `type === 'message'` guard.

- [ ] **Step 6: Check the plain tables**

- `.fixture-plain` at 400×900: wrapped layout, and each record's two rows share one stripe — stripes
  alternate per record, not per row.
- `.fixture-plain` at 1280×900: three columns, no visible description rows, stripes alternating per
  record. **Every row striped means the `4n + 1` override from Task 2 is not applying.**
- `.fixture-two-col` at 400×900: one column plus a full-width description row, with `colspan="1"`.

- [ ] **Step 7: Confirm the plain table needs no JavaScript**

Reload with JavaScript disabled and check `.fixture-plain` at both widths. The layout must still
switch — it is pure CSS. The data table will render unwrapped and unsorted; that is expected, it
already required JavaScript.

- [ ] **Step 8: Stop the server and report**

Report any failure rather than papering over it.

---

### Task 6: Documentation and clean-up

**Files:**

- Modify: `../mod-utils/data/structures/_arguments.yml:1687-1692`
- Modify: `exampleSite/hinode.work` (revert)
- Modify: `hugo_stats.json`, `exampleSite/hugo_stats.json`

- [ ] **Step 1: Drop the incompatibility note in mod-utils**

The `wrap` entry currently reads:

```yaml
  wrap:
    type: bool
    optional: true
    comment: >-
      Toggle the last column to wrap to a new row on smaller devices. This
      setting is not compatible with data tables.
```

Replace it with:

```yaml
  wrap:
    type: bool
    optional: true
    comment: >-
      Toggle the last column to wrap to a new row on smaller devices.
```

```bash
git -C ../mod-utils add data/structures/_arguments.yml
git -C ../mod-utils commit -m "docs(arguments): drop the wrap/data-table incompatibility note

Hinode and mod-simple-datatables now render a wrapped data table through
simple-datatables' tableRender hook, so the two arguments combine."
```

The spec also called for a `release` marker on `wrap` in Hinode's `data/structures/table.yml`. That
field records the version in which an **argument** was introduced, and `wrap` long predates this
change, so a marker would misdate it. Deliberately omitted — raise it with the user if they disagree.

- [ ] **Step 2: Revert the workspace overrides**

Task 1 found that a workspace `use` directive alone does **not** override `mod-simple-datatables` —
Hugo keeps resolving it from the committed `_vendor/` copy. It therefore also added a local
`replacements` line to `exampleSite/config/_default/hugo.toml` (following the pattern already
commented out in that file). **Both** files are local-only and must be reverted:

```bash
git checkout exampleSite/hinode.work exampleSite/config/_default/hugo.toml
git diff --stat exampleSite/hinode.work exampleSite/config/_default/hugo.toml
```

Expected: no output — both files are clean.

- [ ] **Step 3: Rebuild against the vendored modules**

```bash
node_modules/.bin/hugo --gc -s exampleSite --logLevel warn
git status --short
```

This build uses the **vendored** mod-simple-datatables, which does not yet carry Task 4, so the
wrapped data table renders unwrapped here. That is expected until the module is released and
re-vendored. The plain wrapped tables must still be correct — re-run the verification script; every
check except the browser behaviour still passes, because they all assert on Hugo's output.

- [ ] **Step 4: Commit the build stats**

`hugo_stats.json` is tracked and feeds PurgeCSS. The fixture page adds classes to it.

```bash
git add hugo_stats.json exampleSite/hugo_stats.json
git commit -m "chore: update build stats"
```

- [ ] **Step 5: Run the full lint suite**

```bash
npm test
```

Expected: no errors from ESLint, Stylelint or markdownlint.

- [ ] **Step 6: Confirm nothing stray is committed**

```bash
git log --oneline main..HEAD
git diff --stat main..HEAD
```

Expected: the fixture, the SCSS and build plumbing, the render rework, and the build stats. No
`hinode.work`, no scratchpad script.

- [ ] **Step 7: Report the release ordering**

Summarise for the user: three branches (`hinode:feat/table-wrap-datatables`,
`mod-simple-datatables:feat/table-wrap`, `mod-utils:docs/table-wrap-datatables`).
`mod-simple-datatables` must be released and re-vendored into Hinode before wrapped data tables work
on a real site, so Hinode's `go.mod` needs a bump to the new minor once it ships.

---

## Notes for the reviewer

- **Striping.** The spec did not mention it, but adding a second `<tr>` per record breaks Bootstrap's
  `.table-striped`, which selects `tr:nth-of-type(odd)`. Hidden rows still count for `:nth-of-type`,
  so without the override in Task 2 a wrapped table would stripe *every* record at desktop width. The
  `4n + 1` / `4n + 2` rules restore per-record striping, and as a side effect fix today's behaviour
  below the breakpoint, where a description row is left unstriped while its data row is striped.
- **`table-wrap` is now load-bearing**, not merely a render-hook marker: the striping rules key off
  it. The render hook therefore strips it when wrapping does not apply (`xs`, single column), and the
  JavaScript adds it when it does.
- **The `xs` guard** fixes a latent bug — the current code emits `d-xs-none`, which Bootstrap does
  not generate.
- **`filter` is unreachable from the shortcode** (see "Known gap" above), so the filter-plus-wrap
  combination could not be exercised end to end. The code path is preserved unchanged.
