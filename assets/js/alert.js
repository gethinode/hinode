/* eslint-disable no-undef */
const alert = document.getElementById('page-alert')
const closeBtn = document.getElementById('page-alert-btn-close')
if (alert !== null && closeBtn !== null) {
  const version = alert.getAttribute('data-page-alert-version') || 'unknown'
  const hideAlert = getSessionStorage(`page-alert-${version}`, null, 'functional') !== null
  if (hideAlert) {
    alert.classList.add('d-none')
  }

  closeBtn.addEventListener('click', () => {
    setSessionStorage(`page-alert-${version}`, 'seen', 'functional')
    alert.classList.add('d-none')
  })
}
