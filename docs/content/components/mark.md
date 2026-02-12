---
author: Mark Dumay
title: Mark
date: 2023-12-29
description: Use the mark shortcode to highlight text.
layout: docs
icon: fas highlighter
tags: component
---

## Overview

{{< release version="v0.19.0" >}}

Use the `mark` shortcode to highlight text. The inner content is used as input.

### Default highlight

Provide the text to highlight as input to the `mark` shortcode.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
Use the mark shortcode to {{</* mark >}}highlight{{< /mark */>}} specific text.
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Colored highlight

Specify a theme color to define the background color of the highlighted text. As an example, the following shortcodes display a highlight for each theme color.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

- Use the mark shortcode to {{</* mark color="primary" >}}highlight{{< /mark */>}} specific text.
- Use the mark shortcode to {{</* mark color="secondary" >}}highlight{{< /mark */>}} specific text.
- Use the mark shortcode to {{</* mark color="success" >}}highlight{{< /mark */>}} specific text.
- Use the mark shortcode to {{</* mark color="danger" >}}highlight{{< /mark */>}} specific text.
- Use the mark shortcode to {{</* mark color="warning" >}}highlight{{< /mark */>}} specific text.
- Use the mark shortcode to {{</* mark color="info" >}}highlight{{< /mark */>}} specific text.
- Use the mark shortcode to {{</* mark color="light" >}}highlight{{< /mark */>}} specific text.
- Use the mark shortcode to {{</* mark color="dark" >}}highlight{{< /mark */>}} specific text.

{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The shortcode supports the following arguments:

{{< args structure="mark" group="shortcode" >}}
