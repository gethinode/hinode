---
_schema: default
title: Menu
description: Use the menu content block to render a grid of level 1 and level 2 menu items.
icon: fas bars
---

## Overview

The `menu` content block renders a grid of level 1 and level 2 menu items.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
  - _bookshop_name: menu
    menu: services
    menu-style: grid
    icon-rounded: true
    icon-style: fa-1x
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-menu >}}

## Menu data

The menu content block uses regular [Hugo menu data](https://gohugo.io/methods/site/menus/) as input. Use the `menu` property to assign a specific menu configuration. The panel below shows the (abbreviated) example data used on this page.

{{< docs name="sample-menu" file="config/_default/menus/menus.en.toml" >}}

## Examples

### Grid layout

Set `menu-style: grid` to render a responsive menu as a grid.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
  - _bookshop_name: menu
    menu: services
    menu-style: grid
    icon-rounded: true
    icon-style: fa-1x
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Masonry layout

Set `menu-style: masonry` to render a responsive menu using masonry style.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
  - _bookshop_name: menu
    menu: services
    menu-style: masonry
    icon-rounded: true
    icon-style: fa-1x
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->
