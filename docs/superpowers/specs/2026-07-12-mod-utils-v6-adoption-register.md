# Register: mod-utils v6 adoption wave

Rows are REPLACED on state change, never appended. States:
`Pending → InProgress → PR → Merged → Released → Verified` (bump rows);
`Pending → Resolved` (verify-only rows). Evidence: PR link, release link, v6-only proof,
warning-triage summary.

| Wave | Module | Bump | State | Evidence |
| --- | --- | --- | --- | --- |
| 1 | mod-fontawesome | /v5 → /v6 | InProgress | PILOT — test-drives the mechanism before parallelization |
| 1 | mod-flexsearch | /v4 → /v5 | Pending | — |
| 1 | mod-hanko | /v2 → /v3 | Pending | — |
| 1 | mod-hubspot | /v3 → /v4 | Pending | — |
| 1 | mod-leaflet | /v2 → /v3 | Pending | — |
| 1 | mod-llm | v1 → /v2 | Pending | — |
| 1 | mod-lottie | /v2 → /v3 | Pending | — |
| 1 | mod-simple-datatables | /v3 → /v4 | Pending | — |
| 2 | mod-bootstrap-icons | v1 → /v2 | Pending | — (gate: mod-fontawesome released) |
| 2 | mod-flaticon | v1 → /v2 | Pending | — (gate: mod-fontawesome released) |
| 2 | mod-mermaid | /v4 → /v5 | Pending | — (gate: mod-fontawesome released) |
| 3 | mod-blocks | v1 → /v2 | Pending | — (recipe addendum: seed exampleSite first) |
| 3 | mod-docs | verify-only | Pending | — |
| 3 | mod-template | verify-only | Pending | — |
| 4 | hinode + sites | PARKED | AwaitingDecision | Hinode v3 decision package delivered at program end |

## Program infrastructure

| Item | State | Evidence |
| --- | --- | --- |
| Visual harness (`tests/visual/`) | Ready | commit 85698b0; two-run determinism check 42/42 clean |
| v5-generation baseline | Captured | 42 pages (39 en `docs/components/*` + 3 locale homes) from Hinode main-equivalent, see `tests/visual/BASELINE.md`; images in driver workspace `.superpowers/visual/baseline-v5` |
