---
author: Joost Mans
title: Hinode changes
date: 2023-07-21T13:41:48.543Z
lastmod: 2023-08-15
description: An overview of the changes to the Hinode template that were made for this site
tags: ["blog", "Hinode"]
thumbnail:
    url: /img/changes.jpg
    author: Brett Jordan
    authorURL: https://unsplash.com/@brett_jordan
    origin: Unsplash
    originURL: https://unsplash.com/photos/gJUZjwy2EgE
---
<!-- cSpell:ignore Joost Hinode googleanalytics Katex frontmatter catmull opengraph gelicenseerd onder sociale borderless subdir shortcode hugolib errorf shortcodes lastmod Alexandre Debiève mimage lightbox mgallery webp navgrey navshort goatcounter publishdate pubdate mpagination -->

The foundation of this site is {{< link "https://github.com/gethinode/hinode" >}}Hinode{{< /link >}}. This post provides an overview of the changes that were made to the Hinode theme, to get to the current design of this site. Obviously the information in this blog is very specific for this site, but if there is something of interest with respect to the layout on this site, it should be described here.

Note that the following changes are described elsewhere:

- A sharing button for {{< link "/blog/mastodon" >}}Mastodon{{< /link >}}.
- A shortcode for the {{< link "/blog/mgallery" >}}gallery{{< /link >}}.
- A shortcode for a different way of displaying {{< link "/blog/mimage" >}}images{{< /link >}}.

## Basic modifications to the configuration files

There are more modification to the configuration files than mentioned here, but they are explained with the specific topic.

The following are the modifications to `config/_default/hugo.toml`.

```toml
title = "Myrthos"
copyright = "Copyright © 2023 Myrthos."
baseURL = "https://myrthos.net/"
```

In the `[privacy]` section add the following to disable GoogleAnalytics.

```toml
  [privacy.googleanalytics]
    disabled = true
    respectDoNotTrack = true
```

These are the modifications to the Content Security Policy (CSP) elements in `config/_default/server.toml`.

```toml
    Content-Security-Policy = """\
        default-src 'none'; \
        script-src 'self' 'report-sample' https://utteranc.es/client.js https://gc.zgo.at/count.v3.js; \
        style-src 'self' 'unsafe-hashes' 'report-sample' https://utteranc.es https://www.youtube.com \
            'sha256-kFAIUwypIt04FgLyVU63Lcmp2AQimPh/TdYjy04Flxs=' 'sha256-XzJlZKVo+ff9ozww9Sr2p/2TbJXITZuaWMZ9p53zN1U=' \
            'sha256-hqhQ1AAR6jgr9lel8hs9sNOeqSwsGx6HH+B7TkLcmyY=' 'sha256-9HupEqQsOKAA3TMVtaZh8USULhFpwYGuWFk+44sVSgg=';\
        object-src 'none'; \
        base-uri 'self'; \
        connect-src 'self' https://myrthos.goatcounter.com/count; \
        font-src 'self'; \
        frame-src 'self' https://utteranc.es https://www.youtube-nocookie.com https://www.youtube.com; \
        frame-ancestors 'none'; \
        img-src 'self' data: https://i.vimeocdn.com https://i.ytimg.com https://img.youtube.com https://myrthos.goatcounter.com/count; \
        manifest-src 'self'; \
        media-src 'self'; \
        form-action 'self'; \
        """
```

And when using Netlify also to `netlify.toml`.

The hashes in the above are for the support of Goat and Utterances.

In `config/_default/params.toml` change `schema`, `opengraph` and `comments` to the following:

```toml
[schema]
    type = "Organization"
    name = "Myrthos"
    locale = "en-US"
    github = "https://github.com/myrthos/myrthos-site"
    section = "blog"
    [author]
        name = "Joost Mans"
        x = "https://x.com/therealmyrthos"
        github = "https://github.com/myrthos"
        mastodon = "https://techhub.social/@Myrthos"
    [logo]
        url = "img/Logo_Rotated_light.png"
        width = 390
        height = 350
    [image]
        url = "img/Logo_Rotated_Text_light.png"
        width = 1359
        height = 390

[opengraph]
    images = ["Logo_Rotated_Text_light.png"]
    locale = "en_US"

[comments]
    enabled = true
    repo = "myrthos/myrthos-site"
    issueTerm = "pathname" # pathname, url, title, og:title
    label = "Comment"
    # By default, light and dark mode correspond to github-light and github-dark, respectively.
    # Optional values: github-light, github-dark, preferred-color-scheme, github-dark-orange, icy-dark, dark-blue, photon-dark.
    theme = "" 
```

## Make comments aware of the theme

The comments are managed by {{< link "https://utteranc.es/" >}}Utterances{{< /link >}}. It requires the installation of a small piece of javascript that , amongst others, also specifies the theme to use. This is managed in `layouts/partials/assets/comments.html`. However this uses a fixed theme that can be specified in the `comments.theme` parameter in `config/_default/params.toml`. Because of that the theme of the comments does not change when the theme of the site is changed between dark and light.

To resolve this the `theme` parameter should be set as specified in the previous paragraph. Furthermore the contents of `layouts/partials/assets/comments.html` should be replaced with:

