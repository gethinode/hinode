---
author: Mark Dumay
title: Docs
date: 2024-08-14
description: The docs shortcode captures a code snippet from a supported input file.
layout: docs
icon: fas bookmark
tags: component
---

## Overview

{{< release version="v0.8.0" >}}

The `docs` shortcode captures a code snippet from a `toml` or `scss` input file. It scans for named markers in a local file. The snippet between the two markers is then rendered using syntax highlighting.

### Default code snipppet

Use the `name` and `file` arguments to refer to a code snippet of a file. By default, the shortcode uses the site's `basePath`. Provide a path that starts with `./` to use the path of the repository as base path instead.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* docs name="theme-colors" file="./data/sample/style.toml" id="docs-default" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Collapsed code snipppet

Set `show` to `false` to hide the code snippet on page load. The code is revealed when clicking the tab control.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* docs name="breadcrumb" show="false" file="./assets/scss/components/_breadcrumb.scss" id="docs-collapse" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Code snipppet with filename only

Set `full` to `false` to show the filename only.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* docs name="breadcrumb" full=false file="./assets/scss/components/_breadcrumb.scss" id="docs-filename" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Input files

The `docs` shortcode supports `.toml` and `.scss` file formats. Use a marker to denote the start and end of a code snippet:

- For `.toml` files, use `# toml-docs-start` and `# toml-docs-end` followed by the snippet name
- For `.scss` files, use `// scss-docs-start` and `// scss-docs-end` followed by the snippet name

Click on one the tabs to see a full input file example.

<!-- markdownlint-disable MD031 MD037 -->
{{< nav tab-type="tabs" id="tabs-1" >}}
  {{< nav-item title="toml" show="true" >}}
    {{</* file file="./data/sample/style.toml" */>}}
  {{< /nav-item >}}
  {{< nav-item title="scss" >}}
    {{</* file file="./assets/scss/components/_breadcrumb.scss" */>}}
  {{< /nav-item >}}
{{< /nav >}}
<!-- markdownlint-enable MD031 MD037 -->

## Styling

The file `assets/scss/components/_docs.scss` defines the Hinode-specific styling of the `docs` shortcode.

{{< file file="assets/scss/components/_docs.scss" show="false" >}}

## Arguments

> [!IMPORTANT]
> The definition of the default `id` field fails when embedding (multiple) `docs` shortcodes in an [example component](example). Provide an explicit, unique `id` to prevent cross-interference.

The shortcode supports the following arguments:

{{< args structure="docs" group="shortcode" >}}
