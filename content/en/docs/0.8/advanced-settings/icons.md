---
title: Icons
description: Configure secure access to icons from Bootstrap and Font Awesome.
date: 2023-01-28
group: advanced-settings
layout: docs
---

Hinode processes the Bootstrap icons to ensure they adhere to the strict [content security policy]({{< ref "server" >}}). In addition, it provides access to the free icons of [Font Awesome]({{< param "links.fontawesome" >}}).

## Bootstrap icons

Bootstrap uses various embedded vector images (in <abbr title="Scalable Vector Graphics">SVG</abbr> format) throughout its Sass source files. Hinode replaces these embedded images with file-based vector images, as the [content security policy]({{< ref "server" >}}) prohibits loading of embedded images. To ensure the images are consistent with the [theme colors]({{< ref "colors" >}}), the images are postprocessed using [Hugo templating]({{< param "links.hugo_templates">}}).

### Build pipeline

Hinodes uses npm and mounted folders to create a flexibile virtual file system that is automatically kept up to date. Review the [overview]({{< ref "overview" >}}) for a detailed explanation. The build pipeline of the Bootstrap icons consists of four steps. It is intertwined with the [build process for the stylesheets]({{< ref "styles" >}}).

1. Override the inline Bootstrap icon definitions

   Replace the default inline icon definitions within the Bootstrap Sass files with references to local vector images. Use the file `assets/scss/common/_icons.scss` to ensure the definitions take precedence over the default Bootstrap values. For example, the following statement updates the value of the `$form-switch-focus-bg-image`:

   ```scss
   $form-switch-focus-bg-image: url("icons/form-switch-focus-bg-image.svg") !default;
   ```

2. Export the Sass variables

   Export the required Sass variables by defining them in the `assets/scss/common/_export.scss` file. Hinode converts the variable names from kebab case to snake case to make them compatible with Hugo's variable naming convention. For example, the css variable `--form-switch-focus-color` is exposed as `.form_switch_focus_color` to the Hugo templates.

   ```scss
   :hinode-theme {
       --form-switch-focus-color: #{$form-switch-focus-color};
   }
   ```

3. Reference the Sass variables within each icon file

   Use [Hugo templating]({{< param "links.hugo_templates">}}) to reference the Sass variables for fill colors and stroke colors. For example, the file `assets/icons/form-switch-focus-bg-image.svg` defines the fill color as `{{ .form_switch_focus_color }}`. The entire vector definition is as such:

   ```html
   <svg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'>
       <circle r='3' fill='{{ .form_switch_focus_color }}'/>
   </svg>
   ```

4. Process the icon files

   Add the local icon files to the `assets/icons` folder with a filename as defined in step 1. The partial `partials/head/stylesheet.html` calls the partial `partials/head/icons.html` to process all icon files with the `.svg` extension recursively. The output is stored in the `icons` folder within the output directory (usually `public` when building the site). The icon files are referenced in the main stylesheet automatically.

### Icons definitions

The icons are defined in the file `assets/scss/common/_icons.scss`. The current configuration is the following:

{{< docs name="icons" file="assets/scss/common/_icons.scss" >}}

### Export definitions

The exported variables are defined in the file `assets/scss/common/_export.scss`. The current configuration is the following:

{{< docs name="export" file="assets/scss/common/_export.scss" >}}

## Font Awesome icons

[Font Awesome]({{< param "links.fontawesome" >}}) provides a collection of icons to be used freely on websites and other media. See the [icons documentation]({{< relref "../content/icons" >}}) in the content section on how to use them to style your website. Hinode uses the <abbr title="Cascading Style Sheets">CSS</abbr> files and web fonts of Font Awesome, as the [content security policy]({{< ref "server" >}}) prohibits the inline execution of stylesheets by the JavaScripts of Font Awesome. The CSS files are bundled with the main stylesheet. The web fonts are copied to the `/static/fonts` folder with the repository. Use the npm command `npm run copy:fonts` to copy the latest version of the files. The CSS files are referenced in the `assets/scss/app.scss` file. This is the current configuration:

{{< docs name="awesome" file="assets/scss/app.scss" >}}
