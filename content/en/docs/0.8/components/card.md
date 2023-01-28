---
author: Mark Dumay
title: Card
date: 2023-01-28
description: Use the card shortcode to display a card that links to a content page.
group: components
layout: docs
---

## Overview

Use the `card` shortcode to display a card that links to a content page. When using a rich layout, the card includes a thumbnail and a header.

## Arguments

The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| path        | Yes | Required path of the page. |
| class       | No  | Optional class attribute of the card element, e.g. “w-50”. |
| color       | No  | Optional theme color of the card, either "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "white" or "black". By default, no color is specified. |
| padding     | No  | Optional padding of the content, either "0", "1", "2", "3", "4", "5", or "auto" (default). |
| header      | No  | Optional header components of the card, displayed in small caps. Supported values are "full" (default), "publication", "tags", and "none". |
| footer      | No  | Optional footer components of the card, displayed in small caps. Supported values are "full", "publication", "tags", and "none" (default). |
| orientation | No  | Optional placecement of the thumbnail, either "stacked" (default), "horizontal", or "none". |
{.table}

## Example

As an example, the following shortcode displays a colored, borderless horizontal card that links to the [Rich Content]({{< ref "rich-content" >}} "Rich Content") page. It includes a custom header and footer.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card path="rich-content" class="w-100 border-0" orientation="horizontal" color="info" header="publication" footer="tags" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
