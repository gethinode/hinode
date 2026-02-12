---
_schema: default
title: Featured
description: Use the featured content block to feature a specific article or downloadable asset.
icon: fas fire
---

## Overview

### Featured article

Set the `url` of a link to include a button that redirects to a content page.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: featured
  heading:
    preheading: Preheading
    title: Heading
    content: Content
    align: start
  background:
    color: body-tertiary
    subtle: false
  illustration:
    image: /img/placeholder.png
    ratio: 1x1
  links:
    - title: Featured
      url: /en/blocks/featured
  order: first
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Featured download

Set the `download` of a link to include a button that downloads a media asset to the user's device.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: featured
  heading:
    preheading: Preheading
    title: Heading
    content: Content
    align: start
  background:
    color: body-tertiary
    subtle: false
  illustration:
    image: /img/placeholder.png
    ratio: 1x1
  links:
    - title: Download
      download: /static/img/logo.png
  order: first
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-featured >}}
