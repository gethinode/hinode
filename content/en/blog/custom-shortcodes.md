---
author: "Mark Dumay"
title: "Custom Shortcodes"
date: 2022-12-05
modified: 2022-12-31
description: "Available shortcodes using Bootstrap components and styling."
tags: ["bootstrap", "shortcode"]
thumbnail: img/sketch.jpg
photoCredits: <a href="https://www.pexels.com/@picjumbo-com-55570/">picjumbo.com</a>
photoSource: <a href="https://www.pexels.com/photo/white-printer-paper-196645/">Pexels</a>
---

Bootstrap is an open-source web development framework originally created by Twitter. It uses a responsive, mobile-first approach that scales seamlessly across different screen sizes. Bootstrap includes an extensive collection of ready-to-use components, such as navigation bars, pagination controls, buttons, and much more. The Hinode theme exposes several of those components as Hugo shortcodes to simplify their usage within markdown content. The below paragraphs illustrate the available shortcodes and how to use them.

## Alert

Use the `alert` shortcode to display a contextual feedback message. The inner content is used as alert text. The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| color       | No  | Optional theme color of the alert, either "primary" (default), "secondary", "success", "danger",  "warning", "info", "light", or "dark". |
| dismissible | No  | Optional flag to indicate the alert is dismissible, defaults to false. |
{.table}

As an example, the following shortcode displays a simple alert.

```html
{{</* alert color="danger" */>}}
A simple danger alert—check it out!
{{</* /alert */>}}
```

The result looks like this:

{{< alert color="danger" >}}
A simple danger alert—check it out!
{{< /alert >}}

## Breadcrumb

Use the `breadcrumb` shortcode to display the current page’s location within the site's navigational hierarchy. The shortcode requires no arguments, see the following example.

```html
{{</* breadcrumb */>}}
```

The result looks like this:

{{< breadcrumb >}}

## Button

Use the `button` shortcode to display a button with a hyperlink. The inner content is used as button title. The button supports an optional badge and tooltip. The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| href        | Yes  | Address for the button hyperlink. |
| state       | No   | Optional state of the button, either "enabled" (default), "disabled", "active", or "inactive". |
| size        | No   | Optional size of the button, either "sm", "md" (default), or "lg". |
| color       | No   | Optional theme color of the element, either "primary" (default), "secondary", "success", "danger",  "warning", "info", "light", or "dark". |
| badge       | No   | Optional positioned badge to display on top of the button. |
| outline     | No   | Optional flag indicating the button should be outlined, either "false" (default) or "true". |
| aria-label  | No   | Optional label for the badge. |
| tooltip     | No   | Optional title to display in a tooltip. Ignored for active/inactive buttons. |
| placement   | No   | How to position the tooltip: "top" (default), "bottom", "left", or "right". |
{.table}

As an example, the following shortcode displays a tooltip for a dark button with a badge.

```html
{{</* button color="dark" tooltip="Click on the inbox to view your unread messages" href="#" badge="99+" */>}}
Inbox
{{</* /button */>}}
```

The result looks like this:

{{< button color="dark" tooltip="Click on the inbox to view your unread messages" href="#" badge="99+" >}}
Inbox
{{< /button >}}

## Button Group

