const purgeImport = require('@fullhuman/postcss-purgecss')
const purgeCSSPlugin = purgeImport.purgeCSSPlugin || purgeImport.default || purgeImport
const purgecss = purgeCSSPlugin({
  content: ['./hugo_stats.json'],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])]
  },
  dynamicAttributes: ['aria-expanded', 'data-bs-theme', 'data-bs-main-theme', 'data-bs-theme-animate', 'data-transparent', 'role'],
  fontFace: false,
  safelist: {
    // Every entry below is a class PurgeCSS cannot see in hugo_stats.json because it is
    // added by JavaScript at runtime (or by a third-party library). Classes that Hugo DOES
    // emit into the markup — and therefore into hugo_stats.json — are intentionally NOT
    // listed: purge now always runs against complete, current stats (production
    // post-process; dev does not purge), so they survive on their own. In particular the
    // former `/^d-(sm|md|lg|xl|xxl)-table-cell$/` entry is gone — render-table.html emits
    // the configured breakpoint's class into the markup, so it reaches the stats naturally.
    standard: [
      // Bootstrap form validation — added by JS on submit, never in the source markup
      'was-validated',
      // Bootstrap component state classes toggled by JS (modal/dropdown/collapse/etc.)
      'show',
      'showing',
      'hiding',
      'active',
      'disabled',
      'collapsed',
      'collapsing',
      // SimpleDatatables modifier classes (set by the datatables JS)
      'no-header',
      'no-footer',
      // SimpleDatatables table rendering classes (added by JS)
      'th-inner',
      'sortable',
      'sortable-center',
      'both',
      'desc',
      'asc',
      // Hinode wrapped tables: on a DATA table, `table-wrap` / `table-border-bottom-wrap`
      // are applied in the browser by SimpleDatatables' tableRender hook, so on a site whose
      // only wrapped tables are data tables they never reach hugo_stats.json and would
      // otherwise be purged.
      'table-wrap',
      'table-border-bottom-wrap',
      // `d-none` is also applied by that hook; kept to record the wrap's dependency on it
      // (a dozen core layouts emit it too, so in practice it is always in the stats).
      'd-none',
      // SimpleDatatables search component
      'search-data-table',
      'search-input',
      // Bootstrap utilities used by SimpleDatatables
      'float-right',
      'float-left'
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
      /offcanvas/,
      // SimpleDatatables - preserve structure and all nested elements
      /datatable/,
      // Bootstrap form controls (used by SimpleDatatables)
      /form-select/,
      /form-control/,
      // Bootstrap button groups (used by SimpleDatatables search)
      /btn-group/,
      // Bootstrap responsive tables (used by list component)
      /table-responsive/,
      // Syntax highlighting - preserve Chroma classes and descendants
      /chroma/,
      /syntax-highlight/,
      /codeblock/
    ],
    // Preserve any selector containing these patterns
    greedy: [
      // Third-party library prefixes (well-namespaced, safe to use greedy)
      /^fa-/,              // FontAwesome
      /^leaflet-/,         // Leaflet maps
      /^katex-/,           // KaTeX math (note: using katex- not just katex)
      /^mermaid/,          // Mermaid diagrams
      /datatable/,         // SimpleDatatables (all variants: datatable-*, *-datatable, etc.)
      /^cky-/,             // CookieYes

      // Component-specific prefixes
      /clipboard-/,        // Clipboard component
      /command-/,          // Command component
      /search-/,           // Search functionality (includes search-input, search-data-table)
      /suggestion__/,      // Search suggestions (FlexSearch)
      /testimonial-/,      // Testimonial component
      /preview-/,          // Preview component (mod-blocks)

      // Syntax highlighting - third-party engines (Chroma handled in deep)
      /^hljs-/,            // highlight.js
      /^language-/,        // Prism/generic

      // Pagination and navigation
      /page-item/,
      /page-link/,
      /pagination/,        // Bootstrap pagination classes
      /nav-item/,
      /nav-link/,
      /navbar-/,
      /^nav-/,             // Nav variant classes (nav-callout, nav-panel, nav-pills, nav-tabs, nav-underline)

      // Bootstrap responsive tables
      /table-responsive/,  // All table-responsive-* variants and attribute selectors

      // Color mode toggle - d-none-* and d-none-inline-* (logo modes, navbar mode switcher,
      // [data-bs-main-theme="dark"] compound selectors)
      /^d-none-/,

      // Bootstrap transitions and utilities that get added via JS
      /fade/,
      /^translate/         // Bootstrap utilities
    ]
  }
})
const autoprefixer = require('autoprefixer')({})
const cssnano = require('cssnano')({
  // Default preset: structural minification (rule/declaration merging) that Hugo's own
  // minify does not do. The `advanced` preset was measured to add < 0.2% over `default`,
  // so it — and the cssnano-preset-advanced dependency — was dropped.
  preset: 'default'
})

module.exports = {
  // Order matters: purge first (drop unused rules) so autoprefixer and cssnano only work
  // on what ships; cssnano last so it minifies the already-prefixed output.
  plugins: [
    purgecss,
    autoprefixer,
    cssnano
  ]
}
