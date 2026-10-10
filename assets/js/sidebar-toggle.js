// Import Bootstrap directly instead of relying on the window global: the init below runs
// at import time (deferred scripts execute with readyState "interactive"), which is before
// the bundle entry assigns window.bootstrap (esbuild deduplicates the module).
import bootstrap from './modules/bootstrap/bootstrap.bundle.js'

(function () {
  'use strict'

  // A rail group's tooltip would sit on top of the flyout its icon just opened, so it is
  // put away while the flyout is open and allowed back once it has closed. Bound on the
  // group's row, which hosts the tooltip (see setCollapsed), so `currentTarget` is the row.
  function onFlyoutShow (event) {
    var tt = bootstrap.Tooltip.getInstance(event.currentTarget)
    if (tt) {
      tt.hide()
      tt.disable()
    }
  }

  function onFlyoutHidden (event) {
    var tt = bootstrap.Tooltip.getInstance(event.currentTarget)
    if (tt) tt.enable()
  }

  function setCollapsed (nav, collapsed) {
    var storageKey = nav.getAttribute('data-storage-key') || 'sidebar-collapsed'
    nav.classList.toggle('sidebar-collapsed', collapsed)
    var btn = nav.querySelector('.sidebar-toggle-btn')
    if (btn) btn.setAttribute('aria-expanded', String(!collapsed))

    if (typeof bootstrap !== 'undefined') {
      var items = nav.querySelectorAll('[data-sidebar-label]:not([data-sidebar-group-toggle])')
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

    // Rail groups: in the icon-only rail a group's anchor opens its flyout instead of
    // navigating; expanded, it is a plain link again. An open flyout is closed and its
    // instance dropped first, so expanding never leaves a menu floating beside the rail.
    //
    // The group's tooltip is the label plus the hint the template emits as
    // `data-sidebar-hint` - translated there, since a CSP site cannot pass it inline. It
    // sits on the anchor's `.sidebar-group-row`, not on the anchor: Bootstrap keeps one
    // component instance per element and refuses a second, and the anchor is already the
    // Dropdown's toggle - a Tooltip there leaves the Dropdown unregistered, so its flyout
    // never closes on an outside click or on expand. The row still catches the anchor's
    // hover (it covers it) and its focus (Tooltip listens for `focusin`, which bubbles),
    // and the flyout's show/hidden events bubble up to it from the toggle.
    nav.querySelectorAll('[data-sidebar-group-toggle]').forEach(function (el) {
      var hasBootstrap = typeof bootstrap !== 'undefined'
      var row = el.closest('.sidebar-group-row')
      if (collapsed) {
        el.setAttribute('data-bs-toggle', 'dropdown')
        el.setAttribute('aria-expanded', 'false')
        var label = el.getAttribute('data-sidebar-label')
        if (hasBootstrap && row && label && !bootstrap.Tooltip.getInstance(row)) {
          var hint = el.getAttribute('data-sidebar-hint')
          new bootstrap.Tooltip(row, {
            placement: 'right',
            title: hint ? label + ' (' + hint + ')' : label
          })
          row.addEventListener('show.bs.dropdown', onFlyoutShow)
          row.addEventListener('hidden.bs.dropdown', onFlyoutHidden)
        }
      } else {
        if (hasBootstrap) {
          var dropdown = bootstrap.Dropdown.getInstance(el)
          if (dropdown) {
            dropdown.hide()
            dropdown.dispose()
          }
          if (row) {
            var tooltip = bootstrap.Tooltip.getInstance(row)
            if (tooltip) tooltip.dispose()
            row.removeEventListener('show.bs.dropdown', onFlyoutShow)
            row.removeEventListener('hidden.bs.dropdown', onFlyoutHidden)
          }
        }
        el.removeAttribute('data-bs-toggle')
        el.removeAttribute('aria-expanded')
      }
    })

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
