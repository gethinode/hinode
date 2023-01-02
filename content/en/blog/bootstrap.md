---
author: "Mark Dumay"
title: "Bootstrap Components"
date: 2022-12-26
description: "Overview of available Bootstrap components."
tags: ["bootstrap"]
thumbnail: img/boots.jpg
photoCredits: <a href="https://unsplash.com/@nate_dumlao">Nathan Dumlao</a>
photoSource: <a href="https://unsplash.com/photos/QLPWQvHvmII">Unsplash</a>
---

Bootstrap provides several out-of-the-box UI components. The Hinode theme uses several of these components for rendering, such as the navigation menu and scrollspy. A few components are made available as Hugo shortcode, see [Custom Shortcodes]({{< ref "custom-shortcodes" >}} "Custom Shortcodes"). You can embed the Bootstrap components themselves too. The paragraphs below demonstrate the available UI components.

## Accordion

The accordion is available as [custom shortcode]({{< ref "custom-shortcodes#accordion" >}} "custom shortcode"). The following shortcode displays an accordion with three items.

{{< accordion >}}
  {{< accordion-item header="Accordion Item #1" class="show" >}}
    This is the first item's accordion body. It supports HTML content. The item is shown by adding the value <code>show</code> to the <code>class</code> argument.
  {{< /accordion-item >}}
  {{< accordion-item header="Accordion Item #2" >}}
    This is the second item's accordion body. It too supports HTML content.
  {{< /accordion-item >}}
  {{< accordion-item header="Accordion Item #3" >}}
    This is the third item's accordion body.
  {{< /accordion-item >}}
{{< /accordion >}}

## Alerts

The alert is available as [custom shortcode]({{< ref "custom-shortcodes#alert" >}} "custom shortcode"). The following shortcode displays a simple alert.

{{< alert color="danger" >}}
A simple danger alert—check it out!
{{< /alert >}}

## Badge

Badges can be added to headings and buttons. The following two sections illustrate how to use them.

### Headings

Use HTML code to display a badge for a heading. See the Bootstrap [documentation][bs_badge_heading] for more options. The following example displays a badge for a heading of size six.

```html
<h6>Example heading <span class="badge bg-secondary">New</span></h6>
```

The result looks like this.

<h6>Example heading <span class="badge bg-secondary">New</span></h6>

### Buttons

The badge for a button is available via a [custom shortcode]({{< ref "custom-shortcodes#button" >}} "custom shortcode"). The following example displays a light button with a badge.

{{< button color="light" href="#" badge="3" >}}
Button
{{< /button >}}

## Breadcrumb

The breadcrumb is available as [custom shortcode]({{< ref "custom-shortcodes#breadcrumb" >}} "custom shortcode"). The following example displays a breadcrumb for the current page.

{{< breadcrumb >}}

## Buttons

The button is available as [custom shortcode]({{< ref "custom-shortcodes#button" >}} "custom shortcode"). The following example displays a tooltip for a dark button with a badge.

{{< button color="dark" tooltip="Click on the inbox to view your unread messages" href="#" badge="99+" >}}
Inbox
{{< /button >}}

## Button Group

The button group is available as [custom shortcode]({{< ref "custom-shortcodes#button-group" >}} "custom shortcode"). The following example displays a group of three buttons.

{{< button-group aria-label="Basic example" >}}
  {{< button color="primary" href="#" >}}Left{{< /button >}}
  {{< button color="primary" href="#" >}}Middle{{< /button >}}
  {{< button color="primary" href="#" >}}Right{{< /button >}}
{{< /button-group >}}

## Card

The card is available as [custom shortcode]({{< ref "custom-shortcodes#card" >}} "custom shortcode"). The following example displays a card that links to the [Rich Content]({{< ref "rich-content" >}} "Rich Content") page.

{{< card path="rich-content" class="col-sm-12 col-lg-8 mx-auto" layout="rich" >}}

## Carousel

The carousel is available as [custom shortcode]({{< ref "custom-shortcodes#carousel" >}} "custom shortcode"). The following example displays a centered carousel with three slides, 16x9 aspect ratio, and a relative width of 67% on large screens.

{{< carousel ratio="16x9" class="col-sm-12 col-lg-8 mx-auto" >}}
  {{< img src="img/coffee.jpg" caption="slide 1" >}}
  {{< img src="img/phone.jpg" caption="slide 2" >}}
  {{< img src="img/dunes.jpg" caption="slide 3" >}}
{{< /carousel >}}

## Close button

Use HTML code to display a generic close button. See the Bootstrap [documentation][bs_close_button] for more options. The following example displays a button with default styling.

