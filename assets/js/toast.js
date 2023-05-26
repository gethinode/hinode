// Script to move all embedded toast messages into a container. The container ensures multiple toast messages are
// stacked properly. The script targets all elements specified by a 'data-toast-target' and ensures the click event
// of the origin is linked as well.

// create a HTML fragment
function createFragment (htmlStr) {
  const fragment = document.createDocumentFragment()
  const temp = document.createElement('div')
  temp.innerHTML = htmlStr
  while (temp.firstChild) {
    fragment.appendChild(temp.firstChild)
  }
  return fragment
}

// insert a toast container in the DOM
const container = '<div id="toast-container" class="toast-container position-fixed bottom-0 end-0 p-3"></div>'
document.body.appendChild(createFragment(container))
const parent = document.getElementById('toast-container')

// process all data-toast-target elements
document.querySelectorAll('[data-toast-target]').forEach(trigger => {
  const target = document.getElementById(trigger.getAttribute('data-toast-target'))
  if (target !== null) {
    // move the element to the toast containr
    parent.appendChild(target)

    // eslint-disable-next-line no-undef
    const toast = bootstrap.Toast.getOrCreateInstance(target)
    if (toast !== null) {
      // associate the click event of the origin with the toast element
      trigger.addEventListener('click', () => {
        toast.show()
      })
    }
  }
})
