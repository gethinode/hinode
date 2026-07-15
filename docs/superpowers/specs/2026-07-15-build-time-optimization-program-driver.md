# Program driver: Hugo build-time optimization

- **Date:** 2026-07-15
- **Status:** Prepared — awaiting launch approval
- **Register:** [2026-07-15-build-time-optimization-register.md](2026-07-15-build-time-optimization-register.md)
  — the version on `main` is the launch snapshot; during execution the LIVE register lives on
  the program branch `program/build-time-optimization` (created in Wave 0), where the driver
  commits every row update. Pushing to the program branch is the one exception to the
  no-push rule.
- **Evidence base:** profiling session of 2026-07-15 (all numbers reproduced below — this driver
  is self-contained). Optional extra context: `docs/analysis/build-time-refactor/` (CI-side
  effect data for the v3 args refactor) may exist as a pending commit; if absent, nothing in
  this program depends on it.
- **Authority (agreed with maintainer, 2026-07-15):** module PRs (mod-utils, mod-flexsearch)
  may be merged by the driver once their Definition of Done is evidenced and CI is green —
  releases cut automatically via semantic-release. **Hinode PRs are opened but NEVER merged**
  by the driver; they await the maintainer. Tier-2 chunks (D, E) produce design/audit
  deliverables only and STOP before implementation.
- **Autonomy:** the maintainer is unavailable during execution. Do not block on questions —
  when a STOP AND ASK trigger fires, park that chunk (register row → `Blocked (question)`,
  record the question in the row) and continue with the rest.

## Mission

Reduce Hinode's Hugo build time — CI CPU seconds and local wall-clock — by executing the
verified findings of the 2026-07-15 profiling session as independent chunks, one agent per
chunk, each with a hard "output unchanged" gate. Tier 1 ships; Tier 2 designs and stops.

## Context: what the profiling session established

Reference machine: Apple Silicon, 10 cores, Hugo 0.164.0 extended (the repo-pinned
`hugo-extended` binary in `node_modules/.bin`). Site under test: hinode `exampleSite`
(148 pages, 3 languages, 225 processed images), command
`hugo --gc --minify -s exampleSite`.

| Scenario | Wall | CPU (user) |
| --- | --- | --- |
| Warm baseline (stock) | 16.0–18.8 s | ~39 s |
| E1: `.Content` instead of duplicate `RenderString` render | ~16.3 s | 30.8 s (−21%) |
| E2: cache absent-key argument validation (`partialCached`) | ~16.7 s | 35.2 s (−11%) |
| E3: search-index build taken off the render path (stub) | 13.0–14.5 s | ~40 s |
| E1+E2+E3 combined | 10.8–12.7 s | 29.5 s |
| `GOGC=800` (on top of E2) | ~unchanged | −6–7 s further |
| Cold `resources/_gen` (71 MB images+SASS) | 68.7 s | 119 s |

Root causes, verified by patching modules and diffing output:

1. **Duplicate content render.** `utilities/ProcessContent.html` (mod-utils) renders
   `.RawContent` through `emojify | .RenderString` for every page body, while `.Content` is
   *also* computed (search index calls `.Plain`, RSS calls `.Summary`). Switching bodies to
   `.Content` saves 21% CPU **but is unsafe today**: shortcodes read the global `page`, the
   per-page `Scratch` (breakpoint, padding), and a UID counter, so cached-`.Content` output
   depends on which context renders first. Observed regressions: a `d--none` class (breakpoint
   unset), an image `alt` inherited from the 404 page, shifted UID pairs. → Chunk D (gated).
2. **Args engine validates absent keys.** `utilities/Args.html` (mod-utils) triggers ~403,000
   `inline/validate-node.html` calls per build; most validate keys the caller never provided,
   whose outcome is a constant per structure. `ArgsSchema` is already `partialCached` (100%
   hit rate); the per-call walk is not. → Chunk A.
3. **Search index serializes the build.** The FlexSearch index executes `GetSearchDocs` →
   `.Plain` for every page, per language, inside the script-bundle build — one goroutine
   renders the whole site's content while every page render blocks on the
   `partialCached "utilities/bundlev2.html"` mutex in `_partials/footer/scripts.html`.
   Stubbing it: −2 to −3.5 s wall, CPU unchanged. → Chunk B.
