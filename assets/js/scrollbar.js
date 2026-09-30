// Hinode reserves the scrollbar gutter on the root element (`scrollbar-gutter: stable`), so hiding the scrollbar does
// not change the layout width. Bootstrap's modal and offcanvas are unaware of the reserved gutter: when they hide the
// scrollbar, they still pad the body and full-width fixed elements by the scrollbar width. The result is a double
// compensation that shifts right-aligned content to the left while the overlay is open. Bootstrap applies the
// compensation synchronously after dispatching its `show` event, so the microtask queued here runs after it and before
// the next paint. It restores the inline styles captured at the time of the event. Bootstrap's own reset on hide then
// finds the values it expects.
const selector = 'body, .fixed-top, .fixed-bottom, .is-fixed, .sticky-top'
const properties = ['padding-right', 'margin-right']

function preserveLayout (event) {
  if (event.defaultPrevented) return
  if (!getComputedStyle(document.documentElement).scrollbarGutter.startsWith('stable')) return

  const elements = [...document.querySelectorAll(selector)]
  const initial = elements.map(el => properties.map(prop => el.style.getPropertyValue(prop)))

  queueMicrotask(() => {
    elements.forEach((el, i) => {
      properties.forEach((prop, j) => {
        const value = initial[i][j]
        if (el.style.getPropertyValue(prop) === value) return
        if (value) {
          el.style.setProperty(prop, value)
        } else {
          el.style.removeProperty(prop)
        }
      })
    })
  })
}

document.addEventListener('show.bs.modal', preserveLayout)
document.addEventListener('show.bs.offcanvas', preserveLayout)
