---
title: Languages
description: Configure multiple languages to enable multilingual sites.
date: 2023-01-21
group: configuration
layout: docs
---

Hinode supports Hugo's [multilingual mode]({{< param "links.hugo_lang" >}}) to create websites with multiple languages side by side. The next paragraphs explain how to configure multiple languages, how to provide content translations, and how to define multilingual messages and keywords.

## Language configuration

Define the languages available to your site in the main site configuration. The below configuration shows the default configuration set in `config/_default/languages.toml` for the English language.

{{< docs name="lang-main" file="config/_default/languages.toml" >}}

The default behavior is set in `config/_default/config.toml`. For example, you can set the `defaultContentLanguageInSubdir` to `false` to remove the language slug `/en` from your site entirely.

{{< docs name="language" file="config/_default/config.toml" >}}

## Content translation

Hugo supports multiple ways to define translated content. Hinode uses an approach to define translations in separate directories for each language. In the default settings, content for the English language is defined in the folder `content/en`. It is recommended to use the same filename for each page translation. This enables Hugo to recognize if a page translation is available. Hinode links to this translation in the main navigation bar.

For example, consider the `About` page. It is available in both English and Dutch. The content files are defined in `content/en/about.md` and `content/nl/about.md`. Hugo now recognizes the page is available in two languages. To translate the URL for the Dutch page, a `slug` is defined the page's frontmatter:

```yml
---
slug: "over-mij"
---
```

The English page is available by navigating to `/en/about` and the Dutch translation is available on `/nl/over-mij`. The [main navigation]({{< ref "navigation#main-navigation" >}}) item shows a language switcher for both translations.

## Internationalization

Hinode uses Hugo's [internationalization function]({{< param "links.hugo_i18n" >}}) to translate keywords and messages. Translations are available in English, Dutch, and German. For example, the translation for the word `about` in the Dutch language is defined in `i18n/nl.yaml` (strictly speaking, it translates to `about me`).

```yml
# Content
- id: about
  translation: "Over mij"
```
