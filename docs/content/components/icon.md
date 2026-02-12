---
author: Mark Dumay
title: Icon
date: 2024-08-14
description: Use the icon shortcode to add a Font Awesome or custom icon with ease.
layout: docs
icon: fa font-awesome
tags: component
---

## Overview

{{< release version="v0.8.0" >}}

Hinode includes support for [Font Awesome](https://fontawesome.com/) by default. This library provides both a free icon set, as well as utility functions to modify the appearance. You can also provide custom icons in the {{< abbr svg >}} format. Use the `icon` shortcode to quickly add a Font Awesome or custom icon to your content. You can also use `fa` for regular icons, `fab` for brand icons, and `fas` for solid icons.

### Relative sizing

Font Awesome includes a range of t-shirt based sizes that are relative to the browser's default font size of 16px. The icons align to the inline text. The following example illustrates the available relative sizes.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fas mug-saucer fa-2xs */>}} When my six o’clock alarm buzzes, I require a pot of good java.

{{</* fas mug-saucer fa-xs */>}} When my six o’clock alarm buzzes, I require a pot of good java.

{{</* fas mug-saucer fa-sm */>}} When my six o’clock alarm buzzes, I require a pot of good java.

{{</* fas mug-saucer fa */>}} When my six o’clock alarm buzzes, I require a pot of good java.

{{</* fas mug-saucer fa-lg */>}} When my six o’clock alarm buzzes, I require a pot of good java.

{{</* fas mug-saucer fa-xl */>}} When my six o’clock alarm buzzes, I require a pot of good java.

{{</* fas mug-saucer fa-2xl */>}} When my six o’clock alarm buzzes, I require a pot of good java.
{{< /example >}}
<!-- markdownlint-enable MD037 -->

The table below illustrates the relative sizing classes and their equivalent relative and absolute font size.

<!-- markdownlint-disable MD058 -->
{{< table class="table-striped w-auto" >}}
| Relative Sizing Class | Font Size | Equivalent in Pixels |
|-----------------------|----------:|---------------------:|
| `fa-2x`               |   0.625em |                 10px |
| `fa-xs`               |    0.75em |                 12px |
| `fa-sm`               |   0.875em |                 14px |
| `fa`                  |       1em |                 16px |
| `fa-lg`               |    1.25em |                 20px |
| `fa-xl`               |     1.5em |                 24px |
| `fa-2xl`              |       2em |                 32px |
{{< /table >}}
<!-- markdownlint-enable MD058 -->

### Absolute sizing

Font Awesome also supports absolute sizing on a scale of 1x to 10x. The icons do not necessarily align to their surrounding text. The following example illustrates the various absolute sizes.

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

<!-- markdownlint-disable MD058 -->
{{< table class="table-striped w-auto" >}}
| Absolute Sizing Class | Font Size |
|-----------------------|----------:|
| `fa-1x`               |       1em |
| `fa-2x`               |       2em |
| `fa-3x`               |       3em |
| `fa-4x`               |       4em |
| `fa-5x`               |       5em |
| `fa-6x`               |       6em |
| `fa-7x`               |       7em |
| `fa-8x`               |       8em |
| `fa-9x`               |       9em |
| `fa-10x`              |      10em |
{{< /table >}}
<!-- markdownlint-enable MD058 -->

### Responsive sizing

Hinode supports responsive sizing of icons using so-called containers. Assigning `wrapper` a value will wrap the icon in a HTML `div` element. Hinode assigns `.fa-wrapper` to the class attribute of the wrapper and `fa-fluid` to the icon itself. The icon is now dynamically resized.

> [!NOTE]
Container support is a relatively new CSS feature that is not supported by all browsers yet. See this [browser compatibility overview](https://caniuse.com/?search=%40container) to check the current browser support. Hinode uses a fixed-size icon with a `font-size` of `5rem` as fallback.

The following example demonstrates a centered, responsive icon. The icon keeps its original aspect ratio, so the wrapper may have some whitespace. Use `text-center` to center the icon within the container, and `mx-auto` to center the container itself.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fas icon="rocket bg-body-tertiary" wrapper="col-12 mx-auto text-center" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Fixed width

Add `fa-fw` to the class of the HTML element referencing your icon to apply a fixed width. This ensures icons of varying icon width are properly aligned to each other. The following example illustrates how this works.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fas person-skating fa-fw bg-body-tertiary */>}} Skating
{.fa-3x}

