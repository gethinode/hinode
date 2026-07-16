// Client-side sidebar active-item highlighting. The sidebar HTML is rendered once per
// (section, version, language, variant) and cached, so the server no longer emits per-page
// `active` classes or an expanded collapse trail; this script applies them from the current
// location. It runs in the critical bundle so the highlight lands before first paint.
(function () {
  'use strict'

  function normalize (path) {
    try { path = decodeURI(path) } catch { /* keep the raw path */ }
    if (path.length > 1) path = path.replace(/\/+$/, '')
    return path || '/'
  }

  function findBestMatch (nav, pathname) {
    var best = null
    var bestLength = -1
    var bestExact = false
    nav.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href')
      if (!href || href.charAt(0) === '#') return
      var url
      try { url = new URL(href, window.location.origin) } catch { return }
      if (url.origin !== window.location.origin) return
      var path = normalize(url.pathname)
      if (path === pathname) {
        if (!bestExact) {
          best = link
          bestLength = path.length
          bestExact = true
        }
      } else if (!bestExact && link.getAttribute('data-sidebar-match') === 'prefix') {
        var prefix = path === '/' ? '/' : path + '/'
        if (pathname.indexOf(prefix) === 0 && path.length > bestLength) {
          best = link
          bestLength = path.length
        }
      }
    })
    return { link: best, exact: bestExact }
  }

  function initNav (nav, pathname) {
    var match = findBestMatch(nav, pathname)
    var link = match.link
    if (!link) return

    nav.classList.add('sidebar-no-transition')
    link.classList.add('active')
    link.setAttribute('aria-current', match.exact ? 'page' : 'true')

    // Expand the collapse trail: the matched group's own collapse (when the link is a group
    // title) plus every collapse ancestor within this nav instance.
    var own = null
    var group = link.closest('.sidebar-item-group')
    if (group && group.parentElement) {
      own = group.parentElement.querySelector(':scope > .collapse')
    }
    var trail = own ? [own] : []
    var ancestor = link.closest('.collapse')
    while (ancestor && nav.contains(ancestor)) {
      trail.push(ancestor)
      ancestor = ancestor.parentElement && ancestor.parentElement.closest('.collapse')
    }
    trail.forEach(function (el) {
      el.classList.add('show')
      if (el.id) {
        nav.querySelectorAll('[data-bs-target="#' + el.id + '"]').forEach(function (toggle) {
          toggle.setAttribute('aria-expanded', 'true')
        })
      }
    })
    nav.offsetHeight // force reflow before re-enabling transitions
    nav.classList.remove('sidebar-no-transition')

    // Clicking the current group's title toggles its collapse instead of re-navigating.
    if (own && match.exact) {
      link.addEventListener('click', function (event) {
        if (typeof bootstrap === 'undefined' || !bootstrap.Collapse) return
        event.preventDefault()
        bootstrap.Collapse.getOrCreateInstance(own).toggle()
      })
    }
  }

  function init () {
    var pathname = normalize(window.location.pathname)
    document.querySelectorAll('[data-sidebar-nav]').forEach(function (nav) {
      initNav(nav, pathname)
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
}())
