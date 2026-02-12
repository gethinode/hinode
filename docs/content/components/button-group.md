---
author: Mark Dumay
title: Button Group
date: 2023-12-29
description: Use the button-group shortcode to display a group of buttons.
layout: docs
icon: fas ellipsis
tags: component
---

## Overview

Use the `button-group` shortcode to display a group of buttons. Add inner `<button>` elements for each [button component](button). As an example, the following shortcode displays a group of three buttons. See the [button component](button) for additional styling options.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button-group aria-label="Basic example" */>}}
  {{</* button color="primary" href="#!" */>}}Left{{</* /button */>}}
  {{</* button color="primary" href="#!" */>}}Middle{{</* /button */>}}
  {{</* button color="primary" href="#!" */>}}Right{{</* /button */>}}
{{</* /button-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/button-group/#css) for additional styling options.

## Arguments

The shortcode supports the following arguments:

{{< args structure="button-group" group="shortcode" >}}
