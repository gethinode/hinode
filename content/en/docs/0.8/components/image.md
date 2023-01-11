---
author: "Mark Dumay"
title: "Image"
date: 2023-01-05
description: "Use the image shortcode to display a responsive image with a specific aspect ratio."
group: components
layout: docs
---

## Overview

Use the `image` shortcode to display a responsive image with a specific aspect ratio. The source link can refer to either an image available in the `/assets/img` folder of your site or a public web location. The shortcode renders the image as a so-called [image set][mozilla_image] to optimize the image for different screen sizes and resolutions. Behind the scenes, Hugo renders the images in `WebP` format and stores them in a local folder (`resources` or `public`). The images are processed using the quality setting specified in the `[imaging]` section of the main [config file][hugo_imaging] (defaults to 75). Supported image types are `.png`, `.jpeg`, `.gif`, `.tiff`, `.bmp`, and `.webp`. A fallback image of type `.jpeg` is provided for older browsers.

## Arguments

The shortcode supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| src       | Yes | Required url of the image, e.g. "img/boots.jpg". |
| ratio     | No  | Optional aspect ratio of the image, either "1x1", "4x3", "16x9", or "21x9". If set, the image is resized and cropped to match the ratio. Else the original aspect ratio of the image is kept. |
| class     | No  | Optional class attribute of the inner `img` element, e.g. "rounded". |
| title     | No  | Optional alternate text of the image. |
| caption   | No  | Optional figure caption. |
{.table}

## Example

As an example, the following shortcode displays an image with rounded corners and a 21x9 aspect ratio.

```html
{{</* image src="img/flowers.jpg" ratio="21x9" caption="Figure caption" class="rounded" */>}}
```

The result looks like this:
{{< image src="img/flowers.jpg" ratio="21x9" caption="Figure caption" class="rounded">}}

[mozilla_image]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
[hugo_imaging]: https://gohugo.io/content-management/image-processing/#imaging-configuration
