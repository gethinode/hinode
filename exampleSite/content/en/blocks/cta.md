---
_schema: default
title: CTA
description: Use the CTA content block to display an action link with an optional contact.
icon: fas address-card
---

## Overview

The `cta` content block renders a call to action link or button. You can include an optional contact or provide your own illustration. By default, the `cta` uses a generic title and message. Set the `heading` attribute to override these values.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: cta
  contact: Betty White
  caption-url: /en/blocks/cta/
  background:
    color: primary
    subtle: true
  order: first
  links:
    - title: Get in touch
      url: '#!'
      icon: fas chevron-right
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-cta >}}
