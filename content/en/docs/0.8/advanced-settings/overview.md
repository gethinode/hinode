---
title: Overview
description: Configure and customize Hinode to your liking using Hugo Templating and npm dependencies.
date: 2023-01-28
group: advanced-settings
layout: docs
---

As a theme for Hugo, Hinode is highly configurable and customizable. Based on Go's template libraries, Hugo enriches plain Markdown content with powerful features to generate websites. More information is available in [Hugo's documentation]({{< param "links.hugo_templates" >}}). To take advantage of package versioning and dependency management, Hinode takes a slightly different approach compared to most themes. The below paragraphs clarify the build system.

## npm packages

Both the [main theme]({{< param "links.repository" >}}) and [child theme]({{< param "links.repository_child" >}}) packages of Hinode are defined in the file `package.json` in the repository root. The extract below defines the key elements of the package configuration. The `name` is a unique identifier to identify the [package on npm]({{< param "links.package_npm" >}}). The `version` tag uses [semantic versioning]({{< param "links.semver" >}}), consisting of a `MAJOR` version, `MINOR` version, and `PATCH` version. In short, anything below `MAJOR` version `1` is considered to be in development and may not be backwards compatible. Starting from `1`, each `MAJOR` version may introduce breaking changes, whilst `MINOR` version usually introduce new features that are compatible with the `MAJOR` version. Lastly, `PATCH` usually indicates a bug fix or small revision.

The other two sections of interest are `devDependencies` and `otherDependencies`. As an Hugo theme, Hinode does not require any packages in production. Instead the development dependencies are used to generate the static site and its assets. For example, Bootstrap's JavaScript distribution file `/node_modules/bootstrap/dist/js` is bundled into the `js/main.bundle<.min>.js` file during build. The path `/node_modules/bootstrap/` refers to the Bootstap package defined as dependency. Lastly, the Hugo binary is installed as version-controlled dependency too. This ensures the build process is transparent and traceable, which simplifies debugging. Please refer to the [commands]({{< ref "commands" >}}) section to review the various npm commands available.

```yml
{
    "name": "@gethinode/hinode",
    "version": "0.8.0",
    "scripts": {
        [...]
    },
    [...]
    "devDependencies": {
        "bootstrap": "^5.2.3",
        [...]
    },
    "otherDependencies": {
        "hugo": "0.110.0"
    }
}
```

## Mounted folders

Hugo supports the [mounting of folders]({{< param "links.hugo_mounts" >}}) since version 0.56.0. Hinode takes advantage of this feature to create a virtual file system, combining assets from multiple sources. For example, the below section of the `/config/_default/config.toml` instructs Hugo to make Bootstrap's JavaScript distribution file `/node_modules/bootstrap/dist/js` available in the `/assets/js` folder. This file is then bundled with the JavaScript files defined in the `/assets/js` folder of Hinode.

{{< alert color="primary" >}}
    When you add a mount, the default mount for the concerned target root is ignored: be sure to explicitly add it.
{{< /alert >}}

```toml
[module]
    [...]
    [[module.mounts]]
        source = "assets"
        target = "assets"
    [[module.mounts]]
        source = "node_modules/bootstrap/dist/js"
        target = "assets/js/vendor/bootstrap"
        includeFiles = "*.bundle.js"
```

As another example, the Hinode child theme merges the key folders of the main theme with its own folder. This simplifies the modification of any base files, as the files in the local repository take precedence over the files of the main theme.

```toml
[module]
    [...]
    [[module.mounts]]
        source = "node_modules/@gethinode/hinode/i18n"
        target = "i18n"
    [[module.mounts]]
        source = "i18n"
        target = "i18n"  
```