```html
<button type="button" class="btn-close" aria-label="Close"></button>
```

The result looks like this.

<button type="button" class="btn-close" aria-label="Close"></button>

## Collapse

<p>
  <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Link with href
  </a>
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Button with data-bs-target
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
  </div>
</div>

## Dropdowns

### Single button

<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>

### Split button

<!-- Example split danger button -->
<div class="btn-group">
  <button type="button" class="btn btn-danger">Action</button>
  <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><a class="dropdown-item" href="#">Separated link</a></li>
  </ul>
</div>

## List group

<div class="list-group">
  <a href="#" class="list-group-item list-group-item-action active" aria-current="true">
    The current link item
  </a>
  <a href="#" class="list-group-item list-group-item-action">A second link item</a>
  <a href="#" class="list-group-item list-group-item-action">A third link item</a>
  <a href="#" class="list-group-item list-group-item-action">A fourth link item</a>
  <a class="list-group-item list-group-item-action disabled">A disabled link item</a>
</div>

## Modal

<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>

## Navbar

<nav class="navbar navbar-expand-lg bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Navbar</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Link</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li class="nav-item">
          <a class="nav-link disabled">Disabled</a>
        </li>
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

## Navs & tabs

<ul class="nav nav-tabs">
  <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#">Active</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#">Link</a>
  </li>
  <li class="nav-item">
    <a class="nav-link disabled">Disabled</a>
  </li>
</ul>

## Offcanvas

<a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
  Link with href
</a>
<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  Button with data-bs-target
</button>

<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    <div>
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
    </div>
    <div class="dropdown mt-3">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
        Dropdown button
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
    </div>
  </div>
</div>

## Pagination

<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item disabled">
      <a class="page-link">Previous</a>
    </li>
    <li class="page-item"><a class="page-link" href="#">1</a></li>
    <li class="page-item"><a class="page-link" href="#">2</a></li>
    <li class="page-item"><a class="page-link" href="#">3</a></li>
    <li class="page-item">
      <a class="page-link" href="#">Next</a>
    </li>
  </ul>
</nav>

## Placeholders

<div class="card w-50" aria-hidden="true">
  <img src="/img/bd_placeholder_img.svg" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title placeholder-glow">
      <span class="placeholder col-6"></span>
    </h5>
    <p class="card-text placeholder-glow">
      <span class="placeholder col-7"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-4"></span>
      <span class="placeholder col-6"></span>
      <span class="placeholder col-8"></span>
    </p>
    <a href="#" tabindex="-1" class="btn btn-primary disabled placeholder col-6"></a>
  </div>
</div>

## Popovers

<button type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here's some amazing content. It's very engaging. Right?">Click to toggle popover</button>

## Progress

<div class="progress">
  <div class="progress-bar progress-bar-striped progress-bar-animated w-75" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
</div>

## Scrollspy

### Navbar

<nav id="navbar-example2" class="navbar bg-light px-3 mb-3">
  <a class="navbar-brand" href="#">Navbar</a>
  <ul class="nav nav-pills">
    <li class="nav-item">
      <a class="nav-link" href="#scrollspyHeading1">First</a>
    </li>
    <li class="nav-item">
      <a class="nav-link" href="#scrollspyHeading2">Second</a>
    </li>
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">Dropdown</a>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#scrollspyHeading3">Third</a></li>
        <li><a class="dropdown-item" href="#scrollspyHeading4">Fourth</a></li>
        <li><hr class="dropdown-divider"></li>
        <li><a class="dropdown-item" href="#scrollspyHeading5">Fifth</a></li>
      </ul>
    </li>
  </ul>
</nav>
<div data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true" class="scrollspy-example bg-light p-3 rounded-2" tabindex="0">
  <h4 id="scrollspyHeading1">First heading</h4>
  <p>...</p>
  <h4 id="scrollspyHeading2">Second heading</h4>
  <p>...</p>
  <h4 id="scrollspyHeading3">Third heading</h4>
  <p>...</p>
  <h4 id="scrollspyHeading4">Fourth heading</h4>
  <p>...</p>
  <h4 id="scrollspyHeading5">Fifth heading</h4>
  <p>...</p>
</div>

### Nested nav

