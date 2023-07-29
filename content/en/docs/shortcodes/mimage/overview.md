<!-- cSpell:ignore Joost mimage shortcode Hinode exif -->
<!-- markdownlint-disable MD003 MD022 MD041 -->
---
author: Joost Mans
title: mimage shortcode overview
date: 2023-07-04
Description: overview of the mimage functionality
layout: docs
_build:
  list: never
---
<!-- markdownlint-enable MD022 MD041 -->
The `mimage` shortcode is a copy of the Hinode `image` shortcode. The latter shortcode uses two partials, located in `assets/image.md` and `utilities/GetImage.md`. These two partials have been copied to respectively `assets/mimage.md` and `utilities/mGetImage.md`. All changes to the shortcode and partials are made in the copied version.

the `mimage` shortcode is a front for the `assets/mimage.md` partial, which takes care of most of the work in showing the image. The `utilities/mGetImage` partial is called by the `assets/mimage` partial, to load the image. In addition there are also some additional classes made available in `assets/scss/_mimage.scss`. The newly created shortcode and partials are backwards compatible with the original shortcode and partials.

The following are the changes that are made to the `mimage` shortcode and underlying partials:

- Added a ratio option of 3x2, as several photo cameras have that ratio.
- Added the parameter "outer" for the outer class to wrap both the image and the caption in.
- Added the parameter "inner" for the image class to be used instead of the current shortcode's "class" parameter (although it still exists).
- Added the parameter "text for the caption class.
- Added the parameter "credits" to specify the credits for the image.
- Added the parameter "caption" to specify the caption text of the image.
- Added the parameter "autoCaption" to derive the caption and credits from a txt file or the EXIF of the image, when "caption" is not specified.
- Added the possibility to load an image relative to the current page.

Check the [usage](../usage) page for the details on how to use this new functionality, and the [installation](../installation) page on how to install the `mimage` functionality.
