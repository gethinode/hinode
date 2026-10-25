---
title: Carousel Overlay
---

{{< carousel id="overlay-default" >}}
  {{< img src="/img/order.png" >}}
  {{< img src="/img/order.png" caption="Default caption" >}}
{{< /carousel >}}

{{< carousel id="overlay-enabled" overlay=true >}}
  {{< img src="/img/order.png" >}}
{{< /carousel >}}

{{< carousel id="overlay-disabled" overlay=false >}}
  {{< img src="/img/order.png" >}}
  {{< img src="/img/order.png" caption="Unaltered caption" >}}
{{< /carousel >}}

{{< carousel id="overlay-string-disabled" overlay="false" >}}
  {{< img src="/img/order.png" >}}
{{< /carousel >}}
