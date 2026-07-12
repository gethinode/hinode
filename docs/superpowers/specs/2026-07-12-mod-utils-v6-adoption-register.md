# Register: mod-utils v6 adoption wave

Rows are REPLACED on state change, never appended. States:
`Pending → InProgress → PR → Merged → Released → Verified` (bump rows);
`Pending → Resolved` (verify-only rows). Evidence: PR link, release link, v6-only proof,
warning-triage summary.

| Wave | Module | Bump | State | Evidence |
| --- | --- | --- | --- | --- |
| 1 | mod-fontawesome | /v5 → /v6 | Verified | PILOT. PR gethinode/mod-fontawesome#329; v6.0.0 tag confirmed (go.mod /v6). 6 call sites migrated to Args (strict:false), 2 latent call-site bugs fixed. Release saga: first cut mis-versioned as v5.2.0 (commit-body hyphen-wrap line matched conventional-parser fieldPattern and swallowed the BREAKING CHANGE footer); poisoned tag deleted before proxy caching, corrective empty commit cut v6.0.0. Verified: hinode-level visual gate 42/42 clean on the v6.0.1 engine. |
| 1 | mod-flexsearch | /v4 → /v5 | Released | PR #298 merged; v5.0.0 confirmed (go.mod /v5). Pure path bump — zero InitArgs call sites (module reads site.Params directly). Own-site 10/10 clean; hinode gate 42/42 clean vs baseline-v5 (module config carries no engine flip for hinode). |
| 1 | mod-hanko | /v2 → /v3 | Merged | PR #151; zero call sites (pure bump). Own-site 6/6 clean + byte-identical HTML across 11 pages. Not surfaced in hinode exampleSite. Release watch running. |
| 1 | mod-hubspot | /v3 → /v4 | InProgress | batch B agent running |
| 1 | mod-leaflet | /v2 → /v3 | Merged | PR #265; 1/1 call site migrated (map shortcode, strict:false). Own-site 3/3 clean; hinode gate (uniform v6 engine, dual replacement) 41/42 clean, 1 mermaid flake. Release watch running. |
| 1 | mod-llm | v1 → /v2 | InProgress | batch B agent running |
| 1 | mod-lottie | /v2 → /v3 | Merged | PR #349; 2/2 call sites migrated + real bug fixed (deprecated auto-fallback dead under v6 defaults; fixed via defaulted list). Own-site triaged clean; hinode gate 41/42 clean, 1 mermaid flake. Release watch running. |
| 1 | mod-simple-datatables | /v3 → /v4 | Merged | PR #272; pure asset module (no layouts, zero call sites). Own-site 104/104 clean; hinode gate skipped with justification (no template surface). Release watch running. |
| 2 | mod-bootstrap-icons | v1 → /v2 | InProgress | wave-2 agent running (fontawesome v6.0.0 gate satisfied) |
| 2 | mod-flaticon | v1 → /v2 | InProgress | wave-2 agent running (fontawesome v6.0.0 gate satisfied) |
| 2 | mod-mermaid | /v4 → /v5 | Pending | — (gate: mod-fontawesome released) |
| 3 | mod-blocks | v1 → /v2 | Pending | — (recipe addendum: seed exampleSite first) |
| 3 | mod-docs | verify-only | Pending | — |
| 3 | mod-template | verify-only | Pending | — |
| 4 | hinode + sites | PARKED | AwaitingDecision | Hinode v3 decision package delivered at program end |

## Blockers

| Item | State | Evidence |
| --- | --- | --- |
| mod-utils camelKey-collision defect | RESOLVED (maintainer approved; mod-utils v6.0.1 released, PR gethinode/mod-utils#335) | Hinode-level visual gate caught it on docs/components/example: explicit `show-preview=false` overwritten by the deprecated snake twin's inherited default (both camelize to showPreview; twin sorts last). Reproduced in the mod-utils harness. Affects every structure with deprecated snake aliases. Proposed fix: v6.0.1 — deprecated args never apply defaults + provided-beats-defaulted guard on camelKey merge + regression goldens. Fix: deprecated args never default + provided-beats-defaulted camelKey guard + twins golden group. Verified end-to-end: docs/components/example matches baseline again; full 42/42 clean. Wave 1 fully OPEN; modules must require mod-utils v6.0.1+. |

## Program infrastructure

| Item | State | Evidence |
| --- | --- | --- |
| Visual harness (`tests/visual/`) | Ready | commit 85698b0 + mermaid mask (render-race noise eliminated); two-run determinism 42/42 clean |
| v5-generation baseline | Captured + partially re-baselined | 42 pages, see `tests/visual/BASELINE.md`. Re-baselined with justification after the pilot's engine-endstate run: en/fr/nl homes (heading.width default 8 now applies → col-8/col-12 col-md-8 hero layout), navs-and-tabs/table/video/file (legacy InitTypes derived UDT doc-tables from the GLOBAL type, ignoring the structure's inline type override — v6 honors the override; the removed tables documented types those args never accepted). NOT re-baselined: docs/components/example (open defect, see Blockers); mermaid (known 0.1-0.2% render-race flake). |
