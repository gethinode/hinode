# Example Resize Grip Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an optional, CSS-only resize grip to the preview area of Hinode's `example` shortcode, and enable it on the six eligible mod-docs component pages.

**Architecture:** The grip is the browser's native `resize` handle — three CSS declarations on a wrapper div the shortcode emits only when `resize=true`. No JavaScript, no Bootstrap 6 code. The width floor comes from a bounded set of breakpoint modifier classes, never an inline style. Work spans two repos: `hinode` supplies the capability, `mod-docs` applies it, and the Hinode exampleSite (which imports mod-docs) is where they are verified together.

**Tech Stack:** Hugo 0.164 (extended), Hugo modules, Bootstrap 5 SCSS, mod-utils v6 argument system.

**Spec:** `docs/superpowers/specs/2026-07-14-example-resize-grip-design.md`

## Global Constraints

- **No inline styles, ever.** Templates must never emit `style="…"` or `<style>` blocks (CSP). Any dynamic dimension comes from a bounded set of classes. `layouts/` currently has zero inline style attributes; keep it that way.
- **Horizontal axis only.** `resize: horizontal`. Never `vertical` or `both`.
- **No JavaScript.** If a component needs a resize observer to work, drop that component instead of adding JS.
- **Bootstrap 5 breakpoints will not fire on resize.** Never write docs copy claiming the grip demonstrates breakpoint or collapse behavior.
- **Version string for new arguments:** `release: v3.1.0` (Hinode shipped v3.0.0; this is the next feature release).
- **Workspace:** all hinode work happens in the isolated worktree at
  `/Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip`,
  on branch `worktree-example-resize-grip`, based on `origin/main`. The user's main checkout is on
  unrelated work with uncommitted changes — do not touch it.
- **Hugo invocation — this exact form, every time:**

  ```bash
  cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
  export PATH="$PWD/node_modules/.bin:$PATH"
  hugo --logLevel warn -s exampleSite
  ```

  Both halves matter. The pinned binary is required (the system `hugo` is older and fails with
  `"modulequeries" is not a valid cache name`), **and** `node_modules/.bin` must be on `PATH` or Hugo
  panics with `POSTCSS: … binary with name "postcss" not found in PATH`. The npm scripts work only
  because npm puts `node_modules/.bin` on `PATH` for you.
- **Never run `npm run start:example` or `npm run build:example` during this work.** Their prestart step re-vendors modules from the remote and wipes local mod-docs changes.
- **Never start a second `hugo server`** while one is already running — it poisons the shared CSS cache in `resources/_gen`.
- **`exampleSite/hinode.work` must not be committed.** The `use …/mod-docs` line is a local-only edit, reverted in Task 8.
- **Baseline (verified 2026-07-14):** `hugo -s exampleSite` exits 0, builds 96 pages, no errors. One
  pre-existing `.Site.AllPages` deprecation warning is expected and is not ours. `npm test` passes.
- **Commits:** Angular Conventional Commits. Body lines ≤ 100 chars (commitlint enforces this). Pre-commit hooks run linters; if a hook reformats files, re-commit.

---

## File Structure

**hinode** (worktree `.claude/worktrees/example-resize-grip`, branch `worktree-example-resize-grip`, from `origin/main`):

| File | Responsibility |
| --- | --- |
| `data/structures/example.yml` | Declares the `resize` and `min-width` arguments. Shared by both shortcodes. |
| `layouts/_partials/utilities/GetResizeClass.html` | **New.** Single source of the resize logic: returns the wrapper class (or `""`) and emits the show-preview warning. Called by both shortcodes. |
| `layouts/_shortcodes/example.html` | Calls the partial; wraps the preview when it returns a class. |
| `layouts/_shortcodes/example-bookshop.html` | Same, for bookshop previews. |
| `assets/scss/components/_docs.scss` | The `.example-resizable` rules and breakpoint modifiers. |
| `exampleSite/content/en/resize-demo.md` | Exercises the feature so `.example-resizable` enters `hugo_stats.json` (otherwise PurgeCSS strips the rule). |