4. **Hygiene:** PostCSS occupies the last ~2.5–3 s (publish phase, inherently serial);
   `pnpm prebuild` re-vendors on every build (+~4 s); `GOGC` default wastes 6–7 CPU-seconds;
   the `resources/_gen` cache is worth 4× on cold CI runners. → Chunk C.

On the 10-core reference machine the build uses only ~2.4 cores: wall-clock is bound by
serialization (finding 3, PostCSS tail), while CI runners (2–4 vCPU) are bound by CPU
(findings 1–2). Chunks A/C target CI seconds; B targets wall-clock; D targets both.

## Ground rules (hard-won — do not relax)

1. **Fresh clones from `origin/main`, always.** Local sibling clones under
   `~/Development/GitHub/gethinode/` are stale and dirty (incident: mod-fontawesome's local
   `develop` predated the v6 tags entirely and could not even build against current hinode).
   Clone into scratch space — convention: `$HOME/tmp/hinode-build-program/<chunk>/` — and
   branch from `origin/main`. For work in the hinode repo itself, use a `git worktree`
   created from a freshly fetched `origin/main` — never the primary checkout, which may sit
   on an unrelated branch.
2. **The exampleSite does not use the root `_vendor`.** It resolves modules from the Go module
   cache (`hinode.work` maps only `.` and `../`). To test a patched module against the
   exampleSite, run with
   `HUGO_MODULE_REPLACEMENTS="github.com/gethinode/<mod>/vN -> /abs/path/to/patched-clone"`.
   Remember `hugo mod vendor` silently reverts any hand-edits under `_vendor/`.
3. **Mount order:** in the exampleSite build, mod-utils mounts BEFORE hinode (pulled
   transitively via mod-blocks), so hinode-level layout overrides of mod-utils partials do
   not apply there. Fixes to mod-utils partials must land in mod-utils.
4. **Hugo template gotchas:** a partial may contain only ONE `{{ return }}` — a violation
   errors at runtime, and *a failed build can look like a fast build*. After every
   experimental build, check for `ERROR` lines and confirm the page-count table matches the
   baseline (98 EN / 26 FR / 24 NL). `--templateMetrics` inflates wall time ~70% — use it for
   ranking only, never as a before/after number.
5. **One writer per repo, ever.** At most one agent WRITES to a given repo; agents never
   modify another chunk's repo. Read-only benchmark use of hinode is fine, but each module
   chunk (A, B) creates its OWN disposable hinode benchmark worktree (`pnpm install` in it
   once) — never share a worktree between chunks, or their `resources/`, `public/`, and
   `hugo_stats.json` churn collides. Benchmark runs are machine-load sensitive: the driver
   SERIALIZES all measurement phases (one benchmark at a time on the whole machine), even
   when implementation work runs in parallel.
6. **PostCSS needs PATH.** Every exampleSite build requires
   `export PATH="$PWD/node_modules/.bin:$PATH"` from the hinode repo root (provides the
   pinned `hugo` and `postcss`). Run `pnpm install` once in any fresh hinode worktree.
7. **Release mechanics (gethinode convention):** PRs are merge-committed; semantic-release
   reads the *branch commits*, so at least one commit must be `fix:`/`feat:` to cut a
   release. Commit bodies wrap at 100 chars (commitlint). After merging a module PR, CONFIRM
   the tag exists (`gh release list --repo gethinode/<mod> --limit 1`) before any dependent
   bump. Bump dependents in BOTH `go.mod` and `exampleSite/go.mod`
   (`hugo mod get <path>@<ver>` in each), then `hugo mod tidy` both.
8. **Never push to `main` of any repo.** All work lands via PRs. Module PRs: driver merges
   per the authority note. Hinode PRs: open, attach evidence, leave for the maintainer.
   Sole exception: the program branch `program/build-time-optimization` in hinode, which the
   driver pushes register updates to directly.

## The output-unchanged gate (byte-diff harness)

Every Tier-1 chunk passes this gate before its PR is opened. From the chunk's OWN hinode
benchmark worktree root, with per-chunk snapshot paths (never share or reuse paths across
chunks; `rm -rf` targets before copying — `cp -R` into an existing dir nests instead of
replacing):

