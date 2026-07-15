# Deterministic Element-Id Helper — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every `md5(delimit (slice . now) "-")` element id with a shared, deterministic helper, so a page carrying one of these components stops emitting different HTML on every build.

**Architecture:** A new `utilities/UniqueID.html` in **mod-utils** returns `<prefix>-<n>` from a per-prefix counter held in the page's `Store`. mod-utils is the home because no gethinode module declares a dependency on Hinode. `utilities/AddModule.html` moves there too, for the same reason. mod-blocks' four call sites and Hinode's table counter then both call the helper.

**Tech Stack:** Hugo templates and partials; Hugo modules; Bookshop components; Playwright for browser verification.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-14-unique-id-helper-design.md` (in the hinode repo). Read it first.
- Three repositories, siblings under `/Users/mark/Development/GitHub/gethinode/`:
  `mod-utils` (on `main` — Task 1 branches it), `mod-blocks` (on `main` — Task 2 branches it),
  and `hinode` (branch `fix/table-category-filter`, already checked out, carrying the spec).
- **Why mod-utils and not Hinode:** none of mod-blocks, mod-lottie, mod-leaflet, mod-mermaid or
  mod-simple-datatables imports Hinode. A partial in Hinode reaches them only because the final
  *site* merges Hinode's layouts — an undeclared inverted dependency that breaks each module's own
  exampleSite build. Hugo resolves partials by path across the merged layout tree, so moving a
  partial between modules is transparent to its callers.
- **`page.Store`, never `.Ordinal`.** `.Ordinal` restarts at 0 inside an embedded `RenderString`
  (which is what the `example` shortcode does), so ids collide. `page.Store` was measured to survive
  that boundary, and a spike confirmed a `page.Store` counter in mod-blocks' `panels` component is
  identical across two builds and unique within the page.
- A DOM id only needs to be unique **within the document that carries it**. The helper does not
  attempt cross-page uniqueness.
- Gaps in the numbering are expected and harmless: Hugo renders a page's content more than once
  (the search index calls `.Plain`), and the discarded passes consume counter values without
  emitting ids. The spike produced `panel-1, -2, -3, -5`.
- Commits follow Angular Conventional Commits (a commitlint pre-commit hook enforces this in each
  repo). Body lines must not exceed 100 characters.
- **Each of the three branches must carry at least one `feat:` or `fix:` commit.** gethinode merges
  with merge commits, so semantic-release reads the individual commits, not the PR title.
  `refactor`, `style`, `test`, `chore`, `docs` and `build` produce **no release**.
- **Never run `npm run build:example` or `npm run start:example` in hinode** — their prebuild hooks
  re-vendor Hugo modules from the remote and would wipe the local overrides Tasks 2–4 rely on. Use
  the project-pinned binary with `node_modules/.bin` on `PATH`:

  ```bash
  PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn
  ```

- Export the scratch path once per shell:

  ```bash
  export SCRATCH=/private/tmp/claude-501/-Users-mark-Development-GitHub-gethinode-hinode/491eb2c0-b0cd-401d-9256-134afea0e318/scratchpad
  ```

- **Release ordering is strictly sequential: mod-utils → mod-blocks → Hinode.** mod-blocks goes
  before Hinode so Hinode's exampleSite (whose `exampleSite/go.mod` pins mod-blocks) picks up the
  fixed ids when it deploys. The `go.mod` version bumps happen at merge time, once each release
  exists — **not in this plan**. All verification here runs against local module overrides.
- Hinode's `layouts/_partials/utilities/AddModule.html` is deleted in Task 4. It must not be
  deleted before mod-utils provides the replacement, or the partial disappears from the merged
  layout tree and every caller fails. Between the mod-utils release and Hinode's merge, the partial
  exists in **both** modules; Hugo resolves the project's own layouts ahead of an imported module's,
  so Hinode's copy shadows mod-utils'. They are identical, so the interval is harmless.

## File Structure

| File | Repo | Responsibility |
| --- | --- | --- |
| `layouts/_partials/utilities/UniqueID.html` | mod-utils | **New.** Returns a page-unique, build-stable id. |
| `layouts/_partials/utilities/AddModule.html` | mod-utils | **New (moved from Hinode).** Declares a render-time module dependency. |
| `component-library/components/panels/panels.hugo.html` | mod-blocks | `panel-<md5>` → helper. |
| `component-library/components/faq/faq.hugo.html` | mod-blocks | `faq-<md5>` → helper. |
| `layouts/partials/assets/testimonial-carousel.html` | mod-blocks | `testimonial-carousel-<md5>` → helper. |
| `layouts/partials/assets/preview.html` | mod-blocks | `preview-<md5>` → helper. |
| `layouts/_partials/assets/table.html` | hinode | Inline `hinodeTableFilterCount` counter → helper. |
| `layouts/_partials/utilities/AddModule.html` | hinode | **Deleted** (mod-utils provides it). |

## Affected pages in Hinode's exampleSite

Every page below carries at least one id this plan changes. Task 5 verifies all six.

| Page | Component |
| --- | --- |
| `/en/docs/blocks/panels/` | panels (4 ids) |
| `/en/docs/blocks/faq/` | faq |
| `/en/docs/blocks/testimonials/` | testimonial-carousel |
| `/en/docs/blocks/preview/` | preview |
| `/en/docs/components/example/` | preview |
| `/en/table-demo/` | table filter |

---

### Task 1: The helper, and AddModule's new home

**Repo:** mod-utils.

**Files:**

- Create: `layouts/_partials/utilities/UniqueID.html`
- Create: `layouts/_partials/utilities/AddModule.html`

**Interfaces:**

- Produces: `partial "utilities/UniqueID.html" (dict "prefix" "<string>" "page" <page|omitted>)`
  → returns the string `"<prefix>-<n>"`, `n` counting from 1 per prefix per page.
- Produces: `partial "utilities/AddModule.html" (dict "module" "<string>" "page" <page|omitted>)`
  → appends `<module>` to the page's `dependencies` scratch, deduplicated.

- [ ] **Step 1: Branch mod-utils**

```bash
git -C ../mod-utils checkout -b feat/unique-id origin/main
git -C ../mod-utils log --oneline -1
```

- [ ] **Step 2: Write the failing test**

The partials are not called from anywhere in mod-utils, so exercise them in a throwaway Hugo site.
Create it at `$SCRATCH/uid-test`:

```bash
export SCRATCH=/private/tmp/claude-501/-Users-mark-Development-GitHub-gethinode-hinode/491eb2c0-b0cd-401d-9256-134afea0e318/scratchpad
T=$SCRATCH/uid-test
rm -rf $T && mkdir -p $T/layouts/_partials/utilities $T/content
printf 'title = "t"\nbaseURL = "/"\ndisableKinds = ["taxonomy","term","rss","sitemap"]\n' > $T/hugo.toml
printf -- '---\ntitle: home\n---\n' > $T/content/_index.md
printf -- '---\ntitle: other\n---\n' > $T/content/other.md

