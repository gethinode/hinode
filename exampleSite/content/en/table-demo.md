---
title: Table Demo
modules: ["simple-datatables"]
---

## Plain wrapped table

{{< table wrap="true" class="table-striped fixture-plain" >}}

| Name    | Type   | Description                                                        |
|---------|--------|--------------------------------------------------------------------|
| alpha   | widget | The first record, with a description long enough to need wrapping. |
| bravo   | gadget | The second record, also with a fairly long trailing description.   |
| charlie | widget | The third record. Short.                                           |
| delta   | gadget | The fourth record, whose description runs on for a little while.   |
{{< /table >}}

## Wrapped data table

{{< table wrap="true" sortable="true" searchable="true" paginate="true" pagination="2" class="fixture-data" >}}

| Name    | Type   | Description                                                        |
|---------|--------|--------------------------------------------------------------------|
| alpha   | widget | The first record, with a description long enough to need wrapping. |
| bravo   | gadget | The second record, also with a fairly long trailing description.   |
| charlie | widget | The third record. Short.                                           |
| delta   | gadget | The fourth record, whose description runs on for a little while.   |
{{< /table >}}

## Two-column wrapped table

{{< table wrap="true" class="fixture-two-col" >}}

| Name  | Description                                                        |
|-------|--------------------------------------------------------------------|
| alpha | The first record, with a description long enough to need wrapping. |
| bravo | The second record, also with a fairly long trailing description.   |
{{< /table >}}

## Filter-only table

{{< table filter="widget, gadget" filter-col="1" class="fixture-filter" >}}

| Name    | Type   | Description                                                        |
|---------|--------|--------------------------------------------------------------------|
| alpha   | widget | The first record, with a description long enough to need wrapping. |
| bravo   | gadget | The second record, also with a fairly long trailing description.   |
| charlie | widget | The third record. Short.                                           |
| delta   | gadget | The fourth record, whose description runs on for a little while.   |
{{< /table >}}

## Centered filter controls

{{< table filter="widget, gadget" filter-col="1" justify="center" class="fixture-filter-center" >}}

| Name    | Type   | Description                                                        |
|---------|--------|--------------------------------------------------------------------|
| alpha   | widget | The first record, with a description long enough to need wrapping. |
| bravo   | gadget | The second record, also with a fairly long trailing description.   |
| charlie | widget | The third record. Short.                                           |
| delta   | gadget | The fourth record, whose description runs on for a little while.   |
{{< /table >}}

## Filtered, sortable, wrapped data table

{{< table filter="widget,gadget" filter-col="1" sortable="true" paginate="true" pagination="2" wrap="true" class="fixture-filter-wrap" >}}

| Name    | Type   | Description                                                        |
|---------|--------|--------------------------------------------------------------------|
| alpha   | widget | The first record, with a description long enough to need wrapping. |
| bravo   | gadget | The second record, also with a fairly long trailing description.   |
| charlie | widget | The third record. Short.                                           |
| delta   | gadget | The fourth record, whose description runs on for a little while.   |
{{< /table >}}

## Responsive filter controls

Below the main breakpoint the button group is replaced by a dropdown; at wider
widths the group renders as usual. Enough categories to outgrow a narrow
viewport, which is the case the argument exists for.

{{< table filter="widget,gadget,doohickey,thingamajig,whatsit" filter-col="1" filter-responsive="true" sortable="true" class="fixture-filter-responsive" >}}

| Name    | Type        | Description                                                        |
|---------|-------------|--------------------------------------------------------------------|
| alpha   | widget      | The first record, with a description long enough to need wrapping. |
| bravo   | gadget      | The second record, also with a fairly long trailing description.   |
| charlie | doohickey   | The third record. Short.                                           |
| delta   | thingamajig | The fourth record, whose description runs on for a little while.   |
| echo    | whatsit     | The fifth record, added to give every category a row.              |
{{< /table >}}

## Table with caption

{{< table caption="Overview of records" class="fixture-caption" >}}

| Name  | Type   | Description        |
|-------|--------|--------------------|
| alpha | widget | The first record.  |
| bravo | gadget | The second record. |
{{< /table >}}

## Table with caption on top

{{< table caption="Overview of *records*" caption-top="true" class="fixture-caption-top" >}}

| Name  | Type   | Description        |
|-------|--------|--------------------|
| alpha | widget | The first record.  |
| bravo | gadget | The second record. |
{{< /table >}}

## Wrapped into column groups

Splits each record across three rows below the breakpoint: `#` and Name stay on
the lead row, the four badges fold onto a row of their own, and the description
takes the last. Mirrors a catalog table's shape.

{{< table wrap="true" wrap-cols="2,4,1" sortable="true" paginate="true" pagination="4" class="table-striped fixture-wrap-cols" >}}

| #  | Name    | Category  | Plateau   | Status   | Role   | Description                                                        |
|----|---------|-----------|-----------|----------|--------|--------------------------------------------------------------------|
| 11 | alpha   | Database  | launch    | Shipped  | both   | The first record, with a description long enough to need wrapping. |
| 12 | bravo   | Warehouse | plateau-1 | Planned  | target | The second record, also with a fairly long trailing description.   |
| 13 | charlie | File      | launch    | Shipped  | source | The third record. Short.                                           |
| 14 | delta   | Streaming | plateau-2 | Planned  | source | The fourth record, whose description runs on for a little while.   |
| 15 | echo    | API       | plateau-3 | Planned  | both   | The fifth record, added so the stripe pattern is visible.          |
| 16 | foxtrot | Database  | launch    | Shipped  | target | The sixth record, closing out the sample set.                      |
{{< /table >}}

## Column groups without a data table

The same split on a plain table, which folds server-side with display utilities
rather than in the browser. No sorting, paging or searching, so no data table.

{{< table wrap="true" wrap-cols="2,4,1" class="table-striped fixture-wrap-cols-plain" >}}

| #  | Name    | Category  | Plateau   | Status   | Role   | Description                                                        |
|----|---------|-----------|-----------|----------|--------|--------------------------------------------------------------------|
| 21 | golf    | Database  | launch    | Shipped  | both   | A plain-table record, with a description long enough to wrap.      |
| 22 | hotel   | Warehouse | plateau-1 | Planned  | target | A second plain-table record, also with a trailing description.     |
{{< /table >}}

## Column groups that no longer match

Both tables ask for `2,4` across seven columns — the shape a group list is left
in when a column is added and the list is not updated. The list is refused and
the table falls back to wrapping the last column only, rather than folding on
stale boundaries. The first is a data table, the second a plain one.

{{< table wrap="true" wrap-cols="2,4" sortable="true" class="fixture-wrap-cols-stale" >}}

| #  | Name  | Category | Plateau | Status  | Role | Description                          |
|----|-------|----------|---------|---------|------|--------------------------------------|
| 31 | india | Database | launch  | Shipped | both | A record whose group list is stale.  |
{{< /table >}}

{{< table wrap="true" wrap-cols="2,4" class="fixture-wrap-cols-stale-plain" >}}

| #  | Name   | Category | Plateau | Status  | Role | Description                          |
|----|--------|----------|---------|---------|------|--------------------------------------|
| 32 | juliet | Database | launch  | Shipped | both | A record whose group list is stale.  |
{{< /table >}}
