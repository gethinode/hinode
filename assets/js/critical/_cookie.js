/* eslint-disable no-undef, no-unused-vars */
function hasConsent (category) {
  // TODO: placeholder function
  return true
}

function getLocalStorage (key, def, category) {
  if (hasConsent(category)) {
    return localStorage.getItem(key)
  } else {
    return def
  }
}

function setLocalStorage (key, val, category) {
  if (hasConsent(category)) {
    localStorage.setItem(key, val)
  }
}

function getSessionStorage (key, def, category) {
  if (hasConsent(category)) {
    return sessionStorage.getItem(key)
  } else {
    return def
  }
}

function setSessionStorage (key, val, category) {
  if (hasConsent(category)) {
    sessionStorage.setItem(key, val)
  }
}
