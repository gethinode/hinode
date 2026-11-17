// Builds the tests/clipboard fixture, which renders the real command shortcode and a plain code
// fence, then runs the shipped assets/js/clipboard.js against that markup and clicks each copy
// button. A command block copies only the lines its prompt column marks with data-prompt, so the
// (out) lines are left out; a plain code block copies its text as before.
// Run with: node --test scripts/test-clipboard.mjs (after pnpm mod:vendor).
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { after, before, test } from 'node:test'
import { fileURLToPath } from 'node:url'
import vm from 'node:vm'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const site = path.join(root, 'tests', 'clipboard')
const clipboardSource = readFileSync(path.join(root, 'assets', 'js', 'clipboard.js'), 'utf8')
  .replace(/^import .*$/gm, '')

// A minimal DOM for the well-formed markup Hugo and Chroma emit: elements, attributes and text.
// Selectors are limited to tag, .class and [attr] compounds joined by a space or '>'; anything
// else throws, so a selector the handler uses is either supported exactly or fails loudly.
const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: '\'' }
const decode = text => text.replace(/&(#\d+|#x[0-9a-f]+|\w+);/gi, (match, code) => {
  if (code[0] !== '#') return entities[code] ?? match
  return String.fromCodePoint(code[1] === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10))
})

class Element {
  constructor (tagName, attributes, parentNode) {
    this.tagName = tagName.toUpperCase()
    this.attributes = attributes
    this.parentNode = parentNode
    this.childNodes = []
  }

  get textContent () {
    return this.childNodes.map(node => (typeof node === 'string' ? node : node.textContent)).join('')
  }

  // Chroma's lines are inline spans inside <pre>, where rendered text equals the source text.
  get innerText () { return this.textContent }

  get className () { return this.attributes.class ?? '' }
  set className (value) { this.attributes.class = value }

  getAttribute (name) { return this.attributes[name] ?? null }
  hasAttribute (name) { return Object.hasOwn(this.attributes, name) }
  setAttribute (name, value) { this.attributes[name] = String(value) }
  addEventListener (type, listener) { (this.listeners ??= {})[type] = listener }
  blur () {}

  insertBefore (node, reference) {
    node.parentNode = this
    this.childNodes.splice(this.childNodes.indexOf(reference), 0, node)
  }

  * descendants () {
    for (const node of this.childNodes) {
      if (typeof node === 'string') continue
      yield node
      yield * node.descendants()
    }
  }

  matchesCompound (compound) {
    const parts = compound.match(/^([a-z]*)((?:\.[\w-]+|\[[\w-]+\])*)$/i)
    if (!parts || compound === '') throw new Error(`unsupported selector: ${compound}`)
    if (parts[1] && parts[1].toUpperCase() !== this.tagName) return false
    const classes = this.className.split(/\s+/)
    for (const [, kind, name] of parts[2].matchAll(/([.[])([\w-]+)\]?/g)) {
      if (kind === '.' ? !classes.includes(name) : !this.hasAttribute(name)) return false
    }
    return true
  }

  matches (selector) {
    const tokens = selector.trim().split(/\s*(>)\s*|\s+/).filter(Boolean)
    const step = (element, index) => {
      if (!element.matchesCompound(tokens[index])) return false
      if (index === 0) return true
      const child = tokens[index - 1] === '>'
      const next = child ? index - 2 : index - 1
      for (let parent = element.parentNode; parent instanceof Element; parent = parent.parentNode) {
        if (step(parent, next)) return true
        if (child) return false
      }
      return false
    }
    return step(this, tokens.length - 1)
  }

  querySelectorAll (selector) { return [...this.descendants()].filter(element => element.matches(selector)) }
  querySelector (selector) { return this.querySelectorAll(selector)[0] ?? null }

  closest (selector) {
    for (let element = this; element instanceof Element; element = element.parentNode) {
      if (element.matches(selector)) return element
    }
    return null
  }
}

const parse = html => {
  const document = new Element('#document', {}, null)
  let current = document
  for (const [, close, tag, attrs, text] of html.matchAll(/<(\/?)([a-z][\w-]*)((?:"[^"]*"|[^>"])*)>|([^<]+)/gi)) {
    if (text !== undefined) {
      current.childNodes.push(decode(text))
    } else if (close) {
      assert.equal(current.tagName, tag.toUpperCase(), 'unbalanced fixture markup')
      current = current.parentNode
    } else if (tag.toLowerCase() !== 'meta' && tag.toLowerCase() !== 'link') {
      const attributes = {}
      for (const [, name, value] of attrs.matchAll(/([\w-]+)(?:="([^"]*)")?/g)) attributes[name] = decode(value ?? '')
      const element = new Element(tag, attributes, current)
      current.childNodes.push(element)
      if (!attrs.trim().endsWith('/')) current = element
    }
  }
  document.createElement = tag => new Element(tag, {}, null)
  return document
}

let destination
let html
before(() => {
  destination = mkdtempSync(path.join(os.tmpdir(), 'hinode-clipboard-'))
  // One command string through the shell, as package.json runs hugo.
  const command = `hugo -s "${site}" --logLevel error -d "${destination}"`
  const result = spawnSync(command, { cwd: root, encoding: 'utf8', shell: true })
  if (result.error) throw result.error
  assert.equal(result.status, 0, `hugo build failed:\n${result.stdout}\n${result.stderr}`)
  html = readFileSync(path.join(destination, 'commands', 'index.html'), 'utf8')
})

after(() => {
  if (destination) rmSync(destination, { recursive: true, force: true })
})

// Loads the page, runs clipboard.js on it and clicks the copy button of code block `index`.
const copy = async index => {
  const document = parse(html)
  const written = []
  const clipboard = { writeText: text => { written.push(text); return Promise.resolve() } }
  const context = vm.createContext({
    document, navigator: { clipboard }, params: { copyToClipboard: 'Copy' }, setTimeout: () => {}
  })
  vm.runInContext(clipboardSource, context, { filename: 'clipboard.js' })
  const buttons = document.querySelectorAll('button')
  assert.equal(buttons.length, 6, 'one copy button per code block')
  await buttons[index].listeners.click()
  assert.equal(written.length, 1)
  return written[0]
}

test('copies only commands, skipping (out) lines', async () => {
  assert.equal(await copy(0), 'echo "$PWD/work/warehouse/jaffle.duckdb"')
})

test('copies multi-line command with continuation', async () => {
  assert.equal(await copy(1), 'Get-ChildItem -Path . `\n-Filter *.duckdb')
})

test('copies a continued command but not the output after it', async () => {
  assert.equal(await copy(2), 'Get-ChildItem -Path . `\n-Filter *.duckdb')
})

test('copies every line of a command block without output', async () => {
  assert.equal(await copy(3), 'export MY_VAR=123\necho "hello"')
})

test('copies a plain code block in full', async () => {
  assert.equal(await copy(4), 'echo "hello"\n# hello')
})

test('copies every command of a block that interleaves commands and output', async () => {
  assert.equal(await copy(5), 'cd /tmp\nls -la\necho one\necho two\npwd')
})
