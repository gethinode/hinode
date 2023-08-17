---
author: Joost Mans
title: Adding a gallery
date: 2023-07-24
lastmod: 2023-08-15
description: Add a gallery to Hinode.
tags: ["gallery", "lightbox", "Hinode", "Hugo", "blog"]
thumbnail:
    url: /img/mgallery.jpg
    author: Mick Haupt
    authorURL: https://unsplash.com/@rocinante_11
    origin: Unsplash
    originURL: https://unsplash.com/photos/VbI0LMaGMlg
---
<!-- cSpell:ignore Joost shortcode Hinode mgallery Haupt lightbox mimage exif linenos frontmatter animage ovlpos ovlx ovly ovlperc divs lastmod shortcodes -->
## Introduction

One thing that the Hinode theme does not have is a gallery. There are loads of galleries to choose from, also usuable with Hugo, but I wanted something that kept within the theme of the site. As a result, I settled on creating the gallery myself and using {{< link "https://lokeshdhakar.com/projects/lightbox2/" >}}Lightbox 2 {{< /link >}} as a way to view the individual pictures in the gallery.

The `mgallery` shortcode offers the following features:

- Display the gallery in a grid mode or a masonry mode.
- Define a whitespace between the images in a gallery, ranging from none to very large.
- Create thumbnails that have the original ratio, or a ratio of 1x1, 3x2, 4x3, 16x9 or 21x9, without deforming the image.
- Define a variable number of columns, ranging from 2 to 5.
- Add an optional overlay to the image, in the center or in one of the four corners of the image (not for the thumbnails).
- Let the gallery fit in the look and feel of the site.
- Get the image caption and credits from a file or the image Exif information.

Details on how to install and use the `mgallery` shortcode, can be found in the {{< link "/docs/shortcodes/mgallery/overview" >}}documentation{{< /link >}}.

## Displaying the gallery

There are several ways to display a gallery, the two most common ones are to display the thumbnails in a grid and as a masonry.

In this implementation of the `mgallery` shortcode, showing thumbnails in a grid means that all images are organized in equally sized columns and all images on a row will have the same sized grid, as shown in the image below.

{{< mimage src="img/grid.jpg" caption="Images displayed in a grid" outer="image-center" text="caption-center text-italic">}}

The width of each grid element is always the same and is determined by the number of columns the gallery has. Because of that each of the image thumbnails is scaled to fit that width. The height of the grid elements on a row is based on the tallest image on that row. When there are horizontal and vertical images on a row, the result is a blank area in the grid elements that have a horizontal image.

A mason is a person who lays bricks. To prevent a wall to have holes, the bricks are fitted in such a ways that no holes will appear. The same is true for a masonry gallery. The images are fitted in such a way that there are no empty spaces. The `mgallery` shortcode supports a masonry as shown in the below image.

{{< mimage src="img/masonry.jpg" caption="Images displayed in a masonry" outer="image-center" text="caption-center text-italic">}}

The width of each masonry element is always the same and is determined by the number of columns the gallery has. Because of that each of the image thumbnails is scaled to fit that width. There is no alignment of images in the vertical direction. In the vertical direction images are 'fitted' to the image above, so that the distance between images is always the same.

If all images in a gallery have the same size, there is no visual difference between a grid and a masonry. At least not on a larger screen. On a smaller screen the number of columns will be reduced in a grid to try and keep the image size somewhat the same. In a masonry, the entire masonry is resized, making the masonry look the same, but with smaller images on a smaller screen.

## Code explanation

See the {{< link "/docs/shortcodes/mgallery/installation" >}}installation{{< /link >}} section of the `mgallery` documentation for information on where to find the `mgallery` shortcode source file.

### Loading the images

The source code of the shortcode starts with a check of all the parameters (see also {{< link "/docs/shortcodes/mgallery/usage" >}}this page{{< /link >}} for all the parameters).  
One of these parameters is `list`, which specifies which images should be displayed. This is the code that takes care of loading the set of images.

```go-html-template {linenos=true}
<!-- Get list of images to process -->
{{- $list := false -}}
{{- with .Get "list" -}}{{- $list = true -}}{{- end -}}
<!-- Get all images in the folder and sub-folders where the file is located -->
{{- $image := (.Page.Resources.ByType "image") -}}
{{- if .Page.BundleType -}}
    {{- if $list -}}
        <!-- Get all files that match the blob specified -->
        {{- $image = .Page.Resources.Match (.Get "list") -}}
        <!-- Filter the result to have images only -->
        {{- $image = $image.ByType "image" -}}
    {{- end -}}
{{- else -}}
    <!-- Not a bundle type. Do we have a headless folder? -->
    {{- $headless := .Page.GetPage "headless" -}}
    {{- if $headless -}}
        {{- if $list -}}
            <!-- Get all files that match the blob specified -->
            {{- $image = $headless.Resources.Match (.Get "list") -}}
            <!-- Filter the result to have images only -->
            {{- $image = $image.ByType "image" -}}
        {{- else -}}
            {{- $image = $headless.Resources.ByType "image" -}}
        {{- end -}}
    {{- end -}}
{{- end -}}
```

