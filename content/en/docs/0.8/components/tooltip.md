---
author: Mark Dumay
title: Tooltip
date: 2023-01-28
description: Use the toast shortcode to display a dismissable message in the bottom-right corner of the screen.
group: components
layout: docs
---

## Overview

Use the `tooltip` shortcode to display a tooltip for a hyperlink. Refer to the [button]({{< ref "#button" >}} "button") on how to display a tooltip for a button instead. The inner content is used as hyperlink text.

## Arguments

The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| color       | No   | Optional theme color of the element, either "primary" (default), "secondary", "success", "danger",  "warning", "info", "light", "dark", "white" or "black". |
| title       | Yes  | Title to display in the tooltip. |
| href        | Yes  | Address for the button or hyperlink. |
| placement   | No   | How to position the tooltip: "top" (default), "bottom", "left", or "right". |
{.table}

## Example

As an example, the following shortcode displays a tooltip for a colored hyperlink.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* tooltip color="warning" title="Tooltip" href="#" */>}}
    Tooltip demonstration
{{</* /tooltip */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
