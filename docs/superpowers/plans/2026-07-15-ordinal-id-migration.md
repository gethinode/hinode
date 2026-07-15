# `.Ordinal` → UniqueID Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every `.Ordinal`-derived DOM id with mod-utils' `UniqueID` helper, so components stop colliding when two of them appear in separate `{{< example >}}` blocks.

**Architecture:** Self-contained shortcodes swap their default-id expression directly for `UniqueID`. The two parent/child pairs (accordion, nav) share one id lazily through the parent's `.Scratch` — whichever renders first mints it — because Hugo renders a shortcode's children before its own body. An unrelated dangling-`aria-labelledby` in mod-blocks' `preview.html` fallback is fixed alongside.

**Tech Stack:** Hugo templates and shortcodes; mod-utils' `UniqueID` partial; Playwright for browser verification.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-15-ordinal-id-migration-design.md`. Read it first.
- Four repositories, siblings under `/Users/mark/Development/GitHub/gethinode/`: `hinode`
  (branch `feat/ordinal-id-migration`, already created, carrying the spec), `mod-lottie`,
  `mod-leaflet`, `mod-blocks`. The last three each branch from `origin/main` in their own task.
- **`UniqueID` returns `<prefix>-UID-<n>`** from a per-prefix counter in the page's `Store`. It is
  in **mod-utils v6.5.0** (already released). hinode already pins v6.5.0; mod-lottie and mod-leaflet
  bump to it in their tasks. Call it as
  `partial "utilities/UniqueID.html" (dict "prefix" "<name>")`.
- **`.Ordinal` must not be used for a top-level id anywhere after this change.** It resets to 0
  inside the `example` shortcode's embedded `RenderString`, which is the whole bug. A nested
  shortcode's `.Ordinal` (an *item index* within its parent) is parent-scoped and stays — it only
  ever appears as a `-item-<n>` / `-btn-<n>` suffix beneath the now-unique parent id.
- **The explicit `id` argument must keep working** on every shortcode that accepts it. Resolve it
  first; fall back to `UniqueID` only when it is empty.
- **The lazy-shared-id contract (accordion, nav):** parent and child resolve the parent id
  identically — explicit `id` first, else `.Scratch.Get "resolved-id"` (child reads
  `.Parent.Scratch`), else mint via `UniqueID` and store under `resolved-id`. Children render
  first, so the first child mints; the parent and siblings read it back. Verified: two accordions
  on a page get `accordion-UID-1` / `accordion-UID-2`, each item paired to its own container.
- Prefixes (current name minus the ordinal): `carousel`, `navbar-collapse`, `toast-message`,
  `file-collapse`, `docs-collapse`, `accordion`, `nav`, `lottie-animation`, `leaflet-map`.
- Commits follow Angular Conventional Commits (a commitlint pre-commit hook enforces this in each
  repo). Body lines ≤ 100 chars. **Each branch needs one `fix:` commit** — gethinode merges with
  merge commits, so semantic-release reads the individual commits, not the PR title.
- **Never run `npm run build:example` or `npm run start:example` in hinode** — their prebuild hooks
  re-vendor modules from the remote and would wipe local overrides. Build with:
  `PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn`
- Export the scratch path once per shell:
  `export SCRATCH=/private/tmp/claude-501/-Users-mark-Development-GitHub-gethinode-hinode/491eb2c0-b0cd-401d-9256-134afea0e318/scratchpad`
- `img.html` is **out of scope** — its `.Ordinal` is a parent-scoped active-slide test, not an id.

## File Structure

| File | Repo | Change |
| --- | --- | --- |
| `exampleSite/content/en/id-demo.md` | hinode | New fixture: two of each component, in `{{< example >}}` blocks. |
| `layouts/_shortcodes/carousel.html` | hinode | Self-contained swap. |
| `layouts/_shortcodes/navbar.html` | hinode | Self-contained swap. |
| `layouts/_shortcodes/toast.html` | hinode | Self-contained swap. |
| `layouts/_shortcodes/file.html` | hinode | Self-contained swap. |
| `layouts/_shortcodes/docs.html` | hinode | Self-contained swap. |
| `layouts/_shortcodes/accordion.html` | hinode | Lazy-shared parent. |
| `layouts/_shortcodes/accordion-item.html` | hinode | Lazy-shared child. |
| `layouts/_shortcodes/nav.html` | hinode | Lazy-shared parent. |
| `layouts/_shortcodes/nav-item.html` | hinode | Lazy-shared child. |
| `layouts/shortcodes/animation.html` | mod-lottie | Self-contained swap + mod-utils bump. |
| `layouts/shortcodes/map.html` | mod-leaflet | Self-contained swap + mod-utils bump. |
| `layouts/partials/assets/preview.html` | mod-blocks | Gate `aria-labelledby`/`role` on `not $showFallback`. |

