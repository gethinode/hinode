---
author: Mark Dumay
title: Bienvenue sur Hinode!
description: Un thème de blog et de documentation pour Hugo basé sur Bootstrap 5.
content_blocks:
  - _bookshop_name: hero
    heading:
      title: Bienvenue sur Hinode!
      content: |-
        Un thème de blog et de documentation pour Hugo basé sur Bootstrap 5.
      width: 6
    background:
      color: primary
      subtle: true
    illustration:
      image: /img/sunrise.jpg
      ratio: 16x9
    width: 8
    links:
      - title: À propos
        url: "/fr/a-propos/"
        icon: fas chevron-right
    orientation: horizontal
    justify: center

  - _bookshop_name: articles
    heading:
      title: Articles de blog
      align: start
    input:
      section: blog
      reverse: true
      sort: date
      keywords: featured
    hide-empty: false
    header-style: none
    more:
      title: Plus d'articles
    padding: 0
    limit: 3
    class: border-0 card-zoom card-body-margin

  - _bookshop_name: articles
    heading:
      title: Projets
      align: start
    background:
      background: body-tertiary
    hide-empty: false
    input:
      section: projects
      reverse: false
      sort: date
    more:
      title: Plus d'articles
    cols: 1
    padding: 4
    limit: 2
    icon-style: fa-5x
    header-style: none
    footer-style: tags
    orientation: horizontal-sm
    class: border-1 card-emphasize
---
