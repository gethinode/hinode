const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

// Conditional Hugo module vendoring. `prebuild`/`prestart` re-vendor all Hugo
// modules on every build, which costs several seconds even when nothing
// changed. Skip vendoring when `_vendor/modules.txt` is newer than both
// `go.mod` and `go.sum`; otherwise delegate to `mod:vendor:force` (the
// original `rimraf _vendor && hugo mod vendor`). CI behavior is unchanged: a
// clean checkout has no `_vendor/`, so the guard always misses there. Run
// `npm run mod:vendor:force` to re-vendor unconditionally.
const root = path.join(__dirname, '..');
const manifest = path.join(root, '_vendor', 'modules.txt');
const sources = ['go.mod', 'go.sum'].map((file) => path.join(root, file));

function upToDate() {
  if (!fs.existsSync(manifest)) return false;
  const vendored = fs.statSync(manifest).mtimeMs;
  return sources.every((file) => !fs.existsSync(file) || fs.statSync(file).mtimeMs <= vendored);
}

if (upToDate()) {
  console.log('mod-vendor: _vendor is up to date, skipping (use "mod:vendor:force" to re-vendor)');
  process.exit(0);
}

console.log('mod-vendor: _vendor is stale or missing, vendoring Hugo modules');
const result = spawnSync('pnpm', ['run', 'mod:vendor:force'], {
  cwd: root,
  stdio: 'inherit',
  shell: true
});
process.exit(result.status === null ? 1 : result.status);
