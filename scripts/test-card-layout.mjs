import assert from 'node:assert/strict'
import path from 'node:path'
import { chromium } from 'playwright'

const bandNames = ['media', 'title', 'subtitle', 'highlight', 'body', 'footer']
const tolerance = 1

async function readLinkColors (card) {
  return card.evaluate(element => [
    '.card-title',
    '.card-text-subtitle',
    '.card-text-highlight'
  ].map(selector => getComputedStyle(element.querySelector(selector)).color))
}

async function verifyCardLinkColors (page, origin) {
  const example = '/en/card-hover-demo/'
  const response = await page.goto(origin + example, { timeout: 20000 })
  assert.equal(response?.status(), 200, `could not load ${example} from the example build`)
  const aligned = page.locator('.card.card-align-rows')
  const ordinary = page.locator('.card:not(.card-align-rows)')
  const heading = page.locator('#aligned-cards')
  const variants = ['Primary', 'Warning', 'Adaptive', 'Zoom', 'Plain']
  page.setDefaultTimeout(5000)
  await page.evaluate(async () => { await document.fonts.ready })

  for (const mode of ['light', 'dark']) {
    await page.locator('html').evaluate((root, theme) => { root.dataset.bsTheme = theme }, mode)
    for (const name of variants) {
      const title = page.getByText(name, { exact: true }).and(page.locator('.card-title'))
      const card = aligned.filter({ has: title })
      const control = ordinary.filter({ has: title })
      const label = `${mode} ${name}`
      const link = card.locator('a.stretched-link')
      const controlLink = control.locator('a.stretched-link')

      await heading.hover()
      const resting = await readLinkColors(card)
      assert.deepEqual(resting, await readLinkColors(control), `${label}: resting color mismatch`)

      await controlLink.hover()
      const hovered = await readLinkColors(control)
      assert.equal(hovered[0] !== resting[0], name !== 'Plain', `${label}: control hover did not exercise the expected state`)
      await link.hover()
      assert.deepEqual(await readLinkColors(card), hovered, `${label}: aligned hover colors`)

      await heading.hover()
      await controlLink.focus()
      const focused = await readLinkColors(control)
      assert.deepEqual(focused, hovered, `${label}: control focus colors`)
      await link.focus()
      assert.deepEqual(await readLinkColors(card), focused, `${label}: aligned focus colors`)
      await link.evaluate(element => element.blur())
      assert.deepEqual(await readLinkColors(card), resting, `${label}: resting colors after interaction`)
    }

    const unlinked = aligned.filter({ hasText: 'Unlinked' })
    const resting = await readLinkColors(unlinked)
    await unlinked.hover()
    assert.deepEqual(await readLinkColors(unlinked), resting, `${mode}: unlinked card changed colors`)
  }
  console.log('PASS aligned card link colors on hover and focus in light and dark mode')
}

async function decodeCardImage (card) {
  const image = card.locator('.card-img-wrap img')
  await image.scrollIntoViewIfNeeded()
  assert.ok(await image.evaluate(async img => {
    await img.decode()
    return img.naturalWidth > 0
  }), 'expected a decoded thumbnail')
}

