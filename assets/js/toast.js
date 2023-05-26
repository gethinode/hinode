function createFragment (htmlStr) {
  const fragment = document.createDocumentFragment()
  const temp = document.createElement('div')
  temp.innerHTML = htmlStr
  while (temp.firstChild) {
    fragment.appendChild(temp.firstChild)
  }
  return fragment
}

const container = '<div id="toast-container" class="toast-container position-fixed bottom-0 end-0 p-3"></div>'
document.body.appendChild(createFragment(container))
const parent = document.getElementById('toast-container')

document.querySelectorAll('[data-toast-target]').forEach(trigger => {
  const target = document.getElementById(trigger.getAttribute('data-toast-target'))
  if (target !== null) {
    parent.appendChild(target)

    // eslint-disable-next-line no-undef
    const toast = bootstrap.Toast.getOrCreateInstance(target)
    if (toast !== null) {
      trigger.addEventListener('click', () => {
        toast.show()
      })
    }
  }
})
