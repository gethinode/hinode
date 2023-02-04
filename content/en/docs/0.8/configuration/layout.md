---
title: Layout
description: Hinode uses a grid-based, responsive design for the home page, single pages and list pages.
date: 2023-01-21
group: configuration
layout: docs
---

Hinode uses Bootstrap's [grid system]({{< param "links.bs_grid" >}}) and [breakpoints]({{< param "links.bs_breakpoints" >}}) to create a responsive layout across devices or viewport sizes. All pages follow the same base layout, which includes headers and footers. The next paragraphs explain the layout styles in more detail.

## Base layout

The base layout defines a page skeleton of which all other pages are derived. It consists of four major sections, being a header, body, social footer, and bottom footer. It also loads sytlesheets, scripts, and generates the metadata. The header includes the [main navigation]({{< ref "navigation#main-navigation" >}}) and can be optionally fixed to the top. By default, the base layout is expanded to fill the entire available viewport. This means that all elements stretch horizontally across the entire viewport. The body also expands vertically, where the footers align to the bottom of the viewport.

### Example

The following diagram illustrates the conceptual base design:

<div class="container-fluid text-center bg-light border rounded-3 bg-opacity-10 p-3">
    <div class="row g-3">
        <div class="col-12">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Header .col-12 <i>(optionally fixed)</i></div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">
                <p class="mb-5">Body .col-12 .flex-fill</p>
                <i>expands to fill viewport</i>
            </div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Social .col-12</div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Footer .col-12</div>
        </div>
    </div>
</div>

### Configuration

Hinode uses several settings from Hugo's [main configuration]({{< param "links.hugo_config" >}}). Several extensions are defined in the [custom site parameters]({{< param "links.hugo_config_dir" >}}) and [language-specific configuration]({{< param "links.hugo_lang_config" >}}).

#### Main configuration

The base layout uses the [main configuration]({{< param "links.hugo_config" >}}) of Hugo. The settings below are actively used by Hinode:

