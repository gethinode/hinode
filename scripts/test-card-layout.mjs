import assert from 'node:assert/strict'
import path from 'node:path'
import { chromium } from 'playwright'

const bandNames = ['media', 'title', 'subtitle', 'highlight', 'body', 'footer']
const tolerance = 1

export async function verifyCardLayout (publicDir) {
  const origin = 'https://hinode.test'
  const browser = await chromium.launch()
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false })
    // Load the production HTML and fingerprinted CSS from the build in isolation.
    await page.route('**/*', async route => {
      const url = new URL(route.request().url())
      if (url.origin !== origin) return route.abort()
      const filename = path.join(publicDir, url.pathname, url.pathname.endsWith('/') ? 'index.html' : '')
      await route.fulfill({ path: filename }).catch(() => route.abort())
    })

    for (const example of ['/en/docs/components/card-group/', '/en/docs/blocks/cards/']) {
      const response = await page.goto(origin + example, { timeout: 20000 })
      assert.equal(response?.status(), 200, `could not load ${example} from the example build`)
      await page.evaluate(async () => { await document.fonts.ready })
      const groups = await page.locator('.card-group-align-rows:visible').evaluateAll(groups => {
        function bounds (element) {
          const { left, right, top, bottom } = element.getBoundingClientRect()
          return { left, right, top, bottom }
        }
        return groups.map(group => [...group.querySelectorAll('.card.card-align-rows')].map(card => ({
          ...bounds(card),
          rows: getComputedStyle(card).gridTemplateRows,
          bands: [...card.children].filter(child => child.classList.contains('card-band')).map(band => ({
            ...bounds(band),
            name: [...band.classList].find(name => name.startsWith('card-band-'))
          }))
        })))
      })

      assert.ok(groups.length > 0, `${example}: no visible aligned card groups`)
      let varies = false
      for (const [index, cards] of groups.entries()) {
        const label = `${example} group ${index + 1}`
        assert.ok(cards.length >= 2, `${label}: expected at least two aligned cards`)
        const first = cards[0]
        for (const [column, card] of cards.entries()) {
          assert.ok(card.right > card.left && card.bottom > card.top, `${label}: card ${column + 1} is empty`)
          assert.ok(Math.abs(card.top - first.top) <= tolerance && Math.abs(card.bottom - first.bottom) <= tolerance,
            `${label}: cards do not share one visual row`)
          if (column > 0) assert.ok(card.left >= cards[column - 1].right - tolerance, `${label}: cards overlap`)
          assert.deepEqual(card.bands.map(band => band.name), bandNames.map(name => `card-band-${name}`),
            `${label}: expected six card bands in order`)
        }

        let previousBottom = first.top
        for (const [bandIndex, name] of bandNames.entries()) {
          const bands = cards.map(card => card.bands[bandIndex])
          const start = bands[0].top
          assert.ok(bands.every(band => Math.abs(band.top - start) <= tolerance),
            `${label}: ${name} bands do not line up`)
          assert.ok(start >= previousBottom - tolerance, `${label}: ${name} overlaps the previous band`)
          previousBottom = Math.max(...bands.map(band => band.bottom))
          if (name === 'body') varies ||= bands.some(band => Math.abs(band.bottom - bands[0].bottom) > tolerance)
        }

        for (const card of cards) {
          // Chromium reports the resolved subgrid lines, including both ends of the span.
          assert.ok(card.rows.startsWith('subgrid ') && card.rows.match(/\[/g)?.length === bandNames.length + 1,
            `${label}: expected six computed subgrid tracks, got ${card.rows}`)
        }
      }
      assert.ok(varies, `${example}: expected a group with unequal body heights`)
      console.log(`PASS six-band card layout in ${example} (${groups.length} visible groups)`)
    }
  } finally {
    await browser.close()
  }
}
