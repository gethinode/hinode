{{- if site.Params.main.enableLanguageSelectionStorage -}}

(() => {
  'use strict'

  const defaultContentLanguage = '{{- site.Language.Lang -}}';
  
  // Function to set the selected language in localStorage
  function setLanguage(language) {
    localStorage.setItem("selectedLanguage", language)
  }

  // Function to get the selected language from localStorage
  function getLanguage() {
    return localStorage.getItem("selectedLanguage")
  }

  // Function to apply the selected language to the website
  function applyLanguage(language, href ) {
    if (document.documentElement.lang != language) {
      document.documentElement.lang = language
      if(window.location.pathname != href) {
        window.location.href = window.location.origin + '/' + language + '/'
      } else {
        window.location.href = window.Location.origin + href
      }
    }
  }

  // Event listener for language selection
  document.addEventListener("DOMContentLoaded", () => {
    const languageItems = document.querySelectorAll(
      "#language-selector .dropdown-item"
    )

    if (languageItems.length > 0) {
      // Apply the stored language on page load
      const storedLanguage = getLanguage()
      if (storedLanguage) {
        languageItems.forEach(item => {
          if (item.getAttribute("hreflang") == storedLanguage) {
            item.classList.add("active")
            applyLanguage(storedLanguage, item.getAttribute("href"))
          }
          else {
            item.classList.remove("active")
          }
        })
      }

      // Update the language when the user selects a new one
      languageItems.forEach(item => {
        item.addEventListener("click", event => {
          event.preventDefault()
          const selectedLanguage =
              item.getAttribute("hreflang") 

          if (selectedLanguage) {
            setLanguage(selectedLanguage)
            window.location.href = window.location.origin + item.getAttribute("href")
            languageItems.forEach(i => i.classList.remove("active"))
            item.classList.add("active")
          }
        })
      })
    }
  })
})()

{{- end -}}
