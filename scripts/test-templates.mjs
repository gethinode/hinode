// Preserve the template environment matrix, then validate the emitted sharing metadata with
// HTML parsing rules (including raw text, inert templates, comments and foreign namespaces).
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import parse5 from 'parse5'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const homepage = path.join(root, 'tests/templates/public/index.html')
const want = 'https://example.org/share/post/'
const htmlNamespace = 'http://www.w3.org/1999/xhtml'
const environments = [null, 'theme-icons', 'menu-case', 'quiet-caption', 'external-link-defaults',
  'bookshop-live', 'og-schema', 'og-schema-partial', 'og-schema-height', 'og-schema-units', 'og-fallback']
const attributes = node => Object.fromEntries((node.attrs || []).map(({ name, value }) => [name, value]))
const element = (node, name) => node.namespaceURI === htmlNamespace && node.tagName === name

function * descendants (node) {
  // Nested template contents are inert: deliberately do not traverse node.content here.
  yield node
  for (const child of node.childNodes || []) yield * descendants(child)
}

function checkMetadata (document, environment) {
  const fixtures = [...descendants(document)].filter(node =>
    element(node, 'template') && Object.hasOwn(attributes(node), 'data-share-metadata'))
  assert.equal(fixtures.length, 2, 'share metadata: expected page and article fixtures')
  for (const [name, articleCount] of [['page', 0], ['article', 1]]) {
    const matches = fixtures.filter(node => attributes(node)['data-share-metadata'] === name)
    assert.equal(matches.length, 1, `share metadata: expected one ${name} fixture`)
    // These are the direct children of the head fragment, not tag-like text or inert descendants.
    const nodes = matches[0].content.childNodes
    if (name === 'page') {
      const canonical = nodes.filter(node => element(node, 'link') &&
        (attributes(node).rel || '').toLowerCase().split(/[\t\n\f\r ]+/).includes('canonical'))
      assert.equal(canonical.length, 1, 'share metadata canonical: expected one carrier')
      assert.equal(attributes(canonical[0]).href, want, 'share metadata canonical: expected clean page URL')
      const og = nodes.filter(node => element(node, 'meta') && attributes(node).property === 'og:url')
      assert.equal(og.length, 1, 'share metadata og:url: expected one carrier')
      assert.equal(attributes(og[0]).content, want, 'share metadata og:url: expected clean page URL')
    }
    const scripts = nodes.filter(node => element(node, 'script') &&
      (attributes(node).type || '').split(';')[0].replace(/^[\t\n\f\r ]+|[\t\n\f\r ]+$/g, '').toLowerCase() === 'application/ld+json')
    assert.equal(scripts.length, 1, 'share metadata JSON-LD: expected one carrier')
    const json = scripts[0].childNodes.map(node => node.value || '').join('')
    const data = JSON.parse(json)
    assert.ok(!JSON.stringify(data).includes('utm_'), 'share metadata JSON-LD: UTM tags leaked into graph')
    const graph = []
    const containers = [data]
    for (const container of containers) {
      assert.ok(['https://schema.org', 'http://schema.org'].includes(container['@context']),
        'share metadata JSON-LD: expected schema context')
      assert.ok(Array.isArray(container['@graph']) && container['@graph'].length,
        'share metadata JSON-LD: expected nonempty graph')
      for (const node of container['@graph']) {
        assert.ok(node && typeof node === 'object' && !Array.isArray(node), 'share metadata JSON-LD: invalid node')
        if (Object.hasOwn(node, '@context')) {
          assert.ok(['https://schema.org', 'http://schema.org'].includes(node['@context']),
            'share metadata JSON-LD: unexpected node-local context')
        }
        if (Object.hasOwn(node, '@graph')) containers.push(node)
        else graph.push(node)
      }
    }
    const pages = graph.filter(node => node['@type'] === 'WebPage')
    assert.equal(pages.length, 1, 'share metadata JSON-LD: expected one WebPage')
    assert.equal(pages[0]['@id'], want, 'share metadata JSON-LD: expected clean WebPage id')
    assert.equal(pages[0].url, want, 'share metadata JSON-LD: expected clean WebPage URL')
    const articles = graph.filter(node => node['@type'] === 'Article')
    assert.equal(articles.length, articleCount, 'share metadata JSON-LD: unexpected Article count')
    for (const article of articles) {
      assert.equal(article.mainEntityOfPage?.['@id'], want, 'share metadata JSON-LD: expected clean Article page')
      assert.equal(article.isPartOf?.['@id'], want, 'share metadata JSON-LD: expected clean Article parent')
    }
  }
  console.log(`PASS sharing metadata DOM: ${environment}`)
}