cat > $T/layouts/index.html <<'EOF'
{{/* Per-prefix counters must be independent, and must count from 1. */}}
A={{ partial "utilities/UniqueID.html" (dict "prefix" "panel") }}
B={{ partial "utilities/UniqueID.html" (dict "prefix" "panel") }}
C={{ partial "utilities/UniqueID.html" (dict "prefix" "faq") }}
D={{ partial "utilities/UniqueID.html" (dict "prefix" "panel") }}

{{/* An explicit page anchors the counter to THAT page, not the rendering one. */}}
{{ $other := site.GetPage "/other" }}
E={{ partial "utilities/UniqueID.html" (dict "prefix" "panel" "page" $other) }}
F={{ partial "utilities/UniqueID.html" (dict "prefix" "panel") }}

{{/* AddModule: append + dedup, and honour an explicit page. */}}
{{ partial "utilities/AddModule.html" (dict "module" "alpha") }}
{{ partial "utilities/AddModule.html" (dict "module" "beta") }}
{{ partial "utilities/AddModule.html" (dict "module" "alpha") }}
{{ partial "utilities/AddModule.html" (dict "module" "gamma" "page" $other) }}
DEPS={{ delimit (page.Scratch.Get "dependencies") "," }}
OTHERDEPS={{ delimit ($other.Scratch.Get "dependencies") "," }}
EOF
```

Copy the (not yet existing) partials in and build:

```bash
cp ../mod-utils/layouts/_partials/utilities/UniqueID.html $T/layouts/_partials/utilities/ 2>/dev/null
cp ../mod-utils/layouts/_partials/utilities/AddModule.html $T/layouts/_partials/utilities/ 2>/dev/null
node_modules/.bin/hugo --quiet -s $T --destination $T/public 2>&1 | head -3
```

Expected: the build **FAILS** — `partial "utilities/UniqueID.html" not found`. That is the baseline.

- [ ] **Step 3: Write `UniqueID.html`**

Create `../mod-utils/layouts/_partials/utilities/UniqueID.html`:

```hugo
{{/*
    Returns a page-unique, build-stable element id of the form "<prefix>-<n>", counting from 1.

    Use this instead of hashing `now` (which changes the id on every build, so a page carrying the
    component never renders byte-identically) and instead of `.Ordinal` (which restarts at 0 inside
    an embedded RenderString, as the `example` shortcode performs, so ids collide).

    The counter lives in the page's Store, namespaced per prefix, so each component type counts
    independently. Gaps are expected and harmless: Hugo renders a page's content more than once
    (the search index calls `.Plain`), and a discarded pass consumes a value without emitting an id.

    A DOM id need only be unique within the document that carries it, so no attempt is made to be
    unique across pages.

    Arguments:
      prefix  (string, required)  the id's leading segment, e.g. "panel"
      page    (optional)          the page to anchor the counter to; defaults to the current page
*/}}

