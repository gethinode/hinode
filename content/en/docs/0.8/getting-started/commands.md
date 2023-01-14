---
title: Commands
description: Use npm commands to automate the build process and to keep track of dependencies.
date: "2023-01-11"
group: getting-started
layout: docs
---

Hinode uses [Node Package Manager]({{< param "links.npm" >}}) to automate the build process and to keep track of dependencies. The `package.json` file in the repository root defines several commands to simplify local development and testing. The following paragraphs describe the main commands.

## Starting a local server

Use the following command from the command prompt to start a local **development server**. The command removes any previous build artifacts in the `public` and `resources` folders. The command invokes the local web server from Hugo, which watches for changes in the key system files and configuration directory. By default the generated site is available at `http://localhost:1313/` and is responsive to changes. This alllows for interactive development and testing. When in development mode, the generated assets (such as javascripts and CSS files) are not minified to simplify debugging.

{{% command %}}
npm run start
{{% /command %}}

Use the following command to mimick the site in **production mode**. In this setting, generated assets are minified and compliant with the Content Security Policy. Although Hugo's web server is not meant to be run in a real production environment, it does allow validation of the site in an environment close to production.

{{% command %}}
npm run prod
{{% /command %}}

## Generating a web site

Use the following command to generate the static site. The build artifacts are stored in the local `public` folder. You can deploy these files to your **production** server.

{{% command %}}
npm run build
{{% /command %}}

Add the prefix `debug` to generate a site suitable for **debugging**. The build artifacts are not minified to simplify review and testing.

{{% command %}}
npm run build:debug
{{% /command %}}

## Validating linting rules

Use the the following command to analyze the source code and to test for any stylistic errors. The lint command validates three types of files in the `assets` folder and `content` folder:

* Javascript (`assets/*.js`) using [eslint]({{< param "links.eslint" >}}).
* CSS and SASS (`assets/scss/**/*.{css,sass,scss,sss,less}`) using [stylelint]({{< param "links.stylelint" >}}).
* Markdown (`*.md` and `content/**/*.md`) using [markdownlint-cli2]({{< param "links.markdownlint" >}}).

The basic configuration of these linting tools is defined in the repository root.

{{% command %}}
npm run lint
{{% /command %}}

Be sure to adhere to the linting rules before submitting any code changes / Pull Requests to Hinode's repository.

## Upgrading dependencies

Use the following command to test for any available upgrades of used packages. The command runs `npx` to validate the dependencies and to upgrade the dependency versions in `package.json`.

{{% command %}}
npm run upgrade
{{% /command %}}

The `npx` command does not validate the version of the Hugo binary. The version needs to be manually updated in the `package.json` file.

```json
  "otherDependencies": {
    "hugo": "0.109.0"
  }
```

Be sure to install the upgraded dependencies if needed:

{{% command %}}
npm install
{{% /command %}}
