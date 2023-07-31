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

const shareBtn = document.getElementById('btn-webshare')

if (shareBtn !== null) {
  if (navigator.share) {
    const title = shareBtn.getAttribute('data-sharing-title')
    const description = shareBtn.getAttribute('data-sharing-description')
    const url = shareBtn.getAttribute('data-sharing-url')

    // show button if it supports webShareAPI
    shareBtn.style.display = 'block'
    shareBtn.addEventListener('click', () =>
      webShareAPI(title, description, url)
    )
  } else {
    // hide button if host does not support Web Share API
    shareBtn.style.display = 'none'
  }
}

{{- end -}}