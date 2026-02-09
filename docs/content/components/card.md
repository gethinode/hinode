---
author: Mark Dumay
title: Card
date: 2024-08-14
description: Use the card shortcode to display a card that links to a content page.
layout: docs
icon: fa address-card
tags: component
---

## Overview

> [!IMPORTANT]
> Cards support inner content since release {{< release version="v0.18.6" short="true" link-type="link" >}}. As a result, references to the card shortcode must be closed or self-closed.

Use the `card` shortcode to display a card that links to a content page. When using a rich layout, the card includes a thumbnail (or icon) and a header. As an example, the following shortcode displays a horizontal card that links to the components overview. It includes a custom header and footer. You can use the {{< link "card-group" >}}card-group shortcode{{< /link >}} to align multiple cards and to position them in a grid.

### Inline content

Use `title`, `thumbnail`, `icon`, and inner content to define the card's content inline. You can add `padding` and `class` attributes to further refine the card's layout.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card padding="3" class="col-sm-12 col-lg-8 mx-auto mb-3" title="Title"
    icon="fa address-card" */>}}
    This is the `body` of the card. It supports Markdown.
{{</* /card */>}}

{{</* card padding="3" class="col-sm-12 col-lg-8 mx-auto" title="Title"
    thumbnail="img/placeholder.png" */>}}
    This is the `body` of the card. It supports Markdown.
{{</* /card */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Referenced content

Set `path` to reference a content page within your site.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card path="button" class="col-sm-12 col-lg-8 mx-auto" /*/>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Colored cards

Use the `color` argument to set the background color of the card. As an example, the following shortcodes display a plain card for each available color. The cards are embedded in a grid. The final two cards with the color `body` and `body-tertiary` are color-mode aware.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card-group cols="4" gutter="3" header-style="none" orientation="none" */>}}
    {{</* card color="primary" path="button" /*/>}}
    {{</* card color="secondary" path="button" /*/>}}
    {{</* card color="success" path="button" /*/>}}
    {{</* card color="danger" path="button" /*/>}}
    {{</* card color="warning" path="button" /*/>}}
    {{</* card color="info" path="button" /*/>}}
    {{</* card color="light" path="button" /*/>}}
    {{</* card color="dark" path="button" /*/>}}
    {{</* card color="white" path="button" /*/>}}
    {{</* card color="black" path="button" /*/>}}
    {{</* card color="body" path="button" /*/>}}
    {{</* card color="body-tertiary" path="button" /*/>}}
{{</* /card-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Custom header

Use the `header-style` argument to customize the header of the card.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card-group cols="2" gutter="3" orientation="none" */>}}
    {{</* card path="components" header-style="full"  /*/>}}
    {{</* card path="components" header-style="publication" /*/>}}
    {{</* card path="components" header-style="tags" /*/>}}
    {{</* card path="components" header-style="none" /*/>}}
{{</* /card-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Custom body

Use the `body-style` argument to customize the body of the card.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card-group cols="2" gutter="3" orientation="none" */>}}
    {{</* card path="components" body-style="full"  /*/>}}
    {{</* card path="components" body-style="title" /*/>}}
    {{</* card path="components" body-style="minimal" /*/>}}
    {{</* card path="components" body-style="none" /*/>}}
{{</* /card-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Custom footer

Use the `footer-style` argument to customize the contents of the card.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card-group cols="2" gutter="3" header-style="none" orientation="none" */>}}
    {{</* card path="components" footer-style="full" /*/>}}
    {{</* card path="components" footer-style="publication" /*/>}}
    {{</* card path="components" footer-style="tags" /*/>}}
    {{</* card path="components" footer-style="none" /*/>}}
{{</* /card-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Image placement

Use the `orientation` argument to customize the placement of the card's thumbnail or icon.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card path="button" header-style="none" footer-style="none" orientation="stacked"
    padding="3" class="col-sm-12 col-lg-6 mx-auto mb-3" /*/>}}
{{</* card path="button" header-style="publication" footer-style="tags" orientation="horizontal"
    padding="3" class="col-sm-12 col-lg-8 mx-auto" /*/>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Styling

The file `assets/scss/components/_card.scss` defines the Hinode-specific styling of the `card` shortcode. Check the [Bootstrap documentation](https://getbootstrap.com/docs/5.3/components/card/#css) for additional styling options.

{{< file file="assets/scss/components/_card.scss" show="false" >}}

## Arguments

The shortcode supports the following arguments:

{{< args "card" "shortcode" >}}
