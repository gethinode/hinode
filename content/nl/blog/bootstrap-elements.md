---
author: Mark Dumay
title: Bootstrap elementen
date: 2023-02-17
description: Gebruik shortcodes om eenvoudig Bootstrap elementen toe te voegen.
tags: ["bootstrap", "shortcode"]
thumbnail: img/boots.jpg
photoCredits: <a href="https://unsplash.com/@nate_dumlao">Nathan Dumlao</a>
photoSource: <a href="https://unsplash.com/photos/QLPWQvHvmII">Unsplash</a>
---

Hinode beschikt over meerdere shortcodes om eenvoudig Bootstrap elementen toe te voegen aan je website. De [officiële documentatie]({{< param "links.hinode_docs" >}}) bevat meer details.

## Accordion

De volgende shortcode toont een accordion met drie elementen, waarvan de eerste is uitgeklapt.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* accordion */>}}
  {{</* accordion-item header="Accordion Item #1" show="true" */>}}
    Dit is de inhoud van het eerste element met ondersteuning voor HTML. De waarde <code>show</code>
    voor het argument <code>class</code> geeft aan dat het element uitgeklapt moet worden.
  {{</* /accordion-item */>}}
  {{</* accordion-item header="Accordion Item #2" */>}}
    Dit is de inhoud van het tweede element. Het ondersteunt ook HTML.
  {{</* /accordion-item */>}}
  {{</* accordion-item header="Accordion Item #3" */>}}
    Dit is de inhoud van het derde element.
  {{</* /accordion-item */>}}
{{</* /accordion */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Alert

De volgende shortcode toont een waarschuwing.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* alert color="danger" dismissible="true" */>}}
    Een eenvoudige waarschuwing
{{</* /alert */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Badge

Gebruik HTML code om een label toe te voegen aan een titel. De Bootstrap [documentatie]({{< param "links.bs_badge_heading" >}}) beschrijft meer opties.

{{< example >}}
<h1>Voorbeeldtekst met grootte één <span class="badge bg-secondary">Nieuw</span></h1>
<h2>Voorbeeldtekst met grootte twee <span class="badge bg-secondary">Nieuw</span></h2>
<h3>Voorbeeldtekst met grootte drie <span class="badge bg-secondary">Nieuw</span></h3>
<h4>Voorbeeldtekst met grootte vier <span class="badge bg-secondary">Nieuw</span></h4>
<h5>Voorbeeldtekst met grootte vijf <span class="badge bg-secondary">Nieuw</span></h5>
<h6>Voorbeeldtekst met grootte zes <span class="badge bg-secondary">Nieuw</span></h6>
{{< /example >}}

## Breadcrumb

De volgende shortcode toont het navigatiepad voor de blog pagina.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* breadcrumb path="blog" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Button

De volgende shortcode toont een knop met een label en een aanwijzing.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button color="secondary" tooltip="Toon je ongelezen berichten" href="#" badge="99+" */>}}
    Inbox
{{</* /button */>}}
{{< /example>}}
<!-- markdownlint-enable MD037 -->

## Button group

De volgende shortcode toont een groep van drie knoppen.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button-group aria-label="Basic example" */>}}
  {{</* button color="primary" href="#" */>}}Links{{</* /button */>}}
  {{</* button color="primary" href="#" */>}}Midden{{</* /button */>}}
  {{</* button color="primary" href="#" */>}}Rechts{{</* /button */>}}
{{</* /button-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Card

De volgende shortcode toont een kaart met een icoon dat linkt naar de [over mij]({{< ref "about" >}}) pagina. De kaart bevat een titel.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card path="about" padding="3" class="w-50" color="light" header="publication" footer="none" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Carousel

De volgende shortcode toont een carousel met drie pagina's, in een verhouding van 16x9 voor een breedte van 67% op grotere schermen.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/coffee.jpg" caption="pagina 1" */>}}
  {{</* img src="img/phone.jpg" caption="pagina 2" */>}}
  {{</* img src="img/dunes.jpg" caption="pagina 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Collapse

De volgende shortcode toont een knop die een informatiepaneel toont of verbergt.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button collapse="collapse-1" */>}}
    Trigger panel
{{</* /button */>}}

{{</* collapse id="collapse-1" class="p-3 border rounded" */>}}
    Dit is een voorbeeldtekst. Het informatiepaneel is <i>standaard verborgen </i> maar wordt getoond als
    de gebruiker op de bijbehorende knop drukt.
{{</* /collapse */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Command prompt

De volgende shortcode toont een prompt voor bash.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* command */>}}
export MY_VAR=123
{{</* /command */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Voeg  `user` en `host` om de gebruikerscontext op te geven. Als aanvulling, `(out)` definieert een outputregel en `\` is een markering die aangeeft dat de regel doorgaat op de volgende regel.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* command user="user" host="localhost" */>}}
export MY_VAR=123
echo "hello"
(out)hello
echo one \
two \
three
(out)one two three
echo "goodbye"
(out)goodbye
{{</* /command */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Docs

Gebruik de volgende shortcode om de inhoud van een `toml` of `scss` bestand te tonen.

{{< docs name="theme-colors" file="config/_default/params.toml" >}}

## Icon

De volgende shortcodes tonen drie verschillende iconen:

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fa square-check */>}}
{{</* fab linkedin */>}}
{{</* fas circle-check */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Image

De volgende shortcode toont een plaatje met afgeronde hoeken en een 21x9 verhouding.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/flowers.jpg" ratio="21x9" caption="Onderschrift" class="rounded" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Navbar

De volgende shortcode toont een navigatiemenu.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* navbar path="about" color="primary" size="sm" search="false" menus="sample" title="Brand" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Spinner

De volgende shortcode toont een ronddraaiende cirkel.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* spinner color="info" class="text-center" */>}}
Loading...
{{</* /spinner */>}}
{{< /example>}}
<!-- markdownlint-enable MD037 -->

## Toast

De volgende shortcode toont een knop die een bericht laat verschijnen op het scherm.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button id="toastButton" */>}}
    Toon bericht
{{</* /button */>}}

{{</* toast header="Titel" */>}}
    Dit is een bericht.
{{</* /toast */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Tooltip

De volgende shortcode toont een uitleg voor een gekleurde link.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* tooltip color="primary" title="Tooltip" href="#" */>}}
    Tooltip demonstration
{{</* /tooltip */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
