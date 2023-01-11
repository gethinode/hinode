---
author: "Mark Dumay"
title: "Toast"
date: 2023-01-05
description: "Use the toast shortcode to display a dismissable message in the bottom-right corner of the screen."
group: components
layout: docs
---

## Overview

Use the `toast` shortcode to display a dismissable message in the bottom-right corner of the screen. The Hinode theme defines a click event for a button with id `toastButton`. Modify the file `assets/js/toast.js` if needed.

## Arguments

The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| header      | No  | Optional header of the toast message. Uses the site title by default. |
{.table}

## Example

As an example, the following shortcode displays a button that, when clicked, triggers the toast message.

```html
{{</* button id="toastButton" */>}}
Show toast
{{</* /button */>}}

{{</* toast */>}}
This is a toast message.
{{</* /toast */>}}
```

The result looks like this:

{{< button id="toastButton" >}}
Show toast
{{< /button >}}

{{< toast >}}
This is a toast message.
{{< /toast >}}
