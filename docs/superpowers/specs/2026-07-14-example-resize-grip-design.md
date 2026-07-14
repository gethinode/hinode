# Design: optional resize grip for the `example` shortcode

Date: 2026-07-14
Status: Approved (pending spec review)

## Summary

Add an optional, author-controlled resize grip to the preview area of the `example` and
`example-bookshop` shortcodes. Readers can drag the lower-right corner of a preview to narrow it and
observe how the rendered component reflows.

The feature is implemented in CSS alone. It requires no JavaScript and no Bootstrap 6 code.

## Motivation

Bootstrap's v6 documentation offers a resizable navbar example ("Use the lower-right corner grip to
resize to preview responsive behavior"). The same affordance would help Hinode readers understand how
components behave at narrower widths without resizing their browser window.

## Background: how Bootstrap does it

Their implementation is entirely CSS. From the compiled v6 docs stylesheet:

```css
.bd-example-resizable   { padding: .375rem; position: relative; }
.bd-resizable-container { resize: horizontal; overflow: hidden; max-width: 100%;
                          padding: 1rem; background-color: var(--bs-bg-body);
                          border-radius: var(--bs-radius-4); }
```

The grip is the browser's native resizer, supplied by the `resize` property. There is no JavaScript
and no v6-only class involved, so the technique ports cleanly to Hinode.

### The constraint that shapes the design

What makes Bootstrap's demo compelling is not the grip but the markup it wraps: their navbar uses
`md:navbar-expand`, a **container-query** variant. Narrowing the container fires the container query
and the navbar genuinely collapses.

Hinode ships Bootstrap 5, where `navbar-expand-*`, `col-md-*` and `d-lg-none` are **viewport media
queries**. Neither the theme SCSS nor the vendored mod-bootstrap contains a single `@container` or
`container-type` declaration. Narrowing a Hinode preview therefore squeezes the layout; it does not
trigger any breakpoint.

This is accepted rather than solved. The grip demonstrates **fluid reflow**, not breakpoint behavior:

- flex wrapping (button groups, nav pills, badge rows)
- text wrapping and truncation
- `.table-responsive` gaining a horizontal scrollbar
- `img-fluid` scaling
- cards stretching within a flex row

The documentation must state this plainly, or the feature over-promises.

Rejected alternatives: rendering previews in an iframe (real viewport, real media queries) was judged
disproportionate — it needs a standalone render target per example, height syncing and CSP work, and
arguably belongs in the existing `preview` component. Adding `container-type: inline-size` for
forward compatibility was rejected as premature, since it introduces containment side effects with no
present payoff.

## Scope

This work spans two repositories.

**hinode** (the capability):

- `layouts/_shortcodes/example.html`
- `layouts/_shortcodes/example-bookshop.html` (shares the same structure file)
- `data/structures/example.yml`
- `assets/scss/components/_docs.scss`

**mod-docs** (the application):

- `content/components/*.md` — enable `resize` on the eligible pages listed below

The documentation pages live in mod-docs, which the Hinode exampleSite imports. That makes the
exampleSite the integration surface where both halves can be verified together.

Out of scope: iframe previews, container-query adoption, keyboard-accessible resizing, and the
`content/blocks/*.md` pages (block-level layouts are section-driven and not the target here).

## Design

### Arguments

The shortcode gains exactly **one** new argument, defined inline in `data/structures/example.yml`
alongside the existing deprecated `show_markup` / `show_preview` definitions. It is deliberately
**not** added to mod-utils' global `_arguments.yml`: that would require a cross-repo PR, a mod-utils
release and a `go.mod` bump before Hinode could build, for one argument only this structure uses.
Both shortcodes share `example.yml`, so both inherit the definition automatically.

```yaml
  resize:
    type: bool
    optional: true
    default: false
    comment: >-
      Adds a grip to the lower-right corner of the preview, allowing the reader to
      resize it horizontally. Requires `show-preview` to be enabled.
    release: v3.1.0
```

Horizontal is the only supported axis. Vertical resizing has no payoff: a preview's height is
intrinsic, so dragging taller adds dead space and dragging shorter clips content.

The floor is a fixed 200px, set in SCSS. It is not configurable.

### Rejected: a configurable `min-width` (removed before merge)

An earlier revision of this design shipped a second argument, `min-width`, taking a Bootstrap
breakpoint token (`sm`…`xxl`) that emitted a modifier class such as
`.example-resizable-md { min-width: 768px }`. It was implemented, then **removed at the final review**
after browser testing proved it broken. Recorded here so it is not reinvented:

1. **It burst the page.** In CSS, `min-width` beats `max-width: 100%`, so the box could not shrink to
   fit its parent. At a 390px viewport, `min-width="md"` rendered a 768px preview inside a 325px
   column — spilling 491px and giving the whole page a horizontal scrollbar. The theme deliberately
   declines a page-level `overflow-x: hidden` (see `_navbar.scss`), so nothing caught it.
