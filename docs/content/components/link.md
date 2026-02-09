---
author: Mark Dumay
title: Link
date: 2024-08-17
description: Use the link shortcode to add a managed link to your page content.
layout: docs
icon: fas link
tags: component
---

## Overview

{{< release version="v0.16.8" >}}

> [!IMPORTANT]
> The `--minify` flag of `hugo` purges HTML whitespace by default. Unfortunately, this also removes the spacing behind the visual cue of external links. Add the following configuration to your main configuration to prevent this:
>
>```toml
>[minify]
>  [minify.tdewolff.html]
>    keepWhitespace = true
>```

Since Hinode `v0.16.8` you can add a managed link to your page content using a configurable shortcode. Managed links refer to an external URL that is centrally maintained in the site's parameters. The shortcode also supports internal links that refer to a regular page or published asset.

### Page link

Use positional arguments to provide a link to a site page. Hinode uses the inner text for the link name when available, else it uses the referenced page title. You can provide either relative or absolute paths.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

- {{</* link "components" /*/>}}
- {{</* link "kbd" >}}Internal link with relative path{{< /link */>}}
- {{</* link "/components/kbd/" >}}Internal link with absolute path{{< /link */>}}
- {{</* link "components/kbd/" >}}Internal link with full path{{< /link */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Anchor link

Provide a `#` character to include an anchor link within a page. The browser will then jump the specified section when clicking on the link. Please note that Hinode does not validate the anchor part itself.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

- {{</* link "#arguments" >}}Local arguments{{< /link */>}}
- {{</* link "image#arguments" >}}Image arguments{{< /link */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### External link

Provide a link that starts with `http` to reference an external page. When you omit the link text, Hinode will display the hostname instead.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

- {{</* link "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements" /*/>}}
- {{</* link "https://developer.mozilla.org" >}}External link{{< /link */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Named link

You can configure so-called named links in your site parameters. The following example defines `hugo_docs`.

```toml
[links]
    hugo_docs = "https://gohugo.io/documentation/"
```

Reference the named link using a positional argument.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* link hugo_docs /*/>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Styled link

Use the `cue` and `tab` arguments to override the default behavior of displaying and opening external links. Omit the link's content to generate a reference to the host (for external links) or the target page's title (for internal links). Lastly, set `case` to false to set the obtained page title to lower case.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

- {{</* link href=hugo_docs cue=false tab=false >}}Named link opening in current tab w/o icon{{< /link */>}}
- {{</* link href=hugo_docs cue=true tab=true >}}Named link opening in new tab with icon{{< /link */>}}
- {{</* link href="components" case=false >}}Internal link with lower case{{< /link */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Arguments

> [!IMPORTANT]
> The link shortcode recognizes language-specific pages, identified by a language prefix. For example, use `/fr/about` to link to the French translation of the `about` page. Do **not** use the alias `/fr/a-propos` in this case.

The shortcode supports a single unnamed parameter, or various named parameters. The unnamed parameter is recognized as a url if it starts with `http`, else it is treated as either a named link or **relative** internal reference (in that order). Any inner text is rendered as the link title, otherwise it uses the host name (for external links), link title (for internal links), or anchor name (for any local references containing a `#`). The shortcode supports the following named arguments:

{{< args structure="link" group="shortcode" >}}
