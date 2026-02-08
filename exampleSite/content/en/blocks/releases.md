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
    color: body-tertiary
    subtle: false
  data: timeline
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Data

The releases block supports structured release data as input. The following file provides a language-specific example. Place this file in your site's data folder.

{{< file file="./exampleSite/data/timeline.en.yml" full=false >}}

## Arguments

The content block supports the following arguments:

{{< args bookshop-releases >}}
