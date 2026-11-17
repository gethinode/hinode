---
title: Clipboard fixtures
---

{{< command shell="bash" >}}
echo "$PWD/work/warehouse/jaffle.duckdb"
(out)/home/<you>/examples/jaffle/work/warehouse/jaffle.duckdb
{{< /command >}}

{{< command shell="powershell" >}}
Get-ChildItem -Path . `
-Filter *.duckdb
{{< /command >}}

{{< command shell="powershell" >}}
Get-ChildItem -Path . `
-Filter *.duckdb
(out)jaffle.duckdb
{{< /command >}}

{{< command shell="bash" >}}
export MY_VAR=123
echo "hello"
{{< /command >}}

```bash
echo "hello"
# hello
```
