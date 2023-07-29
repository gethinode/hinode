<!-- cSpell:ignore Joost Getimage someimage mimage shortcode autocaption exif shortcodes Hinode frontmatter -->
<!-- markdownlint-disable MD003 MD022 MD041 -->
---
author: Joost Mans
title: mimage usage
date: 2023-07-04
Description: Description on how to use the mimage shortcode
layout: docs
_build:
  list: never
---
<!-- markdownlint-enable MD022 MD041 -->

## mimage shortcode

The source code of the `mimage` shortcode is located in `layouts/shortcodes/mimage.html`.  
The purpose of this shortcode is to load an image from the internet or from the site and to show it on the page. The actual functionality is handled for the most part in the `mimage` partial.

### Parameters

The mimage shortcode supports the below parameters.

Parameter|Description
---|---
src|Required url or relative path of the image, e.g. "img/example.jpg". It is either a URL, an image located in the assets folder or an image located relatively to the current page. This is also the search order for the image.
title|Optional alternative title of the image.
mode|Optional flag indicating if the image should support color modes. Default is "false".
ratio|Optional ratio of the image, either "1x1", "3x2", "4x3", "16x9", or "21x9". Do not use the parameter to keep the original aspect ratio of the image.
outer|Optional class attribute of the outer div element, e.g. "img-wrap".
inner|Optional class attribute of the inner img element, e.g. "rounded".
class|Optional class attribute of the inner img element. Available for backwards compatibility. When both 'inner' and 'class' are provided, 'class' will be ignored.
text|Optional class attribute of the caption, e.g. "text-center".
caption|Optional image caption text.
credits|Optional image credits text.
autocaption|Optional parameter, which when "true" and 'caption' is not defined, will try to determine the caption/credits. Default is "false".
{.table}

The below sections provide more information about the following parameters: [src](#image-source), [mode](#mode) and [autoCaption](#autocaption).

#### Image Source

In order to load the image as specified in `src` the following steps are taken:

1. Check if `src` starts with "http", if so, load the image from the link specified in `src`, else goto 2.
   If loading the image from the internet fails, stop processing.
2. Try to load the image from the `assets` folder. Usually images are located in `assets/img`, this would mean the image could be specified like `img/someimage.jpg`. If the image cannot be found, goto 3.
3. Try to load the image relative to the location of the current page bundle. This means that this only works when the page with the shortcode is an `index.md` or `_index.md` file. If the `src` is `img/someimage.jpg`, the image should be located in the `img` folder relative to the page bundle file the shortcode is called from. If this fails goto 4.
4. Search for a folder `headless` relative to the current page. In that folder there should be an `index.md` file with the frontmatter `headless: true`. If this is the case, the image is searched for, relative to that `headless` folder. So, if the `src` is `img/someimage.jpg`, the image should be located in the `headless/img` folder relative to the page from where the shortcode is used.

#### mode

if `mode` is "true", there should be an image for each color mode that is supported. Default the color modes 'dark' and 'light' are supported. In a dark color mode the 'dark' image is shown and in a light color mode the 'light' image is shown.

When, as an example, the `src` parameter is `img/someimage.jpg`, there needs to be an image named `img/someimage-dark.jpg` and `img/someimage-light.jpg`.

#### autoCaption

When the `autoCaption` parameter is "true" and `caption` is not specified, the shortcode will search for a text file at the same location as where the image is located. If e.g. `src` is `img/someimage.jpg`, the file `img/someimage.txt` is loaded (if it exists). The contents of that file is a simple text file with the caption and the credits information, separated by the '|' character, like:

```text
This is the caption|This is the credits
```

When that file cannot be found, the Exif information of the file is loaded, where the `ImageDescription` tag is used for the caption and the `Artist` tag for the credits, if there is information in them at all.

## mimage partial

The source code of the `mimage` partial is located in `layouts/shortcodes/mimage.html`.  
The purpose of this partial is to load an image from the internet or from the site and to show it on the page with the proper styling.

### Parameters

The mimage partial supports the below parameters.

Parameter|Description
---|---
url|Required url or relative path of the image, e.g. "img/example.jpg". It is either a URL, an image located in the assets folder or an image located relatively to the current page. See also the [src](#image-source) parameter of the `mimage` shortcode.
title|Optional alternative title of the image.
mode|Optional flag indicating if the image should support color modes. Default is "false".
page|Optional page resource, which is required when the image to load is relative to the current page. The `mimage` shortcode uses `.Page` for this parameter.
ratio|Optional ratio of the image, either "1x1", "3x2", "4x3", "16x9", or "21x9". Do not use the parameter to keep the original aspect ratio of the image.
outerClass|Optional class attribute of the outer div element, e.g. "img-wrap".
innerClass|Optional class attribute of the inner img element, e.g. "rounded".
captionClass|Optional class attribute of the caption, e.g. "text-center".
caption|Optional image caption text.
credits|Optional image credits text.
autocaption|Optional parameter, which when "true" and 'caption' is not defined, will try to determine the caption/credits. Default is "false". See also the [autoCaption](#autocaption) parameter of the `mimage` shortcode.
{.table}

## mGetImage partial

The source code of the `mGetImage` partial is located in `layouts/partials/utilities/mGetImage.html`.  
The purpose of this partial is to load an image from the internet or from the site and, as it is a utility, is normally always called by an other partial.

### Parameters

The `mGetImage` partial supports the below parameters

Parameter|Description
---|---
url|Required parameter, which specifies the image to load. See also the [src](#image-source) parameter of the `mimage` shortcode.
page|Optional parameter, which specifies the current page. This parameter is only required when the image to load is located relatively to the page. Usually the value `.Page` is used for this parameter.
{.table}

### Return

When successful the partial returns the image resource.  
If it is not successful `nil` is returned. There are two conditions when this can occur. The first is when the image cannot be found. The second is when the specified file is not an image. In both cases also a warning is created.

## _mimage classes

There are a number of classes defined that can be used with the `mimage` shortcode. They are defined in `assets/scss/_mimage.scss`. The file also contains classes that are used by the `mimage` partial, which implies that the `_mimage.scss` file is a required file.

Class|Description
---|---
url|Required parameter, which specifies the image to load. See also the [src](#image-source) parameter of the `mimage` shortcode.
<nobr>text-italic</nobr>|Used for the caption text, to make it italic.
<nobr>caption-right</nobr>|Align the caption and credits to the bottom right of the image.
<nobr>caption-center</nobr>|Align the caption and credits to the center of the image.
<nobr>caption-left</nobr>|Align the caption and credits to the left of the image.
<nobr>image-center</nobr>|Center the image
<nobr>image-float-left</nobr>|Place the image to the left and make text wrap around the right side of the image, when the image is smaller than the available space.
<nobr>image-float-right</nobr>|Place the image to the right and make text wrap around the left side of the image, when the image is smaller than the available space.
<nobr>image-radius-x</nobr>|creates rounded corners on the image. 'x' is a value from 1 to 5. Where 1 is the largest radius and 5, the smallest.
{.table}

When the `mimage` partial is used to replace the `image` partial in an other existing Hinode partial, only the `text-italic` and `image-radius-x` classes from the above table will work, as the other classes will most likely conflict with the already used classes in that Hinode partial.  
To still be able to align the caption properly in that case, the following classes are defined.

Class|Description
---|---
<nobr>caption-align-right</nobr>|Align the caption and credits to the bottom right of the image.
<nobr>caption-align-center</nobr>|Align the caption and credits to the center of the image.
<nobr>caption-align-left</nobr>|Align the caption and credits to the left of the image.
{.table}
