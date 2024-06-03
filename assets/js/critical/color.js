{{- if site.Params.main.enableDarkMode -}}

/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2022 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict'

  const storedTheme = localStorage.getItem('theme')

  const getPreferredTheme = () => {
    if (storedTheme) {
      return storedTheme
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const setTheme = function (theme) {
    if (theme === 'auto') {
      document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme)
    }
  }

  const toggleTheme = function () {
    const mode = document.documentElement.getAttribute('data-bs-theme')
    const target = mode === 'dark' ? 'light' : 'dark'

    localStorage.setItem('theme', target)
    setTheme(target)
    showActiveTheme(target)
  }

  setTheme(getPreferredTheme())

  const showActiveTheme = theme => {
    const activeSelectors = document.querySelectorAll('.theme-icon-active')
    const activeButtons = document.querySelectorAll(`[data-bs-theme-value="${theme}"]`)
    if (activeButtons.length > 0) {
      const activeIcon = activeButtons[0].querySelector('span')

      document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
        element.classList.remove('active')
      })

      for (let i = 0; i < activeSelectors.length; ++i) {
        activeSelectors[i].innerHTML = activeIcon.innerHTML
      }

      for (let i = 0; i < activeButtons.length; ++i) {
        activeButtons[i].classList.add('active')
      }
    }
  }

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (storedTheme !== 'light' || storedTheme !== 'dark') {
      setTheme(getPreferredTheme())
    }
  })

  window.addEventListener('DOMContentLoaded', () => {
    showActiveTheme(getPreferredTheme())

    document.querySelectorAll('[data-bs-theme-value]')
      .forEach(toggle => {
        toggle.addEventListener('click', () => {
          const theme = toggle.getAttribute('data-bs-theme-value')
          localStorage.setItem('theme', theme)
          setTheme(theme)
          showActiveTheme(theme)
        })
      })

      document.querySelectorAll('.ball').forEach(ball => {
        ball.classList.add('notransition');
      })
      
      const chk = document.querySelectorAll('.navbar-mode-selector')
      for (let i = 0; i < chk.length; ++i) {
        if (storedTheme === 'light') {
          chk[i].click()
        }
        chk[i].addEventListener('change', function () {
          toggleTheme()
        })
      }

      document.querySelectorAll('.ball').forEach(ball => {
        ball.offsetHeight; // flush css changes
        ball.classList.remove('notransition');
      })
  })
})()

{{- end -}}