// Bootstrap toast example: https://getbootstrap.com/docs/5.2/components/toasts/
const toastTrigger = document.getElementById('toastButton')
const toastLiveExample = document.getElementById('toastMessage')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    // eslint-disable-next-line no-undef
    const toast = new bootstrap.Toast(toastLiveExample)
    toast.show()
  })
}
