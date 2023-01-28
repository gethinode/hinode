---
author: Mark Dumay
title: Command Prompt
date: 2023-01-28
description: The command shortcode generates terminal output for either Bash, PowerShell, or SQL shell languages.
group: components
layout: docs
---

## Overview

The `command` shortcode generates terminal output for either `bash`, `powershell`, or `sql` shell languages.

## Arguments

The shortcode supports the following arguments:

| Argument  | Required | Description |
|-----------|----------|-------------|
| user      | No | Optional user to add to the prompt, e.g. "user". |
| host      | No | Optional host to add to the prompt, e.g. "localhost". |
| prompt    | No | Optional prompt override, e.g. "PS C:\Users\User>". |
| shell     | No | Type of shell, either "bash" (default), "powershell", or "sql". |
{.table}

## Examples

### Bash (default shell)

Use the `command` shortcode to generate a block with a default bash command prompt.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* command */>}}
export MY_VAR=123
{{</* /command */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

Specify `user` and `host` to add the user context to the prompt. In addition, use `(out)` to specify an output line and use `\` to denote a line continuation.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* command user="user" host="localhost" */>}}
export MY_VAR=123
echo "hello"
(out)hello
echo one \
two \
three
(out)one two three
echo "goodbye"
(out)goodbye
{{</* /command */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### PowerShell

Set the `shell` argument to `powershell` to generate a PowerShell terminal. Override the `prompt` to add a directory if needed. Use the backtick `` ` `` symbol to denote a line continuation.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* command prompt="PS C:\Users\User>" shell="powershell" */>}}
Write-Host `
'Hello' `
'from' `
'PowerShell!'
(out)Hello from PowerShell!
Write-Host 'Goodbye from PowerShell!'
(out)Goodbye from PowerShell!
{{</* /command */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

### SQL

Set the `shell` argument to `sql` to generate a SQL terminal. Use the `(con)` suffix to denote a line continuation.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* command prompt="mysql>" shell="sql" */>}}
set @my_var = 'foo';
set @my_other_var = 'bar';
CREATE TABLE people ((con)
first_name VARCHAR(30) NOT NULL,(con)
last_name VARCHAR(30) NOT NULL(con)
);
(out)Query OK, 0 rows affected (0.09 sec)
insert into people(con)
values ('John', 'Doe');
(out)Query OK, 1 row affected (0.02 sec)
select *(con)
from people(con)
order by last_name;
(out)+------------+-----------+
(out)| first_name | last_name |
(out)+------------+-----------+
(out)| John       | Doe       |
(out)+------------+-----------+
(out)1 row in set (0.00 sec)
{{</* /command */>}}
{{< /example >}}
<!-- markdownlint-ensable MD037 -->
