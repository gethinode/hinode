---
author: Mark Dumay
title: Animation
date: 2024-01-02
description: Use the animation shortcode to show an After Effects animation.
layout: docs
icon: fa circle-play
tags: component
modules: ["lottie"]
---

## Overview

{{< release version="v0.20.4" >}}

Use the animation shortcode to show an After Effects animation, powered by [Lottie](https://airbnb.io/lottie/). The Lottie library supports animations that have been exported as JSON with Bodymovin. The animation uses vector graphics and is responsive. The shortcode is a simplified wrapper of the Lottie library that provides basic functionality.

Add the following configuration to your page's frontmatter to enable Lottie animations:

```yml
---
modules: ["lottie"]
---
```

### Default animation

Assign a valid path to `data` to provide a JSON file that contains the animation as input. The file should be stored in the `static` folder, or in one of its subfolders.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* animation id="gatin-default" animation-data="animation/gatin.json" class="col-6 mx-auto" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Animation on hover

Set `auto` to false and `hover` to true to trigger the animation when hovering the mouse over it.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* animation id="gatin-auto" animation-data="animation/gatin.json" autoplay=false hover=true class="col-6 mx-auto" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Configuration

The [Lottie module](https://github.com/gethinode/mod-lottie) uses [Lottie Light](https://github.com/airbnb/lottie-web/wiki/Lottie-Light) by default. The `lottie_light.js` player is a lighter version of Lottie that supports the svg renderer only and does not support expressions or effects. Canvas and html renderers are not supported either.

You can adjust the mount point in `config.toml` to use the default library instead. Please note that this requires enabling `unsafe-eval` in your [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/script-src) (see Lottie [issue #2173](https://github.com/airbnb/lottie-web/issues/2173)).

```toml
[[module.imports.mounts]]
source = "build/player/lottie.js"
target = "assets/js/modules/lottie/lottie.js"
```

## Arguments

The shortcode supports the following arguments:

{{< args structure="animation" group="shortcode" >}}