**mod-docs** (branch `feat/example-resize-grip`, from `main`):

| File | Responsibility |
| --- | --- |
| `content/components/navs-and-tabs.md` | Enable grip on the tabs example (flagship). |
| `content/components/breadcrumb.md` | Enable grip on the default breadcrumb example. |
| `content/components/table.md` | Enable grip on the wide-table example. |
| `content/components/image.md` | Enable grip on the 1x1 ratio example. |
| `content/components/carousel.md` | Enable grip on the 1x1 carousel example. |
| `content/components/card.md` | Enable grip on the first card example. |

---

## Task 0: Workspace setup — ALREADY DONE (2026-07-14)

No action required. Recorded here so the state is auditable.

The four design/plan commits were originally made on `feat/table-wrap-datatables` (unrelated work), **interleaved** with that branch's own commits rather than stacked on top — so any `git reset --hard HEAD~N` would have destroyed table-wrap work. They were instead cherry-picked, additively, into an isolated worktree:

- **Worktree:** `/Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip`
- **Branch:** `worktree-example-resize-grip`, based on `origin/main` (`1d119630`)
- **Carries:** `37b9a378` design, `74345550` spec extension, `97239e0f` plan, `751f3d0f` plan fix
- **Dependencies installed** (`pnpm install`); baseline verified green.

Two loose ends, both harmless and both the user's call:

1. The original four commits still exist on `feat/table-wrap-datatables`. They are docs-only, so they will show as extra files in that branch's diff. Cleaning them up means rewriting a branch the user owns — **ask before doing it**, and note `backup/table-wrap-datatables` already exists as a safety net.
2. A local `feat/example-resize-grip` branch (off `develop`) was created before the switch to a worktree and is now redundant. Delete it once this work lands: `git branch -D feat/example-resize-grip`.

---

## Task 1: Declare the arguments

**Files:**

- Modify: `data/structures/example.yml`
- Create: `exampleSite/content/en/resize-demo.md`

**Interfaces:**

- Produces: arguments `resize` (bool, default `false`) and `min-width` (select over `none|sm|md|lg|xl|xxl`, default `none`). Templates read them as `$args.resize` and `$args.minWidth`.

- [ ] **Step 1: Write the failing test — a demo page that uses the new arguments**

Create `exampleSite/content/en/resize-demo.md`:

```markdown
---
title: Resize demo
description: Exercises the resizable preview of the example shortcode.
date: 2026-07-14
layout: single
---

A resizable preview with the default 200px floor. Drag the lower-right corner.

{{< example lang="html" resize="true" >}}
<ul class="nav nav-tabs">
  <li class="nav-item"><a class="nav-link active" href="#">Nav item one</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Nav item two</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Nav item three</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Nav item four</a></li>
</ul>
{{< /example >}}

A resizable preview floored at the `md` breakpoint (768px).

{{< example lang="html" resize="true" min-width="md" >}}
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>
{{< /example >}}
```

- [ ] **Step 2: Run the build to verify the arguments are rejected**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
export PATH="$PWD/node_modules/.bin:$PATH"
hugo --logLevel warn -s exampleSite 2>&1 | grep -i "resize\|invalid argument" | head
```

Expected: FAIL — warnings that `resize` / `min-width` are not valid arguments for structure `example`. This proves the argument system is the gate.

- [ ] **Step 3: Add the argument definitions**

In `data/structures/example.yml`, insert both arguments into the `arguments:` map, immediately after the `show-preview:` entry and **before** the `# deprecated arguments` comment:

```yaml
  resize:
    type: bool
    optional: true
    default: false
    comment: >-
      Adds a grip to the lower-right corner of the preview, allowing the reader to
      resize the preview horizontally. Requires `show-preview` to be enabled.
    release: v3.1.0
  min-width:
    type: select
    optional: true
    default: none
    comment: >-
      Lower bound of a resizable preview, expressed as a breakpoint. Defaults to a
      200px floor. Ignored unless `resize` is enabled.
    options:
      values:
        - none
        - sm
        - md
        - lg
        - xl
        - xxl
    release: v3.1.0
```

- [ ] **Step 4: Run the build to verify the arguments are accepted**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
export PATH="$PWD/node_modules/.bin:$PATH"
hugo --logLevel warn -s exampleSite 2>&1 | grep -i "resize\|invalid argument" | head
```

Expected: PASS — no output. The arguments validate. (The grip is not rendered yet; that is Task 2.)

- [ ] **Step 5: Commit**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
git add data/structures/example.yml exampleSite/content/en/resize-demo.md
git commit -m "feat(components): add resize and min-width arguments to example shortcode

Declares the arguments and adds an exampleSite page that exercises them. The
grip markup and styling follow."
```

---

## Task 2: Shared resize partial + wire into the `example` shortcode

Both shortcodes need identical resize logic. Rather than paste it twice (Task 3 would be a verbatim copy — a code-review defect), it lives in **one partial** that returns the wrapper class, or an empty string when no grip should render.

**Files:**

- Create: `layouts/_partials/utilities/GetResizeClass.html`
- Modify: `layouts/_shortcodes/example.html`

**Interfaces:**

- Consumes: `$args.resize`, `$args.minWidth` from Task 1.
- Produces: `partial "utilities/GetResizeClass.html" (dict "resize" <bool> "minWidth" <string> "showPreview" <bool> "caller" <string> "file" <page file> "position" <position>)` → returns a `string`: `""`, `"example-resizable"`, or `"example-resizable example-resizable-{bp}"`. It emits the `show-preview` warning itself. **Task 3 consumes this exact signature.**

- [ ] **Step 1: Write the failing test — assert the class reaches the rendered HTML**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
export PATH="$PWD/node_modules/.bin:$PATH"
hugo --logLevel warn -s exampleSite >/dev/null 2>&1
grep -o 'example-resizable[a-z-]*' exampleSite/public/en/resize-demo/index.html | sort -u
```

Expected: FAIL — no output. The arguments validate but nothing renders them.

- [ ] **Step 2: Create the shared partial**

Create `layouts/_partials/utilities/GetResizeClass.html`:

```hugo
{{/*
    Returns the wrapper class for a resizable example preview, or an empty string when no grip
    should be rendered. A grip is meaningless without a preview, so that combination warns and
    degrades to no grip.

    @param {bool} resize Whether a resize grip is requested.
    @param {string} minWidth Breakpoint token for the lower bound, or "none".
    @param {bool} showPreview Whether the calling shortcode renders a preview.
    @param {string} caller Name of the calling shortcode, used in the warning message.
    @param {page} file File of the calling page, used in the warning message.
    @param {string} position Position of the shortcode, used in the warning message.
    @returns {string}
*/}}

{{- $resize := .resize -}}
{{- $class := "" -}}

{{- if and $resize (not .showPreview) -}}
    {{- partial "utilities/LogWarn.html" (dict
        "partial"  .caller
        "warnid"   "warn-resize-without-preview"
        "msg"      "Argument 'resize' requires 'show-preview' to be enabled"
        "file"     .file
        "position" .position
    )}}
    {{- $resize = false -}}
{{- end -}}

{{- if $resize -}}
    {{- $class = "example-resizable" -}}
    {{- if and .minWidth (ne .minWidth "none") -}}
        {{- $class = printf "%s example-resizable-%s" $class .minWidth -}}
    {{- end -}}
{{- end -}}