```bash
export PATH="$PWD/node_modules/.bin:$PATH"
SNAP=$HOME/tmp/hinode-build-program/<chunk>/snapshots   # per-chunk, driver-assigned
# with HUGO_MODULE_REPLACEMENTS set for module chunks; unset for stock
rm -rf exampleSite/public && hugo --gc --minify -s exampleSite   # discard (warms caches)
rm -rf exampleSite/public && hugo --gc --minify -s exampleSite \
  && rm -rf $SNAP/run-a && cp -R exampleSite/public $SNAP/run-a
rm -rf exampleSite/public && hugo --gc --minify -s exampleSite \
  && rm -rf $SNAP/run-b && cp -R exampleSite/public $SNAP/run-b
diff -rq $SNAP/run-a $SNAP/run-b                   # candidate run-vs-run: must be empty*
diff -rq $SNAP/run-a $SNAP/../stock/run-a          # candidate vs stock: must be empty*
```

The stock snapshot comes from running the same block once with replacements unset (every
chunk produces its own stock snapshot in its own worktree; Wave 0's baseline serves as a
cross-check, not a substitute). Confirm every build ended with the page-count table
(98 EN / 26 FR / 24 NL) and zero `ERROR` lines before trusting its output.

*Allowlist (the ONLY tolerated diffs):* `en/index.xml`, `en/docs/blocks/index.xml`,
`en/tags/block/index.xml` — a pre-existing, INTERMITTENT `.Content` race flips `px-0` vs
`px-4 px-xxl-0` inside RSS-embedded HTML (accepted by the maintainer 2026-07-15). Seeing
these files differ is tolerated; seeing zero diffs is also normal (icon-sprite ordering,
the other historic noise source, was fixed in mod-fontawesome v6.0.2 / hinode PR #2031, and
stock double-builds have reproduced zero diffs since). Any diff outside the allowlist fails
the gate. Chunk D's *eventual implementation* (outside this program) removes the race; until
then the allowlist stands. Chunk B is the one exception where output MAY change — its gate
narrows the permitted diff instead (see the chunk).

## Measurement protocol

Numbers in this driver come from the reference machine; the executing machine differs.
**Wave 0 re-baselines.** For every before/after claim:

- Warm up with one discarded build, then measure ≥3 builds; report median wall
  (`Total in … ms`) and median `user` CPU from `time`.
- Run back-to-back: the `[caches] getresource maxAge = "5m"` setting means a >5-minute gap
  re-fetches remote preview headers and poisons one run with network latency.
- No other benchmark or heavy process concurrently (driver serializes).
- Record numbers in the register row and in the PR body.

## Chunk inventory

| Chunk | Repo | Tier | Mode | Expected effect (reference machine) |
| --- | --- | --- | --- | --- |
| A: args-engine absent-key precompute | mod-utils | 1 | implement + merge | ≥−8% CPU (verified floor −11% for step 1) |
| B: search index off the render path | mod-flexsearch | 1 | implement + merge | −1.5 s wall or better |
| C: build hygiene (scripts, GOGC, harness, docs) | hinode | 1 | implement, PR held | −4 s npm overhead; −15% CPU in CI via GOGC |
| D: context-independent shortcodes → `.Content` | hinode (+mods) | 2 | audit + design, STOP | −21% CPU + deterministic output (later) |
| E: sidebar render-once | hinode | 2 | design, STOP | docs-site wall/CPU (later) |
| F: hinode dependency bumps for A/B | hinode | 1 | PR held | carries A+B to users |

Dependencies: A, B, C, D, E are mutually independent — run in parallel (measurement phases
serialized). F requires the A and/or B releases to EXIST (confirm, never assume).

---

## Chunk A — mod-utils: stop re-validating absent arguments

**Repo:** gethinode/mod-utils (branch `perf/args-absent-key-cache` off `origin/main`).
Sanity check first: `origin/main` should be at or near the v6.5.0 tag; if main carries
unreleased breaking changes, STOP AND ASK (park, continue elsewhere).

**Step 1 — verified minimal change.** In `layouts/_partials/utilities/Args.html`, the main
schema loop calls `partial "inline/validate-node.html"` for every schema key. For keys the
caller did NOT provide (`$isProvided` false), the result is a constant per
(structure, bookshop, child, key). Split the call:

