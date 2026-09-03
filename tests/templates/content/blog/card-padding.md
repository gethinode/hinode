---
title: Card Padding
---

<!-- padding=0: an explicit zero, the value the argument's own default hides -->
{{< card title="Zero" href="/blog/toc-override/" padding=0 button=true button-label="Go" header-style="none" footer-style="none" >}}Body{{< /card >}}

<!-- padding=5: an explicit non-default, to show the argument is read at all -->
{{< card title="Five" href="/blog/toc-override/" padding=5 button=true button-label="Go" header-style="none" footer-style="none" >}}Body{{< /card >}}

<!-- no padding: the structure default (3) applies -->
{{< card title="Absent" href="/blog/toc-override/" button=true button-label="Go" header-style="none" footer-style="none" >}}Body{{< /card >}}

<!-- cascade: the group's padding reaches a card that sets none, and a card
     that sets an explicit zero still wins over the group's value -->
{{< card-group padding=5 >}}
{{< card title="Inherits" href="/blog/toc-override/" button=true button-label="Go" header-style="none" footer-style="none" >}}Body{{< /card >}}
{{< card title="Overrides" href="/blog/toc-override/" padding=0 button=true button-label="Go" header-style="none" footer-style="none" >}}Body{{< /card >}}
{{< /card-group >}}
