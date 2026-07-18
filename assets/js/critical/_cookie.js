function hasConsent (_category) {
  // TODO: placeholder function
  return true
}

export function getLocalStorage (key, def, category) {
  if (hasConsent(category)) {
    return localStorage.getItem(key)
  } else {
    return def
  }
}

export function setLocalStorage (key, val, category) {
  if (hasConsent(category)) {
    localStorage.setItem(key, val)
  }
}

export function getSessionStorage (key, def, category) {
  if (hasConsent(category)) {
    return sessionStorage.getItem(key)
  } else {
    return def
  }
}

export function setSessionStorage (key, val, category) {
  if (hasConsent(category)) {
    sessionStorage.setItem(key, val)
  }
}

// Backward compatibility: the storage helpers are part of the documented global surface;
// user-site scripts outside the theme bundles may call them via `window`. Keep these
// assignments even though the theme's own scripts import the helpers as ES modules.
window.getLocalStorage = getLocalStorage
window.setLocalStorage = setLocalStorage
window.getSessionStorage = getSessionStorage
window.setSessionStorage = setSessionStorage
