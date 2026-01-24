---
_schema: default
title: Featured
description: Use the featured content block to feature a specific article or downloadable asset.
icon: fas fire
---

## Overview

The `featured` content block renders a featured article or downloadable asset.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: featured
  heading:
    preheading: Preheading
    title: Heading
    content: Content
    align: start
  background:
    color: body-tertiary
    subtle: false
  illustration:
    image: /assets/img/nat-9l98kFByiao-unsplash.jpg
    ratio: 1x1
  links:
    - title: Download
      download: /static/img/logo.png
  order: first
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-featured >}}
