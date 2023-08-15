---
title: Placeholder 2
description: A placeholder for a future gallery
date: 2023-08-01
lastmod: 2023-08-15
tags: ["photo"]
thumbnail: img/galindustrial.webp
# This prevents the thumbnail to be displayed on the page and used only in the list
layout: gallery
# This loads the lightbox script
lightbox: true
modules: ["mgallery"]
---
<!-- Cspell:ignore ovlpos ovlx ovly ovlperc lightbox mgallery galindustrial webp lastmod -->

Someday this stops being a placeholder.

{{< mgallery list="img/*" unique="true" overlay="img/overlay-logo.png" ovlpos="left-bottom" ovlperc=10 ovlx=30 ovly=30 cols=4 type="grid" gap="m" radius="true" zoom="true" >}}
