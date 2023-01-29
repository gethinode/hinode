---
author: Mark Dumay
title: Accordion
date: 2023-01-28
description: Use the accordion shortcode to show a group of vertically collapsing and expanding items.
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
| class       | No  | Optional class attribute of the inner accordion element. |
| show        | No  | Optional flag to indicate an item should be shown as collapsed. |
{.table}

## Example

As an example, the following shortcode displays an accordion with three elements, of which the first element is expanded.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* accordion */>}}
  {{</* accordion-item header="Accordion Item #1" show="true" */>}}
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
{{< /example >}}
<!-- markdownlint-enable MD037 -->
