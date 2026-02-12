# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Hinode is a Hugo theme for documentation and blog sites built on Bootstrap 5. It uses Hugo's module system to manage dependencies. The theme is designed for performance, security (with CSP headers), and SEO.

**Version 2 (templatev2 branch)** is a minimal core theme. Optional extensions like mod-blocks add features like pre-built Bookshop components for page building.

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

**Core modules (always loaded):**

- `mod-bootstrap` - Bootstrap 5 framework
- `mod-utils` - Utility functions and helpers (GetPadding, GetBreakpoint, LogWarn, InitArgs, etc.)
- `mod-flexsearch` - Full-text search functionality
- `mod-fontawesome` - Icon support

**Optional modules:**

- `mod-blocks` - Pre-built Bookshop blocks for page building (NOT loaded by default in v2)
- `mod-katex`, `mod-mermaid`, `mod-leaflet`, `mod-lottie` - Feature modules

Module configuration is in `config/_default/hugo.toml` under `[module.imports]`. Always run `npm run mod:vendor` after module changes.

### Partial Ownership (v2 Architecture)

**Hinode owns (core partials):**

- `assets/card-group.html`, `assets/nav.html`, `assets/video.html`, `assets/table.html`, `assets/timeline.html` - Used by Hinode shortcodes
- `assets/live-image.html`, `assets/live-pages.html` - Used by Hinode templates
- `assets/section-title.html` - Section heading utility (used by Hinode pages and mod-blocks components)
- All `mod-utils` utilities (GetPadding, GetBreakpoint, LogWarn, InitArgs, etc.)

**mod-blocks owns (block-specific partials - moved in v2):**

- `assets/hero.html`, `assets/contact.html`, `assets/faq.html`, `assets/testimonial-carousel.html`, `assets/menu.html`
- `utilities/section.html` - Wraps all block components
- `page/contact.html` - Contact page template

**Dependency flow:**

```text
Hinode v2 (core theme)
  ├── mod-utils (GetPadding, LogWarn, etc.)
  ├── Shared partials (card-group, video, table, section-title, etc.)
  └── Does NOT import mod-blocks by default

mod-blocks v1.1+ (optional extension)
  ├── 16 Bookshop components
  ├── Block-specific partials (7 files)
  └── Depends on Hinode v2 (inherits section-title from Hinode)
```

### Component Library (Bookshop) - Optional via mod-blocks

Bookshop components are provided by the optional **mod-blocks** module. When installed, components live in `component-library/components/`. Each component has:

- `*.hugo.html` - Hugo template
- `*.scss` - Component styles
- `*.bookshop.yml` - Schema definition

Components are mounted to multiple locations via `hugo.toml`:

- `layouts/partials/bookshop/` - Templates
- `data/structures/` - Schemas
- `assets/scss/modules/bookshop/` - Styles

#### Bookshop Component Architecture

Bookshop components follow a two-layer architecture:

**1. Component partial** (e.g., `layouts/partials/assets/preview.html`):

- Contains the core component logic and rendering
- Uses **component-specific arguments** (e.g., `url`, `device`, `heading` for preview)
- These arguments should be defined in the component's structure file

**2. Bookshop wrapper** (e.g., `component-library/components/preview/preview.hugo.html`):

- Calls the component partial with component-specific arguments
- Wraps output with `utilities/section.html` for section-level styling
- Passes **section arguments** to the wrapper (e.g., `id`, `background`, `width`, `justify`, `wrapper`, `fluid`, `theme`, `cover`, `overlay-mode`, `section-class`, `bg-class`)

**Important distinctions:**

- **Section arguments are NOT part of the component partial** - they're handled by the section wrapper
- **Structure files should only include component-specific arguments** - arguments actively used by the partial
- **Section arguments are defined in Bookshop specs** (`.hugo.html` and `.bookshop.yml`) but not in the component's structure file
- Example: `preview.yml` defines `url`, `device`, `heading` (used by `preview.html`), but NOT `background`, `width`, etc. (only used by section wrapper)

