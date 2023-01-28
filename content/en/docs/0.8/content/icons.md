---
title: Icons
description: Use out-of-the-box Font Awesome icons to style your website.
date: 2023-01-24
group: content
layout: docs
---

Hinode provides out-of-the box access to the free icons of [Font Awesome]({{< param "links.fontawesome" >}}). The icon library provides various [styling options]({{< param "links.fa_styling" >}}). The below paragraphs illustrate how to apply the styling options compatible with Markdown, Bootstrap, and the [content security policy]({{< ref "server" >}}).

## Styling basics

The [Font Awesome icon library]({{< param "links.fa_icons" >}}) provides access to more than 2.000 free and open-source icons. Simply search for a keyword and review the presented options. For example, searching for the keyword `music` and filtering for `free` returns a list of nearly 30 icons. Simply add the HTML statement to your Markdown content.

{{< example lang="html" >}}
<i class="fa-solid fa-music"></i>
{{< /example >}}

The icons inherit the current styling options and as such blend in with text inline. For example, appply the [theme color]({{< ref "colors" >}}) `text-primary` to change the color of the icon.

{{< example lang="html" >}}
<span class="text-primary">
    <i class="fa-solid fa-music text-primary"></i>
</span>
{{< /example >}}

## Sizing icons

Font Awesome supports both relative and absolute sizing. The following two section explain how to apply the sizing to an icon.

### Relative sizing

Font Awesome includes a range of t-shirt based sizes that are relative to the browser's default font size of 16px. The icons align to the inline text. The following example illustrative the available relative sizes.

{{< example lang="html" >}}
<p><i class="fa-solid fa-coffee fa-2xs"></i> When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p><i class="fa-solid fa-coffee fa-xs"></i> When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p><i class="fa-solid fa-coffee fa-sm"></i> When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p><i class="fa-solid fa-coffee"></i> When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p><i class="fa-solid fa-coffee fa-lg"></i> When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p><i class="fa-solid fa-coffee fa-xl"></i> When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p><i class="fa-solid fa-coffee fa-2xl"></i> When my six o’clock alarm buzzes, I require a pot of good java.</p>
{{< /example >}}

The table below illustrates the relative sizing classes and their equivalent relative and absolute font size.

{{< table "table-striped w-auto" >}}
| Relative Sizing Class | Font Size | Equivalent in Pixels |
|----------|--------:|-----:|
| `fa-2x`  | 0.625em | 10px |
| `fa-xs`  | 0.75em  | 12px |
| `fa-sm`  | 0.875em | 14px |
| `fa-lg`  | 1.25em  | 20px |
| `fa-xl`  | 1.5em   | 24px |
| `fa-2xl` | 2em     | 32px |
{{< /table >}}

### Absolute sizing

Font Awesome also supports absolute sizing on a scale of 1x to 10x. The icons do not necessarily align to their surrounding text. The following example illustrative the various absolute sizes.

{{< example lang="html" >}}
<i class="fa-solid fa-camera fa-1x"></i>
<i class="fa-solid fa-camera fa-2x"></i>
<i class="fa-solid fa-camera fa-3x"></i>
<i class="fa-solid fa-camera fa-4x"></i>
<i class="fa-solid fa-camera fa-5x"></i>
<i class="fa-solid fa-camera fa-6x"></i>
<i class="fa-solid fa-camera fa-7x"></i>
<i class="fa-solid fa-camera fa-8x"></i>
<i class="fa-solid fa-camera fa-9x"></i>
<i class="fa-solid fa-camera fa-10x"></i>
{{< /example >}}

The table below illustrates the absolute sizing classes and their equivalent font size.

{{< table "table-striped w-auto" >}}
| Absolute Sizing Class | Font Size |
|---------|--------:|
| `fa-1x` | 1em |
| `fa-2x` | 2em |
| `fa-3x` | 3em |
| `fa-4x` | 4em |
| `fa-5x` | 5em |
| `fa-6x` | 6em |
| `fa-7x` | 7em |
| `fa-8x` | 8em |
| `fa-9x` | 9em |
| `fa-10x` | 10em |
{{< /table >}}

## Fixed width

Add `fa-fw` to the class of the HTML element referencing your icon to apply a fixed width. This ensures icons of varying icon width are properly aligned to each other. The following example illustrates how this works.

{{< example lang="html" >}}
<div class="fa-3x">
    <div><i class="fa-solid fa-skating fa-fw bg-info"></i> Skating</div>
    <div><i class="fa-solid fa-skiing fa-fw bg-info"></i> Skiing</div>
    <div><i class="fa-solid fa-skiing-nordic fa-fw bg-info"></i> Nordic Skiing</div>
    <div><i class="fa-solid fa-snowboarding fa-fw bg-info"></i> Snowboarding</div>
    <div><i class="fa-solid fa-snowplow fa-fw bg-info"></i> Snowplow</div>
</div>
{{< /example >}}

## Lists

Use the classes `fa-ul` and `fa-li` to replace default bullets in unordered lists. The following example illustrates how this works.

{{< example lang="html" >}}
<ul class="fa-ul">
    <li><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>List icons can</li>
    <li><span class="fa-li"><i class="fa-solid fa-check-square"></i></span>be used to</li>
    <li><span class="fa-li"><i class="fa-solid fa-spinner fa-pulse"></i></span>replace bullets</li>
    <li><span class="fa-li"><i class="fa-regular fa-square"></i></span>in lists</li>
</ul>
{{< /example >}}

