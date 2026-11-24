---
title: Clipboard fixtures
---

{{< command shell="bash" >}}
echo "$PWD/work/warehouse/jaffle.duckdb" # local database
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

{{< command shell="bash" >}}
cd /tmp
ls -la

(out)total 0
(out)
(out)┌───┐
echo one
echo two
(out)one
(out)two
pwd
{{< /command >}}
