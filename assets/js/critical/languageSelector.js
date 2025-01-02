/* eslint-disable */
{{- if site.Params.main.enableLanguageSelectionStorage -}}
{{- $folder := (urls.Parse site.BaseURL).Path | default "/" -}}

(() => {
  'use strict'

  const folder = '{{ $folder }}'

  // Function to get the selected language from local storage
  function getLanguage () {
    return getLocalStorage('selectedLanguage', document.documentElement.lang, 'functional')
  }

  // Function to set the selected language in local storage
  function setLanguage (language) {
    setLocalStorage('selectedLanguage', language, 'functional')
  }
  
  // Function to apply the selected language to the website
  function applyLanguage (language, href) {
    if (document.documentElement.lang !== language) {
      if (href) {
        if (window.location.pathname !== href) {
          window.location.href = href
        }
      } else {
        let target = folder + language + '/'
        if (window.location.href !== target) {
          window.location.href = target
        }
      }
    }
  }

  // Event listener for language selection
  document.addEventListener('DOMContentLoaded', () => {
    // override stored language when query string contains force is true
    let params = new URLSearchParams(document.location.search)
    let force = params.get('force')
    if (force !== null && force.toLowerCase() == 'true') {
      setLanguage(document.documentElement.lang)
      return
    }

    // continue with regular code
    const storedLanguage = getLanguage()
    const languageItems = document.querySelectorAll('#language-selector[data-translated=true] .dropdown-item')

    const link = document.querySelector("link[rel='canonical']")
    let alias = ''
    if (link !== null) {
      alias = link.getAttribute('href')
    }
    
    if ((alias !== '') && (window.location.href !== alias)) {
      window.location.href = alias
    } else if (languageItems.length > 0) {
      // Redirect if the stored language differs from the active language
      if ((storedLanguage) && (document.documentElement.lang !== storedLanguage)) {
        languageItems.forEach(item => {
          if (item.getAttribute('hreflang') === storedLanguage) {
            applyLanguage(storedLanguage, item.getAttribute('href'))
          }
        })
      }

      // Update the stored language when the user selects a new one
      languageItems.forEach(item => {
        item.addEventListener('click', () => {
          const selectedLanguage = item.getAttribute('hreflang')

          if (selectedLanguage) {
            setLanguage(selectedLanguage)
          }
        })
      })
    }
    else {
      // overrule the current stored language when no translation is available
      setLanguage(document.documentElement.lang)
    }
  })
})()
{{- end -}} 
/* eslint-enable */
