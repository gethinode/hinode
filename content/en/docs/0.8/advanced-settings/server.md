---
title: Server
description: Configure the server headers to refine the content security policy.
date: 2023-01-28
group: advanced-settings
layout: docs
---

<!-- TODO: expand -->

## Server headers

Hinode uses rather strict security policies by default. This ensures the site is [secure by default]({{< param "links.observatory" >}}). However, if you want to include external resources, such as images and videos, you will need to explicity add these sources to the server headers. If omitted, the browser will refuse to load these resources, resulting in broken links or missing elements. The settings of the local development server are defined in `server.toml`. See the below configuration, which captures the external resources currently used by Hinode. Refine these settings as needed. Similar settings are defined in the `netlify.toml` file provided in the repository's root when deploying to [Netlify]({{< param "links.netlify" >}}).

{{< docs name="server-config" file="config/_default/server.toml" >}}
