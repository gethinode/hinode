---
author: "Mark Dumay"
title: "Navbar"
date: 2023-01-05
description: "Use the navbar shortcode to display a navigation header with a toggler."
group: components
layout: docs
---

## Overview

Use the `navbar` shortcode to display a navigation header with a toggler. The menu items are derived from the site's configuration, which defaults to the menus defined under `main`. Nested items are supported at one-level depth. The navigation bar includes a search area and a language switcher if applicable. The items in the navigation header are accentuated if the current page or any of its descendants is active.

<!-- TODO: add sidebar -->

## Arguments

The shortcode supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| path      | Yes | Required path of the active page. |
| menus     | No  | Optional name of the menu configuration, defaults to "main". |
| size      | No  | Optional breakpoint of the navbar toggler, either "xs", "sm", "md" (default), "lg", or "xl". |
| style     | No  | Optional style of the navbar, either "light" (default) or "dark". |
| color     | No  | Optional background color of the navbar, either "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "white" or "black". The default color is none. |
| search    | No  | Optional flag to include a search input, defaults to the parameter "logo" set in the "navigation" section of the site's parameter configuration. |
| logo      | No  | Optional address of the logo image, defaults to the parameter "logo" set in the "navigation" section of the site's parameter configuration. |
| title     | No  | Optional brand title, displayed when the logo is not set. Defaults to the site's title. |
{.table}

## Example

As an example, the following shortcode displays a light navigation header.

```html
{{</* navbar path="blog" color="light" size="sm" search="false" menus="sample" title="Brand" */>}}
```

The result looks like this:

{{< navbar path="blog" color="light" size="sm" search="false" menus="sample" title="Brand" >}}
