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

If you want to use the `mgallery` shortcode in your Hugo site, using the Hinode template, the first step is to copy the following file from the Myrthos repository to your site, using the same folder structure and filename:

- /assets/scss/components/_mimage.scss

Note that `assets/scss/components/_mimage.scss` could already have been installed, as it is used by the `mimage` shortcode.  
If it has not yet been installed, also edit `/assets/scss/app.scss` and add the line:

```scss
@import "components/mimage.scss";
```

The `mgallery` shortcode and all accompanying files are available as a {{< link "https://github.com/myrthos/mod-mgallery" >}}Hinode module{{< /link >}}.  
To load this module at startup add the following to the `[module]` section in `config/_default/hugo.toml`:

```toml
  [[module.imports]]
    path = "github.com/myrthos/mod-mgallery"
```

And to the `[modules]` section in `config/_default/params/params.toml`, add `"mgallery"` to the `optional` parameter.

## Further configuration

As the goal is to load the javascript file only when it is needed, an entry in the frontmatter of the file where the `mgallery` shortcode is used, is required, which is the following:

```yaml
modules: ["mgallery"]
```
