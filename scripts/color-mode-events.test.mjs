import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import vm from 'node:vm'

const colorSource = readFileSync(new URL('../assets/js/critical/color.js', import.meta.url), 'utf8')
  .replace(/^import .*$/gm, '')
const cookieSource = readFileSync(new URL('../assets/js/critical/_cookie.js', import.meta.url), 'utf8')
  .replace(/^export /gm, '')
const eventName = 'hinode:color-mode:before-change'

// Execute the shipped sources. Only browser boundaries are replaced; storage helpers,
// normalization, setter calls and the registered DOM/system handlers are real code.
function createPage ({ stored = 'auto', system = 'light', enabled = true, cancel = false } = {}) {
  const mutations = []
  const events = []
  const storage = new Map([['theme', stored]])
  const attrs = new Map([['data-bs-theme', 'light'], ['data-bs-main-theme', 'light']])
  let checked = true
  let checkedAttribute = true
  const selector = {
    get checked () { return checked },
    set checked (value) { checked = value; mutations.push(['checked', value]) },
    toggleAttribute (name, value) {
      assert.equal(name, 'checked')
      checkedAttribute = value
      mutations.push(['selector-attribute', value])
    },
    closest (query) { return query === '.navbar-mode-selector' ? this : null }
  }
  const document = new EventTarget()
  document.documentElement = {
    getAttribute: name => attrs.get(name) ?? null,
    setAttribute (name, value) { attrs.set(name, value); mutations.push(['attribute', name, value]) }
  }
  document.querySelectorAll = query => {
    assert.equal(query, '.navbar-mode-selector')
    return [selector]
  }
  const media = new EventTarget()
  Object.defineProperty(media, 'matches', { get: () => system === 'dark' })
  const window = new EventTarget()
  window.matchMedia = query => {
    assert.equal(query, '(prefers-color-scheme: dark)')
    return media
  }
  const snapshot = () => ({
    stored: storage.get('theme'), theme: attrs.get('data-bs-theme'),
    mainTheme: attrs.get('data-bs-main-theme'), checked, checkedAttribute
  })
  document.addEventListener(eventName, event => {
    events.push({ theme: event.detail.theme, cancelable: event.cancelable,
      target: event.target === document, before: snapshot(), mutations: [...mutations] })
    if (cancel) event.preventDefault()
  })
  const context = vm.createContext({
    params: { darkMode: enabled }, document, window, CustomEvent,
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem (key, value) { storage.set(key, String(value)); mutations.push(['storage', key, value]) }
    }
  })
  vm.runInContext(cookieSource + '\n' + colorSource, context, { filename: 'color.js' })
  return {
    events, mutations, snapshot,
    reset () { events.length = 0; mutations.length = 0 },
    cancel (value) { cancel = value },
    store (value) { storage.set('theme', value) },
    system (value) { system = value; media.dispatchEvent(new Event('change')) },
    pageshow (persisted) {
      const event = new Event('pageshow')
      Object.defineProperty(event, 'persisted', { value: persisted })
      window.dispatchEvent(event)
    },
    toggle () {
      const event = new Event('change')
      Object.defineProperty(event, 'target', { value: selector })
      document.dispatchEvent(event)
    },
    unrelatedChange () { document.dispatchEvent(new Event('change')) },
    load () { window.dispatchEvent(new Event('load')) }
  }
}

const light = { stored: 'light', theme: 'light', mainTheme: 'light', checked: true, checkedAttribute: true }
const dark = { stored: 'dark', theme: 'dark', mainTheme: 'dark', checked: false, checkedAttribute: false }

