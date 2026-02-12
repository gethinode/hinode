---
author: Mark Dumay
title: Spinner
date: 2023-08-14
description: Use the spinner shortcode to indicate the loading state of a component or page.
layout: docs
icon: fas spinner
tags: component
---

## Overview

> [!IMPORTANT]
> The animation effect of this component depends on the `prefers-reduced-motion` media query. See the reduced motion section of [Bootstrap's accessibility documentation](https://getbootstrap.com/docs/5.3/getting-started/accessibility/#reduced-motion).

### Regular spinner

Use the `spinner` shortcode to indicate the loading state of a component or page. The inner content is used as alternative description. As an example, the following shortcode displays a centered spinner.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* spinner class="text-center" */>}}
Loading...
{{</* /spinner */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Colored spinner

Set the `color` argument to apply a theme color to the spinner. The following shortcodes display a centered spinner for each available color.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* spinner color="primary" */>}}Loading...{{</* /spinner */>}}
{{</* spinner color="secondary" */>}}Loading...{{</* /spinner */>}}
{{</* spinner color="success" */>}}Loading...{{</* /spinner */>}}
{{</* spinner color="danger" */>}}Loading...{{</* /spinner */>}}
{{</* spinner color="warning" */>}}Loading...{{</* /spinner */>}}
{{</* spinner color="info" */>}}Loading...{{</* /spinner */>}}
{{</* spinner color="light" */>}}Loading...{{</* /spinner */>}}
{{</* spinner color="dark" */>}}Loading...{{</* /spinner */>}}
{{</* spinner color="white" */>}}Loading...{{</* /spinner */>}}
{{</* spinner color="black" */>}}Loading...{{</* /spinner */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Growing spinner

Set `grow` to `true` to show a growing spinner.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* spinner grow="true" color="info" class="text-center" */>}}
Loading...
{{</* /spinner */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/spinners/#css) for additional styling options.

## Arguments

The shortcode supports the following arguments:

{{< args structure="spinner" group="shortcode" >}}