{{</* fas person-skiing fa-fw bg-body-tertiary */>}} Skiing
{.fa-3x}

{{</* fas person-skiing-nordic fa-fw bg-body-tertiary */>}} Nordic Skiing
{.fa-3x}

{{</* fas person-snowboarding fa-fw bg-body-tertiary */>}} Snowboarding
{.fa-3x}

{{</* fas snowplow fa-fw bg-body-tertiary */>}} Snowplow
{.fa-3x}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Lists

Use the classes `.fa-ul` and `.fa-li` to replace default bullets in unordered lists. The following example illustrates how this works.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

- {{</* fas icon="circle-check" wrapper="fa-li" */>}}List icons can
- {{</* fas icon="square-check" wrapper="fa-li" */>}}be used to
- {{</* fas icon="spinner fa-pulse" wrapper="fa-li" */>}} replace bullets
- {{</* fa icon="square" wrapper="fa-li" */>}} in lists
{.fa-ul}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Rotating icons

Use specific classes to rotate the icon with a specific degree. The following example illustrates how this works.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fas person-snowboarding fa-3x */>}}
{{</* fas person-snowboarding fa-3x fa-rotate-90 */>}}
{{</* fas person-snowboarding fa-3x fa-rotate-180 */>}}
{{</* fas person-snowboarding fa-3x fa-rotate-270 */>}}
{{</* fas person-snowboarding fa-3x fa-flip-horizontal */>}}
{{</* fas person-snowboarding fa-3x fa-flip-vertical */>}}
{{</* fas person-snowboarding fa-3x fa-flip-both */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

The following classes are available:

<!-- markdownlint-disable MD058 -->
{{< table class="table-striped w-auto" >}}
| Class                | Details                                          |
|----------------------|--------------------------------------------------|
| `fa-rotate-90`       | Rotates an icon 90°                              |
| `fa-rotate-180`      | Rotates an icon 180°                             |
| `fa-rotate-270`      | Rotates an icon 270°                             |
| `fa-flip-horizontal` | Mirrors an icon horizontally                     |
| `fa-flip-vertical`   | Mirrors an icon vertically                       |
| `fa-flip-both`       | Mirrors an icon both vertically and horizontally |
{{< /table >}}
<!-- markdownlint-enable MD058 -->

### Animating icons

Font Awesome supports various animations by simply adding a animation class to the HTML element. The following example illustrates the available basic animations. Add custom styles to your Sass files to apply additional [animation utilities](https://fontawesome.com/docs/web/style/animate).

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fas heart fa-3x fa-beat */>}}
{{</* fas triangle-exclamation fa-3x fa-fade */>}}
{{</* fas circle-info fa-3x fa-beat-fade */>}}
{{</* fas basketball fa-3x fa-bounce */>}}
{{</* fas camera-rotate fa-3x fa-flip */>}}
{{</* fas bell fa-3x fa-shake */>}}
{{</* fas arrows-rotate fa-3x fa-spin */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

The following table describes the available basic animation classes.

<!-- markdownlint-disable MD058 -->
{{< table class="table-striped w-auto" >}}
| Class          | Details                                      |
|----------------|----------------------------------------------|
| `fa-beat`      | Scales an icon up or down                    |
| `fa-fade`      | Fades an icon in and out                     |
| `fa-beat-fade` | Scales and pulses an icon in and out         |
| `fa-bounce`    | Bounces an icon up and down                  |
| `fa-flip`      | Rotates an icon about the Y axis 180 degrees |
| `fa-shake`     | Shakes an icon back and forth                |
| `fa-spin`      | Rotates an icon                              |
{{< /table >}}
<!-- markdownlint-enable MD058 -->

### Bordered and pulled icons

Use `fa-border` and `fa-pull-right` or `fa-pull-left` for easy pull quotes or article icons. The following example illustrates a quote.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* icon icon="fas quote-left fa-2x fa-pull-left" spacing=false */>}}
Gatsby believed in the green light, the orgastic future that year by year recedes before us.
It eluded us then, but that’s no matter — tomorrow we will run faster, stretch our arms further...
And one fine morning — So we beat on, boats against the current, borne back ceaselessly into the past.
{{< /example >}}
<!-- markdownlint-enable MD037 -->

The following table describes the available classes.

<!-- markdownlint-disable MD058 -->
{{< table class="table-striped w-auto" >}}
| Class           | Details                                                                 |
|-----------------|-------------------------------------------------------------------------|
| `fa-border`     | Creates a border with border-radius and padding applied around an icons |
| `fa-pull-left`  | Pulls an icon by floating it left and applying a margin-right           |
| `fa-pull-right` | Pulls an icon by floating it right and applying a margin-left           |
{{< /table >}}
<!-- markdownlint-enable MD058 -->

### Stacking icons

Use the `fa-stack` class on the parent HTML element of the two icons you want to stack. Then add the `fa-stack-1x` class for the regularly sized icon and add the `fa-stack-2x` class for the larger icon. `fa-inverse` can be added to the icon with the `fa-stack-1x` to help with a knock-out looking effect. Add a theme color such as `text-primary` to change the color of the icon. The following example illustrates the available options.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* fas square fa-stack-2x */>}}
{{</* fab x-twitter fa-stack-1x fa-inverse */>}}
{.fa-stack .fa-2x}

