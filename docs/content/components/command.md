---
author: Mark Dumay
title: Command
date: 2023-12-29
description: The command shortcode generates terminal output for either Bash, PowerShell, or SQL shell languages.
layout: docs
icon: fas terminal
tags: component
---

## Overview

{{< release version="v0.5.0" >}}

The `command` shortcode generates terminal output for either `bash`, `powershell`, or `sql` shell languages. The following example generates a block with a default bash command prompt.

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}
{{</* command */>}}
export MY_VAR=123
{{</* /command */>}}
{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Examples

Change the style and language of your command prompt with shortcode arguments.

### Bash

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
<!-- markdownlint-enable MD037 -->

## Styling

The file `assets/scss/components/_command.scss` defines the Hinode-specific styling of the `command` shortcode.

{{< file file="assets/scss/components/_command.scss" show="false" >}}

## Arguments

The shortcode supports the following arguments:

{{< args structure="command" group="shortcode" >}}
