---
_schema: default
title: Approach
description: Use the approach content block to show a featured image with one or more steps.
icon: fas stairs
---

## Overview

The `approach` content block renders a featured image with one or more steps.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: approach
  heading:
    preheading: Preheading
    title: Heading
    content: Approach content. It supports multiple lines.
    align: start
  background:
    color: primary
    subtle: true
  illustration:
    image: /assets/img/nat-9l98kFByiao-unsplash.jpg
  orientation: stacked
  icon-rounded: false
  icon-style: fa-xs
  padding: 0
  align: start
  elements:
    - title: First Step
      icon: fas 1
      content: Content of the first card
    - title: Second Step
      icon: fas 2
      content: Content of the second card
    - title: Third Step
      icon: fas 3
      content: Content of the third card
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-approach >}}
