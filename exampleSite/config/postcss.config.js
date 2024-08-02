const autoprefixer = require('autoprefixer')({})
const cssnano = require('cssnano')({
  preset: 'advanced'
})
const whitelister = require('purgecss-whitelister')
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./hugo_stats.json'],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])]
  },
  dynamicAttributes: ['data-bs-theme'],
  safelist: [
    ...whitelister([
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_clipboard.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_command.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_nav.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_navbar.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_search.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_syntax.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_syntax-dark.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_syntax-light.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_table.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/components/_video.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/theme/fonts.scss',
      './_vendor/github.com/gethinode/hinode/assets/scss/theme/theme.scss',
      './_vendor/github.com/gethinode/mod-flexsearch/v2/assets/scss/modules/flexsearch/flexsearch.scss',
      './_vendor/github.com/gethinode/mod-katex/dist/katex.scss',
      './_vendor/github.com/gethinode/mod-leaflet/dist/leaflet.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_carousel.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_dropdown.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_modal.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_reboot.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_tooltip.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_transitions.scss',
      './_vendor/github.com/twbs/bootstrap/scss/_utilities.scss'
    ])
  ]
})

module.exports = {
  plugins: [
    autoprefixer,
    cssnano,
    purgecss
  ]
}
