/*
Source:
  - https://raw.githubusercontent.com/h-enk/doks/master/assets/js/index.js
*/

var suggestions = document.getElementById('suggestions');
var search = document.getElementById('search');

if (search !== null) {
  document.addEventListener('keydown', inputFocus);
}

function inputFocus(e) {
  if (e.ctrlKey && e.key === '/' ) {
    e.preventDefault();
    search.focus();
  }
  if (e.key === 'Escape' ) {
    search.blur();
    suggestions.classList.add('d-none');
  }
}

document.addEventListener('click', function(event) {

  var isClickInsideElement = suggestions.contains(event.target);

  if (!isClickInsideElement) {
    suggestions.classList.add('d-none');
  }

});

/*
Source:
  - https://dev.to/shubhamprakash/trap-focus-using-javascript-6a3
*/

document.addEventListener('keydown',suggestionFocus);

function suggestionFocus(e) {
  const suggestionsHidden = suggestions.classList.contains('d-none');
  if (suggestionsHidden) return;

  const focusableSuggestions= [...suggestions.querySelectorAll('a')];
  if (focusableSuggestions.length === 0) return;

  const index = focusableSuggestions.indexOf(document.activeElement);

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const nextIndex = index > 0 ? index - 1 : 0;
    focusableSuggestions[nextIndex].focus();
  }
  else if (e.key === "ArrowDown") {
    e.preventDefault();
    const nextIndex= index + 1 < focusableSuggestions.length ? index + 1 : index;
    focusableSuggestions[nextIndex].focus();
  }

}

/*
Source:
  - https://github.com/nextapps-de/flexsearch#index-documents-field-search
  - https://raw.githack.com/nextapps-de/flexsearch/master/demo/autocomplete.html
*/

(function(){

  var index = new FlexSearch.Document({
    tokenize: "forward",
    cache: 100,
    document: {
      id: "id",
      tag: "tag",
      store: ["href", "title", "description"],
      index: ["title", "description", "content"]
    }
  });

  // https://discourse.gohugo.io/t/range-length-or-last-element/3803/2
  // Note: uses .Site.AllPages as .Site.RegularPages only returns content for the current language
  //       pages without a title (such as browserconfig.xml) are excluded
  {{ $list := where (where .Site.AllPages "Kind" "in" "page") "Title" "!=" "" }}
  {{ $len := (len $list) -}}

  index.add(
    {{ range $index, $element := $list -}}
      {
        id: {{ $index }},
        tag: "{{ .Lang }}",
        href: "{{ .RelPermalink }}",
        title: {{ .Title | jsonify }},
        {{ with .Description -}}
          description: {{ . | jsonify }},
        {{ else -}}
          description: {{ .Summary | plainify | jsonify }},
        {{ end -}}
        content: {{ .Plain | jsonify }}
      })
      {{ if ne (add $index 1) $len -}}
        .add(
      {{ end -}}
    {{ end -}}
  ;

  search.addEventListener('input', show_results, true);

  function show_results(){
    const maxResult = 5;
    var searchQuery = this.value;
    // filter the results for the currently tagged language
    const lang = document.documentElement.lang;
    var results = index.search(searchQuery, { index: ['title', 'description', 'content'], limit: maxResult, tag: lang, enrich: true });

    // flatten results since index.search() returns results for each indexed field
    const flatResults = new Map(); // keyed by href to dedupe results
    for (const result of results.flatMap(r => r.result)) {
      if (flatResults.has(result.doc.href)) continue;
      flatResults.set(result.doc.href, result.doc);
    }

    suggestions.innerHTML = "";
    suggestions.classList.remove('d-none');

    // inform user that no results were found
    if (flatResults.size === 0 && searchQuery) {
      const noResultsMessage = document.createElement('div')
      noResultsMessage.innerHTML = `{{ T "ui_no_results" }} "<strong>${searchQuery}</strong>"`
      noResultsMessage.classList.add("suggestion__no-results");
      suggestions.appendChild(noResultsMessage);
      return;
    }

    // construct a list of suggestions
    for(const [href, doc] of flatResults) {
        const entry = document.createElement('div');
        suggestions.appendChild(entry);

        const a = document.createElement('a');
        a.href = href;
        entry.appendChild(a);

        const title = document.createElement('span');
        title.textContent = doc.title;
        title.classList.add("suggestion__title");
        a.appendChild(title);

        const description = document.createElement('span');
        description.textContent = doc.description;
        description.classList.add("suggestion__description");
        a.appendChild(description);

        suggestions.appendChild(entry);

        if(suggestions.childElementCount == maxResult) break;
    }
  }
}());


/*
Source:
  - https://simplernerd.com/hugo-add-copy-to-clipboard-button/
*/

const svgCopy =
  '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>';
const svgCheck =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>';

const addCopyButtons = (clipboard) => {
    // 1. Look for pre > code elements in the DOM
    document.querySelectorAll("pre > code").forEach((codeBlock) => {
      // 2. Create a button that will trigger a copy operation
      const button = document.createElement("button");
      button.className = "clipboard-button";
      button.type = "button";
      button.innerHTML = svgCopy;
      button.addEventListener("click", () => {
        clipboard.writeText(codeBlock.innerText).then(
          () => {
            button.blur();
            button.innerHTML = svgCheck;
            setTimeout(() => (button.innerHTML = svgCopy), 2000);
          },
          (error) => (button.innerHTML = "Error")
        );
      });
      // 3. Append the button directly before the pre tag
      const pre = codeBlock.parentNode;
      pre.parentNode.insertBefore(button, pre);
    });
  };
  
  if (navigator && navigator.clipboard) {
    addCopyButtons(navigator.clipboard);
  }