const navbar = document.querySelector('.navbar')
const toggler = document.getElementById('main-nav-toggler')

// set the navbar background color to opaque when scrolling past a breakpoint
window.onscroll = () => {
  if (window.scrollY > 75) {
    navbar.classList.add('nav-active')
  } else {
    navbar.classList.remove('nav-active')
  }
}

// set the navbar background color to opaque when expanded
toggler.onclick = () => {
  navbar.classList.toggle('navbar-expanded')
}
