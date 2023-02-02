---
author: Mark Dumay
title: Icon
date: 2023-02-02
description: Use the fa shortcode to add a Font Awesome icon with ease.
group: components
layout: docs
---

## Overview

Use the `fa` shortcode to quickly add a Font Awesome icon to your content. Use `fa` for regular icons, `fab` for brand icons, and `fas` for solid icons.

## Arguments

The shortcode supports unnamed arguments only and requires at least one argument. The first argument is used as the icon name without the `fa-` prefix. Additional (unnamed) arguments are passed as `class` attributes to the inner HTML element.

## Example

As an example, the following shortcodes show a square check, a brand logo, and a circle check.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fa square-check */>}}
{{</* fab linkedin */>}}
{{</* fas circle-check */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
