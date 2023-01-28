---
author: Mark Dumay
title: Button Group
date: 2023-01-28
description: Use the button-group shortcode to display a group of buttons.
group: components
layout: docs
---

## Overview

Use the `button-group` shortcode to display a group of buttons. Add inner `<button>` elements for each [button]({{< ref "button" >}} "button").

## Arguments

The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| aria-label  | No   | Optional assistive label for the button group. |
{.table}

## Example

As an example, the following shortcode displays a group of three buttons.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button-group aria-label="Basic example" */>}}
  {{</* button color="primary" href="#" */>}}Left{{</* /button */>}}
  {{</* button color="primary" href="#" */>}}Middle{{</* /button */>}}
  {{</* button color="primary" href="#" */>}}Right{{</* /button */>}}
{{</* /button-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
