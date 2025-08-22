---
_schema: default
title: Video message
description: >-
  Features a video with optional messages.
icon: fas circle-play
---

## Overview

The `video` content block renders a horizontal line to separate sections. The separator spans the entire page from edge to edge on smaller devices. On larger screens, the line is bound by the maximum container width that contains the section.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: video-message
  heading:
    preheading: Preheading
    title: Heading
    content: Video content. It supports multiple lines.
    align: start
  background:
    color: primary
    subtle: true
  orientation: horizontal
  icon-style: fa-lg
  video:
    provider: vimeo
    media-id: "55073825"
    autoplay: true
    color: black
  messages:
    - title: First Message
      icon: fas 1
    - title: Second Message
      icon: fas 2
    - title: Third Message
      icon: fas 3
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-video-message >}}
