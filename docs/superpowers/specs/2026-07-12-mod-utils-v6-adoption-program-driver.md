# Program driver: mod-utils v6 adoption wave

- **Date:** 2026-07-12
- **Status:** Prepared — awaiting launch approval
- **Program branch (this contract + register):** `program/mod-utils-v6-adoption` in gethinode/hinode
- **Register:** [2026-07-12-mod-utils-v6-adoption-register.md](2026-07-12-mod-utils-v6-adoption-register.md)
- **Background:** mod-utils v6.0.0 shipped 2026-07-12 (gethinode/mod-utils#334) — the argument/type
  system redesign, released as a breaking major. Policy agreed with the maintainer: **any module
  that adopts mod-utils v6 does so in its own major release**, so the new validation engine never
  enters a site through an automated minor/patch update, and no site ever holds both engines in
  one module graph by accident. The old major line of each module freezes (critical fixes by
  cherry-pick only).

## Mission

Move every eligible Hinode module to mod-utils v6 on a new major of its own, wave by wave, with
agents executing a predefined per-module recipe — parallel across repos where the dependency
graph allows. Hinode itself, and the sites/themes that follow it, are explicitly OUT of this
program (see STOP AND ASK).

## Inventory (evidence: GitHub org scan, 2026-07-12)

**In scope — 12 modules that import mod-utils** (non-archived, Hugo modules):

| Wave | Module | Path bump | Internal deps to update |
| --- | --- | --- | --- |
| 1 | mod-fontawesome | `/v5` → `/v6` | — (plus shortcode fix, see recipe addendum) |
| 1 | mod-flexsearch | `/v4` → `/v5` | — |
| 1 | mod-hanko | `/v2` → `/v3` | — |
| 1 | mod-hubspot | `/v3` → `/v4` | — |
| 1 | mod-leaflet | `/v2` → `/v3` | — |
| 1 | mod-llm | v1 → `/v2` | — |
| 1 | mod-lottie | `/v2` → `/v3` | — |
| 1 | mod-simple-datatables | `/v3` → `/v4` | — (mod-bootstrap does not use mod-utils) |
| 2 | mod-bootstrap-icons | v1 → `/v2` | mod-fontawesome → its new `/v6` |
| 2 | mod-flaticon | v1 → `/v2` | mod-fontawesome → its new `/v6` |
| 2 | mod-mermaid | `/v4` → `/v5` | mod-fontawesome → its new `/v6` |
| 3 | mod-blocks | v1 → `/v2` | none in go.mod; runtime-coupled to Hinode partials (see wave-3 note) |

**Verify-only rows (no bump):** mod-docs (calls `InitArgs` but declares no mod-utils dependency —
inherits the site's engine; API-stable across v5/v6; verify and record), mod-template (no
mod-utils references found; verify scaffolding and record).

**Excluded — archived:** mod-compatibility, docs, mod-bookshop, leaflet-demo.
**Excluded — not Hugo modules (no go.mod):** .github, create-pull-request, designs, hugogen,
netlify-extension-dartsass, netlify-plugin-dartsass, setup-cloudcannon-cms, wordpress-to-hugo,
yq-bin.
**Excluded — modules that do not import mod-utils:** mod-bootstrap, mod-clarity, mod-cookieyes,
mod-csp, mod-google-analytics, mod-gsap, mod-katex.
**Parked — wave 4, requires maintainer decision (STOP AND ASK):** hinode (released line is
v2.20.0; adopting mod-utils v6 = a **Hinode v3** decision), then the sites/themes that follow it:
gethinode.com, template, theme-agency, version-demo, customization-demo.

Safety property (verified): `hugo mod get -u` never crosses Go major paths, so nothing in this
program gets dragged into existing sites by the mod-update automation. Adoption is opt-in at
every level; that is the point of the majors.

## THE LOOP

Repeat until every register row reads Released+Verified (or Resolved for verify-only rows):

1. Pick the next wave whose upstream gates are satisfied (wave 2 requires the mod-fontawesome
   tag to EXIST — confirm with `gh release view`, never assume). Within a wave, spin up one
   implementer agent per module, up to 4 concurrently.
2. Each agent follows THE RECIPE below exactly, in a FRESH clone from `origin/main` of its
   module (in scratch space). Never build from the sibling clones under
   `~/Development/GitHub/gethinode/` — they are stale and dirty, and they are build inputs.
3. One agent per repo, ever. Agents never touch another module's repo, the hinode repo, or
   mod-utils.
4. The driver (you) reviews each agent's evidence (recipe step 7) before the merge step —
   an agent may open the PR, but the driver confirms CI is green and the evidence is complete
   before merging.
5. After merge: CONFIRM the release tag actually cut and matches the new Go path major before
   marking Released, and before starting any wave that depends on it.
6. Bookkeeping: replace the module's register row (never append), one line in memory when a
   wave completes. Then re-enter the loop.

## THE RECIPE (per module — the predefined approach every agent follows)

0. Fresh clone: `git clone https://github.com/gethinode/<module>.git` into scratch space;
   create branch `feat/mod-utils-v6`.
1. **Go path bump:** in `go.mod`, bump the module's own major path per the inventory table
   (v1 modules ADD `/v2`; `/vN` modules increment). Update the `github.com/gethinode/mod-utils`
   require to `github.com/gethinode/mod-utils/v6 v6.0.0`.
2. **Hugo config:** update `[module.imports]` paths in the module's `config.toml`/`hugo.toml`
   (mod-utils → `/v6`; wave-2 modules also mod-fontawesome → its new major path). Update
   exampleSite `go.mod`/`hugo.toml` replacements and imports — most exampleSites use the BARE
   module path with a `replacements` directive; verify rather than assume.
3. **Self-references:** grep the whole repo for the old versioned path (`grep -rn
   "<module>/vOLD\|mod-utils/v5" --include="*.toml" --include="*.mod" --include="*.md" .`,
   excluding `_vendor` and `node_modules`) and update every hit. README install instructions
   count.
4. **Vendor + verify:** `npm ci` (or pnpm per the repo), `npm run mod:vendor` (or the repo's
   equivalent), then run the repo's test script (usually an exampleSite build). Gates:
   a. `hugo mod graph` (in exampleSite context if applicable) shows `mod-utils/v6` and NO
      `mod-utils/v5`.
   b. Build exits 0 with ZERO ERROR lines.
   c. Triage every WARN line mentioning the module's own shortcodes/partials: a warning caused
      by the module's own argument passing (e.g. forwarding excess positionals, passing `""`
      for unset values, undeclared nested attributes) is a call-site bug — FIX it in this PR
      (that is the intended cleanup this generation carries). A warning caused by exampleSite
      CONTENT is fixed in the content. Record every triage decision in the report.
