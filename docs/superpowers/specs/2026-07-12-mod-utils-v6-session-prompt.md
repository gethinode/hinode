# Parallel-session prompt: mod-utils v6 module adoption

One Claude session per module, sessions run in parallel (max 4 concurrent, one module per
session, never two sessions on one repo). Fill in the two parameters and paste.

---

Adopt mod-utils v6 in **<MODULE>** (path bump **<OLD → NEW>**) as part of the mod-utils v6
adoption program. You are both implementer and driver for this one module; the program
register tracks your state.

Read first — these are your contract, in this order:
1. Driver: `docs/superpowers/specs/2026-07-12-mod-utils-v6-adoption-program-driver.md`
   (branch `program/mod-utils-v6-adoption` of gethinode/hinode) — THE RECIPE, the
   PILOT REFINEMENTS (all eight are binding), VISUAL REGRESSION, RELEASE MECHANICS,
   STOP AND ASK.
2. Register (same directory): confirm your module's row is Pending and its wave gate is
   satisfied; set it InProgress (commit + push the register on the program branch) before
   starting, and update it at every state change. Pull before every register edit.
3. The Args API reference: mod-utils README "Argument validation" section (v6.0.1+).

Execution constraints beyond the driver text:
- Fresh clone of your module from github.com/gethinode/<MODULE>; branch `feat/mod-utils-v6`.
  Never build from any sibling clone.
- mod-utils requirement: `github.com/gethinode/mod-utils/v6 v6.0.1` or newer (v6.0.0 has a
  known camelKey-collision defect fixed in v6.0.1 — do not pin v6.0.0).
- Wave-2 modules also bump their mod-fontawesome requirement to `/v6 v6.0.0+`.
- Visual harness: `node <hinode-clone>/tests/visual/visual.mjs` from a checkout of the
  program branch; own-exampleSite baseline BEFORE any change (pilot refinement 1).
- Commit-body check before pushing (pilot refinement 2): no line may both start with `-`
  and end with `-`.
- You may merge your own PR ONLY after: CI fully green (including Windows), the recipe
  step-8 evidence is complete in your PR description, and the visual triage has zero
  unexplained entries. After merging: WATCH the semantic-release log and confirm the
  release type is MAJOR and the tag equals your new path major (pilot refinement 3). If a
  wrong version cuts: delete the release+tag immediately, verify
  `https://proxy.golang.org/<module-path>/@v/list` does not list it, push an empty commit
  with a clean BREAKING CHANGE footer, and confirm the re-cut.
- Register on completion: state Released, then Verified with evidence (PR link, release
  link, `hugo mod graph` v6-only line, migrated-call-site count, warning + visual triage
  summary).
- STOP AND ASK applies unchanged: nothing outside your module's repo (register edits on the
  program branch excepted); mod-utils/hinode changes are the maintainer's; three failed
  attempts means stop.