**Example structure:**

```hugo
{{/* preview.hugo.html - Bookshop wrapper */}}
{{ $raw := partial "assets/preview.html" (dict
    "url"      .url       {{/* component-specific */}}
    "device"   .device    {{/* component-specific */}}
    "heading"  .heading   {{/* component-specific */}}
) }}

{{ partial "utilities/section.html" (dict
    "raw"            $raw
    "background"     .background     {{/* section argument */}}
    "width"          .width           {{/* section argument */}}
    "theme"          .theme           {{/* section argument */}}
    {{/* ... other section arguments ... */}}
)}}
```

### Version 2 Architecture Philosophy

**Design Goal:** Hinode v2 is a minimal core theme that works standalone for documentation and blog sites. Optional features are provided through separate modules.

**What's in Hinode v2 core:**

- Hugo templates for pages, lists, and singles
- Shortcode library (accordion, alert, card, carousel, etc.)
- Shared partials (section-title, card-group, video, table, timeline)
- Bootstrap 5 styling via mod-bootstrap
- Search via mod-flexsearch
- Icons via mod-fontawesome
- Core utilities via mod-utils

**What's optional (via modules):**

- **mod-blocks** - Pre-built Bookshop components for visual page building
- **mod-katex** - LaTeX math rendering
- **mod-mermaid** - Diagram rendering
- **mod-leaflet** - Interactive maps
- **mod-lottie** - Lottie animations

**Key architectural decisions:**

1. **No circular dependencies** - Hinode doesn't import mod-blocks; mod-blocks imports Hinode
2. **Clear ownership** - Block-specific partials (hero, contact, faq) live in mod-blocks; shared utilities (section-title, card-group) live in Hinode
3. **Module inheritance** - mod-blocks inherits Hinode's shared partials automatically
4. **Backwards compatibility** - Sites can still use mod-blocks by explicitly importing it

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

### Argument and Type Initialization System

Hinode uses `mod-utils` to provide a robust argument validation and initialization system
for shortcodes, partials, and Bookshop components.

**Key components:**

- `utilities/InitArgs.html` - Validates and initializes arguments with type checking and
  defaults
- `utilities/InitTypes.html` - Loads type definitions and merges structure-specific with
  global definitions
- `data/structures/_arguments.yml` - Global argument definitions (type, default, options,
  etc.)
- `data/structures/<name>.yml` - Structure-specific argument definitions for each shortcode
  or component

**How it works:**

1. **Structure definition inheritance:** Each shortcode/component has a structure file
   (e.g., `example.yml`) that defines its arguments. These definitions automatically
   inherit from the global `_arguments.yml` file.

2. **Automatic camelCase conversion:** Hyphenated argument names (e.g., `show-preview`)
   are automatically converted to camelCase (e.g., `showPreview`) for easier access in
   templates. Both versions are available: `$args.show-preview` and `$args.showPreview`.

3. **Default value application:** Arguments with `default` or `config` fields in their
   definition are automatically initialized with those values if not provided by the user.

4. **Type validation:** Arguments are validated against their declared types. The system
   automatically casts between compatible types (e.g., string `"true"` to boolean `true`).

5. **Deprecation warnings:** Deprecated arguments (marked with `deprecated` field) trigger
   warnings when used, guiding users to the preferred alternative.

**Structure definition format:**

Structure files follow the DRY principle with clear separation of concerns:

**Global definitions** (`mod-utils/data/structures/_arguments.yml`):

- `type` - Argument data type
- `default` - Default value (if applicable)
- `options` - Valid values for select types
- `comment` - Description of what the argument does

**Component-specific definitions** (`data/structures/<name>.yml`):

- `optional` - Whether argument is required or optional
- `deprecated` - Version when argument was deprecated (component-specific)
- `alternative` - Replacement argument when deprecated (component-specific)
- `release` - Version when argument was introduced (component-specific)

