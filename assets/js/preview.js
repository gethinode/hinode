/**
 * Preview Component - Auto-switch device on resize
 * Automatically switches to next available device when current device panel is hidden
 */

function initPreviewAutoSwitch () {
  const previewSections = document.querySelectorAll('section.preview')

  previewSections.forEach(section => {
    const buttons = section.querySelectorAll('.preview-controls .btn-group .btn')

    if (buttons.length === 0) return

    /**
         * Check if active button is hidden and switch to next available
         */
    const checkAndSwitchDevice = () => {
      // Find currently active button
      const activeButton = Array.from(buttons).find(btn => btn.classList.contains('active'))

      if (!activeButton) return

      // Check if active button is hidden by CSS
      const isHidden = window.getComputedStyle(activeButton).display === 'none'

      if (isHidden) {
        // Find all visible buttons
        const visibleButtons = Array.from(buttons).filter(btn =>
          window.getComputedStyle(btn).display !== 'none'
        )

        if (visibleButtons.length > 0) {
          // Switch to first visible button (desktop -> tablet -> mobile priority)
          visibleButtons[0].click()
        }
      }
    }

    // Debounced resize handler (avoid excessive checks)
    let resizeTimer
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(checkAndSwitchDevice, 150)
    })

    // Initial check on page load
    checkAndSwitchDevice()
  })
}

// Initialize on load (resize handler is set up inside initPreviewAutoSwitch)
window.addEventListener('load', () => { initPreviewAutoSwitch() })
