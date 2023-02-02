---
title: Fonts
description: Configure a specific font to style your website.
date: 2023-01-28
group: configuration
layout: docs
---

Hinode uses a configurable font stack that includes support for Emoji across browsers and devices. Review the configuration settings below on how to update the font.

## Font configuration

Hinode uses Bootstrap's font configuration. The font stack includes support for Emoji across browsers and devices. You can adjust the main font in the `/config/_default/params.toml` file in the `style` section.

{{< docs name="font" file="config/_default/params.toml" >}}

 By default, Hinode configures the `Inter` font provided by [Google Fonts]({{< param "links.google_fonts" >}}) with the weights 200, 300, and 600. If you use a different font provider, be sure to adjust the Content Security Policy in the [server configuration]({{< ref "server" >}}).

## Customization

The font stack is defined in the `assets/scss/common/_variables.scss` file. The variable `$themeFont` is initialized to the value in the [font configuration](#font-configuration).

{{< docs name="font" file="assets/scss/common/_variables.scss" >}}
