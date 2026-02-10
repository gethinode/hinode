---
author: Mark Dumay
title: Image
date: 2024-08-17
description: Use the image shortcode to display a responsive image with an optional aspect ratio.
layout: docs
icon: fas image
tags: component
---

## Overview

Use the `image` shortcode to display a responsive image with an optional aspect ratio. The source link can refer to either an image available in the `/assets/img` folder of your site or a public web location. The shortcode renders the image as a so-called [image set](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) to optimize the image for different screen sizes and resolutions.

Behind the scenes, Hugo renders the images in `WebP` format and stores them in a local folder (`resources` or `public`). The images are processed using the quality setting specified in the `[imaging]` section of the main [config file](https://gohugo.io/content-management/image-processing/#imaging-configuration) (defaults to 75). Supported image types are `.png`, `.jpeg`, `.gif`, `.tiff`, `.bmp`, and `.webp`. A fallback image of type `.jpeg` is provided for older browsers.

### Aspect ratio

As an example, the following shortcodes display a centered image with various aspect ratios.

Set the `ratio` to `1x1` for a square aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/placeholder.png" ratio="1x1" wrapper="col-6 mx-auto" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Set the `ratio` to `3x2` for a landscape aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/placeholder.png" ratio="3x2" wrapper="col-6 mx-auto" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Set the `ratio` to `4x3` for a landscape aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/placeholder.png" ratio="4x3" wrapper="col-6 mx-auto" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Set the `ratio` to `16x9` for a landscape aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/placeholder.png" ratio="16x9" wrapper="col-6 mx-auto" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Set the `ratio` to `21x9` for a landscape aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/placeholder.png" ratio="21x9" wrapper="col-6 mx-auto" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Omit the `ratio` to keep the original aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/placeholder.png" wrapper="col-6 mx-auto" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Color mode

Set `mode` to `true` to use an image that is color-mode aware. The shortcode processes two images behind the scenes, being `img/responsive-light.png` and `img/responsive-dark.png`. Only the image that matches the current color mode is shown.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/responsive.png" mode="true" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Figures

Add a `caption` to transform the image into a figure with caption.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/placeholder.png" wrapper="col-6 mx-auto" caption="Figure caption" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Vector images

The shortcode supports vector images of type `.svg` too. The shortcode supports the regular arguments, however, vector images are contained instead of cropped when the `ratio` is set. The next example shows a color-mode-aware vector image. The background is set to a contrasting color to illustrate the ratio behavior.

> [!IMPORTANT]
> Since release {{< release version="v0.26.3" short="true" link-type="link" >}}, vector images stored in the site's `assets` folder are embedded as inline vector images. Vector images stored in the `static` folder are kept as separate files.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="/img/logo_var.svg#logo" class="img-fluid w-50" wrapper="text-center" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### DAM images

Hinode supports [Cloudinary](https://cloudinary.com), [ImageKit.io](https://imagekit.io), and [Imgix](https://imgix.com) as Digital Asset Manager (DAM). You can configure these managers in your site parameters. Check out the [DAM configuration](https://gethinode.com/docs/configuration/digital-asset-managers/) for more details.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="https://res.cloudinary.com/demo/image/upload/dog.webp"
    ratio="21x9" caption="Cloudinary image" wrapper="col-12 col-md-8 mx-auto" */>}}

{{</* image src="https://ik.imagekit.io/demo/default-image.jpg"
    ratio="21x9" caption="ImageKit.io image" wrapper="col-12 col-md-8 mx-auto" */>}}

{{</* image src="https://assets.imgix.net/examples/bluehat.jpg"
    ratio="21x9" caption="imgix image" wrapper="col-12 col-md-8 mx-auto" */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Cropped images

By default, images use `Smart` croppping. You can refine the image crop by setting the `anchor`. The following example shows this behavior as part of a [card group](card-group).

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card-group padding="3" gutter="3" cols=3 ratio="16x9" */>}}
    {{</* card thumbnail="https://res.cloudinary.com/demo/image/upload/dog.webp" anchor="TopLeft" */>}}
        `TopLeft` anchor
    {{</* /card */>}}
    {{</* card thumbnail="https://res.cloudinary.com/demo/image/upload/dog.webp" anchor="Top" */>}}
        `Top` anchor
    {{</* /card */>}}
    {{</* card thumbnail="https://res.cloudinary.com/demo/image/upload/dog.webp" anchor="TopRight" */>}}
        `TopRight` anchor
    {{</* /card */>}}
    {{</* card thumbnail="https://res.cloudinary.com/demo/image/upload/dog.webp" ratio="1x1" anchor="Left" */>}}
        `Left` anchor
    {{</* /card */>}}
    {{</* card thumbnail="https://res.cloudinary.com/demo/image/upload/dog.webp" ratio="1x1" anchor="Center" */>}}
        `Center` anchor
    {{</* /card */>}}
    {{</* card thumbnail="https://res.cloudinary.com/demo/image/upload/dog.webp" ratio="1x1" anchor="Right" */>}}
        `Right` anchor
    {{</* /card */>}}
    {{</* card thumbnail="https://res.cloudinary.com/demo/image/upload/dog.webp" anchor="BottomLeft" */>}}
        `BottomLeft` anchor
    {{</* /card */>}}
    {{</* card thumbnail="https://res.cloudinary.com/demo/image/upload/dog.webp" anchor="Bottom" */>}}
        `Bottom` anchor
    {{</* /card */>}}
    {{</* card thumbnail="https://res.cloudinary.com/demo/image/upload/dog.webp" anchor="BottomRight" */>}}
        `BottomRight` anchor
    {{</* /card */>}}
{{</* /card-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

The file `assets/scss/components/_img.scss` defines the Hinode-specific styling of the `img` shortcode.

{{< file file="assets/scss/components/_img.scss" show="false" >}}

## Arguments

The shortcode supports the following arguments:

{{< args structure="image" group="shortcode" >}}