```gotemplate
{{ $res := dict }}
{{ if $isProvided }}
    {{ $res = partial "inline/validate-node.html" (dict
        "value" $val "node" $node "path" $key "name" $name
        "depth" 0 "provided" $wasProvided) }}
{{ else }}
    {{ $res = partialCached "inline/validate-node.html" (dict
        "value" $val "node" $node "path" $key "name" $name
        "depth" 0 "provided" $wasProvided) (or $structure "") (or $bookshop "") (or $child "") $key }}
{{ end }}
```

This exact patch was verified on 2026-07-15: −11% CPU, output byte-identical. Safety
argument to preserve: an absent-key validation reads only the compiled node and
`site.Params` (via `inline/site-param.html` for `config:` defaults) — no page state.

**Step 2 — deeper (attempt, keep only if gates pass).** Fold the "all-absent" outcome into
the already-cached `ArgsSchema.html` envelope: precompute per structure the defaulted
`camelKey → value` map, the `defaulted` path list, and the required-key list, so `Args.html`
iterates only PROVIDED keys and merges the precomputed rest. Mind the documented merge
lattice in `Args.html` (provided-canonical > provided-deprecated > defaulted; map iteration
order is not precedence). If any gate fails or the change balloons, ship step 1 alone and
record step 2 as a follow-up in the register.

**Verification:** run mod-utils' own test suite / exampleSite build if present; then from a
hinode worktree with `HUGO_MODULE_REPLACEMENTS` pointing at the patched clone: byte-diff
gate (allowlist only) + measurement protocol (expect user-CPU reduction ≥8%).

**DoD:**

- [ ] Byte-diff gate passed (run-vs-run AND vs stock; allowlist only) — evidence in PR body
- [ ] Median user-CPU reduction ≥8% on exampleSite, protocol followed, numbers in PR body
- [ ] mod-utils' own CI green; no new warnings in build output (compare `WARN` lines)
- [ ] Commit type `fix:` (not `perf:` — do not assume the repo's semantic-release config
      releases it), body ≤100 chars/line
- [ ] PR merged by driver ONLY after all boxes above; release tag confirmed to exist
- [ ] Register row updated with release version

## Chunk B — mod-flexsearch: take the index off the render critical path

**Repo:** gethinode/mod-flexsearch (branch `perf/defer-index-build` off `origin/main`).

**Problem recap:** `assets/js/modules/flexsearch/flexsearch.index.js` executes as a template
inside the core script bundle; `GetSearchDocs.html` calls `.Plain` on every page, per
language. This runs inside `partialCached "utilities/bundlev2.html"` while all page renders
wait on that mutex (observed: first-call max ~6 s; removing it cut wall by 2–3.5 s).

**Approach (implementer chooses the seam, in preference order):**

1. `templates.Defer` around the index-emitting part so it executes after all pages render —
   `.Plain` then reuses Hugo's cached content instead of forcing serial renders. Note
   `templates.Defer` works in templates, not the asset pipeline; the seam is likely where
   the bundle or the inline `index.add()` script is emitted, possibly splitting the index
   payload out of the mutex-guarded bundle into its own deferred `<script>` or JSON.
2. Default to the existing lazy path (the module already documents a
   `flexsearch-index.json` "fetched on demand" mode) — flip the default, keep eager as opt-in.
3. Any other seam that provably removes `.Plain`-for-all-pages from inside the bundle mutex.

**Gate (narrowed diff instead of byte-identical):** page HTML may change ONLY in
search-related `<script>`/`<link>` tags and search asset files (index JS/JSON, their
fingerprints). Everything else byte-identical (allowlist still applies). Functional check:
the emitted index contains the same document count per language as stock — the stock
payload lives in the stock snapshot's fingerprinted bundle/JSON under `js/` (locate it by
grepping the snapshot for a known page title, then count `href` entries in both) — and
`hugo server` serves a working search (manual smoke optional; the count check is the hard
gate). CSP: if script
handling changes, rebuild headers (`npm run build:example:headers`) and confirm no new
`unsafe-*` requirement.

**DoD:**

- [ ] Wall-clock reduction ≥1.5 s median on the executing machine (protocol followed)
- [ ] CPU (user) not increased by more than noise (±3%)
- [ ] Diff limited to search assets + their references; rest of output passes byte-diff gate
- [ ] Index document count per language identical to stock — counts quoted in PR body
- [ ] mod-flexsearch CI green; `fix:`/`feat:` commit; release tag confirmed after merge
- [ ] Register row updated with release version

