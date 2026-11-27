---
title: Card group sizes
build:
  list: never
---

## Empty group

{{< card-group cols="1" wrapper="empty-card-group-demo" >}}
{{< /card-group >}}

## Single card

{{< card-group cols="1" wrapper="single-card-group-demo" header-style="none" footer-style="none" >}}
{{< card title="Alpha" href="/about/" >}}A card with **formatted text**.{{< /card >}}
{{< /card-group >}}

## Single aligned card

{{< card-group cols="1" gutter="3" align-rows=true wrapper="aligned-single-card-group-demo" header-style="none" footer-style="none" >}}
{{< card title="Bravo" href="/about/" subtitle="A *nested* card" >}}A card with **formatted text**.{{< /card >}}
{{< /card-group >}}

## Multiple cards

{{< card-group cols="2" gutter="3" align-rows=true wrapper="multi-card-group-demo" header-style="none" footer-style="none" >}}
{{< card title="Charlie" href="/about/" subtitle="First card" >}}First in the group.{{< /card >}}
{{< card title="Delta" href="/about/" subtitle="Second card" >}}Second in the group.{{< /card >}}
{{< /card-group >}}
