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
  safelist: [
    ...whitelister([
      './assets/scss/components/_clipboard.scss',
      './assets/scss/components/_command.scss',
      './assets/scss/components/_fonts.scss',
      './assets/scss/components/_search.scss',
      './assets/scss/components/_syntax.scss',
      './assets/scss/components/_syntax-dark.scss',
      './assets/scss/components/_syntax-light.scss',
      './node_modules/bootstrap/scss/_carousel.scss',
      './node_modules/bootstrap/scss/_dropdown.scss',
      './node_modules/bootstrap/scss/_reboot.scss',
      './node_modules/bootstrap/scss/_tooltip.scss',
      './node_modules/bootstrap/scss/_transitions.scss',
      './node_modules/bootstrap/scss/_utilities.scss'
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
