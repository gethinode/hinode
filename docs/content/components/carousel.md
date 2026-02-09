---
author: Mark Dumay
title: Carousel
date: 2024-08-14
description: Use the carousel shortcode to display a carousel of several images.
layout: docs
icon: fas images
tags: component
---

## Overview

{{< release version="v0.7.1" >}}

Use the `carousel` shortcode to display a carousel of several images, with similar behavior as the [image]({{% ref "image" %}} "image"). As an example, the following shortcode displays a centered carousel with three slides, 16x9 aspect ratio, and a relative width of 67% on large screens.

### 1x1 ratio

Set the `ratio` to `1x1` for a square aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* carousel id="carousel-1x1" ratio="1x1" class="col-sm-12 col-lg-6 mx-auto" */>}}
  {{</* img src="img/placeholder.png" caption="slide 1" */>}}
  {{</* img src="img/placeholder.png" caption="slide 2" */>}}
  {{</* img src="img/placeholder.png" caption="slide 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Set the `ratio` to `3x2` for a landscape aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* carousel id="carousel-3x2" ratio="3x2" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/placeholder.png" caption="slide 1" */>}}
  {{</* img src="img/placeholder.png" caption="slide 2" */>}}
  {{</* img src="img/placeholder.png" caption="slide 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### 4x3 ratio

Set the `ratio` to `4x3` for a landscape aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* carousel id="carousel-4x3" ratio="4x3" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/placeholder.png" caption="slide 1" */>}}
  {{</* img src="img/placeholder.png" caption="slide 2" */>}}
  {{</* img src="img/placeholder.png" caption="slide 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### 16x9 ratio

Set the `ratio` to `16x9` for a landscape aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* carousel id="carousel-16x9" ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/placeholder.png" caption="slide 1" */>}}
  {{</* img src="img/placeholder.png" caption="slide 2" */>}}
  {{</* img src="img/placeholder.png" caption="slide 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### 21x9 ratio

Set the `ratio` to `21x9` for a landscape aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* carousel id="carousel-21x9" ratio="21x9" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/placeholder.png" caption="slide 1" */>}}
  {{</* img src="img/placeholder.png" caption="slide 2" */>}}
  {{</* img src="img/placeholder.png" caption="slide 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Original aspect ratio

> [!IMPORTANT]
> The carousel does not crop the images when omitting the aspect ratio. Instead, the images keep their original aspect ratio. Ensure the images have an equal aspect ratio to avoid layout shifting.

Omit the `ratio` to keep the original aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* carousel id="carousel-original" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/placeholder.png" caption="slide 1" */>}}
  {{</* img src="img/placeholder.png" caption="slide 2" */>}}
  {{</* img src="img/placeholder.png" caption="slide 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Set `portrait` to `true` for a portrait aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* carousel id="carousel-portrait-3x2" ratio="3x2" portrait="true" class="col-sm-8 col-lg-6 mx-auto" */>}}
  {{</* img src="img/placeholder.png" caption="slide 1" */>}}
  {{</* img src="img/placeholder.png" caption="slide 2" */>}}
  {{</* img src="img/placeholder.png" caption="slide 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

The file `assets/scss/components/_carousel.scss` defines the Hinode-specific styling of the `carousel` shortcode. Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/carousel/#css) for additional styling options.

{{< file file="assets/scss/components/_carousel.scss" show="false" >}}

## Arguments

The carousel shortcode supports the following arguments:

{{< args structure="carousel" group="shortcode" >}}

Add an inner `img` element for each slide of the carousel. The `img` element supports the following arguments:

{{< args structure="carousel-item" group="shortcode" >}}
