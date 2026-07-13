# Register: mod-utils v6 adoption wave

**PROGRAM COMPLETE (waves 1-4), 2026-07-13.** Post-program visual-review batch (same day): maintainer validated the full block/component library against production on a live gethinode.com candidate; 7 rendering regressions + 1 pre-existing glitch found and fixed, released as mod-utils v6.4.1, mod-blocks v2.0.2, hinode v3.0.1, mod-lottie v3.0.1; gethinode.com PR #152 re-pinned and re-verified (zero errors, zero argument warnings). Wave 4: hinode v3.0.0 released (/v3, warnings 504→0); mod-utils v6.1.0-v6.4.0 closed all five shared-type gaps; mod-blocks v2.0.1; template + theme-agency merged; three PRs held for maintainer (customization-demo #46 override redesign, version-demo #224 homepage curation, gethinode.com #152 production merge + CloudCannon human steps). Originally: 12/12 modules Released+Verified, verify-only rows Resolved, final full-generation visual run 41/42 clean (known mermaid flake). Wave 4 handed over via the decision package.

Rows are REPLACED on state change, never appended. States:
`Pending → InProgress → PR → Merged → Released → Verified` (bump rows);
`Pending → Resolved` (verify-only rows). Evidence: PR link, release link, v6-only proof,
warning-triage summary.

