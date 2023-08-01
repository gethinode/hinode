<!-- Cspell:ignore ovlpos ovlx ovly ovlperc lightbox mgallery -->
<!-- markdownlint-disable MD003 MD022 MD041 -->
---
title: Gallery 1
description: Example for gallery 1
date: 2023-05-20
tags: ["picture", "test"]
thumbnail: img/boots.jpg
# This prevents the thumbnail to be displayed on the page and used only in the list
layout: gallery
# This loads the lightbox script
lightbox: true
modules: ["mgallery"]
---
<!-- markdownlint-enable MD003 MD022 MD041 -->

Gallery IMG
{{< mgallery list="img/*" unique="true" overlay="img/overlay-logo.png" ovlpos="left-bottom" ovlperc=10 ovlx=30 ovly=30 cols=4 type="grid" gap="m" radius="true" zoom="true" >}}

Gallery IMG2  
{{< mgallery cols=3 type="masonry" gap="m" radius="true" zoom="false" list="img2/*" unique="false" overlay="img/overlay-logo.png" ovlpos="right-bottom" ovlperc=10 ovlx=30 ovly=30 >}}
