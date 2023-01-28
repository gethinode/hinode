---
author: Mark Dumay
title: Button
date: 2023-01-28
description: Use the button shortcode to display a button with a hyperlink.
group: components
layout: docs
---

## Overview

Use the `button` shortcode to display a button with a hyperlink. The inner content is used as button title. The button supports an optional badge and tooltip.

## Arguments

The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| href        | No   | Optional address for the button or hyperlink. Automatically assigned when using collapse. |
| state       | No   | Optional state of the button, either "enabled" (default), "disabled", "active", or "inactive". |
| size        | No   | Optional size of the button, either "sm", "md" (default), or "lg". |
| color       | No   | Optional theme color of the element, either "primary" (default), "secondary", "success", "danger",  "warning", "info", "light", "dark", "white" or "black". |
| badge       | No   | Optional positioned badge to display on top of the button. |
| outline     | No   | Optional flag indicating the button should be outlined, either "false" (default) or "true". |
| aria-label  | No   | Optional label for the badge. |
| tooltip     | No   |  Optional text to display in a tooltip. Cannot be used together with collapse. Ignored for active/inactive buttons. |
| collapse    | No   | Optional panel to collapse. Cannot be used together with tooltip. Ignored for active/inactive buttons. |
| placement   | No   | How to position the tooltip: "top" (default), "bottom", "left", or "right". |
{.table}

## Example

As an example, the following shortcode displays a tooltip for a dark button with a badge.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button color="dark" tooltip="Click on the inbox to view your unread messages" href="#" badge="99+" */>}}
    Inbox
{{</* /button */>}}
{{< /example>}}
<!-- markdownlint-enable MD037 -->