2. **The vocabulary was wrong for the job.** Breakpoint tokens are *viewport* widths, but the thing
   being floored is the *preview container* — roughly 650px in the docs layout and 774px on a
   full-width page. So `md` (768px) already exceeded the docs column on desktop, and `lg`–`xxl`
   (992–1400px) could never fit anywhere. Wrapping the floors in a media query would have hidden the
   phone symptom while leaving the vocabulary mismatched.

The lesson generalises: a bounded class set is the right answer to the no-inline-styles constraint,
but the tokens must be scaled to the element being sized, not borrowed from an unrelated axis.

Dropping the argument cost nothing — none of the six enabled docs pages used it.

### Validation

If `resize` is `true` while `show-preview` is `false`, the shortcode emits a warning through the
existing `LogWarn` path (there is nothing to resize) and renders as though `resize` were `false`.

The template reads `$args.resize` directly. Per CLAUDE.md it must **not** use
`or $args.resize <fallback>`, which would swallow an explicit `false`.

### Markup

When `resize` is enabled, exactly one wrapper is inserted inside the existing preview div. Nothing
else changes; the author's `id` and `class` stay on the outer preview div, preserving current
semantics.

```html
<div class="border rounded mb-3">
  <div id="…" class="p-5 rounded-top …">      <!-- unchanged -->
    <div class="example-resizable">           <!-- new, only when resize=true -->
      …preview content…
    </div>
  </div>
  …markup panel unchanged…
</div>
```

The resize logic lives in a single partial, `layouts/_partials/utilities/GetResizeClass.html`, which
returns the wrapper class or an empty string. Both `example.html` and `example-bookshop.html` call
it, differing only in the `caller` they pass for warning messages. An empty return emits neither the
opening nor the closing tag, so the tags cannot fall out of balance.

The grip renders at the inner container's lower-right corner, already inset by the existing `p-5`
padding. Bootstrap's extra `.375rem` outer padding is therefore unnecessary here.

### Styling

The rules go in `assets/scss/components/_docs.scss`, which is already the documentation-UI bucket
(`.docs-panel`, `.docs-controls`). Reusing it avoids a new partial that would have to be imported
into **both** `app.scss` and `app-dart.scss`.

```scss
.example-resizable {
    width: 100%;
    max-width: 100%;
    resize: horizontal;
    overflow: hidden;   // required — `resize` is inert on overflow: visible
    min-width: 200px;   // base floor, matches Bootstrap
}
```

That is the whole of it: five declarations and no modifiers. The 200px floor is safe at every
viewport — verified in a browser down to 390px, where the box sits at 229px inside a 325px column
with no page overflow.

No PurgeCSS safelist entry is required. The class is written literally in the template, so each
site's `hugo_stats.json` captures it.

## Component eligibility (mod-docs)

A component is eligible only if narrowing its container produces **real reflow** through `flex-wrap`
or intrinsic sizing. It is rejected if it depends on viewport media queries, overflows without
wrapping (and is therefore clipped by the required `overflow: hidden`), renders an overlay outside
the preview box, or manages its own size in JavaScript.

Verified against Bootstrap's SCSS in `_vendor/github.com/twbs/bootstrap/scss/`:

| Component | Behavior when the container narrows | Verdict |
| --- | --- | --- |
| `.nav` (tabs, pills) | `display: flex; flex-wrap: wrap` — wraps onto new lines | eligible |
| `.breadcrumb` | `display: flex; flex-wrap: wrap` — wraps | eligible |
| `.table-responsive` | `overflow-x: auto` — grows a scrollbar | eligible |
| `.btn-group` | `inline-flex`, no wrap — clipped | rejected |
| `.pagination` | `display: flex`, no wrap — clipped | rejected |
| `.navbar-expand-*` | `media-breakpoint-up` — viewport query, never collapses | rejected |
| `card-group` (Hinode) | emits `row-cols-{bp}-N` — viewport query | rejected |
| `timeline` (Hinode) | contains `media-breakpoint-up(sm)` | rejected |
| `card` (Hinode) | no media queries — narrows, text rewraps | eligible |

### Pages to enable

1. `content/components/navs-and-tabs.md` — the flagship case; tabs visibly wrap
2. `content/components/breadcrumb.md`
3. `content/components/table.md`
4. `content/components/image.md`
5. `content/components/carousel.md`
6. `content/components/card.md`

`table` and `carousel` are **verify-in-browser**: both involve JavaScript that may cache layout
(DataTables via mod-simple-datatables; the Bootstrap carousel). If either fails to redraw on
container resize, drop it from the list rather than adding a JS resize observer — that would exceed
the CSS-only remit of this design.

Not every example on an enabled page gets the grip. Only the examples that demonstrate reflow do; the
precise blocks are chosen during implementation and confirmed at the review gate.