---

### Task 1: hinode self-contained shortcodes + the collision fixture

Establishes the fixture every later hinode task verifies against, and converts the five shortcodes
whose ids are used only internally.

**Files:**

- Create: `exampleSite/content/en/id-demo.md`
- Modify: `layouts/_shortcodes/carousel.html:21`, `layouts/_shortcodes/navbar.html:24`,
  `layouts/_shortcodes/toast.html:24`, `layouts/_shortcodes/file.html:53`,
  `layouts/_shortcodes/docs.html:33`

**Interfaces:**

- Consumes: `partial "utilities/UniqueID.html" (dict "prefix" "<name>")` → `"<prefix>-UID-<n>"`.
- Produces: the fixture page `exampleSite/public/en/id-demo/index.html`, referenced by Tasks 2–4.

- [ ] **Step 1: Write the fixture page**

Create `exampleSite/content/en/id-demo.md`. Each component appears twice, each inside its own
`{{< example >}}` block — the arrangement that triggers the collision.

````markdown
---
title: Id Demo
---

## Accordion

{{< example >}}
{{< accordion >}}
{{< accordion-item header="A1" >}}First accordion, first item.{{< /accordion-item >}}
{{< accordion-item header="A2" >}}First accordion, second item.{{< /accordion-item >}}
{{< /accordion >}}
{{< /example >}}

{{< example >}}
{{< accordion >}}
{{< accordion-item header="B1" >}}Second accordion, first item.{{< /accordion-item >}}
{{< /accordion >}}
{{< /example >}}

## Carousel

{{< example >}}
{{< carousel ratio="21x9" class="col-12" >}}
{{< img src="img/coffee.jpg" ratio="21x9" >}}
{{< /carousel >}}
{{< /example >}}

{{< example >}}
{{< carousel ratio="21x9" class="col-12" >}}
{{< img src="img/coffee.jpg" ratio="21x9" >}}
{{< /carousel >}}
{{< /example >}}

## Nav

{{< example >}}
{{< nav >}}
{{< nav-item header="Tab 1" show="true" >}}First nav, tab one.{{< /nav-item >}}
{{< nav-item header="Tab 2" >}}First nav, tab two.{{< /nav-item >}}
{{< /nav >}}
{{< /example >}}

{{< example >}}
{{< nav >}}
{{< nav-item header="Tab 1" show="true" >}}Second nav, tab one.{{< /nav-item >}}
{{< /nav >}}
{{< /example >}}

## Toast

{{< example >}}{{< toast >}}First toast.{{< /toast >}}{{< /example >}}
{{< example >}}{{< toast >}}Second toast.{{< /toast >}}{{< /example >}}
````

If a shortcode's exact argument set here is wrong for the current theme (e.g. `carousel`/`nav`
argument names), correct it against `data/structures/*.yml` — the point is only that each component
renders twice, once per example block.

- [ ] **Step 2: Write the determinism/uniqueness check script**

Create `$SCRATCH/verify-ids.mjs` (scratch — never committed). It scans the **whole built site**
for bare `<prefix>-<n>` ids — so `navbar`, `file` and `docs` (awkward to place in the fixture) are
covered wherever the exampleSite and its mounted docs actually use them — and separately asserts the
fixture's accordion distinctness and per-page id uniqueness.

