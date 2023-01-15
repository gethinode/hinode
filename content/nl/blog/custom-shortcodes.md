---
author: "Mark Dumay"
title: "Extra shortcodes"
date: 2022-12-05
modified: 2022-12-31
description: "Beschikbare shortcodes die gebruik maken van Bootstrap componenten en vormgeving."
tags: ["bootstrap", "shortcode"]
thumbnail: img/boots.jpg
photoCredits: <a href="https://unsplash.com/@nate_dumlao">Nathan Dumlao</a>
photoSource: <a href="https://unsplash.com/photos/QLPWQvHvmII">Unsplash</a>
---

Bootstrap is een open-source raamwerk voor het ontwikkelen van websites gemaakt door Twitter. Het volgt een aanpak die geschikt is voor meerdere schermformaten, inclusief mobiele apparaten. Bootstrap bevat een uitgebreide collectie van direct bruikbare componenten, zoals navigatiemenu's, paginering, knoppen, en nog veel meer. Om het gebruik hiervan in markdown pagina's te vergemakkelijken, stelt Hinode enkele van deze componenten beschikbaar als Hugo shortcode. De onderstaande paragrafen bieden een overzicht en uitleg van de beschikbare shortcodes.

## Carousel Shortcode

Gebruik de `carousel` shortcode om een carousel van meerdere plaatjes te tonen, analoog aan de [Image Shortcode](#image-shortcode). De shortcode ondersteunt de volgende parameters:

| Parameter | Verplicht | Toelichting |
|-----------|-----------|-------------|
| ratio     | Nee       | Verhouding van het plaatje, de mogelijke waarden zijn "1x1", "4x3" (standaard), "16x9", en "21x9". |
| class     | Nee       | Optionele `class` waarde van het `carousel` element, bijvoorbeeld "w-75". |
{.table}

Voeg een `img` element toe voor elke pagina van de carousel. Het `img` element ondersteunt de volgende parameters:

| Parameter | Verplicht | Toelichting |
|-----------|-----------|-------------|
| src       | Ja        | Verplichte url van het plaatje, bijvoorbeeld "img/boots.jpg" of "https://picsum.photos/id/27/3264/1836". |
| caption   | Nee       | Optionele beschrijving van het plaatje. Het plaatje wordt iets donkerder gemaakt om het contrast te verhogen. Op kleinere schermen wordt de beschrijving weggelaten. |
{.table}

Ter illustratie toont de volgende shortcode een carousel met drie pagina's in een verhouding van 16x9 en een relatieve breedte van 67% voor grote schermen.

```html
{{</* carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" */>}}
  {{</* img src="img/coffee.jpg" caption="slide 1" */>}}
  {{</* img src="img/phone.jpg" caption="slide 2" */>}}
  {{</* img src="img/dunes.jpg" caption="slide 3" */>}}
{{</* /carousel */>}}
```

Het resultaat ziet er als volgt uit:
{{< carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" >}}
  {{< img src="img/coffee.jpg" caption="slide 1" >}}
  {{< img src="img/phone.jpg" caption="slide 2" >}}
  {{< img src="img/dunes.jpg" caption="slide 3" >}}
{{< /carousel >}}

## Command Prompt Shortcode

De `command` shortcode simuleert een terminal voor `bash`, `powershell` of `sql` shell talen. De shortcode ondersteunt de volgende parameters:

| Parameter | Verplicht | Toelichting |
|-----------|----------|-------------|
| user      | Nee | Optionele gebruiker om toe te voegen aan de prompt, bijvoorbeeld "user". |
| host      | Nee | Optionele omgeving om toe te voegen aan de prompt, bijvoorbeeld "localhost". |
| prompt    | Nee | Optionele vervanging van de prompt, bijvoorbeeld "PS C:\Users\User>". |
| shell     | Nee | Type shell, met ondersteuning voor "bash" (standaard), "powershell", of "sql". |
{.table}

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

## Image Shortcode

Gebruik de `image` shortcode om een adaptief plaatje met een specifieke verhouding te tonen. De bron kan verwijzen naar een bestand in de `/assets/img` folder van je website of naar een publieke weblocatie. De shortcode genereert het plaatje als een zogenaamde [image set]({{< param "links.mozilla_image" >}}) om deze te optimaliseren voor meerdere schermformaten en verschillende resoluties. Achter de schermen converteert Hugo de plaatjes naar een `WebP` bestandsformaat en slaat deze op in een lokale folder (`resources` of `public`). De kwaliteit van het plaatje kan worden opgegeven in de sectie `[imaging]` van de site [configuratie]({{< param "links.hugo_imaging" >}}) (75 is de standaardwaarde). De geschikte bestandsformaten zijn `.png`, `.jpeg`, `.gif`, `.tiff`, `.bmp` en `.webp`. Een plaatje in het formaat `.jpeg` is beschikbaar voor oudere browsers. De shortcode ondersteunt de volgende parameters:

| Parameter | Verplicht | Toelichting |
|-----------|----------|-------------|
| src       | Ja  | Verplichte url van het plaatje, bijvoorbeeld "img/boots.jpg" of "https://picsum.photos/id/27/3264/1836". |
| ratio     | Nee | Verhouding van het plaatje, de mogelijke waarden zijn "1x1", "4x3", "16x9", en "21x9". Indien opgegeven wordt het plaatje bijgesneden en verkleind om te voldoen aan de ratio. Als de verhouding niet is opgegeven dan wordt de verhouding van het originele bestand gebruikt. |
| class     | Nee | Optionele `class` waarde van het `img` element, bijvoorbeeld "rounded". |
| title     | Nee | Optionele beschrijving van het plaatje. |
| caption   | Nee | Optioneel onderschrift van het plaatje. |
{.table}

Ter illustratie toont de volgende shortcode een plaatje met afgeronde hoeken en een verhouding van 21x9.

```html
{{</* image src="img/flowers.jpg" ratio="21x9" caption="Onderschrift" class="rounded" */>}}
```

Het resultaat ziet er als volgt uit:
{{< image src="img/flowers.jpg" ratio="21x9" caption="Onderschrift" class="rounded">}}
