const navbar = document.querySelector('.navbar')
const togglers = document.querySelectorAll('.main-nav-toggler')
const modeSelectors = document.querySelectorAll('.switch-mode-collapsed')

if (navbar !== null && togglers !== null) {
  // set the navbar background color to opaque when scrolling past a breakpoint
  window.onscroll = () => {
    if (window.scrollY > 75) {
      navbar.classList.add('nav-active')
    } else {
      navbar.classList.remove('nav-active')
    }
  }

  // set the navbar background color to opaque when expanded
  for (let i = 0; i < togglers.length; ++i) {
    togglers[i].onclick = () => {
      navbar.classList.toggle('navbar-expanded')
    }
  }

  // invoke the navbar toggler for each mode switcher to collapse the main menu afterwards
  for (let i = 0; i < modeSelectors.length; ++i) {
    modeSelectors[i].onclick = () => {
      for (let j = 0; j < togglers.length; ++j) {
        const toggler = togglers[j]
        if (toggler.getAttribute('aria-expanded') === 'true') {
          toggler.click()
        }
      }
    }
  }
}