{{- return $class -}}
```

Note: the partial reads `.resize` directly. Do **not** write `or .resize <fallback>` anywhere — `or` returns the first truthy value and would silently discard an explicit `false`.

- [ ] **Step 3: Call the partial from `example.html`**

In `layouts/_shortcodes/example.html`, in the "Initialize arguments" block, after the line `{{- $content := .InnerDeindent -}}`, append:

```hugo
{{- $resizeClass := partial "utilities/GetResizeClass.html" (dict
    "resize"      $args.resize
    "minWidth"    $args.minWidth
    "showPreview" $showPreview
    "caller"      "shortcodes/example.html"
    "file"        page.File
    "position"    .Position
) -}}
```

Then replace the preview block:

```hugo
            <div {{ with $args.id }}id="{{ . }}"{{ end }} class="p-5 {{ if $showMarkup }}rounded-top{{ end }} {{ with $args.class }} {{ . }}{{ end }}">
                {{- if eq $lang "html" -}}
                    {{- $content | safeHTML -}}
                {{- else -}}
                    {{- $content | .Page.RenderString | safeHTML -}}
                {{- end -}}
            </div>
```

with:

```hugo
            <div {{ with $args.id }}id="{{ . }}"{{ end }} class="p-5 {{ if $showMarkup }}rounded-top{{ end }} {{ with $args.class }} {{ . }}{{ end }}">
                {{- with $resizeClass -}}<div class="{{ . }}">{{- end -}}
                {{- if eq $lang "html" -}}
                    {{- $content | safeHTML -}}
                {{- else -}}
                    {{- $content | .Page.RenderString | safeHTML -}}
                {{- end -}}
                {{- with $resizeClass -}}</div>{{- end -}}
            </div>
```

An empty `$resizeClass` is falsy, so `with` emits neither the opening nor the closing tag.

- [ ] **Step 4: Run the test to verify the class renders**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
export PATH="$PWD/node_modules/.bin:$PATH"
hugo --logLevel warn -s exampleSite >/dev/null 2>&1
grep -o 'example-resizable[a-z-]*' exampleSite/public/en/resize-demo/index.html | sort -u
```

Expected: PASS — exactly two lines:

```text
example-resizable
example-resizable-md
```

- [ ] **Step 5: Verify the validation warning fires**

Temporarily append to `exampleSite/content/en/resize-demo.md`:

```markdown
{{< example lang="html" resize="true" show-preview="false" >}}
<p>No preview, so no grip.</p>
{{< /example >}}
```

Then run:

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
export PATH="$PWD/node_modules/.bin:$PATH"
hugo --logLevel warn -s exampleSite 2>&1 | grep "resize" | head -2
```

Expected: a warning containing `Argument 'resize' requires 'show-preview' to be enabled`.

Now **remove that temporary block** from `resize-demo.md` and rebuild to confirm the warning is gone.

- [ ] **Step 6: Commit**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
git add layouts/_shortcodes/example.html
git commit -m "feat(components): render resize grip wrapper in example shortcode

Emits a bounded resize class instead of an inline style, so the markup stays
compatible with a CSP that omits unsafe-inline for styles. Warns when resize is
set without a preview to resize."
```

---

## Task 3: Wire the shared partial into `example-bookshop`

**Files:**

- Modify: `layouts/_shortcodes/example-bookshop.html`

**Interfaces:**

- Consumes: the same `resize` / `min-width` arguments (both shortcodes share `data/structures/example.yml`).

- [ ] **Step 1: Add the resize logic**

Call the **same partial created in Task 2** — do not re-implement the logic here.

In `layouts/_shortcodes/example-bookshop.html`, in the "Initialize local arguments" block, after `{{- $sectionClass := printf "p-1 px-md-%d py-md-%d" $padding.x $padding.y -}}`, append:

```hugo
{{- $resizeClass := partial "utilities/GetResizeClass.html" (dict
    "resize"      $args.resize
    "minWidth"    $args.minWidth
    "showPreview" $showPreview
    "caller"      "shortcodes/example-bookshop.html"
    "file"        page.File
    "position"    .Position
) -}}
```

