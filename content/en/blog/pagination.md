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
pagenumber: 1
```

Where it should be noted that the actual page number needs to be different per page. These numbers will indicate the order of the pages. The first page has `pagenumber: 1`, the second `pagenumber: 2`, etc.

This would result in something like the following:

```goat
projects 
|
+--- _index.md
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

When Hugo processes the files, the `_index.md` file in the `projects` folder will be responsible for searching for all the page files. It will however not find the `_index.md` file in the `mpfolder`.  
A change to the Hinode theme is needed to correct this.

## Identifying a section as multi-page

The first thing to do is to identify a section (in this case `projects`) to support multi-page articles.

The sections are managed in `config/_default/params.toml`, in `[sections]`.  
To enable multi-page support for `projects` add the following to `[sections.projects]`:

```toml
multipage = true
```

## Locating the page bundle file

As mentioned, the `_index.md` page bundle file will not be used. This is because when there is a page bundle file, it will only look for other pages and leaf bundles (`index.md` files). This behavior is specified in `layouts/partials/assets/section-list.html`.  
The following shows a segment of this file:

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
