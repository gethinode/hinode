---
author: Mark Dumay
title: Toast
date: 2024-08-14
description: Use the toast shortcode to display a dismissable message in the bottom-right corner of the screen.
layout: docs
icon: fas circle-info
tags: component
---

## Overview

> [!IMPORTANT]
> To support multiple toast messages on the same page, each toast message is explicitly linked to a button using the parameter `id` since release {{< release version="v0.14.3" short="true" link-type="link" >}}. Hinode wraps the individual toast messages in a container to stack them automatically.

Use the `toast` shortcode to display a dismissable message in the bottom-right corner of the screen. Give the toast a unique `id` and assign this value to the `toast` argument of a button. As an example, the following shortcode displays two buttons that, when clicked, trigger a toast message. The messages are stacked when both buttons are clicked in a short timeframe.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button toast-id="toast-example-1" */>}}
    Show toast 1
{{</* /button */>}}

{{</* button toast-id="toast-example-2" */>}}
    Show toast 2
{{</* /button */>}}

{{</* toast id="toast-example-1" title="First title" */>}}
    This is the first toast message.
{{</* /toast */>}}

{{</* toast id="toast-example-2" title="Second title" */>}}
    This is the second toast message.
{{</* /toast */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Configuration

{{< release version="v0.14.4" >}}

By default, toast messages are displayed in the bottom right of the viewport. Hinode vertically stacks multiple toast messages automatically. Adjust the configuration by adjusting `messages` in the `site parameters`.

```toml
[messages]
    placement = "bottom-right"
```

The following arguments are supported:

<!-- markdownlint-disable MD058 -->
{{< table wrap=true >}}
| Setting     | Default        | Description                                                                                                                                                                                                          |
|-------------|----------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `placement` | "bottom-right" | Optional position of the toast messages relative to the viewport: "top-left", "top-center","top-right", "middle-left", "middle-center", "middle-right", "bottom-left", "bottom-center", or "bottom-right" (default). |
{{< /table >}}
<!-- markdownlint-enable MD058 -->

## Styling

The file `assets/scss/components/_toast.scss` defines the Hinode-specific styling of the `toast` shortcode. Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/toasts/#css) for additional styling options.

{{< file file="assets/scss/components/_toast.scss" show="false" >}}

## Arguments

The shortcode supports the following arguments:

{{< args structure="toast" group="shortcode" >}}
