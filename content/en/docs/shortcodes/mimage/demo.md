<!-- cSpell:ignore Joost mimage shortcode Letraset Aldus Clintock consectetur undoubtable Finibus Bonorum Malorum amet exif -->
<!-- markdownlint-disable MD003 MD022 MD041 -->
---
author: Joost Mans
title: mimage demo
date: 2023-07-04
Description: A demonstration of some usages of the mimage shortcode
layout: docs
_build:
  list: never
---
<!-- markdownlint-enable MD022 MD041 -->

## Example 1

Making an image float to the left or the right, only works when the image is smaller than the available page width. This is true for the image used in the below example. For this specific image there is also a text file with the same name as the image and which has the following contents:

```text
This is a description in a text file and we make sure it is long enough by adding a whole bunch of extra text|someone somewhere
```

The part before the '|' character is the caption and the part following that character is the credits.

By calling the following shortcode the image is floated to the right, with the caption and credits automatically located and the found caption and text are centered with respect to the image. Besides that the text is also made to appear in an italic font.  
Some text has been added and make sure it is long enough to show that the text wraps around the image.

<!-- markdownlint-disable MD037 -->
```go-html-template
{{</* mimage src="img/JM_LSP_01b.jpg" outer="image-float-right" inner="image-radius-3" text="caption-center text-italic" autoCaption="true" */>}}
```
<!-- markdownlint-enable MD037 -->

{{< mimage src="img/JM_LSP_01b.jpg" outer="image-float-right" inner="image-radius-3" text="caption-center text-italic" title="some Image" autoCaption="true" >}}Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.  
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

## Example 2

The next example shows an image that is centered (actually it is larger than the available space, so it will always look centered) and it will derive the credits from the Exif information and show it right aligned to the image. The image also uses larger rounded corners.

<!-- markdownlint-disable MD037 -->
```go-html-template
{{</* mimage src="img/JM_LSP_03.jpg" outer="image-center" inner="image-radius-1" text="caption-right text-italic" autoCaption="true" */>}}  
```
<!-- markdownlint-enable MD037 -->

{{< mimage src="img/JM_LSP_03.jpg" outer="image-center" inner="image-radius-1" text="caption-right text-italic" autoCaption="true" >}}

## Example 3

This third example shows an image that is somewhat smaller than the available window space and is centered. A caption is provided, so even though the `autoCaption` parameter is "true", a caption in a text file or the Exif file will not used. The credits in either of them will be used however as that is not specified.

<!-- markdownlint-disable MD037 -->
```go-html-template
{{</* mimage src="img/JM_LSP_12.jpg" outer="image-center" inner="image-radius-3" text="caption-left text-italic" caption="Here is some caption text" autoCaption="true" */>}}
```
<!-- markdownlint-enable MD037 -->

{{< mimage src="img/JM_LSP_12.jpg" outer="image-center" inner="image-radius-3" text="caption-left text-italic" caption="Here is some caption text" autoCaption="true" >}}
