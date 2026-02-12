---
_schema: default
title: Preview
description: >-
  Display live URL previews with switchable device views (desktop, tablet,
  mobile). Shows websites or web applications in an iframe with device-specific
  dimensions and responsive controls.
icon: fas devices
---

## Overview

### Basic preview

The `preview` content block renders a live URL preview in an iframe with device switcher controls. By default, it displays in desktop view.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: preview
  heading:
    title: Hugo on Wikipedia
    content: Live preview of the Hugo static site generator Wikipedia page
  url: "https://en.wikipedia.org/wiki/Hugo_(software)"
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Preview with specific device

Set the `device` argument to specify which device view to display by default. Options are `desktop`, `tablet`, or `mobile`.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: preview
  heading:
    title: Tablet Preview
    content: Opens in tablet view (672×896)
  url: "https://en.wikipedia.org/wiki/Hugo_(software)"
  device: tablet
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Full-width preview

Use `cover: true` and `fluid: true` for a full-width preview layout, ideal for showcasing responsive designs.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: preview
  heading:
    title: Full-Width Preview
    content: Responsive design showcase
  background:
    color: body-tertiary
    subtle: true
  width: 12
  cover: true
  fluid: true
  url: "https://en.wikipedia.org/wiki/Hugo_(software)"
  device: desktop
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

### Embedded map example

The preview component works well with embeddable content like [OpenStreetMap](https://www.openstreetmap.org/). This example demonstrates a full-width preview with custom background styling.

<!-- markdownlint-disable MD037 -->
{{< example-bookshop lang="bookshop" >}}

```yml
- _bookshop_name: preview
  heading:
    title: "Embedded Map"
    content: "OpenStreetMap embed URL - specifically designed for iframes"
  background:
    color: body-tertiary
    subtle: true
  width: 12
  cover: true
  fluid: false
  url: "https://www.openstreetmap.org/export/embed.html?bbox=-0.1,51.5,-0.08,51.52"
  device: desktop
```

{{< /example-bookshop >}}
<!-- markdownlint-enable MD037 -->

## CSP Configuration

The preview component embeds external URLs in iframes, which requires appropriate Content Security Policy (CSP) configuration.

### Production configuration

For production environments, explicitly allow the domains you want to embed in your `config/production/params.toml`:

```toml
[modules.hinode.csp]
    frame-src = [
        "https:",                        # Allow all HTTPS sources
        "example.com",                   # Specific domain
        "*.yourdomain.com",              # Wildcard subdomain
        "*.googletagmanager.com",
        "player.cloudinary.com",
        "www.youtube-nocookie.com",
        "www.youtube.com",
        "player.vimeo.com"
    ]
```

### Development configuration

For local development, allow HTTP sources in your `config/development/params.toml`:

```toml
[modules.hinode.csp]
    frame-src = [
        "http:",                         # Allow all HTTP for localhost
        "https:",
        "*.googletagmanager.com",
        "player.cloudinary.com",
        "www.youtube-nocookie.com",
        "www.youtube.com",
        "player.vimeo.com"
    ]
```

This allows embedding localhost sites during development while maintaining security in production.

### Embedding restrictions

**Important:** Many websites prevent iframe embedding using X-Frame-Options or CSP headers:

- Sites with `X-Frame-Options: DENY` will not load (e.g., Google, Facebook, Twitter)
- Sites with `X-Frame-Options: SAMEORIGIN` only allow same-origin embedding
- Sites with `frame-ancestors` CSP directive control who can embed them

**Best practices:**

- Use the preview component for sites you control or that explicitly allow embedding
- Test URLs in development before deploying
- Provide fallback links when embedding may fail
- Use embeddable alternatives (e.g., youtube-nocookie.com instead of youtube.com)

## Device dimensions

The preview component uses **fixed widths** and **flexible heights**:

- **Desktop**: 1200px width (fixed)
- **Tablet**: 672px width (fixed)
- **Mobile**: 375px width (fixed)

**Heights** adapt to available viewport space:
```
height = calc(100vh - controls - navbar - margins)
min-height = 400px
```

Content within panels scrolls vertically when it exceeds the panel height.

### Responsive visibility

The component automatically shows or hides device previews **based on viewport width only**:

- **Small screens (< 768px)**: Mobile preview only
- **Medium screens (768px-1199px)**: Tablet and mobile previews
- **Large screens (≥ 1200px)**: All three previews

**Height does not affect panel visibility** - panels adjust their height to fit the viewport, and content scrolls if needed.

Buttons for hidden device views are automatically hidden from the control bar, and the active view automatically switches when a panel becomes unavailable.

### Container constraints

Desktop preview (1200px width) works best with:
- `fluid: true` or `width: 12` for full-width layouts
- Container-xxl or larger for proper display

## Security

The preview component includes iframe sandboxing for security:

```html
sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
```

This restricts iframe capabilities while allowing:

- JavaScript execution (`allow-scripts`)
- Access to same-origin resources (`allow-same-origin`)
- Form submissions (`allow-forms`)
- Opening popups/new windows (`allow-popups`)

## Arguments

The content block supports the following arguments:

{{< args bookshop-preview >}}
