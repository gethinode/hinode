---
author: Joost Mans
title: A different image shortcode
date: 2023-07-24
lastmod: 2023-08-17
description: Add more options to the image shortcode.
tags: ["image", "Hinode", "Hugo", "Blog"]
thumbnail:
    url: img/mimage.jpg
    author: Carl Heyerdahl
    authorURL: https://unsplash.com/@carlheyerdahl
    origin: Unsplash
    originURL: https://unsplash.com/photos/KE0nC8-58MQ
---
<!-- cSpell:ignore Joost shortcode Hinode getimage Exif mimage shortcodes mgetimage linenos frontmatter autocaption imgset srcset lastmod -->
## Introduction

The Hinode theme, I am using on this site, has already a very functional way of displaying images in content, which is the `image` shortcode that can be found in `layouts/shortcodes/image.html` file. This shortcode makes use of the `layouts/partials/utilities/Getimage.html` and the `layouts/partials/assets/image.html` partials for the actual work.

Even though the `image` shortcode already did a lot of things very well, I still wanted a few changes, which were the following:

- Add the parameter "outer" for the outer class to wrap both the image and the caption in.
- Add the parameter "inner" for the inner class to replace the current shortcode's "class" parameter.
  But keep that parameter for backwards compatibility (both will work and the "inner" parameter overrides the "class" parameter, when they both exist).
- Add the parameter "text for the caption class.
- Add the parameter "credits" to specify the credits for the image.
- Add the parameter "caption" to specify the caption text of the image.
- Add the parameter "autoCaption" to derive the caption and credits from a txt file or the EXIF of the image, when "caption" is not specified.
- Add the possibility to load an image relative to the current page, even when it is not a page bundle file.

The new shortcode and underlying functionality is still compatible with the existing functionality and I could have just changed the relevant files, however, I decided to copy the existing code into new files and make the changes there, leaving the original ones untouched. It is just neater that way. This resulted in the following new files:

- The `mimage` shortcode `layouts/shortcodes/mimage.html`
- The `mGetimage` partial to get the image: `layouts/partials/utilities/mGetimage.html`
- The `mimage` partial to show the image: `layouts/partials/assets/mimage.html`

Additionally the following file is needed:

- The class definitions used in the `mimage` shortcode, in the file `assets/scss/components/_mimage.scss`.

The detailed information on how to use and install the shortcode is available in the {{< link "/docs/shortcodes/mimage/overview" >}}documentation{{< /link >}}.

## Code explanation

### Loading the image

The source code of the shortcode starts with a check of all the parameters (see also {{< link "/docs/shortcodes/mimage/usage" >}}this page{{< /link >}} for all the parameters).  
One of these parameters is `src`, which specifies which image to load. This is part of the code that takes care of loading the image in `layouts/partials/utilities/mGetImage.html`.

```go-html-template {linenos=true,hl_Lines=["12-18"]}
{{ $url := .url -}}
{{ $page := .page -}}

{{ $img := "" }}
{{ $remote := hasPrefix (lower $url) "http" }}
{{ if $remote }}
    {{ $img = resources.GetRemote $url -}}
{{ else }}
    {{ if $page }}
        {{ $img = $page.Resources.GetMatch $url }}
    {{ end }}
    {{ if not $img }}
        <!-- Do we have a headless bundle? -->
        {{ $headless := $page.GetPage "headless" }}
        {{ if $headless }}
            {{- $img = $headless.Resources.GetMatch $url -}}
        {{ end }}
    {{ end }}
    {{ if not $img }}
        {{ $img = resources.GetMatch $url }}
    {{ end }}
{{ end }}

```

The highlighted part is the part that was added by me. The `mGetImage` partial has two input parameters, `url` and `page`. What happens in this snippet is that first a check is performed on whether or not the `url` is for a remote image. If so it tries to load that image. If not, we get to line 9.  
If the shortcode is used in a page bundle (`index.md` or `_index.md`) the code on line 11 will try to load the image relative to the page. If this image cannot be found or when the page where the shortcode is used is not a page bundle, the code will go to line 12 to check if there is a headless page bundle defined.  This is true when there is a folder `headless` in the same folder as where the page with the shortcode is located, and in that `headless` folder there is an `index.md` file with the following frontmatter:

```yaml
---
headless: true
---
```

If the image cannot be found, the code tries to load the specified image from the `assets` folder. If that also fails, no image will be found.

### Caption and credits

