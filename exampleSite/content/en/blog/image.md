---
author: Mark Dumay
title: Local and remote images
date: 2024-05-19
description: Include responsive images from local sources and selected CDN image providers.
tags: ["blog"]
thumbnail:
  url: https://assets.imgix.net/examples/bluehat.jpg
---

## Cloudinary

As an example, the following shortcode displays an image with rounded corners and a 21x9 aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="https://res.cloudinary.com/demo/image/upload/dog.webp"
    ratio="21x9" caption="Cloudinary image" class="rounded" plain=true */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## ImageKit.io

As an example, the following shortcode displays an image with rounded corners and a 21x9 aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="https://ik.imagekit.io/demo/default-image.jpg"
    ratio="21x9" caption="ImageKit.io image" class="rounded" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Imgix

As an example, the following shortcode displays an image with rounded corners and a 21x9 aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="https://assets.imgix.net/examples/bluehat.jpg"
    ratio="21x9" caption="imgix image" class="rounded" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
