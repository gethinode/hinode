function adjustCarouselHeight () {
  let max = 0
  document.querySelectorAll('.testimonials .carousel-item').forEach(container => {
    const clone = container.cloneNode(true)
    clone.style.display = 'block'
    clone.style.visibility = 'hidden'
    clone.style.height = 'auto'
    container.parentNode.appendChild(clone)
    if (clone.offsetHeight > max) max = clone.offsetHeight
    container.parentNode.removeChild(clone)
  })

  document.querySelectorAll('.testimonials .carousel-item').forEach(container => {
    container.style.height = max + 'px'
  })
}

window.addEventListener('load', () => { adjustCarouselHeight() })
window.addEventListener('resize', () => { adjustCarouselHeight() })
