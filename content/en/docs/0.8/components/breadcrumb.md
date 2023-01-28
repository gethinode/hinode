---
author: Mark Dumay
title: Breadcrumb
date: 2023-01-28
description: Use the breadcrumb shortcode to display the current page’s location within the site's navigational hierarchy.
group: components
layout: docs
---

## Overview

Use the `breadcrumb` shortcode to display the current page’s location within the site's navigational hierarchy.

## Arguments

The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| path        | No       | Optional path of the page, defaults to current page.
{.table}

## Example

As an example, the following shortcode displays a breadcrumb for the current page.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* breadcrumb path="breadcrumb" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
