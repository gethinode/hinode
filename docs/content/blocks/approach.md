---
_schema: default
title: Approach
description: Use the approach block to show a featured image with one or more steps.
icon: stairs
---

## Overview

The `approach` block renders a featured image with one or more steps.

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
    color: body-tertiary
    subtle: false
  illustration:
    image: /img/placeholder.png
  orientation: stacked
  icon_style: text-primary
  padding: 0
  align: start
  elements:
    - title: First Step
      icon: 1-circle
      content: Content of the first card
    - title: Second Step
      icon: 2-circle
      content: Content of the second card
    - title: Third Step
      icon: 3-circle
      content: Content of the third card
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-approach >}}
