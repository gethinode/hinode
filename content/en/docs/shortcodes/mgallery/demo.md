---
author: Joost Mans
title: mgallery demo
date: 2023-07-04
lastmod: 2023-08-15
Description: A demonstration of some usages of the mgallery shortcode
layout: docs
showComments: false
modules: ["mgallery"]
_build:
  list: never
---
<!-- cSpell:ignore Joost mgallery shortcode lastmod -->

A gallery can be configured in many ways. First there is the option to show it as a grid or a masonry. The default thumbnail ratio is different for a grid and a masonry. For a grid it is 1x1 and for a masonry the original image ratio is used, because a masonry will only look like a masonry when the images are not equally sized. A few of the possible options are shown below.

The following shows a grid in 3 columns.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" show_preview="false" >}}
{{</* mgallery "list"="img/*" "cols"=3 */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
{{< mgallery "list"="img/*" "cols"=3 >}}

The default type when it is not specified is "grid".

And to show the same image set as a masonry, the type is set to "masonry". In this case 4 columns are used (which is the default).

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" show_preview="false" >}}
{{</* mgallery "list"="img/*" "type"="masonry" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

{{< mgallery "list"="img/*" "type"="masonry" >}}

As can be seen, the images also become smaller. This is because the images are sized to fit the available space. With more columns, there is less space available per image.

To show the masonry, with no space between the images and also no corners (because that looks better), the following is used:

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" show_preview="false" >}}
{{</* mgallery "list"="img/*" "type"="masonry" "gap"="0" "radius"="false" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

{{< mgallery "list"="img/*" "type"="masonry" "gap"="0" "radius"="false" >}}

A class can be added to the images in the gallery. In this case a border to the images is added in the 'danger' color, which is red.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" show_preview="false" >}}
{{</* mgallery "list"="img/*" "cols"=3 "class"="border border-danger" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->
{{< mgallery "list"="img/*" "cols"=3 "class"="border border-danger" >}}
