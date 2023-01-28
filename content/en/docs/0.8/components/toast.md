---
author: Mark Dumay
title: Toast
date: 2023-01-28
description: Use the toast shortcode to display a dismissable message in the bottom-right corner of the screen.
group: components
layout: docs
---

## Overview

Use the `toast` shortcode to display a dismissable message in the bottom-right corner of the screen. Hinode defines a click event for a button with id `toastButton`. Modify the file `assets/js/toast.js` if needed.

## Arguments

The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| header      | No  | Optional header of the toast message. Uses the site title by default. |
{.table}

## Example

As an example, the following shortcode displays a button that, when clicked, triggers the toast message.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button id="toastButton" */>}}
    Show toast
{{</* /button */>}}

{{</* toast header="Custom title" */>}}
    This is a toast message.
{{</* /toast */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