### Rejected

`navbar` is rejected despite being Bootstrap's own showcase for the feature. On Bootstrap 5,
`navbar-expand-*` is a viewport media query, so dragging the grip squeezes the navbar without ever
collapsing it into the toggler — precisely the behavior a reader would expect and not get. This is
the single most misleading place we could put a grip. Revisit if Hinode adopts container queries.

Also rejected: `button-group`, `pagination` (clipped); `tooltip`, `popover`, `toast`, `modal`,
`dropdown` (overlays clipped by `overflow: hidden`); `map` (Leaflet requires `invalidateSize()` on
container resize and would render broken); and the inline atoms `badge`, `kbd`, `abbr`, `mark`,
`sub`, `sup`, `ins`, `spinner`, `icon`, where there is nothing to see.

## Constraints

**No inline styles.** Hinode templates must never emit `style="…"` attributes or inline `<style>`
blocks; the theme is designed so that sites can serve a CSP without `unsafe-inline` in `style-src`.
`layouts/` currently contains zero inline style attributes, and this design preserves that — verified
repo-wide at the final review. (The default `netlify.toml` policy still lists `'unsafe-inline'`, but
that is legacy, not permission.)

This constraint is why the preview carries a class rather than a computed width, and it is what ruled
out a free-form CSS length for the width floor — which in turn led to the breakpoint-token detour
recorded above.

## Known limitations

These are documented, not fixed:

1. **Bootstrap 5 breakpoints do not fire.** See "The constraint that shapes the design" above.
2. **`overflow: hidden` clips overlays.** Dropdowns, tooltips, popovers and other
   absolutely-positioned content that escapes the preview box will be cut off. Do not enable `resize`
   on examples that open an overlay.
3. **Pointer-only.** The native grip is not keyboard- or touch-accessible. Resizing is a progressive
   enhancement — the example remains fully legible and functional without it — so no ARIA is added.
   Bootstrap makes the same call.

RTL is not a concern: Hinode ships no right-to-left languages (`i18n/` holds en, nl, fr, de, pl,
pt-br, zh-hans, zh-hant).

## Verification

### Cross-repo dev server

The Hinode exampleSite imports mod-docs, so it is where the theme change and the docs change render
together. To wire the local mod-docs checkout into it:

- Add `use ../../mod-docs` to `exampleSite/hinode.work`. Workspace `use` directives take precedence
  over config replacements. This is a **local edit — do not commit it**; revert `hinode.work` (and
  `hugo_stats.json`) afterwards.
- Serve with the project-pinned binary, `node_modules/.bin/hugo`. The system `hugo` is older and
  fails with `"modulequeries" is not a valid cache name`.
- Do **not** use `npm run start:example` / `build:example` for this: their prestart step re-vendors
  modules from the remote and would wipe the local mod-docs changes.
- Do **not** start a second `hugo server` alongside one already running — it poisons the shared CSS
  cache in `resources/_gen`.

PurgeCSS caveat: on a cold build, PurgeCSS can strip classes that appear on only one page. If
`.example-resizable` goes missing from the built CSS, warm the build (or add a safelist entry) rather
than assuming the SCSS is wrong.

### Review gate

The modified pages are presented on the local dev server for manual review **before anything is
committed**. This is where the verify-in-browser items (`table`, `carousel`) are resolved, and where
the per-example selection within each page is confirmed.

### Checks

- Each enabled page: grip appears, drags, and the component visibly reflows.
- Grip renders correctly in light and dark mode.
- `resize=true` with `show-preview=false` logs the warning and degrades to a normal preview.
- The preview never overflows its column, **at any viewport** — this is the check that caught the
  `min-width` defect. Assert `document.scrollWidth <= document.clientWidth` at a phone width, not just
  that the preview looks right on a desktop.
- No overlay-bearing example is clipped (none should be enabled).
- `npm run lint` in both repos.

### Outcome (2026-07-14)

All six enabled pages verified in a browser. Measured reflow: tabs wrap 1→3 rows; breadcrumb wraps
2→4 rows; the responsive table's scroller tracks the container; image and carousel scale with ratio
preserved; the card rewraps. None clipped.

Both verify-in-browser risks **passed**: neither the DataTables integration nor the Bootstrap
carousel caches its layout, so no JavaScript redraw is needed and the CSS-only remit holds.

## Delivery

Two coordinated changes:

1. **hinode** — the capability. Branch fresh from `develop`; the current `feat/table-wrap-datatables`
   branch is unrelated work.
2. **mod-docs** — the application. Branch fresh from `main`. Depends on a Hinode release, so the
   docs change merges only after the theme change ships and the module reference is bumped.

Note: the local mod-docs checkout was 268 commits behind `origin/main` (a stale mod-template
scaffold) and was fast-forwarded on 2026-07-14 before this work began.
