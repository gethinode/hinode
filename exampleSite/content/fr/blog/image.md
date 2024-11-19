---
author: Mark Dumay
title: Images locales et distantes
date: 2024-05-19
description: Inclure des images responsives provenant de sources locales et de certains fournisseurs de CDN d'images.
tags: ["blog"]
thumbnail:
  url: https://assets.imgix.net/examples/bluehat.jpg
---

## Cloudinary

À titre d'exemple, le shortcode suivant affiche une image avec des coins arrondis et un ratio d'aspect de 21x9.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* image src="https://res.cloudinary.com/demo/dog.webp"
    ratio="21x9" caption="Image Cloudinary" class="rounded" plain=true */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## ImageKit.io

À titre d'exemple, le shortcode suivant affiche une image avec des coins arrondis et un ratio d'aspect de 21x9.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* image src="https://ik.imagekit.io/demo/default-image.jpg"
    ratio="21x9" caption="Image ImageKit.io" class="rounded" anchor="Center" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}

## Imgix

À titre d'exemple, le shortcode suivant affiche une image avec des coins arrondis et un ratio d'aspect de 21x9.

{{% comment %}}<!-- markdownlint-disable MD037 -->{{% /comment %}}
{{< example lang="hugo" >}}
{{</* image src="https://assets.imgix.net/examples/bluehat.jpg"
    ratio="21x9" caption="Image imgix" class="rounded" anchor="Top" */>}}
{{< /example >}}
{{% comment %}}<!-- markdownlint-enable MD037 -->{{% /comment %}}
