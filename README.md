# Hugo Theme Hinode

<!-- Tagline -->
<p align="center">
    <b>A clean blog theme for your Hugo site based on Bootstrap 5</b>
    <br />
</p>

<!-- Badges -->
<p align="center">
    <a href="https://gohugo.io" alt="Hugo website">
        <img src="https://img.shields.io/badge/generator-hugo-brightgreen" />
    </a>
    <a href="https://app.netlify.com/sites/hinode-demo/deploys" alt="Netlify Status">
        <img src="https://img.shields.io/netlify/151e88a3-d161-4045-856d-778fea43fc2f" />
    </a>
    <a href="https://stats.uptimerobot.com/xyGVYhLJmV" alt="UptimeRobot Status">
        <img src="https://img.shields.io/uptimerobot/status/m791334689-73d9dfc82030f4f955b2d6bb" />
    </a>
    <a href="https://github.com/markdumay/hugo-theme-hinode/commits/main" alt="Last commit">
        <img src="https://img.shields.io/github/last-commit/markdumay/hugo-theme-hinode.svg" />
    </a>
    <a href="https://github.com/markdumay/hugo-theme-hinode/issues" alt="Issues">
        <img src="https://img.shields.io/github/issues/markdumay/hugo-theme-hinode.svg" />
    </a>
    <a href="https://github.com/markdumay/hugo-theme-hinode/pulls" alt="Pulls">
        <img src="https://img.shields.io/github/issues-pr-raw/markdumay/hugo-theme-hinode.svg" />
    </a>
    <a href="https://github.com/markdumay/hugo-theme-hinode/blob/main/LICENSE" alt="License">
        <img src="https://img.shields.io/github/license/markdumay/hugo-theme-hinode" />
    </a>
</p>

<!-- Table of Contents -->
<p align="center">
  <a href="#about">About</a> •
  <a href="#prerequisites">Prerequisites</a> •
  <a href="#installation">Installation</a> •
  <a href="#configuration">Configuration</a> •
  <a href="#contributing">Contributing</a> •
  <a href="#donate">Donate</a> •
  <a href="#license">License</a>
</p>

## About

![Logo](https://raw.githubusercontent.com/markdumay/hugo-theme-hinode/main/static/img/logo.png)

- [Online Demo][demo]
- [PageSpeed Insights][pagespeed]
- [Mozilla Observatory][observatory]

Hinode is a clean blog theme for [Hugo][hugo], an open-source static site generator. Based on the [Bootstrap 5][bootstrap] framework, the rendered site is fast, secure, and responsive. Hinode uses [FlexSearch][flexsearch] to enable full text search across your site. Finally, the theme uses [Node Package Manager][npm] to automate the build process and to keep track of dependencies.

Additional features include:

- Comments
- Social links
- Blog pagination
- Code highlighting
- Command prompt
- Color customization
- Language switcher

<!-- TODO: add tutorial deep-link 
Detailed background information is available on the author's [personal blog][blog].
-->

## Prerequisites

Hinode requires Git, Node.js and npm for local development and testing. Download the Git binary from the [official website][git_download]. Next, download and install [Node.js][nodejs] (it includes npm) for your platform.

## Installation

Start a new Hinode project in three steps:

### 1. Create a new site

Hinode is available as a [child theme][repository_child], and a [main theme][repository]. The child theme uses [npm][npm] to link to the latest available version of the Hinode theme. As such, it is less applicable if you plan to customize a lot. Vice versa, the main theme allows for heavy customization, but is not synchronized with the latest available Hinode theme automatically.

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

## Configuration

The main site configuration is available in `./config/_default`. Some remarks:

- **Menu items** - `menus/menus.en.toml` contains language-specific items for the navigation bar and social media links for the home page's footer.
- **Content** - Ensure the `mainSections` in `config.toml` is synchronized with the `content` folder, default values are `["blog", "projects"]`.
- **Theme style** - Update `themeColor` and `themeOpacity` within the `[style]` section of `params.toml` to update the site's primary color and opacity. You can use the [WCAG Color Contrast Checker][contrast_checker] to validate the contrast ratio of your color to improve accessibility. Additionally, set `themeFont` and `themeFontPath` to override the default font.
- **Comments** - Comments are powered by [utterances][utterances], a lightweight comments widget built on GitHub issues. Update the `repo`  of the `[comments]` section of `params.toml`.
- **Security policy** - The theme uses rather strict security policies by default. Be sure to include references to external sources in the header configuration to avoid broken links. The settings of the local development server are defined in `server.toml`. Similar settings are defined in the `netlify.toml` file provided in the repository's root when deploying to [Netlify][netlify].

## Contributing

1. Clone the repository and create a new branch

    ```console
    git checkout https://github.com/markdumay/hugo-theme-hinode.git -b name_for_new_branch
    ```

2. Make and test the changes
3. Submit a Pull Request with a comprehensive description of the changes

## Credits

The Hinode theme is inspired by the following themes:

- [Blist][blist] - a clean and fast blog theme for your Hugo site using Tailwind CSS.
- [Doks][doks] - a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize.

## Donate

<a href="https://www.buymeacoffee.com/markdumay" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;"></a>

## License

The `hugo-theme-hinode` and `hugo-theme-hinode-child` codebase is released under the [MIT license][license]. The documentation (including the "README") is licensed under the Creative Commons ([CC BY-NC 4.0)][cc-by-nc-4.0] license.

<!-- MARKDOWN PUBLIC LINKS -->
[blist]: https://github.com/apvarun/blist-hugo-theme
[bootstrap]: https://getbootstrap.com
[cc-by-nc-4.0]: https://creativecommons.org/licenses/by-nc/4.0/
[contrast_checker]: https://accessibleweb.com/color-contrast-checker/
[doks]: https://github.com/h-enk/doks
[flexsearch]: https://github.com/nextapps-de/flexsearch
[git_download]: https://git-scm.com
[hugo]: https://gohugo.io
[netlify]: https://www.netlify.com
[nodejs]: https://nodejs.org
[npm]: https://www.npmjs.com
[observatory]: https://observatory.mozilla.org/analyze/hinode-demo.markdumay.org
[pagespeed]: https://pagespeed.web.dev/report?url=https%3A%2F%2Fhinode-demo.markdumay.org%2F
[utterances]: https://utteranc.es

<!-- MARKDOWN MAINTAINED LINKS -->
<!-- TODO: add blog link
[blog]: https://markdumay.com
[blog]: https://github.com/markdumay
-->
[demo]: https://hinode-demo.markdumay.org/
[license]: https://github.com/markdumay/hugo-theme-hinode/blob/main/LICENSE
[repository]: https://github.com/markdumay/hugo-theme-hinode.git
[repository_child]: https://github.com/markdumay/hugo-theme-hinode-child.git
