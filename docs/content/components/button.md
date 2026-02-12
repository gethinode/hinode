---
author: Mark Dumay
title: Button
date: 2023-12-29
description: Use the button shortcode to display a button with a hyperlink.
layout: docs
icon: fa hand-pointer
tags: component
---

## Overview

Use the `button` shortcode to display a button with a hyperlink. The inner content is used as button title. The button supports an optional badge and tooltip.

### Stateful buttons

Set the `button-state` argument to change the appearance and behavior of the button.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button color="primary" href="#!" button-state="enabled" */>}}Enabled{{</* /button */>}}
{{</* button color="primary" href="#!" button-state="disabled" */>}}Disabled{{</* /button */>}}
{{</* button color="primary" href="#!" button-state="active" */>}}Active{{</* /button */>}}
{{</* button color="primary" href="#!" button-state="inactive" */>}}Inactive{{</* /button */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Sized buttons

Set the `button-size` argument to resize the button.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button color="primary" href="#!" button-size="xs" */>}}extra small{{</* /button */>}}
{{</* button color="primary" href="#!" button-size="sm" */>}}small{{</* /button */>}}
{{</* button color="primary" href="#!" button-size="md" */>}}medium{{</* /button */>}}
{{</* button color="primary" href="#!" button-size="lg" */>}}large{{</* /button */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Colored buttons

Set the `color` argument to define the background color with a matching title color.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button color="primary" href="#!" button-size="sm" */>}}primary{{</* /button */>}}
{{</* button color="secondary" href="#!" button-size="sm" */>}}secondary{{</* /button */>}}
{{</* button color="success" href="#!" button-size="sm" */>}}success{{</* /button */>}}
{{</* button color="danger" href="#!" button-size="sm" */>}}danger{{</* /button */>}}
{{</* button color="warning" href="#!" button-size="sm" */>}}warning{{</* /button */>}}
{{</* button color="info" href="#!" button-size="sm" */>}}info{{</* /button */>}}
{{</* button color="light" href="#!" button-size="sm" */>}}light{{</* /button */>}}
{{</* button color="dark" href="#!" button-size="sm" */>}}dark{{</* /button */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Buttons with a badge

Set the `badge` argument to add a badge to the top right of the button.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button color="secondary" href="#!" badge="99+" */>}}
    Inbox
{{</* /button */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Buttons with an icon

Set the `icon` argument to add an icon to the button. Use `order` to determine the position of the icon relative to the title. Omit the title to show an icon only.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button icon="fab linkedin" cue=false order="first" href="https://linkedin.com" >}}
    LinkedIn
{{< /button */>}}

{{</* button icon="fab linkedin" cue=false order="last" href="https://linkedin.com" >}}
    LinkedIn
{{< /button */>}}

{{</* button icon="fab linkedin" href="https://linkedin.com" /*/>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Use `justify` to adjust the layout of the icon and button title.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button icon="fab linkedin" cue=false class="col-12 col-sm-8 col-md-4 offset-sm-2 offset-md-4"
    justify="start" href="https://linkedin.com" >}}LinkedIn{{< /button */>}}

{{</* button icon="fab linkedin" cue=false class="col-12 col-sm-8 col-md-4 offset-sm-2 offset-md-4"
    justify="end" href="https://linkedin.com" >}}LinkedIn{{< /button */>}}

{{</* button icon="fab linkedin" cue=false class="col-12 col-sm-8 col-md-4 offset-sm-2 offset-md-4"
    justify="center" href="https://linkedin.com" >}}LinkedIn{{< /button */>}}

{{</* button icon="fab linkedin" cue=false class="col-12 col-sm-8 col-md-4 offset-sm-2 offset-md-4"
    justify="between" href="https://linkedin.com" >}}LinkedIn{{< /button */>}}

{{</* button icon="fab linkedin" cue=false class="col-12 col-sm-8 col-md-4 offset-sm-2 offset-md-4"
    justify="around" href="https://linkedin.com" >}}LinkedIn{{< /button */>}}

{{</* button icon="fab linkedin" cue=false class="col-12 col-sm-8 col-md-4 offset-sm-2 offset-md-4"
    justify="evenly" href="https://linkedin.com" >}}LinkedIn{{< /button */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Outlined buttons

Set the `outline` argument to `true` to adjust the style of the button.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button color="primary" href="#!" button-size="sm" outline="true" */>}}primary{{</* /button */>}}

{{</* button color="secondary" href="#!" button-size="sm" outline="true" */>}}secondary{{</* /button */>}}

{{</* button color="success" href="#!" button-size="sm" outline="true" */>}}success{{</* /button */>}}

{{</* button color="danger" href="#!" button-size="sm" outline="true" */>}}danger{{</* /button */>}}

{{</* button color="warning" href="#!" button-size="sm" outline="true" */>}}warning{{</* /button */>}}

{{</* button color="info" href="#!" button-size="sm" outline="true" */>}}info{{</* /button */>}}

{{</* button color="light" href="#!" button-size="sm" outline="true" */>}}light{{</* /button */>}}

{{</* button color="dark" href="#!" button-size="sm" outline="true" */>}}dark{{</* /button */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Buttons with a tooltip

Set the `tooltip` argument in conjunction with `placement` to show a tooltip when hovering over the button.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button color="secondary" tooltip="Click on the inbox to view your unread messages" href="#!"
    placement="top" */>}}top{{</* /button */>}}

{{</* button color="secondary" tooltip="Click on the inbox to view your unread messages" href="#!"
    placement="bottom" */>}}bottom{{</* /button */>}}

{{</* button color="secondary" tooltip="Click on the inbox to view your unread messages" href="#!"
    placement="left" */>}}left{{</* /button */>}}

{{</* button color="secondary" tooltip="Click on the inbox to view your unread messages" href="#!"
    placement="right" */>}}right{{</* /button */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Buttons with a collapsible panel

Reveal or hide a collapsible panel by linking the panel's `id` to the button with the argument `collapse-id`.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button color="secondary" collapse-id="collapse-1" */>}}
    Collapse
{{</* /button */>}}

{{</* collapse id="collapse-1" class="p-3 border rounded" */>}}
    Some placeholder content for the collapse component. This panel is
    *hidden by default* but revealed when the user activates the relevant
    trigger.
{{</* /collapse */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

The file `assets/scss/components/_button.scss` defines the Hinode-specific styling of the `button` shortcode. Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/button/#css) for additional styling options.

{{< file file="assets/scss/components/_button.scss" show="false" >}}

## Arguments

The shortcode supports the following arguments:

{{< args structure="button" group="shortcode" >}}
