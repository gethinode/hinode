---
title: Links and cross-references
description: 
date: 2023-01-22
group: content
layout: docs
---

<!-- TODO: expand -->

## Internal links

## Cross-references

## External links

### Basic links

Hugo supports basic Markdown to create links to external websites. To create a link, enclose the link text in brackets (e.g., `[Duck Duck Go]`) and then follow it immediately with the URL in parentheses (e.g., `(https://duckduckgo.com)`).

```markdown
My favorite search engine is [Duck Duck Go](https://duckduckgo.com).
```

The result looks like this:

My favorite search engine is [Duck Duck Go](https://duckduckgo.com).

## URLs and email addresses

To quickly turn a URL or email address into a link, enclose it in angle brackets.

```markdown
<https://www.markdownguide.org>
<fake@example.com>
```

The result looks like this:

<https://www.markdownguide.org>

<fake@example.com>

## Reference-style links

Instead of using parentheses, you can use brackets to link to a predefined address. The following example uses a named reference to link to the website of Font Awesome.

```markdown
[Font Awesome][fontawesome]

[fontawesome]: https://fontawesome.com
```

The result looks like this:

[Font Awesome][fontawesome]

[fontawesome]: https://fontawesome.com

## Managed links

Hinode uses `config/default/params.toml` to manage links to external addresses in a single place. You can use a combination of Markdown and Hugo shortcodes to generate a managed link. The following snippet of `config/default/params.toml` defines the link address for `fontawesome`:

```toml
[links]
    fontawesome = "https://fontawesome.com"
```

You can then use the following statement to generate the link.

```markdown
[Font Awesome]({{</* param "links.fontawesome" */>}})
```

The result looks like this:

[Font Awesome]({{< param "links.fontawesome" >}})
