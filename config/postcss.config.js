const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
// const purgecss = require('@fullhuman/postcss-purgecss')

module.exports = {
  plugins: [
    autoprefixer(),
    cssnano({
      preset: 'advanced'
    })
    // purgecss({
    //   content: [
    //     './layouts/**/*.html',
    //     './content/**/*.md'
    //   ]
    // })
  ]
}