```js
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

// Recursively collect every built HTML file.
const walk = dir => readdirSync(dir, { withFileTypes: true }).flatMap(e => {
  const p = join(dir, e.name)
  return e.isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []
})
const files = walk('exampleSite/public')
const fail = []

// After migration, no page anywhere may carry a bare `<prefix>-<n>` id — only `<prefix>-UID-<n>`.
const prefixes = ['carousel', 'navbar-collapse', 'toast-message', 'file-collapse',
  'docs-collapse', 'accordion', 'nav']
for (const f of files) {
  const html = readFileSync(f, 'utf8')
  for (const p of prefixes) {
    // `<prefix>-<digit>` inside an id/href/target that is NOT `<prefix>-UID-...`
    for (const m of html.matchAll(new RegExp(`["'#.]${p}-(\\d)`, 'g'))) {
      // allow the -UID- form and the item/btn suffixes under a UID parent
      const ctx = html.slice(m.index, m.index + p.length + 8)
      if (!ctx.includes(`${p}-UID-`)) { fail.push(`${f}: bare ${ctx}`); break }
    }
  }
}

// Fixture-specific: two accordions must get DISTINCT container ids, and no id repeats on that page.
const demo = readFileSync('exampleSite/public/en/id-demo/index.html', 'utf8')
const ids = [...demo.matchAll(/\bid="([^"]+)"/g)].map(m => m[1])
const dupes = [...new Set(ids.filter((v, i) => ids.indexOf(v) !== i))]
if (dupes.length) fail.push(`id-demo duplicate id=: ${dupes.join(', ')}`)
const accIds = [...new Set([...demo.matchAll(/id="(accordion-UID-\d+)"/g)].map(m => m[1]))]
if (accIds.length < 2) fail.push(`id-demo: expected 2 distinct accordion ids, got ${accIds}`)

if (fail.length) { console.log('FAIL\n' + fail.slice(0, 20).map(f => '  - ' + f).join('\n')); process.exit(1) }
console.log('PASS — no bare ids site-wide; id-demo accordions distinct and unique')
```

The `["'#.]` prefix in the pattern anchors to where an id is *used* (`id="…"`, `href="#…"`,
`data-bs-target="#…"`, a `.class` selector), avoiding false hits on prose that merely contains the
word. If it still flags a legitimate non-shortcode source (e.g. a `nav-*` id emitted by a site-chrome
partial rather than the `nav` shortcode), note it and confirm the source is out of scope rather than
suppressing the check blindly.

- [ ] **Step 3: Build and watch the check fail on the baseline**

```bash
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn \
  && node "$SCRATCH/verify-ids.mjs"
```

Expected: **FAIL**. Nothing is migrated yet, so ids are `carousel-0`, `accordion-0` (twice → a
duplicate-id failure, and bare-N failures). Record it as the baseline.

- [ ] **Step 4: Convert the five self-contained shortcodes**

Each is a single-line change to the default-id expression. Apply exactly:

`layouts/_shortcodes/carousel.html:21`

```hugo
{{- $id := $args.id | default (partial "utilities/UniqueID.html" (dict "prefix" "carousel")) -}}
```

`layouts/_shortcodes/navbar.html:24`

```hugo
{{- $id := $args.id | default (partial "utilities/UniqueID.html" (dict "prefix" "navbar-collapse")) -}}
```

`layouts/_shortcodes/toast.html:24`

```hugo
{{- $id := $args.id | default (partial "utilities/UniqueID.html" (dict "prefix" "toast-message")) -}}
```

`layouts/_shortcodes/file.html:53`

```hugo
{{- $id := $args.id | default (partial "utilities/UniqueID.html" (dict "prefix" "file-collapse")) -}}
```

`layouts/_shortcodes/docs.html:33`

```hugo
{{- $id := $args.id | default (partial "utilities/UniqueID.html" (dict "prefix" "docs-collapse")) -}}
```

Note `navbar` drops its old `add .Ordinal 1` — `UniqueID` is already 1-based.

- [ ] **Step 5: Rebuild; the carousel/toast checks now pass (accordion/nav still fail)**

```bash
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn \
  && node "$SCRATCH/verify-ids.mjs" ; true
```

Expected: still FAIL, but only on `accordion`/`nav` (converted in Tasks 2–3). Confirm the failure
list no longer mentions `carousel`, `toast`, or any of the five converted prefixes.

- [ ] **Step 6: Lint and commit**

