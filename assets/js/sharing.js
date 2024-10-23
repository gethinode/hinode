{{- if site.Params.sharing.webshare -}}

// Adapted from: https://dev.to/j471n/how-to-share-anything-from-your-website-by-web-share-api-1h5g

// function for Web Share API
function webShareAPI (title, description, link) {
  navigator
    .share({
      title,
      text: description,
      url: link
    })
    .then(() => console.log('Successful share'))
    .catch((error) => console.log('Error sharing', error))
}

const shareButtons = document.querySelectorAll('[data-sharing-url]')
shareButtons.forEach(btn => {
  if (navigator.share) {
    const title = btn.getAttribute('data-sharing-title')
    const description = btn.getAttribute('data-sharing-description')
    const url = btn.getAttribute('data-sharing-url')

    // show button if it supports webShareAPI
    btn.style.display = 'block'
    btn.addEventListener('click', () =>
      webShareAPI(title, description, url)
    )
  } else {
    // hide button if host does not support Web Share API
    btn.style.display = 'none'
  }
})

{{- end -}}