---
author: Mark Dumay
title: Alert
date: 2023-01-28
description: Use the alert shortcode to display a contextual feedback message.
group: components
layout: docs
---

## Overview

Use the `alert` shortcode to display a contextual feedback message. The inner content is used as alert text.

## Arguments

The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| color       | No  | Optional theme color of the alert, either "primary" (default), "secondary", "success", "danger",  "warning", "info", "light", "dark", "white" or "black". |
| dismissible | No  | Optional flag to indicate the alert is dismissible, defaults to false. |
{.table}

## Example

As an example, the following shortcode displays a simple alert.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* alert color="danger" */>}}
    A simple danger alert—check it out!
{{</* /alert */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
