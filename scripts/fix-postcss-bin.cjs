const fs = require('fs');
const path = require('path');
const cmdShim = require('cmd-shim');

// The floor Hugo searches the site's own bin before npx and inherits the parent's
// cwd. New Hugo resolves Node entries itself. A local Node adapter supports both:
// honor Hugo's explicit site context for its stats, then import the real CLI.
const adapter = `#!/usr/bin/env node
const path = require('node:path');
const fs = require('node:fs');
const { pathToFileURL } = require('node:url');
const root = path.dirname(__dirname);
const args = process.argv.slice(2);
const configIndex = args.indexOf('--config');
// Hinode's stylesheet sends stdin to stdout with these options. File/glob/output
// commands remain caller-relative even when Hugo-like variables are inherited.
const hugoIO = args.length === 3 &&
  ((args[0] === '--config' && args[2] === '--no-map') ||
   (args[0] === '--no-map' && args[1] === '--config'));
if (hugoIO && process.env.HUGO_ENVIRONMENT && process.env.PWD) {
  const config = path.resolve(args[configIndex + 1]);
  const cwd = path.resolve(process.env.PWD);
  for (const site of [root, path.join(root, 'exampleSite')]) {
    const expected = path.join(site, 'config');
    if (fs.existsSync(cwd) && fs.existsSync(config) && fs.existsSync(expected) &&
        fs.realpathSync(config) === fs.realpathSync(expected) &&
        fs.realpathSync(cwd) === fs.realpathSync(site)) { process.chdir(site); break; }
  }
}
import(pathToFileURL(path.join(__dirname, 'postcss-cli', 'index.js')).href)
  .catch(err => { console.error(err); process.exitCode = 1; });
`;

async function fixPostCSSBins(root = path.resolve(__dirname, '..')) {
  const entry = path.join(root, 'node_modules', 'postcss-cli', 'index.js');
  if (!fs.existsSync(entry)) return;
  const launcher = path.join(root, 'node_modules', 'hinode-postcss.cjs');
  await fs.promises.writeFile(launcher, adapter, { mode: 0o755 });
  await fs.promises.chmod(launcher, 0o755);
  const sites = [root];
  if (fs.existsSync(path.join(root, 'exampleSite'))) sites.push(path.join(root, 'exampleSite'));
  for (const site of sites) {
    const target = path.join(site, 'node_modules', '.bin', 'postcss');
    await fs.promises.mkdir(path.dirname(target), { recursive: true });
    if (process.platform === 'win32') await cmdShim(launcher, target);
    else {
      await fs.promises.unlink(target).catch(err => { if (err.code !== 'ENOENT') throw err; });
      await fs.promises.symlink(path.relative(path.dirname(target), launcher), target);
    }
  }
}

module.exports = { fixPostCSSBins };
if (require.main === module) {
  fixPostCSSBins().catch((err) => {
    console.error('fix-postcss-bin: failed to shim postcss:', err.message);
    process.exitCode = 1;
  });
}
