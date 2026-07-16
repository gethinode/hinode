// Swap the `no-js` marker class on the root element for `js` as early as possible, so
// stylesheets can key no-JS fallbacks (such as the sidebar collapse trail) off `no-js`.
(function () {
  var el = document.documentElement
  el.classList.remove('no-js')
  el.classList.add('js')
}())
