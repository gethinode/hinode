---
author: "Mark Dumay"
title: "Button Group"
date: 2023-01-05
description: "Use the button-group shortcode to display a group of buttons."
group: components
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

```html
{{</* button-group aria-label="Basic example" */>}}
  {{</* button color="primary" href="#" */>}}Left{{</* /button */>}}
  {{</* button color="primary" href="#" */>}}Middle{{</* /button */>}}
  {{</* button color="primary" href="#" */>}}Right{{</* /button */>}}
{{</* /button-group */>}}
```

The result looks like this:

{{< button-group aria-label="Basic example" >}}
  {{< button color="primary" href="#" >}}Left{{< /button >}}
  {{< button color="primary" href="#" >}}Middle{{< /button >}}
  {{< button color="primary" href="#" >}}Right{{< /button >}}
{{< /button-group >}}