// Removing the event, moving it after any setter mutation, or resolving auto before
// dispatch must fail these independent literal expectations.
for (const [stored, requested, resolved] of [
  ['light', 'light', light], ['dark', 'dark', dark],
  ['auto', 'auto', { ...dark, stored: 'auto' }],
  ['unsupported', 'auto', { ...dark, stored: 'auto' }]
]) {
  test(`initial ${stored} preference dispatches normalized ${requested} before applying it`, () => {
    const page = createPage({ stored, system: 'dark' })
    assert.equal(page.events.length, 1)
    assert.deepEqual(page.events[0], {
      theme: requested, cancelable: true, target: true,
      before: { ...light, stored }, mutations: []
    })
    assert.deepEqual(page.snapshot(), resolved)
    assert.deepEqual(page.mutations, [
      ['storage', 'theme', requested], ['attribute', 'data-bs-theme', resolved.theme],
      ['attribute', 'data-bs-main-theme', resolved.theme],
      ['checked', resolved.checked], ['selector-attribute', resolved.checked]
    ])
  })
}

// A cancellation that only protects attributes but still persists, or that still
// updates selectors, is observably incomplete.
test('cancellation skips all initialization setter effects synchronously', () => {
  const page = createPage({ stored: 'auto', system: 'dark', cancel: true })
  assert.equal(page.events.length, 1)
  assert.equal(page.events[0].theme, 'auto')
  assert.equal(page.events[0].cancelable, true)
  assert.deepEqual(page.events[0].mutations, [])
  assert.deepEqual(page.mutations, [])
  assert.deepEqual(page.snapshot(), { ...light, stored: 'auto' })
})

test('cancellation protects the stored auto preference on the system setter path', () => {
  const page = createPage()
  page.reset()
  page.cancel(true)
  page.system('dark')
  assert.equal(page.events.length, 1)
  assert.equal(page.events[0].theme, 'dark')
  assert.deepEqual(page.events[0].mutations, [])
  assert.deepEqual(page.mutations, [])
  assert.deepEqual(page.snapshot(), { ...light, stored: 'auto' })
  page.cancel(false)
  page.system('dark')
  assert.deepEqual(page.snapshot(), dark)
})

test('cancellation protects every setter effect when restoring a persisted page', () => {
  const page = createPage({ stored: 'dark' })
  page.store('auto')
  page.reset()
  page.cancel(true)
  page.pageshow(false)
  assert.equal(page.events.length, 0)
  page.pageshow(true)
  assert.equal(page.events.length, 1)
  assert.equal(page.events[0].theme, 'auto')
  assert.deepEqual(page.events[0].mutations, [])
  assert.deepEqual(page.mutations, [])
  assert.deepEqual(page.snapshot(), { ...dark, stored: 'auto' })
  page.cancel(false)
  page.pageshow(true)
  assert.deepEqual(page.snapshot(), { ...light, stored: 'auto' })
})

test('normal delegated controls persist explicit choices and ignore later system changes', () => {
  const page = createPage()
  page.reset()
  page.toggle()
  assert.equal(page.events.length, 1)
  assert.equal(page.events[0].theme, 'dark')
  assert.deepEqual(page.snapshot(), dark)
  page.reset()
  page.system('light')
  assert.deepEqual(page.events, [])
  assert.deepEqual(page.mutations, [])
  assert.deepEqual(page.snapshot(), dark)
  page.toggle()
  assert.equal(page.events[0].theme, 'light')
  assert.deepEqual(page.snapshot(), light)
  page.reset()
  page.unrelatedChange()
  assert.deepEqual(page.events, [])
  assert.deepEqual(page.mutations, [])
  page.load()
  assert.deepEqual(page.snapshot(), light)
})

test('cancelling a control change skips setter effects while retaining its animation flag', () => {
  const page = createPage()
  page.cancel(true)
  page.reset()
  page.toggle()
  assert.equal(page.events.length, 1)
  assert.equal(page.events[0].theme, 'dark')
  assert.deepEqual(page.mutations, [['attribute', 'data-bs-theme-animate', 'true']])
  assert.deepEqual(page.snapshot(), { ...light, stored: 'auto' })
})

test('disabled color mode registers no color events or mutations', () => {
  const page = createPage({ enabled: false })
  page.system('dark')
  page.pageshow(true)
  page.toggle()
  page.load()
  assert.deepEqual(page.events, [])
  assert.deepEqual(page.mutations, [])
  assert.deepEqual(page.snapshot(), { ...light, stored: 'auto' })
})