```bash
npm test
git add layouts/_shortcodes/carousel.html layouts/_shortcodes/navbar.html \
        layouts/_shortcodes/toast.html layouts/_shortcodes/file.html \
        layouts/_shortcodes/docs.html exampleSite/content/en/id-demo.md
git commit -m "fix(shortcodes): give self-contained ids the UniqueID helper

carousel, navbar, toast, file and docs built their id from .Ordinal, which
resets to 0 inside the example shortcode's embedded RenderString - so two of a
component in two example blocks collided. Use the UniqueID helper, which counts
from a page Store counter. The explicit id argument still overrides."
```

(`exampleSite/hugo_stats.json` may be dirtied by the build — leave it uncommitted; Task 8 handles
build stats.)

---

### Task 2: hinode accordion (lazy-shared parent/child)

**Files:**

- Modify: `layouts/_shortcodes/accordion.html:21`
- Modify: `layouts/_shortcodes/accordion-item.html:29-35`

**Interfaces:**

- Consumes: `UniqueID` (prefix `accordion`); the fixture from Task 1.
- Produces: an accordion container whose `id` equals what its items write to `data-bs-parent`.

- [ ] **Step 1: Convert the parent (`accordion.html`)**

Replace line 21:

```hugo
{{- $id := $args.id | default (printf "accordion-%d" .Ordinal) -}}
```

with the lazy-shared resolution:

```hugo
{{- $id := $args.id -}}
{{- if not $id -}}
    {{- $id = .Scratch.Get "resolved-id" -}}
    {{- if not $id -}}
        {{- $id = partial "utilities/UniqueID.html" (dict "prefix" "accordion") -}}
        {{- .Scratch.Set "resolved-id" $id -}}
    {{- end -}}
{{- end -}}
```

Everything below (the `alwaysOpen` `data-bs-parent` strip at lines 24-27, the container at line 31)
already reads `$id`, so it follows automatically. The strip works because `$id` now equals the same
value the items wrote (they share the scratch), which is exactly what the old `.Parent.Ordinal`
recompute guaranteed.

- [ ] **Step 2: Convert the child (`accordion-item.html`)**

The current block is:

```hugo
{{- $id := .Ordinal -}}
{{ $parent := "" }}
{{ if not $error }}
    {{- $parent = printf "accordion-%d" .Parent.Ordinal -}}
    {{- with (.Parent.Get "id") -}}
        {{- $parent = . -}}
    {{- end -}}
```

Replace the `$parent` derivation (keep `$id := .Ordinal` — that is the parent-scoped item index):

```hugo
{{- $id := .Ordinal -}}
{{ $parent := "" }}
{{ if not $error }}
    {{- $parent = .Parent.Get "id" -}}
    {{- if not $parent -}}
        {{- $parent = .Parent.Scratch.Get "resolved-id" -}}
        {{- if not $parent -}}
            {{- $parent = partial "utilities/UniqueID.html" (dict "prefix" "accordion") -}}
            {{- .Parent.Scratch.Set "resolved-id" $parent -}}
        {{- end -}}
    {{- end -}}
```

The explicit-parent-`id` override is now checked *first* (was last); behaviour is identical when an
`id` is set, and the scratch-or-mint replaces the broken `.Parent.Ordinal` recompute when it is not.
The `-heading-{{ $id }}` / `-item-{{ $id }}` suffixes further down are unchanged.

- [ ] **Step 3: Rebuild and check the accordion is now correct**

```bash
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn
# the two accordions must now have distinct container ids, each matching its items' data-bs-parent
grep -oE 'id="accordion-UID-[0-9]+"|data-bs-parent="#accordion-UID-[0-9]+"' \
  exampleSite/public/en/id-demo/index.html | sort | uniq -c
```

Expected: two distinct `accordion-UID-N` values, and each container id matched by its items'
`data-bs-parent`. No `accordion-0`.

- [ ] **Step 4: Lint and commit**

```bash
npm test
git add layouts/_shortcodes/accordion.html layouts/_shortcodes/accordion-item.html
git commit -m "fix(shortcodes): share the accordion id through the parent Scratch

The item rebuilt its parent's id from .Parent.Ordinal, which collides inside the
example shortcode. A UniqueID counter cannot be recomputed by the child, and
Hugo renders children before the parent body so the parent cannot push its id
down. Instead the first renderer mints the id and stores it in the parent's
Scratch; the parent and its other items read it back. The explicit id argument
still wins."
```

---

### Task 3: hinode nav (lazy-shared parent/child)