```go-html-template
{{- $params := .Site.Params.comments -}}
{{- with $params -}}
<h2>{{ T "comments" }}</h2>
<div class="d-none-light">
  <script src="https://utteranc.es/client.js"
    repo="{{ $params.repo }}"
    issue-term="{{ default "pathname" $params.issueTerm }}"
    label="{{ default "comment" $params.label }}"
    theme="{{ default "github-dark" $params.theme }}"
    crossorigin="anonymous"
    async>
  </script>
</div>
<div class="d-none-dark">
  <script src="https://utteranc.es/client.js"
    repo="{{ $params.repo }}"
    issue-term="{{ default "pathname" $params.issueTerm }}"
    label="{{ default "comment" $params.label }}"
    theme="{{ default "github-light" $params.theme }}"
    crossorigin="anonymous"
    async>
  </script>
</div>
{{- end -}}
```

## Remove multi-language support

In `config/_default/hugo.toml` set the following:

```toml
defaultContentLanguageInSubdir = false  
disableLanguages = ['nl']
```

This disables the Dutch language, leaving only the English language, but still provides the option to enable a language in the future in an easy way. The {{< link "https://gethinode.com/docs/configuration/languages/" >}}Hinode{{< /link >}} documentation has information on completely removing the Dutch language.

## ASAP font support

The Myrthos site uses the ASAP font, which is different from the default Hinode font.

Go to {{< link "https://gwfh.mranftl.com/" >}}this page{{< /link >}} and select the ASAP font for 200, 300, 600 and regular.  
Download the zip file and extract it to `static/fonts`.

Edit `config/_default/params.toml` and change `themeFont` to: `themeFont = "asap"`.

Edit `assets/scss/common/_variables.scss` and change this line: `$font-weight-normal:            400 !default;`

Edit `assets/scss/theme/fonts.scss` and replace the entire contents with the CSS code generated by selecting `Historic Support` on the site. Also add the following at the top of the file:

```scss
/*!
 * Copyright 2018 The Asap Project Authors
 * https://github.com/Omnibus-Type/Asap

 * This Font Software is licensed under the SIL Open Font License, Version 1.1.
 * This license is copied below, and is also available with a FAQ at:
 * https://scripts.sil.org/OFL
 */
 ```

Remove all the files named `inter-*` in `static/fonts`.

## favicon support

The Myrthos site uses different favicon files, which are: `android-chrome.png`, `apple-touch-icon.png`, `favicon.png` and `safari-pinned-tab.svg`. They are all stored in `assets/img/favicon`.

To support these favicon files change the `[favicon]` section in  `config/_default/params.toml` to:

```toml
[favicon]
    logo = "img/favicon/favicon.png"
    logoSize = 48
    logoSizes = [32, 16]
    LogoApple = "img/favicon/apple-touch-icon.png"
    logoAppleSize = 180
    logoAppleSizes = [152, 120, 76, 60]
    LogoAndroid = "img/favicon/android-chrome.png"
    logoAndroidSize = 256
    logoAndroidSizes = [192]
    maskIcon = "img/favicon/safari-pinned-tab.svg"
```

Change the file `layouts/partials/head/favicon.html` into the following:

```go-html-template
{{ if .Site.Params.favicon.logo -}}
    {{ $favicon := resources.Get .Site.Params.favicon.logo -}}
    <link rel="icon" type="image/png" sizes="{{.Site.Params.favicon.logoSize}}x{{.Site.Params.favicon.logoSize}}" href="{{ $favicon.Permalink }}">
    {{ range $i := .Site.Params.favicon.logoSizes -}} 
        {{ $image := $favicon.Resize (printf "%dx%d CatmullRom" $i $i) -}}
        <link rel="icon" type="image/png" sizes="{{$i}}x{{$i}}" href="{{ $image.Permalink }}">
    {{ end -}} 
{{ end -}}
{{ if .Site.Params.favicon.LogoApple -}}
    {{ $favicon := resources.Get .Site.Params.favicon.LogoApple -}}
    <link rel="apple-touch-icon" type="image/png" sizes="{{.Site.Params.favicon.logoAppleSize}}x{{.Site.Params.favicon.logoAppleSize}}" href="{{ $favicon.Permalink }}">
    {{ range $i := .Site.Params.favicon.logoAppleSizes -}} 
        {{ $image := $favicon.Resize (printf "%dx%d CatmullRom" $i $i) -}}
        <link rel="apple-touch-icon" type="image/png" sizes="{{$i}}x{{$i}}" href="{{ $image.Permalink }}">
    {{ end -}} 
{{ end -}}
{{ if .Site.Params.favicon.LogoAndroid -}}
    {{ $favicon := resources.Get .Site.Params.favicon.LogoAndroid -}}
    <link rel="icon" type="image/png" sizes="{{.Site.Params.favicon.logoAndroidSize}}x{{.Site.Params.favicon.logoAndroidSize}}" href="{{ $favicon.Permalink }}">
    {{ range $i := .Site.Params.favicon.logoAndroidSizes -}} 
        {{ $image := $favicon.Resize (printf "%dx%d CatmullRom" $i $i) -}}
        <link rel="icon" type="image/png" sizes="{{$i}}x{{$i}}" href="{{ $image.Permalink }}">
    {{ end -}} 
{{ end -}}
{{ if .Site.Params.favicon.maskIcon -}}
    {{ $favicon := resources.Get .Site.Params.favicon.maskIcon -}}
    <link rel="mask-icon" href="{{ $favicon.Permalink }}" color="#5bbad5">
{{ end -}}
```

