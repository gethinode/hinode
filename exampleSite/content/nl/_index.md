---
author: Mark Dumay
title: Welkom bij Hinode!
description: Een documentatie en blog thema voor Hugo gebaseerd op Bootstrap 5.
content_blocks:
  - _bookshop_name: hero
    heading:
      title: Welkom bij Hinode!
      content: |-
        Een documentatie en blog thema voor Hugo gebaseerd op Bootstrap 5.
      width: 6
    background:
      color: primary
      subtle: true
    illustration:
      image: /img/sunrise.jpg
      ratio: 16x9
    width: 8
    links:
      - title: "Over mij"
        url: "/nl/over-mij/"
        icon: fas chevron-right
    orientation: horizontal
    justify: center

  - _bookshop_name: articles
    heading:
      title: Blog
      align: start
    input:
      section: blog
      reverse: true
      sort: date
    hide-empty: false
    header-style: none
    more:
      title: Meer artikelen
    padding: 0
    limit: 3
    class: border-0 card-zoom card-body-margin

  - _bookshop_name: articles
    heading:
      title: Projecten
      align: start
    background:
      background: body-tertiary
    hide-empty: false
    input:
      section: projects
      reverse: false
      sort: date
    more:
      title: Meer artikelen
    cols: 1
    padding: 4
    limit: 2
    icon-style: fa-5x
    header-style: none
    footer-style: tags
    orientation: horizontal-sm
    class: border-1 card-emphasize
---
