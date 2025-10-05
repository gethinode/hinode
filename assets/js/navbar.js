const fixed = {{ site.Params.navigation.fixed }}
const navbar = document.querySelector('.navbar')
const togglers = document.querySelectorAll('.main-nav-toggler')
const modeSelectors = document.querySelectorAll('.switch-mode-collapsed')
const colorsBG = ['body', 'secondary', 'tertiary']

let scrollPosition = 0

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function getStyle(el, styleProp) {
    let y
    
    if (window.getComputedStyle) {
      y = document.defaultView.getComputedStyle(el).getPropertyValue(styleProp)
    } else if (el.currentStyle) {
      y = el.currentStyle[styleProp]
    }

    return y
}

function updateNavbarColor () {
  const scrollTop = window.pageYOffset
  const scrollBottom = scrollTop + navbar.offsetHeight

  // find which section is currently under the navbar
  let currentSection = null
  const sections = document.querySelectorAll('article,section,footer')
  let currentIndex = -1

  sections.forEach(section => {
    const rect = section.getBoundingClientRect()
    const sectionTop = scrollTop + rect.top
    const sectionBottom = sectionTop + section.offsetHeight - 1

    // check if navbar overlaps with this section
    if (scrollTop <= sectionBottom && scrollBottom >= sectionTop) {
      let index = getStyle(section, 'z-index')
      if (index === 'auto') {
        index = 1
      }
      if (index > currentIndex) {
        currentSection = section
        currentIndex = index
      }
    }
  })

  // use main part as backup (defined in baseof.html template)
  if (!currentSection) {
    currentSection = document.querySelector('main')
  }

  if (currentSection) {
    adaptToSection(currentSection)
  }
}

function getBackgroundColor (section) {
  // get computed background color of the section
  let color = window.getComputedStyle(section).backgroundColor

  // use body background when section background is undefined or transparent
  if (color === 'rgba(0, 0, 0, 0)' || color === 'transparent') {
    color = window.getComputedStyle(document.body).getPropertyValue('background-color')
  }

  return color
}

function adaptToSection (section) {
  // retrieve the section background color, using body color as fallback
  const color = getBackgroundColor(section)

  // determine if the background is light or dark
  const isLightBackground = isLightColor(section, color)

  // set appropriate mode class
  const nav = document.querySelector('.navbar')
  if (isLightBackground) {
    if (navbar.dataset.bsTheme !== 'light') {
      navbar.dataset.bsTheme = 'light'
    }
  } else {
    if (navbar.dataset.bsTheme !== 'dark') {
      navbar.dataset.bsTheme = 'dark'
    }
  }

  // update semi-transparent background color of navbar
  const rgb = parseRGB(color)
  if (rgb) {
    navbar.style.backgroundColor = `rgba(${rgb.r},${rgb.g},${rgb.b},.4)`
  }
}

function isLightColor (section, color) {
  if (section.dataset.bsTheme === 'light') {
    return true
  }

  if (section.dataset.bsTheme === 'dark') {
    return false
  }

  // parse RGB color of the section backgroiund
  const rgb = parseRGB(color)
  if (!rgb) return true // Default to light if can't parse

  // calculate relative luminance
  const luminance = calculateLuminance(rgb.r, rgb.g, rgb.b)

  // return true if light (luminance > 0.5)
  return luminance > 0.5
}

function parseRGB (color) {
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3])
    }
  }
  return null
}

function calculateLuminance (r, g, b) {
  // convert RGB to relative luminance using sRGB formula
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

function updateNavbar () {
  if (navbar.dataset.transparent) {
    updateNavbarColor()
  } else {
    let storedTheme
    if (typeof getLocalStorage === "function") {
      storedTheme = getLocalStorage('theme', null, 'functional')
    }

    if (window.scrollY > 75) {
      navbar.classList.add('nav-active')
      if (storedTheme) {
        navbar.setAttribute('data-bs-theme', storedTheme)
      }
    } else {
      navbar.classList.remove('nav-active')
      const defaultTheme = navbar.getAttribute('data-bs-overlay')

      const targetTheme = defaultTheme ? defaultTheme : storedTheme
      if (targetTheme) {
        navbar.setAttribute('data-bs-theme', defaultTheme)
      }
    }
  }
}

if ((navbar !== null) && (window.performance.getEntriesByType)) {
  if (window.performance.getEntriesByType('navigation')[0].type === 'reload') {
    fixed && updateNavbar()
  }
}

if (navbar !== null && togglers !== null) {
  // initialize and update the navbar on load, on resize, and on scroll
  document.addEventListener('DOMContentLoaded', () => { fixed && updateNavbar() })
  document.addEventListener('resize', () => fixed && updateNavbar())
  document.addEventListener('scroll', () => fixed && updateNavbar())

  // hook up collapse events
  document.querySelectorAll('.navbar-collapse').forEach((collapse) => {
    collapse.addEventListener('show.bs.collapse', function () {
      scrollPosition = window.pageYOffset
      document.body.style.top = `-${scrollPosition}px`
      document.body.classList.add('navbar-open')
    })
    collapse.addEventListener('hide.bs.collapse', function () {
      document.body.classList.remove('navbar-open')
      document.body.style.top = ''
      window.scrollTo({ top: scrollPosition, behavior: 'instant' })
    })
  })

  // observe state changes to the site's color mode
  const html = document.querySelector('html')
  const config = {
    attributes: true,
    attributeFilter: ['data-bs-theme']
  }
  const Observer = new MutationObserver(() => {
    if (fixed) {
      // wait for the theme animation to finish
      sleep(600).then(() => { 
        updateNavbar() 
      })
    }
  })
  Observer.observe(html, config)

  // initialize background color
  if (!navbar.dataset.transparent) {
    const color = (navbar.getAttribute('data-navbar-color') || 'body')
    const bg = colorsBG.includes(color) ? `var(--bs-${color}-bg)` : `var(--bs-navbar-color-${color})`
    navbar.style.setProperty('--bs-navbar-expanded-color', bg)
  }

  // update the navbar background color when expanded
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