For completeness also change the file `layouts/default/single.xml` the line:  
`{{ with resources.Get "img/favicon.png" }}`
to  
`{{ with resources.Get "img/favicon/android-chrome.png" }}`

## Footer changes

Add to `assets/scss/theme/theme.scss` the following:

```scss
// Remove the background from the table. Apply to th and td
.table-noBG {
    background:transparent !important;
}

// For the footer table, remove the background.
// Also make the column width 50%, so that the title centers correctly
.table-footer-col {
    background:transparent !important;
    width: 50%;
}
```

Change in `/config/_default/languages.toml` the following:

```toml
    [en.params.feature]
        link = "about"
        caption = "About"
    [en.params.social]
        title = "Social Media"
        caption = ""
    [en.params.footer]
        license = "Licensed under Creative Commons (<a href='https://creativecommons.org/licenses/by-nc-sa/4.0/' class='link-secondary' target='_blank' rel='noopener noreferrer'>CC BY-NC-SA 4.0</a>)."
        title = "Site Links"
```

Change `layouts/partials/footer/social.html` to:

```go-html-template
{{- $tab := site.Params.main.externalLinks.tab -}}
<div class="container-fluid">
    <div  class="row row-cols-1 row-cols-sm-4 bg-primary p-3 bg-opacity-{{ .Site.Params.style.themeOpacity | default "25" | safeHTML }} align-items-top">
        <div class="col col-md-2 d-none d-md-block"></div>
        <div class="col col-sm-6 col-md-4">
            <table class="table table-borderless">
                <thead>
                    <tr><th colspan="2" class="text-center table-noBG">
                       <div class="fs-3 fw-bold">{{ .Site.Params.footer.footerTitle }}</div>
                    </th></tr>
                </thead>
            {{ range .Site.Menus.footer -}}
            <tr> 
                <td class="text-end table-footer-col">{{ .Name | safeHTML }}</td>
                <td class="text-start table-footer-col">
                    <a href="{{ .PageRef | relLangURL }}" rel="noopener noreferrer" aria-label="{{ .Name | safeHTML }}" class="text-decoration-none link-secondary d-inline p-2">
                        {{ if hasPrefix .Pre "<i" }}
                            {{ .Pre | safeHTML }}
                        {{ else }}
                            {{ partial "assets/icon.html" (dict "icon" (printf "%s fa-2x" .Pre) )}}
                        {{ end }}    
                    </a>
                </td>
            </tr>
            {{ end -}}
            </table>
        </div>
        <div class="col col-sm-6 col-md-4">
            
            <table class="table table-borderless">
                <thead>
                    <tr><th colspan="2" class="text-center table-noBG">
                       <div class="fs-3 fw-bold">{{ .Site.Params.footer.socialTitle }}</div>
                    </th></tr>
                </thead>
            {{ range .Site.Menus.social -}}
            <tr> 
                <td class="text-end table-footer-col">{{ .Name | safeHTML }}</td>
                <td class="text-start table-footer-col">
                    <a href="{{ .URL }}" {{ if $tab }} target="_blank" rel="noopener noreferrer"{{ end }} aria-label="{{ .Name | safeHTML }}" class="text-decoration-none link-secondary d-inline p-2">
                        {{ if hasPrefix .Pre "<i" }}
                            {{ .Pre | safeHTML }}
                        {{ else }}
                            {{ partial "assets/icon.html" (dict "icon" (printf "%s fa-2x" .Pre) )}}
                        {{ end }}                        
                    </a>
                </td>
            </tr>
            {{ end -}}
            </table>
        </div>
        <div class="col col-md-2 d-none d-md-block"></div>
    </div>
</div>
```

Add to `config/_default/menus/menus.en.toml` the following:

```toml
[[footer]]
  name = "About"
  pre = "fas fa-address-card fa-xl"
  pageRef = "/about/"
  url = "/about/"
  weight = 5

[[footer]]
  name = "Contact"
  pre = "fas fa-envelope fa-xl"
  pageRef = "/contact/"
  url = "/contact/"
  weight = 10

[[footer]]
  name = "Terms of use"
  pre = "fas fa-building fa-xl"
  pageRef = "/terms/"
  weight = 30

[[footer]]
  name = "Privacy Policy"
  pre = "fas fa-user-shield fa-xl"
  pageRef = "/privacy/"
  weight = 40

[[footer]]
  name = "Credits"
  pre = "fa fa-file-lines fa-xl"
  pageRef = "/credits/"
  weight = 50
```

Override `[[social]]` with:

```toml
[[social]]
  name = "LinkedIn"
  pre = "fab linkedin"
  url = "https://linkedin.com/in/joost-mans-a201b333"
  weight = 10

[[social]]
  name = "GitHub"
  pre = "fab fa-github"
  url = "https://github.com/myrthos"
  weight = 20

[[social]]
  name = "X"
  pre = "fab fa-square-x-twitter"
  url = "https://x.com/therealmyrthos"
  weight = 30

[[social]]
  name = "Mastodon"
  pre = "fab fa-mastodon"
  url = "https://techhub.social/@Myrthos"
  weight = 40
```

Add to `i18n/en.yaml`:

```yaml
- id: about
  translation: "About"
```

## Header changes

In `config/_default/params.toml` change `breadcrumb` to `true` to enable breadcrumbs.  
In `assets/scss/components/_breadcrumb.scss` change `padding-top` to `0.5 * $navbar-offset;`

In `config/_default/menus/menus.en.toml` replace the `[[main]]` section with:

```toml
[[main]]
  name = "Blog"
  pageRef = "/blog/"
  weight = 10

[[main]]
  name = "Projects"
  pageRef = "/projects/"
  weight = 20

[[main]]
  name = "Documentation"
  pageRef = "/docs/"
  weight = 30

[[main]]
  name = "Gallery"
  pageRef = "/gallery/"
  weight = 40

[[main]]
  name = "Tags"
  pageRef = "/tags/"
  weight = 50
```

In `static/img`, the following logos exist:

- The site logo (the rotated logo with text)
  - `Logo_Rotated_Text50_dark.webp`
  - `Logo_Rotated_Text50_light.webp`

The logo has a `dark` and a `light` version, as there is a different logo depending on the selected color.

Change in `config/_default/params.toml` in the `navigation` section `logo` to:  
 `logo = "/img/Logo_Rotated_Text50_zzz.png"`
and add the following: `logoWidth = 174`.

Change in `layouts/partials/assets/navbar.html` the line:  
`<img src="{{if $absoluteURL }}{{ absURL $logo }}{{ else }}{{ $logo }}{{ end }}" alt="{{ $title }} logo" height="30">`
to:

```html
{{- $logo_l := replace $logo "zzz" "light" -}}
{{- $logo_d := replace $logo "zzz" "dark" -}}
<div class="d-none-light"><img src="{{if $absoluteURL }}{{ absURL $logo_d }}{{ else }}{{ $logo_d }}{{ end }}" alt="{{ $title }} logo" height="50" {{with site.Params.navigation.logoWidth}}width="{{- site.Params.navigation.logoWidth -}}"{{ end }}></div>
<div class="d-none-dark"><img src="{{if $absoluteURL }}{{ absURL $logo_l }}{{ else }}{{ $logo_l }}{{ end }}" alt="{{ $title }} logo" height="50" {{with site.Params.navigation.logoWidth}}width="{{- site.Params.navigation.logoWidth -}}"{{ end }}></div>
```

## Move search box to the right

I prefer the search box to be next to the navigation bar. To achieve this the below change is needed.

In `layouts/partials/assets/navbar.html` move this line:

```go-template-html
<!-- Insert search input -->
{{- if $search }}{{ partial "assets/search-input.html" -}}{{ end -}}       
```

to below the line with: `<ul class="navbar-nav ms-auto">`.

Also the border of the search box could stand out a bit more. To accomplish that open the file, change the above line to:

```go-template-html
<!-- Insert search input -->
{{- if $search }}{{ partial "assets/search-input.html" (dict "class" "border")-}}{{ end -}}       
```

## Update sharing providers

I prefer it when a link to an external page opens in a new page, so I made some modifications to enable that. In addition, I also want to show a tooltip when hovering over the sharing buttons.

In `config/_default/params.toml` in the `[[sharing,providers]]` sections, for each of the available sections, add the line `target = "_blank"`, like this:

```toml
[[sharing.providers]]
    name = "LinkedIn"
    url = "https://www.linkedin.com/sharing/share-offsite/?url={url}"
    icon = "fab linkedin"
    weight = 10

[[sharing.providers]]
    name = "X"
    url = "https://x.com/home?status={url}"
    icon = "fab x-twitter"
    weight = 20

[[sharing.providers]]
    name = "Facebook"
    url = "https://www.facebook.com/sharer.php?u={url}"
    icon = "fab facebook"
    weight = 30

[[sharing.providers]]
    name = "WhatsApp"
    url = "whatsapp://send?text={title}%20{url}"
    icon = "fab whatsapp"
    weight = 40

[[sharing.providers]]
    name = "Clipboard"
    url = "{url}"
    icon = "fas link"
    weight = 50
    clipboard = true    
```

To enable showing the tooltip change `layouts/partials/assets/sharing.html`.  

Change the line:

```go-html-template
{{ partial "assets/button.html" (dict "toast" $target "clipboard" $clipboard "href" $url "icon" (printf "%s fa-fw" $item.icon) "class" "btn-social p-0" )}}
```

to:

```go-html-template
{{ partial "assets/button.html" (dict "toast" $target "clipboard" $clipboard "href" $url "tooltip" $item.name "icon" (printf "%s fa-fw" $item.icon) "class" "btn-social p-0" )}}
```

I also wanted to add Mastodon as a sharing button, but that requires a bit more changes and because of that I've made a {{< link "/blog/mastodon" >}}separate blog post{{< /link >}} for that.

