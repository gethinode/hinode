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
        window.location.href = folder + language + '/'
      }
    }
  }

  // Event listener for language selection
  document.addEventListener('DOMContentLoaded', () => {
    const storedLanguage = getLanguage()
    const languageItems = document.querySelectorAll('#language-selector .dropdown-item')

    if (languageItems.length > 0) {
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
      // Redirect to the localized homepage
      const defaultLang = '{{ site.LanguageCode | default site.Language.Lang }}'
      let language = storedLanguage ? storedLanguage : defaultLang
      window.location.href = folder + language + '/'
    }
  })
})()
{{- end -}} 
/* eslint-enable */