{{</* fas circle fa-stack-2x */>}}
{{</* fas flag fa-stack-1x fa-inverse */>}}
{.fa-stack .fa-2x}

{{</* fas camera fa-stack-1x */>}}
{{</* fas ban fa-stack-2x text-danger */>}}
{.fa-stack .fa-2x}

{{</* fas square fa-stack-2x */>}}
{{</* fas terminal fa-stack-1x fa-inverse */>}}
{.fa-stack .fa-4x}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

The following table describes the available classes.

<!-- markdownlint-disable MD058 -->
{{< table class="table-striped w-auto" >}}
| Class         | Details                                                              |
|---------------|----------------------------------------------------------------------|
| `fa-stack`    | Used on a parent HTML element of the two icons to be stacked         |
| `fa-stack-1x` | Used on the icon which should be displayed at base size when stacked |
| `fa-stack-2x` | Used on the icon which should be displayed larger when stacked       |
| `fa-inverse`  | Inverts the color of the icon displayed at base size when stacked    |
{{< /table >}}
<!-- markdownlint-enable MD058 -->

## Adding custom icons

{{< release version="v0.20.5" >}}

> [!NOTE]
> Hinode removes any embedded `height` and `width` attributes from the icon data to ensure the icon is responsive. The `viewBox` attribute is kept.

You can reference a custom family and icon stored in the local `assets` folder. The icon shortcode uses the path `assets/svgs/{family}/{icon}.svg`, replacing `{family}` and `{icon}` with the specified values. You can mix the custom icon with Font Awesome styling directives (such as `fa-4x`, although animations are typically not supported). The following example shows an icon called `activity` of the `custom` family of size `fa-4x`.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* icon custom activity fa-4x */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Configuration

> [!IMPORTANT]
> Webfonts (`inline = false`) require [Dart Sass](https://sass-lang.com/dart-sass/) to function correctly. See the [Hugo documentation](https://gohugo.io/functions/css/sass/#dart-sass) for installation instructions.

The [Font Awesome module](https://github.com/gethinode/mod-fontawesome) supports the following site parameters (using `params.modules` in `config.toml` or `hugo.toml`):

<!-- markdownlint-disable MD060 -->
| Setting                   | Default | Description |
|---------------------------|---------|-------------|
| `fontawesome.embed`       | true    | If set, generates a symbol map with embedded vector images. Only works in conjunction with `inline`. Include the symbol with the partial `assets/symbols.html` (requires the current page context).|
| `fontawesome.inline`      | true    | If set, uses inline vector images instead of web fonts. Both methods support Font Awesome styling and animation. However, when using vector images you cannot use aliases. Instead, use the default name of the icon. |
| `fontawesome.debug`       | true    | If set, prints the original code `<i class="[...]" style=[...]></i>` as comments next to the inline vector image. |
| `fontawesome.skipMissing` | false   | If set, displays a warning when an icon cannot be found. The missing icon is replaced with a dummy. By default, Hinode exits with an error when an icon is missing. |
<!-- markdownlint-enable MD060 -->

## Arguments

> [!IMPORTANT]
> When using inline vector icons, be sure to use the main name of the icon. The shortcode **does not recognize the aliases** of the icons and will throw an error or warning. For example, use `{{</* fas house */>}}` instead of `{{</* fas home */>}}` to add a house icon.

The shortcode supports both unnamed arguments and named arguments. When using unnamed arguments, all attributes are mapped to the `class` argument, separated by spaces.

{{< args structure="icon" group="shortcode" >}}
