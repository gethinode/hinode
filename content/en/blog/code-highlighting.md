---
author: "Mark Dumay"
title: "Code Highlighting"
date: 2022-04-16
description: "Examples on how to enable code highlighting"
tags: ["code"]
thumbnail: img/notepad.jpg
credits: Photo by <a href="https://unsplash.com/@frederickjmedina">Frederick Medina</a> on <a href="https://unsplash.com/photos/PdfRE-xB--s">Unsplash</a>
---

## Code Fencing

Use code fencing to highlight the syntax of a specific language.

```json
{
  "version": "0.2.0",
  "themes": [],
  "projects": [],
  "configuration": {}
}
```

```html
<div class="highlight">
    <pre>
        <code>some code...</code>
    </pre>
</div>
```

## Highlight Partial

Use the `highlight` partial to customize the layout of a specific code block.

{{< highlight go "linenos=table,hl_lines=8 15-17,linenostart=199" >}}
// GetTitleFunc returns a func that can be used to transform a string to
// title case.
//
// The supported styles are
//
// - "Go" (strings.Title)
// - "AP" (see https://www.apstylebook.com/)
// - "Chicago" (see https://www.chicagomanualofstyle.org/home.html)
//
// If an unknown or empty style is provided, AP style is what you get.
func GetTitleFunc(style string) func(s string) string {
  switch strings.ToLower(style) {
  case "go":
    return strings.Title
  case "chicago":
    return transform.NewTitleConverter(transform.ChicagoStyle)
  default:
    return transform.NewTitleConverter(transform.APStyle)
  }
}
{{< / highlight >}}

## Command Prompt Shortcode

The `command` shortcode generates terminal output for either `bash`, `powershell`, or `sql` shell languages.

### Bash (default shell)

Use the `command` shortcode to generate a block with a default bash command prompt.

```html
{{%/* command */%}}
export MY_VAR=123
{{%/* /command */%}}
```

The result looks like this:
{{% command %}}
export MY_VAR=123
{{% /command %}}

Specify `user` and `host` to add the user context to the prompt. In addition, use `(out)` to specify an output line and use `\` to denote a line continuation.

```html
{{%/* command user="user" host="localhost" */%}}
export MY_VAR=123
echo "hello"
(out)hello
echo one \
two \
three
(out)one two three
echo "goodbye"
(out)goodbye
{{%/* /command */%}}
```

The result looks like this:
{{% command user="user" host="localhost" %}}
export MY_VAR=123
echo "hello"
(out)hello
echo one \
two \
three
(out)one two three
echo "goodbye"
(out)goodbye
{{% /command %}}

### PowerShell

Set the `shell` argument to `powershell` to generate a PowerShell terminal. Override the `prompt` to add a directory if needed. Use the backtick `` ` `` symbol to denote a line continuation.

```html
{{%/* command prompt="PS C:\Users\User>" shell="powershell" */%}}
Write-Host `
'Hello' `
'from' `
'PowerShell!'
(out)Hello from PowerShell!
Write-Host 'Goodbye from PowerShell!'
(out)Goodbye from PowerShell!
{{%/* /command */%}}
```

The result looks like this:
{{% command prompt="PS C:\Users\User>" shell="powershell" %}}
Write-Host `
'Hello' `
'from' `
'PowerShell!'
(out)Hello from PowerShell!
Write-Host 'Goodbye from PowerShell!'
(out)Goodbye from PowerShell!
{{% /command %}}

### SQL

Set the `shell` argument to `sql` to generate a SQL terminal. Use the `(con)` suffix to denote a line continuation.

```html
{{%/* command prompt="mysql>" shell="sql" */%}}
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
{{%/* /command */%}}
```

The result looks like this:
{{% command prompt="mysql>" shell="sql" %}}
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
{{% /command %}}
