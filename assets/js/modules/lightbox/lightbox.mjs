// Reusable lightbox: clone a trigger's source node into a shared <dialog> and showModal().
// Trigger contract: [data-lightbox-trigger] + one of
//   data-lightbox-source="<css selector>"          (document-wide), or
//   data-lightbox-source-closest="<css selector>"  (via trigger.closest()).

let lastTrigger = null

function dialogEl () {
  return document.querySelector('dialog.lightbox')
}

function resolveSource (trigger) {
  const closest = trigger.getAttribute('data-lightbox-source-closest')
  if (closest) return trigger.closest(closest)
  const sel = trigger.getAttribute('data-lightbox-source')
  if (sel) return document.querySelector(sel)
  return null
}

function open (trigger) {
  const dialog = dialogEl()
  const source = resolveSource(trigger)
  if (!dialog || !source) return
  const mount = dialog.querySelector('.lightbox-content')
  if (!mount) return
  const clone = source.cloneNode(true)
  // Drop nested triggers so the fullscreen button doesn't recurse inside the dialog.
  clone
    .querySelectorAll('[data-lightbox-trigger]')
    .forEach(el => el.remove())
  // Clear observer-init markers so enhancements (e.g. mermaid pan/zoom) re-attach to the clone.
  clone
    .querySelectorAll('[data-panzoom-init]')
    .forEach(el => el.removeAttribute('data-panzoom-init'))
  mount.replaceChildren(clone)
  lastTrigger = trigger
  dialog.showModal()
}

function initDialog (dialog) {
  if (dialog.dataset.lightboxInit) return
  dialog.dataset.lightboxInit = 'true'
  const closeBtn = dialog.querySelector('.lightbox-close')
  if (closeBtn) closeBtn.addEventListener('click', () => dialog.close())
  // A click on the backdrop targets the <dialog> element itself.
  dialog.addEventListener('click', e => {
    if (e.target === dialog) dialog.close()
  })
  dialog.addEventListener('close', () => {
    const mount = dialog.querySelector('.lightbox-content')
    if (mount) mount.replaceChildren()
    if (lastTrigger) {
      lastTrigger.focus()
      lastTrigger = null
    }
  })
}

function initTrigger (trigger) {
  if (trigger.dataset.lightboxInit) return
  trigger.dataset.lightboxInit = 'true'
  trigger.addEventListener('click', () => open(trigger))
}

function initAll () {
  const dialog = dialogEl()
  if (dialog) initDialog(dialog)
  document.querySelectorAll('[data-lightbox-trigger]').forEach(initTrigger)
}

initAll()

new MutationObserver(mutations => {
  mutations.forEach(m => {
    m.addedNodes.forEach(node => {
      if (node.nodeType !== Node.ELEMENT_NODE) return
      if (node.matches && node.matches('dialog.lightbox')) initDialog(node)
      if (node.matches && node.matches('[data-lightbox-trigger]'))
        initTrigger(node)
      if (node.querySelectorAll)
        node.querySelectorAll('[data-lightbox-trigger]').forEach(initTrigger)
    })
  })
}).observe(document.body, { childList: true, subtree: true })
