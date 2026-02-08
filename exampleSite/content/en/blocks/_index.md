---
title: Blocks
description: Available blocks
date: 2025-05-13
content_blocks:
  - _bookshop_name: hero
    heading:
      title: Blocks
      content: >-
        Hinode uses [Bookshop](https://github.com/CloudCannon/bookshop) to
        support so-called content blocks, or blocks in short. Blocks are
        reusable page elements, such as a hero, about panel, or an FAQ.
        Hinode includes several ready-to-use blocks. Click on a card for
        more details about a block, including its frontmatter configuration.
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
      title: More Blocks
    cols: 5
    padding: 0
    paginate: true
    pagination: 25
    cover: false
    header-style: none
    body-style: minimal
    class: card-minimal
---
