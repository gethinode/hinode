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

In scope:

- `layouts/_shortcodes/example.html`
- `layouts/_shortcodes/example-bookshop.html` (shares the same structure file)
- `data/structures/example.yml`
- `assets/scss/components/_docs.scss`
- an exercising example in `exampleSite`
- documentation guidance (carried into gethinode.com separately; no code there)

Out of scope: iframe previews, container-query adoption, keyboard-accessible resizing.

## Design

### Arguments

Both new arguments are defined inline in `data/structures/example.yml`, alongside the existing
deprecated `show_markup` / `show_preview` definitions. They are deliberately **not** added to
mod-utils' global `_arguments.yml`: that would require a cross-repo PR, a mod-utils release and a
`go.mod` bump before Hinode could build, for two arguments only this structure uses. Both shortcodes
share `example.yml`, so both inherit the definitions automatically.

```yaml
  resize:
    type: bool
    optional: true
    default: false
    comment: >-
      Adds a grip to the lower-right corner of the preview, allowing the reader to
      resize it horizontally. Requires `show-preview` to be enabled.
  min-width:
    type: select
    optional: true
    default: none
    comment: >-
      Lower bound of a resizable preview, expressed as a breakpoint. Defaults to a
      200px floor. Ignored unless `resize` is enabled.
    options:
      values: [none, sm, md, lg, xl, xxl]
```

`release` fields are set to the actual release version at merge time.

Horizontal is the only supported axis. Vertical resizing has no payoff: a preview's height is
intrinsic, so dragging taller adds dead space and dragging shorter clips content.

`min-width` is a breakpoint token rather than a free-form CSS length **because Hinode templates may
not emit inline `style` attributes** (Content Security Policy — see Constraints). The floor must come
from a bounded set of classes. Breakpoint tokens reuse the vocabulary mod-utils already defines
globally. The trade-off, accepted: authors can floor a preview at 768px but not at 340px.

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
  <div id="…" class="p-5 rounded-top …">                     <!-- unchanged -->
    <div class="example-resizable example-resizable-md">     <!-- new, only when resize=true -->
      …preview content…
    </div>
  </div>
  …markup panel unchanged…
</div>
```

The modifier class is emitted only when `min-width` is not `none`.

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

@each $breakpoint, $width in $grid-breakpoints {
    @if $width > 0 {
        .example-resizable-#{$breakpoint} { min-width: $width; }
    }
}
```

`$grid-breakpoints` is in scope: Bootstrap is imported before the components in both entry points,
and `components/_navbar.scss` already loops over the same map. Breakpoints whose width is `0` (`xs`)
are skipped, since a `0` floor would sit below the base 200px.

No PurgeCSS safelist entry is required. The classes are written literally in the template, so each
site's `hugo_stats.json` captures the ones it actually renders.

## Constraints

**No inline styles.** Hinode templates must never emit `style="…"` attributes or inline `<style>`
blocks; the theme is designed so that sites can serve a CSP without `unsafe-inline` in `style-src`.
`layouts/` currently contains zero inline style attributes, and this design preserves that. (The
default `netlify.toml` policy still lists `'unsafe-inline'`, but that is legacy, not permission.)
This constraint is the sole reason `min-width` is a token select rather than a CSS length.

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

## Testing

- Add a resizable example to `exampleSite`. This is load-bearing beyond eyeballing: without a
  rendered instance, `.example-resizable` never enters `hugo_stats.json` and PurgeCSS strips the rule
  from the theme's own bundle.
- Verify the grip in light and dark mode.
- Verify `resize=true` with `show-preview=false` logs the warning and degrades to a normal preview.
- Verify each `min-width` token produces the expected floor.
- Run `npm run lint:styles` and build the exampleSite.

## Editorial guidance (for gethinode.com)

Enable `resize` where narrowing produces visible reflow: button groups, nav pills, breadcrumbs,
responsive tables, card groups, fluid images. Skip inline atoms (badge, kbd, abbr, spinner), where
there is nothing to see, and anything overlay-based (dropdown, tooltip, popover, modal), which
limitation 2 would clip.

## Delivery

Branch fresh from `develop`; the current `feat/table-wrap-datatables` branch is unrelated work.
