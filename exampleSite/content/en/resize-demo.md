---
title: Resize demo
description: Exercises the resizable preview of the example shortcode.
date: 2026-07-14
layout: single
---

A resizable preview with the default 200px floor. Drag the lower-right corner.

<!-- markdownlint-disable MD033 -->
{{< example lang="html" resize="true" >}}
<ul class="nav nav-tabs">
  <li class="nav-item"><a class="nav-link active" href="#">Nav item one</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Nav item two</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Nav item three</a></li>
  <li class="nav-item"><a class="nav-link" href="#">Nav item four</a></li>
</ul>
{{< /example >}}
<!-- markdownlint-enable MD033 -->

A resizable preview floored at the `md` breakpoint (768px).

<!-- markdownlint-disable MD033 -->
{{< example lang="html" resize="true" min-width="md" >}}
<nav aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">Home</a></li>
    <li class="breadcrumb-item"><a href="#">Library</a></li>
    <li class="breadcrumb-item active" aria-current="page">Data</li>
  </ol>
</nav>
{{< /example >}}
<!-- markdownlint-enable MD033 -->
