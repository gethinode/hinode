---
author: Hinode Contributors
title: File highlighting
date: 2023-09-23
description: The file shortcode prints the full content of any given file with syntax highlighting
tags: ["file", "shortcode"]
thumbnail:
  url: img/puzzle.jpg
  author: Ryoji Iwata
  authorURL: https://unsplash.com/@ryoji__iwata
  origin: Unsplash
  originURL: https://unsplash.com/photos/5siQcvSxCP8
---

The [file shortcode](https://gethinode.com/docs/components/file/) prints and highlights the full content of a given input file. It recognizes the languages supported by Hugo’s highlight function.

## File Shortcode

Use the Hugo syntax highlighting options for marking lines in the file.
[Hugo Documentation](https://gohugo.io/content-management/syntax-highlighting/#highlight-shortcode)

{{< file full="true" show="true" path="./layouts/shortcodes/file.html" options="linenos=table,hl_lines=41 68-70,linenostart=42" >}}

## Default configuration

{{< file full="true" show="false" path="./config/_default/markup.toml" >}}

## Current page as markdown file

{{< file full="true" show="true" path="./content/en/blog/file-highlight.md" >}}
