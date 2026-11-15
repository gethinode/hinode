---
title: Nested shortcodes
outputs: ['html', 'markdown']
---
{{< nav tab-type="tabs" >}}
{{< nav-item title="macOS" show="true" >}}
In a terminal:

{{</* command shell="bash" */>}}
brew install example
{{</* /command */>}}
{{< /nav-item >}}
  {{< nav-item title="Steps" >}}

1. **Install**

    {{</* command shell="bash" */>}}
    brew install example
    example --version
    {{</* /command */>}}
{{< /nav-item >}}
{{< /nav >}}

{{< accordion >}}
  {{< accordion-item title="Windows" >}}
  In a shell:

  {{</* command shell="powershell" */>}}
  winget install example
  {{</* /command */>}}
  {{< /accordion-item >}}
{{< /accordion >}}