Use the `button-group` shortcode to display a group of buttons. Add inner `<button>` elements for each [button](#button). The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| aria-label  | No   | Optional assistive label for the button group. |
{.table}

As an example, the following shortcode displays a group of three buttons.

```html
{{</* button-group aria-label="Basic example" */>}}
  {{</* button color="primary" href="#" */>}}Left{{</* /button */>}}
  {{</* button color="primary" href="#" */>}}Middle{{</* /button */>}}
  {{</* button color="primary" href="#" */>}}Right{{</* /button */>}}
{{</* /button-group */>}}
```

The result looks like this:

{{< button-group aria-label="Basic example" >}}
  {{< button color="primary" href="#" >}}Left{{< /button >}}
  {{< button color="primary" href="#" >}}Middle{{< /button >}}
  {{< button color="primary" href="#" >}}Right{{< /button >}}
{{< /button-group >}}

## Card

Use the `card` shortcode to display a card that links to a content page. When using a rich layout, the card includes a thumbnail and a header.

| Argument    | Required | Description |
|-------------|----------|-------------|
| path        | Yes | Required path of the page. |
| class       | No  | Optional class attribute of the card element, e.g. “w-50”. |
| color       | No  | Optional theme color of the card, either "primary", "secondary", "success", "danger", "warning", "info", "light", or "dark". By default, no color is specified. |
| padding     | No  | Optional padding of the content, either "0", "1", "2", "3", "4", "5", or "auto" (default). |
| header      | No  | Optional header components of the card, displayed in small caps. Supported values are "full" (default), "publication", "tags", and "none". |
| footer      | No  | Optional footer components of the card, displayed in small caps. Supported values are "full", "publication", "tags", and "none" (default). |
| orientation | No  | Optional placecement of the thumbnail, either "stacked" (default), "horizontal", or "none". |
{.table}

As an example, the following shortcode displays a colored, borderless horizontal card that links to the [Rich Content]({{< ref "rich-content" >}} "Rich Content") page. It includes a custom header and footer.

```html
{{</* ccard path="rich-content" class="w-100 border-0" orientation="horizontal" color="info" header="publication" footer="tags */>}}
```

The result looks like this:

{{< card path="rich-content" class="w-100 border-0" orientation="horizontal" color="info" header="publication" footer="tags" >}}

## Carousel

Use the `carousel` shortcode to display a carousel of several images, with similar behavior as the [Image Shortcode](#image-shortcode). The shortcode supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| ratio     | No  | Aspect ratio of the image, either "1x1", "4x3" (default), "16x9", or "21x9". |
| class     | No  | Optional class attribute of the `carousel` element, e.g. "w-75". |
{.table}

Add an inner `img` element for each slide of the carousel. The `img` element supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| src       | Yes | Required url of the image, e.g. "img/boots.jpg" or "https://picsum.photos/id/27/3264/1836". |
| caption   | No  | Optional image caption. If set, the image is darkened to improve the contrast. The caption is hidden on smaller screens. |
{.table}

As an example, the following shortcode displays a centered carousel with three slides, 16x9 aspect ratio, and a relative width of 67% on large screens.

```html
{{</* carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/coffee.jpg" caption="slide 1" */>}}
  {{</* img src="img/phone.jpg" caption="slide 2" */>}}
  {{</* img src="img/dunes.jpg" caption="slide 3" */>}}
{{</* /carousel */>}}
```

The result looks like this:

{{< carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" >}}
  {{< img src="img/coffee.jpg" caption="slide 1" >}}
  {{< img src="img/phone.jpg" caption="slide 2" >}}
  {{< img src="img/dunes.jpg" caption="slide 3" >}}
{{< /carousel >}}

## Command Prompt

The `command` shortcode generates terminal output for either `bash`, `powershell`, or `sql` shell languages. The shortcode supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| user      | No | Optional user to add to the prompt, e.g. "user". |
| host      | No | Optional host to add to the prompt, e.g. "localhost". |
| prompt    | No | Optional prompt override, e.g. "PS C:\Users\User>". |
| shell     | No | Type of shell, either "bash" (default), "powershell", or "sql". |
{.table}

### Bash (default shell)

Use the `command` shortcode to generate a block with a default bash command prompt.

```html
{{%/* command */%}}
export MY_VAR=123
{{%/* /command */%}}
```

The result looks like this:
{{% command %}}
export MY_VAR=123
{{% /command %}}

Specify `user` and `host` to add the user context to the prompt. In addition, use `(out)` to specify an output line and use `\` to denote a line continuation.

```html
{{%/* command user="user" host="localhost" */%}}
export MY_VAR=123
echo "hello"
(out)hello
echo one \
two \
three
(out)one two three
echo "goodbye"
(out)goodbye
{{%/* /command */%}}
```

The result looks like this:
{{% command user="user" host="localhost" %}}
export MY_VAR=123
echo "hello"
(out)hello
echo one \
two \
three
(out)one two three
echo "goodbye"
(out)goodbye
{{% /command %}}

### PowerShell

Set the `shell` argument to `powershell` to generate a PowerShell terminal. Override the `prompt` to add a directory if needed. Use the backtick `` ` `` symbol to denote a line continuation.

```html
{{%/* command prompt="PS C:\Users\User>" shell="powershell" */%}}
Write-Host `
'Hello' `
'from' `
'PowerShell!'
(out)Hello from PowerShell!
Write-Host 'Goodbye from PowerShell!'
(out)Goodbye from PowerShell!
{{%/* /command */%}}
```

The result looks like this:
{{% command prompt="PS C:\Users\User>" shell="powershell" %}}
Write-Host `
'Hello' `
'from' `
'PowerShell!'
(out)Hello from PowerShell!
Write-Host 'Goodbye from PowerShell!'
(out)Goodbye from PowerShell!
{{% /command %}}

### SQL

Set the `shell` argument to `sql` to generate a SQL terminal. Use the `(con)` suffix to denote a line continuation.

```html
{{%/* command prompt="mysql>" shell="sql" */%}}
set @my_var = 'foo';
set @my_other_var = 'bar';
CREATE TABLE people ((con)
first_name VARCHAR(30) NOT NULL,(con)
last_name VARCHAR(30) NOT NULL(con)
);
(out)Query OK, 0 rows affected (0.09 sec)
insert into people(con)
values ('John', 'Doe');
(out)Query OK, 1 row affected (0.02 sec)
select *(con)
from people(con)
order by last_name;
(out)+------------+-----------+
(out)| first_name | last_name |
(out)+------------+-----------+
(out)| John       | Doe       |
(out)+------------+-----------+
(out)1 row in set (0.00 sec)
{{%/* /command */%}}
```

The result looks like this:

{{% command prompt="mysql>" shell="sql" %}}
set @my_var = 'foo';
set @my_other_var = 'bar';
CREATE TABLE people ((con)
first_name VARCHAR(30) NOT NULL,(con)
last_name VARCHAR(30) NOT NULL(con)
);
(out)Query OK, 0 rows affected (0.09 sec)
insert into people(con)
values ('John', 'Doe');
(out)Query OK, 1 row affected (0.02 sec)
select *(con)
from people(con)
order by last_name;
(out)+------------+-----------+
(out)| first_name | last_name |
(out)+------------+-----------+
(out)| John       | Doe       |
(out)+------------+-----------+
(out)1 row in set (0.00 sec)
{{% /command %}}

## Image

Use the `image` shortcode to display a responsive image with a specific aspect ratio. The source link can refer to either an image available in the `/assets/img` folder of your site or a public web location. The shortcode renders the image as a so-called [image set][mozilla_image] to optimize the image for different screen sizes and resolutions. Behind the scenes, Hugo renders the images in `WebP` format and stores them in a local folder (`resources` or `public`). The images are processed using the quality setting specified in the `[imaging]` section of the main [config file][hugo_imaging] (defaults to 75). Supported image types are `.png`, `.jpeg`, `.gif`, `.tiff`, `.bmp`, and `.webp`. A fallback image of type `.jpeg` is provided for older browsers.The shortcode supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| src       | Yes | Required url of the image, e.g. "img/boots.jpg" or "https://picsum.photos/id/27/3264/1836". |
| ratio     | No  | Optional aspect ratio of the image, either "1x1", "4x3", "16x9", or "21x9". If set, the image is resized and cropped to match the ratio. Else the original aspect ratio of the image is kept. |
| class     | No  | Optional class attribute of the inner `img` element, e.g. "rounded". |
| title     | No  | Optional alternate text of the image. |
| caption   | No  | Optional figure caption. |
{.table}

As an example, the following shortcode displays an image with rounded corners and a 21x9 aspect ratio.

```html
{{</* image src="img/flowers.jpg" ratio="21x9" caption="Figure caption" class="rounded" */>}}
```

The result looks like this:
{{< image src="img/flowers.jpg" ratio="21x9" caption="Figure caption" class="rounded">}}

## Spinner

Use the `spinner` shortcode to indicate the loading state of a component or page. The inner content is used as alternative description. The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| color       | No  | Optional theme color of the spinner, either "primary" (default), "secondary", "success", "danger",  "warning", "info", "light", or "dark". |
| grow        | No  | Optional flag to indicate the spinner is growing instead of rotating, defaults to false. |
| class       | No  | Optional class attribute of the spinner wrapping element, e.g. “text-center”. |
{.table}

As an example, the following shortcode displays a centered spinner.

```html
{{</* spinner color="info" class="text-center" */>}}
Loading...
{{</* /spinner */>}}
```

The result looks like this:
{{< spinner color="info" class="text-center" >}}
Loading...
{{< /spinner >}}

## Toast

Use the `toast` shortcode to display a dismissable message in the bottom-right corner of the screen. The Hinode theme defines a click event for a button with id `toastButton`. Modify the file `assets/js/toast.js` if needed. The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| header      | No  | Optional header of the toast message. Uses the site title by default. |
{.table}

As an example, the following shortcode displays a button that, when clicked, triggers the toast message.

```html
{{</* button id="toastButton" */>}}
Show toast
{{</* /button */>}}

{{</* toast */>}}
This is a toast message.
{{</* /toast */>}}
```

The result looks like this:

{{< button id="toastButton" >}}
Show toast
{{< /button >}}

{{< toast >}}
This is a toast message.
{{< /toast >}}

## Tooltip

Use the `tooltip` shortcode to display a tooltip for a hyperlink. Refer to the [button shortcode]({{< ref "#button" >}} "button shortcode") on how to display a tooltip for a button instead. The inner content is used as hyperlink text. The shortcode supports the following arguments:

| Argument    | Required | Description |
|-------------|----------|-------------|
| color       | No   | Optional theme color of the element, either "primary" (default), "secondary", "success", "danger",  "warning", "info", "light", or "dark". |
| title       | Yes  | Title to display in the tooltip. |
| href        | Yes  | Address for the button or hyperlink. |
| placement   | No   | How to position the tooltip: "top" (default), "bottom", "left", or "right". |
{.table}

As an example, the following shortcode displays a tooltip for a colored hyperlink.

```html
{{</* tooltip color="warning" title="Tooltip" href="#" */>}}
Tooltip demonstration
{{</* /tooltip */>}}
```

The result looks like this:

{{< tooltip color="warning" title="Tooltip" href="#" >}}
Tooltip demonstration
{{< /tooltip >}}

[mozilla_image]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
[hugo_imaging]: https://gohugo.io/content-management/image-processing/#imaging-configuration
