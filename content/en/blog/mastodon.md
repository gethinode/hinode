<!-- cSpell:ignore Joost hinode dataprompt urlquery -->
<!-- markdownlint-disable MD003 MD022 MD041 -->
---
author: Joost Mans
title: Adding Mastodon as a sharing provider
date: 2023-07-24
description: An overview of the changes that are made to the Hinode template for sharing posts on Mastodon.
tags: ["blog", "Hinode", "Mastodon"]
thumbnail: img/elephant.jpg
photoCredits: <a href="https://unsplash.com/@bepnamanh" target="_blank">Nam Anh</a>
photoSource: <a href="https://unsplash.com/images/animals/elephant" target="_blank">Unsplash</a>
---
<!-- markdownlint-enable MD022 MD041 -->

At the top of most of the pages there are sharing buttons. Next to the available sharing buttons like Twitter and Facebook, I also wanted to add a sharing button for Mastodon. This is a bit more complicated than with most of the other providers. What makes it more difficult is that for Mastodon the page is to be shared on the actual instance where the user is logged in.  
There is no way of knowing what that instance is, so we will have to ask the user first to what instance the post should be shared.

To accomplish this there are a few changes that are needed to be made to existing partials and there is some javascript code that will take care of the interaction with the user to ask for the Mastodon instance. Also it should be noted that this is a description about how to add it to the Hinode template.

The first step is to add the sharing information for Mastodon in `config/_default/params.toml`.

```toml
[[sharing.providers]]
    name = "Mastodon"
    url = "#"
    icon = "fab mastodon"
    id = "mastodon"
    source = "share?text={title}&url={url}"
    prompt = "mastodon"
    weight = 45
```

Change `weight`, to match the position where the mastodon button is to be placed.

Next is to add the language specific information, which will be used when interacting with the user. Add the following to `i18n/en.yaml`.

```yaml
# Mastodon
- id: mastodon
  translation: "Enter your Mastodon instance where the page should be shared"
```

If you are using multi-language support, or using a different language, change the `translation` in the language file of your choice.

The javascript file which takes care of the user interaction and loading the Mastodon page is named `mastodon.js` and is to be stored in `assets/js`, with the following contents.

```javascript
/* This Javascript code generates a pop-up window that asks for the Mastodon instance
 * to which the page should be shared.
 * In contrast to other social media channels, one can only be logged in on their own instance and 
 * post on that instance.
 * After the information is entered in the pop-up and "OK" is clicked. A new window is opened to the Mastodon
 * instance and will create a post if the user is logged in 
 * it requires the following additional information to be added into params.toml:
 * [[sharing.providers]]
 *  name = "Mastodon"
 *   url = "#"
 *   icon = "fab mastodon"
 *   id = "mastodon"
 *   source = "share?text={title}&url={url}"
 *   prompt = "mastodon"        # This is the id, which will be looked for in the language file to get the text
 *   weight = 50
 */

 // Wait for the page to have loaded, then call this function
 window.onload = function() {

    // Get a reference to the Mastodon button
    var mastodon = document.getElementById("mastodon");
    if (mastodon == null) {
        return false;
    }

    // Set code to run when the button is clicked by assigning a function to "onclick"
    mastodon.onclick = function() {

        // Get the ID again of the Mastodon button
        var id = document.getElementById("mastodon");

        if (id == null)
        {
            // That didn't work
            return false;
        }

        // Get the information to send to the mastodon instance
        var data = id.getAttribute("data-m-src");

        if (data == null){
            // There is no data source, so just exit
            return false;
        }

        // Check if we have a data-prompt, which shows what prompt to show to the user
        var dataprompt = id.getAttribute("data-m-prompt");

        if (dataprompt == null)
        {
            // No prompt, use default
            dataprompt = "Enter your Mastodon domain where to make the post:" 
        }


        // Ask for the Mastodon instance
        domain = prompt(dataprompt, "mastodon.social");

        if (domain == null || domain == ""){
            // It was canceled or empty, so forget it
            return false;
        }
    
        // Create the URL. The resulting link should be something like this:
        //   https://techhub.social/share?text=TheTitleOfThePage&url=URLtoPage
        var url = "https://" + domain + "/" + data;

        // Open a new window for Mastodon
        window.open(url, '_blank');

        return false;
    }
  }
```