Only the `caller` value differs from the `example.html` call site.

- [ ] **Step 2: Wrap the preview content**

Replace the preview block:

```hugo
            <div {{ with $args.id }}id="{{ . }}"{{ end }} class="rounded-top p-3 {{ with $args.class }} {{ . }}{{ end }}">
                {{ if eq $type "bookshop" }}
                    {{ $partial | safeHTML }}
                {{ else }}
                    {{- $content | .Page.RenderString | safeHTML -}}
                {{ end }}
            </div>
```

with:

```hugo
            <div {{ with $args.id }}id="{{ . }}"{{ end }} class="rounded-top p-3 {{ with $args.class }} {{ . }}{{ end }}">
                {{- with $resizeClass -}}<div class="{{ . }}">{{- end -}}
                {{ if eq $type "bookshop" }}
                    {{ $partial | safeHTML }}
                {{ else }}
                    {{- $content | .Page.RenderString | safeHTML -}}
                {{ end }}
                {{- with $resizeClass -}}</div>{{- end -}}
            </div>
```

Careful: this file already uses `$partial` as a variable name (the rendered bookshop component). Do not shadow it.

- [ ] **Step 3: Verify the exampleSite still builds clean**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
export PATH="$PWD/node_modules/.bin:$PATH"
hugo --logLevel warn -s exampleSite 2>&1 | grep -iv "^$" | head
```

Expected: PASS — no warnings or errors.

- [ ] **Step 4: Commit**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
git add layouts/_shortcodes/example-bookshop.html
git commit -m "feat(components): render resize grip wrapper in example-bookshop

Mirrors the example shortcode so both previews share one argument contract."
```

---

## Task 4: Style the grip

**Files:**

- Modify: `assets/scss/components/_docs.scss`

**Interfaces:**

- Consumes: the `.example-resizable` and `.example-resizable-{sm,md,lg,xl,xxl}` classes emitted in Tasks 2–3.

The rules live in `_docs.scss` because it is already the documentation-UI bucket (`.docs-panel`, `.docs-controls`). A new partial would have to be imported into **both** `assets/scss/app.scss` and `assets/scss/app-dart.scss`; reusing this file avoids that.

- [ ] **Step 1: Write the failing test — assert the CSS reaches the bundle**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
export PATH="$PWD/node_modules/.bin:$PATH"
hugo --logLevel warn -s exampleSite >/dev/null 2>&1
grep -rho "resize:horizontal\|resize: horizontal" exampleSite/public/ --include=*.css | head
```

Expected: FAIL — no output. The class renders but nothing styles it.

- [ ] **Step 2: Add the styles**

Append to `assets/scss/components/_docs.scss`:

```scss
.example-resizable {
    width: 100%;
    max-width: 100%;
    min-width: 200px; // base floor, matches Bootstrap
    resize: horizontal;
    overflow: hidden; // required — `resize` is inert on overflow: visible
}

@each $breakpoint, $width in $grid-breakpoints {
    @if $width > 0 {
        .example-resizable-#{$breakpoint} {
            min-width: $width;
        }
    }
}
```

`$grid-breakpoints` is in scope: `bootstrap.scss` is imported before the components in both entry points, and `components/_navbar.scss` already loops over the same map. The `$width > 0` guard skips `xs`, whose `0` floor would sit below the 200px base.

- [ ] **Step 3: Run the test to verify the CSS is in the bundle**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
export PATH="$PWD/node_modules/.bin:$PATH"
hugo --logLevel warn -s exampleSite >/dev/null 2>&1
grep -rho "\.example-resizable[a-z-]*" exampleSite/public/ --include=*.css | sort -u
```

Expected: PASS — exactly these two:

```text
.example-resizable
.example-resizable-md
```

**Only the modifiers actually rendered survive.** PurgeCSS strips `-sm`, `-lg`, `-xl` and `-xxl` because no page uses them, and that is correct behavior — a downstream site that writes `min-width="lg"` renders that class, so its own `hugo_stats.json` keeps it. Do not "fix" this by safelisting all five.

