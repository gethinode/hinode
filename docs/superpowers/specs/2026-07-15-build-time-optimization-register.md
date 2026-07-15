# Register: Hugo build-time optimization program

Companion to
[2026-07-15-build-time-optimization-program-driver.md](2026-07-15-build-time-optimization-program-driver.md).
The copy on `main` is the launch snapshot; the LIVE register is maintained on the program
branch `program/build-time-optimization` (created in Wave 0). The executing session replaces
rows in place (never appends history) and keeps `Evidence` pointing at concrete artifacts
(PR links, measurement blocks in PR bodies).

## Machine baseline (Wave 0 — fill in before anything else)

| Field | Value |
| --- | --- |
| Machine / cores | _(fill in)_ |
| Hugo version | _(fill in — must be the repo-pinned binary)_ |
| Stock `main` commit | _(fill in)_ |
| Median wall (3 runs) | _(fill in)_ |
| Median user CPU (3 runs) | _(fill in)_ |
| Determinism check | _(run-vs-run diff result, allowlist only expected)_ |

## Chunks

| Chunk | Status | Branch / PR | Release | Evidence | Notes / Questions |
| --- | --- | --- | --- | --- | --- |
| A: mod-utils absent-key precompute | Pending | — | — | — | Step 1 verified 2026-07-15 (−11% CPU, byte-identical); step 2 optional |
| B: mod-flexsearch index off critical path | Pending | — | — | — | Stub experiment 2026-07-15: −2 to −3.5 s wall |
| C: hinode build hygiene | Pending | — | n/a | — | PR to be HELD for maintainer |
| D: content render-once (audit + design) | Pending | — | n/a | — | GATED — design only, then STOP AND ASK |
| E: sidebar render-once (design) | Pending | — | n/a | — | GATED — design only, then STOP AND ASK |
| F: hinode bumps for A/B | Pending — gated on A/B releases | — | n/a | — | PR to be HELD for maintainer |

## Questions queued for the maintainer

None yet.
