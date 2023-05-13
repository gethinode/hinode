# Hugo Theme Hinode

<!-- Tagline -->
<p align="center">
    <b>A clean documentation and blog theme for your Hugo site based on Bootstrap 5</b>
    <br />
</p>

<!-- Badges -->
<p align="center">
    <a href="https://gohugo.io" alt="Hugo website">
        <img src="https://img.shields.io/badge/generator-hugo-brightgreen" />
    </a>
    <a href="https://app.netlify.com/sites/gethinode-demo/deploys" alt="Netlify Status">
        <img src="https://img.shields.io/netlify/0ad42e3e-fdfa-4d37-8e26-58badd429a67" />
    </a>
    <a href="https://stats.uptimerobot.com/xyGVYhLJmV" alt="UptimeRobot Status">
        <img src="https://img.shields.io/uptimerobot/status/m791334689-73d9dfc82030f4f955b2d6bb" />
    </a>
    <a href="https://github.com/gethinode/hinode/commits/main" alt="Last commit">
        <img src="https://img.shields.io/github/last-commit/gethinode/hinode.svg" />
    </a>
    <a href="https://github.com/gethinode/hinode/issues" alt="Issues">
        <img src="https://img.shields.io/github/issues/gethinode/hinode.svg" />
    </a>
    <a href="https://github.com/gethinode/hinode/pulls" alt="Pulls">
        <img src="https://img.shields.io/github/issues-pr-raw/gethinode/hinode.svg" />
    </a>
    <a href="https://github.com/gethinode/hinode/blob/main/LICENSE" alt="License">
        <img src="https://img.shields.io/github/license/gethinode/hinode" />
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

![Logo](https://raw.githubusercontent.com/gethinode/hinode/main/static/img/logo.png)

- [Online Demo][demo]
- [PageSpeed Insights][pagespeed]
- [Mozilla Observatory][observatory]

Hinode is a clean documentation and blog theme for [Hugo][hugo], an open-source static site generator. Based on the [Bootstrap 5][bootstrap] framework, the rendered site is fast, secure, and responsive. Hinode uses [FlexSearch][flexsearch] to enable full text search across your site. Finally, the theme uses [Node Package Manager][npm] to automate the build process and to keep track of dependencies.

Additional features include:

- Switching between light mode and dark mode
- Support for multiple languages
- Reusable Bootstrap components through configurable shortcodes and partials
- Embedded comments through light-weight integration with GitHub via [utteranc.es][utterances]
- Integrated sidebar navigation for content-heavy sections, such as documentation pages
- Reponsive image handling for multiple screen sizes and resolutions
- Optimized search results, scoring 100 points for SEO on [PageSpeed Insights][pagespeed]
- Secure by default, scoring A+ on [Mozilla Observatory test][observatory]

Detailed information about Hinode is available on the [official website][website].

## Prerequisites

Hinode requires Git, Node.js and npm for local development and testing. Download the Git binary from the [official website][git_download]. Next, download and install [Node.js][nodejs] (it includes npm) for your platform.

## Installation

Start a new Hinode project in three steps:

1. Create a new site

    Hinode is available as a [child theme][repository_child], and a [main theme][repository]. The child theme uses [npm][npm] to link to the latest available version of Hinode. Unless you plan to customize a lot, it is recommended to use the child theme:

    ```bash
    git clone https://github.com/gethinode/child.git my-hinode-site && cd my-hinode-site
    ```

    Use the main theme if you intend to customize the base code:

    ```bash
    git clone https://github.com/gethinode/hinode.git my-hinode-site && cd my-hinode-site
    ```

1. Install dependencies

    ```bash
    npm install
    ```

1. Start development server

    ```bash
    npm run start
    ```

## Configuration

See the [official documentation][getstarted] on how to configure your site.

## Contributing

See the [official documentation][contribute] on how to contribute to the open-source development of Hinode.

## Credits

Hinode is inspired by the following themes:

- [Blist][blist] - a clean and fast blog theme for your Hugo site using Tailwind CSS.
- [Doks][doks] - a Hugo theme for building secure, fast, and SEO-ready documentation websites, which you can easily update and customize.

## Donate

<a href="https://www.buymeacoffee.com/markdumay" target="_blank" rel="noopener noreferrer"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;"></a>

## License

The `hinode` and `child` codebase is released under the [MIT license][license]. The documentation (including the "README" and `docs` codebase) is licensed under the Creative Commons ([CC BY-NC 4.0)][cc-by-nc-4.0] license.

<!-- MARKDOWN PUBLIC LINKS -->
[blist]: https://github.com/apvarun/blist-hugo-theme
[bootstrap]: https://getbootstrap.com
[cc-by-nc-4.0]: https://creativecommons.org/licenses/by-nc/4.0/
[doks]: https://github.com/h-enk/doks
[flexsearch]: https://github.com/nextapps-de/flexsearch
[git_download]: https://git-scm.com
[hugo]: https://gohugo.io
[netlify]: https://www.netlify.com
[nodejs]: https://nodejs.org
[npm]: https://www.npmjs.com
[observatory]: https://observatory.mozilla.org/analyze/demo.gethinode.com
[pagespeed]: https://pagespeed.web.dev/report?url=https%3A%2F%2Fdemo.gethinode.com%2F
[utterances]: https://utteranc.es

<!-- MARKDOWN MAINTAINED LINKS -->
[contribute]: https://gethinode.com/contribute
[getstarted]: https://gethinode.com/docs
[demo]: https://demo.gethinode.com/
[license]: https://github.com/gethinode/hinode/blob/main/LICENSE
[repository]: https://github.com/gethinode/hinode.git
[repository_child]: https://github.com/gethinode/child.git
[website]: https://gethinode.com/
