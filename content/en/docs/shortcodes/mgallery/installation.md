---
author: Joost Mans
title: mgallery shortcode installation
date: 2023-07-04
lastmod: 2023-08-15
Description: Information on how to install the mgallery shortcode
layout: docs
showComments: false
_build:
  list: never
---
<!-- cSpell:ignore Joost mgallery shortcode hinode shortcodes mimage lightbox frontmatter lastmod -->
## Installation

The `mgallery` shortcode and all accompanying files are available as a {{< link "https://github.com/myrthos/mod-mgallery" >}}Hinode module{{< /link >}}.  
To load this module at startup add the following to the `[module]` section in `config/_default/hugo.toml`:

```toml
  [[module.imports]]
    path = "github.com/myrthos/mod-mgallery"
```

And to the `[modules]` section in `config/_default/params/params.toml`, add `"mgallery"` to the `optional` parameter.

After this the module will be automatically loaded when `npm run start`, or `npm run build` is executed on the command line.

Installing the `mgallery` on a non-Hinode theme installation, is not supported. The `mgallery` shortcode assumes it is used on a Hinode themed page and because of that certain bootstrap classes will be present. The gallery will simply not look as it should, because of the missing styling.

## Further configuration

As the goal is to load the javascript file only when it is needed, an entry in the frontmatter of the page where the `mgallery` shortcode is used, is required, which is the following:

```yaml
modules: ["mgallery"]
```
