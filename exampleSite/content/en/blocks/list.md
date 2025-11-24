---
_schema: default
title: List
description: Use the list content block to show a list of articles.
icon: fas list
modules: ["simple-datatables"]
---

## Overview

The `list` content block renders a list of articles. Add the following configuration to your page's frontmatter to enable data table features:

```yml
---
modules: ["simple-datatables"]
---
```

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: list
  heading:
    title: Recent articles
    align: start
  input:
    section: blog
    reverse: false
    sort: title
  hide-empty: false
  background:
    color: primary
    subtle: true
  justify: start
  sortable: true
  paginate: true
  searchable: true
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-list >}}
