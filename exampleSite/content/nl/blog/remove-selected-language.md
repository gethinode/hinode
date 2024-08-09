---
author: Mark Dumay
title: Remove selected language
slug: remove-selected-language
date: 2024-08-09
description: Remove selected language
tags:
    - shortcode
thumbnail:
    url: img/boots.jpg
    author: Nathan Dumlao
    authorURL: https://unsplash.com/@nate_dumlao
    origin: Unsplash
    originURL: https://unsplash.com/photos/QLPWQvHvmII
---

Via the adjustable configuration

`enableLanguageSelectionStorage = true`

 in **params.toml** (\exampleSite\config\_default\params.toml)
the selected language is stored in the browser *localStorage* in the "**selectedLanguage**" key.

The script can be found here:
**assets\js\critical\languageSelector.js**

{{< file show=false path="./assets/js/critical\languageSelector.js" id="file-collapse-1" >}}

If the key is to be removed, the shortcode
**remove-selected-language**
can be used on the respective page.

## Remove selected language

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* remove-selected-language */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

{{< file path="./layouts/shortcodes/remove-selected-language.html" id="file-collapse-2" >}}

{{< remove-selected-language >}}
