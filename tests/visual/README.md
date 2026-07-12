# Visual regression harness

Self-contained Playwright + pixelmatch harness for the mod-utils v6 adoption program. Nothing
here is added to Hinode's root `package.json` — this directory has its own dependency tree.

## Install

```bash
cd tests/visual
npm install
npx playwright install chromium
```

## Usage

### shoot

Serves a built Hugo `public/` directory locally, discovers pages from its `sitemap.xml`
(following one level of `sitemapindex` nesting), filters by an include regex, and screenshots
each matching page.

```bash
node visual.mjs shoot --site <publicDir> --out <shotsDir> \
  [--include <regex>] [--base <baseURL, default http://127.0.0.1:8947>]
```

- Fixed viewport `1280x800`, `reducedMotion: reduce`, and injected CSS disable animations,
  transitions, and the caret before every navigation.
- Every request whose host is not the local static server is aborted, so remote assets never
  affect determinism.
- Known-dynamic regions are masked unconditionally: `.carousel`, `video`, `iframe`,
  `.leaflet-container`, `[data-lottie]`, `.lottie`, `canvas`.
- Output: one PNG per matched page plus `<shotsDir>/manifest.json` (pages shot, pages that
  failed to load). Failures are recorded, not fatal.
- Default include is `^/([a-z]{2}(-[a-z]+)?/)?(docs/components/|$)` — discovered by inspecting
  Hinode's exampleSite sitemaps: mod-docs component pages live under `/<locale>/docs/components/`
  (not the bare `/components/` a non-localized site would use), and the alternation also matches
  each locale's home page.

### compare

Pixelmatches two `shoot` output directories and emits an HTML report.

```bash
node visual.mjs compare --baseline <dirA> --candidate <dirB> --report <reportDir> \
  [--threshold 0.001]
```

- Dimension mismatches and pages missing on either side are automatic flags.
- `diffRatio = changed pixels / total pixels`; pages above `--threshold` are flagged and get a
  diff PNG.
- `<reportDir>/index.html` has a summary table (page, status, diff ratio, links) plus
  side-by-side baseline/candidate/diff images for every flagged page. A console summary is also
  printed.
- Exit code `1` if anything is flagged, `0` otherwise.

## Baseline protocol

The v5-generation baseline is captured **once** from Hinode `main` (commit recorded in
`tests/visual/BASELINE.md` and the program register) with its currently pinned module versions,
before any wave-1 module merge. Baselines live in the driver's program workspace under
`.superpowers/visual/` — they are not committed to git, since they are reproducible from the
recorded Hinode commit for as long as Hinode itself stays parked (out of scope for this program).

At PR review time for a module, the driver rebuilds Hinode's exampleSite with
`HUGO_MODULE_REPLACEMENTS` pointing at the candidate module branch (plus `--ignoreVendorPaths`
for that module), shoots it, and compares against the baseline. Modules not surfaced through
Hinode's exampleSite rely on their own exampleSite shoot instead, with their own baseline
captured from their `main` before the bump — same harness, same two commands.

## Triage discipline

Every flagged page gets classified, never silently accepted or silently ignored: *intended*
diffs (a default now actually applying, a call-site fix correcting a real rendering defect) are
re-baselined with a one-line justification that names the mechanism (e.g. "heading.width default
8 now applies"), not just an assertion of intent; anything else is treated as a regression in the
migration and fixed before merge. A flagged page with no written justification blocks the PR the
same way an unexplained golden-file diff would.
