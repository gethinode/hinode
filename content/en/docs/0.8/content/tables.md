---
title: Tables
description: Enhance out-of-the-box Markdown tables with Bootstrap styling.
date: 2023-01-22
group: content
layout: docs
---

Hugo supports out-of-the box Markdown tables. Hinode enhances the basic tables with optional styling features provided by Bootstrap. The following paragraphs illustrate how to use basic tables, how to accent them, how to adjust the borders, and how to make the table more compact.

## Basic tables

Hugo supports tables out-of-the-box with extended Markdown. Use an optional shortcode as wrapper to align the table cells.

### Default alignment

Hugo supports tables out-of-the-box by using the `|` and `-` characters. Add `{.table}` at the bottom of the block to apply the correct styling. You can mix the content with inline Markdown.

```markdown
| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |
{.table}
```

The result looks like this:

| Italics   | Bold     | Code   |
| --------- | -------- | ------ |
| _italics_ | **bold** | `code` |
{.table}

### Aligned cells and headers

Hugo's Markdown processor applies inline styles to align cells in a table, which is blocked by Hinode's [Content Security Policy]({{< ref "server" >}}). Use the `table` shortcode to wrap your Markdown input instead. You can then align header and cell data to the left, center, or right of a column using the `:` character. Pass additional class attributes between double quotes, e.g. `"table-striped"`. See the [next section](#accented-tables) for more options.

```markdown
{{</* table "table-striped" */>}}
| #  | Item        | Left aligned | Center aligned |   Right aligned|
| -- | ----------- |:-------------|:--------------:| --------------:|
| 1. | First item  | some text    | more text      | even more text |
| 2. | Second item | some text    | more text      | even more text |
| 3. | Third item  | some text    | more text      | even more text |
{{</* /table */>}}
```

The result looks like this:

{{< table "table-striped" >}}
| #  | Item        | Left aligned | Center aligned |   Right aligned|
| -- | ----------- |:-------------|:--------------:| --------------:|
| 1. | First item  | some text    | more text      | even more text |
| 2. | Second item | some text    | more text      | even more text |
| 3. | Third item  | some text    | more text      | even more text |
{{< /table >}}

## Accented tables

Add optional class attributes to style the table using Bootstrap.

### Striped rows

Use `.table-striped` to add zebra-striping to any table row.

```markdown
| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-striped}
```

The result looks like this:

| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-striped}

### Striped columns

Use `.table-striped-columns` to add zebra-striping to any table column.

```markdown
| #  | Item        | Description            |
| -- | ----------- | ---------------------- |
| 1. | First item  | This is the first row  |
| 2. | Second item | This is the second row |
| 3. | Third item  | This is the third row  |
{.table .table-striped-columns}
```

The result looks like this:

| #  | Item        | Description            |
| -- | ----------- | ---------------------- |
| 1. | First item  | This is the first row  |
| 2. | Second item | This is the second row |
| 3. | Third item  | This is the third row  |
{.table .table-striped-columns}

### Hoverable rows 

Add `.table-hover` to enable a hover state on the table rows.

```markdown
| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-hover}
```

The result looks like this:

| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-hover}

### Colored tables

Add `table-<theme>` to apply [theme colors]({{< ref "colors" >}}) to your table. You can mix them with other classes, such as `.table-striped`.

```markdown
| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-success .table-striped}
```

The result looks like this:

| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-success .table-striped}

## Table borders 

Adjust the borders of a table to match your style preferences.

### Bordered tables 

Add `.table-bordered` for borders on all sides of the table and cells. Add an optional `border-<theme>` class to apply [theme colors]({{< ref "colors" >}}) to the table borders.

```markdown
| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-bordered .border-primary}
```

The result looks like this:

| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-bordered .border-primary}

### Tables without borders

Add `.table-borderless` for a table without borders.

```markdown
| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-borderless}
```

The result looks like this:

| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-borderless}

## Small tables

Add `.table-sm` to make any table more compact by cutting all cell padding in half.

```markdown
| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-sm}
```

The result looks like this:

| #  | Item        |
| -- | ----------- |
| 1. | First item  |
| 2. | Second item |
| 3. | Third item  |
{.table .table-sm}