```yaml
# Component structure file (e.g., data/structures/preview.yml)
comment: >-
  Renders a live URL preview with switchable device views.
arguments:
  url:
    optional: false
    release: v1.0.0
  device:
    optional: true
    release: v1.0.0
  heading:
    optional: true
    release: v1.0.0
  old-param:
    optional: true
    deprecated: v1.1.0
    alternative: device
```

```yaml
# Global argument definitions (mod-utils/data/structures/_arguments.yml)
arguments:
  url:
    type: string
    comment: >-
      Address of the link destination, either a local reference or an external
      address. Include the `scheme` when referencing an external address.
  device:
    type: select
    default: desktop
    comment: >-
      Device view to display by default in preview component. Determines the
      initial iframe dimensions and active tab.
    options:
      values:
        - desktop
        - tablet
        - mobile
  heading:
    type: heading
    comment: >-
      Heading of the content block, including a preheading and content element.
```

**When to add to _arguments.yml:**

- New argument used by multiple components - add full type definition to global file
- Component-specific argument - can define inline in structure file (but prefer global for reusability)
- Override default or add options - define inline in structure file (inherits base type from global)

**Common pitfall - Boolean argument handling:**

When accessing boolean arguments that could be explicitly set to `false`, **DO NOT use the
`or` operator** for fallback logic:

```hugo
{{/* WRONG - or operator treats false as falsy and skips it */}}
{{- $showPreview := or $args.showPreview $args.show_preview }}

{{/* CORRECT - directly access the camelCase version */}}
{{- $showPreview := $args.showPreview }}
```

The `or` operator returns the first truthy value, so `or false <fallback>` will skip
`false` and return the fallback instead of honoring the explicit `false` value.

**Best practices:**

- Always use `InitArgs` at the start of shortcodes and partials to validate arguments
- Define structure files in `data/structures/` for all shortcodes and components
- **Structure files should only reference arguments by name** - type definitions go in `_arguments.yml`
- **Only include arguments actively used by the component partial** - section arguments (like `id`, `background`, `width`, `justify`, `wrapper`, `fluid`, `theme`, `cover`, `overlay-mode`, `section-class`, `bg-class`) are handled by the Bookshop section wrapper and should NOT be in the component's structure file
- Add new argument types to `mod-utils/data/structures/_arguments.yml` for reuse across components
- Mark `deprecated`, `alternative`, and `release` in **component structure files** (component-specific metadata)
- Use hyphenated names for new arguments (e.g., `show-preview` not `show_preview`)
- Access arguments via their camelCase versions (e.g., `$args.showPreview`)

**Example usage in a shortcode:**

```hugo
{{/* Initialize and validate arguments */}}
{{- $args := partial "utilities/InitArgs.html" (dict
    "structure" "example"
    "args" .Params
    "named" .IsNamedParams
    "group" "shortcode"
) -}}

{{/* Check for errors/warnings */}}
{{- if or $args.err $args.warnmsg -}}
    {{- partial (cond $args.err "utilities/LogErr.html" "utilities/LogWarn.html") (dict
        "partial"  "shortcodes/example.html"
        "msg"      "Invalid arguments"
        "details"  ($args.errmsg | append $args.warnmsg)
        "file"     page.File
        "position" .Position
    )}}
{{- end -}}

{{/* Access arguments using camelCase */}}
{{- $showPreview := $args.showPreview }}
{{- $showMarkup := $args.showMarkup }}
```

### Content Security Policy

CSP headers are auto-generated via Hugo's segments feature. The theme includes `mod-csp` for Content Security Policy management. Headers are defined in `netlify.toml` and generated via `npm run build:headers`.

### Internationalization

Multi-language support with translations in `i18n/`. Default language is English (`en-us`). Language configuration in `config/_default/hugo.toml`.

### Page Templates (v2)

**List pages** (`layouts/list.html`):

- If page has `content_blocks` frontmatter → renders via `page/blocks.html` (requires mod-blocks)
- Otherwise → renders via `page/articles.html` (core Hinode, uses section-title.html for header)