{{- $prefix := .prefix -}}
{{- if not $prefix -}}
    {{- errorf "partial [utilities/UniqueID.html] - missing required argument 'prefix'" -}}
{{- end -}}

{{- $page := .page -}}
{{- if not $page -}}
    {{- $page = page -}}
{{- end -}}

{{- $key := printf "hinode-uid-%s" $prefix -}}
{{- $count := add (or ($page.Store.Get $key) 0) 1 -}}
{{- $page.Store.Set $key $count -}}

{{- return printf "%s-%d" $prefix $count -}}
```

- [ ] **Step 4: Add `AddModule.html`**

Create `../mod-utils/layouts/_partials/utilities/AddModule.html` with exactly this content. It is
the current Hinode version, carrying both fixes it received while the table filter was repaired: it
appends and deduplicates (an older version used `complement`, which *replaced* the dependency list
and wiped it entirely when re-adding an entry already present), and it honours an explicitly passed
`page` instead of ignoring it in favour of the global `page`. **Preserve the tab indentation.**

```hugo
{{- $page := .page -}}
{{- if not $page -}}
	{{- $page = page -}}
{{- end -}}
{{ with .module }}
	{{- $dependencies := $page.Scratch.Get "dependencies" -}}
	{{- if reflect.IsSlice $dependencies -}}
		{{- $dependencies = $dependencies | append . | uniq -}}
	{{ else }}
		{{- $dependencies = slice . -}}
	{{ end }}
	{{- $page.Scratch.Set "dependencies" $dependencies -}}
{{ end }}
```

- [ ] **Step 5: Run the test**

```bash
cp ../mod-utils/layouts/_partials/utilities/UniqueID.html "$SCRATCH/uid-test/layouts/_partials/utilities/"
cp ../mod-utils/layouts/_partials/utilities/AddModule.html "$SCRATCH/uid-test/layouts/_partials/utilities/"
node_modules/.bin/hugo --quiet -s "$SCRATCH/uid-test" --destination "$SCRATCH/uid-test/public"
grep -E '^[A-F]=|^DEPS=|^OTHERDEPS=' "$SCRATCH/uid-test/public/index.html"
```

Expected, exactly:

```text
A=panel-1
B=panel-2
C=faq-1
D=panel-3
E=panel-1
F=panel-4
DEPS=alpha,beta
OTHERDEPS=gamma
```

Read that carefully — every line is load-bearing:

- `C=faq-1` proves the counters are **per prefix**, not one shared counter.
- `E=panel-1` proves an explicit `page` anchors the counter to **that** page (which has its own,
  untouched counter), not to the page being rendered.
- `F=panel-4` proves the rendering page's counter was **not** disturbed by `E` — it resumes where
  `D` left off.
- `DEPS=alpha,beta` proves AddModule appends and deduplicates. A bare `alpha`, or an empty value,
  means the list is being replaced instead of appended to.
- `OTHERDEPS=gamma` proves AddModule honours an explicit page, and that `gamma` did **not** leak
  into the rendering page's `DEPS`.

- [ ] **Step 6: Confirm the missing-prefix guard**

```bash
cp "$SCRATCH/uid-test/layouts/index.html" "$SCRATCH/uid-test/index.html.bak"
printf 'X={{ partial "utilities/UniqueID.html" (dict "prefix" "") }}\n' >> "$SCRATCH/uid-test/layouts/index.html"
node_modules/.bin/hugo --quiet -s "$SCRATCH/uid-test" --destination "$SCRATCH/uid-test/public" 2>&1 | grep -i "missing required argument" && echo "guard fires"
mv "$SCRATCH/uid-test/index.html.bak" "$SCRATCH/uid-test/layouts/index.html"
```

Expected: the build errors with `missing required argument 'prefix'`, and the final `mv` restores
the working template. (The throwaway site is not a git repo, so restore it by copy, not `git`.)

- [ ] **Step 7: Commit**

```bash
git -C ../mod-utils add layouts/_partials/utilities/UniqueID.html layouts/_partials/utilities/AddModule.html
git -C ../mod-utils commit -m "feat(utilities): add UniqueID and adopt AddModule