## Chunk C — hinode: build hygiene (PR opened, HELD for maintainer)

**Repo:** gethinode/hinode (worktree branch `perf/build-hygiene` off `origin/main`).
Four independent sub-items, one PR:

1. **Conditional vendoring.** `prebuild`/`prestart` run `rimraf _vendor && hugo mod vendor`
   on every build (~4 s). Make vendoring skip when `_vendor/modules.txt` is newer than
   `go.mod`/`go.sum` (or equivalent guard); provide `mod:vendor:force`. CI behavior must be
   byte-for-byte unchanged — CI starts from a clean checkout where the guard always misses.
2. **GC tuning for CI.** Two seams, both non-obvious:
   - Netlify: the root `netlify.toml` is AUTO-GENERATED (`build:headers:prod` regenerates it
     from source data) — edit the SOURCE the generator reads, then regenerate and commit
     both, else the next header build silently reverts the change. Trace the generator
     (`build:headers*` scripts) to find the source file before editing.
   - GitHub Actions: `.github/workflows/lint-build.yml` only calls the REUSABLE workflow
     `gethinode/.github/...@v1`; an `env:` block at the caller does NOT propagate into it.
     The in-repo seam is prepending `GOGC=400` to the `build-command` input. Editing
     `gethinode/.github` itself is out of scope (STOP AND ASK).
   Cite the measured effect in a comment (GOGC=800 saved 6–7 CPU-s locally; 400 is the
   conservative pick — CI runners have less RAM). Do NOT change local defaults.
3. **Determinism harness.** Commit the byte-diff gate as `scripts/check-build-determinism.sh`
   (double build + `diff -rq` + the RSS allowlist, exit non-zero on unexpected diffs) so
   future perf PRs cite one command. Document it in the script header.
4. **Docs.** In the developer/CI documentation, record: `resources/_gen` caching is worth 4×
   on cold runners (68.7 s → ~17 s measured); the shared root `resources/` dir serves both
   the theme and exampleSite; `getresource` 5-minute TTL adds network noise to isolated runs.

**DoD:**

- [ ] `npm run build:example` output byte-identical to stock (gate); second invocation
      measurably skips vendoring
- [ ] Harness script runs green on stock main
- [ ] Lint suite passes (`pnpm test`); hinode CI green on the PR
- [ ] PR opened against hinode `main` with evidence; **left unmerged** (register: `PR held`)

## Chunk D — GATED: context-independent shortcodes → `.Content` (audit + design only)

**Deliverable:** a design doc `docs/superpowers/specs/<date>-content-render-once-design.md`
committed to the program branch `program/build-time-optimization` (no functional changes,
no separate PR — the maintainer reviews the program branch). Required content:

1. **Full inventory** of render-context dependencies reachable from shortcodes/content
   partials, across ALL repos whose layouts are mounted in the exampleSite build — at
   minimum hinode, mod-utils, mod-fontawesome, mod-blocks, mod-docs; derive the complete
   list from `hugo config mounts -s exampleSite` and audit every module that mounts
   `layouts/`. Catalogue every `page.` global lookup, every `.Scratch.Get`/`Set`
   (breakpoint, padding, `modules`, `dependencies`, UID counters), every `.Store` use —
   file:line, classified as
   (a) page-intrinsic (safe), (b) layout-context (unsafe under cached `.Content`),
   (c) accumulator with cross-render effects (e.g. `Scratch.Add "icons"`, module
   `dependencies` — these ALSO break under `.Content` caching because registration happens
   once, not per rendering context).
2. **Migration design** per class — e.g. resolve breakpoint/padding from site/page params
   instead of Scratch; deterministic IDs (the `.Ordinal`/UniqueID work already under way —
   see `2026-07-15-ordinal-id-migration-design.md`); icon/module registration via a
   post-content mechanism that tolerates single-render.
