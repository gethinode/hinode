---
_schema: default
title: Cards
description: Use the cards content block to show a card group of messages.
icon: fa address-card
---

## Overview

The `cards` content block renders a group of content cards.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: cards
  heading:
    preheading: Preheading
    title: Heading
    content: Cards content. It supports multiple lines.
    align: start
  background:
    color: primary
    subtle: true
  orientation: stacked
  icon-rounded: true
  class: text-center
  elements:
    - title: First Card
      icon: fas 1
    - title: Second Card
      icon: fas 2
    - title: Third Card
      icon: fas 3
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-cards >}}
