---
author: Mark Dumay
title: Kbd
date: 2023-12-29
description: Use the kbd shortcode to show a keyboard input element.
layout: docs
icon: fa keyboard
tags: component
---

## Overview

{{< release version="v0.19.0" >}}

Use the `kbd` shortcode to show a keyboard input element.

### Regular input

Use a positional argument to quickly add a keyboard input element. The following example uses `CTRL-C` as input.

<!-- markdownlint-disable MD037 -->
{{< example >}}
{{</* kbd "CTRL-C" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Colored input

Use the named arguments `text` and `color` to modify the styling of the keyboard input element. The following colors are available.

<!-- markdownlint-disable MD037 -->
{{< example >}}
{{</* kbd text="primary" color="primary" */>}}
{{</* kbd text="secondary" color="secondary" */>}}
{{</* kbd text="success" color="success" */>}}
{{</* kbd text="danger" color="danger" */>}}
{{</* kbd text="warning" color="warning" */>}}
{{</* kbd text="info" color="info" */>}}
{{</* kbd text="light" color="light" */>}}
{{</* kbd text="dark" color="dark" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

The file `assets/scss/components/_kbd.scss` defines the Hinode-specific styling of the `kbd` shortcode.

{{< file file="assets/scss/components/_kbd.scss" show="false" >}}

## Arguments

The shortcode supports the following arguments:

{{< args structure="kbd" group="shortcode" >}}
