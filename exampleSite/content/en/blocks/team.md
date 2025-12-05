---
_schema: default
title: Team
description: Use the team content block to show a group of team members.
icon: fas grip
---

## Overview

The `team` content block renders a group of team members.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: team
  heading:
    title: Team
    align: start
  input:
    section: team
    reverse: false
    sort: title
  cols: 3
  hide-empty: false
  header-style: none
  padding: 0
  background:
    color: primary
    subtle: true
  class: border-0 card-zoom card-body-margin
  justify: start
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The content block supports the following arguments:

{{< args bookshop-team >}}
