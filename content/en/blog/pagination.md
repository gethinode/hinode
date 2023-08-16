---
author: Joost Mans
title: Multi-page articles
date: 2023-08-15
lastmod: 2023-08-15
description: Adding the option to create multi-page articles with pagination
tags: ["blog", "pagination"]
thumbnail:
    url: /img/pages.webp
    author: Olga Tutunaru
    authorURL: https://unsplash.com/@otutunaru
    origin: Unsplash
    originURL: https://unsplash.com/photos/JMATuFkXeHU
---
<!-- cSpell:ignore Joost lastmod Tutunaru webp jmooring frontmatter multipage pagenumber mpfolder anotherpage thispage Hinode linenos linenostart isset errorf myproject offcanvas offcanvass inledby mpagination dropup mimage pagbut pagbutfirst pagbutlast pagarrow paglist pagdrop pagdroplist -->
For the projects articles I am planning to write, I need the option to split an article over multiple pages. These pages belong together and it needs to be possible to navigate from one page to the other. On top of that it needs to have as little configuration as possible.

While searching for potential ways to solve this, I found this solution by {{< link "https://github.com/jmooring/hugo-testing/tree/hugo-forum-topic-29161" >}}jmooring{{< /link >}}, which I felt was a nice solution.

## Basic set-up

Each multi-page article is to be located in its own folder. In that folder the bundle page file `_index.md` is created and it needs to have the following in the frontmatter:

```yaml
layout: multipage
```

Then the pages that are part of this multi-page article can be added to the same folder. As many pages as needed can be added. Each of these pages has the following in the frontmatter:

```yaml
title: Title of the page
pagenumber: 1
```

It should be noted that the actual page number needs to be different for each page. These numbers will indicate the order of the pages. The first page has `pagenumber: 1`, the second `pagenumber: 2`, etc.

This would result in something like the following:

```goat
projects 
|
+--- _index.md
|
+--- myproject.md
|
+--- mpfolder
     |
     +--- _index.md
     |
     +--- anotherpage.md
     |
     +--- page.md                                                                                         
     |
     +--- thispage.md

```

<br>
This is used as an example throughout this blog.

When Hugo processes the files, the `_index.md` file in the `projects` folder will be responsible for searching for all the page files. It will however not find the `_index.md` file in the `mpfolder`. instead, it will show the 3 pages in that folder as separate projects. As a result there will be four projects shown. Whereas the multi-page folder, should be shown as 1 project.

A change to the Hinode theme is needed to correct this.

## Locating the page bundle file

To have the `_index.md` file in `mpfolder` act as an entry point to the multi-page article consisting of the 3 pages in that folder, the file `layouts/partials/assets/section-list.html` needs to be changed. This file is called by `layouts/_default/list.html` to get the pages that belong to the `_index.md` page bundle file, located in `projects`.

```go-html-template {linenos=true,linenostart=34,hl_Lines=[2, 25, "36-38", 40, "42-44", 46]}
{{- $width := 100 -}}
{{- $multipage := false -}}

{{- with (index site.Params.sections $section) -}}
    {{- with index . "title" }}{{ $title = or $.title . }}{{ end -}}
    {{- with index . "sectionHeader" }}{{ $sectionHeader = . }}{{ end -}}
    {{- with index . "sort" }}{{ $sort = . }}{{ end -}}
    {{- if (index . "reverse") }}{{ $order = "desc" }}{{ else }}{{ $order = "asc" }}{{ end -}}
    {{- if $home }}{{- if (isset . "nested") }}{{ $nested = (index . "nested") }}{{ end -}}{{ end -}}
    {{- if (index . "separator") }}{{ $separator = true }}{{ else }}{{ $separator = false }}{{ end -}}
    {{- with index . "orientation" }}{{ $orientation = . }}{{ end -}}
    {{- with index . "cols" }}{{ $cols = . }}{{ end -}}
    {{- with index . "color" }}{{ $color = . }}{{ end -}}
    {{- with index . "padding" }}{{ $padding = . }}{{ end -}}
    {{- with index . "header" }}{{ $header = . }}{{ end -}}
    {{- with index . "footer" }}{{ $footer = . }}{{ end -}}
    {{- with index . "style" }}{{ $style = . }}{{ end -}}
    {{- with index . "homepage" }}{{ $homepage = . }}{{ end -}}
    {{- with index . "background" }}{{ $background = . }}{{ end -}}
    {{- with index . "layout" }}{{ $layout = . }}{{ end -}}
    {{- with index . "pane" }}{{ $pane = . }}{{ end -}}
    {{- with index . "type" }}{{ $type = . }}{{ end -}}
    {{- with index . "vertical" }}{{ $vertical = . }}{{ end -}}
    {{- with index . "width" }}{{ $width = . }}{{ end -}}
    {{- if index . "multipage" }}{{ $multipage = true }}{{ $nested = false }}{{ end -}}
{{- end -}}
{{ if ne (printf "%T" $nested) "bool" }}
    {{ errorf "partial [assets/section-list.html] - Invalid value for param 'nested'"}}
{{ end }}

{{ $list := "" }}
{{ if $nested }}
    {{ $list = where site.RegularPages "Type" "in" $section }}
{{ else if $home }}
    {{ $sectionPage := site.GetPage "section" $section }}
    {{ if $multipage }}
        {{ $list = $sectionPage.Pages }}
    {{ else }}
        {{ $list = $sectionPage.RegularPages }}
    {{ end }}
{{ else }}
    {{ if $multipage }}
        {{ $list = $page.Pages }}
    {{ else }}
        {{ $list = $page.RegularPages }}
    {{ end }}
{{ end }}
```

