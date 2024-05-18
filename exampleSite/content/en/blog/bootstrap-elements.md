---
author: Mark Dumay
title: Bootstrap elements
date: 2023-08-12
description: Use shortcodes to add common Bootstrap elements with ease.
tags: ["bootstrap", "shortcode"]
thumbnail:
  url: img/boots.jpg
  author: Nathan Dumlao
  authorURL: https://unsplash.com/@nate_dumlao
  origin: Unsplash
  originURL: https://unsplash.com/photos/QLPWQvHvmII
---

Hinode provides several shortcodes that wrap common Bootstrap components. Refer to the [official documentation]({{< param "links.hinode_docs" >}}) for more details.

## Abbr

As an example, the following shortcode displays the full text of an abbreviation on hover.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* abbr "CI/CD" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Accordion

As an example, the following shortcode displays an accordion with three elements, of which the first element is expanded.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* accordion */>}}
  {{</* accordion-item header="Accordion Item #1" show="true" */>}}
    This is the first item's accordion body. It supports HTML content, if enabled in the goldmark
    renderer. The item is shown by adding the value `show` to the `class` argument.
  {{</* /accordion-item */>}}
  {{</* accordion-item header="Accordion Item #2" */>}}
    This is the second item's accordion body.
  {{</* /accordion-item */>}}
  {{</* accordion-item header="Accordion Item #3" */>}}
    This is the third item's accordion body.
  {{</* /accordion-item */>}}
{{</* /accordion */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Alert

As an example, the following shortcode displays a simple alert.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* alert color="danger" dismissible="true" */>}}
    A simple danger alert—check it out!
{{</* /alert */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Badge

Use the badge shortcode to display a badge for a heading.

<!-- markdownlint-disable MD037 -->
{{< example >}}
Heading 1 {{</* badge title="New" */>}}
{.h1}

Heading 2 {{</* badge title="New" */>}}
{.h2}

Heading 3 {{</* badge title="New" */>}}
{.h3}

Heading 4 {{</* badge title="New" */>}}
{.h4}

Heading 5 {{</* badge title="New" */>}}
{.h5}

Heading 6 {{</* badge title="New" */>}}
{.h6}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Breadcrumb

As an example, the following shortcode displays a breadcrumb for the blog page.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* breadcrumb path="blog" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Button

As an example, the following shortcode displays a tooltip for a dark button with a badge.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button color="secondary" tooltip="Click on the inbox to view your unread messages" href="#!" badge="99+" */>}}
    Inbox
{{</* /button */>}}
{{< /example>}}
<!-- markdownlint-enable MD037 -->

## Button group

As an example, the following shortcode displays a group of three buttons.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button-group aria-label="Basic example" */>}}
  {{</* button color="primary" href="#!" */>}}Left{{</* /button */>}}
  {{</* button color="primary" href="#!" */>}}Middle{{</* /button */>}}
  {{</* button color="primary" href="#!" */>}}Right{{</* /button */>}}
{{</* /button-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Card

As an example, the following shortcode displays a stacked card that links to the [about]({{< ref "about" >}}) page. It includes a custom header.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card path="about" padding="3" class="col-6 mx-auto" color="body-tertiary"
  header="publication" footer="none" button=true /*/>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Card group

As an example, the following shortcode displays a card group of three elements.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card-group padding="3" gutter="3" button=true buttonType="link" */>}}
    {{</* card title="Bootstrap framework" icon="fab bootstrap" */>}}
        Build fast, responsive sites with Bootstrap 5. Easily customize your site with the source
        Sass files.
    {{</* /card */>}}
    {{</* card title="Full text search" icon="fas magnifying-glass" */>}}
        Search your site with FlexSearch, a full-text search library with zero dependencies.
    {{</* /card */>}}
    {{</* card title="Development tools" icon="fas code" */>}}
        Use Node Package Manager to automate the build process and to keep track of dependencies.
    {{</* /card */>}}
{{</* /card-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Carousel

As an example, the following shortcode displays a centered carousel with three slides, 16x9 aspect ratio, and a relative width of 67% on large screens.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/coffee.jpg" caption="slide 1" */>}}
  {{</* img src="img/phone.jpg" caption="slide 2" */>}}
  {{</* img src="img/dunes.jpg" caption="slide 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Collapse

As an example, the following shortcode displays a button that, when clicked, triggers a panel to appear or disappear.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button collapse="collapse-1" */>}}
    Trigger panel
{{</* /button */>}}

