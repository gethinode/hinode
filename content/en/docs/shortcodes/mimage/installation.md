<!-- cSpell:ignore Joost mimage shortcode Hinode shortcodes -->
<!-- markdownlint-disable MD003 MD022 MD041 -->
---
author: Joost Mans
title: mimage shortcode installation
date: 2023-07-04
Description: Information on how to install the mimage shortcode
layout: docs
showComments: false
_build:
  list: never
---
<!-- markdownlint-enable MD022 MD041 -->
## Installation to a site using the Hinode template

If you want to use the mimage shortcode in your Hugo site, using the Hinode template, just copy the following files from the Myrthos repository to your site, using the same folder structure and filenames:

- /layouts/shortcodes/mimage.html
- /layouts/partials/assets/mimage.html
- /layouts/utilities/mGetImage.html
- /assets/scss/components/_mimage.scss

Also edit `/assets/scss/app.scss` and add the line `@import "components/mimage.scss";` to the file, so that the classes are added.

After that the `mimage` shortcode can be used.

## Installation to a site not using the Hinode template

If you want to use the mimage shortcode in your Hugo site, which is not based on the Hinode template, there might be some issues, because of the dependencies that the `mimage` shortcode has.

The first dependency is Bootstrap. In `/layouts/partials/assets/mimage.html` bootstrap classes are used. This means that either Bootstrap needs to be made available on your site, or the dependency on Bootstrap needs to be removed, by reworking the bootstrap classes in `/layouts/partials/assets/mimage.html`.  
It should be noted that the ratio parameter of the `mimage` shortcode is dependent on the Bootstrap ratio classes.

The second dependency is that the `_mimage.scss` file, requires a [processor](https://sass-lang.com/install/) to compile it into CSS classes. Alternatively, it is not very difficult to manually convert the `_mimage.scss` into an `mimage.css` file.
