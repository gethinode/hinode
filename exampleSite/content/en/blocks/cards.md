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
  icon-style: fa-xs
  padding: 0
  align: start
  elements:
    - title: First Card
      icon: fas 1
      content: Content of the first card
    - title: Second Card
      icon: fas 2
      content: Content of the second card
    - title: Third Card
      icon: fas 3
      content: Content of the third card
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-cards >}}

## Examples

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
    color: primary
    subtle: true
  orientation: stacked
  class: bg-body
  align: center
  elements:
    - title: First Card
      image: /img/nat-9l98kFByiao-unsplash.jpg
    - title: Second Card
      image: /img/nat-9l98kFByiao-unsplash.jpg
    - title: Third Card
      image: /img/nat-9l98kFByiao-unsplash.jpg
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
    color: primary
    subtle: true
  orientation: horizontal
  class: bg-body
  align: center
  elements:
    - title: First Card
      image: /img/nat-9l98kFByiao-unsplash.jpg
      content: Content of the first card
    - title: Second Card
      image: /img/nat-9l98kFByiao-unsplash.jpg
      content: Content of the second card
    - title: Third Card
      image: /img/nat-9l98kFByiao-unsplash.jpg
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
    color: primary
    subtle: true
  orientation: stacked
  icon-style: fa-xs text-primary
  align: start
  padding: 0
  elements:
    - title: First Card
      icon: fas 1
      content: Content of the first card
    - title: Second Card
      icon: fas 2
      content: Content of the second card
    - title: Third Card
      icon: fas 3
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
    color: primary
    subtle: true
  orientation: horizontal
  icon-rounded: true
  icon-style: fa-2xs text-primary
  align: start
  padding: 0
  elements:
    - title: First Card
      icon: fas 1
      content: Content of the first card
    - title: Second Card
      icon: fas 2
      content: Content of the second card
    - title: Third Card
      icon: fas 3
      content: Content of the third card
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->