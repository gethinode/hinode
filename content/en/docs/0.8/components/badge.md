---
author: Mark Dumay
title: Badge
date: 2023-01-28
description: Use the badge to enrich headings and buttons.
group: components
layout: docs
---

## Overview

Badges can be added to headings and buttons. The badge for a button is part of a [custom shortcode]({{< ref "button" >}} "custom shortcode"). The example below illustrates the HTML code for a heading.

## Arguments

The shortcode requires no arguments.

## Example

Use HTML code to display a badge for a heading. See the Bootstrap [documentation]({{< param "links.bs_badge_heading" >}}) for more options. The following example displays a badge for a heading of size four.

{{< example >}}
<h1>Example heading of size one <span class="badge bg-secondary">New</span></h1>
<h2>Example heading of size two <span class="badge bg-secondary">New</span></h2>
<h3>Example heading of size three <span class="badge bg-secondary">New</span></h3>
<h4>Example heading of size four <span class="badge bg-secondary">New</span></h4>
<h5>Example heading of size five <span class="badge bg-secondary">New</span></h5>
<h6>Example heading of size six <span class="badge bg-secondary">New</span></h6>
{{< /example >}}
