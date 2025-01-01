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

Hinode provides several shortcodes that wrap common Bootstrap components. Refer to the [official documentation]({{% param "links.hinode_docs" %}}) for more details.

## Abbr

As an example, the following shortcode displays the full text of an abbreviation on hover.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* abbr "CI/CD" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Accordion

As an example, the following shortcode displays an accordion with three elements, of which the first element is expanded.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
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
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Alert

As an example, the following shortcode displays a simple alert.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* alert color="danger" dismissible="true" */>}}
    A simple danger alert—check it out!
{{</* /alert */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Badge

Use the badge shortcode to display a badge for a heading.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
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
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Breadcrumb

As an example, the following shortcode displays a breadcrumb for the blog page.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* breadcrumb path="blog" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Button

As an example, the following shortcode displays a tooltip for a dark button with a badge.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* button color="secondary" tooltip="Click on the inbox to view your unread messages" href="#!" badge="99+" */>}}
    Inbox
{{</* /button */>}}
{{< /example>}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Button group

As an example, the following shortcode displays a group of three buttons.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* button-group aria-label="Basic example" */>}}
  {{</* button color="primary" href="#!" */>}}Left{{</* /button */>}}
  {{</* button color="primary" href="#!" */>}}Middle{{</* /button */>}}
  {{</* button color="primary" href="#!" */>}}Right{{</* /button */>}}
{{</* /button-group */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Card

As an example, the following shortcode displays a stacked card that links to the [about]({{% ref "about" %}}) page. It includes a custom header.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* card path="about" padding="3" class="col-6 mx-auto" color="body-tertiary"
  header="publication" footer="none" button=true /*/>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Card group

As an example, the following shortcode displays a card group of three elements.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* card-group padding="3" gutter="3" button=true buttonType="link" cols=2 scroll=true */>}}
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
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Carousel

As an example, the following shortcode displays a centered carousel with three slides, 16x9 aspect ratio, and a relative width of 67% on large screens.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/coffee.jpg" caption="slide 1" */>}}
  {{</* img src="img/phone.jpg" caption="slide 2" */>}}
  {{</* img src="img/dunes.jpg" caption="slide 3" */>}}
{{</* /carousel */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Collapse

As an example, the following shortcode displays a button that, when clicked, triggers a panel to appear or disappear.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* button collapse="collapse-1" */>}}
    Trigger panel
{{</* /button */>}}

{{</* collapse id="collapse-1" class="p-3 border rounded bg-primary-subtle" */>}}
    Some placeholder content for the collapse component. This panel is *hidden by default* but
    revealed when the user activates the relevant trigger.
{{</* /collapse */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Command prompt

Use the `command` shortcode to generate a block with a default bash command prompt.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* command */>}}
export MY_VAR=123
{{</* /command */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

Specify `user` and `host` to add the user context to the prompt. In addition, use `(out)` to specify an output line and use `\` to denote a line continuation.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
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
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Docs

Use the `docs` shortcode to display the content of a `js`, `scss` or `toml` file:

{{< docs name="theme-colors" file="config/_default/params.toml" >}}

## Example

Use the `example` shortcode to display a code example and to render a preview of the same input.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* command */>}}
export MY_VAR=123
{{</* /command */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## File

Use the `file` shortcode to print and highlight the full content of a given input file.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* file path="./config/_default/languages.toml" id="file-collapse-1" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Icon

As an example, the following shortcodes show a square check, a brand logo, a circle check, and a custom icon.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* fa square-check */>}}
{{</* fab linkedin */>}}
{{</* fas circle-check */>}}
{{</* icon custom activity */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Image

As an example, the following shortcode displays an image with rounded corners and a 4x3 aspect ratio in portrait mode.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* image src="img/flowers.jpg" ratio="4x3" caption="Figure caption" class="rounded col-md-6"
  portrait=true wrapper="text-center" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

The same image, but then using Markdown syntax:

{{< example lang="hugo" >}}
![Flowers](/img/flowers.jpg "Figure caption")
{class="rounded col-md-6" ratio="4x3" portrait=true wrapper="text-center"}
{{< /example >}}

As an example, the following shortcode displays a regular vector image.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* image src="/img/logo_icon.svg" class="col-sm-6 col-lg-4" wrapper="text-center" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

As an example, the following shortcode displays a vector image with a symbol reference.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* image src="/img/logo_var.svg#logo" class="col-sm-6 col-lg-4" wrapper="text-center" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Ins

As an example, the following shortcode displays underlined text.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example >}}
This is an {{</* ins */>}}underlined text{{</* /ins */>}}.
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Link

As an example, the following shortcodes render links in different formats.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
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
- {{</* link href="/fr/a-propos" force=true >}}About (French){{< /link */>}}
- {{</* link "#image" /*/>}}
- {{</* link "components/#map" /*/>}}

{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Mark

Use the `mark` shortcode to highlight text. The inner content is used as input.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
Use the mark shortcode to {{</* mark >}}highlight{{< /mark */>}} specific text.
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Nav

As an example, the following shortcode displays a tab group with vertically aligned pills.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
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
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Navbar

As an example, the following shortcode displays a light navigation header.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* navbar id="navbar-sample" path="blog" color="primary" size="md" search="false" menus="sample" title="Brand" mode="false" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Persona

As an example, the following shortcode displays a persona card with a primary color.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
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
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Release

As an example, the following shortcode displays a default release button.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* release version="v0.14.1" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Spinner

As an example, the following shortcode displays a centered spinner.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* spinner color="info" class="text-center" */>}}
Loading...
{{</* /spinner */>}}
{{< /example>}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Sub

As an example, the following shortcode displays subscript text.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example >}}
H{{</* sub 2 */>}}O is a liquid.
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Sup

As an example, the following shortcode displays superscript text.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example >}}
2{{</* sup 10 */>}} is 1024.
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Table

As an example, the following shortcode displays a responsive table.

{{% comment %}}<!-- markdownlint-disable MD037 MD058 -->{{% /comment %}}
{{< example lang="markdown" >}}
{{</* table */>}}
| #  | Heading | Heading | Heading | Heading | Heading | Heading | Heading | Heading | Heading |
|----|---------|---------|---------|---------|---------|---------|---------|---------|---------|
| 1. | cell    | cel     | cel     | cel     | cel     | cel     | cel     | cel     | cel     |
| 2. | cell    | cel     | cel     | cel     | cel     | cel     | cel     | cel     | cel     |
| 3. | cell    | cel     | cel     | cel     | cel     | cel     | cel     | cel     | cel     |
{{</* /table */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 MD058 -->{{% /comment %}}

## Timeline

As an example, the following shortcode displays a timeline with the file `data/timeline.en.yml` as data.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* timeline data="timeline" background="dark" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Toast

As an example, the following shortcode displays a button that, when clicked, triggers the toast message.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
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
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Tooltip

As an example, the following shortcode displays a tooltip for a colored hyperlink.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* tooltip color="primary" title="Tooltip caption" href="#!" */>}}Tooltip{{</* /tooltip */>}} demonstration
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Video

As an example, the following shortcode displays an Elephants video hosted by Cloudinary.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* video host="cloudinary" account="demo" id="elephants" autoplay=true */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}
