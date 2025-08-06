document.addEventListener('hide.bs.modal', function (event) {
  // Remove the focus from the active element
  if (document.activeElement) {
    document.activeElement.blur()
  }
})
