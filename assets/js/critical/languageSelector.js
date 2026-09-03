import * as params from '@params'
import { getLocalStorage, setLocalStorage } from './_cookie.js'

// The language selector ships in the critical bundle unconditionally; the site-level
// enablement (main.enableLanguageSelectionStorage) and the base folder (derived from the
// site's baseURL) are evaluated at runtime through build params instead of build-time
// template constructs.
if (params.languageSelector) {
  const folder = params.languageFolder || '/'

  // Function to get the selected language from local storage
  function getLanguage () {
    return getLocalStorage('selectedLanguage', document.documentElement.lang, 'functional')
  }

  // Function to set the selected language in local storage
  function setLanguage (language) {
    setLocalStorage('selectedLanguage', language, 'functional')
  }

  // The query string and hash are payload, not identity: they never take part in
  // deciding whether to redirect, and they ride along when one happens. Dropping
  // them silently discards campaign parameters (utm_*, gclid, fbclid, ...) before
  // an analytics tag can read them, and breaks anchor deep links.
  function keepParams () {
    return window.location.search + window.location.hash
  }

  // Function to apply the selected language to the website
  function applyLanguage (language, href) {
    if (document.documentElement.lang !== language) {
      if (href) {
        if (window.location.pathname !== href) {
          window.location.href = href + keepParams()
        }
      } else {
        const target = folder + language + '/'
        if (window.location.pathname !== target) {
          window.location.href = target + keepParams()
        }
      }
    }
  }

  // Event listener for language selection
  document.addEventListener('DOMContentLoaded', () => {
    // override stored language when query string contains force is true
    const urlParams = new URLSearchParams(document.location.search)
    const force = urlParams.get('force')
    if (force !== null && force.toLowerCase() === 'true') {
      setLanguage(document.documentElement.lang)
      return
    }

    // continue with regular code
    const storedLanguage = getLanguage()
    const languageItems = document.querySelectorAll('#language-selector[data-translated=true] .dropdown-item')

    const link = document.querySelector('link[rel=\'canonical\']')
    let alias = ''
    if (link !== null) {
      alias = link.getAttribute('href')
    }

    // Only the location itself decides whether this page is already canonical;
    // comparing the full href made any query string or hash look like a mismatch
    // and bounced the visitor to the bare canonical URL. Cf. static/js/alias.js,
    // which this script replaces when the language selector is enabled.
    let onCanonical = true
    if (alias !== '') {
      const canonical = new URL(alias, window.location.href)
      onCanonical = canonical.origin === window.location.origin &&
        canonical.pathname === window.location.pathname
    }

    if (!onCanonical) {
      window.location.href = alias + keepParams()
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
    } else {
      // overrule the current stored language when no translation is available
      setLanguage(document.documentElement.lang)
    }
  })
}