Same mechanism as Task 2, for `nav` / `nav-item`.

**Files:**

- Modify: `layouts/_shortcodes/nav.html:35`
- Modify: `layouts/_shortcodes/nav-item.html:24-26`

**Interfaces:**

- Consumes: `UniqueID` (prefix `nav`).

- [ ] **Step 1: Convert the parent (`nav.html`)**

The current partial call passes the id inline at line 35:

```hugo
        "id"                (or $args.id (printf "nav-%d" .Ordinal))
```

Resolve the id into a variable above the partial call, then pass the variable. Immediately before
the `{{- partial "assets/nav.html" (dict` line, insert:

```hugo
{{- $navID := $args.id -}}
{{- if not $navID -}}
    {{- $navID = .Scratch.Get "resolved-id" -}}
    {{- if not $navID -}}
        {{- $navID = partial "utilities/UniqueID.html" (dict "prefix" "nav") -}}
        {{- .Scratch.Set "resolved-id" $navID -}}
    {{- end -}}
{{- end -}}
```

and change the `"id"` line to:

```hugo
        "id"                $navID
```

- [ ] **Step 2: Convert the child (`nav-item.html`)**

Replace lines 24-26:

```hugo
    {{- $id := .Ordinal -}}
    {{- $parent := printf "nav-%d" .Parent.Ordinal -}}
    {{- with (.Parent.Get "id") }}{{ $parent = . }}{{ end -}}
```

with (keeping `$id := .Ordinal` as the parent-scoped item index):

```hugo
    {{- $id := .Ordinal -}}
    {{- $parent := .Parent.Get "id" -}}
    {{- if not $parent -}}
        {{- $parent = .Parent.Scratch.Get "resolved-id" -}}
        {{- if not $parent -}}
            {{- $parent = partial "utilities/UniqueID.html" (dict "prefix" "nav") -}}
            {{- .Parent.Scratch.Set "resolved-id" $parent -}}
        {{- end -}}
    {{- end -}}
```

The `$itemID := printf "%s-btn-%d" $parent $id` line below is unchanged.

- [ ] **Step 3: Rebuild and run the full determinism check — it must now PASS**

```bash
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn \
  && node "$SCRATCH/verify-ids.mjs"
```

Expected: **PASS** — every prefix `-UID-` shaped, no duplicate ids, two distinct accordions. This
is the first point where all hinode sites are migrated.

- [ ] **Step 4: Lint and commit**

```bash
npm test
git add layouts/_shortcodes/nav.html layouts/_shortcodes/nav-item.html
git commit -m "fix(shortcodes): share the nav id through the parent Scratch

nav-item rebuilt its parent's id from .Parent.Ordinal, which collides inside the
example shortcode. Resolve it the same way as the accordion: the first renderer
mints a UniqueID and stores it in the parent's Scratch; the nav container and its
items read it back. The explicit id argument still wins."
```

---

### Task 4: hinode browser verification

Determinism is proven; this proves each control still drives *its own* element.

**Files:** none (verification only).

- [ ] **Step 1: Serve the exampleSite on an isolated cache**

```bash
PATH="$PWD/node_modules/.bin:$PATH" HUGO_RESOURCEDIR="$SCRATCH/resources" HUGO_CACHEDIR="$SCRATCH/cache" \
  node_modules/.bin/hugo server -s exampleSite --port 1325 --disableFastRender
```

Run in the background. Use `127.0.0.1`, not `localhost`. The fixture is at
`http://127.0.0.1:1325/en/id-demo/`.

- [ ] **Step 2: Accordion — the parent/child case that matters most**

With the Playwright MCP tools, on `/en/id-demo/`:

- Open the **second** accordion's item. Only that item expands — the first accordion's items stay
  shut. (Before the fix, both accordions shared `accordion-0`, so the second's toggle drove the
  first.)
- Confirm from the DOM that the second accordion's `data-bs-parent` points at its own container id,
  distinct from the first's.
- Zero uncaught console exceptions.

- [ ] **Step 3: Nav, carousel, toast**

- **Nav:** click a tab in the second nav; only that nav's pane switches, the first nav is
  untouched.
- **Carousel:** advance the second carousel; the first does not move.
- **Toast:** both toasts have distinct ids (visual/DOM check; toasts need a trigger to show, so a
  DOM id-uniqueness check suffices here).
