---
author: "Mark Dumay"
title: "Accordion"
date: 2023-01-05
description: "Use the accordion shortcode to show a group of vertically collapsing and expanding items."
group: components
layout: docs
---

## Overview

Use the `accordion` shortcode to show a group of vertically collapsing and expanding items. Add `accordion-item` inner elements for each accordion item. 

## Arguments

The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| class       | No  | Optional class attribute of the accordion element, e.g. “w-50”. |
{.table}

Add an inner `accordion-item` element for each item of the accordion. The `accordion-item` element supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| header      | Yes | Required header of the accordion element. |
| class       | No  | Optional class attribute of the inner accordion element, e.g. “show”. |
{.table}

## Example

As an example, the following shortcode displays an accordion with three elements, of which the first element is expanded.

```html
{{</* accordion */>}}
  {{</* accordion-item header="Accordion Item #1" class="show" */>}}
    This is the first item's accordion body. It supports HTML content. The item is shown by adding the value
    <code>show</code> to the <code>class</code> argument.
  {{</* /accordion-item */>}}
  {{</* accordion-item header="Accordion Item #2" */>}}
    This is the second item's accordion body. It too supports HTML content.
  {{</* /accordion-item */>}}
  {{</* accordion-item header="Accordion Item #3" */>}}
    This is the third item's accordion body.
  {{</* /accordion-item */>}}
{{</* /accordion */>}}
```

The result looks like this:

{{< accordion >}}
  {{< accordion-item header="Accordion Item #1" class="show" >}}
    This is the first item's accordion body. It supports HTML content. The item is shown by adding the value <code>show</code> to the <code>class</code> argument.
  {{< /accordion-item >}}
  {{< accordion-item header="Accordion Item #2" >}}
    This is the second item's accordion body. It too supports HTML content.
  {{< /accordion-item >}}
  {{< accordion-item header="Accordion Item #3" >}}
    This is the third item's accordion body.
  {{< /accordion-item >}}
{{< /accordion >}}
