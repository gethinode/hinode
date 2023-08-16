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
<!-- cSpell:ignore Joost lastmod Tutunaru webp jmooring frontmatter multipage pagenumber mpfolder anotherpage thispage Hinode linenos linenostart isset errorf -->
For the projects articles I am planning to write, I need the option to split an article over multiple pages. These pages belong together and it needs to be possible to navigate from one page to the other. On top of that it needs to have as little configuration as possible.

While searching for potential solutions, I found this solution by {{< link "https://github.com/jmooring/hugo-testing/tree/hugo-forum-topic-29161" >}}jmooring{{< /link >}}, which I felt was a nice solution.

## Basic set-up

Each multi-page article is to be located in its own folder. In that folder the bundle page file `_index.md` is created and it needs to have the following in the frontmatter:

```yaml
layout: multipage
```

Then the pages that are part of this multi-page article can be added to the same folder. As many pages that are needed can be added. Each of these pages has the following in the frontmatter:

```yaml
title: Title of the page
pagenumber: 1
```

Where it should be noted that the actual page number needs to be different per page. These numbers will indicate the order of the pages. The first page has `pagenumber: 1`, the second `pagenumber: 2`, etc.

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

This is used as an example structure throughout this article.

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
The rest of the highlighted lines are responsible for locating the files that belong to the page bundle. `RegularPages` will find all page files in the `projects` folder and all sub-folders, excluding any `_index.md` file. By changing `RegularPages` to `Pages`, it will find all page files in the `projects` folder and all sub-folders, including any `_index.md` file. If it finds that file, it will discard any other page files in that sub-folder. This is the desired behavior, hence the added extra lines.

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
What is also good to add, is either an icon or a thumbnail. One of the two should be availble. If both are availble, the thumbnail will be displayed in the card.

As it is now, the actual pages in `mpfolder` are not yet found. This is because the `multipage` layout setting is not recognized yet.

## Finding the pages

The default behavior of Hugo to display a page is to use `layouts/_default/single.html`, unless the `layout` parameter is set in the frontmatter of the page (or page bundle). In that case it will try to find the file with the same name as what `layout` has been set to, with the extension `.html` in the `layouts/_default` folder. If it cannot find that file, it will use `layouts/_default/single.html` instead. In this case that would mean the file `layouts/_default/multipage.html`.  
This file will be added, but as it resembles `layouts/_default/single.html` a lot, parts of that will be used. 
