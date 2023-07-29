<!-- cSpell:ignore Joost mgallery shortcode hinode shortcodes mimage lightbox frontmatter -->
<!-- markdownlint-disable MD003 MD022 MD041 -->
---
author: Joost Mans
title: mgallery shortcode installation
date: 2023-07-04
Description: Information on how to install the mgallery shortcode
layout: docs
_build:
  list: never
---
<!-- markdownlint-enable MD022 MD041 -->
## Installation

If you want to use the `mgallery` shortcode in your Hugo site, using the Hinode template, just copy the following files from the Myrthos repository to your site, using the same folder structure and filenames:

- /layouts/shortcodes/mgallery.html
- /assets/scss/components/_mimage.scss
- /assets/scss/components/_mgallery.scss

Note that `assets/scss/components/_mimage.scss` could already have been installed, as it is used by the `mimage` shortcode.

Also edit `/assets/scss/app.scss` and add the lines:

```scss
@import "components/mimage.scss";
@import "components/mgallery.scss";
```

Note that the line with `mimage.scss` might already be present when the `mimage` shortcode has been installed.

As Lightbox 2 is used, this needs to be installed as well. There are three ways to get it:

- Using NPM
- Loading the files from Github
- Loading from a CDN

The following sections explains what is needed for each of them. Note that for each of the installation methods the goal is to load the javascript and css files conditionally, so that they are only loaded when there is an actual gallery to display.

If this shortcode is to be used in a Hugo site not using Hinode, be aware that the shortcode is dependent on Bootstrap. And also the used scss files need to be processed into CSS files.

### install Lightbox using NPM

For this to work, NPM needs to be installed, which should be available when using Hinode.

From the base directory execute the following:

```bash
npm install lightbox2 --save
```

This creates the folder `node_modules/lightbox2`.

Add to `config/_default/hugo.toml` the following mounts in the `[module]` section:

```toml
  [[module.mounts]]
    source = "node_modules/lightbox2/dist/js"
    target = "static/js"
    includeFiles = "lightbox-plus-jquery.min.*"
  [[module.mounts]]
    source = "node_modules/lightbox2/dist/css"
    target = "static/css"
    includeFiles = "lightbox.min.css"
  [[module.mounts]]
    source = "node_modules/lightbox2/dist/images"
    target = "static/images"
    includeFiles = "*.*"
```

Create the folders `static/css` and `static/images`.

Create a file named `layout/partials/assets/gallery-lightbox.html` and add the following to it:

```html
<link rel="stylesheet" href="/css/lightbox.min.css" />
<script src="/js/lightbox-plus-jquery.min.js"></script>
```

Note that if you are already using jQuery on your site, you should use instead of `lightbox-plus-jquery.min.js` the file `lightbox.min.js`.

### install Lightbox from Github

Download the latest files from [Github](https://github.com/lokesh/lightbox2/releases).

From the downloaded zip file, copy the file `dist/css/lightbox.min.css` to static/css.  
Copy the file `dist/js/lightbox-plus-jquery.min.js` to static/js.  
Copy the files from `dist/images` to static/images.

Create a file named `layout/partials/assets/gallery-lightbox.html` and add the following to it:

```html
<link rel="stylesheet" href="/css/lightbox.min.css" />
<script src="/js/lightbox-plus-jquery.min.js"></script>
```

Note that if you are already using jQuery on your site, you should copy/use instead of `lightbox-plus-jquery.min.js` the file `lightbox.min.js`.

### install Lightbox using a CDN

Lightbox is also available on CDNJS.

Create a file named `layout/partials/assets/gallery-lightbox.html` and add the following to it:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lightbox2@2.11.4/dist/css/lightbox.min.css">
<script src="https://cdn.jsdelivr.net/npm/lightbox2@2.11.4/dist/js/lightbox-plus-jquery.min.js"></script>
```

[This page](https://www.jsdelivr.com/package/npm/lightbox2) shows the most recent version, so the version numbers in the above two lines can be adopted accordingly.

Note that if you are already using jQuery on your site, you should copy/use instead of `lightbox-plus-jquery.min.js` the file `lightbox.min.js`.

#### Configuring server.toml

In the Hinode template, the Content-Security-Policy in `config/_default/server.toml` will prevent loading the files from the CDN. To enable this add `https://cdn.jsdelivr.net` to the following sections in `Content-Security-Policy`: `script-src`, `style-src`, `img-src` and `connect-src`.  
Note that these might already be available in the file.

## Further configurations

As the goal is to have the user load the javascript and CSS files only when they are needed, the files are loaded conditionally.

Open the file `layout/partials/head/head.html` and add before the line `{{ if gt (len .Site.Languages) 1}}` the following:

```go-html-template
    {{if .Params.lightbox }}{{ partial "assets/gallery-lightbox.html" . }}{{ end }}
```

This will only load the lightbox javascript and class files when in the frontmatter of the page using the `mgallery` shortcode, the following is present: `lightbox: true`.
