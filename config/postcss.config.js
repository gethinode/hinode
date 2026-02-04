const autoprefixer = require('autoprefixer')({})
const cssnano = require('cssnano')({
  preset: ['advanced', {
    discardUnused: {
      fontFace: false  // Preserve all @font-face declarations
    }
  }]
})
const purgeImport = require('@fullhuman/postcss-purgecss')
const purgeCSSPlugin = purgeImport.purgeCSSPlugin || purgeImport.default || purgeImport
const purgecss = purgeCSSPlugin({
  content: ['./hugo_stats.json'],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])]
  },
  dynamicAttributes: ['data-bs-theme', 'data-bs-theme-animate'],
  fontFace: false,
  safelist: {
    standard: [
      // Bootstrap form validation
      'was-validated',
      // Bootstrap dynamic states
      'show',
      'showing',
      'hiding',
      'active',
      'disabled',
      'collapsed',
      'collapsing'
    ],
    // Classes with these patterns will be preserved along with their children
    deep: [
      // Bootstrap components that get dynamically modified
      /modal/,
      /dropdown/,
      /carousel/,
      /tooltip/,
      /popover/,
      /collapse/,
      /offcanvas/
    ],
    // Preserve any selector containing these patterns
    greedy: [
      // Third-party library prefixes (well-namespaced, safe to use greedy)
      /^fa-/,              // FontAwesome
      /^leaflet-/,         // Leaflet maps
      /^katex-/,           // KaTeX math (note: using katex- not just katex)
      /^mermaid/,          // Mermaid diagrams
      /^datatable/i,       // SimpleDatatables
      /^cky-/,             // CookieYes

      // Component-specific prefixes
      /clipboard-/,        // Clipboard component
      /command-/,          // Command component
      /search-/,           // Search functionality
      /suggestion__/,      // Search suggestions (FlexSearch)
      /testimonial-/,      // Testimonial component

      // Syntax highlighting (multiple possible engines)
      /^hljs-/,            // highlight.js
      /^language-/,        // Prism/generic
      /^chroma-/,          // Chroma (Hugo's highlighter)
      /^highlight/,        // Generic highlighting classes

      // Pagination and navigation
      /page-item/,
      /page-link/,
      /nav-item/,
      /nav-link/,
      /navbar-/,
      /^nav-/,             // Nav variant classes (nav-callout, nav-panel, nav-pills, nav-tabs, nav-underline)

      // Bootstrap transitions and utilities that get added via JS
      /fade/,
      /^translate/         // Bootstrap utilities
    ]
  }
})

module.exports = {
  plugins: [
    autoprefixer,
    cssnano,
    purgecss
  ]
}
