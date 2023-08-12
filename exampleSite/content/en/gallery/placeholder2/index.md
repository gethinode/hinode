<!-- Cspell:ignore ovlpos ovlx ovly ovlperc lightbox mgallery galindustrial webp -->
<!-- markdownlint-disable MD003 MD022 MD041 -->
---
title: Placeholder 2
description: A placeholder for a future gallery
tags: ["photo"]
thumbnail: img/galindustrial.webp
# This prevents the thumbnail to be displayed on the page and used only in the list
layout: gallery
# This loads the lightbox script
lightbox: true
modules: ["mgallery"]
---
<!-- markdownlint-enable MD003 MD022 MD041 -->

Someday this stops being a placeholder.

{{< mgallery list="img/*" unique="true" overlay="img/overlay-logo.png" ovlpos="left-bottom" ovlperc=10 ovlx=30 ovly=30 cols=4 type="grid" gap="m" radius="true" zoom="true" >}}
