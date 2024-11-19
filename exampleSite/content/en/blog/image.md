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

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* image src="https://res.cloudinary.com/demo/dog.webp"
    ratio="21x9" caption="Cloudinary image" class="rounded" plain=true */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## ImageKit.io

As an example, the following shortcode displays an image with rounded corners and a 21x9 aspect ratio.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* image src="https://ik.imagekit.io/demo/default-image.jpg"
    ratio="21x9" caption="ImageKit.io image" class="rounded" anchor="Center" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Imgix

As an example, the following shortcode displays an image with rounded corners and a 21x9 aspect ratio.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* image src="https://assets.imgix.net/examples/bluehat.jpg"
    ratio="21x9" caption="imgix image" class="rounded" anchor="Top" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}
