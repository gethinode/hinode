---
title: Styles
description: Use extensible Sass files to generate the stylesheets for your website.
date: 2023-01-28
group: advanced-settings
layout: docs
---

<!-- TODO: include dartsass -->

Hinode uses Sass files to take advantage of variables, maps, and functions to generate the cascading style sheets of the website. By utilizing [npm]({{< ref "overview" >}}), Bootstrap's source Sass file are automatically ingested and kept up to date.

## Build pipeline

Hinodes uses npm and mounted folders to create a flexibile virtual file system that is automatically kept up to date. Review the [overview]({{< ref "overview" >}}) for a detailed explanation. The build pipeline of the stylesheet consists of five steps.

1. Define the Sass entrypoint

   The main entrypoint for the Sass files is defined in `assets/scss/app.scss`. It supports Hugo templating. For example, it defines a variable `$themeFont` that links to the [font configuration]({{< ref "fonts" >}}). The variable is available within all source Sass files.

2. Import the source Sass files

   The application entrypoint imports the various source Sass files defined in `assets/scss`, which are combined with the Sass files of [Bootstrap]({{< param "links.bootstrap" >}}) and [Font Awesome (Free)]({{< param "links.fontawesome" >}}). The vendor paths are relative to the `node_modules` folder, which are installed by [npm]({{< ref "commands" >}}).

3. Override and expand the Sass configuration

   The import order of the source files defines which variables and functions to use. In Sass, the first definition of a variable or function takes precedence. For example, to override the setting for the variable `$primary`, is needs to be defined prior to Bootstrap's definition in `_variables.scss`.

4. Transpile the Sass files

   The partial `partials/head/stylesheet.html` reads the application entrypoint, configures the `node_modules` folder as import path, and transpiles the stylesheet into a single file `main.css`. In production mode, the output is minified and linked to with a [fingerprint]({{< param "links.hugo_fingerprint" >}}).

5. Link to the stylesheet in the base layout

   Hinode's base layout `layouts/_default/baseof.html` imports the generated stylesheet in the header section of the webpage via the partial `layouts/partials/head/head.html`.

## Example

The below Sass file defines a skeleton configuration for the main entrypoint. The full configuration is defined in `assets/scss/app.scss`.

```scss
// 1) Define template variables (linking to Hugo config)
$primary:  {{ site.Params.style.primary | default "#007bff" }};

// 2) Include default variable overrides
@import "common/variables.scss";

// 3) Import Bootstrap configuration
@import "bootstrap/scss/variables";

// 4) Import Bootstrap layout & components
@import "bootstrap/scss/root";

// 5) Import Font Awesome
@import "@fortawesome/fontawesome-free/scss/fontawesome";

// 6) Import Hinode theme styles
@import "common/styles.scss";
```
