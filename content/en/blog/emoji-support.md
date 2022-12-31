---
author: "Hugo Authors"
title: "Emoji Support"
date: 2021-07-15
description: "Guide to emoji usage in Hugo."
tags: ["emoji"]
# thumbnail: img/dunes.jpg
thumbnail: https://picsum.photos/id/184/4288/2848.jpg
photoCredits: <a href="https://unsplash.com/@timdegroot">Tim de Groot</a>
photoSource: <a href="https://unsplash.com/photos/yNGQ830uFB4">Unsplash</a>
---

Emoji can be enabled in a Hugo project in a number of ways.

<!--more-->

The [`emojify`](https://gohugo.io/functions/emojify/) function can be called directly in templates or [Inline Shortcodes](https://gohugo.io/templates/shortcode-templates/#inline-shortcodes).

To enable emoji globally, set `enableEmoji` to `true` in your site's [configuration](https://gohugo.io/getting-started/configuration/) and then you can type emoji shorthand codes directly in content files; e.g.

<p><span class="nowrap"><span class="emojify">🙈</span> <code>:see_no_evil:</code></span>  <span class="nowrap"><span class="emojify">🙉</span> <code>:hear_no_evil:</code></span>  <span class="nowrap"><span class="emojify">🙊</span> <code>:speak_no_evil:</code></span></p>
<br>

The [Emoji cheat sheet](http://www.emoji-cheat-sheet.com/) is a useful reference for emoji shorthand codes.