5. **Commit** (single commit preferred), Angular Conventional Commits, body ≤100 chars/line:
   `feat: adopt the mod-utils v6 validation engine` with trailer:
   `BREAKING CHANGE: requires github.com/gethinode/<module>/vNEW import path; adopts
   mod-utils v6 (see gethinode/mod-utils v5-to-v6 migration notes).`
   and `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`.
6. **PR** against main titled `feat!: adopt mod-utils v6 (<module> vNEW)`, body linking
   gethinode/mod-utils#334 and the migration notes, listing every call-site fix from step 4c.
7. **Evidence** (returned to the driver, and into the register row on Verified): new path,
   `hugo mod graph` line proving v6-only, build exit code, warning triage table, PR URL.
8. Driver merges after CI is green → waits for semantic-release → confirms
   `gh release view vNEW.0.0 --repo gethinode/<module>` succeeds AND the tag's go.mod path
   matches → row becomes Released, then Verified once the register row carries the evidence.

### Recipe addendum — mod-fontawesome (wave 1, do this one FIRST)

Beyond the standard recipe: `layouts/_shortcodes/fas.html`, `fab.html`, and `icon.html` forward
their FULL `.Params` (including intentional extra positional classes) into `InitArgs`, which
under v6 produces excess-positional warnings on pages like mod-docs' `icon.md`. Fix in the same
PR: pass only the declared positions into validation (the shortcodes already handle the extra
positions themselves via `after 1 .Params`), or declare the extra positional in `icon.yml` if
that is more faithful. The build of the module's exampleSite must end with zero warnings
attributable to these three shortcodes.

