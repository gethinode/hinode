---
title: Blocks Demo
description: A single page that carries both content blocks and regular page content.
showComments: false
content_blocks:
  - _bookshop_name: heading
    heading:
      title: A block on a page with content
      content: >-
        Blocks render above the page header, so on a page that also carries
        content their titles are subsections and the page title below them
        remains the only h1.
  - _bookshop_name: cards
    heading:
      title: What the blocks look like
    cols: 2
    elements:
      - title: Level from the page
        icon: fas layer-group
        content: >-
          A page template hands its blocks a heading level. A list page renders
          no header, so its first titled block opens the page. This page renders
          a header, so its blocks start one level down.
      - title: Level from the block
        icon: fas sliders
        content: >-
          A block can set `heading_level` itself to pin a level, or `0` to keep
          the plain division it rendered before heading levels existed.
---

## Regular page content

Everything above this heading comes from `content_blocks` in the front matter.
Everything from here down is ordinary Markdown, rendered through the page
header and body.

The page title is the `h1`. The two block titles above are `h2`, and this
heading is an `h2` as well, so the page carries exactly one `h1` and skips no
levels.
