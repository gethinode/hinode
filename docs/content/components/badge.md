---
author: Mark Dumay
title: Badge
date: 2023-12-29
description: Use the badge shortcode to enrich headings.
layout: docs
icon: fas envelope-circle-check
tags: component
---

## Overview

{{< release version="v0.19.0" >}}

Badges can be added to headings. Check the [button](button) component on how to add a badge to a button.

### Heading badges

Badges scale to match the size of the immediate parent element by using relative font sizing and em units. Use Hugo's [curly brackets syntax](https://gohugo.io/getting-started/configuration-markup/#goldmark) to apply a heading class.

<!-- markdownlint-disable MD037 -->
{{< example >}}
Heading 1 {{</* badge title="New" */>}}
{.h1}

Heading 2 {{</* badge title="New" */>}}
{.h2}

Heading 3 {{</* badge title="New" */>}}
{.h3}

Heading 4 {{</* badge title="New" */>}}
{.h4}

Heading 5 {{</* badge title="New" */>}}
{.h5}

Heading 6 {{</* badge title="New" */>}}
{.h6}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Colored badges

Set a background color with contrasting foreground color with the `color` argument.

<!-- markdownlint-disable MD037 -->
{{< example >}}
{{</* badge title="primary" color="primary" */>}}
{{</* badge title="secondary" color="secondary" */>}}
{{</* badge title="success" color="success" */>}}
{{</* badge title="danger" color="danger" */>}}
{{</* badge title="warning" color="warning" */>}}
{{</* badge title="info" color="info" */>}}
{{</* badge title="light" color="light" */>}}
{{</* badge title="dark" color="dark" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Pill badges

Use the `.rounded-pill` utility class to make badges more rounded with a larger `border-radius`.

<!-- markdownlint-disable MD037 -->
{{< example >}}
{{</* badge title="primary" color="primary" class="rounded-pill" */>}}
{{</* badge title="secondary" color="secondary" class="rounded-pill" */>}}
{{</* badge title="success" color="success" class="rounded-pill" */>}}
{{</* badge title="danger" color="danger" class="rounded-pill" */>}}
{{</* badge title="warning" color="warning" class="rounded-pill" */>}}
{{</* badge title="info" color="info" class="rounded-pill" */>}}
{{</* badge title="light" color="light" class="rounded-pill" */>}}
{{</* badge title="dark" color="dark" class="rounded-pill" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/badge/#css) for additional styling options.

## Arguments

The shortcode supports the following arguments:

{{< args structure="badge" group="shortcode" >}}
