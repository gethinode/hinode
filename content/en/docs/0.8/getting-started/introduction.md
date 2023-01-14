---
layout: docs
title: Introduction
description: Get started with Hinode, a clean blog theme for your Hugo site based on Bootstrap 5.
date: 2023-01-06
group: getting-started
aliases:
  - "/en/docs/0.8/getting-started/"
  - "/en/docs/getting-started/"
  - "/en/getting-started/"
  - "/en/docs/"
layout: docs
---

Hinode is a clean blog theme for [Hugo]({{< param "links.hugo" >}}), an open-source static site generator. Based on the [Bootstrap 5]({{< param "links.bootstrap" >}}) framework, the rendered site is fast, secure, and responsive. Hinode uses [FlexSearch]({{< param "links.flexsearch" >}}) to enable full text search across your site. Finally, the theme uses [Node Package Manager]({{< param "links.npm" >}}) to automate the build process and to keep track of dependencies. More information is available on the [about]({{< ref "about" >}} "about") page.

## Prerequisites

Hinode requires Git, Node.js and npm for local development and testing. Download the Git binary from the [official website]({{< param "links.git_download" >}}). Next, download and install [Node.js]({{< param "links.nodejs" >}}) (it includes npm) for your platform.

## Installation

Start a new Hinode project in three steps:

### 1. Create a new site

Hinode is available as a [child theme]({{< param "links.repository_child" >}}), and a [main theme]({{< param "links.repository" >}}). The child theme uses [npm]({{< param "links.npm" >}}) to link to the latest available version of the Hinode theme. As such, it is less applicable if you plan to customize a lot. Vice versa, the main theme allows for heavy customization, but is not synchronized with the latest available Hinode theme automatically.

Not quite sure? Use the Hinode child theme.

#### Hinode child theme

```bash
git clone https://github.com/markdumay/hugo-theme-hinode-child.git my-hinode-site && cd my-hinode-site
```

#### Hinode main theme

```bash
git clone https://github.com/markdumay/hugo-theme-hinode.git my-hinode-site && cd my-hinode-site
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start development server

```bash
npm run start
```

## Key configuration settings

The main site configuration is available in `./config/_default`. Some remarks:

| Topic | Remarks |
|-------|---------|
| Menu items | `menus/menus.en.toml` contains language-specific items for the navigation bar and social media links for the home page's footer. |
| Content | Ensure the `mainSections` in `config.toml` is synchronized with the `content` folder, default values are `["blog", "projects"]`. |
| Theme style | Update `primary` and `themeOpacity` within the `[style]` section of `params.toml` to update the site's primary color and opacity. Bootstrap's other key colors can be changed too. You can use the [WCAG Color Contrast Checker]({{< param "links.contrast_checker" >}}) to validate the contrast ratio of your color to improve accessibility. Additionally, set `themeFont` and `themeFontPath` to override the default font. |
| Comments | Comments are powered by [utterances]({{< param "links.utterances" >}}), a lightweight comments widget built on GitHub issues. Update the `repo`  of the `[comments]` section of `params.toml`. |
| Security policy | The theme uses rather strict security policies by default. Be sure to include references to external sources in the header configuration to avoid broken links. The settings of the local development server are defined in `server.toml`. Similar settings are defined in the `netlify.toml` file provided in the repository's root when deploying to [Netlify]({{< param "links.netlify" >}}). |
{.table}
