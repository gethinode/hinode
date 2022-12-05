---
author: "Mark Dumay"
slug: "code-markeren"
title: "Code markeren"
date: 2022-04-16
description: "Voorbeelden om de syntax van een taal te markeren."
tags: ["code"]
thumbnail: img/notepad.jpg
photoCredits: <a href="https://unsplash.com/@frederickjmedina">Frederick Medina</a>
# credits: Photo by <a href="https://unsplash.com/@frederickjmedina">Frederick Medina</a> on <a href="https://unsplash.com/photos/PdfRE-xB--s">Unsplash</a>
photoSource: <a href="https://unsplash.com/photos/PdfRE-xB--s">Unsplash</a>
---

## Code Fencing

Gebruik code fencing om de syntax voor een specifieke taal te markeren.

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

Gebruik de `highlight` partial om de lay-out van een taalfragment aan te passen.

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

De `command` shortcode simuleert een terminal voor `bash`, `powershell` of `sql` shell talen.

### Bash (standaard shell)

Gebruik de `command` shortcode om een bash terminal te simuleren.

```html
{{%/* command */%}}
export MY_VAR=123
{{%/* /command */%}}
```

Het resultaat ziet er als volgt uit:
{{% command %}}
export MY_VAR=123
{{% /command %}}

Gebruik `user` en `host` om de gebruikerscontext mee te geven aan de prompt. Maak daarnaast gebruik van `(out)` om output aan te geven, met `\` als markering van een bijbehorende regel.

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

Het resultaat ziet er als volgt uit:
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

Geef `powershell` op als waarde voor het argument `shell` om een PowerShell terminal te simuleren. Je kunt `prompt` aanpassen om een eventule directory aan te geven. Het backtick `` ` `` symbool geeft aan dat het commando doorgaat op de volgende regel.

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

Het resultaat ziet er als volgt uit:
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

Geef `sql` op als waarde voor het argument `shell` om een SQL terminal te simuleren. Gebruik `(con)` als markering van een bijbehorende regel.

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

Het resultaat ziet er als volgt uit:
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
