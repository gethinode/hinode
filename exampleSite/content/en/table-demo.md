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

## Filtered, sortable, wrapped data table

{{< table filter="widget,gadget" filter-col="1" sortable="true" paginate="true" pagination="2" wrap="true" class="fixture-filter-wrap" >}}

| Name    | Type   | Description                                                        |
|---------|--------|--------------------------------------------------------------------|
| alpha   | widget | The first record, with a description long enough to need wrapping. |
| bravo   | gadget | The second record, also with a fairly long trailing description.   |
| charlie | widget | The third record. Short.                                           |
| delta   | gadget | The fourth record, whose description runs on for a little while.   |
{{< /table >}}
