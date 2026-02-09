---
author: Mark Dumay
title: Mermaid
date: 2025-06-15
description: Use the mermaid shortcode to add diagrams and charts powered by Mermaid.
layout: docs
icon: fas diagram-project
tags: component
modules: ["mermaid"]
---

## Overview

{{< release version="v1.0.0" >}}

Use the `mermaid` shortcode to add diagrams and charts powered by [Mermaid](https://mermaid.js.org). Mermaid is a JavaScript-based diagramming and charting tool that renders Markdown-inspired text definitions to create and modify diagrams dynamically. Instead of using the shortcode syntax, you can also also use a fenced codeblock with the language `mermaid` to achieve the same effect.

Add the following configuration to your page's frontmatter to enable Mermaid:

```yml
---
modules: ["mermaid"]
---
```

### Block Diagram

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
block-beta
  columns 3
  a:3
  block:group1:2
    columns 2
    h i j k
  end
  g
  block:group2:3
    %% columns auto (default)
    l m n o p q r
  end
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### C4 Diagram

<!-- markdownlint-disable MD037 MD046 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
C4Context
    title System Context diagram for Internet Banking System
    Enterprise_Boundary(b0, "BankBoundary0") {
    Person(customerA, "Banking Customer A", "A customer of the bank, with personal bank accounts.")
    Person(customerB, "Banking Customer B")
    Person_Ext(customerC, "Banking Customer C", "desc")

    Person(customerD, "Banking Customer D", "A customer of the bank, <br/> with personal bank accounts.")

    System(SystemAA, "Internet Banking System", "Allows customers to view information about their bank accounts, and make payments.")

    Enterprise_Boundary(b1, "BankBoundary") {

        SystemDb_Ext(SystemE, "Mainframe Banking System", "Stores all of the core banking information about customers, accounts, transactions, etc.")

        System_Boundary(b2, "BankBoundary2") {
        System(SystemA, "Banking System A")
        System(SystemB, "Banking System B", "A system of the bank, with personal bank accounts. next line.")
        }

        System_Ext(SystemC, "E-mail system", "The internal Microsoft Exchange e-mail system.")
        SystemDb(SystemD, "Banking System D Database", "A system of the bank, with personal bank accounts.")

        Boundary(b3, "BankBoundary3", "boundary") {
        SystemQueue(SystemF, "Banking System F Queue", "A system of the bank.")
        SystemQueue_Ext(SystemG, "Banking System G Queue", "A system of the bank, with personal bank accounts.")
        }
    }
    }

    BiRel(customerA, SystemAA, "Uses")
    BiRel(SystemAA, SystemE, "Uses")
    Rel(SystemAA, SystemC, "Sends e-mails", "SMTP")
    Rel(SystemC, customerA, "Sends e-mails to")

    UpdateElementStyle(customerA, $fontColor="red", $bgColor="grey", $borderColor="red")
    UpdateRelStyle(customerA, SystemAA, $textColor="blue", $lineColor="blue", $offsetX="5")
    UpdateRelStyle(SystemAA, SystemE, $textColor="blue", $lineColor="blue", $offsetY="-10")
    UpdateRelStyle(SystemAA, SystemC, $textColor="blue", $lineColor="blue", $offsetY="-40", $offsetX="-50")
    UpdateRelStyle(SystemC, customerA, $textColor="red", $lineColor="red", $offsetX="-50", $offsetY="20")

    UpdateLayoutConfig($c4ShapeInRow="3", $c4BoundaryInRow="1")
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 MD046 -->

### Class Diagram

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
classDiagram
  direction RL
  class Student {
    -idCard : IdCard
  }
  class IdCard{
    -id : int
    -name : string
  }
  class Bike{
    -id : int
    -name : string
  }
  Student "1" --o "1" IdCard : carries
  Student "1" --o "1" Bike : rides
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Entity Relationship Diagram

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        string name
        string custNumber
        string sector
    }
    ORDER ||--|{ LINE-ITEM : contains
    ORDER {
        int orderNumber
        string deliveryAddress
    }
    LINE-ITEM {
        string productCode
        int quantity
        float pricePerUnit
    }
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Flowchart

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
flowchart TD
    A[Start] --> B{Is it?}
    B -->|Yes| C[OK]
    C --> D[Rethink]
    D --> B
    B ---->|No| E[End]
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Gantt Diagram

<!-- markdownlint-disable MD037 MD046 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
gantt
    dateFormat  YYYY-MM-DD
    title       Adding GANTT diagram functionality to mermaid
    excludes    weekends
    %% (`excludes` accepts specific dates in YYYY-MM-DD format, days of the week ("sunday") or "weekends", but not the word "weekdays".)

    section A section
    Completed task            :done,    des1, 2014-01-06,2014-01-08
    Active task               :active,  des2, 2014-01-09, 3d
    Future task               :         des3, after des2, 5d
    Future task2              :         des4, after des3, 5d

    section Critical tasks
    Completed task in the critical line :crit, done, 2014-01-06,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :until isadded
    Functionality added                 :milestone, isadded, 2014-01-25, 0d

    section Documentation
    Describe gantt syntax               :active, a1, after des1, 3d
    Add gantt diagram to demo page      :after a1  , 20h
    Add another diagram to demo page    :doc1, after a1  , 48h

    section Last section
    Describe gantt syntax               :after doc1, 3d
    Add gantt diagram to demo page      :20h
    Add another diagram to demo page    :48h
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 MD046 -->

### Git Graph

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
gitGraph
    commit
    commit id: "Normal" tag: "v1.0.0"
    commit
    commit id: "Reverse" type: REVERSE tag: "RC_1"
    commit
    commit id: "Highlight" type: HIGHLIGHT tag: "8.8.4"
    commit
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Mindmap

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
mindmap
    Root
        A[A]
        :::urgent large
        B(B)
        C
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Pie Chart

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
%%{init: {"pie": {"textPosition": 0.5}, "themeVariables": {"pieOuterStrokeWidth": "5px"}} }%%
pie showData
    title Key elements in Product X
    "Calcium" : 42.96
    "Potassium" : 50.05
    "Magnesium" : 10.01
    "Iron" :  5
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Quadrant Chart

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Requirement Chart

<!-- markdownlint-disable MD037 MD046 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
requirementDiagram

    requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
    }

    functionalRequirement test_req2 {
    id: 1.1
    text: the second test text.
    risk: low
    verifymethod: inspection
    }

    performanceRequirement test_req3 {
    id: 1.2
    text: the third test text.
    risk: medium
    verifymethod: demonstration
    }

    interfaceRequirement test_req4 {
    id: 1.2.1
    text: the fourth test text.
    risk: medium
    verifymethod: analysis
    }

    physicalRequirement test_req5 {
    id: 1.2.2
    text: the fifth test text.
    risk: medium
    verifymethod: analysis
    }

    designConstraint test_req6 {
    id: 1.2.3
    text: the sixth test text.
    risk: medium
    verifymethod: analysis
    }

    element test_entity {
    type: simulation
    }

    element test_entity2 {
    type: word doc
    docRef: reqs/test_entity
    }

    element test_entity3 {
    type: "test suite"
    docRef: github.com/all_the_tests
    }


    test_entity - satisfies -> test_req2
    test_req - traces -> test_req2
    test_req - contains -> test_req3
    test_req3 - contains -> test_req4
    test_req4 - derives -> test_req5
    test_req5 - refines -> test_req6
    test_entity3 - verifies -> test_req5
    test_req <- copies - test_entity2
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 MD046 -->