If the shortcode is used in a page bundle file, (`index.md` or `_index.md`), the check for `.Page.BundleType` in line 6 will be true. It will be false when the shortcode is used on any other page.

The default state for the `list` parameter is that all images in the bundle resource will be used, this is what happens in line 5. When the page is a page bundle and the `list` parameter is defined a search for the files that match the blob as specified in `list` will be performed (line 9) and following that filtered to remove all files that are not images (line 11).

When the page where the shortcode is used is not a page bundle, the code will go to line 15 to check if there is a headless page bundle defined.  
In this case this is true when there is a folder `headless` in the same folder as where the page with the shortcode is located, and in that `headless` folder there is an `index.md` file with the following frontmatter:

```yaml
---
headless: true
---
```

If this cannot be found, no images will be found either. If it is present and the `list` parameter of the shortcode is not used. All image resources of the headless page bundle will be used (line 23). If a blob is defined in the `list` parameter, a search for the files that match the blob as specified in `list` will be performed (line 19) and following that filtered to remove all files that are not images (line 21).

### Creating thumbnails

The code fragment for creating the thumbnails is as follows:

```go-html-template {linenos=true}
{{- $thumbName := printf "%s/%s_t%s%s" (path.Dir .RelPermalink) (path.BaseName .RelPermalink) $thumb (path.Ext .RelPermalink) -}}
<!-- Set height and width for resizing -->
{{- $ratioClass := "" -}}
<!-- Calculate the width based on the minimum of the image size and (window size)/cols -->
{{- $width := int (math.Min .Width (div $windowSize $cols)) -}}
<!-- Calculate the height and if needed, correct the width -->
{{- $height := 0 -}}
{{- if strings.Contains $thumb "regular" -}}
    {{- $height = int (div (mul $width .Height) .Width) }}
{{- else -}}
    <!-- Determine the height based on the width and the ratio -->
    {{- if strings.Contains $thumb "1x1" -}}
        {{- $height = $width -}}
        <!-- Correct width if height is larger than the image height -->
        {{- if gt $height .Height -}}
            {{- $height = .Height -}}
            {{- $width = $height -}}
        {{- end -}}
        {{- $ratioClass = "ratio ratio-1x1" -}}
    {{- else if strings.Contains $thumb "3x2" -}}
        {{- $height = int (div (mul $width 2) 3) -}}
        <!-- Correct width if height is larger than the image height -->
        {{- if gt $height .Height -}}
            {{- $height = .Height -}}
            {{- $width = int (div (mul $height 3) 2) -}}    
        {{- end -}}
        {{- $ratioClass = "ratio ratio-3x2" -}}
    {{- else if strings.Contains $thumb "4x3" -}}
        {{- $height = int (div (mul $width 3) 4) -}}
        <!-- Correct width if height is larger than the image height -->
        {{- if gt $height .Height -}}
            {{- $height = .Height -}}
            {{- $width = int (div (mul $height 4) 3) -}}    
        {{- end -}}
        {{- $ratioClass = "ratio ratio-4x3" -}}
    {{- else if strings.Contains $thumb "16x9" -}}
        {{- $height = int (div (mul $width 9) 16) -}}
        {{- if gt $height .Height -}}
            {{- $height = .Height -}}
            {{- $width = int (div (mul $height 16) 9) -}}
        {{- end -}}
        {{- $ratioClass = "ratio ratio-16x9" -}}
    {{- else if strings.Contains $thumb "21x9" -}}
        {{- $height = int (div (mul $width 9) 21) -}}
        {{- if gt $height .Height -}}
            {{- $height = .Height -}}
            {{- $width = int (div (mul $height 21) 9) -}}
        {{- end -}}
        {{- $ratioClass = "ratio ratio-21x9" -}}
    {{- end -}}
{{- end -}}
<!-- Resize and crop -->
{{- $resized := .Fill (printf "%dx%d q80 CatMullRom" $width $height) | resources.Copy $thumbName -}}
```

In line 1 the name of the thumbnail is generated, in order to create a user-friendly name for that thumbnail. It will be the basename of the image, postfixed with `_t` and the ratio value of the `thumb` parameter. It could be something like img/animage_t21x9.jpg

