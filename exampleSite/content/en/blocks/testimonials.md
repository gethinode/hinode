---
_schema: default
title: Testimonials
description: Use the testimonials content block to display one or more client testimonials.
icon: fa thumbs-up
---

## Overview

The `testimonials` content block renders one or more client testimonials. You can render them as a carousel or as columns.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: testimonials
  card:
    color: body-tertiary
    subtle: false
  cols: 1
  carousel: true
  testimonials:
    - icon: fab linkedin
      content: >-
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
        veritatis et quasi architecto beatae vitae dicta sunt explicabo.
      client:
        contact: First Last
        role: CTO
        url: https://linkedin.com/
        image: /img/jake-nackos-IF9TK5Uy-KI-unsplash.png
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-testimonials >}}

## Examples

### Carousel

Set `carousel` to `true` to render a carousel of multiple testimonials.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: testimonials
  card:
    color: body-tertiary
    subtle: false
  cols: 1
  carousel: true
  testimonials:
    - icon: fab linkedin
      content: First testimonial.
      link: /en/about/
    - icon: fab google
      content: Second testimonial.
      link: /en/about/
    - icon: fab github
      content: Third testimonial.
      link: /en/about/
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Columns

Set `cols` to `3` to render three testimonials as columns.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: testimonials
  card:
    color: body-tertiary
    subtle: false
  cols: 3
  icon_style: fa-2x
  carousel: false
  testimonials:
    - icon: fab linkedin
      content: First testimonial.
    - icon: fab google
      content: Second testimonial.
    - icon: fab github
      content: Third testimonial.
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->
