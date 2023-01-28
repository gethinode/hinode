---
title: Typography
description: Use a mix of Markdown and HTML syntax to style your content.
date: 2023-01-22
group: content
layout: docs
---

Hinode uses a mix of basic Markdown syntax enriched with Bootstrap styling for the typography. The following paragraphs illustrate the most common applications. Refer to the Hugo documentation to review the extended description of supported [content formats]({{< param "links.hugo_content" >}}). It also contains links to external resource about Markdown.

## Headings

Use the native Markdown character `#` to generate headings for your content. The following input represents six levels of section headings. They are generated as HTML `<h1>`—`<h6>` elements. `<h1>` is the highest section level while `<h6>` is the lowest.

<!-- markdownlint-disable MD025 -->
{{< example lang="markdown" >}}

# H1. Heading

## H2. Heading

### H3. Heading

#### H4. Heading

##### H5. Heading

###### H6. Heading

{{< /example >}}
<!-- markdownlint-enable MD025 -->

Alternatively, you can use `.h1` through `.h6` classes, for when you want to match the font styling of a heading but cannot use the associated HTML element. For example, using a `.h2` class will exclude the section heading from the generated [table of contents]({{< ref "navigation#table-of-contents" >}}).

{{< example lang="html" >}}
<p class="h1">H1</p>
<p class="h2">H2</p>
<p class="h3">H3</p>
<p class="h4">H4</p>
<p class="h5">H5</p>
<p class="h6">H6</p>
{{< /example >}}

## Display headings

Display a larger, slightly more opinionated heading style by adding the `.display` class in HTML.

{{< example lang="html" >}}
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>
<h1 class="display-5">Display 5</h1>
<h1 class="display-6">Display 6</h1>
{{< /example >}}

## Lead

Make a paragraph stand out by adding `.lead` class in HTML.

{{< example lang="html" >}}
<p class="lead">
  This is a lead paragraph. It stands out from regular paragraphs.
</p>
{{< /example >}}

## Inline text elements

You can use native Markdown to apply basic styling. Use HTML elements for additional formatting options.

### Native Markdown

Use native Markdown apply basic styling to your text.

<!-- markdownlint-disable MD049 -->
{{< example lang="markdown" >}}
~~This line of text is meant to be treated as deleted text.~~

_This line of text renders as underlined._

**This line of text renders as bold text.**

*This line of text renders as italicized text.*
{{< /example >}}
<!-- markdownlint-enable MD049 -->

### HTML Styling

Use HTML tags for additional styling options. The following example illustrates highlighting, fine print, subscript, and superscript.

{{< example lang="html" >}}
<p>You can use the mark tag to <mark>highlight</mark> text.</p>
<p><small>This line of text is meant to be treated as fine print.</small></p>
<p>H<sub>2</sub>O is a liquid.</p>
<p>2<sup>10</sup> is 1024.</p>
{{< /example >}}

## Emoji

Use shortcodes to insert Emoji into your content. You can use this [list of emoji]({{< param "links.markdown_emoji" >}}) shortcodes as a reference, although the results may vary across browsers and devices. The following example inserts an inline smiley.

<div class="bg-light p-3 mb-3">
    That is so funny! <code>:<zero-width space>smiley:<zero-width space></code>
</div>

The result looks like this:

That is so funny! :smiley:

## Abbreviations

Use the HTML element `<abbr>` for abbreviations and acronyms to show the expanded version on hover. Abbreviations have a default underline and gain a help cursor to provide additional context on hover and to users of assistive technologies.

{{< example lang="html" >}}
<p><abbr title="HyperText Markup Language">HTML</abbr></p>
{{< /example >}}

## Blockquotes

The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a `footer` or `cite` element, and optionally with in-line changes such as annotations and abbreviations. Use the `>` Markdown character to generate a blockquote and add `{.blockquote}` at the bottom of the block to apply the correct styling.

### Blockquote without attribution

The following Markdown generates a blockquote without attribution.

{{< example lang="markdown" >}}
> Tiam, ad mint andaepu dandae nostion secatur sequo quae.
> **Note** that you can use _Markdown syntax_ within a blockquote.
{.blockquote}
{{< /example >}}

### Blockquote with attribution

The following Markdown generates a blockquote with attribution. The citation itself is added to the bottom of the page.

{{< example lang="markdown" >}}
> Don't communicate by sharing memory, share memory by communicating.<br>
> — <cite>Rob Pike[^1]</cite>
{.blockquote}

[^1]: The above quote is excerpted from Rob Pike's [talk](https://www.youtube.com/watch?v=PAAkCSZUG1c) during Gopherfest, November 18, 2015.
{{< /example >}}

## Code Blocks

Use a single backtick `` ` `` character to denote an inline code element. Use triple backticks `` ``` `` to denote the start and end of a code block. Add the language to the opening backticks to specify the syntax. Hugo uses Chroma highlighting to style the syntax of [supported languages]({{< param "links.hugo_chroma" >}}). The following example defines an `HTML` code block.

{{< example lang="markdown" >}}

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>Example HTML5 Document</title>
  </head>
  <body>
    <p>Test</p>
  </body>
</html>
```

{{< /example >}}

## List Types

Use native Markdown to define ordered lists, unordered lists, and nested lists.

### Ordered List

The following Markdown defines an ordered list of three items. The sequence is automatically determined, so simply add `1.` at the start of each element. The [linting rules]({{< ref "contribute#markdown" >}}) will raise an error if you add the sequence numbering yourself.

{{< example lang="markdown" >}}

1. First item
1. Second item
1. Third item

{{< /example >}}

### Unordered List

Use the `-` character to denote an unordered list.

{{< example lang="markdown" >}}

- List item
- Another item
- And another item

{{< /example >}}

### Nested list

Use indendation and the `-` character to denote a nested list.

{{< example lang="markdown" >}}

- Fruit
  - Apple
  - Orange
  - Banana
- Dairy
  - Milk
  - Cheese

{{< /example >}}

### Task list

Use the `-` character followed by either `[x]` or `[ ]` to indicate a (completed) task.

{{< example lang="markdown" >}}

- [x] Write the press release
- [ ] Update the website
- [ ] Contact the media

{{< /example >}}
