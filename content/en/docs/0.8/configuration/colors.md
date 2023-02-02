---
title: Colors
description: Use Bootstrap's color system to easily adjust your website's colors.
date: 2023-01-14
group: configuration
layout: docs
---

## Theme colors

Hinode uses Bootstrap's color system. You can adjust them in the `/config/_default/params.toml` file in the `style` section.

{{< docs name="theme-colors" file="config/_default/params.toml" >}}

In addition, the background colors `black` and `white` are available too. Below is an overview of the rendered colors.

<div class="row">
    <div class="col-md-4">
        <div class="p-3 mb-3 text-bg-primary rounded-3">Primary</div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 text-bg-secondary rounded-3">Secondary</div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 text-bg-success rounded-3">Success</div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 text-bg-danger rounded-3">Danger</div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 text-bg-warning rounded-3">Warning</div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 text-bg-info rounded-3">Info</div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 text-bg-light rounded-3">Light</div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 text-bg-dark rounded-3">Dark</div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 text-bg-white rounded-3">White</div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 bg-black text-white rounded-3">Black</div>
    </div>
</div>

## Colored contrasting links

Hinode defines additional classes to render links that contrast with their background. Simply add `link-bg-<color>` to the class of an `<a>` anchor element. The next example adds a link constrasting with the background color `bg-success`.

{{< example >}}
<div class="col-md-2">
    <div class="p-3 mb-3 bg-success rounded-3 text-center"><a class="link-bg-success" href="#">Success</a></div>
</div>
{{< /example>}}

Below grid illustrates the contrasting colors for each background.

<div class="row">
    <div class="col-md-4">
        <div class="p-3 mb-3 bg-primary rounded-3"><a class="link-bg-primary" href="#">Primary</a></div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 bg-secondary rounded-3"><a class="link-bg-secondary" href="#">Secondary</a></div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 bg-success rounded-3"><a class="link-bg-success" href="#">Success</a></div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 bg-danger rounded-3"><a class="link-bg-danger" href="#">Danger</a></div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 bg-warning rounded-3"><a class="link-bg-warning" href="#">Warning</a></div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 bg-info rounded-3"><a class="link-bg-info" href="#">Info</a></div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 bg-light rounded-3"><a class="link-bg-light" href="#">Light</a></div>
    </div>
    <div class="col-md-4">
        <div class="p-3 mb-3 bg-dark rounded-3"><a class="link-bg-dark" href="#">Dark</a></div>
    </div>
</div>

## Generating helper

The SCSS generator for the colored links is defined in `assets/scss/helpers/_colored-links.scss`.

{{< docs name="colored-links" file="assets/scss/helpers/_colored-links.scss" >}}
