# Design: a shared helper for deterministic element ids

Date: 2026-07-14
Status: Approved
Repositories: `gethinode/hinode`, `gethinode/mod-blocks`

## Problem

Several components generate a DOM id by hashing the current time:

```hugo
{{ $id := printf "faq-%s" (md5 (delimit (slice . now) "-")) }}
```

`now` is evaluated per call, so the id changes on **every build**. Any page carrying such a
component emits different HTML each time it is built, which defeats output diffing and makes
CDN and browser caches treat an unchanged page as changed.

A scan of every `gethinode` repository found the idiom in exactly five places. One — the table
shortcode's `data-filter-id` — was fixed while repairing the table category filter, and
replaced with a deterministic per-page counter held in `page.Store`. The other four all live in
**mod-blocks**:

| File | Id |
| --- | --- |
| `component-library/components/panels/panels.hugo.html:37` | `panel-<md5>` |
| `component-library/components/faq/faq.hugo.html:42` | `faq-<md5>` |
| `layouts/partials/assets/testimonial-carousel.html:48` | `testimonial-carousel-<md5>` |
| `layouts/partials/assets/preview.html:243` | `preview-<md5>` |

Hinode's `assets/nav.html` prefixes the panels id, which is why the symptom surfaces in
`hugo_stats.json` as `dropdown-panel-<md5>` churning on every build.

This design replaces the idiom with one shared helper.

## The key unknown, resolved

An id counter is only useful if it is **unique within each emitted page** and **stable across
builds**. Hinode renders pages concurrently, so a counter anchored to the wrong page could be
assigned in a non-deterministic order.

That was a live concern here, because the global `page` function is known to misresolve inside
a Bookshop block render: it returns the page whose *template* is executing, not the content
page. This was observed while fixing the table filter, where a warning fired against
`/en/404.html` and `/en/docs/blocks/` for tables those pages do not contain.

**Measured, not assumed.** A spike replaced `panels.hugo.html`'s `md5(… now …)` with a
`page.Store` counter using the global `page`, and built the exampleSite twice:

```text
BUILD A: dropdown-panel-1, dropdown-panel-2, dropdown-panel-3, dropdown-panel-5
BUILD B: dropdown-panel-1, dropdown-panel-2, dropdown-panel-3, dropdown-panel-5
```

Identical across builds, and unique within the page. The misresolving renders are teaser and
summary passes whose output is discarded, so they never emit an id — they only consume a
counter value, which is why `-4` is absent. A gap in the numbering breaks neither uniqueness
nor determinism.

`page.Store` was separately confirmed to survive an embedded `RenderString` (which is what the
`example` shortcode does), where `.Ordinal` does **not** — it restarts at 0.

## Design

### 1. Hinode — `layouts/_partials/utilities/UniqueID.html` (new)

Returns a page-unique, build-stable element id.

**Arguments:**

- `prefix` (string, required) — the id's leading segment, e.g. `panel`.
- `page` (optional) — the page to anchor the counter to. Falls back to the global `page`
  function when omitted, matching how `utilities/AddModule.html` now treats the same argument.

**Returns:** `<prefix>-<n>`, where `n` is a counter starting at 1.

The counter is held in `page.Store` under a key namespaced by prefix, so each prefix counts
independently: `panel-1`, `panel-2`, `faq-1`. A single shared counter would interleave
unrelated components and make the numbering read as arbitrary.

The helper does not attempt to be unique across pages — a DOM id only needs to be unique within
the document that carries it.

### 2. Hinode — `layouts/_partials/assets/table.html`

The table partial currently carries its own inline counter (`hinodeTableFilterCount`) producing
`table-filter-N`. Replace it with a call to the helper, prefix `table-filter`. The rendered
output is unchanged; this removes the second implementation of the same mechanism.

### 3. mod-blocks — the four call sites

Replace each `md5(delimit (slice . now) "-")` with a call to the helper:

| File | Prefix |
| --- | --- |
| `component-library/components/panels/panels.hugo.html` | `panel` |
| `component-library/components/faq/faq.hugo.html` | `faq` |
| `layouts/partials/assets/testimonial-carousel.html` | `testimonial-carousel` |
| `layouts/partials/assets/preview.html` | `preview` |

The two Bookshop components pass Bookshop's `._page`, which they have available (`list.hugo.html`
already uses it). The two partials pass no page and take the global fallback, which the spike
proved correct for the ids that reach the emitted HTML.

Each id is referenced elsewhere in its own component — `data-companion`, `aria-controls`,
`data-bs-target`, `data-bs-parent`. Those references derive from the same variable, so they
follow automatically; the change must not alter how they are constructed.

### 4. Release ordering

The helper is a Hinode partial, so mod-blocks can only call it once Hinode ships it.

1. Hinode PR #2024 (the table category filter, already open) is **amended** with the helper and
   the table migration.
2. Hinode releases.
3. mod-blocks opens a **new** PR that bumps its Hinode dependency to that release and converts
   the four call sites.

## Verification

**Determinism and uniqueness.** Build the Hinode exampleSite twice and confirm that every
affected page's ids are byte-identical between builds, and that no id repeats within a page.

**Behaviour.** A deterministic id that points at the wrong element is worse than a random one,
so the components must be driven in a real browser (Playwright) on the Hinode exampleSite,
covering every affected page — Hinode's own `table-demo` and the mounted mod-docs pages for
panels, faq, testimonials and preview:

- **Panels:** the dropdown opens *its own* panel, not another panel on the page. With more than
  one panels block on a page, each dropdown must control its own.
- **FAQ:** each accordion item toggles the item it belongs to, and only that one.
- **Testimonial carousel:** it cycles, and its indicators target its own slides.
- **Preview:** the device tabs switch the preview they belong to.
- **Table:** the filter buttons still drive their own table (the id they pair on is now produced
  by the helper).
- Zero uncaught console exceptions on every page.

**Regression.** `npm test` clean, and the existing table verification scripts still pass.
