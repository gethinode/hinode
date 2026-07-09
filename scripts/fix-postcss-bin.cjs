const fs = require('fs');
const path = require('path');

// Under pnpm's isolated node_modules (Linux/macOS), Hugo cannot spawn the
// postcss binary: pnpm's bin shim isn't a form Hugo's PostCSS integration
// accepts ("binary postcss is not a Node.js script"). Replace it with a
// direct Node script. On Windows CI a hoisted (npm-style) layout is used
// instead (see the setup-hinode action), where the native bin works, so this
// shim is a no-op there. No-op too when postcss-cli is absent (npm consumers).
const cli = path.join('node_modules', 'postcss-cli');
const bin = path.join('node_modules', '.bin');

if (process.platform !== 'win32' && fs.existsSync(cli)) {
  fs.mkdirSync(bin, { recursive: true });
  fs.writeFileSync(
    path.join(bin, 'postcss'),
    '#!/usr/bin/env node\nrequire("../postcss-cli/index.js");\n',
    { mode: 0o755 }
  );
}
