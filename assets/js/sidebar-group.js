(function () {
  'use strict'

  var STORAGE_KEY = 'sidebar-secondary-collapsed'

  function init () {
    var nav = document.querySelector('.sidebar-collapsible')
    if (!nav) return
    var btn = nav.querySelector('[data-bs-toggle="collapse"][data-bs-target^="#sidebar-secondary-"]')
    if (!btn) return
    var target = document.querySelector(btn.getAttribute('data-bs-target'))
    if (!target) return

    // Restore persisted state — default is collapsed (stored = true)
    var stored = true
    try {
      var v = localStorage.getItem(STORAGE_KEY)
      if (v !== null) stored = v === '1'
    } catch { /* ignore localStorage errors */ }

    if (!stored) {
      target.classList.add('show')
      btn.setAttribute('aria-expanded', 'true')
    }

    target.addEventListener('show.bs.collapse', function () {
      btn.setAttribute('aria-expanded', 'true')
      try { localStorage.setItem(STORAGE_KEY, '0') } catch { /* ignore localStorage errors */ }
    })
    target.addEventListener('hide.bs.collapse', function () {
      btn.setAttribute('aria-expanded', 'false')
      try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore localStorage errors */ }
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
}())
