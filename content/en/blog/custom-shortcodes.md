---
author: "Mark Dumay"
title: "Custom Shortcodes"
date: 2022-12-05
description: "Available shortcodes using Bootstrap components and styling"
tags: ["bootstrap", "shortcode"]
thumbnail: img/boots.jpg
photoCredits: <a href="https://unsplash.com/@nate_dumlao">Nathan Dumlao</a>
photoSource: <a href="https://unsplash.com/photos/QLPWQvHvmII">Unsplash</a>
---

Bootstrap is an open-source web development framework originally created by Twitter. It uses a responsive, mobile-first approach that scales seamlessly across different screen sizes. Bootstrap includes an extensive collection of ready-to-use components, such as navigation bars, pagination controls, buttons, and much more. The Hinode theme exposes several of those components as Hugo shortcodes to simplify their usage within markdown content. The below paragraphs illustrate the available shortcodes and how to use them.

## Carousel Shortcode

Use the `carousel` shortcode to display a carousel of several images, with behavior similar as the [Image Shortcode](#image-shortcode). The shortcode supports the following arguments:

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

## Command Prompt Shortcode

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

## Image Shortcode

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

[mozilla_image]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images
[hugo_imaging]: https://gohugo.io/content-management/image-processing/#imaging-configuration
