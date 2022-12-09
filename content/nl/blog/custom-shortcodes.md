---
author: "Mark Dumay"
title: "Extra shortcodes"
date: 2022-12-05
description: "Beschikbare shortcodes die gebruik maken van Bootstrap componenten en vormgeving"
tags: ["bootstrap", "shortcode"]
thumbnail: img/boots.jpg
photoCredits: <a href="https://unsplash.com/@nate_dumlao">Nathan Dumlao</a>
photoSource: <a href="https://unsplash.com/photos/QLPWQvHvmII">Unsplash</a>
---


Bootstrap is een open-source raamwerk voor het ontwikkelen van websites gemaakt door Twitter. Het volgt een aanpak die geschikt is voor meerdere schermformaten, inclusief mobiele apparaten. Bootstrap bevat een uitgebreide collectie van direct bruikbare componenten, zoals navigatiemenu's, paginering, knoppen, en nog veel meer. Om het gebruik hiervan in markdown pagina's te vergemakkelijken, stelt het Hinode thema enkele van deze componenten beschikbaar als Hugo shortcode. De onderstaande paragrafen bieden een overzicht en uitleg van de beschikbare shortcodes.

## Carousel Shortcode

Gebruik de `carousel` shortcode om een carousel van meerdere plaatjes te tonen, analoog aan de [Image Shortcode](#image-shortcode). De shortcode ondersteunt de volgende parameters:

| Parameter | Verplicht | Toelichting |
|-----------|-----------|-------------|
| ratio     | Nee       | Verhouding van het plaatje, de mogelijke waarden zijn "1x1", "4x3" (standaard), "16x9", en "21x9". |
| class     | Nee       | Optionele `class` waarde van het `carousel` element, bijvoorbeeld "w-75". |
{.table}

Voeg een `img` element toe voor elke pagina van de carousel. Het `img` element ondersteunt de volgende parameters:

| Parameter | Verplicht | Toelichting |
|-----------|-----------|-------------|
| src       | Ja        | Verplichte url van het plaatje, bijvoorbeeld "img/boots.jpg" of "https://picsum.photos/id/27/3264/1836". |
| caption   | Nee       | Optionele beschrijving van het plaatje. Het plaatje wordt iets donkerder gemaakt om het contrast te verhogen. Op kleinere schermen wordt de beschrijving weggelaten. |
{.table}

Ter illustratie toont de volgende shortcode een carousel met drie pagina's in een verhouding van 16x9 en een relatieve breedte van 67% voor grote schermen.

```html
{{</* carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/coffee.jpg" caption="slide 1" */>}}
  {{</* img src="img/phone.jpg" caption="slide 2" */>}}
  {{</* img src="img/dunes.jpg" caption="slide 3" */>}}
{{</* /carousel */>}}
```

Het resultaat ziet er als volgt uit:
{{< carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" >}}
  {{< img src="img/coffee.jpg" caption="slide 1" >}}
  {{< img src="img/phone.jpg" caption="slide 2" >}}
  {{< img src="img/dunes.jpg" caption="slide 3" >}}
{{< /carousel >}}

## Image Shortcode

Gebruik de `image` shortcode om een adaptief plaatje met een specifieke verhouding te tonen. De bron kan verwijzen naar een bestand in de `/assets/img` folder van je website of naar een publieke weblocatie. De shortcode genereert het plaatje als een zogenaamde [image set][mozilla_image] om deze te optimaliseren voor meerdere schermformaten en verschillende resoluties. Achter de schermen converteert Hugo de plaatjes naar een `WebP` bestandsformaat en slaat deze op in een lokale folder (`resources` of `public`). De kwaliteit van het plaatje kan worden opgegeven in de sectie `[imaging]` van de site [configuratie][hugo_imaging] (75 is de standaardwaarde). De geschikte bestandsformaten zijn `.png`, `.jpeg`, `.gif`, `.tiff`, `.bmp` en `.webp`. Een plaatje in het formaat `.jpeg` is beschikbaar voor oudere browsers. De shortcode ondersteunt de volgende parameters:

| Parameter | Verplicht | Toelichting |
|-----------|----------|-------------|
| src       | Ja  | Verplichte url van het plaatje, bijvoorbeeld "img/boots.jpg" of "https://picsum.photos/id/27/3264/1836". |
| ratio     | Nee | Verhouding van het plaatje, de mogelijke waarden zijn "1x1", "4x3", "16x9", en "21x9". Als de verhouding niet is opgegeven dan wordt de verhouding van het originele bestand gebruikt. |
| class     | Nee | Optionele `class` waarde van het `img` element, bijvoorbeeld "rounded". |
| title     | Nee | Optionele beschrijving van het plaatje. |
| caption   | Nee | Optioneel onderschrift van het plaatje. |
{.table}

Ter illustratie toont de volgende shortcode een plaatje met afgeronde hoeken en een verhouding van 21x9.

```html
{{</* image src="img/flowers.jpg" ratio="21x9" caption="Onderschrift" class="rounded" */>}}
```

Het resultaat ziet er als volgt uit:
{{< image src="img/flowers.jpg" ratio="21x9" caption="Onderschrift" class="rounded">}}

[mozilla_image]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
[hugo_imaging]: https://gohugo.io/content-management/image-processing/#imaging-configuration
