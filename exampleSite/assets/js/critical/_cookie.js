/* eslint-disable no-undef, no-unused-vars */

let _manager

function loadScriptSync (src) {
  const s = document.createElement('script')
  s.src = src
  s.type = 'text/javascript'
  s.async = false
  document.getElementsByTagName('head')[0].appendChild(s)
}

function hasConsent (category) {
  if (typeof _manager !== 'undefined' && _manager !== null) {
    return _manager.hasConsent(category)
  } else {
    console.log('no mgr defined: ' + category)
    return false
  }
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