If `.example-resizable` itself is missing, that is PurgeCSS stripping a class that renders on a single page in a cold build. Rebuild once (warm stats) before concluding the SCSS is wrong. If it still vanishes, add `example-resizable` to the safelist in `config/postcss.config.js`.

- [ ] **Step 4: Lint**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
npm run lint:styles
```

Expected: PASS — no stylelint errors.

- [ ] **Step 5: Commit**

```bash
git add assets/scss/components/_docs.scss
git commit -m "style: add resizable preview styles for the example shortcode

Uses the browser-native resize grip. Breakpoint floors are generated from
\$grid-breakpoints so they track the theme's own breakpoints."
```

---

## Task 5: Wire the local mod-docs checkout into the exampleSite

**Files:**

- Modify: `exampleSite/hinode.work` (**local only — never committed**)

- [ ] **Step 1: Add the workspace directive**

In the worktree, `exampleSite/hinode.work` is the committed version and reads:

```text
go 1.19

use .
use ../
```

(The user's main checkout has extra `use` lines for `mod-simple-datatables` and `mod-utils`, but those are uncommitted local edits belonging to their table-wrap work. They are not present here, and we do not need them.)

Add one line so it reads:

```text
go 1.19

use .
use ../
use ../../../../../mod-docs
```

**The five `../` are not a typo.** The path is resolved relative to `exampleSite/`, which sits inside the worktree at `hinode/.claude/worktrees/example-resize-grip/`. Climbing out takes five levels: `exampleSite` → worktree root → `worktrees` → `.claude` → `hinode` → `gethinode`, where `mod-docs` is a sibling. In a normal (non-worktree) checkout the same directive would be `use ../../mod-docs`.

Workspace `use` directives take precedence over config replacements.

- [ ] **Step 2: Confirm the local mod-docs is resolved, not the cached module**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
export PATH="$PWD/node_modules/.bin:$PATH"
hugo config mounts -s exampleSite 2>/dev/null | grep -i "mod-docs" | head -3
```

Expected: paths under `/Users/mark/Development/GitHub/gethinode/mod-docs`, **not** under `Library/Caches/hugo_cache`.

