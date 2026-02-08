---
_schema: default
title: Hero
description: >-
  Shows a hero banner on the top of the page. The section supports a background
  image with an overlay to improve contrast. The hero includes a headline and
  optional breadcrumb for site navigation.
icon: fas h
---

## Overview

### Basic hero

The `hero` content block renders a page hero, typically at the top of the page. Set `cover` to true to display a full-page hero.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: hero
  heading:
    title: Title
    align: start
    content: Hero content
    width: 12
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Illustrated hero

You can include an `illustration` next to the hero heading. Specify `orientation` and `order` to configure the illustration's placement. You can set `cover` to true to display a full-height hero. In horizontal layout, the image fills the width remaining next to the header (in sizes `1` to `12`).

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: hero
  background:
    color: body-tertiary
    subtle: false
  heading:
    title: Title
    align: start
    content: Hero content
    width: 10
  orientation: horizontal
  order: last
  illustration:
    image: /img/placeholder.png
    ratio: 1x1  
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Hero with breadcrumb

Set `breadcrumb` to `true` to add a breadcrumb to the top of the hero.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: hero
  heading:
    title: Title
    align: start
    content: Hero content
    width: 12
  breadcrumb: true
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Hero with backdrop

Adjust the background of the hero by configuring a `backdrop` that links to an image asset.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: hero
  heading:
    title: Title
    align: start
    content: Hero content
    width: 12
  background:
    backdrop: /assets/img/logan-voss-dAo9K7PG1kQ-unsplash.jpg
  breadcrumb: true
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-hero >}}