**Single pages** (`layouts/single.html`):

- Renders content via `utilities/ProcessContent` partial
- If page has `content_blocks` → also renders via `page/blocks.html`

**Key partials:**

- `page/articles.html` - Default list page rendering with section-title header and card grid
- `page/blocks.html` - Renders Bookshop content blocks (requires mod-blocks)
- `assets/section-title.html` - Shared heading utility with preheading, subtitle, links support

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

### When Working with mod-blocks (Optional)

**Note:** Hinode v2 does NOT include mod-blocks by default. If you need Bookshop components:

1. Add mod-blocks to `hugo.toml`: `path = "github.com/gethinode/mod-blocks"`
2. Run `npm run mod:vendor` to vendor the module
3. Components live in mod-blocks repository at `component-library/components/`
4. Each component has three files: `.hugo.html`, `.scss`, `.bookshop.yml`
5. Update PurgeCSS safelist in `config/postcss.config.js` if components add dynamic classes

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
- Commits follow Angular Conventional Commits (enforced by commitlint)
- Husky pre-commit hooks run linters automatically

### Commit Message Format

Follow Angular Conventional Commits format:

```text
<type>(<scope>): <subject>

<body>

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

**Common types:**

- `feat` - New feature
- `fix` - Bug fix
- `refactor` - Code refactoring
- `style` - Styling changes (CSS/SCSS only, no logic changes)
- `docs` - Documentation changes
- `test` - Adding or updating tests
- `chore` - Build process, dependencies, tooling

**Common scopes:**

- `i18n` - Internationalization/translations
- `components` - Component changes
- `docs` - Documentation
- `theme` - Theme styling
- `build` - Build process

**Example commits:**

- `feat(i18n): add missing translations for testimonials`
- `fix(components): correct variable reference in testimonials`
- `style: add width constraint to section-title class`
- `refactor(components): improve testimonials component layout`

### Linting & Code Quality

Run linters before committing (pre-commit hooks will enforce this):

```bash
npm test              # Run all linters (recommended before commits)
npm run lint:scripts  # Check JavaScript
npm run lint:styles   # Check SCSS
npm run lint:markdown # Check Markdown documentation
```

**Linting tools:**

- **ESLint** (`.eslintrc.yml`) - JavaScript linting with ES6 and browser environment
- **Stylelint** (`.stylelintrc.json`) - SCSS linting with standard-scss rules
- **Markdownlint** (`.markdownlint-cli2.jsonc`) - Markdown file linting

**Markdown linting rules** (`.markdownlint-cli2.jsonc`):

- Enforced: MD040 (fenced code blocks must have language specified), MD032 (lists must be surrounded by blank lines), and others
- Disabled rules: MD013 (line length), MD024 (duplicate headers), MD026 (trailing punctuation), MD034 (bare URLs), MD051 (link fragments), MD053 (link reference definitions), MD055 (table pipe escaping), MD056 (table header/body cell count)
- Ignored: `node_modules/`, `CHANGELOG.md`

**Commit message linting** (enforced by commitlint via pre-commit hooks):

- Body lines must not exceed 100 characters (enforced by `body-max-line-length`)
- When formatting multi-line bullet points, break long lines at 100 characters
- Use indentation (2 spaces) for continuation lines to maintain readability

Example of correctly formatted commit message:

```text
refactor: consolidate version detection into modular partials

- Replace theme-version.html with improved version.html partial
- Extract version detection logic into reusable modular partials
  (mod-version and env-version)
- Update version regex to support both major version (v2) and
  non-versioned module paths
- Add fallback to HUGO_HINODE_VERSION environment variable for
  CI/CD builds
```

**Important notes:**

- Pre-commit hooks run automatically when committing
- If hooks modify files (e.g., formatting), the commit will fail and you should commit again
- Always test changes with the example site: `npm run build:example`
- Check for i18n warnings when modifying translations
- Ensure all language variants build without warnings
- If using mod-blocks, test that components still work after Hinode changes
