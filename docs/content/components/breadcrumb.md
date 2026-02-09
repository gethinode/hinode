---
author: Mark Dumay
title: Breadcrumb
date: 2023-12-29
description: Use the breadcrumb shortcode to display the current page’s location within the site's navigational hierarchy.
layout: docs
icon: fas bread-slice
tags: component
---

## Overview

Use the `breadcrumb` shortcode to display the current page’s location within the site's navigational hierarchy.

### Default breadcrumb

The following shortcode displays a breadcrumb for the current page.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* breadcrumb */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Breadcrumb for specific path

Set `path` to a specific path to adjust the breadcrumb.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* breadcrumb path="kbd" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Frontmatter configuration

{{< release version="v0.14.1" >}}

Hugo has the option to [exclude certain pages from publishing](https://gohugo.io/content-management/build-options) using the build options in the page's frontmatter. These pages do not have a permalink, but are still part of the breadcrumb. You can set the optional parameter `redirect` to an alternative path if needed.

```yaml
---
title: Docs
redirect: "/docs/"
build:
  list: false
  render: false
---
```

## Styling

The file `assets/scss/components/_breadcrumb.scss` defines the Hinode-specific styling of the `breadcrumb` shortcode. Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/breadcrumb/#css) for additional styling options.

{{< file file="assets/scss/components/_breadcrumb.scss" show="false" >}}

## Arguments

The shortcode supports the following arguments:

{{< args structure="breadcrumb" group="shortcode" >}}
