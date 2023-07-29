<!-- cSpell:ignore Joost mgallery shortcode mimage gridmasonry -->
<!-- markdownlint-disable MD003 MD022 MD041 -->
---
author: Joost Mans
title: Overview of the mgallery shortcode
date: 2023-07-04
Description: Overview of the mgallery shortcode
layout: docs
_build:
  list: never
---
<!-- markdownlint-enable MD022 MD041 -->
The `mgallery` shortcode can be used on a page to display a gallery of images and when clicked upon show the larger image. From there it is also possible to navigate to the other images in the gallery. The shortcode can also be used to display multiple galleries on a single page.

The gallery is a set of thumbnails that are displayed in either a grid or a masonry style. Showing thumbnails in a grid means that all images are organized in equally sized columns and all images on a row will have the same sized grid.  
The width of each grid element is always the same and is determined by the number of columns the gallery has. Because of that each of the images is scaled to fit that width. The height of the grid elements on a row is based on the tallest images on that row. When there are horizontal and vertical images on a row, the result is a blank area in the grid elements with a horizontal image.

A mason is a person who lays bricks. To prevent a wall to have holes, the bricks are fitted in such a ways that no holes will appear. The same is true for a masonry gallery. The images are fitted in such a way that there are no empty spaces, such as in a grid (except at the end perhaps). The below image shows the difference between the two.  
The width of each masonry element is always the same and is determined by the number of columns the gallery has. Because of that each of the images is scaled to fit that width. There is no alignment of images in the vertical direction. In the vertical direction images are 'fitted' to the image above, so that the distance between images is always the same.

{{< mimage src="img/gridmasonry.jpg" caption="On the left a grid is shown. On the right a masonry" outer="image-center" text="caption-center text-italic">}}

If all images in a gallery have the same size, there is no visual difference between a grid and a masonry. At least not on a larger screen. On a smaller screen the number of columns will be reduced in a grid to try and keep the image size somewhat the same. In a masonry, the entire masonry is resized, making the masonry look the same, but with smaller images on a smaller screen.

Check the [usage](../usage) page for the details on how to use the shortcode, and the [installation](../installation) page on how to install the shortcode.