## Rotating icons

Use specific classes to rotate the icon with a specific degree. The following example illustrates how this works.

{{< example lang="html" >}}
<div class="fa-3x">
    <i class="fa-solid fa-snowboarding"></i>
    <i class="fa-solid fa-snowboarding fa-rotate-90"></i>
    <i class="fa-solid fa-snowboarding fa-rotate-180"></i>
    <i class="fa-solid fa-snowboarding fa-rotate-270"></i>
    <i class="fa-solid fa-snowboarding fa-flip-horizontal"></i>
    <i class="fa-solid fa-snowboarding fa-flip-vertical"></i>
    <i class="fa-solid fa-snowboarding fa-flip-both"></i>
</div>
{{< /example >}}

The following classes are available:

{{< table "table-striped w-auto" >}}
| Class | Details |
|---------|--------|
| `fa-rotate-90` | Rotates an icon 90° |
| `fa-rotate-180` | Rotates an icon 180° |
| `fa-rotate-270` | Rotates an icon 270° |
| `fa-flip-horizontal` | Mirrors an icon horizontally |
| `fa-flip-vertical` | Mirrors an icon vertically |
| `fa-flip-both` | Mirrors an icon both vertically and horizontally |
{{< /table >}}

## Animating icons

Font Awesome supports various animations by simply adding a animation class to the HTML element. The following example illustrates the available basic animations. Add custom styles to your [Sass files]({{< ref "styles" >}}) to apply additional [animation utilities]({{< param "links.fa_animation" >}}).

{{< example lang="html" >}}
<div class="fa-3x">
    <i class="fa-solid fa-heart fa-beat"></i>
    <i class="fa-solid fa-triangle-exclamation fa-fade"></i>
    <i class="fa-solid fa-circle-info fa-beat-fade"></i>
    <i class="fa-solid fa-basketball fa-bounce"></i>
    <i class="fa-solid fa-camera-rotate fa-flip"></i>
    <i class="fa-solid fa-bell fa-shake"></i>
    <i class="fa-solid fa-sync fa-spin"></i>
</div>
{{< /example >}}

The following table describes the available basic animation classes.

{{< table "table-striped w-auto" >}}
| Class | Details |
|---------|--------|
| `fa-beat` | Scales an icon up or down |
| `fa-fade` | Fades an icon in and out |
| `fa-beat-fade` | Scales and pulses an icon in and out |
| `fa-bounce` | Bounces an icon up and down |
| `fa-flip` | Rotates an icon about the Y axis 180 degrees |
| `fa-shake` | Shakes an icon back and forth |
| `fa-spin` | Roates an icon |
{{< /table >}}

## Bordered and pulled icons

Use `fa-border` and `fa-pull-right` or `fa-pull-left` for easy pull quotes or article icons. The following example illustrates a quote.

{{< example lang="html" >}}
<i class="fa-solid fa-quote-left fa-2x fa-pull-left"></i>
Gatsby believed in the green light, the orgastic future that year by year recedes before us.
It eluded us then, but that’s no matter — tomorrow we will run faster, stretch our arms further...
And one fine morning — So we beat on, boats against the current, borne back ceaselessly into the past.
{{< /example >}}

The following table describes the available classes.

{{< table "table-striped w-auto" >}}
| Class | Details |
|-------|---------|
| `fa-border` | Creates a border with border-radius and padding applied around an icons |
| `fa-pull-left` | Pulls an icon by floating it left and applying a margin-right |
| `fa-pull-right` | Pulls an icon by floating it right and applying a margin-left |
{{< /table >}}

## Stacking icons

Use the `fa-stack` class on the parent HTML element of the two icons you want to stack. Then add the `fa-stack-1x` class for the regularly sized icon and add the `fa-stack-2x` class for the larger icon. `fa-inverse` can be added to the icon with the `fa-stack-1x` to help with a knock-out looking effect. Add a [theme color]({{< ref "colors" >}}) such as `text-primary` to change the color of the icon. The following example illustrates the available options.

{{< example lang="html" >}}
<span class="fa-stack fa-2x">
    <i class="fa-solid fa-square fa-stack-2x"></i>
    <i class="fab fa-twitter fa-stack-1x fa-inverse"></i>
</span>
<span class="fa-stack fa-2x">
    <i class="fa-solid fa-circle fa-stack-2x"></i>
    <i class="fa-solid fa-flag fa-stack-1x fa-inverse"></i>
</span>
<span class="fa-stack fa-2x">
    <i class="fa-solid fa-camera fa-stack-1x"></i>
    <i class="fa-solid fa-ban fa-stack-2x text-danger"></i>
</span>
<span class="fa-stack fa-2x">
    <i class="fa-solid fa-square fa-stack-2x"></i>
    <i class="fa-solid fa-terminal fa-stack-1x fa-inverse"></i>
</span>
<span class="fa-stack fa-4x">
    <i class="fa-solid fa-square fa-stack-2x"></i>
    <i class="fa-solid fa-terminal fa-stack-1x fa-inverse"></i>
</span>
{{< /example >}}

The following table describes the available classes.

{{< table "table-striped w-auto" >}}
| Class | Details |
|-------|---------|
| `fa-stack`    | Used on a parent HTML element of the two icons to be stacked |
| `fa-stack-1x` | Used on the icon which should be displayed at base size when stacked |
| `fa-stack-2x` | Used on the icon which should be displayed larger when stacked |
| `fa-inverse`  | Inverts the color of the icon displayed at base size when stacked |