async function verifyImageOnlyCardSpacing (page, origin) {
  const example = '/en/card-image-spacing-demo/'
  const response = await page.goto(origin + example, { timeout: 20000 })
  assert.equal(response?.status(), 200, `could not load ${example} from the example build`)

  const aligned = page.locator('.card.card-align-rows')
  const ordinary = page.locator('.card:not(.card-align-rows)')
  for (const [kind, cards] of [['aligned', aligned], ['ordinary', ordinary]]) {
    for (const name of ['About the example', 'Meet the team']) {
      const accessibleLink = page.getByRole('link', { name, exact: true })
        .and(page.locator('a.stretched-link'))
      const card = cards.filter({ has: accessibleLink })
      const link = card.locator('a.stretched-link')
      await decodeCardImage(card)
      const geometry = await card.evaluate(element => {
        const image = element.querySelector('.card-img-wrap img')
        const link = element.querySelector('a.stretched-link')
        const photo = image.getBoundingClientRect()
        const hit = document.elementFromPoint(photo.left + photo.width / 2, photo.top + photo.height / 2)
        const bottom = element.getBoundingClientRect().bottom - parseFloat(getComputedStyle(element).borderBottomWidth)
        const bands = [...element.querySelectorAll(':scope > .card-band')]
        return {
          gap: bottom - photo.bottom,
          imageHitsLink: hit?.closest('a') === link,
          titlePadding: parseFloat(getComputedStyle(link).paddingTop),
          emptyBands: bands.slice(1).map(band => band.getBoundingClientRect().height),
          bandPadding: bands.map(band => ['top', 'right', 'bottom', 'left']
            .map(side => parseFloat(getComputedStyle(band).getPropertyValue(`padding-${side}`))))
        }
      })

      const label = `${kind} ${name}`
      assert.ok(Math.abs(geometry.gap) <= tolerance, `${label}: ${geometry.gap}px gap below the image`)
      assert.ok(geometry.imageHitsLink, `${label}: image center does not hit the stretched link`)
      if (kind === 'aligned') {
        assert.equal(geometry.titlePadding, 0, `${label}: image-only link padding`)
        assert.deepEqual(geometry.emptyBands, [0, 0, 0, 0, 0], `${label}: empty band heights`)
        assert.ok(geometry.bandPadding.flat().every(padding => padding === 0), `${label}: image-only band padding`)
      }
      await link.focus()
      assert.ok(await link.evaluate(element => element === document.activeElement), `${label}: image link cannot receive focus`)
      if (kind === 'aligned') {
        const outline = await link.evaluate(element => {
          const style = getComputedStyle(element, '::after')
          return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) > 0
        })
        assert.ok(outline, `${label}: keyboard focus outline does not cover the image link`)
      }
      await link.evaluate(element => element.blur())
    }
  }

  const caption = page.getByRole('link', { name: /About Hinode/ }).and(page.locator('a.stretched-link'))
  const alignedCaption = aligned.filter({ has: caption })
  const ordinaryCaption = ordinary.filter({ has: caption })
  const bodyPadding = await ordinaryCaption.locator(':scope > .card-body').evaluate(element =>
    parseFloat(getComputedStyle(element).paddingTop))
  const linkPadding = await ordinaryCaption.locator('a.stretched-link').evaluate(element =>
    parseFloat(getComputedStyle(element).paddingTop))
  assert.ok(bodyPadding > 0 && linkPadding > 0, 'ordinary thumbnail card lost title spacing')
  await decodeCardImage(alignedCaption)
  const spacing = await alignedCaption.evaluate(element => {
    const title = getComputedStyle(element.querySelector('.card-band-title'))
    const link = getComputedStyle(element.querySelector('.card-band-title a'))
    const body = getComputedStyle(element.querySelector('.card-band-body'))
    return [title.paddingTop, title.paddingLeft, link.paddingTop, body.paddingBottom].map(parseFloat)
  })
  assert.deepEqual(spacing, [bodyPadding, bodyPadding, linkPadding, bodyPadding], 'aligned thumbnail card lost text padding')
  console.log('PASS image-only cards are full bleed and thumbnail cards with text retain their spacing')
}

async function verifyCardGroupCounts (page, origin) {
  const example = '/en/card-group-count-demo/'
  const response = await page.goto(origin + example, { timeout: 20000 })
  assert.equal(response?.status(), 200, `could not load ${example} from the example build`)

  assert.equal(await page.locator('#empty-group').count(), 1, 'expected the empty group fixture')
  assert.equal(await page.locator('.empty-card-group-demo').count(), 0, 'empty group rendered a wrapper')

  for (const [name, titles, aligned] of [
    ['single-card-group-demo', ['Alpha'], false],
    ['aligned-single-card-group-demo', ['Bravo'], true],
    ['multi-card-group-demo', ['Charlie', 'Delta'], true]
  ]) {
    const group = page.locator(`.${name}`)
    const cards = group.locator('.card')
    assert.equal(await group.count(), 1, `${name}: expected one group wrapper`)
    assert.equal(await cards.count(), titles.length, `${name}: unexpected card count`)
    const renderedTitles = (await cards.locator('.card-title').allTextContents()).map(title => title.trim())
    assert.deepEqual(renderedTitles, titles, `${name}: titles or order changed`)
    assert.equal(await group.locator('.card-group-align-rows').count(), Number(aligned), `${name}: unexpected alignment`)
    if (aligned) {
      assert.equal(await cards.locator(':scope > .card-band').count(), 6 * titles.length, `${name}: expected six bands per card`)
    }
    if (titles.length === 1) {
      const { gutter, left, right } = await group.evaluate(element => {
        const frame = element.getBoundingClientRect()
        const card = element.querySelector('.card').getBoundingClientRect()
        return {
          gutter: getComputedStyle(element.firstElementChild).getPropertyValue('--bs-gutter-x').trim(),
          left: card.left - frame.left,
          right: frame.right - card.right
        }
      })
      assert.ok(gutter, `${name}: gutter styles did not load`)
      assert.ok(Math.abs(left) <= tolerance && Math.abs(right) <= tolerance,
        `${name}: card extends beyond the group edges (left ${left}px, right ${right}px)`)
      assert.equal(await cards.getByRole('link', { name: new RegExp(titles[0]) }).count(), 1, `${name}: missing title link`)
      assert.deepEqual(await cards.locator('.card-text strong').allTextContents(), ['formatted text'],
        `${name}: nested card Markdown was not rendered as HTML`)
    }
  }
  console.log('PASS empty, single and multiple nested card groups render as expected')
}

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
    await verifyCardLinkColors(page, origin)
    await verifyImageOnlyCardSpacing(page, origin)
    await verifyCardGroupCounts(page, origin)
  } finally {
    await browser.close()
  }
}