UniqueID returns a page-unique, build-stable element id from a per-prefix
counter in the page's Store. It replaces hashing \`now\` (which changes the id on
every build, so a page carrying the component never renders byte-identically)
and \`.Ordinal\` (which restarts at 0 inside an embedded RenderString, so ids
collide).

AddModule moves here from Hinode. No gethinode module declares a dependency on
Hinode, so a partial there reaches them only because the site merges Hinode's
layouts - an undeclared inverted dependency that breaks each module's own
exampleSite build."
```

---

### Task 2: mod-blocks' four call sites

**Repo:** mod-blocks.

**Files:**

- Modify: `component-library/components/panels/panels.hugo.html:37`
- Modify: `component-library/components/faq/faq.hugo.html:42`
- Modify: `layouts/partials/assets/testimonial-carousel.html:48`
- Modify: `layouts/partials/assets/preview.html:243`

**Interfaces:**

- Consumes: `partial "utilities/UniqueID.html" (dict "prefix" "<string>" "page" <page|omitted>)`
  → `"<prefix>-<n>"` (Task 1).

- [ ] **Step 1: Branch mod-blocks**

```bash
git -C ../mod-blocks checkout -b fix/deterministic-ids origin/main
git -C ../mod-blocks log --oneline -1
```

- [ ] **Step 2: Convert `panels.hugo.html`**

Line 37 currently reads:

```hugo
    {{ $parentID := printf "panel-%v" (md5 (delimit (slice . now) "-")) }}
```

Replace it with:

```hugo
    {{ $parentID := partial "utilities/UniqueID.html" (dict "prefix" "panel" "page" $._page) }}
```

`$._page` is Bookshop's content page, addressed from the template's root context so it resolves
regardless of nesting. `list.hugo.html` in the same component library already uses it. If it is nil
in this context the helper falls back to the current page, which the spike proved correct here.

- [ ] **Step 3: Convert `faq.hugo.html`**

Line 42 currently reads:

```hugo
	{{ $id := printf "faq-%s" (md5 (delimit (slice . now) "-")) }}
```

Replace it with (preserving the tab indentation):

```hugo
	{{ $id := partial "utilities/UniqueID.html" (dict "prefix" "faq" "page" $._page) }}
```

- [ ] **Step 4: Convert `testimonial-carousel.html`**

Line 48 currently reads:

```hugo
		{{ $id := printf "testimonial-carousel-%s" (md5 (delimit (slice . now) "-")) }}
```

Replace it with (preserving the two tabs):

```hugo
		{{ $id := partial "utilities/UniqueID.html" (dict "prefix" "testimonial-carousel") }}
```

This is a partial, not a Bookshop component, so it has no `._page`; it takes the helper's default
of the current page.

- [ ] **Step 5: Convert `preview.html`**

Line 243 currently reads:

```hugo
{{- $id := printf "preview-%s" (md5 (delimit (slice . now) "-")) -}}
```

Replace it with:

```hugo
{{- $id := partial "utilities/UniqueID.html" (dict "prefix" "preview") -}}
```

- [ ] **Step 6: Confirm no `md5(… now …)` id remains anywhere in mod-blocks**

```bash
grep -rn 'md5 (delimit (slice . now)' ../mod-blocks/layouts ../mod-blocks/component-library || echo "none remaining"
```

Expected: `none remaining`.

- [ ] **Step 7: Confirm each id's downstream references are untouched**

