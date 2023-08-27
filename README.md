# Hugo Theme Hinode

<!-- markdownlint-disable MD033 -->
<!-- Tagline -->
<p align="center">
    <b>A clean documentation and blog theme for your Hugo site based on Bootstrap 5</b>
    <br />
</p>

<!-- Badges -->
<p align="center">
    <a href="https://gohugo.io" alt="Hugo website">
        <img src="https://img.shields.io/badge/generator-hugo-brightgreen">
    </a>
    <a href="https://gethinode.com" alt="Hinode theme">
        <img src="https://img.shields.io/badge/theme-hinode-blue">
    </a>
    <a href="https://www.npmjs.com/package/%40gethinode/hinode" alt="npm package">
        <img src="https://img.shields.io/npm/v/%40gethinode/hinode">
    </a>
    <a href="https://app.netlify.com/sites/gethinode-demo/deploys" alt="Netlify Status">
        <img src="https://img.shields.io/netlify/0ad42e3e-fdfa-4d37-8e26-58badd429a67">
    </a>
    <a href="https://stats.uptimerobot.com/xyGVYhLJmV" alt="UptimeRobot Status">
        <img src="https://img.shields.io/uptimerobot/status/m791334689-73d9dfc82030f4f955b2d6bb">
    </a>
    <a href="https://github.com/gethinode/hinode/commits/main" alt="Last commit">
        <img src="https://img.shields.io/github/last-commit/gethinode/hinode.svg">
    </a>
    <a href="https://github.com/gethinode/hinode/issues" alt="Issues">
        <img src="https://img.shields.io/github/issues/gethinode/hinode.svg">
    </a>
    <a href="https://github.com/gethinode/hinode/pulls" alt="Pulls">
        <img src="https://img.shields.io/github/issues-pr-raw/gethinode/hinode.svg">
    </a>
    <a href="https://github.com/gethinode/hinode/blob/main/LICENSE" alt="License">
        <img src="https://img.shields.io/github/license/gethinode/hinode">
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
<!-- markdownlint-enable MD033 -->

## About

![Logo](https://raw.githubusercontent.com/gethinode/hinode/main/static/img/logo.png)

- [Online Demo][demo]
- [PageSpeed Insights][pagespeed]
- [Mozilla Observatory][observatory]

Hinode is a clean documentation and blog theme for [Hugo][hugo], an open-source static site generator. Based on the [Bootstrap 5][bootstrap] framework, the rendered site is fast, secure, and responsive. Hinode uses [FlexSearch][flexsearch] to enable full text search across your site. Finally, the theme supports [Node Package Manager][npm] (npm) to automate the build process and to keep track of dependencies.

Detailed information about Hinode is available on the [official website][website].

## Prerequisites

Hinode is a [Hugo theme that uses modules][hugo_modules] to install and maintain various components. It can be installed using either Hugo or npm. If you would like to take advantage of automation, the npm approach is recommended. Refer to the [Hinode template][repository_template] for installation instructions with npm.

The installation instructions in this readme install Hinode as a regular Hugo theme. Hinode requires the following software to be installed on your local machine.

- [Go binary][golang_download]
- [Hugo][nodejs] (extended version)

[Git][git_download] is recommended, but is not a strict requirement.

## Installation

Start a new Hinode project in three steps:

1. **Create a new site**

    ```bash
    hugo new site my-hinode-site && cd my-hinode-site
    ```

1. **Initialize the module system**

    ```bash
    hugo mod init example.com/my-hinode-site
    echo "[[module.imports]]\npath = 'github.com/gethinode/hinode'" >> hugo.toml
    ```

1. **Start a development server**

    ```bash
    hugo server
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

<!-- markdownlint-disable MD033 -->
<a href="https://www.buymeacoffee.com/markdumay" target="_blank" rel="noopener noreferrer"><img src="https://cdn.buymeacoffee.com/buttons/lato-orange.png" alt="Buy Me A Coffee" style="height: 51px !important;width: 217px !important;"></a>
<!-- markdownlint-enable MD033 -->

## License

The `hinode`, `docs`, and `template` codebase is released under the [MIT license][license]. The documentation of Hinode is licensed under the Creative Commons [(CC BY-NC 4.0)][cc-by-nc-4.0] license. This includes all files within the repository's `/content` and `/exampleSite/content` folders and their children, as well as the "README" in the repository root. This applies to all public repositories maintained by `gethinode` on GitHub, including the `gethinode/hinode`, `gethinode/template`, and `gethinode/docs` repositories, unless specified otherwise.

<!-- MARKDOWN PUBLIC LINKS -->
[blist]: https://github.com/apvarun/blist-hugo-theme
[bootstrap]: https://getbootstrap.com
[cc-by-nc-4.0]: https://creativecommons.org/licenses/by-nc/4.0/
[doks]: https://github.com/h-enk/doks
[flexsearch]: https://github.com/nextapps-de/flexsearch
[git_download]: https://git-scm.com
[hugo]: https://gohugo.io
[hugo_download]: https://gohugo.io/installation
[hugo_modules]: https://gohugo.io/hugo-modules/
[netlify]: https://www.netlify.com
[nodejs]: https://nodejs.org
[npm]: https://www.npmjs.com
[observatory]: https://observatory.mozilla.org/analyze/demo.gethinode.com
[pagespeed]: https://pagespeed.web.dev/report?url=https%3A%2F%2Fdemo.gethinode.com%2F
[utterances]: https://utteranc.es

<!-- MARKDOWN MAINTAINED LINKS -->
[contribute]: https://gethinode.com/contribute
[getstarted]: https://gethinode.com/docs
[golang_download]: https://go.dev/dl/
[demo]: https://demo.gethinode.com/
[license]: https://github.com/gethinode/hinode/blob/main/LICENSE
[repository]: https://github.com/gethinode/hinode.git
[repository_template]: https://github.com/gethinode/template.git
[website]: https://gethinode.com/
