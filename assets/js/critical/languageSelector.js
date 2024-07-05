// Function to set the selected language in localStorage
function setLanguage(language) {
  localStorage.setItem("selectedLanguage", language)
}

// Function to get the selected language from localStorage
function getLanguage() {
  return localStorage.getItem("selectedLanguage")
}

// Function to apply the selected language to the website
function applyLanguage(language) {
  if (document.documentElement.lang != language) {
    document.documentElement.lang = language
    window.location.href = window.location.origin + '/' + language + '/'
  }
}

// Event listener for language selection
document.addEventListener("DOMContentLoaded", () => {
  const languageItems = document.querySelectorAll(
    "#language-selector .dropdown-item"
  )

  if (languageItems.length > 0) {
    // Apply the stored language on page load
    const storedLanguage = getLanguage()
    if (storedLanguage) {
      applyLanguage(storedLanguage)
      languageItems.forEach(item => {
        if (
          item.getAttribute("href") === `/${storedLanguage}/` ||
          (storedLanguage === "en" && item.getAttribute("href") === "/")
        ) {
          item.classList.add("active")
        }
        else {
          item.classList.remove("active")
        }
      })
    }

    // Update the language when the user selects a new one
    languageItems.forEach(item => {
      item.addEventListener("click", event => {
        event.preventDefault()
        const selectedLanguage =
          item.getAttribute("href") === "/"
            ? "en"
            : item
              .getAttribute("href")
              ?.replace("/", "")
              .replace("/", "")
        if (selectedLanguage) {
          setLanguage(selectedLanguage)
          applyLanguage(selectedLanguage)
          languageItems.forEach(i => i.classList.remove("active"))
          item.classList.add("active")
        }
      })
    })
  }
})
