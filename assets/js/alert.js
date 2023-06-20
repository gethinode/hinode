const alert = document.getElementById('page-alert')
const closeBtn = document.getElementById('page-alert-btn-close')
if (alert !== null && closeBtn !== null) {
  const version = alert.getAttribute('data-page-alert-version') || 'unknown'
  const hideAlert = sessionStorage.getItem(`page-alert-${version}`) !== null
  if (hideAlert) {
    alert.classList.add('d-none')
  }

  closeBtn.addEventListener('click', () => {
    sessionStorage.setItem(`page-alert-${version}`, 'seen')
    alert.classList.add('d-none')
  })
}
