// Exercise the advertised floor with fresh CSS resources, alongside the pinned current CI build.
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { createHash, randomBytes } from 'node:crypto'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, realpathSync, rmSync, writeFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripVTControlCharacters } from 'node:util'

const sourceFile = realpathSync(fileURLToPath(import.meta.url))
// Use the actual CLI's declared PostCSS peer, without changing this repository's peer graph.
const require = createRequire(sourceFile)
const cliRequire = createRequire(require.resolve('postcss-cli/package.json'))
const postcss = cliRequire('postcss')

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

export function tarCommand (platform = process.platform, env = process.env) {
  if (platform !== 'win32') return 'tar'
  // Git Bash can put GNU tar first; it treats a C: archive prefix as a remote host.
  const systemRoot = env.SystemRoot || env.SYSTEMROOT
  assert.ok(systemRoot && path.win32.isAbsolute(systemRoot), 'Windows SystemRoot is required for native ZIP extraction')
  return path.win32.join(systemRoot, 'System32', 'tar.exe')
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

export function assertFloorCSS (css, { kept, unused }) {
  const selectors = new Set()
  postcss.parse(css).walkRules(rule => {
    for (const selector of rule.selector.split(',')) selectors.add(selector.trim())
  })
  assert.ok(selectors.has(`.${kept}`), 'retained probe rule missing from production CSS')
  assert.ok(!selectors.has(`.${unused}`), 'unused probe rule survived production purge')
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
  const result = run(tarCommand(), ['-xf', archive, '-C', expanded])
  assert.equal(result.status, 0, `floor archive extraction failed: ${result.stderr}`)
  return path.join(expanded, process.platform === 'win32' ? 'hugo.exe' : 'hugo')
}

function createCSSProbe (root, scratch, resolved) {
  const token = randomBytes(8).toString('hex')
  const markers = { kept: `hinode-floor-kept-${token}`, unused: `hinode-floor-unused-${token}` }
  const assets = path.join(scratch, 'probe-assets')
  const content = path.join(scratch, 'probe-content')
  mkdirSync(path.join(assets, 'scss/theme'), { recursive: true })
  const pageDir = path.join(content, `floor-postcss-probe-${token}`)
  mkdirSync(pageDir, { recursive: true })
  const localStyle = path.join(root, 'exampleSite/assets/scss/theme/theme.scss')
  const style = readFileSync(existsSync(localStyle) ? localStyle : path.join(root, 'assets/scss/theme/theme.scss'), 'utf8')
  writeFileSync(path.join(assets, 'scss/theme/theme.scss'), `${style}\n.${markers.kept}{color:rgb(1,2,3)}\n.${markers.unused}{color:rgb(4,5,6)}\n`)
  writeFileSync(path.join(pageDir, 'index.md'),
    `+++\ntitle = "PostCSS floor probe"\n+++\n\n## Retained rule {.${markers.kept}}\n`)
  const mounts = resolved.module?.mounts
  assert.ok(Array.isArray(mounts), 'floor source mounts missing')
  const language = mounts.find(mount => mount.target === 'content')
  assert.ok(language, 'floor language content mount missing')
  const config = path.join(scratch, 'probe.json')
  // Retain the resolved multilingual/default mounts rather than flattening content languages.
  writeFileSync(config, JSON.stringify({ module: { mounts: [
    { source: assets, target: 'assets' }, { ...language, source: content }, ...mounts
  ] } }))
  return { config, markers }
}

const entryFile = process.argv[1]
const evalMode = process.execArgv.some(arg => /^(?:-e|-p|--eval(?:=|$)|--print(?:=|$))/.test(arg))
const runAsMain = import.meta.main ?? Boolean(entryFile && entryFile !== '-' && !evalMode && realpathSync(path.resolve(entryFile)) === sourceFile)
if (runAsMain) {
  const root = path.resolve(path.dirname(sourceFile), '..')
  const scratch = mkdtempSync(path.join(os.tmpdir(), 'hinode-hugo-floor-'))
  try {
    const binary = process.env.HUGO_FLOOR_BIN ? path.resolve(process.env.HUGO_FLOOR_BIN) : await downloadFloor(scratch)
    const version = run(binary, ['version'])
    assert.equal(version.status, 0, 'floor version command failed')
    assertFloorVersion(version.stdout.trim())
    console.log(version.stdout.trim())
    const site = path.join(root, 'exampleSite')
    const configDir = path.join(site, 'config')
    const config = run(binary, ['config', '--source', site, '--configDir', configDir,
      '--environment', 'production', '--format', 'json'], { cwd: scratch })
    assert.equal(config.status, 0, `floor config command failed: ${config.stderr}`)
    process.stderr.write(config.stderr)
    const probe = createCSSProbe(root, scratch, JSON.parse(config.stdout))
    const build = run(binary, ['--gc', '--minify', '--logLevel', 'info', '--environment', 'production',
      '--source', site, '--configDir', configDir, '--config', probe.config,
      '--destination', path.join(scratch, 'public')], {
      // An empty parent cwd prevents root-site stats from masking an incorrect adapter cwd.
      cwd: scratch, env: { ...process.env, HUGO_RESOURCEDIR: path.join(scratch, 'resources') }
    })
    process.stdout.write(build.stdout)
    process.stderr.write(build.stderr)
    assertFloorBuild(`${build.stdout}\n${build.stderr}`, build.status)
    const cssDir = path.join(scratch, 'public/css')
    const stylesheets = readdirSync(cssDir).filter(name => name.endsWith('.css'))
    assert.ok(stylesheets.length, 'production CSS output missing')
    assertFloorCSS(stylesheets.map(filename => readFileSync(path.join(cssDir, filename), 'utf8')).join('\n'), probe.markers)
    const classes = JSON.parse(readFileSync(path.join(site, 'hugo_stats.json'), 'utf8')).htmlElements.classes
    assert.ok(classes.includes(probe.markers.kept) && !classes.includes(probe.markers.unused), 'fresh probe stats missing')
    console.log('PASS Hugo extended 0.158.0 production PostCSS build')
  } catch (error) {
    console.error(`Hugo floor check failed: ${error.message}`)
    process.exitCode = 1
  } finally {
    rmSync(scratch, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  }
}