Each id is referenced elsewhere in its own component — `data-companion`, `aria-controls`,
`data-bs-target`, `data-bs-parent`. They derive from the same variable (`$parentID` / `$id`), so
they follow automatically. Confirm you changed only the assignment line in each file:

```bash
git -C ../mod-blocks diff --stat
```

Expected: 4 files, 4 insertions, 4 deletions.

- [ ] **Step 8: Commit**

```bash
git -C ../mod-blocks add component-library/components/panels/panels.hugo.html \
    component-library/components/faq/faq.hugo.html \
    layouts/partials/assets/testimonial-carousel.html \
    layouts/partials/assets/preview.html
git -C ../mod-blocks commit -m "fix(blocks): stop element ids changing on every build

Four components built a DOM id from md5(... now ...), so the id changed on every
build and any page carrying one emitted different HTML each time - defeating
output diffing and making caches treat an unchanged page as changed.

Use mod-utils' UniqueID helper, which counts from a per-prefix counter in the
page's Store."
```

(The build and browser verification happen in Tasks 4 and 5, against Hinode's exampleSite — the
only site where mod-blocks' components fully render.)

---

### Task 3: Hinode — migrate the table, drop the moved partial

**Repo:** hinode, branch `fix/table-category-filter`.

**Files:**

- Modify: `layouts/_partials/assets/table.html:77-84`
- Delete: `layouts/_partials/utilities/AddModule.html`

**Interfaces:**

- Consumes: `partial "utilities/UniqueID.html" (dict "prefix" "table-filter" "page" $args.page)`
  → `"table-filter-<n>"` (Task 1). The rendered id keeps the same shape it has today.

- [ ] **Step 1: Migrate the table's counter**

`layouts/_partials/assets/table.html` currently reads:

```hugo
{{ $filterId := "" }}
{{ if $filter }}
    {{ $store := $args.page.Store }}
    {{ $count := add (or ($store.Get "hinodeTableFilterCount") 0) 1 }}
    {{ $store.Set "hinodeTableFilterCount" $count }}
    {{ $filterId = printf "table-filter-%d" $count }}
    {{ $attributes = printf "%s data-filter-col=%d data-filter-id=%s" $attributes $filterCol $filterId }}
{{ end }}
```

Replace that block with:

```hugo
{{ $filterId := "" }}
{{ if $filter }}
    {{ $filterId = partial "utilities/UniqueID.html" (dict "prefix" "table-filter" "page" $args.page) }}
    {{ $attributes = printf "%s data-filter-col=%d data-filter-id=%s" $attributes $filterCol $filterId }}
{{ end }}
```

The output shape is unchanged (`table-filter-<n>`); this removes the second implementation of the
same mechanism. Leave the surrounding comment about determinism in place if one is there — but if it
explains the inline counter's mechanics, retire it, since the helper now documents itself.

- [ ] **Step 2: Delete Hinode's `AddModule.html`**

```bash
git rm layouts/_partials/utilities/AddModule.html
```

mod-utils now provides it at the same path. Its three callers —
`layouts/_partials/assets/lightbox.html`, `layouts/_shortcodes/table.html`, and mod-blocks'
`list.hugo.html` — are unaffected, because Hugo resolves partials by path across the merged layout
tree.

- [ ] **Step 3: Wire the exampleSite to the local mod-utils and mod-blocks**

Both edits are LOCAL-ONLY and are reverted in Task 6. Neither may ever be committed.

`exampleSite/hinode.work`:

```text
go 1.19

use .
use ../
use ../../mod-utils
use ../../mod-blocks
```

`exampleSite/config/_default/hugo.toml`, under `[module]`, directly below the existing
`workspace = "hinode.work"` line (the file already carries commented-out examples of exactly this):

```toml
  replacements = 'github.com/gethinode/mod-utils/v6 -> /Users/mark/Development/GitHub/gethinode/mod-utils/, github.com/gethinode/mod-blocks/v2 -> /Users/mark/Development/GitHub/gethinode/mod-blocks/'
```

A workspace `use` directive alone does **not** reliably override a module — Hugo keeps resolving it
from the committed `_vendor/` copy. Both mechanisms are needed.

- [ ] **Step 4: Prove the override is genuinely in effect**

`hugo config mounts` is **not** sufficient — it has been observed to report a replacement correctly
while the build still compiled the vendored copy. Prove it from the built output instead: with the
local mod-utils in play, the ids must be counters, not hashes.

```bash
rm -rf exampleSite/public
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel error
grep -o 'id="dropdown-panel-[^"]*"' exampleSite/public/en/docs/blocks/panels/index.html | sort
```

Expected: ids like `dropdown-panel-1`. If you still see a 32-character hex hash, the override is not
in effect and every check below is meaningless — stop and fix the override first.

- [ ] **Step 5: Confirm the AddModule deletion did not break its callers**

The table shortcode's missing-module warning is the loudest AddModule-adjacent behaviour, and the
lightbox partial is the other caller. A missing partial is a hard build error, so a clean build is
itself most of the proof — but confirm the warning still works, since it is the thing a user sees.

```bash
cat > exampleSite/content/en/tmp-nomodule.md <<'EOF'
---
title: Temp No Module
---

{{< table sortable="true" >}}
| Name  | Type   |
|-------|--------|
| alpha | widget |
{{< /table >}}
EOF
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn 2>&1 | grep -i "simple-datatables module" && echo "warning still fires"
rm exampleSite/content/en/tmp-nomodule.md
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn 2>&1 | grep -ci "simple-datatables module" || echo "0 on a stock build — correct"
```

Expected: the warning fires for the temporary page and names it, and a stock build emits **zero**
such warnings.

- [ ] **Step 6: Confirm the table's own ids still work**

```bash
node "$SCRATCH/verify-table-filter.mjs" && node "$SCRATCH/verify-table-wrap.mjs"
grep -o 'data-filter-id=[^ >]*' exampleSite/public/en/table-demo/index.html | sort -u
```

Expected: both scripts fully passing, and two distinct `table-filter-<n>` ids.

- [ ] **Step 7: Lint and commit**

```bash
npm test
git add layouts/_partials/assets/table.html
git commit -m "fix(table): take the filter id from the shared UniqueID helper

The table carried its own page.Store counter, duplicating what mod-utils'
UniqueID now provides. Same rendered id shape, one implementation.

Also drops Hinode's copy of AddModule.html, which has moved to mod-utils:
mod-blocks calls it without declaring a dependency on Hinode, so it belongs
where every module can legitimately reach it."
```

(The `git rm` from Step 2 is already staged, so this commit carries both changes.)

---

### Task 4: Determinism and uniqueness across every affected page

**Repo:** hinode (verification only — no code changes).

Nothing so far proves the ids are stable across builds or unique within a page. This task measures
both, on all six affected pages.

**Files:** none.

- [ ] **Step 1: Write the check script**

Create `$SCRATCH/verify-ids.mjs`. It is a scratch file — do **not** commit it.

```js
import { readFileSync, writeFileSync } from 'node:fs'

// Every page that carries an id this change touches, and the id prefixes it should carry.
const PAGES = [
  ['en/docs/blocks/panels/index.html',       ['dropdown-panel']],
  ['en/docs/blocks/faq/index.html',          ['faq']],
  ['en/docs/blocks/testimonials/index.html', ['testimonial-carousel']],
  ['en/docs/blocks/preview/index.html',      ['preview']],
  ['en/docs/components/example/index.html',  ['preview']],
  ['en/table-demo/index.html',               ['table-filter']],
]

const idsOf = (page, prefixes) => {
  const html = readFileSync(`exampleSite/public/${page}`, 'utf8')
  const found = []
  for (const p of prefixes) {
    // Match the id wherever it is used: id=, aria-controls=, data-bs-target=, data-companion=, …
    for (const m of html.matchAll(new RegExp(`["'#]${p}-([\\w-]+)`, 'g'))) {
      found.push(`${p}-${m[1]}`)
    }
  }
  return found
}

