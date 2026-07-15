# Design: migrate `.Ordinal`-derived ids to the UniqueID helper

Date: 2026-07-15
Status: Approved
Repositories: `gethinode/hinode`, `gethinode/mod-lottie`, `gethinode/mod-leaflet`, `gethinode/mod-blocks`

## Problem

Twelve shortcodes build a DOM id from Hugo's `.Ordinal`:

```hugo
{{- $id := $args.id | default (printf "accordion-%d" .Ordinal) -}}
```

`.Ordinal` is a shortcode's zero-based index among shortcodes of its type on the page. It works
on ordinary content, but it **resets to 0 inside an embedded `RenderString`** — which is exactly
what the `example` shortcode performs when it re-renders its inner content. Two accordions in two
`{{< example >}}` blocks therefore both become `accordion-0`, and their items both reference
`#accordion-0`. Bootstrap's `data-bs-parent` resolves that with `querySelector`, so the second
accordion's toggles drive the first accordion's panels.

This was reproduced on a real build: a page with two `{{< example >}}` blocks, each holding an
`{{< accordion >}}`, emitted `accordion-0` twice. It hits the component-documentation pages
hardest, where every component is wrapped in `{{< example >}}`.

A separate, smaller defect lives in the same family — a dangling ARIA reference in mod-blocks'
`preview.html` — and is folded into this effort.

## Scope

**Eleven id-generating sites**, not twelve. `img.html` (a `carousel-item`) uses `.Ordinal` only
for `eq .Ordinal 0` — the active-slide test — which is **parent-scoped** to its carousel and never
becomes an id. It is example-safe and excluded.

| Repo | Shortcode | Current id |
| --- | --- | --- |
| hinode | accordion | `accordion-<n>` |
| hinode | accordion-item | parent id via `.Parent.Ordinal` |
| hinode | carousel | `carousel-<n>` |
| hinode | navbar | `navbar-collapse-<n+1>` |
| hinode | nav | `nav-<n>` |
| hinode | nav-item | parent id via `.Parent.Ordinal` |
| hinode | toast | `toast-message-<n>` |
| hinode | file | `file-collapse-<n>` |
| hinode | docs | `docs-collapse-<n>` |
| mod-lottie | animation | `lottie-animation-<n>` |
| mod-leaflet | map | `leaflet-map-<n>` |

**Item indices stay.** `accordion-item` and `nav-item` each keep their own `.Ordinal` for the
`-item-<n>` / `-btn-<n>` suffix. A nested shortcode's `.Ordinal` is scoped to its parent, so item
indices are already unique within an accordion and example-safe — they only ever appear as a
suffix beneath the (now unique) parent id.

## The new id shape

Every site adopts mod-utils' `UniqueID` helper, which returns `<prefix>-UID-<n>` from a per-prefix
counter in the page's `Store`. So `accordion-0` becomes `accordion-UID-1`, `carousel-0` becomes
`carousel-UID-1`, and so on.

The `-UID-` segment matters for the same reason it does elsewhere: Hugo's `anchorize` lowercases
and de-duplicates repeated headings (an "Accordion" heading emits `accordion`, then `accordion-1`),
which would collide with a bare `accordion-1` id. The uppercase segment is unreachable for
`anchorize`, so the id cannot clash with a heading anchor.

### This is a breaking change, accepted

Every auto-generated id changes shape. Anyone who deep-linked to `#accordion-0` or wrote CSS
against `#carousel-0` is affected. These ids are auto-generated and undocumented, and every
affected shortcode already accepts an explicit `id` argument, which remains the escape hatch for a
stable anchor. The change is called out in each module's release notes. It is typed `fix:` in each
repo — a patch — rather than a major bump, because the ids are an undocumented implementation
detail; the release note carries the caveat.

## Design

### Mechanism A — self-contained shortcodes

`carousel`, `navbar`, `toast`, `file`, `docs`, mod-lottie `animation`, mod-leaflet `map`.

