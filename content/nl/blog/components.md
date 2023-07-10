---
author: Mark Dumay
title: Componenten
slug: componenten
date: 2023-07-10
description: Gebruik shortcodes om voorgedefiniëerde componenten toe te voegen die gebruikmaken van externe libraries.
tags: ["bootstrap", "shortcode"]
thumbnail: img/puzzle.jpg
photoCredits: <a href="https://unsplash.com/@ryoji__iwata">Ryoji Iwata</a>
photoSource: <a href="https://unsplash.com/photos/5siQcvSxCP8">Unsplash</a>
---

Hinode biedt meerdere shortcodes aan bovenop de gebruikelijke [Bootstrap elementen]({{< relref "bootstrap-elements" >}}). Zie de [officiële documentatie]({{< param "links.hinode_docs" >}}) voor meer details.

## Map

De volgende shortcode toont een interactieve kaart van Amsterdam.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* map lat=52.377 long=4.90 zoom=13 popup="Amsterdam CS" popup-lat=52.378062 popup-long=4.900562 */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
