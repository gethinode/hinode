---
author: Mark Dumay
title: Navbar
date: 2024-08-14
description: Use the navbar shortcode to display a navigation header with a toggler.
layout: docs
icon: fas bars
tags: component
---

## Overview

Use the `navbar` shortcode to display a navigation header with a toggler. The menu items are derived from the site's configuration, which defaults to the menus defined under `main`. Nested items are supported at one-level depth. The navigation bar includes a search area and a language switcher if applicable. The items in the navigation header are accentuated if the current page or any of its descendants is active.

### Brand logo

Set the argument `logo` to an image to add a brand logo to the left of the navbar. The logo moves to the center on smaller screens, depending on the `size` setting.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* navbar id="navbar-logo" logo="/img/logo_icon.svg" color="body-tertiary" breakpoint="md" search="false" menu="sample" mode="false" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Brand text

Set the argument `title` to add a brand text to the left of the navbar. The text moves to the center on smaller screens, pending on the `size` setting.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* navbar id="navbar-title" title="Brand" color="body-tertiary" breakpoint="md" search="false" menu="sample" mode="false" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Colored navbar

> [!IMPORTANT]
> To improve color-mode compatibility, the colors `dark` and `light` are no longer supported since {{< release version="v0.14.1" short="true" link-type="link" >}}. Use the adaptive colors `body` and `body-tertiary` instead, or apply a static `white` or `black` color. The background colors `white` and `black` use `data-bs-theme` to fix the text color. This setting requires `dark mode` to be enabled.

Set the `color` argument to define the background color with a matching title color.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* navbar id="navbar-color-1" color="primary" breakpoint="sm" search="false" menu="sample" mode="false" */>}}
{.mb-3}

{{</* navbar id="navbar-color-2" color="secondary" breakpoint="sm" search="false" menu="sample" mode="false" */>}}
{.mb-3}

{{</* navbar id="navbar-color-3" color="success" breakpoint="sm" search="false" menu="sample" mode="false" */>}}
{.mb-3}

{{</* navbar id="navbar-color-4" color="danger" breakpoint="sm" search="false" menu="sample" mode="false" */>}}
{.mb-3}

{{</* navbar id="navbar-color-5" color="warning" breakpoint="sm" search="false" menu="sample" mode="false" */>}}
{.mb-3}

{{</* navbar id="navbar-color-6" color="info" breakpoint="sm" search="false" menu="sample" mode="false" */>}}
{.mb-3}

{{</* navbar id="navbar-color-7" color="white" breakpoint="sm" search="false" menu="sample" mode="false" */>}}
{.mb-3}

{{</* navbar id="navbar-color-8" color="black" breakpoint="sm" search="false" menu="sample" mode="false" */>}}
{.mb-3}

{{</* navbar id="navbar-color-9" color="body" breakpoint="sm" search="false" menu="sample" mode="false" */>}}
{.mb-3}

{{</* navbar id="navbar-color-10" color="body-tertiary" breakpoint="sm" search="false" menu="sample" mode="false" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Search input

Set the argument `search` to `true` to enable search input.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* navbar id="navbar-search-1" search="true" color="body-tertiary" breakpoint="md" menu="sample" mode="false" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Mode switcher

> [!IMPORTANT]
> The mode switcher requires `dark mode` to be enabled.

Set the argument `mode` to `true` to enable the mode switcher.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* navbar id="navbar-mode-1" mode="true" search="false" color="body-tertiary" breakpoint="md" menu="sample" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Set the argument `mode` to `false` to disable the mode switcher.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* navbar id="navbar-mode-2" mode="false" search="false" color="body-tertiary" breakpoint="md" menu="sample" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

The file `assets/scss/components/_navbar.scss` defines the Hinode-specific styling of the `navbar` shortcode. Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/navbar/#css) for additional styling options.

{{< file file="assets/scss/components/_navbar.scss" show="false" >}}

## Arguments

The shortcode supports the following arguments:

{{< args structure="navbar" group="shortcode" >}}