In line 5, the maximum width of the thumbnail is calculated. which is the window size (872 pixels) divided by the number of columns. Based on that width, the height of the thumbnail is calculated, based on the `thumb` parameter, in lines 12-50. In, the somewhat rare case, that the calculated height, happens to be larger than the image height, the height is made equal to the image Height and the width is recalculated.

Finally in line 53, the actual creation of the thumbnail happens. The resulting thumbnail will have the specified size, without deformation. The `.Fill` operation will use cropping and resizing to reach the specified size.

### Caption and credits

The caption and credits for each of the images are derived either from a file or from the Exif information of the image.

```go-html-template {linenos=true}
{{- $caption := "" -}}On line
{{- $credits := "" -}}
{{- $textPath := printf "%s/%s.txt" (path.Dir .RelPermalink) (path.BaseName .RelPermalink) -}}
{{ if os.FileExists $textPath -}}
    <!-- read the file -->
    {{- $reading := split (os.ReadFile $textPath) "|" -}}
    {{- range $index, $value := $reading -}}
        {{- if and (not $caption) (eq $index 0) -}}
            {{ $caption = $value }}
        {{- end -}}
        {{- if and (not $credits) (eq $index 1) -}}
            {{ $credits = $value }}
        {{- end -}}
    {{- end -}}
{{- end -}}
{{- with .Exif -}}
    {{- if not $caption -}}
        {{- $caption = .Tags.ImageDescription -}}
    {{- end -}}
    {{- if not $credits -}}
        {{- $credits = strings.Title (lower .Tags.Artist) -}}
    {{- end -}}
{{- end -}}
```

Line 3 builds the name of the text file that has the caption and/or credits for the current image. The name of the file is the same as the name of the image being processed, but with the extension `.txt`. Following that a check is performed if the file exists and if so, it will read the file.  
The format of the file is expected to be as follows:

```text
This part is the caption|and this is the credits
```

The part before the `|` character is the caption and the part following the `|` character is the credits. If there is no `|` character, everything is processed as the caption. When there are only credits, the contents of the file should start with the `|` character, followed by the credits. Any text after a second `|` character will be discarded. This is realized in lines 6-14.

When the caption or credits have not been found yet, an attempt is made to read it from the Exif information that is normally stored in the image file. This takes place in lines 16-23. In line 21, each first letter in the caption is capitalized. The reason for this is that some camera's store the photographer's name in all caps.

### Adding an overlay image

An overlay image can be added to the image. There are a few parameters that are used to determine in what way the overlay is to be added to the image. These parameters are:

Parameter|Description
---|---
overlay|Optional name of an overlay image located in the `assets` folder that is added to all the images in the gallery (not the thumbnails). This can e.g. be used as a watermark. If empty, no overlay is shown.
ovlpos|Optional position of the overlay image, which can be: "left-top", "right-top", "left-bottom", "right-bottom" (default), "center".
ovlx|Optional offset in pixels for the x direction of the overlay image in pixels. Will shift the image away from the corner. Not used for 'center'. Defaults to 0.
ovly|Optional offset in pixels for the y direction of the overlay image in pixels. Will shift the image away from the corner. Not used for 'center'. Defaults to 0.
ovlperc|Optional percentage for the size of the logo related to the size of the image. By default the logo is not resized.
{.table}

```go-html-template {linenos=true}
{{ if $useOverlay -}}
    <!-- Apply scaling of overlay when applicable -->
    {{ if ne $ovlperc 0 -}}
        <!-- Scaling of overlay -->
        <!-- Calculate new size of the overlay image -->
        {{ $useSize := math.Min .Width .Height -}}
        {{ $newSize := int (div (mul $useSize $ovlperc) 100) -}}
        <!-- Resize the overlay, but use a proper quality method -->
        {{ $overlay = $overlay.Resize (printf "%dx q80 CatMullRom" $newSize) -}}
    {{ end -}}

    <!-- Determine offset of the overlay image -->
    {{ $x := 0 -}}
    {{ $y := 0 -}}
    {{ if eq $ovlpos "left-top" -}}
        {{ $x = $ovlx -}}
        {{ $y = $ovly -}}
    {{ else if eq $ovlpos "left-bottom" -}}
        {{ $x = $ovlx -}}
        {{ $y = sub .Height (add $overlay.Height $ovly) -}}
    {{ else if eq $ovlpos "right-top" -}}
        {{ $x = sub .Width (add $overlay.Width $ovlx) -}}
        {{ $y = $ovly -}}
    {{ else if eq $ovlpos "right-bottom" -}}
        {{ $x = sub .Width (add $overlay.Width $ovlx) -}}
        {{ $y = sub .Height (add $overlay.Height $ovly) -}}
    {{ else if eq $ovlpos "center" -}}
        {{ $x = sub (div .Width 2) (div $overlay.Width 2) -}}
        {{ $y = sub (div .Height 2) (div $overlay.Height 2) -}}
    {{ end -}} 

    <!-- Add overlay to image, but instead of Hugo creating a name, use the original one + "_o" -->
    {{ $filename := printf "%s/%s%s%s" (path.Dir .RelPermalink) (path.BaseName .RelPermalink) "_o" (path.Ext .RelPermalink) -}}
    {{ $imageResult = .Filter (images.Overlay $overlay $x $y) | resources.Copy $filename -}}
{{ end -}}
```

