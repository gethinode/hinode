---
_schema: default
title: Releases
description: Use the releases content block to display a timeline with release information.
icon: fas timeline fa-rotate-90
---

## Overview

The `releases` content block displays a timeline with release information.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: releases
  heading:
    preheading: Preheading
    title: Heading
    content: Content
    align: start
    width: 8
  background:
    color: primary
    subtle: true
  data: timeline
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-releases >}}
