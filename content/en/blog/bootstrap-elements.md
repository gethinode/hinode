---
author: Mark Dumay
title: Bootstrap elements
date: 2023-02-17
description: Use shortcodes to add common Bootstrap elements with ease.
tags: ["bootstrap", "shortcode"]
thumbnail: img/boots.jpg
photoCredits: <a href="https://unsplash.com/@nate_dumlao">Nathan Dumlao</a>
photoSource: <a href="https://unsplash.com/photos/QLPWQvHvmII">Unsplash</a>
---

Hinode provides several shortcodes that wrap common Bootstrap components. Refer to the [official documentation]({{< param "links.hinode_docs" >}}) for more details.

## Accordion

As an example, the following shortcode displays an accordion with three elements, of which the first element is expanded.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* accordion */>}}
  {{</* accordion-item header="Accordion Item #1" show="true" */>}}
    This is the first item's accordion body. It supports HTML content. The item is shown by adding the value
    <code>show</code> to the <code>class</code> argument.
  {{</* /accordion-item */>}}
  {{</* accordion-item header="Accordion Item #2" */>}}
    This is the second item's accordion body. It supports HTML content too.
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

Use HTML code to display a badge for a heading. See the Bootstrap [documentation]({{< param "links.bs_badge_heading" >}}) for more options.

{{< example >}}
<h1>Example heading of size one <span class="badge bg-secondary">New</span></h1>
<h2>Example heading of size two <span class="badge bg-secondary">New</span></h2>
<h3>Example heading of size three <span class="badge bg-secondary">New</span></h3>
<h4>Example heading of size four <span class="badge bg-secondary">New</span></h4>
<h5>Example heading of size five <span class="badge bg-secondary">New</span></h5>
<h6>Example heading of size six <span class="badge bg-secondary">New</span></h6>
{{< /example >}}

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
{{</* button color="secondary" tooltip="Click on the inbox to view your unread messages" href="#" badge="99+" */>}}
    Inbox
{{</* /button */>}}
{{< /example>}}
<!-- markdownlint-enable MD037 -->

## Button group

As an example, the following shortcode displays a group of three buttons.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button-group aria-label="Basic example" */>}}
  {{</* button color="primary" href="#" */>}}Left{{</* /button */>}}
  {{</* button color="primary" href="#" */>}}Middle{{</* /button */>}}
  {{</* button color="primary" href="#" */>}}Right{{</* /button */>}}
{{</* /button-group */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Card

As an example, the following shortcode displays a stacked card with icon that links to the [about]({{< ref "about" >}}) page. It includes a custom header.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* card path="about" padding="3" class="w-50" color="light" header="publication" footer="none" */>}}
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

{{</* collapse id="collapse-1" class="p-3 border rounded" */>}}
    Some placeholder content for the collapse component. This panel is <i>hidden by default</i> but
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

Use the `docs` shortcode to display the content of a `toml` or `scss` file:

{{< docs name="theme-colors" file="config/_default/params.toml" >}}

## Icon

As an example, the following shortcodes show a square check, a brand logo, and a circle check.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fa square-check */>}}
{{</* fab linkedin */>}}
{{</* fas circle-check */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Image

As an example, the following shortcode displays an image with rounded corners and a 21x9 aspect ratio.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* image src="img/flowers.jpg" ratio="21x9" caption="Figure caption" class="rounded" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Navbar

As an example, the following shortcode displays a light navigation header.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* navbar path="about" color="primary" size="sm" search="false" menus="sample" title="Brand" */>}}
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

## Toast

As an example, the following shortcode displays a button that, when clicked, triggers the toast message.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* button id="toastButton" */>}}
    Show toast
{{</* /button */>}}

{{</* toast header="Custom title" */>}}
    This is a toast message.
{{</* /toast */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Tooltip

As an example, the following shortcode displays a tooltip for a colored hyperlink.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* tooltip color="primary" title="Tooltip" href="#" */>}}
    Tooltip demonstration
{{</* /tooltip */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
