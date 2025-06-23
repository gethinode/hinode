---
_schema: default
title: Articles
description: Use the articles content block to show a group of article cards.
icon: fas grip
---

## Overview

The `articles` content block renders a group of article cards.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: articles
  heading:
    title: Blog
    align: start
  input:
    section: blog
    reverse: false
    sort: title
  hide-empty: false
  header-style: none
  more:
    title: More Blogs
  padding: 0
  limit: 3
  background:
    color: primary
    subtle: true
  class: border-0 card-zoom card-body-margin
  justify: start
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-articles >}}
