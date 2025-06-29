---
_schema: default
title: About
description: Use the about content block to display a lead text next to a featured illustration.
icon: fas info
---

## Overview

The `about` content block renders a short message next to an illustration. You can add optional links or buttons below the message.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: about
  heading:
    preheading: Preheading
    title: Heading
    content: Content
    align: start
    width: 8
  background:
    color: primary
    subtle: true
  illustration:
    image: /assets/img/nat-9l98kFByiao-unsplash.jpg
    ratio: 1x1
  link-type: link
  links:
    - title: First link
      url: 'about'
      icon: fas chevron-right
      force: true
    - title: Second link
      url: 'blog/bootstrap-elements/#docs'
      icon: fas chevron-right
    - title: Third link
      url: 'https://google.com'
  order: first
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-about >}}
