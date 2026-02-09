---
author: Mark Dumay
title: File
date: 2024-08-14
description: The file shortcode prints the full content of any given file with syntax highlighting.
layout: docs
icon: fa file-lines
tags: component
---

## Overview

{{< release version="v0.16.0" >}}

The `file` shortcode prints and highlights the full content of a given input file. It recognizes the languages supported by Hugo's [highlight function](https://gohugo.io/content-management/syntax-highlighting/#list-of-chroma-highlighting-languages).

### Default file preview

Use the `file` argument to print the content of a specific file. By default, the shortcode uses the site's `basePath`. Provide a path that starts with `./` to use the path of the repository as base path instead.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* file file="./data/sample/style.toml" id="file-collapse-2" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Collapsed file preview

Set `show` to `false` to hide the file content on page load. The content is revealed when clicking the tab control.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* file show="false" file="./data/sample/style.toml" id="file-collapse-4" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### File preview with filename only

Set `full` to `false` to show the filename only.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* file full=false file="./data/sample/style.toml" id="file-collapse-5" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Syntax highlighting

{{< release version="0.27.6" >}}

Use the [Hugo syntax highlighting options](https://gohugo.io/content-management/syntax-highlighting/#highlight-shortcode) for marking lines in the file. Pass the settings to the `options` argument.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* file full=false file="./data/sample/style.toml" id="file-collapse-5"
    highlight-options="linenos=table,hl_lines=3-4 6,linenostart=10" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

The file `assets/scss/components/_docs.scss` defines the Hinode-specific styling of the `file` shortcode.

{{< file file="assets/scss/components/_docs.scss" show="false" >}}

## Arguments

> [!IMPORTANT]
> The definition of the default `id` field fails when embedding (multiple) `docs` shortcodes in an [example component](example). Provide an explicit, unique `id` to prevent cross-interference.

The shortcode supports the following arguments:

{{< args structure="file" group="shortcode" >}}
