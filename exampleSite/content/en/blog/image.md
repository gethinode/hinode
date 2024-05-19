---
author: Mark Dumay
title: Local and remote images
date: 2024-05-19
description: Include responsive images from local sources and selected CDN image providers.
tags: ["blog"]
thumbnail:
  url: https://res.cloudinary.com/demo/image/upload/v1689803100/ai/hiker.jpg
  author: Nathan Dumlao
  authorURL: https://unsplash.com/@nate_dumlao
  origin: Unsplash
  originURL: https://unsplash.com/photos/QLPWQvHvmII
---

## Cloudinary

As an example, the following shortcode displays an image with rounded corners and a 21x9 aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="https://res.cloudinary.com/demo/image/upload/dog.webp"
    ratio="21x9" caption="Cloudinary image" class="rounded" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
