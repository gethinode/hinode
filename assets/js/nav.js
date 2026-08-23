function updateDropdown (element, id, label) {
  const dropdown = document.getElementById(element)
  if (dropdown != null) {
    dropdown.querySelector('.dropdown-toggle').textContent = label
    dropdown.querySelectorAll('.panel-dropdown .dropdown-item').forEach(item => {
      item.classList.remove('active')
      let target = item.getAttribute('data-link')
      if (target != null) {
        target = target.replace(/^#+/, '')
        if (target === id) {
          item.classList.add('active')
        }
      }
    })
  }
}

document.querySelectorAll('.panel-dropdown').forEach(trigger => {
  trigger.addEventListener('hide.bs.dropdown', event => {
    if (event.clickEvent != null) {
      let target = event.clickEvent.srcElement.getAttribute('data-link')
      if (target != null) {
        trigger.querySelectorAll('.panel-dropdown .dropdown-item').forEach(item => {
          item.classList.remove('active')
        })
        target = target.replace(/^#+/, '')
        const btn = document.getElementById(target)
        if (btn != null) {
          event.clickEvent.srcElement.classList.add('active')
          trigger.querySelector('.dropdown-toggle').textContent = event.clickEvent.srcElement.textContent
          btn.click()
        }
      }
    }
  })
})

// Keeps a companion dropdown in step with the control group it stands for, so the two never
// disagree about which entry is active - which shows up when the viewport crosses the breakpoint
// and the previously hidden control becomes the visible one.
//
// Delegated from the group itself and resolved with `closest`, so the depth of the control inside
// the group does not matter: a nav nests its button in `button > li > ul`, a button group renders
// `button > div`. Both carry `data-companion`, and both reach it the same way.
document.querySelectorAll('[data-companion]').forEach(group => {
  group.addEventListener('click', event => {
    const trigger = event.target.closest('button[id]')
    if (trigger == null || !group.contains(trigger)) {
      return
    }
    updateDropdown(group.getAttribute('data-companion'), trigger.getAttribute('id'), trigger.textContent.trim())
  })
})