### Sequence Diagram

<!-- markdownlint-disable MD037 MD046 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
sequenceDiagram
    participant web as Web Browser
    participant blog as Blog Service
    participant account as Account Service
    participant mail as Mail Service
    participant db as Storage

    Note over web,db: The user must be logged in to submit blog posts
    web->>+account: Logs in using credentials
    account->>db: Query stored accounts
    db->>account: Respond with query result

    alt Credentials not found
        account->>web: Invalid credentials
    else Credentials found
        account->>-web: Successfully logged in

        Note over web,db: When the user is authenticated, they can now submit new posts
        web->>+blog: Submit new post
        blog->>db: Store post data

        par Notifications
            blog--)mail: Send mail to blog subscribers
            blog--)db: Store in-site notifications
        and Response
            blog-->>-web: Successfully posted
        end
    end
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 MD046 -->

### State Diagram

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
stateDiagram-v2
    State1: The state with a note
    note right of State1
        Important information! You can write
        notes.
    end note
    State1 --> State2
    note left of State2 : This is the note to the left.
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### Timeline

<!-- markdownlint-disable MD033 MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
timeline
    title England's History Timeline
    section Stone Age
        7600 BC : Britain's oldest known house was built in Orkney, Scotland
        6000 BC : Sea levels rise and Britain becomes an island.<br> The people who live here are hunter-gatherers.
    section Bronze Age
        2300 BC : People arrive from Europe and settle in Britain. <br>They bring farming and metalworking.
                : New styles of pottery and ways of burying the dead appear.
        2200 BC : The last major building works are completed at Stonehenge.<br> People now bury their dead in stone circles.
                : The first metal objects are made in Britain.Some other nice things happen. it is a good time to be alive.
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD033 MD037 -->

