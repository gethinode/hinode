const fs = require('fs');
const path = require('path');

// Under pnpm's non-flat node_modules, Hugo cannot spawn the `postcss` binary:
// pnpm's bin shims aren't in the form Hugo's PostCSS integration accepts
// ("binary postcss is not a Node.js script"). Recreate npm-style shims so
// `css.PostCSS` works on Linux, macOS, and Windows. No-op when postcss-cli
// is absent (e.g. an npm consumer with a flat layout that already works).
const cli = path.join('node_modules', 'postcss-cli');
const bin = path.join('node_modules', '.bin');

if (fs.existsSync(cli)) {
  fs.mkdirSync(bin, { recursive: true });

  // Unix: a direct Node script.
  fs.writeFileSync(
    path.join(bin, 'postcss'),
    '#!/usr/bin/env node\nrequire("../postcss-cli/index.js");\n',
    { mode: 0o755 }
  );

  // Windows: an npm-style .CMD wrapper that invokes node on postcss-cli
  // (%~dp0 is node_modules\.bin\, so ..\postcss-cli is node_modules\postcss-cli).
  fs.writeFileSync(
    path.join(bin, 'postcss.CMD'),
    '@node "%~dp0..\\postcss-cli\\index.js" %*\r\n'
  );

  // Remove pnpm's PowerShell shim so only the wrappers above resolve.
  try {
    fs.unlinkSync(path.join(bin, 'postcss.ps1'));
  } catch {
    /* not present — fine */
  }
}
