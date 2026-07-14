# Design: a shared helper for deterministic element ids

Date: 2026-07-14
Status: Approved
Repositories: `gethinode/mod-utils`, `gethinode/hinode`, `gethinode/mod-blocks`

## Problem

Several components generate a DOM id by hashing the current time:

```hugo
{{ $id := printf "faq-%s" (md5 (delimit (slice . now) "-")) }}
```

`now` is evaluated per call, so the id changes on **every build**. Any page carrying such a
component emits different HTML each time it is built, which defeats output diffing and makes CDN
and browser caches treat an unchanged page as changed.

A scan of every `gethinode` repository found the idiom in exactly five places. One — the table
shortcode's `data-filter-id` — was fixed while repairing the table category filter, and replaced
with a deterministic per-page counter held in `page.Store`. The other four all live in
**mod-blocks**:

| File | Id |
| --- | --- |
| `component-library/components/panels/panels.hugo.html:37` | `panel-<md5>` |
| `component-library/components/faq/faq.hugo.html:42` | `faq-<md5>` |
| `layouts/partials/assets/testimonial-carousel.html:48` | `testimonial-carousel-<md5>` |
| `layouts/partials/assets/preview.html:243` | `preview-<md5>` |

Hinode's `assets/nav.html` prefixes the panels id, which is why the symptom surfaces in
`hugo_stats.json` as `dropdown-panel-<md5>` churning on every build.

This design replaces the idiom with one shared helper — and puts that helper where every module
can legitimately reach it.

## Where the helper belongs

Not in Hinode. **No gethinode module declares a dependency on Hinode:**

| Module | imports mod-utils | imports hinode |
| --- | --- | --- |
| mod-blocks | yes | no |
| mod-lottie | yes | no |
| mod-leaflet | yes | no |
| mod-mermaid | yes | no |
| mod-simple-datatables | yes | no |

A partial in Hinode is reachable from these modules only because the final *site* merges Hinode's
layouts. That is an undeclared, inverted dependency: it breaks each module's own exampleSite
build, and it would block the planned `.Ordinal` follow-up outright, since that has to reach
mod-lottie and mod-leaflet.

**mod-utils is the correct home.** Every module already imports it, and so does Hinode. The move
is transparent to callers, because Hugo resolves partials by path across the merged layout tree.

### The same wart, one level down

`utilities/AddModule.html` lives in Hinode today, yet mod-blocks' `list` component calls it
without declaring Hinode. It moves to mod-utils too, for the same reason. Its callers
(`hinode/layouts/_partials/assets/lightbox.html`, `hinode/layouts/_shortcodes/table.html`,
`mod-blocks/component-library/components/list/list.hugo.html`) are unaffected — the partial's
path does not change.

## The key unknown, resolved

An id counter is only useful if it is **unique within each emitted page** and **stable across
builds**. Hugo renders pages concurrently, so a counter anchored to the wrong page could be
assigned in a non-deterministic order.

That was a live concern, because the global `page` function is known to misresolve inside a
Bookshop block render: it returns the page whose *template* is executing, not the content page.
This was observed while fixing the table filter, where a warning fired against `/en/404.html` and
`/en/docs/blocks/` for tables those pages do not contain.

**Measured, not assumed.** A spike replaced `panels.hugo.html`'s `md5(… now …)` with a
`page.Store` counter using the global `page`, and built the exampleSite twice:

```text
BUILD A: dropdown-panel-1, dropdown-panel-2, dropdown-panel-3, dropdown-panel-5
BUILD B: dropdown-panel-1, dropdown-panel-2, dropdown-panel-3, dropdown-panel-5
```

Identical across builds, and unique within the page. The misresolving renders are teaser and
summary passes whose output is discarded, so they never emit an id — they only consume a counter
value, which is why `-4` is absent. A gap in the numbering breaks neither uniqueness nor
determinism.

`page.Store` was separately confirmed to survive an embedded `RenderString` (which is what the
`example` shortcode does), where `.Ordinal` does **not** — it restarts at 0.

## Design

### 1. mod-utils — `layouts/_partials/utilities/UniqueID.html` (new)

Returns a page-unique, build-stable element id.

