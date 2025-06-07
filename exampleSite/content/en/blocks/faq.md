---
_schema: default
title: FAQ
description: >-
  Shows an accordion of frequently asked questions. Clicking on a question
  reveals the answer interactively.
icon: fas circle-question
---

## Overview

The `FAQ` content block renders an accordion of frequently asked questions. Clicking on a question reveals the answer interactively.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: faq
  heading:
    preheading: Preheading
    title: Heading
    content: >-
      Section content. It supports multiple lines.
  background:
    color: primary
    subtle: true
  items:
    - title: First item
      description: |-
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
        efficitur nulla at tortor mattis pharetra.
    - title: Second item
      description: >-
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sagittis
        sit amet nulla sit amet efficitur.
    - title: Third item
      description: >-
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a quam
        lobortis, sodales dolor eu, posuere elit.
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-faq >}}
