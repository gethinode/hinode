---
title: Content blocks
description: Available content blocks
date: 2025-05-13
content_blocks:
  - _bookshop_name: hero
    heading:
      title: Content blocks
      content: >-
        Hinode uses [Bookshop](https://github.com/CloudCannon/bookshop) to
        support so-called content blocks. Content blocks are reusable page
        elements, such as a hero, about panel, or an FAQ. Hinode includes
        several ready-to-use blocks. Click on a card for more details about
        a content block, including its frontmatter configuration.
      align: start
      width: 8
    breadcrumb: true

  - _bookshop_name: articles
    hide-empty: false
    input:
      section: blocks
      reverse: true
      sort: date
    more:
      title: More Posts
    cols: 3
    padding: 3
    limit: 9
    paginate: true
    cover: false
    header-style: none
    class: border-1
---
