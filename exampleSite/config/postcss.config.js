// The exampleSite reuses the theme's PostCSS pipeline verbatim to avoid config drift.
// `content: ['./hugo_stats.json']` inside it stays cwd-relative, so it resolves to the
// exampleSite's own stats file when Hugo runs PostCSS with the exampleSite as the site root.
// NOTE: Hugo runs PostCSS's Node process under its permission model
// (`security.node.permissions.allowread`), which defaults to the site dir only. Reading this
// shared config lives one level up, so the exampleSite widens allowread to '../config' in
// config/_default/hugo.toml. A normal site keeps a self-contained config and needs no change.
module.exports = require('../../config/postcss.config.js')
