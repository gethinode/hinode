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

document.querySelectorAll('.nav-panel .nav-link').forEach(trigger => {
  trigger.addEventListener('click', event => {
    const companion = event.srcElement.parentElement.parentElement.getAttribute('data-companion')
    if (companion != null) {
      updateDropdown(companion, trigger.getAttribute('id'), trigger.textContent.trim())
    }
  })
})
