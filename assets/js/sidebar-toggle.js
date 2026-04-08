(function () {
  'use strict'

  function setCollapsed (nav, collapsed) {
    var storageKey = nav.getAttribute('data-storage-key') || 'sidebar-collapsed'
    nav.classList.toggle('sidebar-collapsed', collapsed)
    var btn = nav.querySelector('.sidebar-toggle-btn')
    if (btn) btn.setAttribute('aria-expanded', String(!collapsed))

    if (typeof bootstrap !== 'undefined') {
      var items = nav.querySelectorAll('[data-sidebar-label]')
      if (collapsed) {
        items.forEach(function (el) {
          el.setAttribute('data-bs-toggle', 'tooltip')
          el.setAttribute('data-bs-placement', 'right')
          el.setAttribute('title', el.getAttribute('data-sidebar-label'))
          if (!bootstrap.Tooltip.getInstance(el)) {
            new bootstrap.Tooltip(el)
          }
        })
      } else {
        items.forEach(function (el) {
          var tt = bootstrap.Tooltip.getInstance(el)
          if (tt) tt.dispose()
          el.removeAttribute('data-bs-toggle')
          el.removeAttribute('data-bs-placement')
          el.removeAttribute('title')
        })
      }
    }

    try { localStorage.setItem(storageKey, collapsed ? '1' : '0') } catch { /* ignore localStorage errors */ }

    nav.dispatchEvent(new CustomEvent('hinode:sidebar-toggle', {
      bubbles: true,
      detail: { collapsed: collapsed }
    }))
  }

  function init () {
    var nav = document.querySelector('.sidebar-collapsible')
    if (!nav) return

    var btn = nav.querySelector('.sidebar-toggle-btn')
    if (!btn) return

    var storageKey = nav.getAttribute('data-storage-key') || 'sidebar-collapsed'
    var stored = false
    try { stored = localStorage.getItem(storageKey) === '1' } catch { /* ignore localStorage errors */ }
    nav.classList.add('sidebar-no-transition')
    setCollapsed(nav, stored)
    document.documentElement.classList.remove('sidebar-pre-collapsed')
    nav.offsetHeight // force reflow before re-enabling transitions
    nav.classList.remove('sidebar-no-transition')

    btn.addEventListener('click', function () {
      setCollapsed(nav, !nav.classList.contains('sidebar-collapsed'))
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
}())