function buttonAttributes (document, fixture, marker) {
  const fixtures = [...descendants(document)].filter(node =>
    element(node, 'div') && attributes(node)['data-button-attributes'] === fixture)
  assert.equal(fixtures.length, 1, `button attributes: expected one ${fixture} fixture`)
  const buttons = [...descendants(fixtures[0])].filter(node =>
    element(node, 'a') && Object.hasOwn(attributes(node), marker))
  assert.equal(buttons.length, 1, `button attributes: expected one ${fixture} button`)
  return attributes(buttons[0])
}

function checkButtonAttributes (document, environment) {
  const sharing = buttonAttributes(document, 'sharing', 'data-sharing-description')
  assert.equal(sharing['data-sharing-title'], 'Tips & tricks: "C++" for café owners', 'button attributes: full share title')
  assert.equal(sharing['data-sharing-description'], 'Read "C++" with <samples> & literal &amp; text.', 'button attributes: full share description')
  assert.equal(sharing['data-sharing-url'], 'https://example.org/share/post/?utm_source=native&utm_medium=social',
    'button attributes: tagged share URL')

  const download = buttonAttributes(document, 'download', 'download')
  assert.equal(download.download, String.raw`notes &amp; "café" \ draft.txt`, 'button attributes: literal download value')
  assert.equal(download['data-empty'], '', 'button attributes: empty string stays present')
  console.log(`PASS button attributes DOM: ${environment}`)
}

function run (command, args) {
  // Windows needs a shell for Hugo's .cmd shim, never for an absolute Node executable.
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' && command === 'hugo' })
  if (result.error) throw result.error
  assert.equal(result.status, 0, `${command} ${args.join(' ')} failed`)
}

function checkSassTranspilers () {
  const options = { cwd: root, encoding: 'utf8', shell: process.platform === 'win32' }
  const version = spawnSync('hugo', ['version'], options)
  if (version.error) throw version.error
  assert.equal(version.status, 0, version.stderr)
  const [, major, minor] = version.stdout.match(/^hugo v(\d+)\.(\d+)\./)
  const supportsLibSass = Number(major) === 0 && Number(minor) < 170

  const directory = mkdtempSync(path.join(os.tmpdir(), 'hinode-sass-'))
  try {
    for (const [transpiler, expected] of [
      ['libsass', supportsLibSass ? 'libsass' : null],
      ['dartsass', 'dartsass'],
      ['', supportsLibSass ? 'libsass' : 'dartsass']
    ]) {
      const destination = path.join(directory, transpiler || 'default')
      const result = spawnSync('hugo', ['-s', 'tests/sass', '-d', destination, '-e', 'development'], {
        ...options,
        env: {
          ...process.env,
          HUGO_PARAMS_MAIN_BUILD_TRANSPILER: transpiler,
          HUGO_RESOURCEDIR: path.join(directory, 'resources')
        }
      })
      if (result.error) throw result.error
      const log = result.stdout + result.stderr
      if (expected) {
        assert.equal(result.status, 0, log)
        const css = readFileSync(path.join(destination, 'css', 'main.css'), 'utf8')
        assert.ok(css.includes(`.${expected}-fixture`), `expected ${expected} stylesheet for setting '${transpiler}'`)
      } else {
        assert.notEqual(result.status, 0, log)
        assert.match(log, /partial \[head\/stylesheet\.html\].*main\.build\.transpiler.*libsass.*Hugo 0\.170\.0.*dartsass/)
        assert.doesNotMatch(log, /error calling toCSS/)
      }
    }
    console.log('PASS Sass transpiler selection')
  } finally {
    rmSync(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  }
}

checkSassTranspilers()

if (process.platform === 'win32') {
  // Hosted Node paths may omit spaces; qualify the supported default installation case too.
  const directory = mkdtempSync(path.join(os.tmpdir(), 'hinode node '))
  try {
    const executable = path.join(directory, 'node.exe')
    copyFileSync(process.execPath, executable)
    run(executable, ['-e', 'process.exit(0)'])
  } finally {
    rmSync(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  }
}

for (const environment of environments) {
  // Absence or disabled homepage must fail, not reuse an earlier environment's output.
  rmSync(homepage, { force: true })
  run('hugo', ['-s', 'tests/templates', '--logLevel', 'error',
    ...(environment ? ['--environment', environment] : [])])
  // bookshop-live intentionally disables home to exercise its separate link-rendering fixture.
  if (environment !== 'bookshop-live') {
    const document = parse5.parseFragment(readFileSync(homepage, 'utf8'))
    checkMetadata(document, environment || 'production')
    checkButtonAttributes(document, environment || 'production')
  }
}
// This separate fixture intentionally disables home; retain its existing strict-image checks.
run(process.execPath, ['scripts/test-strict-images.cjs'])
