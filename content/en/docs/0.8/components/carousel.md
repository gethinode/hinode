---
author: "Mark Dumay"
title: "Carousel"
date: 2023-01-25
description: "Use the carousel shortcode to display a carousel of several images."
group: components
layout: docs
---

## Overview

Use the `carousel` shortcode to display a carousel of several images, with similar behavior as the [image]({{< ref "image" >}} "image")

## Arguments

The shortcode supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| ratio     | No  | Aspect ratio of the image, either "1x1", "4x3" (default), "16x9", or "21x9". |
| class     | No  | Optional class attribute of the `carousel` element, e.g. "w-75". |
{.table}

Add an inner `img` element for each slide of the carousel. The `img` element supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| src       | Yes | Required url of the image, e.g. "img/boots.jpg". |
| caption   | No  | Optional image caption. If set, the image is darkened to improve the contrast. The caption is hidden on smaller screens. |
{.table}

## Example

As an example, the following shortcode displays a centered carousel with three slides, 16x9 aspect ratio, and a relative width of 67% on large screens.

{{< example lang="hugo" >}}
{{</* carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/coffee.jpg" caption="slide 1" */>}}
  {{</* img src="img/phone.jpg" caption="slide 2" */>}}
  {{</* img src="img/dunes.jpg" caption="slide 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
