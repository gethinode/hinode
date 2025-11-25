# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Hinode is a Hugo theme for documentation and blog sites built on Bootstrap 5. It uses Hugo's module system to manage dependencies and includes Bookshop for component-based development. The theme is designed for performance, security (with CSP headers), and SEO.

## Common Development Commands

### Development Server

```bash
npm start                    # Start Hugo server with module vendoring
npm run start:example        # Start server using exampleSite
npm run start:prod          # Start server in production mode
npm run start:example:prod  # Start exampleSite in production mode
```

### Building

```bash
npm run build               # Build site with minification
npm run build:example       # Build exampleSite
npm run build:debug         # Build with debug output
npm run build:headers       # Generate Netlify/server headers
```

### Linting & Testing

```bash
npm test                    # Run all linters
npm run lint                # Run all linters
npm run lint:scripts        # ESLint for JavaScript (assets/js)
npm run lint:styles         # Stylelint for SCSS
npm run lint:markdown       # Markdownlint for Markdown files
```

### Module Management

```bash
npm run mod:vendor          # Vendor Hugo modules to _vendor/
npm run mod:update          # Update all Hugo modules
npm run mod:tidy            # Clean up unused module dependencies
npm run mod:clean           # Remove module cache
```

### Maintenance

```bash
npm run clean:public        # Remove generated public/ directories
npm run clean:install       # Remove node_modules and package-lock.json
npm run upgrade             # Update npm and Hugo module dependencies
```

## Architecture

### Hugo Module System

The theme uses Hugo's module system extensively. All modules are vendored to `_vendor/` for reproducible builds. Key modules include:

- `mod-bootstrap` - Bootstrap 5 framework
- `mod-flexsearch` - Full-text search functionality
- `mod-fontawesome` - Icon support
- `mod-utils` - Utility functions and helpers
- `mod-katex`, `mod-mermaid`, `mod-leaflet`, `mod-lottie` - Optional feature modules
- `cloudcannon/bookshop` - Component library system

Module configuration is in `config/_default/hugo.toml` under `[module.imports]`. Always run `npm run mod:vendor` after module changes.

### Component Library (Bookshop)

Components live in `component-library/components/`. Each component has:

- `*.hugo.html` - Hugo template
- `*.scss` - Component styles
- `*.bookshop.yml` - Schema definition

Components are mounted to multiple locations via `hugo.toml`:

- `layouts/partials/bookshop/` - Templates
- `data/structures/` - Schemas
- `assets/scss/modules/bookshop/` - Styles

### Directory Structure

- `layouts/` - Theme templates and shortcodes
  - `baseof.html` - Base template with navbar, footer, and content blocks
  - `_partials/` - Reusable template components
  - `_shortcodes/` - Hugo shortcodes for content (accordion, alert, card, etc.)
- `assets/` - Source assets (JS, SCSS, images, icons)
  - `scss/` - Organized into components/, layouts/, theme/, helpers/
  - `js/` - JavaScript modules
- `config/` - Hugo configuration
  - `_default/hugo.toml` - Main config with module imports
  - `postcss.config.js` - PostCSS with PurgeCSS and autoprefixer
- `content/` - Theme content (minimal, main content in exampleSite)
- `data/` - Data files for theme configuration
- `i18n/` - Translation files (en, nl, fr, de, pl, pt-br, zh-hans, zh-hant)
- `exampleSite/` - Full example site for testing theme
- `static/` - Static assets copied directly to output

### CSS Pipeline

CSS uses PostCSS with:

1. **Autoprefixer** - Adds vendor prefixes
2. **cssnano** - Minification
3. **PurgeCSS** - Removes unused CSS based on `hugo_stats.json`

PurgeCSS safelist is defined in `config/postcss.config.js`. When adding new dynamic classes or Bootstrap components, update the safelist to prevent removal.

### Version Management

The theme supports versioned documentation with sidebar menus per version. Version detection happens in `baseof.html` using `utilities/GetVersion.html` partial.

### Shortcodes System

Extensive shortcode library in `layouts/_shortcodes/` provides Bootstrap components accessible in Markdown:

- Layout: accordion, card, carousel, collapse, navbar, tabs
- UI: alert, badge, button, spinner, toast, tooltip
- Content: image, video, table, timeline
- Typography: abbr, kbd, mark, sub, sup

### Content Security Policy

CSP headers are auto-generated via Hugo's segments feature. The theme includes `mod-csp` for Content Security Policy management. Headers are defined in `netlify.toml` and generated via `npm run build:headers`.

### Internationalization

Multi-language support with translations in `i18n/`. Default language is English (`en-us`). Language configuration in `config/_default/hugo.toml`.

## Key Configuration Files

- `hugo.toml` - Main Hugo config with modules, mounts, build settings
- `package.json` - npm scripts and dependencies
- `go.mod` - Hugo module dependencies (Go modules)
- `postcss.config.js` - PostCSS pipeline with PurgeCSS safelist
- `netlify.toml` - Netlify build config and security headers
- `.eslintrc.yml` - JavaScript linting (ES6, browser environment)
- `.stylelintrc.json` - SCSS linting (standard-scss)
- `.markdownlint-cli2.jsonc` - Markdown linting rules

## Important Development Notes

### When Modifying Components

1. Components in `component-library/` need three files: `.hugo.html`, `.scss`, `.bookshop.yml`
2. Update PurgeCSS safelist in `config/postcss.config.js` if adding dynamic classes
3. Component styles are automatically mounted via `hugo.toml` module mounts

### When Adding Hugo Modules

1. Add to `go.mod` requires section
2. Add to `[module.imports]` in `hugo.toml`
3. Run `npm run mod:vendor` to vendor the module
4. If module has styles, add to PurgeCSS safelist in `postcss.config.js`

### When Working with Layouts

- `baseof.html` is the main template; it sets up version-aware menus, content blocks, overlay mode
- Partials in `_partials/` are organized: `head/`, `footer/`, `page/`, `utilities/`, `assets/`
- The theme uses `.Scratch` extensively for passing data between partials

### Build Process

1. `hugo mod vendor` - Vendors modules to `_vendor/`
2. Hugo build generates `hugo_stats.json` with used classes/tags/ids
3. PostCSS processes SCSS, using `hugo_stats.json` to purge unused CSS
4. Final output in `public/` or `exampleSite/public/`

### Testing Changes

Test with both main site and exampleSite:

- `npm start` - Test theme directly
- `npm run start:example` - Test with full example content
- `npm run lint` - Check code quality before committing

### Git Workflow

- Main branch: `main` (production releases)
- Development branch: `develop`
- Uses semantic-release for automated versioning
- Commits follow conventional commits (enforced by commitlint)
- Husky pre-commit hooks run linters
