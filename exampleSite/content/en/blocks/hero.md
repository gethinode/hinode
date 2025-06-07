---
_schema: default
title: Hero
description: >-
  Shows a hero banner on the top of the page. The section supports a background
  image with an overlay to improve contrast. The hero includes a headline and
  optional breadcrumb for site navigation.
icon: fas h
---

## Overview

The `hero` content block renders a page hero, typically at the top of the page. Set `cover` to true to display a full-page hero.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: hero
  heading:
    title: Title
    align: start
    content: Hero content
    width: 12
  background:
    backdrop: /assets/img/nat-9l98kFByiao-unsplash.jpg
  breadcrumb: true
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-hero >}}
