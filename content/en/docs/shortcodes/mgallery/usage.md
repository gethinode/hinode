---
author: Joost Mans
title: mgallery usage
date: 2023-07-04
lastmod: 2023-08-15
Description: Description on how to use the mgallery shortcode
layout: docs
showComments: false
_build:
  list: never
---
<!-- cSpell:ignore Joost mgallery shortcode shortcodes ovlpos ovlx ovly ovlperc frontmatter jfif webp lastmod -->

## mgallery shortcode

The source code of the `mgallery` shortcode is to be found in `layouts/shortcodes/mgallery.html`.  
The purpose of this shortcode is to load a defined set of images, create thumbnails of those images and place them in a gallery.

### Parameters

The `mgallery` shortcode supports the below parameters.

Parameter|Description
---|---
list|Optional blob used to determine where to fetch the list of images from, like `"img/*"`, with img being the name of a folder relative to the current page bundle file or relative to a headless folder for all non page bundle files. If not specified the blob is `"*"`. See also the {{< link "#image-source" >}}Image Source{{< /link >}} section below for more info.
type|Optional parameter to change the way the gallery is displayed. The following options exist:<br/>"grid"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default. Show the images on a row-column-grid.<br/>"masonry" Show in a masonry style where the images are in columns of the same size, but there are no rows.<br/>Note that the actual masonry functionality only shows when "thumb" is "regular". In the other "thumb" options, it will look like a grid.
thumb|Optional setting for resizing the image into a thumbnail image. The image resizing is performed by both resizing and cropping the image, without stretching or compressing the image. The resulting thumbnail image can never be larger than the actual width and height of the image. The following options are valid:<br/>"regular" Default setting for "type" is "masonry". Creates thumbnails with the same aspect ratio as the image<br/>"1x1"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Default setting for "type" is "grid". Creates square thumbnails<br/>"3x2"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Creates thumbnails with a wxh ratio of 3x2<br/>"4x3"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Creates thumbnails with a wxh ratio of 4x3<br/>"16x9"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Creates thumbnails with a wxh ratio of 16x9<br/>"21x9"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Creates thumbnails with a wxh ratio of 21x9
cols|Optional parameter that will set the number of columns in which the images will be organized. The values 2..5 are supported.
radius|Optional radius of the corners of the images, creating rounded corners. This can be either "true" (default) or "false" for no radius. The actual radius of the corner, depends on the number of columns used. More columns, will result in a smaller radius.
unique|Optional parameter that defaults to "true". Will make sure that all images in the gallery created by this shortcode will create a unique group of images. Navigation is then limited to that unique group of images. If set to "false", all images that are shown with multiple shortcode calls in the same page, will belong to the same group.
zoom|Optional zooming effect when hovering over the image. This can be either "true" (default) or "false" for no zoom effect.
gap|Optional space between the images. The following options are supported:<br/>"0"&nbsp;&nbsp;&nbsp;&nbsp;No gap. The images will touch each other.<br/>"xs"&nbsp;&nbsp;&nbsp;very small gap<br/>"s"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Small gap<br/>"m"&nbsp;&nbsp;&nbsp;Medium gap (default)<br/>"l"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Large gap<br/>"xl"&nbsp;&nbsp;&nbsp;Extra large gap<br/>"xxl" Very large gap
class|Optional parameter to specify an additional class to be used for the image.
overlay|Optional name of an overlay image located in the `assets` folder that is added to all the images in the gallery (not the thumbnails). This can e.g. be used as a watermark. If empty, no overlay is shown.
ovlpos|Optional position of the overlay image, which can be: "left-top", "right-top", "left-bottom", "right-bottom" (default), "center".
ovlx|Optional offset in pixels for the x direction of the overlay image in pixels. Will shift the image away from the corner. Not used for 'center'. Defaults to 0.
ovly|Optional offset in pixels for the y direction of the overlay image in pixels. Will shift the image away from the corner. Not used for 'center'. Defaults to 0.
ovlperc|Optional percentage for the size of the logo related to the size of the image. By default the logo is not resized.
{.table}

The below section provides more information about the {{< link "#image-source" >}}list{{< /link >}} parameter.

#### Image source

In order to load the the set of images as specified in `list` the following will happen:

- When the page from where the `mgallery` shortcode is called, is a page bundle file (`index.md` or `_index.md`) a scan is performed in all page bundle resources for all image files matching the specified blob.
- When the page from where the `mgallery` shortcode is called is not a page bundle file, a scan is performed in the `headless` folder for all files matching the blob. The `headless` folder should be located in the same directory as the page. In that folder there should be an `index.md` file with the frontmatter `headless: true`.

The resulting list of images, will only contain images that are supported by Hugo, which are images of the following types:

- image/bmp (bmp)
- image/gif (gif)
- image/jpeg (jpg jpeg jpe jif jfif)
- image/png (png)
- image/svg+xml (svg)
- image/tiff (tif tiff)
- image/webp (webp)
