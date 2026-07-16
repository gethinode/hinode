#!/usr/bin/env bash
#
# check-build-determinism.sh — byte-diff gate for build determinism.
#
# Builds the exampleSite twice from scratch and verifies that both builds
# produce byte-identical output. Performance PRs should cite a green run of
# this script as evidence that they do not change the generated site.
#
# What it does:
#   1. Builds the exampleSite twice with `hugo --gc --minify -s exampleSite`,
#      removing `exampleSite/public` before each build.
#   2. Verifies each build log contains zero ERROR lines and reports the
#      expected page counts (98 EN / 26 FR / 24 NL) — a failed Hugo build can
#      masquerade as a fast one, so page counts are checked explicitly.
#   3. Compares both output trees with `diff -rq`.
#
# Tolerated diffs (allowlist): a pre-existing intermittent `.Content` race in
# RSS-embedded HTML (accepted by the maintainer on 2026-07-15) may cause the
# following files to differ between otherwise identical builds:
#   - en/index.xml
#   - en/docs/blocks/index.xml
#   - en/tags/block/index.xml
# Any other diff — or a missing/extra file, an ERROR line, or an unexpected
# page count — makes the script exit non-zero.
#
# Usage (from the repository root, after `pnpm install` and `pnpm mod:vendor`):
#   scripts/check-build-determinism.sh
#
# NOTE: when page counts change legitimately (content added or removed),
# update EXPECTED_PAGES below.

set -u

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
export PATH="$ROOT/node_modules/.bin:$PATH"

EXPECTED_PAGES="98 26 24" # EN FR NL
ALLOWLIST=(
  "en/index.xml"
  "en/docs/blocks/index.xml"
  "en/tags/block/index.xml"
)

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

fail=0

# run_build <n>: clean build of the exampleSite, log to $WORKDIR/build-<n>.log
run_build() {
  local n="$1"
  local log="$WORKDIR/build-$n.log"

  echo "==> Build $n"
  rm -rf exampleSite/public
  if ! hugo --gc --minify -s exampleSite >"$log" 2>&1; then
    echo "FAIL: build $n exited non-zero; last lines of log:"
    tail -20 "$log"
    exit 1
  fi

  local errors
  errors="$(grep -c '^ERROR' "$log")"
  if [ "$errors" -ne 0 ]; then
    echo "FAIL: build $n log contains $errors ERROR line(s):"
    grep '^ERROR' "$log" | head -10
    fail=1
  fi

  # The summary table prints the per-language page counts, e.g.:
  #  Pages           │  98 │  26 │  24
  local pages
  pages="$(grep -E '^\s*Pages\b' "$log" | head -1 | grep -oE '[0-9]+' | tr '\n' ' ' | sed 's/ $//')"
  if [ "$pages" != "$EXPECTED_PAGES" ]; then
    echo "FAIL: build $n page counts '$pages' != expected '$EXPECTED_PAGES' (EN FR NL)"
    fail=1
  else
    echo "    page counts OK ($pages), zero ERROR lines"
  fi
}

run_build 1
cp -R exampleSite/public "$WORKDIR/snapshot-1"
run_build 2
cp -R exampleSite/public "$WORKDIR/snapshot-2"

echo "==> Comparing build outputs"
diff -rq "$WORKDIR/snapshot-1" "$WORKDIR/snapshot-2" >"$WORKDIR/diff.txt"
diff_status=$?
if [ "$diff_status" -gt 1 ]; then
  echo "FAIL: diff -rq exited with status $diff_status"
  exit 1
fi

unexpected=0
while IFS= read -r line; do
  [ -z "$line" ] && continue
  allowed=""
  case "$line" in
    Files\ *\ differ)
      for entry in "${ALLOWLIST[@]}"; do
        case "$line" in
          "Files $WORKDIR/snapshot-1/$entry and $WORKDIR/snapshot-2/$entry differ")
            allowed="yes"
            break
            ;;
        esac
      done
      ;;
  esac
  if [ -n "$allowed" ]; then
    echo "    tolerated (RSS .Content race allowlist): $line"
  else
    echo "    UNEXPECTED: $line"
    unexpected=1
  fi
done <"$WORKDIR/diff.txt"

if [ "$unexpected" -ne 0 ]; then
  echo "FAIL: builds are not byte-identical outside the allowlist"
  fail=1
fi

if [ "$fail" -ne 0 ]; then
  echo "RESULT: FAIL"
  exit 1
fi

echo "RESULT: PASS — two consecutive builds are byte-identical (allowlist excepted)"