<div class="row">
  <div class="col-4">
    <nav id="navbar-example3" class="h-100 flex-column align-items-stretch pe-4 border-end">
      <nav class="nav nav-pills flex-column">
        <a class="nav-link" href="#item-1">Item 1</a>
        <nav class="nav nav-pills flex-column">
          <a class="nav-link ms-3 my-1" href="#item-1-1">Item 1-1</a>
          <a class="nav-link ms-3 my-1" href="#item-1-2">Item 1-2</a>
        </nav>
        <a class="nav-link" href="#item-2">Item 2</a>
        <a class="nav-link" href="#item-3">Item 3</a>
        <nav class="nav nav-pills flex-column">
          <a class="nav-link ms-3 my-1" href="#item-3-1">Item 3-1</a>
          <a class="nav-link ms-3 my-1" href="#item-3-2">Item 3-2</a>
        </nav>
      </nav>
    </nav>
  </div>

  <div class="col-8">
    <div data-bs-spy="scroll" data-bs-target="#navbar-example3" data-bs-smooth-scroll="true" class="scrollspy-example-2" tabindex="0">
      <div id="item-1">
        <h4>Item 1</h4>
        <p>...</p>
      </div>
      <div id="item-1-1">
        <h5>Item 1-1</h5>
        <p>...</p>
      </div>
      <div id="item-1-2">
        <h5>Item 1-2</h5>
        <p>...</p>
      </div>
      <div id="item-2">
        <h4>Item 2</h4>
        <p>...</p>
      </div>
      <div id="item-3">
        <h4>Item 3</h4>
        <p>...</p>
      </div>
      <div id="item-3-1">
        <h5>Item 3-1</h5>
        <p>...</p>
      </div>
      <div id="item-3-2">
        <h5>Item 3-2</h5>
        <p>...</p>
      </div>
    </div>
  </div>
</div>

### List group

<div class="row">
  <div class="col-4">
    <div id="list-example" class="list-group">
      <a class="list-group-item list-group-item-action" href="#list-item-1">Item 1</a>
      <a class="list-group-item list-group-item-action" href="#list-item-2">Item 2</a>
      <a class="list-group-item list-group-item-action" href="#list-item-3">Item 3</a>
      <a class="list-group-item list-group-item-action" href="#list-item-4">Item 4</a>
    </div>
  </div>
  <div class="col-8">
    <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" class="scrollspy-example" tabindex="0">
      <h4 id="list-item-1">Item 1</h4>
      <p>...</p>
      <h4 id="list-item-2">Item 2</h4>
      <p>...</p>
      <h4 id="list-item-3">Item 3</h4>
      <p>...</p>
      <h4 id="list-item-4">Item 4</h4>
      <p>...</p>
    </div>
  </div>
</div>

### Simple anchors

<!-- TODO: fix Simple anchors -->

<div class="row">
  <div class="col-4">
    <div id="simple-list-example" class="d-flex flex-column gap-2 simple-list-example-scrollspy text-center">
      <a class="p-1 rounded" href="#simple-list-item-1">Item 1</a>
      <a class="p-1 rounded" href="#simple-list-item-2">Item 2</a>
      <a class="p-1 rounded" href="#simple-list-item-3">Item 3</a>
      <a class="p-1 rounded" href="#simple-list-item-4">Item 4</a>
      <a class="p-1 rounded" href="#simple-list-item-5">Item 5</a>
    </div>
  </div>
  <div class="col-8">
    <div data-bs-spy="scroll" data-bs-target="#simple-list-example" data-bs-offset="0" data-bs-smooth-scroll="true" class="scrollspy-example" tabindex="0">
      <h4 id="simple-list-item-1">Item 1</h4>
      <p>...</p>
      <h4 id="simple-list-item-2">Item 2</h4>
      <p>...</p>
      <h4 id="simple-list-item-3">Item 3</h4>
      <p>...</p>
      <h4 id="simple-list-item-4">Item 4</h4>
      <p>...</p>
      <h4 id="simple-list-item-5">Item 5</h4>
      <p>...</p>
    </div>
  </div>
</div>

## Spinners

The spinner is available as [custom shortcode]({{< ref "custom-shortcodes#spinner" >}} "custom shortcode"). The following example displays a centered spinner:

{{< spinner color="info" class="text-center" >}}
Loading...
{{< /spinner >}}

## Toasts

The toast is available as [custom shortcode]({{< ref "custom-shortcodes#toast" >}} "custom shortcode"). The following example displays a button that triggers a toast message:

{{< button id="toastButton" >}}
Show toast
{{< /button >}}

{{< toast >}}
This is a toast message.
{{< /toast >}}

## Tooltips

The tooltip is available as [custom shortcode]({{< ref "custom-shortcodes#tooltip" >}} "custom shortcode"). The following example displays a tooltip for a colored hyperlink:

{{< tooltip color="warning" title="Tooltip" href="#" >}}
Tooltip demonstration
{{< /tooltip >}}
