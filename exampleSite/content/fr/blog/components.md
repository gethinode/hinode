---
author: Mark Dumay
title: Composents
slug: composents
date: 2023-07-21
description: Utilisez des shortcodes pour ajouter des composants prédéfinis alimentés par des bibliothèques externes.
tags: ["bootstrap", "shortcode"]
thumbnail:
  url: img/puzzle.jpg
  author: Ryoji Iwata
  authorURL: https://unsplash.com/@ryoji__iwata
  origin: Unsplash
  originURL: https://unsplash.com/photos/5siQcvSxCP8
modules: ["leaflet", "lottie", "simple-datatables"]
---

Hinode propose plusieurs shortcodes en plus des [éléments Bootstrap]({{% relref "bootstrap-elements" %}}) courants. Consultez la [documentation officielle]({{% param "links.hinode_docs" %}}) pour plus de détails.

## Animation

À titre d'exemple, le shortcode suivant affiche une animation qui se déclenche au survol.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* animation data="gatin.json" auto=false hover=true class="col-6 mx-auto" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Data tables

À titre d'exemple, le shortcode suivant affiche un tableau réactif utilisant des contrôles avancés.

<!-- markdownlint-disable MD037 MD058 -->
{{< example lang="markdown" >}}
{{</* table sortable="true" paging="true" searchable="true" pagingOptionPerPage=5 */>}}
|  #  | Heading |
|-----|---------|
|  1. | Item 1  |
|  2. | Item 2  |
|  3. | Item 3  |
|  4. | Item 4  |
|  5. | Item 5  |
|  6. | Item 6  |
|  7. | Item 7  |
|  8. | Item 8  |
|  9. | Item 9  |
| 10. | Item 10  |
| 11. | Item 11  |
| 12. | Item 12  |
| 13. | Item 13  |
| 14. | Item 14  |
| 15. | Item 15  |
| 16. | Item 16  |
| 17. | Item 17  |
| 18. | Item 18  |
| 19. | Item 19  |
| 20. | Item 20  |
| 21. | Item 21  |
| 22. | Item 22  |
| 23. | Item 23  |
| 24. | Item 24  |
| 25. | Item 25  |
| 26. | Item 26  |
| 27. | Item 27  |
| 28. | Item 28  |
| 29. | Item 29  |
| 30. | Item 30  |
{{</* /table */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Formule (KaTeX)

À titre d’exemple, le markdown suivant affiche deux formules en utilisant la bibliothèque de composition typographique KaTeX.

{{{< example lang="markdown" >}}
Voici une formule $-b \pm \sqrt{b^2 - 4ac} \over 2a$ en ligne

Il s'agit d'une formule non en ligne:

$$x = a_0 + \frac{1}{a_1 + \frac{1}{a_2 + \frac{1}{a_3 + a_4}}}$$  
$$\forall x \in X, \quad \exists y \leq \epsilon$$
{{< /example >}}

## Map

À titre d'exemple, le shortcode suivant affiche une carte interactive de la ville d'Amsterdam.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* map lat=52.377 long=4.90 zoom=13 popup="Gare centrale d'Amsterdam" popup-lat=52.378062 popup-long=4.900562 */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
