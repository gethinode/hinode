---
author: Mark Dumay
title: Welcome to Hinode!
description: A clean documentation and blog theme for your Hugo site based on Bootstrap 5.
content_blocks:
  - _bookshop_name: hero
    heading:
      title: Welcome to Hinode!
      content: |-
        A clean documentation and blog theme for your Hugo site based on Bootstrap 5.
      align: start
    background:
      color: primary
      subtle: true
    illustration:
      image: /img/sunrise.jpg
      ratio: 16x9
      width: 8
    width: 6
    links:
      - title: About
        url: about
        icon: fas chevron-right
    orientation: horizontal

  - _bookshop_name: articles
    heading:
      title: Blog
      align: start
    input:
      section: blog
      reverse: true
      sort: date
      keywords: featured
    hide-empty: false
    header-style: none
    more:
      title: More Posts
    padding: 0
    max: 3
    class: border-0 card-zoom card-body-margin

  - _bookshop_name: articles
    heading:
      title: Projects
      align: start
    background:
      background: body-tertiary
    hide-empty: false
    input:
      section: projects
      reverse: false
      sort: date
    more:
      title: More articles
    cols: 1
    padding: 4
    max: 2
    header-style: none
    footer-style: tags
    orientation: horizontal-sm
    class: border-1 card-emphasize
---
