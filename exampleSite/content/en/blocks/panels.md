---
_schema: default
title: Panels
description: Use the panels content block to display multiple toggable panels.
icon: fa folder
---

## Overview

The `panels` content block displays multiple panels that are toggled by a tab control.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: panels
  heading:
    preheading: Preheading
    title: Heading
    content: Panels content. It supports multiple lines.
    align: start
  background:
    color: primary
    subtle: true
  width: 12
  tab-type: underline
  ratio: 1x1
  elements:
    - title: First Panel
      image: /img/sunrise.jpg
      content: content 1
    - title: Second Panel
      image: /img/nat-9l98kFByiao-unsplash.jpg
      content: content 2
    - title: Third Panel
      image: /img/pj-accetturo-XpD6Dkui-yg-unsplash.jpg
      content: content 3
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-panels >}}

## Examples

### Tabs

Set `tab-type` to `tabs` to adjust the panel controls.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: panels
  heading:
    preheading: Preheading
    title: Heading
    content: Panels content. It supports multiple lines.
    align: start
  background:
    color: primary
    subtle: true
  width: 12
  tab-type: tabs
  ratio: 1x1
  elements:
    - title: First Panel
      image: /img/sunrise.jpg
      content: content 1
    - title: Second Panel
      image: /img/nat-9l98kFByiao-unsplash.jpg
      content: content 2
    - title: Third Panel
      image: /img/pj-accetturo-XpD6Dkui-yg-unsplash.jpg
      content: content 3
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Pills

Set `tab-type` to `pills` to adjust the panel controls.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: panels
  heading:
    preheading: Preheading
    title: Heading
    content: Panels content. It supports multiple lines.
    align: start
  background:
    color: primary
    subtle: true
  width: 12
  tab-type: pills
  ratio: 1x1
  elements:
    - title: First Panel
      image: /img/sunrise.jpg
      content: content 1
    - title: Second Panel
      image: /img/nat-9l98kFByiao-unsplash.jpg
      content: content 2
    - title: Third Panel
      image: /img/pj-accetturo-XpD6Dkui-yg-unsplash.jpg
      content: content 3
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Underline

Set `tab-type` to `underline` to adjust the panel controls.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: panels
  heading:
    preheading: Preheading
    title: Heading
    content: Panels content. It supports multiple lines.
    align: start
  background:
    color: primary
    subtle: true
  width: 12
  tab-type: underline
  ratio: 1x1
  elements:
    - title: First Panel
      image: /img/sunrise.jpg
      content: content 1
    - title: Second Panel
      image: /img/nat-9l98kFByiao-unsplash.jpg
      content: content 2
    - title: Third Panel
      image: /img/pj-accetturo-XpD6Dkui-yg-unsplash.jpg
      content: content 3
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Callout

Set `tab-type` to `callout` to adjust the panel controls.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: panels
  heading:
    preheading: Preheading
    title: Heading
    content: Panels content. It supports multiple lines.
    align: start
  background:
    color: primary
    subtle: true
  width: 12
  tab-type: callout
  ratio: 1x1
  elements:
    - title: First Panel
      image: /img/sunrise.jpg
      content: content 1
    - title: Second Panel
      image: /img/nat-9l98kFByiao-unsplash.jpg
      content: content 2
    - title: Third Panel
      image: /img/pj-accetturo-XpD6Dkui-yg-unsplash.jpg
      content: content 3
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->