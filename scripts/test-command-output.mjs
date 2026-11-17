// Builds the tests/command fixture, which renders the real command shortcode and compiles its
// stylesheet on its own, then checks how output lines - those written with an (out) prefix - are
// marked and styled. Each output line must carry the command-output class, and the stylesheet
// must render that line and every token inside it upright and dimmed, whatever token the lexer
// gave it. Command lines keep their lexer tokens, and the prompt column keeps one span per line.
// Run with: node --test scripts/test-command-output.mjs (after pnpm mod:vendor).
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { after, before, test } from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const site = path.join(root, 'tests', 'command')
let destination

before(() => {
  destination = mkdtempSync(path.join(os.tmpdir(), 'hinode-command-'))
  // One command string through the shell, as package.json runs hugo.
  const command = `hugo -s "${site}" --logLevel error -d "${destination}"`
  const result = spawnSync(command, { cwd: root, encoding: 'utf8', shell: true })
  assert.equal(result.status, 0, `hugo build failed:\n${result.stdout}\n${result.stderr}`)
})

after(() => {
  if (destination) rmSync(destination, { recursive: true, force: true })
})

// Splits a page's single command block into its prompt-column spans and its Chroma lines. A
// prompt is the span's data-prompt value, or null for a span without one (an output line).
function parseBlock (page) {
  const html = readFileSync(path.join(destination, page, 'index.html'), 'utf8')
  const column = html.match(/<span class="command-line-prompt">((?:<span(?: data-prompt="[^"]*")?><\/span>)*)<\/span>/)
  assert.ok(column, `${page}: no prompt column`)
  assert.equal(html.match(/class="command-line-prompt"/g).length, 1, `${page}: one prompt column`)
  assert.ok(column.index < html.indexOf('<span class="line'), `${page}: prompt column after a line`)
  const prompts = [...column[1].matchAll(/<span(?: data-prompt="([^"]*)")?><\/span>/g)]
    .map(([, prompt]) => prompt ?? null)
  const lines = html.split(/(?=<span class="line[ "])/).slice(1).map(chunk => {
    const classes = chunk.match(/^<span class="([^"]*)"/)[1].split(/\s+/)
    return { classes, html: chunk.replace(/<\/code>[\s\S]*$/, '') }
  })
  return { prompts, lines }
}

// Each fixture page with the prompt the shortcode gives each of its lines, null for output.
const blocks = {
  bash: ['$', null, null, null, null, null, null, '$', null],
  powershell: ['PS>', '>>', null, null, null, null, 'PS>', null],
  tokens: ['$', null, '$', null, '$'],
  sql: ['sql>', '->', null, null],
  first: [null, '$'],
  indented: ['$', null, null, '$']
}

for (const [page, expected] of Object.entries(blocks)) {
  test(`${page}: one prompt span per line, in order`, () => {
    const { prompts, lines } = parseBlock(page)
    assert.deepEqual(prompts, expected)
    assert.equal(lines.length, expected.length)
  })

  test(`${page}: output lines, and only those, carry command-output`, () => {
    const { prompts, lines } = parseBlock(page)
    lines.forEach((line, index) => {
      assert.equal(line.classes[0], 'line', `line ${index} lost its Chroma class`)
      assert.equal(line.classes.includes('command-output'), prompts[index] === null,
        `line ${index} (${prompts[index] ?? 'output'}): ${line.html}`)
    })
  })
}

test('command lines keep their lexer tokens, including an italic comment', () => {
  const { lines } = parseBlock('bash')
  assert.match(lines[0].html, /<span class="s2">/)
  assert.match(lines[7].html, /<span class="nb">echo<\/span>/)
  assert.match(lines[7].html, /<span class="c1">/)
})

test('output lines are marked whatever token the lexer gave them', () => {
  // A box-drawing table tokenized as comments, output inside an open string that the lexer
  // splits into string and keyword tokens, and output inside a heredoc.
  const bash = parseBlock('bash')
  assert.match(bash.lines[1].html, /<span class="c1">┌/)
  const tokens = parseBlock('tokens')
  assert.match(tokens.lines[1].html, /<span class="s2">/)
  assert.match(tokens.lines[1].html, /<span class="k">\$\(if<\/span>/)
  assert.match(tokens.lines[3].html, /<span class="s">/)
  for (const index of [1, 3]) assert.ok(tokens.lines[index].classes.includes('command-output'))
})

// The compiled stylesheet as top-level rules. At-rule blocks such as media queries are skipped,
// so a declaration that holds only inside one is not counted. A rule scoped to one color mode
// with a [data-bs-theme] selector compiles to a top-level rule, so it is counted here and
// rejected by the selector checks in the last test.
function topLevelRules () {
  const css = readFileSync(path.join(destination, 'scss', 'command.css'), 'utf8')
    .replace(/\/\*[\s\S]*?\*\//g, '')
  const rules = []
  let depth = 0
  let start = 0
  let prelude = ''
  for (let index = 0; index < css.length; index++) {
    if (css[index] === '{') {
      if (depth === 0) prelude = css.slice(start, index).trim()
      depth++
      start = index + 1
    } else if (css[index] === '}') {
      depth--
      if (depth === 0) {
        if (!prelude.startsWith('@')) {
          const declarations = Object.fromEntries(css.slice(start, index).split(';')
            .map(declaration => declaration.split(':').map(part => part.trim()))
            .filter(([property, value]) => property && value)
            .map(([property, ...value]) => [property, value.join(':')]))
          rules.push({ selectors: prelude.split(',').map(selector => selector.trim()), declarations })
        }
        start = index + 1
      }
    }
  }
  return rules
}

// Specificity as [ids, classes/attributes/pseudo-classes, types]; enough for plain selectors.
function specificity (selector) {
  const ids = (selector.match(/#[\w-]+/g) ?? []).length
  const classes = (selector.match(/\.[\w-]+|\[[^\]]+\]|:(?!:)[\w-]+/g) ?? []).length
  const types = (selector.replace(/\[[^\]]+\]/g, '').match(/(^|[\s>+~])[a-z][\w-]*/gi) ?? []).length
  return [ids, classes, types]
}

const outputDeclarations = {
  color: 'var(--bs-secondary-color)',
  'font-style': 'normal',
  'font-weight': 'normal'
}

test('output lines and every token in them render upright and dimmed in both color modes', () => {
  const rules = topLevelRules()
  const line = rules.find(rule => rule.selectors.some(selector => /\.command-output$/.test(selector)))
  const tokens = rules.find(rule => rule.selectors.some(selector => /\.command-output \*$/.test(selector)))
  assert.ok(line, 'no top-level rule targets the output line')
  assert.ok(tokens, 'no top-level rule targets every element inside the output line')
  for (const rule of [line, tokens]) {
    for (const [property, value] of Object.entries(outputDeclarations)) {
      assert.equal(rule.declarations[property], value, `${rule.selectors.join(', ')} { ${property} }`)
    }
  }
})

test('the output rule sets only color, font-style and font-weight', () => {
  // Every top-level rule that names command-output must set exactly those three declarations,
  // so an opacity, filter or color added to the output rule fails. Rules that do not name
  // command-output are not checked here.
  for (const rule of topLevelRules()) {
    if (!rule.selectors.some(selector => selector.includes('command-output'))) continue
    assert.deepEqual(rule.declarations, outputDeclarations, rule.selectors.join(', '))
  }
})

test('the output styles reach no command line and outrank the dark syntax theme', () => {
  for (const rule of topLevelRules()) {
    if (!Object.keys(outputDeclarations).some(property => property in rule.declarations)) continue
    if (!rule.selectors.some(selector => selector.includes('command-output'))) continue
    for (const selector of rule.selectors) {
      assert.match(selector, /\.command-output( \*)?$/, `${selector} styles more than output`)
      assert.doesNotMatch(selector, /data-bs-theme|prefers-color-scheme/)
      // The dark syntax theme colors tokens with [data-bs-theme="dark"] .chroma .c1: [0, 3, 0].
      assert.ok(specificity(selector)[1] > 3, `${selector} loses to the syntax theme`)
    }
  }
})
