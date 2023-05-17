const url = new URL(window.location.href)
const menu = url.searchParams.get('menu')
const child = url.searchParams.get('child')
const menuItems = document.querySelectorAll('[data-nav="main"]')

if (menu !== null) {
  menuItems.forEach(element => {
    element.classList.remove('active')
  })

  const targetMainItems = document.querySelectorAll(`[data-nav-main="${menu}"]:not([data-nav-child])`)
  targetMainItems.forEach(element => {
    element.classList.add('active')
  })

  const targetChildItems = document.querySelectorAll(`[data-nav-main="${menu}"][data-nav-child="${child}"]`)
  targetChildItems.forEach(element => {
    element.classList.add('active')
  })
}
