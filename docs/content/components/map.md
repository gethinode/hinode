---
author: Mark Dumay
title: Map
date: 2024-01-02
description: Use the map shortcode to show an interactive map.
layout: docs
icon: fa map
tags: component
modules: ["leaflet"]
---

## Overview

{{< release version="v0.16.0" >}}

Use the map shortcode to show an interactive map, powered by [Leaflet](https://leafletjs.com). The shortcode is a wrapper of the Leaflet library that provides basic functionality. As an example, the following shortcode displays an interactive map of the city of Amsterdam.

Add the following configuration to your page's frontmatter to enable Leaflet:

```yml
---
modules: ["leaflet"]
---
```

### Center coordinates

Specify the map center by providing `lat` and `long` values. Add a marker to the map by specifying a `popup` text and `popup-lat` and `popup-long` coordinates. The following example display the city center of Amsterdam and adds a marker for the central train station.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* map lat=52.377 long=4.90 popup="Amsterdam Central Station" popup-lat=52.378062 popup-long=4.900562 */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Zoom level

Set the `zoom` to a value of `1` to display a world map. The map is centered on Europe by default, adjust the `lat` and `long` values to set a different center.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* map zoom=1 */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Identification

Assign a specific identified to the map by setting the `id` argument. The following example displays a map for the city of London with a unique id.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* map id="leaflet-map-london" lat=51.505 long=-0.09 zoom=10 */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Arguments

The shortcode supports the following arguments:

{{< args structure="map" group="shortcode" >}}
