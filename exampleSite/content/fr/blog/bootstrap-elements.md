---
author: Mark Dumay
title: Éléments Bootstrap
slug: elements-bootstrap
date: 2023-08-12
description: Utilisez des shortcodes pour ajouter facilement des éléments Bootstrap courants.
tags: ["bootstrap", "shortcode"]
thumbnail:
  url: img/boots.jpg
  author: Nathan Dumlao
  authorURL: https://unsplash.com/@nate_dumlao
  origin: Unsplash
  originURL: https://unsplash.com/photos/QLPWQvHvmII
---

Hinode propose plusieurs shortcodes qui enveloppent des composants Bootstrap courants. Consultez la [documentation officielle]({{< param "links.hinode_docs" >}}) pour plus de détails.

## Abbr

À titre d'exemple, le shortcode suivant affiche le texte complet d'une abréviation lorsque survolé.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* abbr "CI/CD" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Accordéon

À titre d'exemple, le shortcode suivant affiche un accordéon avec trois éléments, dont le premier élément est déplié.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* accordion */>}}
  {{</* accordion-item header="Élément d'accordéon #1" show="true" */>}}
    Il s'agit du contenu du corps du premier élément de l'accordéon. Il prend en charge le contenu HTML, s'il est activé dans le moteur de rendu goldmark. L'élément est affiché en ajoutant la valeur `show` à l'argument `class`.
  {{</* /accordion-item */>}}
  {{</* accordion-item header="Élément d'accordéon #2" */>}}
    Il s'agit du contenu du corps du deuxième élément de l'accordéon.
  {{</* /accordion-item */>}}
  {{</* accordion-item header="Élément d'accordéon #3" */>}}
    Il s'agit du contenu du corps du troisième élément de l'accordéon.
  {{</* /accordion-item */>}}
{{</* /accordion */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Alerte

À titre d'exemple, le shortcode suivant affiche une alerte simple.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* alert color="danger" dismissible="true" */>}}
    Une simple alerte de danger — vérifiez-la !
{{</* /alert */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Badge

Utilisez le shortcode "badge" pour afficher un badge avec un en-tête.

<!-- markdownlint-disable MD037 -->
{{< example >}}
En-tête 1 {{</* badge title="Nouveau" */>}}
{.h1}

En-tête 2 {{</* badge title="Nouveau" */>}}
{.h2}

En-tête 3 {{</* badge title="Nouveau" */>}}
{.h3}

En-tête 4 {{</* badge title="Nouveau" */>}}
{.h4}

En-tête 5 {{</* badge title="Nouveau" */>}}
{.h5}

En-tête 6 {{</* badge title="Nouveau" */>}}
{.h6}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Fil d'Ariane

À titre d'exemple, le shortcode suivant affiche un fil d'Ariane pour la page du blog.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* breadcrumb path="blog" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Bouton

À titre d'exemple, le shortcode suivant affiche une infobulle pour un bouton sombre avec un badge.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button color="secondary" tooltip="Cliquez sur la boîte de réception pour voir vos messages non lus." href="#!" badge="99+" */>}}
    Boîte de réception
{{</* /button */>}}
{{< /example>}}
<!-- markdownlint-enable MD037 -->

## Groupe de boutons

À titre d'exemple, le shortcode suivant affiche un groupe de trois boutons.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button-group aria-label="Basic example" */>}}
  {{</* button color="primary" href="#!" */>}}Gauche{{</* /button */>}}
  {{</* button color="primary" href="#!" */>}}Millieu{{</* /button */>}}
  {{</* button color="primary" href="#!" */>}}Droite{{</* /button */>}}
{{</* /button-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Carte

À titre d'exemple, le shortcode suivant affiche une carte empilée qui renvoie à la page [à propos]({{< ref "about" >}}). Elle inclut un en-tête personnalisé.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card path="about" padding="3" class="col-6 mx-auto" color="body-tertiary"
  header="publication" footer="none" button=true /*/>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Groupe de cartes

À titre d'exemple, le shortcode suivant affiche un groupe de cartes avec trois éléments.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card-group padding="3" gutter="3" */>}}
    {{</* card title="Framework Bootstrap" icon="fab bootstrap" */>}}
        Créez des sites rapides et réactifs avec Bootstrap 5. Personnalisez facilement votre site
        avec les fichiers source Sass.
    {{</* /card */>}}
    {{</* card title="Recherche en texte intégral" icon="fas magnifying-glass" */>}}
        Recherchez votre site avec FlexSearch, une bibliothèque de recherche en texte intégral
        avec zéro dépendances.
    {{</* /card */>}}
    {{</* card title="Outils de développement" icon="fas code" */>}}
        Utilisez Node Package Manager pour automatiser le processus de construction et suivre
        les dépendances.
    {{</* /card */>}}
{{</* /card-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Carrousel

À titre d'exemple, le shortcode suivant affiche un carrousel centré avec trois slides, un rapport hauteur/largeur de 16:9 et une largeur relative de 67 % sur les grands écrans.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/coffee.jpg" caption="slide 1" */>}}
  {{</* img src="img/phone.jpg" caption="slide 2" */>}}
  {{</* img src="img/dunes.jpg" caption="slide 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Réduire

À titre d'exemple, le shortcode suivant affiche un bouton qui, lorsqu'il est cliqué, déclenche l'apparition ou la disparition d'un panneau.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button collapse="collapse-1" */>}}
    Déclencher le panneau
{{</* /button */>}}

{{</* collapse id="collapse-1" class="p-3 border rounded bg-primary-subtle" */>}}
    Un contenu de remplacement destiné au composant de repliement. Ce panneau est initialement masqué, mais il
    sera révélé lorsque l'utilisateur active le déclencheur correspondant.
{{</* /collapse */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Invite de commandes

Utilisez le shortcode `command` pour générer un bloc avec un invite de commandes bash par défaut.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* command */>}}
export MY_VAR=123
{{</* /command */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Spécifiez `user` et `host` pour ajouter le contexte de l'utilisateur à l'invite. De plus, utilisez `(out)` pour spécifier une ligne de sortie et utilisez `\` pour indiquer une continuation de ligne.

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

## Documentation

Utilisez le shortcode `docs` pour afficher le contenu d'un fichier `js`, `scss` ou `toml` :

{{< docs name="theme-colors" file="config/_default/params.toml" >}}

## Exemple

Utilisez le shortcode `example` pour afficher un exemple de code et pour afficher un aperçu de la même entrée.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* command */>}}
export MY_VAR=123
{{</* /command */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Fichier

Utilisez le shortcode `file` pour afficher et mettre en évidence le contenu complet d'un fichier d'entrée donné.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* file path="./config/_default/languages.toml" id="file-collapse-1" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Icon

À titre d'exemple, les shortcodes suivants affichent une coche carrée, un logo de marque et une coche circulaire.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fa square-check */>}}
{{</* fab linkedin */>}}
{{</* fas circle-check */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Image

À titre d'exemple, le shortcode suivant affiche une image avec des coins arrondis et un ratio d'aspect de 21:9.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/flowers.jpg" ratio="21x9" caption="Légende de l'image" class="rounded" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

À titre d'exemple, le shortcode suivant affiche une image vectorielle classique.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="/img/logo_icon.svg" class="col-sm-6 col-lg-4" wrapper="text-center" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

À titre d'exemple, le shortcode suivant affiche une image vectorielle avec une référence de symbole.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="/img/logo_var.svg#logo" class="col-sm-6 col-lg-4" wrapper="text-center" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Lien

À titre d'exemple, les shortcodes suivants rendent des liens dans différents formats.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

- {{</* link hinode >}}Lien nommé avec les paramètres par défaut{{< /link */>}}
- {{</* link name=hinode cue=false tab=false >}}Lien nommé s'ouvrant dans l'onglet actuel sans icône{{< /link */>}}
- {{</* link name=hinode cue=true tab=true >}}Lien nommé s'ouvrant dans un nouvel onglet avec icône{{< /link */>}}
- {{</* link hinode /*/>}}
- {{</* link href="https://developer.mozilla.org" >}}Lien externe{{< /link */>}}
- {{</* link "./projects/another-project" >}}Lien interne avec titre{{< /link */>}}
- {{</* link url="projects/another-project" /*/>}}
- {{</* link url="/projects/another-project" /*/>}}
- {{</* link url="../projects/another-project" case=false /*/>}}
- {{</* link "about" /*/>}}
- {{</* link "/en/about/" /*/>}}
- {{</* link "/en/about" >}}About (Anglais){{< /link */>}}
- {{</* link "#image" /*/>}}
- {{</* link "components/#map" /*/>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Mark

Utilisez le shortcode `mark` pour mettre en évidence le texte. Le contenu interne est utilisé en tant qu'entrée.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
Utilisez le shortcode `mark` pour {{</* mark >}}mettre en évidence{{< /mark */>}} un texte spécifique.
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Navigation

À titre d'exemple, le shortcode suivant affiche un groupe d'onglets avec des onglets alignés verticalement.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
  {{</* nav type="pills" vertical="true" */>}}
    {{</* nav-item header="Élément de navigation #1" show="true" */>}}
      Voici le contenu de navigation du premier élément. Il prend en charge le contenu HTML, s'il est
      activé dans le moteur de rendu Goldmark. L'élément est affiché en ajoutant la valeur `show` à l'argument `class`.
    {{</* /nav-item */>}}
    {{</* nav-item header="Élément de navigation #2" */>}}
      Voici le contenu de navigation du deuxième élément.
    {{</* /nav-item */>}}
    {{</* nav-item header="Élément de navigation #3" */>}}
      Voici le contenu de navigation du troisième élément.
    {{</* /nav-item */>}}
  {{</* /nav */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Barre de navigation

À titre d'exemple, le shortcode suivant affiche un en-tête de navigation clair.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* navbar id="navbar-sample" path="blog" color="primary" size="md" search="false" menus="sample" title="Marque" mode="false" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Publication

À titre d'exemple, le shortcode suivant affiche un bouton de publication par défaut.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* release version="v0.14.1" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Indicateur de chargement

À titre d'exemple, le raccourci suivant affiche un indicateur de chargement centré.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* spinner color="info" class="text-center" */>}}
Chargement...
{{</* /spinner */>}}
{{< /example>}}
<!-- markdownlint-enable MD037 -->

## Sub

À titre d'exemple, le shortcode suivant affiche du texte en indice.

<!-- markdownlint-disable MD037 -->
{{< example >}}
H{{</* sub 2 */>}}O est un liquide.
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Sup

À titre d'exemple, le shortcode suivant affiche du texte en exposant.

<!-- markdownlint-disable MD037 -->
{{< example >}}
2{{</* sup 10 */>}} équivaut à 1024.
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Chronologie

À titre d'exemple, le shortcode suivant affiche une chronologie avec le fichier `data/timeline-fr.yml` en tant que données.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* timeline data="timeline-fr" background="dark" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Notification

À titre d'exemple, le shortcode suivant affiche un bouton qui, lorsqu'il est cliqué, déclenche le message de notification.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button toast="toast-example-1" */>}}
    Affiche la notification #1
{{</* /button */>}}

{{</* button toast="toast-example-2" */>}}
    Affiche la notification #1
{{</* /button */>}}

{{</* toast id="toast-example-1" header="Premier titre" */>}}
    Ceci est le premier message de notification. Il prend en charge le `markdown`.
{{</* /toast */>}}

{{</* toast id="toast-example-2" header="Deuxième titre" */>}}
    Ceci est le deuxième message de notification. Il prend en charge le `markdown`.
{{</* /toast */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Infobulle

À titre d'exemple, le shortcode suivant affiche une infobulle pour un lien hypertexte coloré.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* tooltip color="primary" title="Légende de l'infobulle" href="#!" */>}}Démonstration{{</* /tooltip */>}} d'une infobulle
{{< /example >}}
<!-- markdownlint-enable MD037 -->