## External links to a new tab

Change in `config/_default.params.toml` the section `main.externalLinks` to the following:

```toml
    [main.externalLinks]
        cue = true
        tab = true
```

This will make external links (such as the sharing buttons) open in  a separate tab. It will also add a cue to external links.

## Color changes

Change the colors in `config/_default/params.toml` to:

```toml
    primary = "#0070E0"     # Celtic Blue
    secondary = "#6c757d"   # Slate Grey
    success = "#198754"     # Sea Green
    info = "#1FBDDC"        # Aero
    warning = "#ffc107"     # Amber
    danger = "#dc3545"      # Rusty Red
    light = "#f8f9fa"       # Sea Salt
    dark = "#212529"        # Eerie Black
```

## Katex support

Katex is now supported as a Hinode module. All that is needed to enable Katex and be able to visualize formulas is to add the following to the frontmatter of the file in which the formulas are to be displayed:

```yaml
modules: ["katex"]
```

## Adding a Gallery section

To add a gallery section to the site, to which the user can navigate, open `config/_default/params.toml` and add to `[sections]` the following:

```toml
    [sections.gallery]
        title = "Gallery"
        layout = "card"
        sort = "date"
        reverse = false 
        nested = false
        background = ""
        color = ""
        style = "border-0 card-zoom"
        cols = 3
        padding = "0"
        header = "publication"
        footer = "tags"
        orientation = "stacked"
        homepage = 3
        separator = true
```

As the gallery should also be displayed on the home page, add `"gallery"` to the `sections` field of `[home]` in the `params.toml` file.