- Zero uncaught console exceptions on the page.

- [ ] **Step 4: Explicit-id override still works**

Append a temporary block to `exampleSite/content/en/id-demo.md`:

```markdown
## Explicit id

{{< accordion id="my-fixed-accordion" >}}
{{< accordion-item header="X" >}}Body.{{< /accordion-item >}}
{{< /accordion >}}
```

Rebuild, and confirm the container is `id="my-fixed-accordion"` and its item's `data-bs-parent` is
`#my-fixed-accordion` — the override flows through both parent and child. Then remove the temporary
block and rebuild.

- [ ] **Step 5: Stop the server and report**

Report any control that drove the wrong element, rather than working around it.

---

### Task 5: mod-lottie and mod-leaflet

Two identical one-line swaps, each in its own repo, each with a mod-utils bump to the release that
carries the helper.

**Files:**

- Modify: `../mod-lottie/layouts/shortcodes/animation.html:28`, `../mod-lottie/go.mod`
- Modify: `../mod-leaflet/layouts/shortcodes/map.html:25`, `../mod-leaflet/go.mod`

**Interfaces:**

- Consumes: `UniqueID` (prefixes `lottie-animation`, `leaflet-map`).

- [ ] **Step 1: Branch both modules from origin/main**

The local checkouts may be stale — branch from `origin/main`, which is where the current pins live.

```bash
git -C ../mod-lottie fetch origin main --quiet && git -C ../mod-lottie checkout -b fix/ordinal-id origin/main
git -C ../mod-leaflet fetch origin main --quiet && git -C ../mod-leaflet checkout -b fix/ordinal-id origin/main
grep mod-utils ../mod-lottie/go.mod ../mod-leaflet/go.mod
```

Expected: both on `mod-utils/v6` (v6.4.1 and v6.0.1 respectively).

- [ ] **Step 2: Bump both to mod-utils v6.5.0**

```bash
HUGO=/Users/mark/Development/GitHub/gethinode/hinode/node_modules/.bin/hugo
(cd ../mod-lottie && "$HUGO" mod get github.com/gethinode/mod-utils/v6@v6.5.0 && "$HUGO" mod tidy) 2>&1 | grep -v deprecated | tail -2
(cd ../mod-leaflet && "$HUGO" mod get github.com/gethinode/mod-utils/v6@v6.5.0 && "$HUGO" mod tidy) 2>&1 | grep -v deprecated | tail -2
grep mod-utils ../mod-lottie/go.mod ../mod-leaflet/go.mod
```

Expected: both now pin `mod-utils/v6 v6.5.0`.

- [ ] **Step 3: Convert `animation.html`**

`../mod-lottie/layouts/shortcodes/animation.html:28` currently reads:

```hugo
{{- $id := or $args.id  (printf "lottie-animation-%d" .Ordinal) -}}
```

Replace with:

```hugo
{{- $id := or $args.id (partial "utilities/UniqueID.html" (dict "prefix" "lottie-animation")) -}}
```

- [ ] **Step 4: Convert `map.html`**

`../mod-leaflet/layouts/shortcodes/map.html:25` currently reads:

```hugo
{{- $id := $args.id | default (printf "leaflet-map-%d" .Ordinal) -}}
```

Replace with:

```hugo
{{- $id := $args.id | default (partial "utilities/UniqueID.html" (dict "prefix" "leaflet-map")) -}}
```

- [ ] **Step 5: Confirm no `.Ordinal` id remains in either**

```bash
grep -rn 'Ordinal' ../mod-lottie/layouts/shortcodes/animation.html ../mod-leaflet/layouts/shortcodes/map.html || echo "none remaining"
```

Expected: `none remaining`.

- [ ] **Step 6: Commit each repo**

Both modules build against the released mod-utils v6.5.0, so their own pre-commit hooks pass —
no `--no-verify` needed. If a hook still fails because the module cannot vendor v6.5.0 yet, commit
with `--no-verify` and run `npx commitlint --edit <msgfile>` separately.

