---
title: Introduction
description: Get started with Hinode, a clean documentation and blog theme for your Hugo site based on Bootstrap 5.
date: 2023-01-29
group: getting-started
aliases:
  - "/en/docs/0.8/getting-started/"
  - "/en/docs/getting-started/"
  - "/en/getting-started/"
  - "/en/docs/"
layout: docs
---

Hinode is a clean documentation and blog theme for [Hugo]({{< param "links.hugo" >}}), an open-source static site generator. Based on the [Bootstrap 5]({{< param "links.bootstrap" >}}) framework, the rendered site is fast, secure, and responsive. Hinode uses [FlexSearch]({{< param "links.flexsearch" >}}) to enable full text search across your site. Finally, the theme uses [Node Package Manager]({{< param "links.npm" >}}) to automate the build process and to keep track of dependencies. More information is available on the [about]({{< ref "about" >}} "about") page.

## Prerequisites

Hinode requires Git, Node.js and npm for local development and testing. Download the Git binary from the [official website]({{< param "links.git_download" >}}). Next, download and install [Node.js]({{< param "links.nodejs" >}}) (it includes npm) for your platform.

## Installation

Start a new Hinode project in three steps:

1. Create a new site

    Hinode is available as a [child theme]({{< param "links.repository_child" >}}), and a [main theme]({{< param "links.repository" >}}). The child theme uses [npm]({{< param "links.npm" >}}) to link to the latest available version of Hinode. Unless you plan to customize a lot, it is recommended to use the child theme:

    {{< command >}}
    git clone https://github.com/gethinode/child.git my-hinode-site && cd my-hinode-site
    {{< /command >}}

    Use the main theme if you intend to customize the base code:

    {{< command >}}
    git clone https://github.com/gethinode/hinode.git my-hinode-site && cd my-hinode-site
    {{< /command >}}

2. Install dependencies

    {{< command >}}
    npm install
    {{< /command >}}

3. Start the development server

    {{< command >}}
    npm run start
    {{< /command >}}

## Quick configuration settings

The main site configuration is available in `./config/_default`. Review the following items to get you started.

{{< accordion >}}
  {{< accordion-item header="Review the layout options" >}}
    Hinode uses a base layout for the home page, list pages, and individual pages. Individual pages can also be configured as documentation page instead of a regular page. Review the [layout documentation]({{< relref "colors" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Adjust the theme colors" >}}
    Hinode uses eight configurable theme colors. You can adjust them in the `style` section of  `/config/_default/params.toml`. Review the [colors documentation]({{< relref "colors" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Set the main font" >}}
    Set the `themeFont` and `themeFontPath` in the `style` section of `/config/_default/params.toml` to adjust the main font. Hinode includes supports for [Emoji]({{< relref "emoji" >}}) by default. Review the [fonts documentation]({{< relref "fonts" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Configure the supported languages">}}
    Configure each supported language in `config/_default/languages.toml`. Set the default behavior in `config/_default/config.toml`. Review the [languages documentation]({{< relref "languages" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Define the main menu" >}}
    Define the main menu entries for each language in `config/_default/menus`. For example, the English menu entries are defined in `menus.en.toml`. See the [navigation documentation]({{< relref "navigation" >}}) for more details.
  {{< /accordion-item >}}
{{< /accordion >}}

## Adding content

Hinode contains sample content for a blog and a project portfolio. The examples are available in English and Dutch and can be found in the `content` folder. Review the following items on to how organize and enrich your content.

{{< accordion >}}
  {{< accordion-item header="Enrich Markdown content with Bootstrap styling" >}}
    Hinode uses a mix of basic Markdown syntax enriched with Bootstrap styling for the typography. Review the [typography documentation]({{< relref "typography" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Use Markdown and Hugo shortcodes to generate links and cross-references" >}}
    Generate internal links and external links using a combination of Markdown and Hugo shortcodes. You can optionally manage your external links in a central configuration file. Review the [links documentation]({{< relref "links-and-cross-references" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Add responsive images optimized for multiple screen sizes and devices">}}
    Hinode supports responsive images out-of-the-box. Hinode uses Hugo’s powerful image processing to preprocess images on the server. By taking advantage of so-called image sets, the client’s browser can decide which image to download whilst reducing the download size. Review the [image documentation]({{< relref "images-and-figures" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Apply Bootstrap styling to your tables" >}}
    Hinode enhances the basic tables available in Markdown with optional styling features provided by Bootstrap. You can customize the accentuation, adjust the borders, and make tables more compact. Review the [tables documentation]({{< relref "tables" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Include Font Awesome icons on the fly" >}}
    Hinode provides out-of-the box access to the free icons of [Font Awesome]({{< param "links.fontawesome" >}}). The icon library provides various styling options. Review the [icons documentation]({{< relref "../content/icons" >}}) for more details.
  {{< /accordion-item >}}
{{< /accordion >}}

## Advanced configuration settings

The next topics give an overview of the advanced configuration settings.

{{< accordion >}}
  {{< accordion-item header="Review the approach to dependency management and virtualization" >}}
    Hinode uses [npm]({{< param "links.npm" >}}) packages to manage its dependencies. In addition, it uses Hugo's [mounted folders]({{< param "links.hugo_mounts" >}}) to create a virtual file system. Review the [advanced settings overview]({{< relref "../advanced-settings/overview" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Adjust the build pipeline for Sass files" >}}
    Hinode uses Bootstrap's Sass files to generate the cascading style sheets of the website. The main entrypoint is defined in `assets/scss/app.scss`. See the [styles documentation]({{< relref "styles" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Bundle JavaScript files for deployment">}}
    Hinodes uses npm to include the latest JavaScript files of external packages such as [Bootstrap]({{< param "links.bootstrap" >}}) and [FlexSearch]({{< param "links.flexsearch" >}}). All local and external files are bundled in a single JavaScript file. See the [scripts documentation]({{< relref "scripts" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Process icon files to apply theme colors" >}}
    Hinode replaces Boostrap's embedded icons with file-based icons to comply with its security settings. The icon files are parameterized to use the theme colors. See the [icons documentation]({{< relref "../advanced-settings/icons" >}}) for more details.
  {{< /accordion-item >}}
  {{< accordion-item header="Refine header settings to adjust the Content Security Policy" >}}
    Hinode uses rather strict security policies to ensure the site is secure by default. Be sure to include references to external sources in the header configuration to avoid broken links. The settings of the local development server are defined in `config/_default/server.toml`. Similar settings are defined in the `netlify.toml` file provided in the repository's root when deploying to [Netlify]({{< param "links.netlify" >}}). See the [server documentation]({{< relref "server" >}}) for more details.
  {{< /accordion-item >}}
{{< /accordion >}}