const which = process.argv[2]
if (which !== 'a' && which !== 'b') {
  throw new Error('pass "a" or "b" to record that build\'s ids')
}

const snapshot = PAGES.map(([page, prefixes]) => [page, idsOf(page, prefixes)])
writeFileSync(
  `${process.env.SCRATCH}/ids-${which}.json`,
  JSON.stringify(snapshot, null, 2)
)
console.log(`recorded build ${which}`)
```

- [ ] **Step 2: Build twice and compare**

```bash
export SCRATCH=/private/tmp/claude-501/-Users-mark-Development-GitHub-gethinode-hinode/491eb2c0-b0cd-401d-9256-134afea0e318/scratchpad
build() { rm -rf exampleSite/public; PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel error >/dev/null; }
build && node "$SCRATCH/verify-ids.mjs" a
build && node "$SCRATCH/verify-ids.mjs" b
diff "$SCRATCH/ids-a.json" "$SCRATCH/ids-b.json" && echo "DETERMINISTIC — identical across builds" || echo "FAIL — ids differ between builds"
```

Expected: `DETERMINISTIC — identical across builds`.

- [ ] **Step 3: Confirm no id is a hash, and none repeats within a page**

```bash
node -e '
const ids = require(process.env.SCRATCH + "/ids-a.json");
let bad = 0;
for (const [page, list] of ids) {
  if (!list.length) { console.log("FAIL  no ids found on", page); bad++; continue }
  const hashy = list.filter(id => /-[0-9a-f]{16,}$/.test(id));
  if (hashy.length) { console.log("FAIL  hash-shaped id on", page, hashy[0]); bad++ }
  // An id may legitimately appear several times on a page (id=, aria-controls=, data-bs-target=).
  // What must not happen is two DIFFERENT elements sharing one id — check the id= attributes only.
  console.log("ok   ", page, "->", [...new Set(list)].join(", "));
}
process.exit(bad ? 1 : 0)
'
```

Expected: an `ok` line per page listing counter-shaped ids (`dropdown-panel-1`, `faq-1`, …) and no
`FAIL`.

- [ ] **Step 4: Confirm each `id=` attribute is unique within its page**

The check above allows an id to *appear* many times (a `data-bs-target` points at an `id`). What
must never happen is two elements declaring the same `id`.

```bash
for p in en/docs/blocks/panels en/docs/blocks/faq en/docs/blocks/testimonials en/docs/blocks/preview en/docs/components/example en/table-demo; do
  dupes=$(grep -o 'id="[^"]*"' "exampleSite/public/$p/index.html" | sort | uniq -d)
  if [ -n "$dupes" ]; then echo "FAIL duplicate id= on /$p:"; echo "$dupes"; else echo "ok   /$p"; fi
