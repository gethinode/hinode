---
author: Mark Dumay
title: Accordion
date: 2023-12-29
description: Use the accordion shortcode to show a group of vertically collapsing and expanding items.
layout: docs
icon: fas chevron-down
tags: component
---

## Overview

Use the `accordion` shortcode to show a group of vertically collapsing and expanding items. Add `accordion-item` inner elements for each accordion item.

### Flush

Add `.accordion-flush` to the `class` attributes to remove some borders and rounded corners to render accordions edge-to-edge within their parent container.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* accordion id="accordion-flush" class="accordion-flush" */>}}
  {{</* accordion-item title="Accordion Item #1" */>}}
    This is the first item's accordion body. It supports Markdown content. The item is shown by
    adding the value `show` to the `class` argument.
  {{</* /accordion-item */>}}
  {{</* accordion-item title="Accordion Item #2" */>}}
    This is the second item's accordion body. It too supports Markdown content.
  {{</* /accordion-item */>}}
  {{</* accordion-item title="Accordion Item #3" */>}}
    This is the third item's accordion body.
  {{</* /accordion-item */>}}
{{</* /accordion */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Always open

Set `always-open` to `true` to make accordion items stay open when another item is opened.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* accordion id="accordion-always-open" always-open="true" */>}}
  {{</* accordion-item title="Accordion Item #1" */>}}
    This is the first item's accordion body. It supports Markdown content. The item is shown by
    adding the value `show` to the `class` argument.
  {{</* /accordion-item */>}}
  {{</* accordion-item title="Accordion Item #2" */>}}
    This is the second item's accordion body. It too supports Markdown content.
  {{</* /accordion-item */>}}
  {{</* accordion-item title="Accordion Item #3" */>}}
    This is the third item's accordion body.
  {{</* /accordion-item */>}}
{{</* /accordion */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/accordion/#css) for additional styling options.

## Arguments

The shortcode supports the following arguments:

{{< args structure="accordion" group="shortcode" >}}

Add an inner `accordion-item` element for each item of the accordion. The `accordion-item` element supports the following arguments:

{{< args structure="accordion-item" group="shortcode" >}}
