---
_schema: default
title: CTA
description: Use the CTA content block to display an action link with an optional contact.
icon: fas address-card
---

## Overview

### Default message

The `cta` content block renders a call to action message with a button. By default, the `cta` uses a generic title and message.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: cta
  background:
    color: body-tertiary
    subtle: false
  links:
    - title: Get in touch
      url: '#!'
      icon: fas chevron-right
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Custom message

Set the `heading` attribute to override the default message title and content.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: cta
  heading:
    title: Custom title
    content: Call to action content
  background:
    color: body-tertiary
    subtle: false
  links:
    - title: Get in touch
      url: '#!'
      icon: fas chevron-right
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Contact CTA

Provide a `contact` person to include the name and thumbnail of a contact person associated with the call to action. Set `caption-url` to provide a specific link when clicking on the person.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: cta
  contact: Betty White
  caption-url: /en/blocks/cta/
  background:
    color: body-tertiary
    subtle: false
  order: first
  links:
    - title: Get in touch
      url: '#!'
      icon: fas chevron-right
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Data

The CTA block supports structured contact data as input. Provide this data in `data/contacts.yml`.

```yml
- name: Betty White
  preferred: Betty
  image: /assets/img/jake-nackos-IF9TK5Uy-KI-unsplash.png
  function: UX Expert
  linkedin: https://www.linkedin.com
  keywords:
    - experience
  biography: >-
    Biography content.
```

For multi-language sites, you can add a language indicator to the filename such as `data/contacts.en.yml`. This data is merged with `data/contacts.yml`, where the former file takes precedence.

```yml
- name: Betty White
  biography: >-
    Language-specific biography
```

## Arguments

The content block supports the following arguments:

{{< args bookshop-cta >}}