The highlighted lines need to be added to the file.

The first two highlighted lines are for checking if the section supports multi-page articles. If so, it sets the `$multipage` variable, but also forces nested to be `false`, because that conflicts with multi-page articles.
The rest of the highlighted lines are responsible for locating the files that belong to the page bundle. `RegularPages` will find all page files in the `projects` folder and all sub-folders, excluding any `_index.md` file.  
By changing `RegularPages` to `Pages`, it will find all page files in the `projects` folder and all sub-folders, including any `_index.md` file. If it finds that file, it will discard any other page files in that sub-folder. This is the desired behavior, hence the added extra lines.

In order for this to work properly the `multipage` parameter needs to be added to the section in `config/_default/params.toml`. For the `projects` section this would look like the following:

```toml {hl_Lines=[17]}
    [sections.projects]
        title = "Projects"
        layout = "card"
        sort = "title"
        reverse = false
        nested = true
        cols = 1
        background = "body-tertiary"
        color = "body"
        padding = "3"
        header = "none"
        footer = "tags"
        orientation = "horizontal"
        style = "border-1 card-emphasize"
        homepage = 3
        separator = false
        multiplayer = true
```

The highlighted line is the line to add.

## Modifying the page bundle frontmatter

After the previous changes the `mpfolder/_index.md` file is used as the entry point to the multi-page article. The Hinode theme will use the file's frontmatter contents to display it as a card on the home page and the section page. Because of that the following should be available in the front matter of `mpfolder/_index.md`:

```toml {hl_Lines=[2, 3, 4, 13]}
author: The author
title: The title of this project
description: A short description of the project
date: 2023-08-15
tags: ["tag1", "tag2"]
icon: fa clock
thumbnail:
    url: /img/pages.webp
    author: Olga Tutunaru
    authorURL: https://unsplash.com/@otutunaru
    origin: Unsplash
    originURL: https://unsplash.com/photos/JMATuFkXeHU
layout: multipage
```

The highlighted lines are required, the first 3 because the card would not look good, if they weren't there. The last one because it indicates a multi-page article.  
What is also good to add, is either an icon or a thumbnail. One of the two should be available. If both are available, the thumbnail will be displayed in the card.

As it is now, the actual pages in `mpfolder` are not yet found. This is because the `multipage` layout setting is not recognized yet.

## Finding the pages

The default behavior of Hugo to display a page is to use `layouts/_default/single.html`, unless the `layout` parameter is set in the frontmatter of the page bundle. In that case it will try to find the file with the same name as what `layout` has been set to, with the extension `.html` in the `layouts/_default` folder. If it cannot find that file, it will use `layouts/_default/single.html` instead. In this case that would mean the file `layouts/_default/multipage.html`.  
This file is to be added, but as it resembles `layouts/_default/single.html` a lot, it will use parts of that file.

The following shows the full contents of the new file `layouts/_default/multipage.html`.