```bash
git -C ../mod-lottie add layouts/shortcodes/animation.html go.mod go.sum
git -C ../mod-lottie commit -m "fix(shortcodes): give the animation id the UniqueID helper

The id was built from .Ordinal, which resets to 0 inside the example shortcode's
embedded RenderString, so two animations in two example blocks collided. Use
mod-utils' UniqueID helper (v6.5.0)."
git -C ../mod-leaflet add layouts/shortcodes/map.html go.mod go.sum
git -C ../mod-leaflet commit -m "fix(shortcodes): give the map id the UniqueID helper

The id was built from .Ordinal, which resets to 0 inside the example shortcode's
embedded RenderString, so two maps in two example blocks collided. Use
mod-utils' UniqueID helper (v6.5.0)."
```

(End-to-end verification of these two happens in Task 8, against the hinode exampleSite with a local
override, because these components fully render only there.)

---

### Task 6: mod-blocks preview.html ARIA fix

**Files:**

- Modify: `../mod-blocks/layouts/partials/assets/preview.html:322-326`

**Interfaces:** none shared.

- [ ] **Step 1: Branch mod-blocks from origin/main**

```bash
git -C ../mod-blocks fetch origin main --quiet && git -C ../mod-blocks checkout -b fix/preview-fallback-aria origin/main
```

- [ ] **Step 2: Gate the tab-pane ARIA on `not $showFallback`**

The tab pane currently reads (around lines 322-326):

```hugo
            <div class="tab-pane fade{{ if $isActive }} show active{{ end }}"
                 id="{{ $id }}-{{ $device }}"
                 role="tabpanel"
                 aria-labelledby="{{ $id }}-{{ $device }}-tab">
```

The `role="tabpanel"` and `aria-labelledby` both reference a tab control that only exists when the
button group renders (`not $showFallback`). In fallback mode the pane is plain content. Gate both:

```hugo
            <div class="tab-pane fade{{ if $isActive }} show active{{ end }}"
                 id="{{ $id }}-{{ $device }}"
                 {{ if not $showFallback }}role="tabpanel" aria-labelledby="{{ $id }}-{{ $device }}-tab"{{ end }}>
```

- [ ] **Step 3: Verify against the hinode exampleSite (fallback case)**

