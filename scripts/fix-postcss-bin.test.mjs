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

function nativeBin (bin, args, options) {
  const windows = process.platform === 'win32'
  // Explicit cmd invocation exercises npm's real Windows shim with a spaced project path.
  const command = windows ? 'cmd.exe' : bin
  const argv = windows ? ['/d', '/s', '/c', `""${bin}.cmd" ${args.map(arg => `"${arg}"`).join(' ')}"`] : args
  return spawnSync(command, argv, { ...options, windowsVerbatimArguments: windows })
}

function invoke (root, site, exit = 0) {
  const bin = path.join(site, 'node_modules/.bin/postcss')
  const args = ['--config', path.join(site, 'config'), '--no-map']
  return nativeBin(bin, args, {
    cwd: path.dirname(root), encoding: 'utf8', input: 'stdin marker\n',
    env: { ...process.env, PWD: site, HUGO_ENVIRONMENT: 'production', HINODE_POSTCSS_TEST_EXIT: String(exit) }
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
      assert.deepEqual(value.args, ['--config', path.join(site, 'config'), '--no-map'])
      assert.equal(value.input, 'stdin marker\n')
      assert.equal(invoke(root, site, 7).status, 7)
    }
  } finally { rmSync(root, { recursive: true, force: true }) }
})

// These use the actual CLI: echoing argv cannot prove relative file path behavior.
for (const stdin of [false, true]) {
  test(`real CLI preserves caller-relative ${stdin ? 'stdin output' : 'input and output'} paths`, async () => {
    const directory = mkdtempSync(path.join(os.tmpdir(), 'hinode real postcss '))
    const root = path.join(directory, 'project')
    const caller = path.join(directory, 'caller')
    try {
      mkdirSync(path.join(root, 'node_modules'), { recursive: true })
      mkdirSync(path.join(root, 'config'))
      mkdirSync(caller)
      writeFileSync(path.join(root, 'config/postcss.config.cjs'), 'module.exports = { plugins: [] };\n')
      const cli = path.dirname(require.resolve('postcss-cli/package.json'))
      symlinkSync(cli, path.join(root, 'node_modules/postcss-cli'), process.platform === 'win32' ? 'junction' : 'dir')
      await fixPostCSSBins(root)
      writeFileSync(path.join(caller, 'input file.css'), '.relative-probe{color:red}\n')
      for (const equals of [false, true]) {
        for (const hugoEnvironment of [false, true]) {
          const config = path.join(root, 'config')
          const args = [...(stdin ? [] : ['input file.css']),
            ...(equals ? [`--config=${config}`] : ['--config', config]), '--no-map', '-o', 'output file.css']
          const env = { ...process.env, PWD: hugoEnvironment ? root : caller }
          if (hugoEnvironment) env.HUGO_ENVIRONMENT = 'production'
          else delete env.HUGO_ENVIRONMENT
          const options = { cwd: caller, encoding: 'utf8', env, input: stdin ? '.relative-probe{color:red}\n' : undefined }
          for (const adapter of [false, true]) {
            for (const site of [root, caller]) rmSync(path.join(site, 'output file.css'), { force: true })
            const result = adapter
              ? nativeBin(path.join(root, 'node_modules/.bin/postcss'), args, options)
              : spawnSync(process.execPath, [path.join(cli, 'index.js'), ...args], options)
            assert.equal(result.status, 0, result.stderr || String(result.error))
            assert.ok(existsSync(path.join(caller, 'output file.css')), 'relative output must stay in caller directory')
            assert.equal(existsSync(path.join(root, 'output file.css')), false)
            assert.match(readFileSync(path.join(caller, 'output file.css'), 'utf8'), /\.relative-probe/)
          }
        }
      }
    } finally { rmSync(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }) }
  })
}

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

test('a config path without the complete Hugo context preserves caller cwd', async () => {
  const root = fixture(false)
  try {
    await fixPostCSSBins(root)
    for (const missing of ['PWD', 'HUGO_ENVIRONMENT']) {
      const env = { ...process.env, PWD: root, HUGO_ENVIRONMENT: 'production' }
      delete env[missing]
      const result = nativeBin(path.join(root, 'node_modules/.bin/postcss'),
        ['--config', path.join(root, 'config'), '--no-map'], {
          cwd: path.dirname(root), input: 'stdin marker\n', encoding: 'utf8', env
        })
      assert.equal(result.status, 0, result.stderr)
      assert.equal(JSON.parse(result.stdout).cwd, realpathSync(path.dirname(root)))
    }
  } finally { rmSync(root, { recursive: true, force: true }) }
})

test('current Hugo site permissions do not require reading the parent project directory', async () => {
  const root = realpathSync(fixture())
  try {
    await fixPostCSSBins(root)
    const site = path.join(root, 'exampleSite')
    const result = spawnSync(process.execPath, ['--permission',
      `--allow-fs-read=${path.join(root, 'node_modules')}`,
      `--allow-fs-read=${path.join(root, 'config')}`, `--allow-fs-read=${site}`,
      path.join(root, 'node_modules/hinode-postcss.cjs'), '--config', path.join(site, 'config'), '--no-map'], {
      cwd: site, encoding: 'utf8', input: 'stdin marker\n',
      env: { ...process.env, PWD: site, HUGO_ENVIRONMENT: 'production' }
    })
    assert.equal(result.status, 0, result.stderr)
    assert.equal(JSON.parse(result.stdout).cwd, realpathSync(site))
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