- [ ] **Step 3: Do not commit**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
git status --short exampleSite/hinode.work
```

Expected: shows as modified. Leave it uncommitted; Task 8 reverts it.

---

## Task 6: Enable the grip on the six eligible mod-docs pages

**Files:**

- Modify: `content/components/navs-and-tabs.md`
- Modify: `content/components/breadcrumb.md`
- Modify: `content/components/table.md`
- Modify: `content/components/image.md`
- Modify: `content/components/carousel.md`
- Modify: `content/components/card.md`

All paths are relative to `/Users/mark/Development/GitHub/gethinode/mod-docs`.

Enable the grip on **one representative example per page** — the one that best demonstrates reflow. Do not blanket-enable every example; a page of grips is noise.

- [ ] **Step 1: Create the branch**

```bash
cd /Users/mark/Development/GitHub/gethinode/mod-docs
git checkout main
git checkout -b feat/example-resize-grip
```

Expected: branch created from `c007fa5` (the checkout was fast-forwarded to `origin/main` on 2026-07-14).

- [ ] **Step 2: navs-and-tabs — the flagship, tabs visibly wrap**

In `content/components/navs-and-tabs.md` line 24, change:

```markdown
{{< example lang="hugo" >}}
{{</* nav class="justify-content-center" */>}}
```

to:

```markdown
{{< example lang="hugo" resize="true" >}}
{{</* nav class="justify-content-center" */>}}
```

- [ ] **Step 3: breadcrumb — wraps onto a second line**

In `content/components/breadcrumb.md` line 20, change:

```markdown
{{< example lang="hugo" >}}
{{</* breadcrumb */>}}
{{< /example >}}
```

to:

```markdown
{{< example lang="hugo" resize="true" >}}
{{</* breadcrumb */>}}
{{< /example >}}
```

- [ ] **Step 4: table — the 10-column table grows a horizontal scrollbar**

In `content/components/table.md` line 24, change:

```markdown
{{< example lang="markdown" >}}
{{</* table */>}}
| #  | Heading | Heading | Heading | Heading | Heading | Heading | Heading | Heading | Heading |
```

to:

```markdown
{{< example lang="markdown" resize="true" >}}
{{</* table */>}}
| #  | Heading | Heading | Heading | Heading | Heading | Heading | Heading | Heading | Heading |
```

- [ ] **Step 5: image — `img-fluid` scales with the container**

In `content/components/image.md` line 24, change:

```markdown
{{< example lang="hugo" >}}
{{</* image src="img/placeholder.png" ratio="1x1" wrapper="col-6 mx-auto" */>}}
{{< /example >}}
```

to:

```markdown
{{< example lang="hugo" resize="true" >}}
{{</* image src="img/placeholder.png" ratio="1x1" wrapper="col-6 mx-auto" */>}}
{{< /example >}}
```

- [ ] **Step 6: carousel — scales with the container**

In `content/components/carousel.md` line 22, change:

```markdown
{{< example lang="hugo" >}}
{{</* carousel id="carousel-1x1" ratio="1x1" class="col-sm-12 col-lg-6 mx-auto" */>}}
```

to:

```markdown
{{< example lang="hugo" resize="true" >}}
{{</* carousel id="carousel-1x1" ratio="1x1" class="col-sm-12 col-lg-6 mx-auto" */>}}
```

- [ ] **Step 7: card — narrows, text rewraps**

In `content/components/card.md` line 24, change the opening tag of the first example from:

```markdown
{{< example lang="hugo" >}}
```

to:

```markdown
{{< example lang="hugo" resize="true" >}}
```

- [ ] **Step 8: Confirm exactly six examples were enabled**

```bash
cd /Users/mark/Development/GitHub/gethinode/mod-docs
grep -rc 'resize="true"' content/components/ | grep -v ":0"
```

Expected: exactly six files, each with count `1`:

```text
content/components/breadcrumb.md:1
content/components/card.md:1
content/components/carousel.md:1
content/components/image.md:1
content/components/navs-and-tabs.md:1
content/components/table.md:1
```

- [ ] **Step 9: Verify no rejected component was touched**

```bash
cd /Users/mark/Development/GitHub/gethinode/mod-docs
grep -rl 'resize="true"' content/ | grep -E "navbar|button-group|pagination|tooltip|popover|toast|modal|map|timeline|card-group"
```

Expected: PASS — no output. Those components are rejected by the spec (viewport media queries, clipping, overlays, or JS-managed sizing).

- [ ] **Step 10: Lint, but do not commit yet**

```bash
cd /Users/mark/Development/GitHub/gethinode/mod-docs
npm run lint
```

Expected: PASS. **Do not commit** — Task 7 is the review gate, and the user has asked to see the rendered pages first.

---

## Task 7: Dev-server review gate (STOP — user review required)

**Files:** none

This is a hard stop. Nothing in mod-docs gets committed until the user has looked at the rendered pages.

- [ ] **Step 1: Start the dev server**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
export PATH="$PWD/node_modules/.bin:$PATH"
hugo server --port 1313 -s exampleSite
```

Run this in the background. Do **not** use `npm run start:example` (it re-vendors and wipes the local mod-docs changes), and do **not** start it if a `hugo server` is already running (it poisons the shared CSS cache).

- [ ] **Step 2: Present these URLs to the user**

```text
http://localhost:1313/en/docs/components/navs-and-tabs/
http://localhost:1313/en/docs/components/breadcrumb/
http://localhost:1313/en/docs/components/table/
http://localhost:1313/en/docs/components/image/
http://localhost:1313/en/docs/components/carousel/
http://localhost:1313/en/docs/components/card/
http://localhost:1313/en/resize-demo/
```