The comments in the javascript code should be enough to explain what is happening. What is needed before being able to call this javascript code is to have information in the `data-m-prompt` and `data-m-src` fields of the Mastodon button. These two fields are based on the information in the `source` and `prompt` fields of the Mastodon sharing section that was added to `config/_default/params.toml`. Next to that the button should also have a unique id, which is also in the configuration file.

The buttons are displayed on a page, by means of the code in `layouts/partials/assets/sharing.html`. open that file and go to the following line:

```go-html-template
{{ partial "assets/button.html" (dict "toast" $target "clipboard" $clipboard "href" $url "icon" (printf "%s fa-fw" $item.icon) "class" "btn-social p-0" )}}
```

or, when the modifications as described in the [Hinode Changes](/blog/modifications/#update-sharing-providers) blog have already been done, this line:

```go-html-template
{{ partial "assets/button.html" (dict "toast" $target "clipboard" $clipboard "href" $url "target" $item.target "tooltip" $item.name "icon" (printf "%s fa-fw" $item.icon) "class" "btn-social p-0" )}}
```

Replace that line with the following:

```go-html-template
                {{- $params := (dict "toast" $target 
                                     "clipboard" $clipboard 
                                     "href" $url 
                                     "tooltip" $item.name 
                                     "icon" (printf "%s fa-fw" $item.icon) 
                                     "class" "btn-social p-0") 
                -}}
                {{- with $item.id -}} {{- $params = merge $params (dict "id" $item.id) -}} {{- end -}}                                    
                {{- with $item.target -}} {{- $params = merge $params (dict "target" $item.target) -}} {{- end -}}                                    
                {{- with $item.source -}} 
                    {{- $source := $item.source -}}
                    {{- $source = strings.Replace $source "{url}" $page.Permalink -}}
                    {{- $source = strings.Replace $source "{title}" (urlquery $page.Title) -}}
                    {{- $source = $source | safeURL -}}
                    {{- $params = merge $params (dict "source" $source) -}} 
                {{- end -}}                                    
                {{- with $item.prompt -}} {{- $params = merge $params (dict "prompt" (i18n $item.prompt)) -}} {{- end -}}                                    
                {{ partial "assets/button.html" $params }}
```

This change will include the target and tooltip changes that are described in the [Hinode Changes](/blog/modifications/#update-sharing-providers) blog.

In this code the dictionary that is sent to a button, is split up to allow adding the extra functionality, which is only added when that extra information is defined in `layouts/partials/assets/sharing.html`.`layouts/partials/assets/sharing.html`

The `id` and `target` fields are added as they are, to the dictionary. The `source` field is processed to replace the `{url}` with the actual page link and `{title}` with the title of the page. Finally the `prompt` field is replaced by the actual text in the language file that belongs to the specified language id in the `prompt` field.  
Finally the complete dictionary is sent to the button partial.

As a last step the button partial `layouts/partials/assets/button.html` needs to be modified to be able to process the extra fields in the dictionary.

Replace the complete line that starts with `<a aria-label="{{ $title }}"` to the following:

```go-html--template
<a aria-label="{{ $title }}" {{ if ne $state "disabled" }}{{ with $href }}href="{{ . }}"{{ end }} {{ with .target }}target="{{ . }}"{{ end }}{{ end }}
    {{ with .source }}data-m-src="{{ . }}"{{ end }}
    {{ with .prompt }}data-m-prompt="{{ . }}"{{ end }}
```

This will add all the required information to the link for the Mastodon button, while all the other buttons are not influenced. Note that this change also adds the target and tooltip changes that are described in the [Hinode Changes](/blog/modifications/#update-sharing-providers) blog.