mod-blocks' components render fully only in the hinode exampleSite. Wire a local override and build:

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode
printf 'go 1.19\n\nuse .\nuse ../\nuse ../../mod-blocks\n' > exampleSite/hinode.work
# add the replacements line under [module] in exampleSite/config/_default/hugo.toml:
#   replacements = 'github.com/gethinode/mod-blocks/v2 -> /Users/mark/Development/GitHub/gethinode/mod-blocks/'
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn
# On the preview docs page, a fallback preview (no url / blocked host) must emit NO aria-labelledby:
node -e '
const {readFileSync}=require("fs");
const h=readFileSync("exampleSite/public/en/docs/blocks/preview/index.html","utf8");
const ids=new Set([...h.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
const dangling=[...h.matchAll(/aria-labelledby="([^"]+)"/g)].map(m=>m[1]).filter(v=>!ids.has(v));
if(dangling.length){console.log("FAIL dangling aria-labelledby:",[...new Set(dangling)].slice(0,5));process.exit(1)}
console.log("PASS - every aria-labelledby resolves");
'
```

Expected: `PASS`. If the preview docs page has no fallback-mode preview, add a temporary fixture
page with `{{< preview >}}` and no `url` (which forces fallback), verify, then remove it.

- [ ] **Step 4: Revert the local override, commit mod-blocks only**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode
git checkout exampleSite/hinode.work exampleSite/config/_default/hugo.toml
git -C ../mod-blocks add layouts/partials/assets/preview.html
git -C ../mod-blocks commit -m "fix(blocks): drop dangling ARIA on preview fallback panes

Every tab pane emitted role=tabpanel and aria-labelledby pointing at a tab
button, but the button group is only rendered when not in fallback mode. In
fallback (no url, or a CSP-blocked host) the pane is plain content, so the
reference dangled. Gate both attributes on not showFallback."
```

---

### Task 7: cross-repo verification, clean-up and release handoff

Proves the lottie/leaflet changes render correctly in the hinode exampleSite, then leaves every
tree clean and hands off the release sequence.

**Files:**

- Modify: `exampleSite/hinode.work`, `exampleSite/config/_default/hugo.toml` (local-only, reverted)
- Modify: `exampleSite/hugo_stats.json` (build artefact)

- [ ] **Step 1: Wire local overrides for all three modules and build**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode
printf 'go 1.19\n\nuse .\nuse ../\nuse ../../mod-lottie\nuse ../../mod-leaflet\n' > exampleSite/hinode.work
# under [module] in exampleSite/config/_default/hugo.toml add:
#   replacements = 'github.com/gethinode/mod-lottie/v3 -> /Users/mark/Development/GitHub/gethinode/mod-lottie/, github.com/gethinode/mod-leaflet/v3 -> /Users/mark/Development/GitHub/gethinode/mod-leaflet/'
rm -rf exampleSite/public
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn
```

Both files are LOCAL-ONLY and reverted in Step 4. Confirm the module override took (not the vendored
copy) by checking the lottie/leaflet ids are `-UID-` shaped, not a hash or `-0`:

```bash
grep -rhoE '(lottie-animation|leaflet-map)-UID-[0-9]+' exampleSite/public/en/ 2>/dev/null | sort -u | head
grep -rlE '(lottie-animation|leaflet-map)-[0-9]+"' exampleSite/public/en/ 2>/dev/null | head -1 || echo "no bare -N ids (correct)"
```

Expected: `-UID-` ids present, no bare `-N`.

- [ ] **Step 2: Browser-check one lottie and one leaflet page**

Serve on port 1326 (isolated cache, `127.0.0.1`) and confirm on the animation and map docs pages
that the components render and initialise with zero uncaught console exceptions, and that two
instances on one page have distinct ids. Stop the server.

- [ ] **Step 3: Revert the overrides**

```bash
git checkout exampleSite/hinode.work exampleSite/config/_default/hugo.toml
git diff --stat exampleSite/hinode.work exampleSite/config/_default/hugo.toml
```

Expected: no output.

- [ ] **Step 4: Rebuild against vendored modules, commit build stats**

```bash
rm -rf exampleSite/public
PATH="$PWD/node_modules/.bin:$PATH" node_modules/.bin/hugo --gc -s exampleSite --logLevel warn
git status --short
```

The vendored mod-lottie/mod-leaflet do not yet carry these changes, so their ids revert to `-N`
here — expected until they release. The hinode-native ids (accordion, nav, carousel, …) stay
`-UID-`. If `exampleSite/hugo_stats.json` changed **semantically** (new `-UID-` id names from the
hinode shortcodes), commit it:

```bash
git add exampleSite/hugo_stats.json
git commit -m "chore: update build stats"
```

- [ ] **Step 5: Confirm nothing stray is committed**

```bash
git log --oneline main..HEAD
git diff --stat main..HEAD
```

Expected: the spec, the plan, the five self-contained shortcodes + fixture, accordion, nav, and the
build stats. No `hinode.work`, no `exampleSite/config/_default/hugo.toml`, no scratch script, no
temporary content page.

- [ ] **Step 6: Report the release sequence**

Five branches, no ordering chain (mod-utils v6.5.0 is already released):

- `hinode:feat/ordinal-id-migration`
- `mod-lottie:fix/ordinal-id`
- `mod-leaflet:fix/ordinal-id`
- `mod-blocks:fix/preview-fallback-aria`

State that each is independent: merge/release in any order. hinode's exampleSite picks up the new
lottie/leaflet ids once those modules release and hinode's `exampleSite/go.mod` is bumped (a
follow-up at merge time, as before). Every branch carries a `fix:` commit, so each cuts a patch.
Note in each release: **auto-generated component ids changed shape (`accordion-0` → `accordion-UID-1`);
sites needing a stable anchor should set the `id` argument.**

---

## Notes for the reviewer

- **The lazy-shared-id is the crux.** Hugo renders a shortcode's children before its own body
  (verified), so the parent cannot hand its id to the child. First-renderer-mints, stored in the
  parent's `.Scratch`, is what lets parent and children agree on one page-unique id — including
  inside `{{< example >}}`, where `.Ordinal` collapses to 0.
- **Item indices intentionally stay `.Ordinal`.** A nested shortcode's `.Ordinal` is parent-scoped
  and only ever a suffix under the unique parent id, so it cannot collide.
- **The breaking id change is accepted and documented.** The `id` argument is the stability escape
  hatch, unchanged on every shortcode.