(If the docs pages 404, check `hugo config mounts -s exampleSite | grep mod-docs` from Task 5 Step 2 — the workspace directive is not resolving.)

- [ ] **Step 3: Confirm each item, and report results honestly**

For each of the six pages:

1. The grip is visible in the lower-right corner of the enabled preview.
2. Dragging it narrows the preview, and the component **visibly reflows** (tabs wrap; breadcrumb wraps; table gains a scrollbar; image scales; carousel scales; card text rewraps).
3. Nothing is clipped or visually broken.
4. The grip looks right in **both light and dark mode**.

**`table` and `carousel` are the verify-in-browser cases.** DataTables (mod-simple-datatables) and the Bootstrap carousel both manage layout in JavaScript and may cache width. If either fails to redraw on container resize, **drop it from the list** — revert that page's change. Do not add a JS resize observer; that exceeds the CSS-only remit of this design.

- [ ] **Step 4: Wait for the user's approval before proceeding.**

Report what you actually observed, including anything that looked wrong. If a component is dropped, say so and update the spec's eligibility list to match.

---

## Task 8: Commit and clean up

**Files:**

- Modify: `exampleSite/hinode.work` (revert)
- Modify: `docs/superpowers/specs/2026-07-14-example-resize-grip-design.md` (only if a component was dropped at the review gate)

- [ ] **Step 1: Commit the mod-docs changes**

```bash
cd /Users/mark/Development/GitHub/gethinode/mod-docs
git add content/components/
git commit -m "docs(components): enable resizable previews on eligible examples

Adds a resize grip to one representative example per page, where narrowing the
container produces real reflow. Navbar is deliberately excluded: navbar-expand-*
is a viewport media query on Bootstrap 5, so the grip would squeeze the navbar
without ever collapsing it.

Requires the resize argument added in Hinode v3.1.0."
```

- [ ] **Step 2: Revert the local workspace edit**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode/.claude/worktrees/example-resize-grip
git checkout exampleSite/hinode.work
git status --short
```

Expected: `exampleSite/hinode.work` no longer modified. If `exampleSite/hugo_stats.json` shows as modified, revert it too (`git checkout exampleSite/hugo_stats.json`) unless the diff is a genuine, intended addition of the new classes — in which case commit it.

- [ ] **Step 3: If a component was dropped at the review gate, update the spec**

Edit the "Pages to enable" list and the eligibility table in `docs/superpowers/specs/2026-07-14-example-resize-grip-design.md` so it matches what actually shipped, then:

```bash
git add docs/superpowers/specs/2026-07-14-example-resize-grip-design.md
git commit -m "docs: record review-gate outcome in resize grip spec"
```

- [ ] **Step 4: Full lint in both repos**

```bash
cd /Users/mark/Development/GitHub/gethinode/hinode && npm run lint
cd /Users/mark/Development/GitHub/gethinode/mod-docs && npm run lint
```

Expected: PASS in both.

- [ ] **Step 5: Report the delivery state**

The two branches ship in order: `hinode` first (the capability), then `mod-docs` (the application), because the docs change depends on the `resize` argument existing in a released Hinode. Report both branch names and the commits on each; do not open PRs unless asked.

---

## Notes for the implementer

- **The navbar is not an oversight.** It is Bootstrap's own showcase for this feature and we are deliberately not using it. On Bootstrap 5, `navbar-expand-*` compiles to a viewport media query, so the grip would never collapse the navbar into its toggler — the exact behavior a reader would expect. Do not "fix" this by adding the grip to the navbar page.
- **If a preview clips its content when narrowed,** that component was miscategorised — `overflow: hidden` is required for `resize` to work at all, so anything that overflows instead of wrapping gets cut off. Drop the component rather than removing `overflow: hidden`.
