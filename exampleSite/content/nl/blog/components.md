---
author: Mark Dumay
title: Components
date: 2023-09-23
description: Gebruik shortcodes om voorgedefinieerde componenten toe te voegen die worden aangestuurd door externe bibliotheken.
tags: ["bootstrap", "shortcode"]
thumbnail:
  url: img/puzzle.jpg
  author: Ryoji Iwata
  authorURL: https://unsplash.com/@ryoji__iwata
  origin: Unsplash
  originURL: https://unsplash.com/photos/5siQcvSxCP8
modules: ["simple-datatables"]
---

Hinode provides several shortcodes on top of the common. Refer to the [official documentation]({{% param "links.hinode_docs" %}}) for more details.

Deze pagina is voor het testen van lokalisaties van de gegevenstabelcomponenten.

This page is for testing localizations of the data table components.

[English components page]({{% relref path="bootstrap-elements.md" lang="en" %}})

## Data tables

De volgende shortcode geeft bijvoorbeeld een responsieve tabel weer die geavanceerde besturingselementen gebruikt.

As an example, the following shortcode displays a responsive table that uses advanced controls.

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
