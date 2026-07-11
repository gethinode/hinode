const fixed = {{ site.Params.navigation.fixed }}
const navbar = document.querySelector('.navbar')
const togglers = document.querySelectorAll('.main-nav-toggler')
const modeSelectors = document.querySelectorAll('.switch-mode-collapsed')
const colorsBG = ['body', 'secondary', 'tertiary']

let scrollPosition = 0

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
    const style = window.getComputedStyle(document.body)
    // custom properties are not animated, so this yields the target color of a color mode
    // switch rather than the intermediate color the body is currently fading through
    color = style.getPropertyValue('--bs-body-bg').trim() || style.getPropertyValue('background-color')
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

  // custom properties such as --bs-body-bg resolve to a hex color
  const hex = color.match(/^#([\da-f]{3}|[\da-f]{6})$/i)
  if (hex) {
    const digits = hex[1].length === 3 ? hex[1].replace(/./g, c => c + c) : hex[1]
    return {
      r: parseInt(digits.slice(0, 2), 16),
      g: parseInt(digits.slice(2, 4), 16),
      b: parseInt(digits.slice(4, 6), 16)
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
    if (window.scrollY > 0) {
      navbar.classList.add('navbar-scrolled')
    } else {
      navbar.classList.remove('navbar-scrolled')
    }
    updateNavbarColor()
    if (window.scrollY === 0) {
      navbar.style.backgroundColor = ''
    }
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
        navbar.setAttribute('data-bs-theme', targetTheme)
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
  window.addEventListener('resize', () => {
    fixed && updateNavbar()
    for (let i = 0; i < togglers.length; ++i) {
      const toggler = togglers[i]
      if (toggler.getAttribute('aria-expanded') === 'true') {
        toggler.click()
      }
    }
  })
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
    // switch along with the body rather than after it; the colors sampled by updateNavbar
    // come from custom properties, which hold their target value from the outset
    fixed && updateNavbar()
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
