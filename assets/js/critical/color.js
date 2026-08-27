/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

import * as params from '@params'
import { getLocalStorage, setLocalStorage } from './_cookie.js'

// The color-mode toggler ships in the critical bundle unconditionally; the site-level
// enablement (main.enableDarkMode / main.colorMode.enabled) is evaluated at runtime
// through build params instead of a build-time template conditional.
if (params.darkMode) {
  const supportedThemes = ['auto', 'dark', 'light']

  // retrieves the theme preferred by the client, defaults to light
  function getPreferredTheme () {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  // retrieves the current theme, either from local storage or client's preferences
  function getTheme () {
    // Read on every call rather than once when the script runs. Storage is shared
    // across the origin, so a theme chosen in another document leaves a value read
    // at load time stale — and a document served from the back/forward cache runs
    // no script again, so a stale capture is all it would ever have to work from.
    const storedTheme = getLocalStorage('theme', 'auto', 'functional')
    if (storedTheme) {
      return storedTheme
    } else {
      const preference = getPreferredTheme()
      setLocalStorage('theme', preference, 'functional')
      return preference
    }
  }

  // applies and stores requested theme
  function setTheme (theme) {
    if (!supportedThemes.includes(theme)) {
      theme = 'auto'
    }
    setLocalStorage('theme', theme, 'functional')

    if (theme === 'auto') {
      theme = getPreferredTheme()
    }
    document.documentElement.setAttribute('data-bs-theme', theme)
    // store main theme separately, to avoid the navbar mode icon uses a local variable
    document.documentElement.setAttribute('data-bs-main-theme', theme)

    updateSelectors()
  }

  // alternates the currently active theme
  function toggleTheme () {
    const target = document.documentElement.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark'
    setTheme(target)
  }

  function updateSelectors () {
    const light = document.documentElement.getAttribute('data-bs-theme') === 'light'
    document.querySelectorAll('.navbar-mode-selector').forEach(chk => {
      chk.checked = light
      // Mirrored onto the attribute as well: `checked` held only as a property is
      // invisible to innerHTML serialization, so anything that snapshots the page
      // and restores it later reinstates the switch in whatever position the raw
      // markup declares, irrespective of the theme actually in effect.
      chk.toggleAttribute('checked', light)
    })
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    // Only an unset or 'auto' preference follows the system. The condition here
    // used to test the stored value against 'light' and 'dark' with ||, which no
    // single value can fail on both sides, so it was always true: switching the
    // system appearance overrode an explicit choice and overwrote it in storage.
    const stored = getLocalStorage('theme', 'auto', 'functional')
    if (!stored || stored === 'auto') {
      setTheme(getPreferredTheme())
    }
  })

  // Delegated to the document rather than bound to each selector, because the
  // document survives what the selectors do not. Any wholesale replacement of the
  // page's contents — a client-side router restoring a cached body, for instance —
  // substitutes fresh inputs carrying no listeners, and this script cannot rebind
  // them: it ships in the critical bundle, a <head> script, so it is absent from
  // the replaced markup and never runs a second time. A listener bound per element
  // on DOMContentLoaded therefore dies with the elements it was bound to, leaving a
  // toggle that looks intact and does nothing until the page is reloaded.
  document.addEventListener('change', event => {
    const selector = event.target.closest?.('.navbar-mode-selector')
    if (!selector) return
    document.documentElement.setAttribute('data-bs-theme-animate', 'true')
    toggleTheme()
  })

  window.addEventListener('load', () => {
    // update the selectors when all elements are ready
    updateSelectors()
  })

  // A page served from the back/forward cache is shown again without re-parsing:
  // no script re-runs and neither DOMContentLoaded nor load fires, so the theme
  // applied when it was cached is still on the document however long it sat there.
  // This is the only notification that it is back on screen, and therefore the only
  // chance to pick up a theme chosen elsewhere in the meantime.
  window.addEventListener('pageshow', event => {
    if (event.persisted) {
      setTheme(getTheme())
    }
  })

  // initialize theme as soon as possible to reduce screen flickering
  setTheme(getTheme())
}
