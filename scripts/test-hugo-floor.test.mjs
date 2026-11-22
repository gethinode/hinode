import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, rmSync, symlinkSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { fileURLToPath } from 'node:url'
import * as floor from './test-hugo-floor.mjs'
const { assertFloorBuild, assertFloorVersion, floorAsset, verifyFloorArchive } = floor

test('accepts only the extended advertised floor, never the installed current version', () => {
  assert.doesNotThrow(() => assertFloorVersion('hugo v0.158.0-f41be79+extended darwin/arm64'))
  for (const version of ['hugo v0.169.0+extended darwin/arm64', 'hugo v0.158.0 linux/amd64', 'hugo v0.158.01+extended windows/amd64']) {
    assert.throws(() => assertFloorVersion(version), /expected Hugo extended 0\.158\.0/)
  }
})

test('an exit-zero build must actually resolve site-local PostCSS and read its stats', () => {
  const trace = 'INFO exec: resolve "postcss" using node_modules/.bin\n'
  assert.doesNotThrow(() => assertFloorBuild(trace, 0))
  assert.throws(() => assertFloorBuild('Total in 100 ms', 0), /local PostCSS was not executed/)
  assert.throws(() => assertFloorBuild('INFO exec: resolve "postcss" using npx', 0), /local PostCSS was not executed/)
  assert.throws(() => assertFloorBuild(trace + "INFO postcss: No files found from the passed PurgeCSS option 'content'.", 0), /PostCSS could not read site stats/)
  assert.throws(() => assertFloorBuild(trace, 2), /floor build failed/)
  assert.throws(() => assertFloorBuild(trace, null), /floor build failed/)
})

test('archive checksum verification rejects changed bytes before extraction', () => {
  const abc = 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
  assert.doesNotThrow(() => verifyFloorArchive(Buffer.from('abc'), abc))
  assert.throws(() => verifyFloorArchive(Buffer.from('abd'), abc), /SHA-256 mismatch/)
})

test('official archive selection is explicit for the three supported CI platforms', () => {
  assert.equal(floorAsset('darwin', 'arm64').filename, 'hugo_extended_0.158.0_darwin-universal.pkg')
  assert.equal(floorAsset('darwin', 'x64').filename, 'hugo_extended_0.158.0_darwin-universal.pkg')
  assert.equal(floorAsset('linux', 'x64').filename, 'hugo_extended_0.158.0_linux-amd64.tar.gz')
  assert.equal(floorAsset('win32', 'x64').filename, 'hugo_extended_0.158.0_windows-amd64.zip')
  assert.throws(() => floorAsset('linux', 'arm64'), /unsupported floor platform/)
})

test('CLI entry through a directory alias still runs checks and propagates failure', () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), 'hinode floor alias '))
  try {
    const scripts = path.dirname(fileURLToPath(import.meta.url))
    const alias = path.join(directory, 'linked scripts')
    symlinkSync(scripts, alias, process.platform === 'win32' ? 'junction' : 'dir')
    for (const entry of [path.join(scripts, 'test-hugo-floor.mjs'), path.join(alias, 'test-hugo-floor.mjs')]) {
      for (const flags of [[], ['--preserve-symlinks-main']]) {
        const result = spawnSync(process.execPath, [...flags, entry], {
          cwd: directory, encoding: 'utf8',
          env: { ...process.env, HUGO_FLOOR_BIN: path.join(directory, 'absent-floor-binary') }
        })
        assert.equal(result.status, 1, 'every entry path must reject a missing floor binary')
        assert.match(result.stderr, /Hugo floor check failed:.*ENOENT/)
      }
    }
  } finally { rmSync(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }) }
})

test('importing helpers from eval with data arguments stays passive', () => {
  const url = new URL('./test-hugo-floor.mjs', import.meta.url).href
  const result = spawnSync(process.execPath, ['--input-type=module', '-e',
    `await import(${JSON.stringify(url)}); console.log('IMPORTED')`, 'ordinary-data-argument'], { encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr)
  assert.equal(result.stdout, 'IMPORTED\n')
})

test('CSS proof requires a real retained rule and removal of an unused rule', () => {
  assert.equal(typeof floor.assertFloorCSS, 'function')
  const markers = { kept: 'floor-kept-test', unused: 'floor-unused-test' }
  assert.doesNotThrow(() => floor.assertFloorCSS('.other,.floor-kept-test{color:#010203}', markers))
  assert.throws(() => floor.assertFloorCSS('.floor-kept-test{color:red}.floor-unused-test{color:blue}', markers), /unused probe rule survived/)
  assert.throws(() => floor.assertFloorCSS('/* .floor-kept-test{} */.other{content:".floor-kept-test"}', markers), /retained probe rule missing/)
  assert.throws(() => floor.assertFloorCSS('', markers), /retained probe rule missing/)
})
