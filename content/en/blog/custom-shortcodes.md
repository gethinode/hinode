---
author: "Mark Dumay"
title: "Custom Shortcodes"
date: 2022-12-05
description: "Available shortcodes using Bootstrap components and styling"
tags: ["bootstrap", "shortcode"]
thumbnail: img/boots.jpg
photoCredits: <a href="https://unsplash.com/@nate_dumlao">Nathan Dumlao</a>
photoSource: <a href="https://unsplash.com/photos/QLPWQvHvmII">Unsplash</a>
---

Bootstrap is an open-source web development framework originally created by Twitter. It uses a responsive, mobile-first approach that scales seamlessly across different screen sizes. Bootstrap includes an extensive collection of ready-to-use components, such as navigation bars, pagination controls, buttons, and much more. The Hinode theme exposes several of those components as Hugo shortcodes to simplify their usage within markdown content. The below paragraphs illustrate the available shortcodes and how to use them.

## Carousel Shortcode

Use the `carousel` shortcode to display a carousel of several images, with behavior similar as the [Image Shortcode](#image-shortcode). The shortcode supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| ratio     | No  | Aspect ratio of the image, either "1x1", "4x3" (default), "16x9", or "21x9". |
| class     | No  | Optional class attribute of the `carousel` element, e.g. "w-75". |
{.table}

Add an inner `img` element for each slide of the carousel. The `img` element supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| src       | Yes | Required url of the image, e.g. "img/boots.jpg" or "https://picsum.photos/id/27/3264/1836". |
| caption   | No  | Optional image caption. If set, the image is darkened to improve the contrast. The caption is hidden on smaller screens. |
{.table}

As an example, the following shortcode displays a centered carousel with three slides, 16x9 aspect ratio, and a relative width of 67% on large screens.

```html
{{</* carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/coffee.jpg" caption="slide 1" */>}}
  {{</* img src="img/phone.jpg" caption="slide 2" */>}}
  {{</* img src="img/dunes.jpg" caption="slide 3" */>}}
{{</* /carousel */>}}
```

The result looks like this:
{{< carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" >}}
  {{< img src="img/coffee.jpg" caption="slide 1" >}}
  {{< img src="img/phone.jpg" caption="slide 2" >}}
  {{< img src="img/dunes.jpg" caption="slide 3" >}}
{{< /carousel >}}

## Image Shortcode

Use the `image` shortcode to display a responsive image with a specific aspect ratio. The source link can refer to either an image available in the `/assets/img` folder of your site or a public web location. The shortcode renders the image as a so-called [image set][mozilla_image] to optimize the image for different screen sizes and resolutions. Behind the scenes, Hugo renders the images in `WebP` format and stores them in a local folder (`resources` or `public`). Supported image types are `.png`, `.jpeg`, `.gif`, `.tiff`, `.bmp`, and `.webp`. The shortcode supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| src       | Yes | Required url of the image, e.g. "img/boots.jpg" or "https://picsum.photos/id/27/3264/1836". |
| ratio     | No  | Aspect ratio of the image, either "1x1", "4x3" (default), "16x9", or "21x9". |
| class     | No  | Optional class attribute of the inner `img` element, e.g. "rounded". |
| title     | No  | Optional alternate text of the image. |
| caption   | No  | Optional figure caption. |
{.table}

As an example, the following shortcode displays an image with rounded corners and a 21x9 aspect ratio.

```html
{{</* image src="img/flowers.jpg" ratio="21x9" caption="Figure caption" class="rounded" */>}}
```

The result looks like this:
{{< image src="img/flowers.jpg" ratio="21x9" caption="Figure caption" class="rounded">}}

<!-- MARKDOWN MAINTAINED LINKS -->
[mozilla_image]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
