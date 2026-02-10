---
_schema: default
title: About
description: Use the about content block to display a lead text next to a featured illustration.
icon: fas info
---

## Overview

The `about` content block renders a short message next to an illustration. You can add optional links or buttons below the message.

### Image first

Set `order` to `first` to show the illustration before the heading.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: about
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
  order: first
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Image last

Set `order` to `last` to show the illustration after the heading.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: about
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
  order: last
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Links

Set `link-type` to `link` to add links below the content.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: about
  heading:
    title: Heading
    content: Content
    align: start
  background:
    color: body-tertiary
    subtle: false
  illustration:
    image: /img/placeholder.png
    ratio: 1x1
  order: first
  link-type: link
  links:
    - title: First link
      url: 'about'
      icon: fas chevron-right
      force: true
    - title: Second link
      url: 'components/image/#args/'
      icon: fas chevron-right
    - title: Third link
      url: 'https://google.com'
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Buttons

Set `link-type` to `button` to add buttons below the content. You can adjust the style of the button by setting `outline` to `true`.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: about
  heading:
    title: Heading
    content: Content
    align: start
  background:
    color: body-tertiary
    subtle: false
  illustration:
    image: /img/placeholder.png
    ratio: 1x1
  order: first
  link-type: button
  links:
    - title: Primary button
      url: 'about'
      icon: fas chevron-right
      force: true
    - title: Outline button
      url: 'https://google.com'
      outline: true
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-about >}}