Each mints an id and uses it only for its own internal cross-references (a carousel's indicators
target its own slides; a file's tabs target its own body and footer). The change is a direct swap
of the default expression, preserving the explicit-`id` override:

```hugo
{{- $id := $args.id | default (partial "utilities/UniqueID.html" (dict "prefix" "carousel")) -}}
```

Prefixes match the current names minus the ordinal: `carousel`, `navbar-collapse`,
`toast-message`, `file-collapse`, `docs-collapse`, `lottie-animation`, `leaflet-map`.

(`nav` is *not* here — it is the parent of `nav-item` and belongs to Mechanism B below.)

`navbar` currently uses `add .Ordinal 1` (a 1-based counter); `UniqueID` is already 1-based, so the
prefix is simply `navbar-collapse`.

### Mechanism B — parent/child coupled shortcodes

`accordion` + `accordion-item`, and `nav` + `nav-item`.

The child currently reconstructs the parent's id by **recomputing** `printf "accordion-%d"
.Parent.Ordinal`. A `UniqueID` counter cannot be recomputed — the child calling the helper would
get a different tick. And the parent cannot push its id down to the child, because **Hugo renders
a shortcode's inner content before the parent template body runs** (verified: a parent that sets
`.Scratch` before referencing `.Inner` is still invisible to its already-rendered children).

The solution is a **lazy shared id**: whichever of parent or child renders first mints the id and
stores it in the *parent's* `.Scratch`; everyone else reads it back. Because children render first,
the first child mints; the parent and siblings read the stored value. An itemless parent renders
its body and mints for itself. Verified end to end: two accordions on one page get
`accordion-UID-1` and `accordion-UID-2`, every item paired to its own container, no collision even
inside `{{< example >}}`.

Concretely, both parent and child resolve the id as:

```hugo
{{/* parent (accordion.html) */}}
{{- $id := $args.id -}}
{{- if not $id -}}
    {{- $id = .Scratch.Get "resolved-id" -}}
    {{- if not $id -}}
        {{- $id = partial "utilities/UniqueID.html" (dict "prefix" "accordion") -}}
        {{- .Scratch.Set "resolved-id" $id -}}
    {{- end -}}
{{- end -}}
```

```hugo
{{/* child (accordion-item.html) — the explicit-parent-id override still wins */}}
{{- $parent := .Parent.Get "id" -}}
{{- if not $parent -}}
    {{- $parent = .Parent.Scratch.Get "resolved-id" -}}
    {{- if not $parent -}}
        {{- $parent = partial "utilities/UniqueID.html" (dict "prefix" "accordion") -}}
        {{- .Parent.Scratch.Set "resolved-id" $parent -}}
    {{- end -}}
{{- end -}}
```

`nav` / `nav-item` follow the identical shape with prefix `nav`. The child keeps its own
`.Ordinal` item index for the `-btn-<n>` suffix.

The scratch key is namespaced per shortcode family (`resolved-id` is scoped to the shortcode's own
`.Scratch`, so `accordion` and `nav` do not share it). The explicit-`id` override is checked first
in both parent and child, so a user-supplied id still flows through unchanged.

### Mechanism C — the preview.html ARIA fix (mod-blocks)

Unrelated to `.Ordinal`, folded in because it is the same class of defect (a DOM reference that
resolves to nothing).

`layouts/partials/assets/preview.html:326` emits `aria-labelledby="{{ $id }}-{{ $device }}-tab"`
on every tab pane, unconditionally. But the button group that creates those `-tab` control ids is
rendered only when `not $showFallback` (lines 315, 362). In fallback mode — no URL, or the iframe
host is blocked by CSP — the panes reference tab controls that do not exist, so every
`aria-labelledby` dangles.

Gate the `aria-labelledby` (and the `role="tabpanel"`, which is equally meaningless without a
controlling tab) on `not $showFallback`. In fallback mode the panes are plain content, not tab
panels, so neither attribute applies.

## Cross-repo coordination and release ordering

Four repositories, but only a two-level dependency:

- **mod-utils v6.5.0 is already released** and provides `UniqueID`.
- **hinode**, **mod-lottie**, **mod-leaflet** each bump their mod-utils pin to v6.5.0 (where not
  already there) and apply Mechanisms A/B. They are independent of one another and can merge in any
  order, each as its own PR.
- **mod-blocks** applies Mechanism C. It already pins mod-utils v6.5.0 (from the prior effort) and
  is independent of the other three.

hinode's exampleSite renders the mod-lottie and mod-leaflet shortcodes, so verifying hinode's
`animation`/`map` ids end to end needs those modules' changes present — done via a local module
override during development, exactly as the prior effort did, and confirmed for real against the
released modules once each publishes.

## Testing

- **Determinism + uniqueness:** build the hinode exampleSite twice; every affected page's ids are
  byte-identical across builds and no `id=` repeats within a page. The component-docs pages (which
  wrap each shortcode in `{{< example >}}`) are the primary target — two examples of the same
  component must now get distinct ids.
- **Behaviour, in a browser:** on the accordion, nav, carousel, navbar, toast, file, docs, lottie
  and leaflet docs pages, each control drives *its own* element — an accordion item opens only its
  own panel, a nav tab shows only its own pane, a carousel indicator advances only its own
  carousel — with zero uncaught console exceptions. The accordion and nav pages, which carry the
  parent/child coupling, are the ones that matter most.
- **Explicit-id override:** a shortcode given an explicit `id` still renders that id, and its
  children still reference it.
- **preview fallback:** on a preview whose iframe is blocked (fallback mode), no `aria-labelledby`
  points at a non-existent id; every `aria-labelledby` on the page resolves.
- `npm test` clean in each repo.

## Follow-up already unblocked

This is the migration the `UniqueID` helper was built for. After it lands, the only remaining
id-family item is any future component that emits a bare helper-derived container id, which the
`-UID-` shape already protects.