When an overlay image has been defined and the `ovlperc` is defined and not equal to 0, a scaling of the overlay image will take place. If for example the percentage is 10, the overlay image will be resized to 10 percent of the image size to which it is to be added. This happens in lines 6-9.

In lines 13-30 the position of the overlay image is determined. When adding the overlay image.

The actual operation of adding the overlay image is done in lines 33 and 34.

### Showing the image

Then the images are to be displayed.

```go-html-template {linenos=true}
<div class="col gallery-pad-{{ $gap -}}">
        <div class="card {{ if $zoom }}card-zoom{{ end }} border-0">
            <div class="card-img-wrap {{ $ratioClass -}}">

<!-- Determine the class to use for the image -->
{{- $radiusClass := "" -}}
{{- if $radius -}}
    {{- $radiusClass = printf "image-radius-%d" $cols -}}
{{- end -}}

<!-- Add camera to credits -->
{{- if $credits -}}
    {{ $credits = printf "%s %s" (i18n "photoBy") $credits }}
{{- end -}}
<!-- Place credits in brackets if there is both a caption and a credit -->
{{- $break := "" -}}
{{- if and $caption $credits -}}
    {{- $credits  = printf "&nbsp;&nbsp;(%s)" $credits -}}
{{- end -}}

<!-- Output thumbnail with image link -->
<a href="{{ $imageResult.Permalink -}}" data-lightbox="{{- $boxName -}}" data-title="{{ $caption | safeHTML }}{{ $credits | safeHTML }}">
    <img class ="{{- if $classGrid -}}img-fluid {{ end }}{{ $radiusClass }} {{ $classUserImg -}}" src="{{ $resized.Permalink -}}" alt="{{- $caption -}}"/>
</a>

<!-- Classes end -->   
        </div>
    </div>
</div>
```

Line 1 defines the vertical gap between the images. Line 2 defines if the image will be zoomed when hovering over it and line 3 defines the ratio in which the image will be displayed. In line 8, if the radius has been enabled, the radius of the corners is determined.

Lines 12-19 constructs the credits and caption strings, which is displayed in lightbox.

Finally, line 22 builds the link that will open lightbox when the thumbnail is clicked, and line 23 shows the thumbnail. In these two lines the following elements are relevant:

- `$imageResult` is the image to display in lightbox (optionally with overlay image).
- All images with the same `data-lightbox`, will belong together and can be navigated to from within Lightbox.
- The text in `data-title` will be displayed below the image in lightbox.
- `class` is the set of classes that are assigned to the thumbnail. If a grid is being used, the image is made fluid. Additionally the corners of the class are set and the string from the `class` parameter is added.

### Making the container

The container that contains all the thumbnails is defined by a set of classes, which are different, depending on whether a grid is displayed or a masonry.

```go-html-template {linenos=true}
<!-- Output opening gallery divs for grid -->
{{- if $classGrid -}}
<div class="container-fluid">
    <div class="container-xxl flex-fill p-0">
            <div class="row grid-gap-{{ $gap }} {{ $colCard -}}">
{{- end -}}

<!-- Output opening gallery divs for masonry -->
{{- if $classMasonry -}}
<div class="masonry-container">
    <div class="col-md-12">
        <div class="masonry-{{- $cols }} masonry-gap-{{ $gap -}}">
{{- end -}}
```

For a grid, a fluid container is used, which will result in changing the image sizes and the number of columns when displayed on a smaller device. Furthermore, also the horizontal space between the images is specified. The number of columns has been calculated before and stored in `$colCard`.

For a masonry, a masonry container is used. the number of columns is defined and also the horizontal space between the images is set.

Note that a grid will use primarily bootstrap classes, whereas a masonry will use a mixture of bootstrap and self defined classes.

## Wrap-up

The `mgallery` shortcode provides the functionality that is needed for this site and it is also made for that reason. It should also be useable on any Hugo site that is based on the Hinode template and with some adaptions with respect to loading the Lightbox code on any other Hugo site, as long as Bootstrap is used.