Create the folder `gallery` in the `content` folder. The navigation option for the gallery has already been added in [Header changes](#header-changes).

### Structure

The way that galleries are used on this site, requires a few more changes. The following shows an example of what the directory structure looks like when using multiple galleries:

```text
content/en
  gallery
    _index.md
    gal1
      index.md
      <image resources>
    gal2
      index.md
      <image resources>
    gal3
      index.md
      <image resources>
```

Each of the `index.md` files need to have the `layout: gallery` in the frontmatter, to make sure the layout of the page is done correctly. Additionally to enable the use of Lightbox, also `lightbox: true` needs to be added to the frontmatter. next to that each of the `index.md` files needs one or more calls to the `mgallery` shortcode. For an explanation of the use of that shortcode, check the {{< link "/blog/mgallery" >}}mgallery{{< /link >}} blog and the {{< link "/docs/shortcodes/mgallery/overview" >}}documentation{{< /link >}}.

### Changes to the default layout

The `_index.md` file will collect the information from the `index.md` files in the folders and show a list of all the available galleries, as defined by the frontmatter of the index files. Also an image could be added in the frontmatter and displayed in the list.  
Normally that image would also be displayed on the gallery page itself. As the page already has a gallery of images, this doesn't look good, so to prevent that from happening a change needs to be made to `layouts/_default/single.html`.

Also, because of the chosen structure, the breadcrumbs will look off when viewing a gallery page. To correct that another change needs to be made to `layouts/_default/single.html`.

Open the file `layouts/_default/single.html` and search for the word `minimal`. There should be three occurrences. In the first two occurrences `minimal` is part of a slice. Add in both those slices also `"gallery"`. In the first occurrence the breadcrumbs are handled and the second one prevents the display of the image specified in the frontmatter, will not be displayed on the page.

## Documentation changes

For Myrthos there will be multiple documentation sets. Hinode supports documentation, but only one set with multiple versions. However it is possible to "abuse" the Hinode implementation to achieve what is desired. The below information uses two example documentation sets named `project-1` and `PROJect2`. The strange capitalization is used for testing purposes.

Create `content/docs`. In that directory create one folder per documentation set.

In the folder of the documentation set, create a folder for each section.

In the section folder create the document pages.

As an example this structure is used:

```goat
docs --+-- project-1 --+-- section1 --+-- chapter-1.md                                     
       |               |              |
       |               |              +-- chapter-2.md
       |               |
       |               +-- section2 --+-- chapter-21.md
       |                              |
       |                              +-- chapter-22.md
       |
       +-- PROJect2 ---+-- project-A -+-- chapter-A1.md
                       |              |
                       |              +-- chapter-A2.md
                       |
                       +-- project-B -+-- chapter-B1.md
                                      |
                                      +-- chapter-B2.md
```

### Frontmatter

For all document pages add in the frontmatter (next to author, description, date and title) the following:

```yaml
layout: docs
```

This is required, so that the page is rendered properly as a documentation page.

For the documentation page that is to be the first page of the document, aliases should be added in the frontmatter so that when navigating to this document it will always start on that page. Example for `chapter-1.md`:

```yaml
aliases:
  - "/docs/project-1/section1/chapter-1"
  - "/docs/project-1/chapter-1/"
  - "/docs/project-1/"
```

Only one page in the entire documentation set should have these aliases.  
Note that the aliases do not have to be the same as the folder names. The aliases is what Hugo will use when building the site to create the folders. However I find it very confusing when the final site is using a different navigation structure, so I keep the names the same.

All other pages than this first page, should add the following in the frontmatter:

```yaml
_build:
  list: never
```

This prevents those pages to be listed in the Documentation overview page. Only the first page will be listed. Note that the title of this page will also be used in that Documentation overview page.

### Configuration

In `config/_default/params.toml` add the different documentation sets, which in Hinode are releases. Example:

```toml
[[docs.releases]]
    label = "First Project"
    url = "/docs/project-1"

[[docs.releases]]
    label = "Second Project"
    url = "/docs/PROJect2"
```

Also make sure that in the `[docs]` section the following is set:

```toml
    contentPath ="/docs/"
```

In addition also add to `config/_default/params.toml` the following section:

```toml
    [sections.docs]
        title = "Documentation"
        layout = "card"     # card, list, nav
        sort = "title"      # date, lastmod, weight, title or custom as defined in page frontmatter
        reverse = false 
        nested = false      # indicate the content should be listed recursively for the entire section.
        background = ""     # “primary”, “secondary”, “success”, “danger”, “warning”, “info”, “light”, “dark”, “white”, “black”, “body”, or “body-tertiary”
        color = ""          # “primary”, “secondary”, “success”, “danger”, “warning”, “info”, “light”, “dark”, “white”, “black”, “body”, or “body-tertiary”
        style = "border-0 card-zoom" # Styling attributes for each element
        cols = 3            # 1..5
        padding = "0"       # “0”, “1”, “2”, “3”, “4”, “5”, or “auto”
        header = "publication"     # Header of card: “full” (default), “publication”, “tags”, and “none”.
        footer = "tags"     # Footer of card: “full”, “publication”, “tags”, and “none” (default).
        orientation = "stacked" # Thumbnail: “stacked” (default), “horizontal”, or “none”
        homepage = 3        # Number of cards to display
        separator = true    # Show separator line between items, or not      
```

in the `data` folder add the TOC for each of the documentation sets in a YAML file. The file name is made up of `docs` followed by a `-` and the name of the documentation set folder, which is also the same as in `[[docs.releases]]`. In this examples the files `docs-project-1.yaml` and `docs-PROJect2.yaml` are to be created.

For these examples the contents of these files are respectively:

```yaml
- title: Section1
  pages:
    - title: Chapter 1
    - title: Chapter 2

- title: Section2
  pages:
    - title: Chapter 21
    - title: Chapter 22
```

and

```yaml
- title: Project A
  pages:
    - title: Chapter A1
    - title: Chapter A2

- title: Project B
  pages:
    - title: Chapter B1
    - title: Chapter B2
```

Note that the names should be identical to the folder structure used, where a `-` in the folder name can be replaced by a space in the yaml files. Also capitalization is ignored.

### Enable thumbnail defined in frontmatter

By default, thumbnail images that are defined in the frontmatter of the page are not shown on the page when `layout` is set to `docs`. To give the documentation section the same look and feel as the rest of the site, this has been enabled as described below.

In `layouts/_default/single.html`, search for the following line:

```go-html-template
{{ if .Params.thumbnail -}}
```

Above that line there is a slice defined. Remove from that slice `"docs"`.

Normally the image will only be displayed on the introduction page of the documentation, as that is the only location where the thumbnail is specified. However, it will show an image on every page where the thumbnail is defined in the frontmatter.

### Not showing the releases dropdown

By default the Hinode template will show the releases, in this case the documentation sets, in a drop-down menu. Which looks fine, but it only shows when a documentation page is active. The below steps disables the display of this drop-down list.

First add the following in the `[docs]` section of the `config/_default/params.toml` file to have an option to show or not show the releases drop-down list. If the option is not added, the default behavior of the Hinode template is used.

```toml
[docs]
    hideReleases = true    # Hide the releases drop down when true
```

Additionally `layouts/partials/assets/navbar.html` needs to be modified.  
The line that has `{{ if $list }}` is to be replaced with: `{{ if and $list (not site.Params.docs.hideReleases) }}`.  
This will not show the releases drop-down menu when `hideReleases` is true. If it is not defined or false, the drop-down menu will be shown.

### Documentation overview page

Instead of the drop down list, that only shows when a documentation page is visible, a menu item named `Documentation` is to be added. For this link to work a file named `_index.md` is needed in the `/docs/` folder, with the following contents:

```yaml
---
title: Documentation
description: The below cards provide an overview of the available documentation sets.
nested: false
---
```

Hugo renders the `_index.md` file in the `docs` folder as a list. for this to work properly, the frontmatter of the document pages need to be configured as described in [Frontmatter](#Frontmatter).

### Add documentation set name to TOC

With multiple documentation sets, it would also be nice to know what documentation set someone is reading at a given moment. For this the tile of the documentation set can be displayed above the TOC.  
This can be turned off or on with the `showDocTOCTitle` parameter in the `docs` section of `config/_default/params.toml`.

```toml
[docs]
    showDocTOCTitle = true # Show the (short) title of the document above the TOC
```

For this to work, the `layouts/partials/assets/sidebar.html` needs to be modified.  
Above the line with `<ul class="list-unstyled ps-0">`  add the following:

```go-html-template
        {{- if site.Params.docs.ShowDocTOCTitle -}}
            <h5>{{ strings.Replace $version "-" " "}}</h5>
        {{- end -}}
```

If a directory in `docs/` has capitals, they are replaced by lower case letters when Hugo builds everything. As a result the navigation via the TOC does not work anymore. Because of that also the following change in `layouts/partials/assets/sidebar.html` is needed:  
Replace  
`{{- $baseURL := relLangURL (path.Join $section $version) }}`  
to  
`{{- $baseURL := relLangURL (path.Join $section (strings.ToLower $version)) }}`  
This will remove any capitalization from the `$version` string. This is the string that holds the release, or in this case the name of the documentation set folder.

### Disable git information

To disable the git information at the bottom of a docs page, add the following in the [docs] section of the `config/_default/params.toml` file to have an option to show or not show the git information. If the option is not added, the default behavior of the Hinode template is used.

```toml
[docs]
    hideGitInfo = true     # Hide git information at the bottom of a docs page when true
```

Also, in `layouts/_default/single.html` search for `{{ if eq .Layout "docs" }}`. Wrap what is inside this if statement in a check for `hideGitInfo` as follows:

```go-html-template
    {{ if eq .Layout "docs" }}
        {{ if not .Site.Params.docs.hideGitInfo }}
            <div class="mt-5 small">
                {{ partial "utilities/git.html" . }}
            </div>
        {{ end }}
```

## Home page changes

There are a few changes to the way the home page is displayed. The sections that are displayed on the home page and the image in the top blue block are defined in `content/en/index.md`, which is to be changed to:

```go-html-template
<!-- CSpell:ignore Joost alexandre Debiève -->
<!-- markdownlint-disable MD003 MD018 MD022 MD041-->
---
author: Joost Mans
title: Welcome to this site!
thumbnail:
    url: /img/electronics.jpg
    author: Alexandre Debiève
    authorURL: https://unsplash.com/@alexkixa
    origin: Unsplash
    originURL: https://unsplash.com/photos/FO7JIlwjOtU
---
<!-- markdownlint-disable MD018 MD022 MD041-->

A site that is dedicated to sharing some of the stuff that I like. At the moment, also a site that is under development and to which still quite some content needs to be added.  
I happen to like numerous things, but in this case what I will write about and share is mostly about developing this site, my electronics and software projects, and photography.

The most recent topics can be found in the below sections and all information can be accessed by navigating the menu above.  
If you are interested in who I am and why this site is named Myrthos, hit the About button below.
```

Furthermore the `home` section in the file `/config/_default/params.toml` needs to be changed to:

```toml
[home]
    sections = ["blog", "projects", "gallery"]
```

This makes sure to shows the last 3 blogs, projects and galleries on the front page.

The layout of the top blue bar is defined in `layouts/partials/home/featured.html`, which has been changed to:

```go-html-template
<div class="container-fluid flex-fill bg-primary bg-opacity-{{ .Site.Params.style.themeOpacity | default "25" | safeHTML }}">
    <div class="container-xxl p-4">
        <div class="row row-cols-1 row-cols-sm-3 align-items-center pt-5 pb-1 h-100">
            <div class="col col-sm-8 text-center text-sm-start">
                <p class="display-4">{{ .Title }}</p>
                <p>{{ .Content }}</p>
                {{ if .Site.Params.feature.link }}
                    <p><a class="btn btn-primary" href="{{ .Site.Params.feature.link | safeURL }}" role="button">{{ .Site.Params.feature.caption | default (T "about") }}</a></p>
                {{ end }}
            </div>
            <div class="col col-sm-4 col-md-4">
                {{- $thumbnail := (or (and (reflect.IsMap .Params.Thumbnail) .Params.Thumbnail.url) .Params.Thumbnail) -}}
                {{- $author := "" -}}
                {{- if and .Params.Thumbnail.authorURL "text" .Params.Thumbnail.author }}
                    {{- $author = partial "utilities/link" (dict "destination" .Params.Thumbnail.authorURL "text" .Params.Thumbnail.author) -}}
                {{- else if .Params.Thumbnail.author }}
                    {{- $author = .Params.Thumbnail.author -}}
                {{- end -}}
    
                {{- $origin := "" -}}
                {{- if and .Params.Thumbnail.originURL "text" .Params.Thumbnail.origin }}
                    {{- $origin = partial "utilities/link" (dict "destination" .Params.Thumbnail.originURL "text" .Params.Thumbnail.origin) -}}
                {{- else if .Params.Thumbnail.origin }}
                    {{- $origin = .Params.Thumbnail.origin -}}
                {{- end }}
    
                {{- $icon := partial "assets/icon.html" (dict "icon" "fas fa-camera") }}
                {{- $credits := "" -}}
                {{- if and $author $origin }}
                {{ $credits = printf "%s %s %s %s" $icon $author (T "photoOn") $origin }}
                {{ else if $author }}
                    {{ $credits = printf "%s %s" $icon $author }}
                {{ end }}
                {{ if $thumbnail }}
                    {{- partial "assets/mimage.html" (dict "url" $thumbnail 
                                                           "credits" $credits 
                                                           "ratio" "4x3" 
                                                           "outerClass" "img-wrap" 
                                                           "innerClass" "rounded"
                                                           "captionClass" "caption-align-right text-italic"
                                                           "title" .Site.Title) -}}
                {{ end }}
            </div>
        </div>
        <div class="col col-lg-2 d-none d-lg-block bg-info order-4"></div>
    </div>
</div>
```

This makes the content area in the top blue bar wider, provides more space for the text and adds a credit to the image.

## Different display of caption in images on single pages

As I preferred to have more options on how to display images and their caption, I created a shortcode named `mimage`. This shortcode is compatible with the Hinode `image` shortcode, but adds a number of options, like being able to change the way the caption is displayed.

When the frontmatter of a single page has `thumbnail` defined, the `image` shortcode is called from `layouts/_default/single.html` to display the image with the optional caption.

The `image` shortcode is replaced with the `mimage` shortcode, so that the credits can be moved to the right side of the image and be displayed in italic. Next to that I also prefer to show a photo icon instead of the text `Photo by`.

To accomplish this the below needs to be changed in `layouts/_default/single.html`.

Search for the line `{{- if reflect.IsMap .Params.Thumbnail -}}`. Before that line add the following:

```go-html-template
{{- $icon := partial "assets/icon.html" (dict "icon" "fas fa-camera") }}
```

Change these lines:

```go-html-template
{{- if and $author $origin }}
    {{ $credits = printf (T "photoFull") $author $origin }}
{{ else if $author }}
    {{ $credits = T "photoShort" $author }}
{{ end }}
```

to

```go-html-template
{{- if and $author $origin }}
    {{ $credits = printf "%s %s %s %s" $icon $author (T "photoOn") $origin }}
{{ else if $author }}
    {{ $credits = printf "%s %s" $icon $author }}
{{ end }}
```

And this line

```go-html-template
{{- partial "assets/image.html" (dict "url" $thumbnail "ratio" "21x9" "outerClass" "img-wrap" "innerClass" "rounded" "title" .Params.title "caption" $credits) -}}
```

is to be replaced with

```go-html-template
{{- partial "assets/mimage.html" (dict "url" $thumbnail "ratio" "21x9" "outerClass" "img-wrap" "innerClass" "rounded" "captionClass" "caption-align-right text-italic" "title" .Params.title "caption" $credits) -}}
```

Obviously this only works when the `mimage` shortcode is installed, which is explained {{< link "/blog/mimage" >}}here{{< /link >}}.

## Additional empty line before the comments

I think the space between the last line of the content and the horizontal line for the comments is too small. To make it bigger open the file `layouts/_default/single.html` and search for `<hr>`, prefix that with a break, so that the line becomes `<br><hr>`.

## Adding GoatCounter as analytics tool

Hugo and also Hinode come with GoogleAnalytics out of the box. For this site this has been disabled and a more privacy friendly tool is used, named {{< link "https://www.goatcounter.com" >}}GoatCounter{{< /link >}}.

For this the following is added to `config/_default/params.toml`:

```toml
[analytics]
    [analytics.goatcounter]
        name = "name"
        enable = true
```

Note that `"name"` should be replaced with the actual GoatCounter account name.  
GoatCounter can be disabled by setting `enable` to false.

And to `layouts/partials/footer/scripts.html` this part:

```go-html-template
{{- if and (not site.IsServer) $header -}}
    {{- $pc := site.Config.Privacy.GoogleAnalytics -}}
    {{- if and (not $pc.Disable) (hasPrefix site.GoogleAnalytics "G-") }}
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ site.GoogleAnalytics }}"></script>
    {{- end }}
{{- end -}}
```

Is to be replaced with:

```go-html-template
{{- if and (not site.IsServer) $header -}}
    {{- $pc := site.Config.Privacy.GoogleAnalytics -}}
    {{- if and (not $pc.Disable) (hasPrefix site.GoogleAnalytics "G-") }}
        <script async src="https://www.googletagmanager.com/gtag/js?id={{ site.GoogleAnalytics }}"></script>
    {{- end }}
    {{- if and site.Params.Analytics.GoatCounter.Enable site.Params.Analytics.GoatCounter.name -}}
        <script data-goatcounter="https://{{- site.Params.Analytics.GoatCounter.name -}}.goatcounter.com/count"
                async src="https://gc.zgo.at/count.v3.js"
                crossorigin="anonymous"
                integrity="sha384-QGgNMMRFTi8ul5kHJ+vXysPe8gySvSA/Y3rpXZiRLzKPIw8CWY+a3ObKmQsyDr+a">
        </script>    
    {{- end }}
{{- end -}}
```

This allows usage of either Google Analytics or GoatCounter or both.

## Replace pagination of cards

This part can only be done when the `assets/mpagination.html` partial has been installed. Once that is done the paginator that is used when displaying the cards on the section pages, is replaced. For this open the file `layouts/partials/assets/card-group.html` and replace the line:

```go-html-template
<div class="pt-3">{{ partial "assets/pagination.html" (dict "page" $page "format" "terse") }}</div>
```

with:

```go-html-template
<div class="pt-3">{{ partial "assets/mpagination.html" (dict "page" $page 
                                                             "mode" "buttons" 
                                                             "tooltips" "no"
                                                             "positions" 4) }}
</div>
```
