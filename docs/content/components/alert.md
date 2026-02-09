---
author: Mark Dumay
title: Alert
date: 2023-12-29
description: Use the alert shortcode to display a contextual feedback message.
layout: docs
icon: fas triangle-exclamation
tags: component
---

## Overview

Use the `alert` shortcode to display a contextual feedback message. The inner content is used as alert text.

### Colored alert

Set `color` to one of the available theme colors to adjust the appearance of the alert.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* alert color="primary" */>}}
    A simple primary alert—check it out!
{{</* /alert */>}}

{{</* alert color="secondary" */>}}
    A simple secondary alert—check it out!
{{</* /alert */>}}

{{</* alert color="success" */>}}
    A simple success alert—check it out!
{{</* /alert */>}}

{{</* alert color="danger" */>}}
    A simple danger alert—check it out!
{{</* /alert */>}}

{{</* alert color="warning" */>}}
    A simple warning alert-check it out!
{{</* /alert */>}}

{{</* alert color="info" */>}}
    A simple info alert—check it out!
{{</* /alert */>}}

{{</* alert color="light" */>}}
    A simple light alert—check it out!
{{</* /alert */>}}

{{</* alert color="dark" */>}}
    A simple dark alert—check it out!
{{</* /alert */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Dismissible alert

Set `dismissible` to `true` to allow the user to dismiss the alert.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* alert color="danger" dismissible="true" */>}}
    A dismissible alert—check it out!
{{</* /alert */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Alert with icon

Add an `icon` family and attribute to include an icon in the alert. The alert is resized to size `2x` and pulled to the left by default.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* alert color="danger" icon="fas triangle-exclamation" */>}}
    An illustrated alert—check it out!
{{</* /alert */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Alert of specific type

Set `alert-type` to a specific type such as `info` or `danger` to quickly add an alert with an appropriate color and icon.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* alert alert-type="info" */>}}
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
ullamco laboris nisi ut aliquip ex ea commodo consequat.
{{</* /alert */>}}

{{</* alert alert-type="danger" */>}}
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum.
{{</* /alert */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

The file `assets/scss/components/_alert.scss` defines the Hinode-specific styling of the `alert` shortcode. Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/alert/#css) for additional styling options.

{{< file file="assets/scss/components/_alert.scss" show="false" >}}

## Arguments

The shortcode supports the following arguments:

{{< args structure="alert" group="shortcode" >}}
