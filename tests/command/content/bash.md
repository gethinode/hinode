---
title: bash
---

{{< command >}}
duckdb -c "SELECT 1 AS a, 2 AS b"
(out)┌───────┬───────┐
(out)│   a   │   b   │
(out)│ int32 │ int32 │
(out)├───────┼───────┤
(out)│     1 │     2 │
(out)└───────┴───────┘
echo "done" # a comment in a command
(out)done
{{< /command >}}
