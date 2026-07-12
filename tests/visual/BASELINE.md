# v5-generation visual baseline

Evidence record for the visual regression baseline captured before any wave-1 module merge, per
the "VISUAL REGRESSION" section of
[2026-07-12-mod-utils-v6-adoption-program-driver.md](../../docs/superpowers/specs/2026-07-12-mod-utils-v6-adoption-program-driver.md).

## Provenance

- **Hinode commit:** `ad05b3de7e7daa77903601c6629ad7a9e70e6f8c` (branch
  `program/mod-utils-v6-adoption`, build-equivalent to `main` — only docs differ on this branch).
- **Date captured:** 2026-07-12.
- **Build command:** `npm run build:example` at the repo root (`hugo --gc --minify -s
  exampleSite`, after `hugo mod vendor`).
- **Baseline dir:** `/Users/mark/Development/GitHub/gethinode/hinode/.superpowers/visual/baseline-v5`
  (driver's program workspace, not committed to git — reproducible from the commit above for as
  long as Hinode stays parked).

## Module versions (v5-generation, from `hugo mod graph -s exampleSite`)

| Module | Version |
| --- | --- |
| mod-utils | `/v5@v5.23.4` |
| mod-fontawesome | `/v5@v5.1.1` |
| mod-flexsearch | `/v4@v4.3.3+vendor` |
| mod-leaflet | `/v2@v2.1.1+vendor` |
| mod-lottie | `/v2@v2.1.2+vendor` |
| mod-mermaid | `/v4@v4.10.1+vendor` |
| mod-simple-datatables | `/v3@v3.1.2+vendor` |
| mod-bootstrap-icons | `v1.4.4` |
| mod-google-analytics | `/v2@v2.0.3+vendor` |
| mod-cookieyes | `/v2@v2.2.6` |
| mod-blocks | `v1.23.6` |
| mod-docs | `v1.14.1` |
| mod-bootstrap | `v1.3.7+vendor` |
| mod-csp | `v1.0.11+vendor` |
| mod-katex | `v1.1.5+vendor` |

No `mod-hanko`, `mod-hubspot`, or `mod-flaticon` in this graph — not imported by Hinode's
exampleSite.

## Page count

- Sitemap discovered **108** total pages across the `en`/`fr`/`nl` sitemaps (root `sitemap.xml`
  is a `sitemapindex` with one nested sitemap per locale).
- Include regex matched **42** pages: the `en` locale's 39 `docs/components/*` pages (mod-docs
  component documentation, including the section index) plus the three locale home pages
  (`/en/`, `/fr/`, `/nl/`). `fr`/`nl` currently carry no translated component docs, so all
  component-page coverage is `en`.
- Default include regex in `visual.mjs` was adjusted from the spec's starting guess
  (`^/(components/|$)`) to `^/([a-z]{2}(-[a-z]+)?/)?(docs/components/|$)`, discovered by
  inspecting the exampleSite sitemaps: mod-docs component pages live at
  `/<locale>/docs/components/<name>/`, not at the site root.
- 0 pages failed to load (non-200 or exception).

## Determinism check

- Ran `shoot` twice against the same build (`baseline-v5` and a throwaway `baseline-v5-check`),
  then `compare`d them.
- **First attempt:** 1 page flagged — `en/docs/components/mermaid/` (the mermaid diagram
  gallery), a `dimension-mismatch` of 1px in full-page height (22644px vs 22643px) caused by
  mermaid's client-side diagram rendering finishing a frame apart between runs.
- **Fix:** added a `waitForStableLayout` poll (`document.documentElement.scrollHeight`,
  polled every 200ms until unchanged for 2 consecutive rounds, capped at 4s) plus a
  `document.fonts.ready` wait, both run before the existing fixed 500ms settle wait and the
  screenshot. This is a script-only change (`tests/visual/visual.mjs`); no source outside
  `tests/visual/` was touched.
- **Second attempt (post-fix):** re-shot both runs from the same build and compared again —
  **42/42 pages OK, 0 flagged, exit code 0.** Two consecutive shoots now compare clean.
- The throwaway check directory and its comparison report were deleted after the determinism
  check passed, per the harness protocol; only `baseline-v5` is retained.

## Reproducing

```bash
npm run build:example            # repo root; regenerates exampleSite/public
cd tests/visual
npm install && npx playwright install chromium
node visual.mjs shoot --site ../../exampleSite/public \
  --out /Users/mark/Development/GitHub/gethinode/hinode/.superpowers/visual/baseline-v5
```
