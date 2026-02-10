---
author: Mark Dumay
title: Video
date: 2024-08-28
aliases:
  - "youtube"
  - "vimeo"
description: Use the video shortcode to embed a responsive video on your site.
layout: docs
icon: fab youtube
tags: component
modules: ["vimeo"]
---

## Overview

> [!IMPORTANT]
> Hinode uses a strict Content Security Policy by default. Be sure your server configuration safe lists your video provider in the `frame-src` configuration, or your video will not show.

Use the `video` shortcode to embed a responsive video on your site. The shortcode currently supports three providers, being [Cloudinary](https://cloudinary.com), [Vimeo](https://vimeo.com), and [YouTube](https://youtube.com). The last two providers also support shorthand notation.

### Video

As an example, the following shortcode displays an Elephants video hosted by Cloudinary. Cloudinary requires both an account name and a public ID of the video. You can provide the account name as shortcode argument.

<!-- , or {{< link "#configuration" >}}configure a default account name{{< /link >}} in the site's parameters. -->

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* video provider="cloudinary" account="demo" media-id="elephants" autoplay=true */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Vimeo

As an example, the following shortcode displays a Vimeo video. By setting `autotitle` to `true`, Hinode captures the video's title as defined by Vimeo and assigns this to the title of the video frame.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* vimeo media-id="55073825" autoplay=true autotitle=true */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### YouTube

> [!NOTE]
> In [privacy-enhanced mode](https://gohugo.io/about/hugo-and-gdpr/#youtube), YouTube will not store information about visitors on your website unless the user plays the embedded video.

As an example, the following shortcode displays a Hugo quickstart guide hosted by YouTube.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* youtube media-id="w7Ft2ymGmfc" autoplay=true autotitle=true */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Configuration

Hinode supports [Cloudinary](https://cloudinary.com), [Vimeo](https://vimeo.com), and [YouTube](https://youtube.com) as video provider. You can configure these providers in your site parameters.

```toml
[videos]
    [videos.cloudinary]
        host = "cloudinary"
        account = "demo"
    [videos.vimeo]
        host = "vimeo"
    [videos.youtube]
        host = "youtube"
```

## Styling

The file `assets/scss/components/_video.scss` defines the Hinode-specific styling of the `video` shortcode.

{{< file file="assets/scss/components/_video.scss" show="false" >}}

## Arguments

The shortcode supports the following arguments:

{{< args structure="video" group="shortcode" >}}
