# Decision package: Hinode v3 (mod-utils v6 generation)

Prepared 2026-07-12 at the close of the mod-utils v6 adoption program (waves 1-3 complete).
This is the wave-4 handoff: everything the maintainer needs to decide on and execute the
Hinode major that pins the v6 generation. Nothing here is started — per the program's
STOP AND ASK contract, Hinode and downstream sites are the maintainer's call.

## 1. The module-generation table Hinode v3 pins

| Module | Release | Import path |
| --- | --- | --- |
| mod-utils | v6.0.1 | github.com/gethinode/mod-utils/v6 |
| mod-fontawesome | v6.0.0 | github.com/gethinode/mod-fontawesome/v6 |
| mod-flexsearch | v5.0.0 | github.com/gethinode/mod-flexsearch/v5 |
| mod-leaflet | v3.0.0 | github.com/gethinode/mod-leaflet/v3 |
| mod-lottie | v3.0.0 | github.com/gethinode/mod-lottie/v3 |
| mod-hanko | v3.0.0 | github.com/gethinode/mod-hanko/v3 |
| mod-hubspot | v4.0.0 | github.com/gethinode/mod-hubspot/v4 |
| mod-llm | v2.0.0 | github.com/gethinode/mod-llm/v2 |
| mod-mermaid | v5.0.0 | github.com/gethinode/mod-mermaid/v5 |
| mod-simple-datatables | v4.0.0 | github.com/gethinode/mod-simple-datatables/v4 |
| mod-bootstrap-icons | v2.0.0 | github.com/gethinode/mod-bootstrap-icons/v2 |
| mod-flaticon | v2.0.0 | github.com/gethinode/mod-flaticon/v2 |
| mod-blocks | v2.0.0 | github.com/gethinode/mod-blocks/v2 |

Every tag verified: release exists AND the tag's go.mod declares the matching major path.
Modules not listed (mod-bootstrap, mod-csp, mod-katex, mod-google-analytics, mod-gsap,
mod-clarity, mod-cookieyes, mod-docs) do not depend on mod-utils and stay on their lines.

## 2. What Hinode v3 itself must do

1. Bump go.mod + `config/_default/hugo.toml` import paths per the table (hinode imports 8 of
   these directly).
2. Decide: migrate Hinode's ~110 own `InitArgs` call sites to `Args.html` in v3, or ship v3
   on the shim and migrate opportunistically. Recommendation: migrate the high-traffic
   shortcodes/partials in v3 (the module waves averaged one latent bug per 3 call sites
   found by the migration checklist) and keep the shim for the tail.
3. Work the warnings backlog surfaced by the v6 engine on the exampleSite (~55-67 distinct
   patterns): predominantly empty-string values passed where absence is meant (`state ''`,
   `priority ''`, `justify ''`, `ratio ''`, `gutter ''`), plus a `bundle` list-type mismatch
   and `img` resource-vs-string passing. These are Hinode call-site/data fixes, not engine
   issues, and must be clean before the v7 warning-to-error promotion.
4. Remove now-dead patterns: `or $args.X $args.x_y` deprecated-twin chains (v6.0.1 makes the
   canonical value authoritative) and `| default` pipes on Args-sourced values (defaults are
   already applied; the pipe silently discards explicit `false`).
5. Release notes must call out rendered-output changes (defaults now apply): section-title
   width `w-100` → `col-12 col-md-8`, hero/heading `width` 8, `illustration.width` 8
   (smaller hero/illustration images where content omitted widths) — all pinned in the
   program's visual baselines with per-page justifications.

## 3. mod-utils follow-ups discovered by the waves (maintainer decisions)

- **Structure gaps** (from mod-blocks seeding): the shared `testimonials` type lacks the
  `icon` member its partial renders; the shared `video` type declares `id` while the partial
  consumes `media-id`. Both need `_types.yml`/`_arguments.yml` additions in mod-utils —
  small PRs, non-breaking.
- Pre-existing phase-5 items: `_default` golden case; `args.md` docs shortcode consuming
  `ArgsSchema`; warning→error promotion (v7) once first-party call sites are clean.

## 4. CloudCannon (human verification required before/with v3)

- Sites using setup-cloudcannon-cms must update expose globs `_vendor/.../mod-utils/v5/` →
  `/v6/` (and any other bumped module paths) and regenerate `bookshop.config.cjs`.
- The spec's outstanding manual step: verify live editing on a CloudCannon-connected site
  against the v6 generation. Not automatable from this program.

## 5. Generation-mixing warning (release-notes text for every module)

A v5-generation site that adds ONE v6-generation module flips its entire site onto the v6
validation engine: Hugo resolves a single mod-utils, and import order decides — in Hinode's
config every module import precedes mod-utils, so a v6-carrying module wins. The engines are
API-compatible (that is what made the waves safe), but behavior deltas (defaults now apply,
new warnings) arrive wholesale. Each module's PR body carries this warning; Hinode v3 release
notes should repeat it prominently: adopt the generation together, via Hinode v3.

## 6. Sites/themes after Hinode v3

gethinode.com, template, theme-agency, version-demo, customization-demo follow Hinode v3 as
ordinary dependency updates (they pin Hinode, not mod-utils directly). theme-agency also pins
mod-blocks → bump to /v2 together with its Hinode bump.

## 7. Program evidence

- Register: [2026-07-12-mod-utils-v6-adoption-register.md](2026-07-12-mod-utils-v6-adoption-register.md)
  (per-module PRs, releases, call sites, triage summaries).
- Visual baselines + final run: driver workspace `.superpowers/visual/` (hinode repo);
  final full-generation comparison 41/42 clean, single known mermaid render-race flake
  (0.1-0.3%, masked but residual — page-level threshold candidate for the harness).
- Cumulative call-site work across the waves: 43 call sites migrated, 7 latent call-site
  bugs found and fixed (excess-positional forwarding ×3 modules, `default`-pipe-discards-
  explicit-false ×3 modules, dead deprecated-fallback ×1), 1 typo bug (`faw`→`faq`), plus
  the engine-level camelKey-collision defect caught by the visual gate and fixed as
  mod-utils v6.0.1.