done
```

Expected: `ok` for all six. **A duplicate here is a Critical failure** — it means two elements share
an id and Bootstrap will drive the wrong one.

---

### Task 5: Browser verification

**Repo:** hinode (verification only — no code changes).

A deterministic id that points at the wrong element is worse than a random one. This task proves
each component still drives *its own* element.

**Files:** none.

- [ ] **Step 1: Serve the exampleSite**

With the local overrides from Task 3 still active, on an isolated cache so other Hugo processes are
undisturbed. Run it in the background.

```bash
PATH="$PWD/node_modules/.bin:$PATH" HUGO_RESOURCEDIR="$SCRATCH/resources" HUGO_CACHEDIR="$SCRATCH/cache" \
  node_modules/.bin/hugo server -s exampleSite --port 1321 --disableFastRender
```

Use `127.0.0.1`, not `localhost` — an unrelated process squats on IPv6 localhost.

- [ ] **Step 2: Panels — `http://127.0.0.1:1321/en/docs/blocks/panels/`**

This page carries **four** panel ids, so it is the strongest test of per-element pairing.

- Every dropdown opens **its own** panel. Open each one in turn and confirm the panel that expands
  is the one directly associated with it, not another panel on the page.
- Confirm from the DOM that each toggle's `data-companion` / `aria-controls` matches the `id` of the
  panel it actually opened.
- Zero uncaught console exceptions.

- [ ] **Step 3: FAQ — `http://127.0.0.1:1321/en/docs/blocks/faq/`**

- Each accordion item toggles the item it belongs to, and **only** that one. Open one item and
  confirm no other item opened with it.
- Zero uncaught console exceptions.

- [ ] **Step 4: Testimonials — `http://127.0.0.1:1321/en/docs/blocks/testimonials/`**

- The carousel cycles, and its indicators target its own slides.
- Zero uncaught console exceptions.

- [ ] **Step 5: Preview — both pages**

`http://127.0.0.1:1321/en/docs/blocks/preview/` and
`http://127.0.0.1:1321/en/docs/components/example/` (the preview component appears on both).

- The device tabs (desktop / tablet / mobile) switch the preview they belong to. On a page with more
  than one preview, confirm a tab does not resize a different preview.
- Zero uncaught console exceptions.

- [ ] **Step 6: Table — `http://127.0.0.1:1321/en/table-demo/`**