{{</* collapse id="collapse-1" class="p-3 border rounded bg-primary-subtle" */>}}
    Some placeholder content for the collapse component. This panel is *hidden by default* but
    revealed when the user activates the relevant trigger.
{{</* /collapse */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Command prompt

Use the `command` shortcode to generate a block with a default bash command prompt.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* command */>}}
export MY_VAR=123
{{</* /command */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Specify `user` and `host` to add the user context to the prompt. In addition, use `(out)` to specify an output line and use `\` to denote a line continuation.

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

Use the `docs` shortcode to display the content of a `js`, `scss` or `toml` file:

{{< docs name="theme-colors" file="config/_default/params.toml" >}}

## Example

Use the `example` shortcode to display a code example and to render a preview of the same input.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* command */>}}
export MY_VAR=123
{{</* /command */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## File

Use the `file` shortcode to print and highlight the full content of a given input file.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* file path="./config/_default/languages.toml" id="file-collapse-1" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Icon

As an example, the following shortcodes show a square check, a brand logo, a circle check, and a custom icon.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fa square-check */>}}
{{</* fab linkedin */>}}
{{</* fas circle-check */>}}
{{</* icon custom activity */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Image

As an example, the following shortcode displays an image with rounded corners and a 21x9 aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/flowers.jpg" ratio="21x9" caption="Figure caption" class="rounded" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

As an example, the following shortcode displays a regular vector image.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="/img/logo_icon.svg" class="col-sm-6 col-lg-4" wrapper="text-center" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

As an example, the following shortcode displays a vector image with a symbol reference.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="/img/logo_var.svg#logo" class="col-sm-6 col-lg-4" wrapper="text-center" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Link

As an example, the following shortcodes render links in different formats.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

- {{</* link hinode >}}Named link with default settings{{< /link */>}}
- {{</* link name=hinode cue=false tab=false >}}Named link opening in current tab w/o icon{{< /link */>}}
- {{</* link name=hinode cue=true tab=true >}}Named link opening in new tab with icon{{< /link */>}}
- {{</* link hinode /*/>}}
- {{</* link href="https://developer.mozilla.org" >}}External link{{< /link */>}}
- {{</* link href="https://demo.gethinode.com/en/about/" >}}Surrogate external link{{< /link */>}}
- {{</* link "./projects/another-project" >}}Internal link with title{{< /link */>}}
- {{</* link url="projects/another-project" /*/>}}
- {{</* link url="/projects/another-project" /*/>}}
- {{</* link url="../projects/another-project" case=false /*/>}}
- {{</* link "about" /*/>}}
- {{</* link "/fr/a-propos/" /*/>}}
- {{</* link "/fr/a-propos" >}}About (French){{< /link */>}}
- {{</* link "#image" /*/>}}
- {{</* link "components/#map" /*/>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Mark

Use the `mark` shortcode to highlight text. The inner content is used as input.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
Use the mark shortcode to {{</* mark >}}highlight{{< /mark */>}} specific text.
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Nav

As an example, the following shortcode displays a tab group with vertically aligned pills.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
  {{</* nav type="pills" vertical="true" */>}}
    {{</* nav-item header="Nav Item #1" show="true" */>}}
      This is the first item's nav body. It supports HTML content, if enabled in the goldmark
      renderer. The item is shown by adding the value `show` to the `class` argument.
    {{</* /nav-item */>}}
    {{</* nav-item header="Nav Item #2" */>}}
      This is the second item's nav body.
    {{</* /nav-item */>}}
    {{</* nav-item header="Nav Item #3" */>}}
      This is the third item's nav body.
    {{</* /nav-item */>}}
  {{</* /nav */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Navbar

As an example, the following shortcode displays a light navigation header.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* navbar id="navbar-sample" path="blog" color="primary" size="md" search="false" menus="sample" title="Brand" mode="false" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Persona

As an example, the following shortcode displays a persona card with a primary color.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* persona thumbnail="/img/creator-1x1.jpg" title="Creators" color="primary" */>}}
  As a content creator you value your independence. You like to take control of your
  online and offline presence. You want to focus on growing your audience, without
  limitations.

  Hinode gives you the tools to publish your blog in the way that you want. You have
  full ownership and control of your content. That is why content creators choose
  Hinode.
{{</* /persona */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Release

As an example, the following shortcode displays a default release button.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* release version="v0.14.1" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Spinner

As an example, the following shortcode displays a centered spinner.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* spinner color="info" class="text-center" */>}}
Loading...
{{</* /spinner */>}}
{{< /example>}}
<!-- markdownlint-enable MD037 -->

## Sub

As an example, the following shortcode displays subscript text.

<!-- markdownlint-disable MD037 -->
{{< example >}}
H{{</* sub 2 */>}}O is a liquid.
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Sup

As an example, the following shortcode displays superscript text.

<!-- markdownlint-disable MD037 -->
{{< example >}}
2{{</* sup 10 */>}} is 1024.
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Table

As an example, the following shortcode displays a responsive table.

<!-- markdownlint-disable MD037 -->
{{< example lang="markdown" >}}
{{</* table */>}}
| #  | Heading | Heading | Heading | Heading | Heading | Heading | Heading | Heading | Heading |
|----|---------|---------|---------|---------|---------|---------|---------|---------|---------|
| 1. | cell    | cel     | cel     | cel     | cel     | cel     | cel     | cel     | cel     |
| 2. | cell    | cel     | cel     | cel     | cel     | cel     | cel     | cel     | cel     |
| 3. | cell    | cel     | cel     | cel     | cel     | cel     | cel     | cel     | cel     |
{{</* /table */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Timeline

As an example, the following shortcode displays a timeline with the file `data/timeline.en.yml` as data.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* timeline data="timeline" background="dark" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Toast

As an example, the following shortcode displays a button that, when clicked, triggers the toast message.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button toast="toast-example-1" */>}}
    Show toast 1
{{</* /button */>}}

{{</* button toast="toast-example-2" */>}}
    Show toast 2
{{</* /button */>}}

{{</* toast id="toast-example-1" header="First title" */>}}
    This is the first toast message. It supports `markdown.`
{{</* /toast */>}}

{{</* toast id="toast-example-2" header="Second title" */>}}
    This is the second toast message. It supports `markdown.`
{{</* /toast */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Tooltip

As an example, the following shortcode displays a tooltip for a colored hyperlink.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* tooltip color="primary" title="Tooltip caption" href="#!" */>}}Tooltip{{</* /tooltip */>}} demonstration
{{< /example >}}
<!-- markdownlint-enable MD037 -->
