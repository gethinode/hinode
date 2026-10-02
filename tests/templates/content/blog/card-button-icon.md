---
title: Card Button Icon
---

<!-- no button-icon: the site setting (off by default) applies -->
{{< card title="Absent" href="/blog/toc-override/" button=true button-label="Go" header-style="none" footer-style="none" >}}Body{{< /card >}}

<!-- button-icon=true: the card opts in -->
{{< card title="Enabled" href="/blog/toc-override/" button-icon=true button=true button-label="Go" header-style="none" footer-style="none" >}}Body{{< /card >}}

<!-- cascade: the group's opt-in reaches a card that sets none, and a card
     that sets an explicit false still wins over the group's value -->
{{< card-group button-icon=true >}}
{{< card title="Inherits" href="/blog/toc-override/" button=true button-label="Go" header-style="none" footer-style="none" >}}Body{{< /card >}}
{{< card title="Overrides" href="/blog/toc-override/" button-icon=false button=true button-label="Go" header-style="none" footer-style="none" >}}Body{{< /card >}}
{{< /card-group >}}