The caption and credits for the image is specified when the shortcode is used or, either derived from a file or from the Exif information of the image. The following shows the code that takes care of that:

```go-html-template {linenos=true}
<!-- Check if we need to derive the caption automatically from non-remote images -->
{{- if eq $autoCaption "true" -}}
    {{- $remote := hasPrefix (lower $url) "http" -}}
    {{- if and (not $remote) (or (not $caption) (not $credits)) -}}
        <!-- Check for existence of a .txt file with the same name as the current image, or for a description in the EXIF -->
        {{ $textPath := printf "%s/%s.txt" (path.Dir $img.RelPermalink) (path.BaseName $img.RelPermalink) -}}
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
        {{- with $img.Exif -}}
            {{- if not $caption -}}
                {{- $caption = .Tags.ImageDescription -}}
            {{- end -}}
            {{- if not $credits -}}
                {{- $credits = strings.Title (lower .Tags.Artist) -}}
            {{- end -}}
        {{- end -}}
    {{- end -}}
    {{- if and $caption (not $title) }}
        {{- $title = $caption -}}
    {{- end -}}
{{- end -}}  
```

This code is only executed when `autocaption` has been set to "true", the image is not remote and the caption and/or the credits have not been set as a parameter.

Line 6 builds the name of the text file that has the caption and/or credits for the current image. The name of the file is the same as the name of the image being processed, but with the extension `.txt`. Following that a check is performed if the file exists and if so, it will read the file.  
The format of the file is expected to be as follows:

```text
This part is the caption|and this is the credits
```

The part before the `|` character is the caption and the part following the `|` character is the credits. If there is no `|` character, everything is processed as the caption. When there are only credits, the contents of the file should start with the `|` character, followed by the credits. Any text after a second `|` character will be discarded. This is realized in lines 9-17.

When the caption or credits have not been found yet, an attempt is made to read it from the Exif information that is normally stored in the image file. This takes place in lines 19-26. In line 24, each first letter in the caption is capitalized. The reason for this is that some camera's store the photographer's name in all caps.

## Displaying the image

One of the changes that is not further detailed out here is that the ratio of 3x2 has been added. This has been made part of the code that creates the `imgset`, which is used in the below code. This is a set of images of different sizes that will be used for different screen sizes.

```go-html-template {linenos=true, hl_Lines=["1" "4" "13-27"]}
{{- if or $caption $credits -}}
    <figure {{ with $outerClass }}class="{{ . }}"{{ end }}>
{{ end }}
    <div class="{{ with $ratio }}ratio ratio-{{ . }}{{ end }}{{ if not (or $caption $credits) }} {{ $outerClass }}{{ end }}">
        <img class="img-fluid {{ $innerClass }}"
            {{ with $imgset -}}
            srcset="{{ . }}"
            sizes="100vw"
            {{- end }}
            src="{{ absURL $fallbackURL }}"
            alt="{{ $title }}">
    </div>
{{- if or $caption $credits -}}
    <!-- Add camera to credits -->
    {{- if $credits -}}
        {{- $icon := partial "assets/icon.html" (dict "icon" "fas fa-camera") }}
        {{ $credits = printf "%s %s" $icon $credits }}
    {{- end -}}
    <!-- Place credits in brackets if there is both a caption and a credit -->
    {{- $break := "" -}}
    {{- if and $caption $credits -}}
        {{- $credits  = printf "&nbsp;&nbsp;( %s)" $credits -}}
    {{- end -}}

    <figcaption class="figure-caption {{ $captionClass }}">{{ $caption | safeHTML }}{{ $credits | safeHTML }}</figcaption>
</figure>
{{- end -}}
```

The major change this code has compared to the original code, is the addition of the caption and credits, and how classes are assigned to the image and the caption/credits. The changed code is highlighted.

When there is neither a caption or credits, both the `outerClass` and `innerClass` are assigned to the image. When either the caption or credits exits, the image and the capt6ion/credits are wrapped in a `figure` and the `outerClass` is assigned to the figure, the `innerClass` to the image, and `captionClass` to the caption/credits. Furthermore a camera icon is added in front of the credits.

Compared to the parameters of the shortcode, `outerClass` corresponds to `outer`, `innerClass` to `inner` and `captionClass` to `text`.

## Wrap-up

The `image` shortcode provides already a lot of functionality, but I just wanted a bit more and something slightly different, which the `mimage` shortcode provides. If you like it, feel free to use it.