**Arguments:**

- `prefix` (string, required) — the id's leading segment, e.g. `panel`.
- `page` (optional) — the page to anchor the counter to. Falls back to the global `page` function
  when omitted, matching how `utilities/AddModule.html` treats the same argument.

**Returns:** `<prefix>-<n>`, where `n` is a counter starting at 1.

The counter is held in `page.Store` under a key namespaced by prefix, so each prefix counts
independently: `panel-1`, `panel-2`, `faq-1`. A single shared counter would interleave unrelated
components and make the numbering read as arbitrary.

The helper does not attempt to be unique across pages — a DOM id only needs to be unique within
the document that carries it.

### 2. mod-utils — `layouts/_partials/utilities/AddModule.html` (moved from Hinode)

Moved verbatim, including the two fixes it received while repairing the table filter: it appends
and deduplicates rather than using `complement` (which *replaced* the dependency list, and wiped
it entirely when re-adding an entry already present), and it honours an explicitly passed `page`
instead of ignoring it in favour of the global `page`.

### 3. Hinode

- Delete `layouts/_partials/utilities/AddModule.html` (now provided by mod-utils).
- Replace the inline counter in `layouts/_partials/assets/table.html` (`hinodeTableFilterCount`,
  producing `table-filter-N`) with a call to `utilities/UniqueID.html`, prefix `table-filter`. The
  rendered output is unchanged; this removes the second implementation of the same mechanism.
- Bump the mod-utils dependency to the release carrying both partials.

### 4. mod-blocks — the four call sites

Replace each `md5(delimit (slice . now) "-")` with a call to the helper:

| File | Prefix |
| --- | --- |
| `component-library/components/panels/panels.hugo.html` | `panel` |
| `component-library/components/faq/faq.hugo.html` | `faq` |
| `layouts/partials/assets/testimonial-carousel.html` | `testimonial-carousel` |
| `layouts/partials/assets/preview.html` | `preview` |

The two Bookshop components pass Bookshop's `._page`, which they have available
(`list.hugo.html` already uses it). The two partials pass no page and take the global fallback,
which the spike proved correct for the ids that reach the emitted HTML.

Each id is referenced elsewhere in its own component — `data-companion`, `aria-controls`,
`data-bs-target`, `data-bs-parent`. Those references derive from the same variable, so they follow
automatically; the change must not alter how they are constructed.

Bump the mod-utils dependency to the release carrying the helper.

### 5. Release ordering

1. **mod-utils** ships `UniqueID.html` and the moved `AddModule.html`, and releases.
2. **Hinode** and **mod-blocks** then bump mod-utils and land their changes — **in parallel**;
   neither depends on the other.

Hinode's `AddModule.html` must not be deleted before the mod-utils release exists, or the partial
disappears from the merged layout tree and every caller fails.

Hinode PR #2024 (the table category filter, already open) is **amended** with its part.
mod-blocks gets a new PR.

## Verification

**Determinism and uniqueness.** Build the Hinode exampleSite twice and confirm that every affected
page's ids are byte-identical between builds, and that no id repeats within a page.

**Behaviour.** A deterministic id that points at the wrong element is worse than a random one, so
the components must be driven in a real browser (Playwright) on the Hinode exampleSite, covering
every affected page — Hinode's own `table-demo` and the mounted mod-docs pages for panels, faq,
testimonials and preview:

- **Panels:** the dropdown opens *its own* panel, not another panel on the page. Where a page
  carries more than one panels block, each dropdown must control its own.
- **FAQ:** each accordion item toggles the item it belongs to, and only that one.
- **Testimonial carousel:** it cycles, and its indicators target its own slides.
- **Preview:** the device tabs switch the preview they belong to.
- **Table:** the filter buttons still drive their own table (the id they pair on is now produced by
  the helper).
- Zero uncaught console exceptions on every page.

**AddModule still works after the move.** Its three callers must behave unchanged — in particular
the lightbox partial, and the table shortcode's missing-module warning, which must still fire for a
data table on a page without `modules: ["simple-datatables"]` and stay silent otherwise.

**Regression.** `npm test` clean, and the existing table verification scripts still pass.
