---
author: Mark Dumay
title: Components
date: 2023-07-21
description: Use shortcodes to add predefined components powered by external libraries.
tags: ["bootstrap", "shortcode"]
thumbnail: img/puzzle.jpg
photoCredits: <a href="https://unsplash.com/@ryoji__iwata">Ryoji Iwata</a>
photoSource: <a href="https://unsplash.com/photos/5siQcvSxCP8">Unsplash</a>
modules: ["katex", "leaflet"]
---

Hinode provides several shortcodes on top of the common [Bootstrap elements]({{< relref "bootstrap-elements" >}}). Refer to the [official documentation]({{< param "links.hinode_docs" >}}) for more details.

## Formula (KaTeX)

As an example, the following markdown renders two formulas using the KaTeX typesetting library.

{{< example lang="markdown" >}}
This is an inline $-b \pm \sqrt{b^2 - 4ac} \over 2a$ formula

This is not an inline formula:

$$x = a_0 + \frac{1}{a_1 + \frac{1}{a_2 + \frac{1}{a_3 + a_4}}}$$  
$$\forall x \in X, \quad \exists y \leq \epsilon$$
{{< /example >}}

## Map

As an example, the following shortcode displays an interactive map of the city of Amsterdam.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* map lat=52.377 long=4.90 zoom=13 popup="Amsterdam Central Station" popup-lat=52.378062 popup-long=4.900562 */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
