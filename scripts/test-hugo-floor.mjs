// Exercise the advertised floor with fresh CSS resources, alongside the pinned current CI build.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripVTControlCharacters } from 'node:util'

export function floorAsset (platform = process.platform, arch = process.arch) {
  // Official v0.158.0 release SHA-256 digests; update only with a reviewed floor change.
  const assets = {
    darwin: ['darwin-universal.pkg', '99a9e8360c787d5aa9bb717f58a1394aeba1a33e905466caaeb116cfad683dba'],
    linux: ['linux-amd64.tar.gz', 'c2a724ac3c8e949fca56dd438b868b2128837754420c20a6e7ae345616c4e625'],
    win32: ['windows-amd64.zip', '1a18975b0bd9ac913ba7f30e9872f6045d82534faf2075f7964ba0b445a77698']
  }
  assert.ok(assets[platform] && (platform === 'darwin' ? ['arm64', 'x64'].includes(arch) : arch === 'x64'),
    `unsupported floor platform: ${platform}/${arch}; provide HUGO_FLOOR_BIN`)
  const [suffix, sha256] = assets[platform]
  return { filename: `hugo_extended_0.158.0_${suffix}`, sha256 }
}

export function verifyFloorArchive (bytes, sha256) {
  assert.equal(createHash('sha256').update(bytes).digest('hex'), sha256, 'Hugo floor archive SHA-256 mismatch')
}

export function assertFloorVersion (version) {
  assert.ok(/^hugo v0\.158\.0[-+ ]/.test(version) && /\+extended(?:[ +]|$)/.test(version),
    `expected Hugo extended 0.158.0, got: ${version}`)
}

export function assertFloorBuild (output, status) {
  assert.equal(status, 0, 'Hugo floor build failed')
  const log = stripVTControlCharacters(output)
  assert.ok(/exec:\s+resolve "postcss" using node_modules\/\.bin/.test(log), 'local PostCSS was not executed')
  assert.ok(!log.includes('No files found from the passed PurgeCSS option'), 'PostCSS could not read site stats')
}

function run (command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, ...options })
  if (result.error) throw result.error
  return result
}

async function downloadFloor (scratch) {
  const asset = floorAsset()
  const url = `https://github.com/gohugoio/hugo/releases/download/v0.158.0/${asset.filename}`
  const response = await fetch(url, { signal: AbortSignal.timeout(120000) })
  assert.ok(response.ok, `floor download failed: ${response.status} ${url}`)
  const bytes = Buffer.from(await response.arrayBuffer())
  verifyFloorArchive(bytes, asset.sha256)
  const archive = path.join(scratch, asset.filename)
  writeFileSync(archive, bytes)
  const expanded = path.join(scratch, 'expanded')
  if (process.platform === 'darwin') {
    const result = run('pkgutil', ['--expand-full', archive, expanded])
    assert.equal(result.status, 0, `floor pkg extraction failed: ${result.stderr}`)
    return path.join(expanded, 'Payload', 'hugo')
  }
  mkdirSync(expanded)
  const result = run('tar', ['-xf', archive, '-C', expanded])
  assert.equal(result.status, 0, `floor archive extraction failed: ${result.stderr}`)
  return path.join(expanded, process.platform === 'win32' ? 'hugo.exe' : 'hugo')
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
  const scratch = mkdtempSync(path.join(os.tmpdir(), 'hinode-hugo-floor-'))
  try {
    const binary = process.env.HUGO_FLOOR_BIN ? path.resolve(process.env.HUGO_FLOOR_BIN) : await downloadFloor(scratch)
    const version = run(binary, ['version'])
    assert.equal(version.status, 0, 'floor version command failed')
    assertFloorVersion(version.stdout.trim())
    console.log(version.stdout.trim())
    const build = run(binary, ['--gc', '--minify', '--logLevel', 'info', '--environment', 'production',
      '--source', path.join(root, 'exampleSite'), '--destination', path.join(scratch, 'public')], {
      // An empty parent cwd prevents root-site stats from masking an incorrect adapter cwd.
      cwd: scratch, env: { ...process.env, HUGO_RESOURCEDIR: path.join(scratch, 'resources') }
    })
    process.stdout.write(build.stdout)
    process.stderr.write(build.stderr)
    assertFloorBuild(`${build.stdout}\n${build.stderr}`, build.status)
    console.log('PASS Hugo extended 0.158.0 production PostCSS build')
  } catch (error) {
    console.error(`Hugo floor check failed: ${error.message}`)
    process.exitCode = 1
  } finally {
    rmSync(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  }
}
