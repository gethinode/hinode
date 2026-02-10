---
author: Mark Dumay
title: Card Group
date: 2023-12-29
description: Use the card-group shortcode to display a group of cards.
layout: docs
icon: fas grip
tags: component
---

## Overview

{{< release version="v0.18.6" >}}

Use the `card-group` shortcode to display a group of cards. Add inner `<card>` elements for each [card](card). As an example, the following shortcode displays a group of three cards. See the [card component](card) for additional styling options.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card-group padding="3" gutter="3" */>}}
    {{</* card title="Bootstrap framework" icon="fab bootstrap" */>}}
        Build fast, responsive sites with Bootstrap 5. Easily customize your site with the
        source Sass files.
    {{</* /card */>}}
    {{</* card title="Full text search" icon="fas magnifying-glass" */>}}
        Search your site with FlexSearch, a full-text search library with zero dependencies.
    {{</* /card */>}}
    {{</* card title="Development tools" icon="fas code" */>}}
        Use Node Package Manager to automate the build process and to keep track of
        dependencies.
    {{</* /card */>}}
{{</* /card-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The shortcode supports the following arguments:

{{< args structure="card-group" group="shortcode" >}}

In addition, the following arguments are passed to the individual cards.

{{< args structure="card" group="shortcode" parent="true" >}}
