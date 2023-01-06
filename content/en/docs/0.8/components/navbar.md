---
author: "Mark Dumay"
title: "Navbar"
date: 2023-01-05
description: "Use the navbar shortcode to display a navigation header with a toggler."
group: components
---

## Overview

Use the `navbar` shortcode to display a navigation header with a toggler. The menu items are derived from the site's configuration. Nested items are supported at one-level depth. The navigation bar includes a search area and a language switcher if applicable. 

## Arguments

The shortcode supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| path      | Yes | Required path of the active page. |
| size      | No  | Optional breakpoint of the navbar toggler, either "xs", "sm", "md" (default), "lg", or "xl". |
| style     | No  | Optional style of the navbar, either "light" (default) or "dark". |
| color     | No  | Optional background color of the navbar, either "primary", "secondary", "success", "danger", "warning", "info", "light", or "dark". The default color is none. |
| search    | No  | Optional flag to include a search input, default is "true". |
{.table}

## Example

As an example, the following shortcode displays a light navigation header.

```html
{{</* navbar path="blog" color="light" */>}}
```

The result looks like this:

{{< navbar path="blog" color="light" size="sm" search="false" >}}