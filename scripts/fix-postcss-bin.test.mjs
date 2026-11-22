import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, rmSync, symlinkSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'

const require = createRequire(import.meta.url)
const { fixPostCSSBins } = require('./fix-postcss-bin.cjs')
const fixtureCLI = `#!/usr/bin/env node
let input = ''; process.stdin.setEncoding('utf8');
process.stdin.on('data', chunk => { input += chunk });
process.stdin.on('end', () => {
  console.log(JSON.stringify({ cwd: process.cwd(), args: process.argv.slice(2), input }));
  process.exitCode = Number(process.env.HINODE_POSTCSS_TEST_EXIT || 0);
});
`

function fixture (withExample = true) {
  const root = mkdtempSync(path.join(os.tmpdir(), 'hinode postcss project '))
  mkdirSync(path.join(root, 'node_modules/postcss-cli'), { recursive: true })
  mkdirSync(path.join(root, 'config'), { recursive: true })
  writeFileSync(path.join(root, 'node_modules/postcss-cli/index.js'), fixtureCLI, { mode: 0o755 })
  if (withExample) mkdirSync(path.join(root, 'exampleSite/config'), { recursive: true })
  return root
}

function invoke (root, site, exit = 0) {
  const bin = path.join(site, 'node_modules/.bin/postcss')
  const args = ['--config', path.join(site, 'config'), '--probe', 'two words']
  const windows = process.platform === 'win32'
  // Explicit cmd invocation exercises npm's real Windows shim with a spaced project path.
  const command = windows ? 'cmd.exe' : bin
  const argv = windows ? ['/d', '/s', '/c', `""${bin}.cmd" ${args.map(arg => `"${arg}"`).join(' ')}"`] : args
  return spawnSync(command, argv, {
    cwd: path.dirname(root), encoding: 'utf8', input: 'stdin marker\n',
    env: { ...process.env, HINODE_POSTCSS_TEST_EXIT: String(exit) }, windowsVerbatimArguments: windows
  })
}

test('root and example local launchers preserve site cwd, spaced arguments, stdin and failure', async () => {
  assert.equal(typeof fixPostCSSBins, 'function', 'installer must expose its testable installation boundary')
  const root = fixture()
  try {
    await fixPostCSSBins(root)
    for (const site of [root, path.join(root, 'exampleSite')]) {
      const result = invoke(root, site)
      assert.equal(result.status, 0, result.stderr || String(result.error))
      const value = JSON.parse(result.stdout)
      assert.equal(value.cwd, realpathSync(site))
      assert.deepEqual(value.args, ['--config', path.join(site, 'config'), '--probe', 'two words'])
      assert.equal(value.input, 'stdin marker\n')
      assert.equal(invoke(root, site, 7).status, 7)
    }
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('repeat installation works without creating an absent example site', async () => {
  const root = fixture(false)
  try {
    await fixPostCSSBins(root)
    await fixPostCSSBins(root)
    assert.equal(invoke(root, root).status, 0)
    assert.equal(existsSync(path.join(root, 'exampleSite')), false)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('missing postcss-cli leaves existing bins untouched', async () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'hinode postcss absent '))
  try {
    const bin = path.join(root, 'node_modules/.bin/postcss')
    mkdirSync(path.dirname(bin), { recursive: true })
    writeFileSync(bin, 'owner marker')
    await fixPostCSSBins(root)
    assert.equal(readFileSync(bin, 'utf8'), 'owner marker')
    assert.equal(existsSync(path.join(root, 'node_modules/hinode-postcss.cjs')), false)
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('installer CLI anchors the repository even when invoked from a different directory', () => {
  const root = fixture()
  try {
    mkdirSync(path.join(root, 'scripts'))
    copyFileSync(new URL('./fix-postcss-bin.cjs', import.meta.url), path.join(root, 'scripts/fix-postcss-bin.cjs'))
    symlinkSync(path.dirname(require.resolve('cmd-shim/package.json')), path.join(root, 'node_modules/cmd-shim'),
      process.platform === 'win32' ? 'junction' : 'dir')
    const result = spawnSync(process.execPath, [path.join(root, 'scripts/fix-postcss-bin.cjs')], {
      cwd: path.dirname(root), encoding: 'utf8'
    })
    assert.equal(result.status, 0, result.stderr)
    assert.equal(invoke(root, path.join(root, 'exampleSite')).status, 0)
  } finally { rmSync(root, { recursive: true, force: true }) }
})
