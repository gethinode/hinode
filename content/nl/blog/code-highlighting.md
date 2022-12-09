---
author: "Mark Dumay"
slug: "code-markeren"
title: "Code markeren"
date: 2022-04-16
description: "Voorbeelden om de syntax van een taal te markeren."
tags: ["code"]
thumbnail: img/notepad.jpg
photoCredits: <a href="https://unsplash.com/@frederickjmedina">Frederick Medina</a>
# credits: Photo by <a href="https://unsplash.com/@frederickjmedina">Frederick Medina</a> on <a href="https://unsplash.com/photos/PdfRE-xB--s">Unsplash</a>
photoSource: <a href="https://unsplash.com/photos/PdfRE-xB--s">Unsplash</a>
---

## Code Fencing

Gebruik code fencing om de syntax voor een specifieke taal te markeren.

```json
{
  "version": "0.2.0",
  "themes": [],
  "projects": [],
  "configuration": {}
}
```

```html
<div class="highlight">
    <pre>
        <code>some code...</code>
    </pre>
</div>
```

## Highlight Shortcode

Gebruik de `highlight` shortcode om de lay-out van een taalfragment aan te passen.

{{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=199" >}}
// GetTitleFunc returns a func that can be used to transform a string to
// title case.
//
// The supported styles are
//
// - "Go" (strings.Title)
// - "AP" (see https://www.apstylebook.com/)
// - "Chicago" (see https://www.chicagomanualofstyle.org/home.html)
//
// If an unknown or empty style is provided, AP style is what you get.
func GetTitleFunc(style string) func(s string) string {
  switch strings.ToLower(style) {
  case "go":
    return strings.Title
  case "chicago":
    return transform.NewTitleConverter(transform.ChicagoStyle)
  default:
    return transform.NewTitleConverter(transform.APStyle)
  }
}
{{< / highlight >}}
