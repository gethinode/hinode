---
author: Mark Dumay
title: Navs and tabs
date: 2023-12-30
description: Use the nav shortcode to show a group of multiple tab panes.
layout: docs
icon: fa folder
tags: component
---

## Overview

{{< release version="v0.11.8" >}}

Use the `nav` shortcode to show a group of multiple tab panes. Add `nav-item` inner elements for each tab pane.

### Horizontal alignment

By default, navs are left-aligned, but you can easily change them to center or right aligned.

Centered with `.justify-content-center`:

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* nav class="justify-content-center" */>}}
  {{</* nav-item title="Nav Item #1" show="true" /*/>}}
  {{</* nav-item title="Nav Item #2" /*/>}}
  {{</* nav-item title="Nav Item #3" disabled="true" /*/>}}
{{</* /nav */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Right-aligned with `.justify-content-end`:

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* nav class="justify-content-end" */>}}
  {{</* nav-item title="Nav Item #1" show="true" /*/>}}
  {{</* nav-item title="Nav Item #2" /*/>}}
  {{</* nav-item title="Nav Item #3" disabled="true" /*/>}}
{{</* /nav */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Vertical

Stack your navigation by setting `vertical` to `true`.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* nav vertical="true" id="vertical-1" */>}}
  {{</* nav-item title="Nav Item #1" show="true" */>}}
    This is the first item's nav body. It supports Markdown content. The item is shown by adding
    the value `show` to the `class` argument.
  {{</* /nav-item */>}}
  {{</* nav-item title="Nav Item #2" */>}}
    This is the second item's nav body. It too supports HTML content.
  {{</* /nav-item */>}}
  {{</* nav-item title="Nav Item #3" disabled="true" /*/>}}
{{</* /nav */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Tabs

Takes the basic nav from above and generates a tabbed interface by setting `type` to `tabs`. The inner content of each `nav-item` is rendered within a linked tab pane. The content supports embedded HTML.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* nav tab-type="tabs" id="tabs-1" */>}}
  {{</* nav-item title="Nav Item #1" show="true" */>}}
    This is the first item's nav body. It supports Markdown content. The item is shown by adding
    the value `show` to the `class` argument.
  {{</* /nav-item */>}}
  {{</* nav-item title="Nav Item #2" */>}}
    This is the second item's nav body. It too supports HTML content.
  {{</* /nav-item */>}}
  {{</* nav-item title="Nav Item #3" disabled="true" /*/>}}
{{</* /nav */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Pills

Take that same HTML, but using `pills` instead:

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* nav tab-type="pills" id="pills-1" */>}}
  {{</* nav-item title="Nav Item #1" show="true" */>}}
    This is the first item's nav body. It supports Markdown content. The item is shown by adding
    the value `show` to the `class` argument.
  {{</* /nav-item */>}}
  {{</* nav-item title="Nav Item #2" */>}}
    This is the second item's nav body. It too supports HTML content.
  {{</* /nav-item */>}}
  {{</* nav-item title="Nav Item #3" disabled="true" /*/>}}
{{</* /nav */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Underline

Take that same HTML, but using `underline` instead:

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* nav tab-type="underline" id="underline-1" */>}}
  {{</* nav-item title="Nav Item #1" show="true" */>}}
    This is the first item's nav body. It supports Markdown content. The item is shown by adding
    the value `show` to the `class` argument.
  {{</* /nav-item */>}}
  {{</* nav-item title="Nav Item #2" */>}}
    This is the second item's nav body. It too supports HTML content.
  {{</* /nav-item */>}}
  {{</* nav-item title="Nav Item #3" disabled="true" /*/>}}
{{</* /nav */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Callout

{{< release version="v0.21.0" >}}

Take that same HTML, but using `callout` instead:

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* nav tab-type="callout" id="callout-1" */>}}
  {{</* nav-item title="Nav Item #1" show="true" */>}}
    This is the first item's nav body. It supports Markdown content. The item is shown by adding
    the value `show` to the `class` argument.
  {{</* /nav-item */>}}
  {{</* nav-item title="Nav Item #2" */>}}
    This is the second item's nav body. It too supports HTML content.
  {{</* /nav-item */>}}
  {{</* nav-item title="Nav Item #3" disabled="true" /*/>}}
{{</* /nav */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Fill and justify

To proportionately fill all available space with your `.nav-items`, use `.nav-fill`. Notice that all horizontal space is occupied, but not every nav item has the same width.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* nav tab-type="pills" class="nav-fill" */>}}
  {{</* nav-item title="Nav Item #1" show="true" /*/>}}
  {{</* nav-item title="Much longer nav item #2" /*/>}}
  {{</* nav-item title="Nav Item #3" disabled="true" /*/>}}
{{</* /nav */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

For equal-width elements, use `.nav-justified`. All horizontal space will be occupied by nav links, but unlike the `.nav-fill` above, every nav item will be the same width.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* nav tab-type="pills" class="nav-justified" */>}}
  {{</* nav-item title="Nav Item #1" show="true" /*/>}}
  {{</* nav-item title="Much longer nav item #2" /*/>}}
  {{</* nav-item title="Nav Item #3" disabled="true" /*/>}}
{{</* /nav */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

The file `assets/scss/components/_nav.scss` defines the Hinode-specific styling of the `nav` shortcode. Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/navs-tabs/#css) for additional styling options.

{{< file file="assets/scss/components/_nav.scss" show="false" >}}

## Arguments

The shortcode supports the following arguments:

{{< args structure="nav" group="shortcode" >}}

In addition, the following arguments are passed to the individual navigation items.

{{< args structure="nav-item" group="shortcode" parent="true" render-type="arguments" >}}

Add an inner `nav-item` element for each item of the tab group. The `nav-item` element supports the following arguments:

{{< args structure="nav-item" group="shortcode" render-type="both" >}}
