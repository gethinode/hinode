---
author: Mark Dumay
title: Args
date: 2025-06-23
description: Use the args shortcode to generates a table of structured arguments.
layout: docs
icon: fas sliders
tags: component
---

## Overview

{{< release version="v0.22.0" >}}

Use the args shortcode to generate a table of structured arguments. The argument definitions are expected to be defined in a data file identified by a provided structure name.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* args "args" */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Data format

Arguments support the following elements:

{{< args structure="_args" >}}

## Arguments

The shortcode supports both unnamed and named arguments.

{{< args "args" >}}
