---
author: Joost Mans
title: Markdown
date: 2023-07-21T13:40:45.334Z
lastmod: 2023-08-15
description: Showing possible Markdown options, which also shows what is and what is not supported.
tags: ["blog", "markdown"]
thumbnail:
    url: /img/mark.jpg
    author: Victória Kubiaki
    authorURL: https://unsplash.com/@victoriakubiaki"
    origin: Unsplash
    originURL: https://unsplash.com/photos/OukRLogaKPE
modules: ["katex"]
---  
<!-- cSpell:ignore goldmark blockquotes frontmatter xcab XFFFD someid someclass somevalue linenos linenostart stle mynote katex emojist healthcheck linkify strikethrough blackfriday myclass monokai lineanchors shortcode shortcodes Hinode relref fontawesome borderless viewports joost Hinode Victória Kubiaki lastmod -->
<!-- markdownlint-disable MD025 -->

I use this document to show what is supported and what is not by various markdown processes. I've added it here to see what is supported in Hugo and Hinode.

There is a focus in this document on markdown as it is used by Github, which uses GFM (Github Flavored Markdown) and is specified {{< link "https://github.github.com/gfm/" >}}here{{< /link >}}, and Goldmark, which is used by Hugo and is specified {{< link "https://github.com/yuin/goldmark/" >}}here{{< /link >}}. Next to that there are also Hinode's additions that can be used in markdown, based on bootstrap and shortcodes, of which the documentation can be found {{< link "https://demo.gethinode.com/en/blog/bootstrap-elements/" >}}here{{< /link >}}.

## Table of Contents