```go-html-template {linenos=true,hl_Lines=["41-48", "65-71"]}
{{ define "partials/multi-footer.html" -}}
    <!-- Show comments when enabled -->
    {{- if and .Site.Params.comments.enabled .Params.showComments | default true -}}
        <br/><hr>
        {{ partial "assets/comments.html" . }}
    {{ end -}}
{{ end -}}

{{ define "main" }}
    {{ $page := . }}

    {{/* Create paginator from the regular pages */}}
    {{ $paginator := .Paginate (.RegularPages.ByParam "pagenumber") 1 }}

    {{/* Calculate the number of pages in the paginator */}}
    {{ $totalPages := $paginator.TotalPages }}

    {{ range $paginator.Pages }}
        {{- $menu := .Scratch.Get "sidebar" -}}
        {{- $version := .Scratch.Get "version" -}}
        {{- $sidebar := .Site.Params.navigation.sidebar | default true -}}
        {{ if and $menu $sidebar -}}
            <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvass-sidebar" aria-inledby="offcanvas-label">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title" id="offcanvas-label">{{ strings.FirstUpper .Section }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    {{ partial "assets/sidebar" (dict "page" . "menu" $menu "version" $version) }}
                </div>
            </div>

            <div class="container-xxl px-3 px-xxl-0">
                <div class="row row-cols-md-2 row-cols-lg-3">
                    <div class="col col-md-3 col-lg-2 d-none pt-5 d-md-block sidebar-overflow sticky-top">
                        {{ partial "assets/sidebar" (dict "page" . "menu" $menu "version" $version) }}
                    </div>
                    <div class="col col-md-9 col-lg-8 mb-5 p-4">
                        {{ partial "partials/header.html" . }}
                        {{ partial "partials/body.html" . }}
                        {{ if gt $totalPages 1 }}
                            {{ partial "assets/mpagination.html" (dict "page" $page 
                                                                       "mode" .Site.Params.multipage.paginator 
                                                                       "tooltips" .Site.Params.multipage.tooltips
                                                                       "positions" .Site.Params.multipage.positions
                                                                 ) }}
                        {{ end }}
                        {{ partial "partials/multi-footer.html" . }}
                    </div>
                    <div class="col col-lg-2 d-none d-lg-block pt-5">
                        {{- if and .Site.Params.navigation.toc .Params.includeToc | default true -}}
                            {{ partial "assets/toc.html" . -}}
                        {{ end -}}
                    </div>
                </div>
            </div>
        {{ else }}
            <div class="container-xxl px-3 px-xxl-0">
                <div class="row row-cols-1 row-cols-sm-3">
                    <div class="col col-md-2 d-none d-md-block"></div>
                    <div class="col col-sm-12 col-md-8">
                        {{ partial "partials/header.html" . }}
                        {{ partial "partials/body.html" . }}
                        {{ if gt $totalPages 1 }}
                            {{ partial "assets/mpagination.html" (dict "page" $page 
                                                                       "mode" .Site.Params.multipage.paginator 
                                                                       "tooltips" .Site.Params.multipage.tooltips
                                                                       "positions" .Site.Params.multipage.positions
                                                                 ) }}
                        {{ end }}                    
                        {{ partial "partials/multi-footer.html" . }}
                    </div>
                    <div class="col col-md-2 d-none d-md-block">
                        {{- if and .Site.Params.navigation.toc .Params.includeToc | default true -}}
                            {{ partial "assets/toc.html" . -}}
                        {{ end -}}
                    </div>
                </div>    
            </div>
        {{ end }}
    {{ end }}
{{ end }}
```

Lines 1-7 will create the footer that is needed. This is a simplified version of the footer as it is used in `layouts/_default/single.html`, as the pagination in that file will not be used here. At least not in that way.  
Line 13 is where the paginator is created. It will search for all regular pages in the current folder and will sort them by the `pagenumber` that is specified in the frontmatter of the page, as described at the start of this blog.

From line 18 onwards, the pages in the paginator will be processed. This resembles the contents of `layouts/_default/single.html` quite a bit, with the exception of the highlighted parts, which will take care of showing a pagination and will call the `partial/multi-footer.html` that has been defined at the start of the file.  
The `assets/mpagination.html` takes care of showing a configurable way to navigate between the pages and the `partials/header.html` and `partials/body.html` partials are defined in `layouts/_default/single.html`.

## The pagination partial

The call to the `assets/mpagination.html` partial has a maximum of four parameters, which are defined in `config/_default/params.toml` as follows:

```toml
[multipage]
    # These parameters are only valid when the layout of a page bundle is set to "multipage"
    paginator = "buttons"   # The paginator to show at the bottom of the page. Valid options are: 
                            # "arrows"   Shows arrows to the left/right if there is a next/previous page
                            # "buttons"  Shows navigation buttons (centered)
                            # "list"     Shows a list of available pages (centered)
                            # "dropdown" Shows a drop-down box and the available pages (centered) 
                            # "dropup"   Shows a drop-up box and the available pages (centered) 
    tooltips = "on"         # When paginator="buttons", enables ("on") or disables ("off") the display of tooltips 
                            #  when hovering over the buttons. Not used in the other paginator options.
    positions = 4           # When paginator="buttons", Sets the maximum number of button positions.
                            # Not used in the other paginator options.
```

The accompanying comments should provide sufficient explanation. The following sections shows screenshots of the different `paginator` options.

### buttons

Using 6 pages, with page 4 being the current page and the mouse hovering over page 2.

{{< mimage src="img/pagbut4.jpg" mode="true" inner="image-center" >}}

<br>
Using 6 pages, with the first page being the current page.

{{< mimage src="img/pagbutfirst.jpg" mode="true" inner="image-center" >}}

<br>
Using 6 pages, with the last page being the current page.

{{< mimage src="img/pagbutlast.jpg" mode="true" inner="image-center" >}}

### arrows

Page 4 is the current page.

{{< mimage src="img/pagarrow.jpg" mode="true" >}}

### list

Page 1 is the current page and the mouse hovers over page 4.

{{< mimage src="img/paglist.jpg" mode="true" inner="image-center" >}}

### dropdown/dropup

When the dropdown button is not clicked.

{{< mimage src="img/pagdrop.jpg" mode="true" inner="image-center" >}}

<br>
When the dropdown button is clicked, the list shows below the button. Page 1 is the current page and the mouse hovers over page 4.

{{< mimage src="img/pagdroplist.jpg" mode="true" inner="image-center" >}}

<br>
For the dropup button, the list shows above the button and the triangle in that button, points up.
