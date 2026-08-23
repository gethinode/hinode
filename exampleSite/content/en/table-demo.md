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