| Setting       | Default | Description |
|---------------|---------|-------------|
| title         | -       | Title of the website, joined with the separator and title of the current page. |
| copyright     | -       | Copyright notice added to the page footer. |
| paginate      | 9       | Maximum number of elements to display on a [list page](#list-pages) before pagination. |
| enableGitInfo | -       | Enables git information, which is used by [documentation pages](#documentation-layout). |
{.table}

The below configuration shows the default configuration set in `config/_default/config.toml`.

{{< docs name="main" file="config/_default/config.toml" >}}

#### Extended configuration

Hinode uses the following extended settings in the `main` section of the `site parameters`:

| Setting      | Default | Description |
|--------------|---------|-------------|
| separator    | "-"     | Seperator to join the website title and page title. |
| description  | -       | Short description of the website that is added to the page metadata. |
{.table}

The below configuration shows the default configuration set in `config/_default/params.toml`.

{{< docs name="main" file="config/_default/params.toml" >}}

#### Language-specific configuration

Hinode supports [multilingual content]({{< param "links.hugo_lang_config" >}}). The following parameters are used in the site's footer, header, and meta data. Refer to the [languages]({{< ref "languages" >}}) section to review the various configuration options to enable multilingual content.

| Section | Setting       | Default | Description |
|---------|---------------|---------|-------------|
| head    | tagline       | -       | Tagline used on the site's title for the home page. |
| feature | message       | -       | Welcome message used in the featured section on the home page. |
| feature | tagline       | -       | Tagline used below the welcome message in the featured section on the home page. |
| feature | link          | -       | Call to action link in the featured section on the home page. |
| feature | caption       | "About" | Call to action title in the featured section on the home page. |
| footer  | license       | -       | License displayed on the site's footer. |
| footer  | socialTitle   | -       | Title displayed in the site's social footer. |
| footer  | socialCaption | -       | Caption displayed in the site's social footer. |
{.table}

The below configuration shows the default configuration set in `config/_default/languages.toml` for the English language.

{{< docs name="lang-param" file="config/_default/languages.toml" >}}

## Home page

The home page introduces a feature element and provides a selection of the three most recent items in a section, such as blog posts and project descriptions. The items are displayed as card groups and alternate between a vertical grid and a horizontal grid. A button that links to the related section is added below each group. The feature element can optionally cover the entire viewscreen.

### Example

The following diagram illustrates the conceptual layout of the home page:

<div class="container-fluid text-center bg-light border rounded-3 bg-opacity-10 p-3">
    <div class="row g-3">
        <div class="col-12">
            <div class="p-3 bg-secondary bg-opacity-10 rounded-3">Header .col-12</div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">
                <p>Feature .col-12</p>
                <i>optionally spans viewport</i>
            </div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card .col-4</div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card .col-4</div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card .col-4</div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card .col-12</div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card .col-12</div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card .col-12</div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-secondary bg-opacity-10 rounded-3">Social .col-12</div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-secondary bg-opacity-10 rounded-3">Footer .col-12</div>
        </div>
    </div>
</div>

### Configuration

The configuration of the home page is set in the `home` section of the `site parameters`. The folllowing settings are supported:

| Setting      | Default | Description |
|--------------|---------|-------------|
| sections     | -       | Sections to include on the home page, e.g. ["blog", "projects"]. |
| featurePhoto | -       | Url of the photo to include in the feature element. |
| fullCover    | false   | Flag to indicate if the feature element should cover the entire front page. |
{.table}

The below configuration shows the default configuration set in `config/_default/params.toml`.

{{< docs name="home" file="config/_default/params.toml" >}}

## List pages

List pages provide an overview of available content within a section as a card group. By default, the most recent nine items are displayed. Adjust the setting `paginate` in the [main configuration](#configuration) as needed. If the section contains more items, a paginator is added below the card group.

### Example

The following diagram illustrates the conceptual layout of a list page:

<div class="container-fluid text-center bg-light border rounded-3 bg-opacity-10 p-3">
    <div class="row g-3">
        <div class="col-12">
            <div class="p-3 bg-secondary bg-opacity-10 rounded-3">Header .col-12</div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card</div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card</div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card</div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card</div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card</div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card</div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card</div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card</div>
        </div>
        <div class="col-4">
            <div class="p-3 bg-primary bg-opacity-10 rounded-3">Card</div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-secondary bg-opacity-10 rounded-3">Social .col-12</div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-secondary bg-opacity-10 rounded-3">Footer .col-12</div>
        </div>
    </div>
</div>

### Configuration

The configuration of the list pages is set in the `list` section of the `site parameters`. You can specify the settings for each section of your content. The entire configuration is fully optional and uses default settings if omitted. The folllowing settings are supported per section:

| Setting      | Default      | Description |
|--------------|--------------|-------------|
| title        | Section name | Title of the list page, displayed above the card group. By default, the title defined in the page's frontmatter is used. |
| sort         | "date"       | Type of sorting to be used, either "date" (default), "weight", "publication", "expiration", "lastmod", "length", "title", "linktitle", or "&lt;param&gt;". See Hugo's [content ordering]({{< param "links.hugo_ordering" >}}) for more details. |
| reverse      | true         | Flag to indicate the sorting of the section content should be reversed, defaults to true. |
| cols         | 3            | Number of columns to display in the card group, defaults to 3. |
| color        | -            | Theme color of the card, either "primary", "secondary", "success", "danger", "warning", "info", "light", "dark", "white" or "black". By default, no color is specified. |
| padding      | "auto"       | Padding of the content, either "0", "1", "2", "3", "4", "5", or "auto" (default). |
| header       | "full"       | Header components of the card, displayed in small caps. Supported values are "full" (default), "publication", "tags", and "none". |
| footer       | "none"       | Footer components of the card, displayed in small caps. Supported values are "full", "publication", "tags", and "none" (default). |
| orientation  | "stacked"    | Placecement of the thumbnail, either "stacked" (default), "horizontal", or "none". |
| style        | -            | Optional styling attributes added to card class, e.g. "border-0" to remove the borders. |
| homepage     | 3            | Maximum number of items to display on the home page (if defined in the [configuration](#configuration-1)), defaults to 3. |
{.table}

The below configuration shows the default configuration set in `config/_default/params.toml`.

{{< docs name="list" file="config/_default/params.toml" >}}

## Single pages

Single pages follow the base layout but introduce two columns next to the body content. The left column shows a [sidebar navigation]({{< ref "navigation#sidebar-navigation" >}}) if applicable and is left empty otherwise. The right column shows a [table of contents]({{< ref "navigation#table-of-contents" >}}) for the current page if applicable. On smaller viewscreens, the sidebar navigation folds into an offcanvas element, whilst the table of contents is hidden. On medium-sized screens the sidebar navigation takes precedence over the table of contents.

### Default layout

By default, single pages, such as a blog page, include the following elements in the body:

- **Title** - the title of the page as set in the page's frontmatter.
- **Metadata** - the date of the page, the modification date (if applicable), the read time, and the amount of words on the page.
- **Tags** - links to any tags defined in the page's frontmatter.
- **Description** - the description as defined in the page's frontmatter, or as summarized by Hugo if omitted in the frontmatter.
- **Thumbnail** - a thumbnail image with figure caption that links to the photo credits (if defined in the frontmatter).
- **Navigation links** - links on the bottom of the page that link to the previoud and next page within the current section.

The below example illustrates the parameters used in the page's frontmatter:

```yaml
---
author: Mark Dumay
title: Another project
date: 2021-07-15
description: Another project.
tags: ["javascript", "golang"]
thumbnail: img/coffee.jpg
photoCredits: <a href="https://unsplash.com/@kfred">Karl Fredrickson</a>
photoSource: <a href="https://unsplash.com/photos/TYIzeCiZ_60">Unsplash</a>
---
```

### Documentation layout

Documentation pages use a more straightforward, simplified layout compared to the default layout. They include the following elements in their body:

- **Title** - the title of the page as set in the page's frontmatter.
- **Description** - the description as defined in the page's frontmatter, or as summarized by Hugo if omitted in the frontmatter.
- **Metadata** - a revision date and link to the latest git commit on the bottom of the page. Enable `enableGitInfo` in the [main configuration](#main-configuration) for the git commit message to work.

Be sure to select the `docs` layout in the page's frontmatter to enable the documentation layout:

```yml
---
layout: docs
---
```

### Example

<div class="container-fluid text-center bg-light border rounded-3 bg-opacity-10 p-3">
    <div class="row g-3">
        <div class="col-12">
            <div class="p-3 bg-secondary bg-opacity-10 rounded-3">Header .col-12</div>
        </div>
        <div class="col-12">
            <div class="row">
                <div class="col-3">
                    <div class="bg-primary bg-opacity-10 rounded-3">
                        <p>Sidebar</p>
                        <i>sticky</i>
                    </div>
                </div>
                <div class="col-6">
                    <div class="bg-primary bg-opacity-10 rounded-3">
                        <p>Body .col-8 .flex-fill</p>
                        <i>expands to fill viewport</i>
                    </div>
                </div>
                <div class="col-3">
                    <div class="bg-primary bg-opacity-10 rounded-3">
                        <p>TOC</p>
                        <i>sticky</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-secondary bg-opacity-10 rounded-3">Social .col-12</div>
        </div>
        <div class="col-12">
            <div class="p-3 bg-secondary bg-opacity-10 rounded-3">Footer .col-12</div>
        </div>
    </div>
</div>

### Configuration

The configuration of the documentation pages is set in the `docs` section of the site parameters. The folllowing settings are supported:

| Setting      | Default | Description |
|--------------|---------|-------------|
| docs_version | -       | Default version to use in documentation links. |
{.table}

The below configuration shows the default configuration set in `config/_default/params.toml`.

{{< docs name="docs" file="config/_default/params.toml" >}}