| Wave | Module | Bump | State | Evidence |
| --- | --- | --- | --- | --- |
| 1 | mod-fontawesome | /v5 → /v6 | Verified | PILOT. PR gethinode/mod-fontawesome#329; v6.0.0 tag confirmed (go.mod /v6). 6 call sites migrated to Args (strict:false), 2 latent call-site bugs fixed. Release saga: first cut mis-versioned as v5.2.0 (commit-body hyphen-wrap line matched conventional-parser fieldPattern and swallowed the BREAKING CHANGE footer); poisoned tag deleted before proxy caching, corrective empty commit cut v6.0.0. Verified: hinode-level visual gate 42/42 clean on the v6.0.1 engine. |
| 1 | mod-flexsearch | /v4 → /v5 | Verified | PR #298 merged; v5.0.0 confirmed (go.mod /v5). Pure path bump — zero InitArgs call sites (module reads site.Params directly). Own-site 10/10 clean; hinode gate 42/42 clean vs baseline-v5 (module config carries no engine flip for hinode). |
| 1 | mod-hanko | /v2 → /v3 | Verified | v3.0.0 confirmed (go.mod /v3).  PR #151; zero call sites (pure bump). Own-site 6/6 clean + byte-identical HTML across 11 pages. Not surfaced in hinode exampleSite. Release watch running. |
| 1 | mod-hubspot | /v3 → /v4 | Verified | PR #214; v4.0.0 confirmed (go.mod /v4). 2/2 call sites migrated (form shortcode + partial, strict:false), byte-identical HTML verified. Own-site visual triaged clean. |
| 1 | mod-leaflet | /v2 → /v3 | Verified | v3.0.0 confirmed (go.mod /v3).  PR #265; 1/1 call site migrated (map shortcode, strict:false). Own-site 3/3 clean; hinode gate (uniform v6 engine, dual replacement) 41/42 clean, 1 mermaid flake. Release watch running. |
| 1 | mod-llm | v1 → /v2 | Verified | PR #105; v2.0.0 confirmed (go.mod /v2). Zero call sites; llms-components.json generator reads structure data directly — byte-identical across v5/v6 engines. Text outputs byte-parity. |
| 1 | mod-lottie | /v2 → /v3 | Verified | v3.0.0 confirmed (go.mod /v3).  PR #349; 2/2 call sites migrated + real bug fixed (deprecated auto-fallback dead under v6 defaults; fixed via defaulted list). Own-site triaged clean; hinode gate 41/42 clean, 1 mermaid flake. Release watch running. |
| 1 | mod-simple-datatables | /v3 → /v4 | Verified | v4.0.0 confirmed (go.mod /v4).  PR #272; pure asset module (no layouts, zero call sites). Own-site 104/104 clean; hinode gate skipped with justification (no template surface). Release watch running. |
| 2 | mod-bootstrap-icons | v1 → /v2 | Verified | PR #79; v2.0.0 confirmed (go.mod /v2). 1/1 call site migrated; same two fontawesome-family call-site bugs found and fixed (excess positionals, spacing default-pipe). Visual triaged clean. |
| 2 | mod-flaticon | v1 → /v2 | Verified | PR #80; v2.0.0 confirmed (go.mod /v2). 9/9 call sites migrated; excess-positional + spacing default-pipe bugs fixed; visual triaged clean; CI green incl. Windows. |
| 2 | mod-mermaid | /v4 → /v5 | Verified | PR #345; v5.0.0 confirmed (go.mod /v5). 2/2 call sites migrated incl. code-block render hook path; own-site 4/4 clean, HTML byte-identical. |
| 3 | mod-blocks | v1 → /v2 | Verified | PR #147; v2.0.0 confirmed (go.mod /v2). ExampleSite seeded with all 19 components (retires the coverage-hole follow-up); 26/26 call sites migrated; 5 dead fallbacks removed; faq typo fixed; 2 structure gaps escalated to the decision package; visual triaged clean (2 intended illustration.width flags). |
| 3 | mod-docs | verify-only | Resolved | One InitArgs call site (netlify-contact-form-hook partial); no go.mod dep on mod-utils — inherits the site engine; InitArgs API preserved by the v6 shim, and every hinode-gate run (which mounts mod-docs content) built clean. Call-site migration belongs to whichever generation Hinode v3 pins. |
| 3 | mod-template | verify-only | Resolved | Zero mod-utils references in toml/mod/md/html (verified 2026-07-12). New-module scaffolding carries no engine coupling; nothing to update. |
| 4 | mod-utils type gaps | Verified | v6.1.0 (testimonials.icon, video media-id, PR #336), v6.2.0 (video.color, PR #337), v6.3.0 (links[].outline, PR #338) — all four shared-type gaps closed; goldens green throughout |
| 4 | hinode v3 (/v2 → /v3) | Released+Verified | PR #2004 (H1 pin + H2 cleanup + H3 final): v3.0.0 released, analyzer-verified major, go.mod /v3. Argument warnings 504 → 0 (only 13 pre-existing Hugo-core deprecations remain); 46 call-site patterns fixed; visual 40/42 vs baseline-v6 (mermaid flake + intended args-docs growth). mod-blocks v2.0.1 patch shipped en route (empty-forwarding fixes, PR #148) |
| 4 | template | Merged | PR #613 merged; zero argument warnings (minimal starter) |
| 4 | version-demo | PR-Open (HOLD: maintainer decision) | PR #224 builds clean (hinode v0.22.5 → v3.0.0!); one documented behavioral delta: homepage falls back to listing all pages instead of the old curated [home] sections — content-curation decision, see PR body |
| 4 | customization-demo | PR-Open (HOLD: maintainer decision) | PR #46 builds clean, zero argument warnings — but three demo overrides target hook points removed by v3's page-template rewrite (custom blog list silently falls back to default). Needs override redesign against v3 hooks; documented in the PR. Not an engine issue. |
| 4 | theme-agency | Merged | PR #383 merged; warnings 40 → 2, residual cleared by mod-utils v6.4.0 (elements.link) which flows in via minor updates (+ mod-blocks/v2) |
| 4 | gethinode.com | Merged (2026-07-13) | PR #152 merged by maintainer after live visual review; post-merge Lint&build + Release workflows green. Remaining human steps: `npm run config` (CloudCannon expose regeneration, private npm) + live-edit verification. Original evidence:  PR #152 ready: zero argument warnings (navigation.color="" sentinel removed), CloudCannon globs/config/snippets/postbuild updated (~200 vendored paths; generator is private npm — bookshop.config.cjs hand-updated). Post-merge checklist: run `npm run config` to regenerate expose, then manual CloudCannon live-edit verification. Production deploy — maintainer merges. |

## Blockers

| Item | State | Evidence |
| --- | --- | --- |
| mod-utils camelKey-collision defect | RESOLVED (maintainer approved; mod-utils v6.0.1 released, PR gethinode/mod-utils#335) | Hinode-level visual gate caught it on docs/components/example: explicit `show-preview=false` overwritten by the deprecated snake twin's inherited default (both camelize to showPreview; twin sorts last). Reproduced in the mod-utils harness. Affects every structure with deprecated snake aliases. Proposed fix: v6.0.1 — deprecated args never apply defaults + provided-beats-defaulted guard on camelKey merge + regression goldens. Fix: deprecated args never default + provided-beats-defaulted camelKey guard + twins golden group. Verified end-to-end: docs/components/example matches baseline again; full 42/42 clean. Wave 1 fully OPEN; modules must require mod-utils v6.0.1+. |

## Program infrastructure

| Item | State | Evidence |
| --- | --- | --- |
| Visual harness (`tests/visual/`) | Ready | commit 85698b0 + mermaid mask (render-race noise eliminated); two-run determinism 42/42 clean |
| v5-generation baseline | Captured + partially re-baselined | 42 pages, see `tests/visual/BASELINE.md`. Re-baselined with justification after the pilot's engine-endstate run: en/fr/nl homes (heading.width default 8 now applies → col-8/col-12 col-md-8 hero layout), navs-and-tabs/table/video/file (legacy InitTypes derived UDT doc-tables from the GLOBAL type, ignoring the structure's inline type override — v6 honors the override; the removed tables documented types those args never accepted). NOT re-baselined: docs/components/example (open defect, see Blockers); mermaid (known 0.1-0.2% render-race flake). |
