const alias = document.querySelector("link[rel='canonical']").getAttribute('href')
const params = window.location.search + window.location.hash
window.location = alias + params
