import assert from 'node:assert/strict'
import path from 'node:path'
import { chromium } from 'playwright'

async function verifyVisibleFocus (control, label) {
  await control.focus()
  const { focused, ring, clippedBy } = await control.evaluate(async element => {
    await Promise.allSettled(element.getAnimations().map(animation => animation.finished))
    const style = getComputedStyle(element)
    const shadow = Number(style.boxShadow.match(/ ([\d.]+)px$/)?.[1] ?? 0)
    const outline = style.outlineStyle === 'none' ? 0 : parseFloat(style.outlineWidth) + parseFloat(style.outlineOffset)
    const ring = Math.max(shadow, outline)
    const control = element.getBoundingClientRect()
    const clippedBy = []
    for (let ancestor = element.parentElement; ancestor; ancestor = ancestor.parentElement) {
      if (ancestor === document.scrollingElement) continue
      const { overflowX, overflowY } = getComputedStyle(ancestor)
      const bounds = ancestor.getBoundingClientRect()
      const clipsHorizontally = overflowX !== 'visible' && (control.left - ring < bounds.left || control.right + ring > bounds.right)
      const clipsVertically = overflowY !== 'visible' && (control.top - ring < bounds.top || control.bottom + ring > bounds.bottom)
      if (clipsHorizontally || clipsVertically) clippedBy.push(ancestor.className || ancestor.localName)
    }
    return { focused: element === document.activeElement && element.matches(':focus-visible'), ring, clippedBy }
  })
  assert.ok(focused && ring > 0, `${label}: control has no visible focus ring`)
  assert.deepEqual(clippedBy, [], `${label}: focus ring crosses an overflow ancestor`)
}

export async function verifyTableFooter (publicDir, browserType = chromium) {
  const origin = 'https://hinode.test'
  const browser = await browserType.launch()
  try {
    for (const width of [390, 1400]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } })
      page.setDefaultTimeout(5000)
      await page.route('**/*', route => {
        const url = new URL(route.request().url())
        if (url.origin !== origin) return route.abort()
        const filename = path.join(publicDir, url.pathname, url.pathname.endsWith('/') ? 'index.html' : '')
        return route.fulfill({ path: filename }).catch(() => route.abort())
      })
      const response = await page.goto(origin + '/en/table-demo/')
      assert.equal(response?.status(), 200, 'could not load table demo from the production example')

      for (const mode of ['light', 'dark']) {
        await page.locator('html').evaluate((root, theme) => { root.dataset.bsTheme = theme }, mode)
        for (const [layout, fixture] of [['list', '.fixture-list-controls'], ['default', '.fixture-data']]) {
          const label = `${width}px ${mode} ${layout}`
          const wrapper = page.locator('.datatable-wrapper').filter({ has: page.locator(fixture) })
          const footer = wrapper.locator(':scope > .datatable-bottom')
          const { list, top, rem } = await footer.evaluate(element => ({
            list: element.parentElement.classList.contains('datatable-list'),
            top: parseFloat(getComputedStyle(element).paddingTop),
            rem: parseFloat(getComputedStyle(document.documentElement).fontSize)
          }))
          assert.equal(list, layout === 'list', `${label}: unexpected data table layout`)
          assert.equal(top, list ? rem : 0, `${label}: incorrect footer top padding`)

          if (list) {
            const select = footer.locator('select')
            const gap = await select.evaluate(element => {
              const table = element.closest('.datatable-wrapper').querySelector('.datatable-container')
              return element.getBoundingClientRect().top - table.getBoundingClientRect().bottom
            })
            assert.ok(gap >= rem, `${label}: the page-size control sits too close to the table`)
            await verifyVisibleFocus(select, `${label} page size`)
          } else {
            // The module's manual initialization API lets a caller customize the wrapper class.
            const customTop = await footer.evaluate(element => {
              const wrapper = element.parentElement
              wrapper.classList.replace('datatable-wrapper', 'custom-wrapper')
              try {
                return getComputedStyle(element).paddingTop
              } finally {
                wrapper.classList.replace('custom-wrapper', 'datatable-wrapper')
              }
            })
            assert.equal(customTop, '0px', `${label}: a custom wrapper changed the default padding`)
            await verifyVisibleFocus(wrapper.locator('.datatable-top select'), `${label} page size`)
          }
          const pageTwo = footer.locator('.page-link[data-page="2"]:visible').first()
          await verifyVisibleFocus(pageTwo, `${label} page two`)
        }
      }
      await page.close()
    }
  } finally {
    await browser.close()
  }
  console.log('PASS list and default data table footer spacing and focus')
}
