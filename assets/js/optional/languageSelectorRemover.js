window.onload = function () {
  removeSelectedLanguage()
}

// Function to remove the selected language from localStorage
function removeSelectedLanguage () {
  localStorage.removeItem('selectedLanguage')
}
