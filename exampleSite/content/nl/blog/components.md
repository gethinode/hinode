---
author: Mark Dumay
title: Componenten
slug: componenten
date: 2023-07-21
description: Gebruik shortcodes om voorgedefiniëerde componenten toe te voegen die gebruikmaken van externe libraries.
tags: ["bootstrap", "shortcode"]
thumbnail: img/puzzle.jpg
photoCredits: <a href="https://unsplash.com/@ryoji__iwata">Ryoji Iwata</a>
photoSource: <a href="https://unsplash.com/photos/5siQcvSxCP8">Unsplash</a>
modules: ["katex", "leaflet"]
---

Hinode biedt meerdere shortcodes aan bovenop de gebruikelijke [Bootstrap elementen]({{< relref "bootstrap-elements" >}}). Zie de [officiële documentatie]({{< param "links.hinode_docs" >}}) voor meer details.

## Formule (KaTeX)

De volgende markdown code genereert twee wiskundige formules met behulp van KaTeX.

{{< example lang="markdown" >}}
Dit is een inline $-b \pm \sqrt{b^2 - 4ac} \over 2a$ formule

Dit is geen inline formule:

$$x = a_0 + \frac{1}{a_1 + \frac{1}{a_2 + \frac{1}{a_3 + a_4}}}$$  
$$\forall x \in X, \quad \exists y \leq \epsilon$$
{{< /example >}}

## Map

De volgende shortcode toont een interactieve kaart van Amsterdam.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* map lat=52.377 long=4.90 zoom=13 popup="Amsterdam CS" popup-lat=52.378062 popup-long=4.900562 */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
