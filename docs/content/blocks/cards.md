---
_schema: default
title: Cards
description: Use the cards block to show a group of content cards.
icon: fa address-card
---

## Overview

The `cards` content block renders a group of content cards. You can define the card's content, including an illustration, using frontmatter inputs.

### Stacked cards with an image

Set the `image` attribute of each `element` to an image asset to render illustrated cards.

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
    color: body-tertiary
    subtle: false
  orientation: stacked
  class: bg-body
  align: center
  elements:
    - title: First Card
      image: /img/placeholder.png
    - title: Second Card
      image: /img/placeholder.png
    - title: Third Card
      image: /img/placeholder.png
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Horizontal cards with an image

Set the `orientation` attribute to `horizontal` to render horizontally oriented cards.

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
    color: body-tertiary
    subtle: false
  orientation: horizontal
  class: bg-body
  align: center
  elements:
    - title: First Card
      image: /img/placeholder.png
      content: Content of the first card
    - title: Second Card
      image: /img/placeholder.png
      content: Content of the second card
    - title: Third Card
      image: /img/placeholder.png
      content: Content of the third card
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Stacked cards with an icon

Set the `icon` attribute of each `element` to an icon to render illustrated cards. Adjust the icon's styling with `icon-rounded` and `icon-style`.

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
    color: body-tertiary
    subtle: false
  orientation: stacked
  icon-style: text-primary
  align: start
  padding: 0
  elements:
    - title: First Card
      icon: 1-circle
      content: Content of the first card
    - title: Second Card
      icon: 2-circle
      content: Content of the second card
    - title: Third Card
      icon: 3-circle
      content: Content of the third card
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Horizontal cards with an icon

Set the `icon` attribute of each `element` to an icon to render illustrated cards. Adjust the icon's styling with `icon-rounded` and `icon-style`.

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
    color: body-tertiary
    subtle: false
  orientation: horizontal
  icon-style: text-primary
  align: start
  padding: 0
  elements:
    - title: First Card
      icon: 1-circle-fill
      content: Content of the first card
    - title: Second Card
      icon: 2-circle-fill
      content: Content of the second card
    - title: Third Card
      icon: 3-circle-fill
      content: Content of the third card
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-cards >}}
