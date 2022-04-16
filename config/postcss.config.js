const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
const whitelister = require('purgecss-whitelister');

module.exports = {
  plugins: [
    autoprefixer(),
    purgecss({
      content: [
        './layouts/**/*.html',
        './content/**/*.md',
      ],
      safelist: [
        /lazyloaded/,
        /table/,
        /thead/,
        /tbody/,
        /tr/,
        /th/,
        /td/,
        /h5/,
        /alert-link/,
        /container-xxl/,
        /container-fluid/,
        /^bg-opacity-\d+/,
        /svg.*/, 
        /fa.*/,
        /ratio.*/,
        /suggestion.*/,
      ...whitelister([
          './assets/scss/components/_blockquote.scss',
          './assets/scss/components/_buttons.scss',
          './assets/scss/components/_card.scss',
          './assets/scss/components/_clipboard.scss',
          './assets/scss/components/_img.scss',
          './assets/scss/components/_navbar.scss',
          './assets/scss/components/_search.scss',
          './assets/scss/components/_syntax.scss',
          './assets/scss/layouts/_reboot.scss',
          './assets/scss/layouts/type.scss',
          './node_modules/bootstrap/scss/_dropdown.scss',
          './node_modules/bootstrap/scss/_utilities.scss',
        ]),
      ],
    }),
  ],
}
