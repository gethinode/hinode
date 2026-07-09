const fs = require('fs');
const path = require('path');
const cmdShim = require('cmd-shim');

// Hugo runs postcss via an npx-style lookup that only accepts npm-format bin
// shims. pnpm's own shims (isolated or hoisted) are rejected by Hugo with
// "binary postcss is not a Node.js script" — worst on Windows. Regenerate an
// npm-exact shim for postcss using cmd-shim (the tool npm itself uses), which
// Hugo accepts on Linux, macOS, and Windows. No-op when postcss-cli is absent
// (e.g. an npm consumer whose flat layout already works).
const entry = path.join('node_modules', 'postcss-cli', 'index.js');
const target = path.join('node_modules', '.bin', 'postcss');

if (fs.existsSync(entry)) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  cmdShim(entry, target).catch((err) => {
    console.error('fix-postcss-bin: failed to shim postcss:', err.message);
    process.exit(1);
  });
}
