const autoprefixer = require('autoprefixer')({})
const cssnano = require('cssnano')({
  preset: 'advanced'
})
const whitelister = require('purgecss-whitelister')
const purgeImport = require('@fullhuman/postcss-purgecss')
const purgeCSSPlugin = purgeImport.purgeCSSPlugin || purgeImport.default || purgeImport
const purgecss = purgeCSSPlugin({
  content: ['./hugo_stats.json'],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])]
  },
  dynamicAttributes: ['data-bs-theme', 'data-bs-theme-animate'],
  safelist: ['was-validated',
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
      './assets/scss/components/_video.scss',
      './assets/scss/theme/fonts.scss',
      './assets/scss/theme/theme.scss',
      './_vendor/github.com/gethinode/mod-cookieyes/v2/assets/scss/cookieyes.scss',
      './_vendor/github.com/gethinode/mod-flexsearch/v2/assets/scss/modules/flexsearch/flexsearch.scss',
      './_vendor/github.com/gethinode/mod-katex/dist/katex.scss',
      './_vendor/github.com/gethinode/mod-leaflet/dist/leaflet.scss',
      './_vendor/github.com/gethinode/mod-simple-datatables/dist/simple-datatables.scss',
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