### Recipe addendum — mod-blocks (wave 3)

mod-blocks has no gethinode go.mod dependencies but its partials call Hinode-owned partials at
site build time, and its exampleSite is a placeholder page with zero components (no real CI
signal — known limitation, spec'd follow-up). Before bumping: extend its exampleSite with at
least one content page per Bookshop component (hero, cards, faq, …) rendered via
`page/blocks.html` semantics or direct partial calls, so the v6 engine actually validates every
component blueprint in CI. This makes the wave-3 PR bigger than the mechanical bump — budget for
it, and fix the argument warnings it surfaces (there will be several; the Task-8 smoke test saw
testimonials/hero/links warnings from mod-blocks components).

## STOP AND ASK — only these

- **Anything touching hinode, gethinode.com, template, theme-agency, version-demo,
  customization-demo, or mod-utils itself.** The Hinode v3 decision is the maintainer's; this
  program prepares the module generation Hinode v3 will pin, nothing more.
- **A breaking change beyond the pre-authorized template.** Majors are pre-authorized ONLY for
  the 12 inventory modules and ONLY as the recipe's mechanical v6 adoption plus call-site
  warning fixes. A module that needs behavior surgery, YAML schema changes, or any piggybacked
  breaking feature: stop, show the diff-beyond-recipe, ask.
- **A module whose exampleSite reveals genuine v6 incompatibility** — ERROR lines that a
  call-site fix does not resolve. That is a mod-utils defect or a real design gap; do not patch
  around it in the module. Stop with the reproduction.
- **Three failed attempts on one module.** The recipe is wrong for that module, not the agent.
  Do not attempt a fourth.

## RELEASE MECHANICS

- One PR per repo, base main, merge-commit merges (matches repo history). CI green before
  merge — including the Windows jobs.
- The Go path bump and the BREAKING CHANGE trailer land in the SAME commit (the mod-utils v5
  and v6 bumps are the precedent).
- A dependent module may only be bumped AFTER the upstream tag exists (wave 2 waits for the
  mod-fontawesome release, confirmed, not assumed).
- Never `--no-verify`, never force-push, never `--amend` after a push. If a merge breaks a
  module's main, fix or revert before starting anything else — never leave a main broken to
  chase the next module.
- Register updates are committed to THIS branch (`program/mod-utils-v6-adoption` in
  gethinode/hinode) and pushed after every state change; the register is the recovery map after
  any session loss.

## PARALLELISM

Parallel implementer agents are allowed and encouraged ACROSS repos in the same wave (max 4
concurrent), because module repos are fully independent build environments — this is unlike
single-stack programs. Serialize only: (a) two agents on one repo — never; (b) wave boundaries —
a wave starts only when its upstream tags exist; (c) driver merge decisions — review evidence
one PR at a time.

## BOOKKEEPING

- The register IS the ledger: one row per module, rows are REPLACED on state change
  (`Pending → InProgress → PR → Merged → Released → Verified`), with an evidence column.
- One line in the memory directory when a wave completes and at program end.
- No entry in any module's own docs — the program is documented here and in the PRs.

## DONE means

All 12 inventory rows read **Verified** (released majors whose exampleSites build clean on the
v6 engine with triaged warnings), both verify-only rows read **Resolved** with evidence, the
register carries PR + release links for every row, and a final report lists: releases cut,
call-site fixes made, warnings triaged, and the exact module-generation table Hinode v3 should
pin. Wave 4 (Hinode + sites) is then handed to the maintainer as a decision package — it is NOT
part of this program's DONE.
