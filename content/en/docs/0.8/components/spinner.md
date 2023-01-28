---
author: Mark Dumay
title: Spinner
date: 2023-01-28
description: Use the spinner shortcode to indicate the loading state of a component or page.
group: components
layout: docs
---

## Overview

Use the `spinner` shortcode to indicate the loading state of a component or page. The inner content is used as alternative description.

## Arguments

The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| color       | No  | Optional theme color of the spinner, either "primary" (default), "secondary", "success", "danger",  "warning", "info", "light", "dark", "white" or "black". |
| grow        | No  | Optional flag to indicate the spinner is growing instead of rotating, defaults to false. |
| class       | No  | Optional class attribute of the spinner wrapping element, e.g. “text-center”. |
{.table}

## Example

As an example, the following shortcode displays a centered spinner.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* spinner color="info" class="text-center" */>}}
Loading...
{{</* /spinner */>}}
{{< /example>}}
<!-- markdownlint-enable MD037 -->