3. **Known symptoms to design away** (from the 2026-07-15 session): `d--none` malformed
   class, 404-page `alt` leakage, `/en/` vs `/en/docs/blocks/` href flips, UID renumbering,
   the RSS `px-0`/`px-4` race (this chunk's completion REMOVES the allowlist).
4. **Sequencing** into PR-sized slices, each passing the byte-diff gate, with the
   `ProcessContent` `.Content` switch last, behind the fixed shortcodes.
5. Interaction with `purgeHTMLComments` (exampleSite sets it `true`; `--minify` already
   strips HTML comments from output — decide the param's future).

**DoD:** design doc complete with the five sections; every inventory claim carries file:line
evidence; register row → `Design ready — STOP AND ASK`. **No implementation.**

## Chunk E — GATED: sidebar render-once (design only)

**Deliverable:** design doc for caching the docs sidebar per (section, version, language)
instead of per page ×2 (metrics: sidebar stack ~50 s cumulative, 66–86% cache potential,
3,420 item renders for ~30 docs pages): `partialCached` keying, moving active-item
highlighting to a small client-side script (match `location.pathname`; the sidebar JS module
exists), offcanvas reuse, CSP implications of the script, interaction with Chunk D.
**DoD:** design doc complete; register row → `Design ready — STOP AND ASK`. No implementation.

## Chunk F — hinode dependency bumps (PR opened, HELD)

After Chunk A and/or B releases are CONFIRMED: from a fresh hinode worktree off
`origin/main`, bump the released module(s) in `go.mod` AND `exampleSite/go.mod`
(`hugo mod get`, `hugo mod tidy` both, re-vendor), run the byte-diff gate (Chunk B's
narrowed gate if B is included) and the measurement protocol against stock main, and open
ONE hinode PR titled `fix(deps): …` with before/after numbers. Leave unmerged. Template:
hinode PR #2031 (the mod-fontawesome v6.0.2 bump) — same flow, same evidence style.

## THE LOOP (driver algorithm)

1. **Wave 0 — setup & baseline.** Fetch all repos; verify `gh auth status` works for
   gethinode. Create the program branch: from a fresh hinode worktree off `origin/main`,
   `git checkout -b program/build-time-optimization`, push it — the live register lives
   here; commit every register update to this branch immediately. Create the driver's own
   benchmark worktree from `origin/main`; `pnpm install`; run the measurement protocol on
   stock main and record the machine's own baseline in the register (all later claims
   compare against THIS baseline). Check that `scripts/check-build-determinism.sh` doesn't
   exist yet and the register rows read `Pending` (otherwise a prior run left state —
   reconcile the register first, before spawning anything).
2. **Wave 1 — parallel.** Spawn one agent per chunk A, B, C, D, E with its section above as
   the brief plus the Ground rules and the gate/protocol sections verbatim. Implementation
   may run in parallel; the driver schedules each chunk's *measurement* phase exclusively
   (one at a time, nothing else running).
3. **QA per chunk (driver, before any merge/PR-open):** independently re-run the chunk's
   gate from the agent's branch — do not take the agent's word; check DoD boxes against
   artifacts; read the diff for scope creep (a chunk PR contains ONLY its chunk).
4. **Merge & release (A, B only):** merge on green CI + complete DoD; confirm the release
   tag; update the register row. On CI failure: one fix round by the same agent, then park
   as `Blocked` with notes.
5. **Wave 2:** when A/B releases exist → Chunk F. Open the held hinode PRs (C, F) with
   evidence; register rows → `PR held — awaiting maintainer`.
6. **Wrap-up:** update the register (replace rows, never append); write one memory entry
   (per-machine baseline, chunk outcomes, release versions); post a summary comment on each
   held PR linking the register on the program branch
   (`https://github.com/gethinode/hinode/blob/program/build-time-optimization/docs/superpowers/specs/2026-07-15-build-time-optimization-register.md`).
   Report: chunks landed/held/blocked, measured deltas,
   questions queued for the maintainer.

## STOP AND ASK (park the chunk, never guess)

- Any Tier-1 gate failure that survives one fix round.
- mod-utils or mod-flexsearch `origin/main` differs from its latest release tag in a way
  that changes behavior (unreleased work in flight) — do not rebase someone's WIP.
- Chunk B forces a CSP/`unsafe-*` change, or the index count check cannot be made to pass.
- Any need to touch a repo outside {mod-utils, mod-flexsearch, hinode}.
- Anything that would require pushing to `main`, force-pushing, or editing an open PR not
  created by this program.
- Tier-2 implementation of any kind.

## Register discipline

The register file holds one row per chunk: `Status | Branch/PR | Release | Evidence |
Notes/Questions`. Statuses: `Pending → In progress → QA → Merged+Released` (A, B) /
`PR held` (C, F) / `Design ready` (D, E) / `Blocked (reason)`. Replace rows in place.
