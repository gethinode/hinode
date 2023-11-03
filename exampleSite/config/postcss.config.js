const autoprefixer = require('autoprefixer')({})
const cssnano = require('cssnano')({
  preset: 'advanced'
})
const whitelister = require('purgecss-whitelister')
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./exampleSite/hugo_stats.json'],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])]
  },
  dynamicAttributes: ['data-bs-theme'],
  safelist: [
    ...whitelister([
      './assets/scss/components/_clipboard.scss',
      './assets/scss/components/_command.scss',
      './assets/scss/components/_nav.scss',
      './assets/scss/components/_navbar.scss',
      './assets/scss/components/_search.scss',
      './assets/scss/components/_syntax.scss',
      './assets/scss/components/_syntax-dark.scss',
      './assets/scss/components/_syntax-light.scss',
      './assets/scss/components/_table.scss',
      './assets/scss/theme/fonts.scss',
      './assets/scss/theme/theme.scss',
      './_vendor/github.com/gethinode/mod-flexsearch/assets/scss/modules/flexsearch/flexsearch.scss',
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
