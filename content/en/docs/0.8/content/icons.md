---
title: Icons
description: Use out-of-the-box Font Awesome icons to style your website.
date: 2023-02-02
group: content
layout: docs
---

Hinode provides out-of-the box access to the free icons of [Font Awesome]({{< param "links.fontawesome" >}}). The [shortcodes]({{< relref "icon" >}}) `fa`, `fab`, and `fas` are available to add these icons with as limited code as possible. The Font Awesome icon library provides various [styling options]({{< param "links.fa_styling" >}}). The below paragraphs illustrate how to apply the styling options compatible with Markdown, Bootstrap, and the [content security policy]({{< ref "server" >}}).

## Styling basics

The [Font Awesome icon library]({{< param "links.fa_icons" >}}) provides access to more than 2.000 free and open-source icons. Simply search for a keyword and review the presented options. For example, searching for the keyword `music` and filtering for `free` returns a list of nearly 30 icons. Use one of the following three [shortcodes]({{< relref "icon" >}}) to add an icon to your Markdown content:

- `fa` - regular Font Awesome icon library
- `fab` - brands Font Awesome icon library
- `fas` - solid Font Awesome icon library

Specify the correct icon library and omit the `fa-` prefix from the icon name to insert an icon.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fas music */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

The icons inherit the current styling options and as such blend in with text inline. For example, appply the [theme color]({{< ref "colors" >}}) `text-primary` of the outer HTML element `span` to change the color of the icon. You can also pass the class attribute directly to the shortcode, such as `text-info`.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
<span class="text-primary">
    {{</* fas music */>}}
</span>
{{</* fas music text-info */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Sizing icons

Font Awesome supports both relative and absolute sizing. The following two section explain how to apply the sizing to an icon.

### Relative sizing

Font Awesome includes a range of t-shirt based sizes that are relative to the browser's default font size of 16px. The icons align to the inline text. The following example illustrative the available relative sizes.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
<p>{{</* fas coffee fa-2xs */>}} When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p>{{</* fas coffee fa-xs */>}} When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p>{{</* fas coffee fa-sm */>}} When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p>{{</* fas coffee fa */>}} When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p>{{</* fas coffee fa-lg */>}} When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p>{{</* fas coffee fa-xl */>}} When my six o’clock alarm buzzes, I require a pot of good java.</p>
<p>{{</* fas coffee fa-2xl */>}} When my six o’clock alarm buzzes, I require a pot of good java.</p>
{{< /example >}}
<!-- markdownlint-enable MD037 -->

The table below illustrates the relative sizing classes and their equivalent relative and absolute font size.

{{< table "table-striped w-auto" >}}
| Relative Sizing Class | Font Size | Equivalent in Pixels |
|----------|--------:|-----:|
| `fa-2x`  | 0.625em | 10px |
| `fa-xs`  | 0.75em  | 12px |
| `fa-sm`  | 0.875em | 14px |
| `fa`     | 1em     | 16px |
| `fa-lg`  | 1.25em  | 20px |
| `fa-xl`  | 1.5em   | 24px |
| `fa-2xl` | 2em     | 32px |
{{< /table >}}

### Absolute sizing

Font Awesome also supports absolute sizing on a scale of 1x to 10x. The icons do not necessarily align to their surrounding text. The following example illustrative the various absolute sizes.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fas camera fa-1x */>}}
{{</* fas camera fa-2x */>}}
{{</* fas camera fa-3x */>}}
{{</* fas camera fa-4x */>}}
{{</* fas camera fa-5x */>}}
{{</* fas camera fa-6x */>}}
{{</* fas camera fa-7x */>}}
{{</* fas camera fa-8x */>}}
{{</* fas camera fa-9x */>}}
{{</* fas camera fa-10x */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

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

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
<div class="fa-3x">
    <div>{{</* fas skating fa-fw bg-info */>}} Skating</div>
    <div>{{</* fas skiing fa-fw bg-info */>}} Skiing</div>
    <div>{{</* fas skiing-nordic fa-fw bg-info */>}} Nordic Skiing</div>
    <div>{{</* fas snowboarding fa-fw bg-info */>}} Snowboarding</div>
    <div>{{</* fas snowplow fa-fw bg-info */>}} Snowplow</div>
</div>
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Lists

Use the classes `fa-ul` and `fa-li` to replace default bullets in unordered lists. The following example illustrates how this works.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
<ul class="fa-ul">
    <li><span class="fa-li">{{</* fas circle-check */>}}</span>List icons can</li>
    <li><span class="fa-li">{{</* fas check-square */>}}</span>be used to</li>
    <li><span class="fa-li">{{</* fas spinner fa-pulse */>}}</span>replace bullets</li>
    <li><span class="fa-li">{{</* fa square */>}}</span>in lists</li>
</ul>
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Rotating icons

Use specific classes to rotate the icon with a specific degree. The following example illustrates how this works.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
<div class="fa-3x">
    {{</* fas snowboarding */>}}
    {{</* fas snowboarding fa-rotate-90 */>}}
    {{</* fas snowboarding fa-rotate-180 */>}}
    {{</* fas snowboarding fa-rotate-270 */>}}
    {{</* fas snowboarding fa-flip-horizontal */>}}
    {{</* fas snowboarding fa-flip-vertical */>}}
    {{</* fas snowboarding fa-flip-both */>}}
</div>
{{< /example >}}
<!-- markdownlint-enable MD037 -->

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

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
<div class="fa-3x">
    {{</* fas heart fa-beat */>}}
    {{</* fas triangle-exclamation fa-fade */>}}
    {{</* fas circle-info fa-beat-fade */>}}
    {{</* fas basketball fa-bounce */>}}
    {{</* fas camera-rotate fa-flip */>}}
    {{</* fas bell fa-shake */>}}
    {{</* fas sync fa-spin */>}}
</div>
{{< /example >}}
<!-- markdownlint-enable MD037 -->

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

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fas quote-left fa-2x fa-pull-left */>}}
Gatsby believed in the green light, the orgastic future that year by year recedes before us.
It eluded us then, but that’s no matter — tomorrow we will run faster, stretch our arms further...
And one fine morning — So we beat on, boats against the current, borne back ceaselessly into the past.
{{< /example >}}
<!-- markdownlint-enable MD037 -->

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

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
<span class="fa-stack fa-2x">
    {{</* fas square fa-stack-2x */>}}
    {{</* fab twitter fa-stack-1x fa-inverse */>}}
</span>
<span class="fa-stack fa-2x">
    {{</* fas circle fa-stack-2x */>}}
    {{</* fas flag fa-stack-1x fa-inverse */>}}
</span>
<span class="fa-stack fa-2x">
    {{</* fas camera fa-stack-1x */>}}
    {{</* fas ban fa-stack-2x text-danger */>}}
</span>
<span class="fa-stack fa-4x">
    {{</* fas square fa-stack-2x */>}}
    {{</* fas terminal fa-stack-1x fa-inverse */>}}
</span>
{{< /example >}}
<!-- markdownlint-enable MD037 -->

The following table describes the available classes.

{{< table "table-striped w-auto" >}}
| Class | Details |
|-------|---------|
| `fa-stack`    | Used on a parent HTML element of the two icons to be stacked |
| `fa-stack-1x` | Used on the icon which should be displayed at base size when stacked |
| `fa-stack-2x` | Used on the icon which should be displayed larger when stacked |
| `fa-inverse`  | Inverts the color of the icon displayed at base size when stacked |
{{< /table >}}
