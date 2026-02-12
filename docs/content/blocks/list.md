---
_schema: default
title: List
description: Use the list content block to show a list of articles.
icon: fas list
modules: ["simple-datatables"]
---

## Overview

The `list` block renders a list of articles.

### Default List

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
    color: body-tertiary
    subtle: false
  justify: start
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Filtered List

Add the following configuration to your page's frontmatter to enable data table features:

```yml
---
modules: ["simple-datatables"]
---
```

You can then use `sortable`, `paginate`, and `searchable` to enable inline sorting and filtering.

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
  pagination: 5
  hide-empty: false
  background:
    color: body-tertiary
    subtle: false
  justify: start
  sortable: true
  paginate: true
  searchable: true
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Custom List

Customize the list by providing a `hook` partial.

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
  hook: assets/table-hook
  background:
    color: body-tertiary
    subtle: false
  justify: start
  sortable: true
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

Define the hook partial in your site's `layouts/_partials` folder. The following example renders a custom Markdown table consisting of the article's title and publication date.

{{< file file="./exampleSite/layouts/_partials/assets/table-hook.html" full=false lang="go-template" >}}

## Arguments

The content block supports the following arguments:

{{< args bookshop-list >}}