- [H1](#h1)
  - [H2](#h2)
    - [H3](#h3)
      - [H4](#h4)
        - [H5](#h5)
          - [H6](#h6)
    - [Hinode additional options](#hinode-additional-options)
      - [Heading not in TOC](#heading-not-in-toc)
      - [Larger heading style](#larger-heading-style)
  - [Line breaks](#line-breaks)
  - [Paragraphs](#paragraphs)
    - [Hinode additional options](#hinode-additional-options-1)
      - [Lead](#lead)
  - [Emphasizing text](#emphasizing-text)
    - [Bold](#bold)
    - [Italic](#italic)
    - [strike-through](#strike-through)
    - [underline](#underline)
  - [Superscript and subscript](#superscript-and-subscript)
  - [Lists](#lists)
  - [Code and Highlighting](#code-and-highlighting)
    - [inline code](#inline-code)
    - [Indented code block](#indented-code-block)
    - [Fenced code blocks](#fenced-code-blocks)
    - [Hugo additional options](#hugo-additional-options)
  - [Links](#links)
    - [Hinode extension](#hinode-extension)
  - [Blockquotes](#blockquotes)
    - [Hinode additional options](#hinode-additional-options-2)
  - [Images](#images)
  - [Horizontal rule](#horizontal-rule)
  - [Footnotes](#footnotes)
  - [Tables](#tables)
    - [Hinode additional options](#hinode-additional-options-3)
  - [Formula](#formula)
  - [Inline HTML](#inline-html)
  - [Videos](#videos)
  - [Emojis](#emojis)
  - [Diagrams](#diagrams)
  - [Invisible information](#invisible-information)

## Tabs

The behavior of tabs is not defined, but Hugo, GFM and VSCode all do the following: Tabs are preserved and shown. A tab at the beginning of a line will result in a code block being created and the tab being lost.

## Escaping Markdown characters

If a special Markdown character is to be shown in text as that character and not the processed Markdown, it needs to be prefixed with the escape character '\\'.  
To actually show this single back-slash in the text, the source uses two back-slashes "`\\`" to escape the second back-slash and make it show.

[Top^](#markdown)

## Entity and numeric references

Valid HTML entity references and numeric character references can be used in markdown text to replace corresponding Unicode characters.  
The format of these are: '&' + 'valid HTML entity name' + ';'

```html
&nbsp; &amp; &copy; &AElig; &Dcaron;
&frac34; &HilbertSpace; &DifferentialD;
&ClockwiseContourIntegral; &ngE;
```

&nbsp; &amp; &copy; &AElig; &Dcaron;  
&frac34; &HilbertSpace; &DifferentialD;  
&ClockwiseContourIntegral; &ngE;

Valid HTML numerical references can also be used.  
The format of these are: '&#' + 'string of 1-7 digits' + ';'. When the hexadecimal characters A..F are used, the character 'X' should follow the '#' character.  
Invalid Unicode code points will be replaced by the REPLACEMENT CHARACTER (U+FFFD). For security reasons, the code point U+0000 will also be replaced by U+FFFD.

```html
&#35; &#1234; &#992; &#0; &#X22; &#XD06; &#xcab;
```

&#35; &#1234; &#992; &#0; &#X22; &#XD06; &#xcab;

Note that `&#0'` is replaced by the replacement character &#XFFFD;

[Top^](#markdown)

## Headers

Headers are created by using the # character a number of spaces and an optional text. The number of # characters determine the header level, with a maximum of 6. Spaces between the '#' characters are not allowed. A maximum of 3 spaces are allowed before the first '#' character. A closing sequence of '#' characters is optional, but if there are any other characters in the closing sequence the whole sequence becomes part of the header.

HUGO will automatically create IDs for each header, so that they can be linked to by using: `#header-name`.  
It is also possible to define your own id, attribute and class by using curly braces:  
`## some header {#someid .someclass attribute="somevalue"}`

```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

# H1

## H2

### H3

#### H4

##### H5

###### H6

### Hinode additional options

#### Heading not in TOC

To use the font style of a heading, but not include it in the TOC use the following HTML:

```HTML
<p class="h1">H1</p>
<p class="h2">H2</p>
<p class="h3">H3</p>
<p class="h4">H4</p>
<p class="h5">H5</p>
<p class="h6">H6</p>

```
<!--markdownlint-disable  MD033 -->
<p class="h1">H1</p>
<p class="h2">H2</p>
<p class="h3">H3</p>
<p class="h4">H4</p>
<p class="h5">H5</p>
<p class="h6">H6</p>

#### Larger heading style

To use a slightly larger heading style by using the following HTML:

```HTML
<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>
<h1 class="display-5">Display 5</h1>
<h1 class="display-6">Display 6</h1>
```

<h1 class="display-1">Display 1</h1>
<h1 class="display-2">Display 2</h1>
<h1 class="display-3">Display 3</h1>
<h1 class="display-4">Display 4</h1>
<h1 class="display-5">Display 5</h1>
<h1 class="display-6">Display 6</h1>

[Top^](#markdown)

## Line breaks

Markdown, like HTML, does not process new lines in text. This means that lines are stitched together, separated by a space. So typing this:

```markdown
line 1
line 2
```

will result in:\
line 1
line 2

If a line break is needed, add two spaces at the end of a line, or add the `\` character instead of the two spaces.\
In the next examples the double spaces are indicated by means of two `.` characters, to make it more visual.

```markdown
line 1⋅⋅
line 2\
line 3
```

Will now be:\
line 1  
line 2\
line 3

[Top^](#markdown)

## Paragraphs

A paragraph is created by means of an empty line. So this:

```markdown
line 1

line 2
```

will result in:\
line 1

line 2

In this situation, adding two spaces at the end of line 1, will have no effect.\
Adding an extra empty line, will also have no effect. Two or more empty lines, will results in a single empty line

### Hinode additional options

#### Lead

Make a paragraph stand out by adding the `lead` class in HTML.

```HTML
<p class="lead">
This is a lead paragraph. It stands out from regular paragraphs.
</p>
```

<p class="lead">
This is a lead paragraph. It stands out from regular paragraphs.
</p>

[Top^](#markdown)

## Emphasizing text

Text can be emphasized by making it bold, italic or strike-through.

### Bold

Bold text is accomplished by embedding text in two asterisks or two underscores.

```text
Some **bold text** and some __more bold text__
```

Some **bold text** and some **more bold text**

### Italic

Italics are accomplished by embedding text in asterisk or underscores

```text
Some *italic text* and some more _italic text_
```

Some *italic text* and some more *italic text*

### strike-through

This is an extension, but both GFM and HUGO support it.

Strike-through text is accomplished by embedding text in two tildes

```markdown
Some ~~strike-through text~~
```

Some ~~strike-through text~~

### underline

There is no defined way in markdown to underline text, as a result the html `u` tag would be required.

```html
<u>This is underlined.</u>
```

<u>This is underlined.</u>

[Top^](#markdown)

## Superscript and subscript

Superscript and subscript are supported in HTML only.

```html
This is<sup>superscript</sup>  
This is<sub>subscript</sub>
```

This is<sup>superscript</sup>  
This is<sub>subscript</sub>

## Lists

Lists can be ordered or unordered. An ordered list uses numbers, followed by either a `.` or a `)` character.

```text
1. First ordered item
2. Second ordered item
5. The actual number is irrelevant. It just needs to be a number
```

1. First ordered item
2. Second ordered item
3. The actual number is irrelevant. It just needs to be a number

The list starts with the first number given and will increment that number for the next items in the list, regardless of the actual number used.

An ordered list can also have sub-items.\
In the next examples a space at the end or the beginning of a line is indicated by means of a `⋅` character, to make it more visual.

```text
1. First ordered item
2. Second ordered item
⋅⋅⋅1. And three spaces to create the sub-list
⋅⋅⋅3. Again the actual number does not matter anymore
5. The actual number is irrelevant. It just needs to be a number
```

1. First ordered item
2. Second ordered item, with two spaces
   1. And three spaces to create the sub-list
   2. Again the actual number does not matter anymore
3. The actual number is irrelevant. It just needs to be a number

A list can also be unordered.

```text
* Using a star
- Or using a minus
+ Or using a plus
```

<!-- markdownlint-disable MD004 MD032 -->
* Using a star
- Or using a minus
+ Or using a plus

And can also have a sub-items

```text
* Using a star
- Or using a minus
⋅⋅⋅* Prefix with three spaces and use any of the three allowed unordered list characters
+ Or using a plus
```

* Using a star
- Or using a minus
  * Prefix with three spaces and use any of the three allowed unordered list characters
+ Or using a plus
<!-- markdownlint-enable MD004 MD032 -->

To create a new line in a list and continue with text for that list item. Add two characters at the end of a list item or the '\\' character.

```text
1. First line of this item in the list⋅⋅
   Second line of that first item
2. Second item
```

1. First line of this item in the list  
Second line of that first item
2. Second item

To layout that second line properly in the Markdown file. It can be prefixed by as many spaces as needed, as those spaces are ignored.

Task lists are not supported by all renderers, but GFM, Hugo and VSCode do.  
To render a task list brackets are used, with an optional `x` character between the brackets.

```text
- [x] Option one
- [ ] Option two
  - [x] Option two.one
- [x] Option three
- [ ] Option 4
```

- [x] Option one
- [ ] Option two
  - [x] Option two.one
- [x] Option three
- [ ] Option 4

Hugo also supports definition lists. GFM does not and for VSCode it depends on the used viewer.

```markdown
Someone
: item 1
: item 2

Someone else
: item 3
: item 4
: item 5

And another one
: item 6
```

Someone
: item 1
: item 2

Someone else
: item 3
: item 4
: item 5

And another one
: item 6

[Top^](#markdown)

## Code and Highlighting

Inline code and code blocks are not processed by markdown and are shown as is.

### inline code

Inline code is defined by having back-ticks around it.

```markdown
This `inline code` is part of the sentence.
```

This `inline code` is part of the sentence.

### Indented code block

indented code blocks start with 4 spaces and have a blank line preceding it.
<!-- markdownlint-disable MD046 -->
    This is an indented block

Blank lines following the indented code block are part of the code block, as long as there is another indented line following those blank lines

    We have two blank lines following this line


    This is a next line
<!-- markdownlint-enable MD046 -->
### Fenced code blocks

Fenced code blocks uses three back-ticks:  
\`\`\`  
var s = "Some string";  
alert(s);  
\`\`\`

```text
var s = "Some string";
alert(s);
```

To fenced code blocks, a language can be added to enable syntax highlighting. See the supported languages {{< link "https://highlightjs.org/static/demo/" >}}here{{< /link >}} and for Hugo {{< link "https://gohugo.io/content-management/syntax-highlighting/#list-of-chroma-highlighting-languages" >}}here{{< /link >}}.

Example:  
\`\`\`javascript  
var s = "Some string";  
alert(s);  
\`\`\`

```javascript
var s = "Some string";
alert(s);
```

Fenced code blocks can be indented with up to 3 spaces. In that case the same amount of spaces are also removed from the start of each of the lines inside the fenced code block.

   ```text
  This blockquote is indented with 3 spaces and so is this line.
     This line is indented with 5 spaces. Resulting in 2 spaces.
```

### Hugo additional options

Line numbering can be turned on by using the optional syntax highlighting identifier with `{linenos=true}` and disabled with `{linenos=false}`.

```javascript {linenos=true}
var s = "Some string";

alert(s);
```

The starting line number can also be added by using `{linenostart=5}` in case the line number should start at line 5.  
Next to that specific lines can also be highlighted by using `{hl_Lines=[1, 3]}` or a set of lines, like `{hl_Lines=["2-3"]}`.

```javascript {linenos=true,linenostart=5,hl_Lines=["2-3"]}
var s = "Some string";

alert(s);
```

[Top^](#markdown)

## Links

There are different ways to add a link.

By adding the link with or without a title.

```markdown
This is a [link to DuckDuckGo](https://duckduckgo.com/)
This is a [link to DuckDuckGo](https://duckduckgo.com/ "Homepage of DuckDuckGo") with title
```

This is a [link to DuckDuckGo](https://duckduckgo.com/)\
This is a [link to DuckDuckGo](https://duckduckgo.com/ "Homepage of DuckDuckGo") with title

By using a reference to a link.

```markdown
This is a [reference to a link to DuckDuckGo][some reference]

This requires after this line somewhere in the document the reference with the link:
[some reference]: https://duckduckgo.com/ "Homepage of DuckDuckGo"
```

This is a [reference to a link to DuckDuckGo][some reference]

[some reference]: https://duckduckgo.com/ "Homepage of DuckDuckGo"

This can also be combined if the reference is the text to display by using a direct reference.

```markdown
Here is a [direct reference]

This requires after this, somewhere in the document, the definition of the reference:
[direct reference]: https://duckduckgo.com/
```

Here is a [direct reference](https://duckduckgo.com/)

It is also possible to use an existing chapter (for table of contents for example). This would be the name of a chapter without capitals, with spaces replaced by a minus character, prefixed with the '#' character.

```markdown
This is a [reference to a header in this document](#code-and-highlighting)
```

This is a [reference to a header in this document](#code-and-highlighting)

A link can also be used in a direct way.

```markdown
<https://duckduckgo.com/>
<mailto:me@somewhere.net>
<her@somewhere.net>
```

<https://duckduckgo.com/>  
<mailto:me@somewhere.net>  
<her@somewhere.net>

Both Hugo and GFM support the autolink extension, which allows to do this as well:

```markdown
https://duckduckgo.com/
him@somewhere.net
```

<!-- markdownlint-disable MD034 -->
https://duckduckgo.com/  
him@somewhere.net

[Top^](#markdown)

### Hinode extension

Hinode supports an additional manner of showing a link by using the `link` shortcode.

```go-html-template
{{</* link "https://duckduckgo.com/" */>}}link to DuckDuckGo{{</* /link */>}}
```

{{< link "https://duckduckgo.com/" >}}link to DuckDuckGo{{< /link >}}

It has the advantage that it can be configured to open external links in a new tab and provide an indication that the link leaves this site, as is the case on this site.

## Blockquotes

Blockquotes are used to indent text and use the `>` character. This character can be prefixed with up to 3 spaces.

```text
> It can be used for multiple lines. But if you don't add two spaces at the end of the previous line, they will be concatenated.

> This is the first line with two spaces at the end.  
> And this is the second line, which we can make very long to make sure that it wraps, so it gives us an idea of what happens in that case. In contrast to quotes, a blockquote can contain markdown, like **bold** or *italic text*.
```

<!-- markdownlint-disable MD028 -->
> It can be used for multiple lines. But if you don't add two spaces at the end of the previous line, they will be concatenated.

> This is the first line with two spaces at the end.  
> And this is the second line, which we can make very long to make sure that it wraps, so it gives us an idea of what happens in that case. In contrast to quotes, a blockquote can contain Markdown, like **bold** or *italic text*.
<!-- markdownlint-enable MD028 -->

### Hinode additional options

The following Markdown generates a blockquote, add `{.blockquote}` at the bottom of the block to apply the correct styling.

```HTML
> Some quoted text.
> **Note** that you can use *Markdown syntax* within a blockquote.
{.blockquote}
```

> Some quoted text.  
> **Note** that you can use *Markdown syntax* within a blockquote.
{.blockquote}

[Top^](#markdown)

## Images

Images can be added inline or by reference. By hovering over the logo the alternative text is shown.

Note this will not be parsed the same on all Markdown parsers.  
Inline it looks like this:

```text
Inline stle: ![alt text](https://img.youtube.com/vi/j47I36LZQVc/0.jpg "Video Logo 1")
```

inline style: ![alt text](https://img.youtube.com/vi/j47I36LZQVc/0.jpg "Video Logo 1")

By reference it looks like this:

```text
Reference style: ![alt text][logo]

[logo]: https://img.youtube.com/vi/j47I36LZQVc/0.jpg "Video Logo 2"
```

Reference style: ![alt text][logo]

[logo]: https://img.youtube.com/vi/j47I36LZQVc/0.jpg "Video Logo 2"

[Top^](#markdown)

## Horizontal rule

A horizontal rule is placed when there are at least three asterisks, underscores or minus signs. There can be more, but not less. It is also allowed to have spaces between the characters, at the end of the line and a maximum of 3 spaces at the beginning of the line.

```text
Asterisks 
***  
Underscores
___  
Minus signs

---
```

Asterisks  
<!-- markdownlint-disable MD035 -->
***

Underscores  
___

Minus signs

---
<!-- markdownlint-enable MD035 -->
When using minus signs an empty line is required before the 3 minus signs.

[Top^](#markdown)

## Footnotes

Footnotes aren't supported by all Markdown parsers, but many do.

```text
My first single line footnote[^1].

This will be a footnote with multiple lines[^2].  

It doesn't have to be numbers, words can also be used[^mynote]. However, it will be replaced by a number when rendered.

The footnotes can be placed anywhere in the document, but when rendered, will be placed at the bottom of the page.

[^1]: This is my footnote.  
[^2]: The first line is post-fixed with 2 spaces .  
  The second line is pre-fixed with two spaces.  
[^mynote]:
    A footnote with a name, will still result in a number, but is easier for identification perhaps.  
    A footnote formatted like this needs to be prefixed with 4 characters for every new line.
```

My first single line footnote[^1].

This will be a footnote with multiple lines[^2].

It doesn't have to be numbers, words can also be used[^mynote]. However, it will be replaced by a number when rendered.

The footnotes can be placed anywhere in the document, but when rendered, will be placed at the bottom of the page.

[^1]: This is my footnote.
[^2]: The first line is post-fixed with 2 spaces.
  The second line is pre-fixed with two spaces.
[^mynote]:
    A footnote with a name, will still result in a number, but is easier for identification perhaps.\
    A footnote formatted like this needs to be prefixed with 4 characters for every new line.

[Top^](#markdown)

## Tables

Tables aren't supported by all Markdown parsers, but many do.  
Tables are created by using pipes `|` and dashes `-`.

```text
| Tables   | Are      | Cool     |  
|----------|----------| ---------|  
| column 1 | column 2 | column 3 |  
| Another  | row      | here     |  
```

| Tables   | Are      | Cool     |  
|----------|----------| ---------|  
| column 1 | column 2 | column 3 |  
| Another  | row      | here     |  

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily.  
Also inline Markdown is supported.

```text
Markdown | Less | Pretty  
--- | --- | ---  
*Still* | `renders` | **nicely**  
1 | 2 | 3  
```

Markdown | Less | Pretty  
--- | --- | ---  
*Still* | `renders` | **nicely**  
1 | 2 | 3  

Colons can be used to align the columns.  
A colon at the left followed by a minimum of 3 dashes aligns the column to the left.  
A colon at the right preceded by a minimum of 3 dashes aligns the column to the right.  
A colon at both the left and right with between them at least 3 dashes, centers the column.

```text
| Tables        | Are           | Cool  |  
| ------------- |:-------------:| -----:|  
| col 3 is      | right-aligned | $1600 |  
| col 2 is      | centered      |   $12 |  
```

| Tables        | Are           | Cool  |  
| ------------- |:-------------:| -----:|  
| col 3 is      | right-aligned | $1600 |  
| col 2 is      | centered      |   $12 |

The alignment of the columns in Hugo is achieved by applying a style to the HTML table columns. If however Content-Security-Policy is active, like in Hinode and on this site, the styling is blocked. Resulting in the alignment not working. Hinode provides a solution for that by adding the option to use classes.

### Hinode additional options

Hinode adds enhancements to displaying tables. Add `{.table}` at the bottom of the block to apply the correct styling. You can mix the content with inline Markdown.

```text
| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| *italics* | **bold** | `code` |
{.table}
```

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| *italics* | **bold** | `code` |
{.table}

There are more enhancements in Hinode related to tables, which can be found {{< link "https://gethinode.com/docs/content/tables/" >}}here{{< /link >}}.

[Top^](#markdown)

## Formula

Formulas are not supported by all Markdown parsers. If they are then they use the LaTex markup. {{< link "https://en.wikibooks.org/wiki/LaTeX/Mathematics" >}}This{{< /link >}} is a useful reference. An editor to try it out can be found on {{< link "https://www.codecogs.com/latex/eqneditor.php" >}}CodeCogs{{< /link >}}.  
A formula line is prefixed and postfixed with a single dollar sign (inline formula) or a double dollar sign.

```text
This is an inline $-b \pm \sqrt{b^2 - 4ac} \over 2a$ formula
$$x = a_0 + \frac{1}{a_1 + \frac{1}{a_2 + \frac{1}{a_3 + a_4}}}$$
$$\forall x \in X, \quad \exists y \leq \epsilon$$
```

This is an inline $-b \pm \sqrt{b^2 - 4ac} \over 2a$ formula  
$$x = a_0 + \frac{1}{a_1 + \frac{1}{a_2 + \frac{1}{a_3 + a_4}}}$$  
$$\forall x \in X, \quad \exists y \leq \epsilon$$

On Hinode and this site, the above shows the proper formulas, because the `Katex` module is used.

[Top^](#markdown)

## Inline HTML

it is possible to use raw html in Markdown. For the most part it will work.  
Using Markdown in HTML, usually does not work very well, so it is best to use HTML tags.

For security reasons, this option is disabled by default in HUGO, but enabled in Hinode by default.

```html
<dl>
  <dt>Definition list</dt>
  <dd>A way to create a nice looking list that is easy to do in HTML.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
```

<dl> <dt>Definition list</dt> <dd>A way to create a nice looking list that is easy to do in HTML.</dd>

<dt>Markdown in HTML</dt> <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd> </dl>

Use the HTML element <abbr> for abbreviations and acronyms to show the expanded version on hover. Abbreviations have a default underline and gain a help cursor to provide additional context on hover and to users of assistive technologies.

```HTML
<p><abbr title="HyperText Markup Language">HTML</abbr></p>
```

<p><abbr title="HyperText Markup Language">HTML</abbr></p>

[Top^](#markdown)

## Videos

Videos, like YouTube videos can only be added, using an image with a link in Markdown. It is not possible to define the size in that way.

```text
[![IMAGE ALT TEXT](https://img.youtube.com/vi/j47I36LZQVc/0.jpg)](https://www.youtube.com/watch?v=j47I36LZQVc)
```

[![IMAGE ALT TEXT](https://img.youtube.com/vi/j47I36LZQVc/0.jpg)](https://www.youtube.com/watch?v=j47I36LZQVc)

using HTML, it gives more opportunities (if HTML is supported).

```html
<a href="https://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID
" target="_blank"><img src="https://img.youtube.com/vi/YOUTUBE_VIDEO_ID/0.jpg" 
alt="IMAGE ALT TEXT" width="480" height="360" border="10" /></a>
```

<a href="https://www.youtube.com/watch?feature=player_embedded&v=j47I36LZQVc
" target="_blank"><img src="https://img.youtube.com/vi/j47I36LZQVc/0.jpg"
alt="IMAGE ALT TEXT" width="480" height="360" border="10" /></a>

[Top^](#markdown)

## Emojis

Emojis are supported in HUGO when the following is set in the config file: `enableEmoji = true`

Following that, it is possible to use one of the supported emoji surrounded by colon characters.

```text
:smile : :cry : :wink : 
```

Note that the space before the second colon in each of the texts, should not be used. It is used here, because Hugo renders the emojis in the code block as well.

:smile: :cry: :wink:

See {{< link "https://www.unicode.org/emoji/charts/emoji-list.html" >}}here{{< /link >}} for a list of allowed emojis.

## Diagrams

HUGO supports {{< link "https://github.com/bep/goat" >}}GoAT{{< /link >}} diagrams natively.

```text
      .               .                .               .--- 1          .-- 1     / 1
     / \              |                |           .---+            .-+         +
    /   \         .---+---.         .--+--.        |   '--- 2      |   '-- 2   / \ 2
   +     +        |       |        |       |    ---+            ---+          +
  / \   / \     .-+-.   .-+-.     .+.     .+.      |   .--- 3      |   .-- 3   \ / 3
 /   \ /   \    |   |   |   |    |   |   |   |     '---+            '-+         +
 1   2 3   4    1   2   3   4    1   2   3   4         '--- 4          '-- 4     \ 4
```

To enable this in a code block, the language of te code block needs to be set to `goat`.

```goat
      .               .                .               .--- 1          .-- 1     / 1
     / \              |                |           .---+            .-+         +
    /   \         .---+---.         .--+--.        |   '--- 2      |   '-- 2   / \ 2
   +     +        |       |        |       |    ---+            ---+          +
  / \   / \     .-+-.   .-+-.     .+.     .+.      |   .--- 3      |   .-- 3   \ / 3
 /   \ /   \    |   |   |   |    |   |   |   |     '---+            '-+         +
 1   2 3   4    1   2   3   4    1   2   3   4         '--- 4          '-- 4     \ 4
```

For this the information needs to be in a code block with the language specification being 'goat'.

Note that if Content-Security-Policy is active, the result will generate a number of errors, because Hugo generates font-styles for the numbers, which will be blocked.

In Hugo, Mermaid is not supported by default, but it can be added. Check out [this link](https://gohugo.io/content-management/diagrams/#mermaid-diagrams) for more information.  
Note that when Content-Security-Policy has been enabled, the mermaid javascript file generates a lot of `style-src` blocks. This can only be prevented when `unsafe-inline` is added to the `style-src` and all hashes are removed from the list (as when a hash is present `unsafe-inline` is ignored).  
Because of this Mermaid is not supported on Hinode and this site, as using `unsafe-inline` makes Content-Security-Policy pointless.

Similar to goat, a mermaid diagram is a code block with the language set to 'mermaid'.

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

## Invisible information

When invisible information is needed to be stored in the markdown file, use the HTML comment tag. Irrespective of whether HTML is supported, the information in the comment tag will not be visible. The comment tag starts with `<!--` and ends with `-->`.

```html
<!-- This line will not be rendered -->
```

And outside the fenced block this line should not be visible:  
<!-- This line will not be rendered -->

Note that the start of the comment needs to be on a line of its own and can be prefixed with up to 3 spaces. With more spaces or prefixed with any other character than a space the entire comment block will be shown.