### User Journey

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

### XY Chart

<!-- markdownlint-disable MD037 -->
{{< example lang="hugo" >}}

{{</* mermaid */>}}
xychart-beta
    title "Sales Revenue"
    x-axis [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec]
    y-axis "Revenue (in $)" 4000 --> 11000
    bar [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
    line [5000, 6000, 7500, 8200, 9500, 10500, 11000, 10200, 9200, 8500, 7000, 6000]
{{</* /mermaid */>}}

{{< /example >}}
<!-- markdownlint-enable MD037 -->

## Configuration

The [Mermaid module](https://github.com/gethinode/mod-mermaid) supports the following parameters (using `params.modules` in `config.toml` or `hugo.toml`):

<!-- markdownlint-disable MD060 -->
| Setting          | Default   | Description |
|------------------|-----------|-------------|
| `mermaid.elk`    | false     | If set, installs the layout engine for Mermaid based on the ELK layout engine. |
| `mermaid.layout` | `dagre`   | Defines which layout algorithm to use for rendering Mermaid diagrams. The default algorithm is `dagre`. Additional options are available when `mermaid.elk` is enabled, see the table below. |
| `mermaid.look`   | `classic` | Defines the default look for Mermaid diagrams, either `classic` or `handDrawn`. |
<!-- markdownlint-enable MD060 -->

The following table defines the available layout algorithms. The `elk` values require installation of the ELK layout engine (set `mermaid.elk` to `true`).

| Layout             | Description                                     |
|--------------------|-------------------------------------------------|
| `dagre`            | The default Mermaid layout.                     |
| `elk`              | The default ELK layout, which is `elk.layered`. |
| `elk.layered`      | Layered layout.                                 |
| `elk.stress`       | Stress layout.                                  |
| `elk.force`        | Force layout.                                   |
| `elk.mrtree`       | Multi-root tree layout.                         |
| `elk.sporeOverlap` | Spore overlap layout.                           |

## Styling

The `mermaid` shortcode supports dark mode and allows creation of a custom Mermaid theme by overriding and setting the theme variables in the site's Sass files. Checkout the [Mermaid docs](https://mermaid.js.org/config/theming.html) for the custom styling options of Mermaid. All theme variables can be used, but in kebab case and with prefix as shown in the example below. Also Bootstrap theme variables can be referenced.

<!-- markdownlint-disable MD046 -->
```scss
[data-mermaid-theme="light"] {
    // The Mermaid Theme (only 'base' does support custom theming)
    --mermaid-theme: 'base';
    // General Theme Variables
    --mermaid-dark-mode: false;
    --mermaid-background: var(--bs-body-bg);
    --mermaid-font-family: var(--bs-font-sans-serif);
    //...
}

[data-mermaid-theme="dark"] {
    // The Mermaid Theme (only 'base' does support custom theming)
    --mermaid-theme: 'base';
    // General Theme Variables
    --mermaid-dark-mode: true;
    --mermaid-background: var(--bs-body-bg);
    --mermaid-font-family: var(--bs-font-sans-serif);
    //...
}
```
<!-- markdownlint-enable MD046 -->

## Arguments

The shortcode does not support any arguments. Instead, use [Mermaid syntax](https://mermaid.js.org/intro/) to define your diagram or chart.