The filter's id now comes from the helper, so re-confirm the pairing survived.

- Clicking a category filters **its own** table, not the other filtered table on the page.
- Zero uncaught console exceptions.

- [ ] **Step 7: Stop the server and report**

Report any failure rather than papering over it.

---

### Task 6: Clean up and hand off the release sequence

**Repo:** hinode.

**Files:**

- Modify: `exampleSite/hinode.work` (revert)
- Modify: `exampleSite/config/_default/hugo.toml` (revert)
- Modify: `exampleSite/hugo_stats.json` (build artefact)

- [ ] **Step 1: Revert the local overrides**

```bash
git checkout exampleSite/hinode.work exampleSite/config/_default/hugo.toml
git diff --stat exampleSite/hinode.work exampleSite/config/_default/hugo.toml
```

Expected: no output — both files clean. **Neither may ever be committed.**

- [ ] **Step 2: Rebuild against the vendored modules**

```bash
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn
```

This build uses the **vendored** mod-utils and mod-blocks, which do not yet carry Tasks 1 and 2. So
the panels/faq/testimonial/preview ids revert to hashes here, and Hinode's own `AddModule.html` is
gone while mod-utils does not yet provide it — **this build is expected to fail**, with a missing
`utilities/AddModule.html`.

That failure is the ordering constraint made visible, not a defect: Hinode cannot merge until
mod-utils has released and Hinode's `go.mod` is bumped to it. **Record the exact error text** — it
is the evidence for the handoff in Step 5.

Then restore the override so the remaining steps have a buildable tree, and revert it again at the
very end:

```bash
# re-apply the Task 3 Step 3 overrides, rebuild, then revert them
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel error
git checkout exampleSite/hinode.work exampleSite/config/_default/hugo.toml
```

- [ ] **Step 3: Commit the build stats if they changed**

```bash
git status --short
```

If `exampleSite/hugo_stats.json` is dirty **and its diff is semantic** (new class or id names rather
than churning hashes), commit it:

```bash
git add exampleSite/hugo_stats.json
git commit -m "chore: update build stats"
```

If the only diff is hash-shaped ids churning, restore it instead — that churn is exactly what this
change exists to remove, and it will settle once the modules are released:

```bash
git checkout exampleSite/hugo_stats.json
```

- [ ] **Step 4: Confirm nothing stray is committed**

```bash
git log --oneline main..HEAD
git diff --stat main..HEAD
```

Expected: no `hinode.work`, no `exampleSite/config/_default/hugo.toml`, no scratch script, no
temporary content page.

- [ ] **Step 5: Report the release and bump sequence**

Summarise for the user. Three branches:

- `mod-utils:feat/unique-id` — new PR
- `mod-blocks:fix/deterministic-ids` — new PR
- `hinode:fix/table-category-filter` — the existing PR #2024, amended

Merge order is **strictly sequential**, and each step's `go.mod` bump can only happen after the
previous release exists:

1. Merge **mod-utils**. semantic-release cuts a minor (the branch carries a `feat:`).
2. Bump `mod-blocks/go.mod` to that mod-utils release; merge **mod-blocks**. semantic-release cuts a
   patch (the branch carries a `fix:`).
3. Bump `hinode/go.mod` to the mod-utils release **and** `hinode/exampleSite/go.mod` to the
   mod-blocks release; then merge **hinode**.

State plainly that Hinode **cannot** merge before mod-utils releases: it deletes its own
`AddModule.html`, and until `go.mod` points at a mod-utils that provides the replacement, the
partial is missing from the merged layout tree and the build fails.

---

## Notes for the reviewer

- **`page.Store`, not `.Ordinal`.** `.Ordinal` restarts at 0 inside an embedded `RenderString` —
  which is exactly what the `example` shortcode does — so two components in two `{{< example >}}`
  blocks on one page would collide. `page.Store` was measured to survive that boundary.
- **Gaps in the numbering are expected.** Hugo renders a page's content more than once (the search
  index calls `.Plain`), and the discarded pass consumes counter values without emitting ids. The
  spike produced `panel-1, -2, -3, -5`. Uniqueness and determinism are what matter, not contiguity.
- **The helper lives in mod-utils, not Hinode,** because no gethinode module declares a Hinode
  dependency. This also unblocks the planned `.Ordinal` migration, which must reach mod-lottie and
  mod-leaflet.
