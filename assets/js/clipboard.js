/*
Source:
  - https://simplernerd.com/hugo-add-copy-to-clipboard-button/
*/

const svgCopy =
  '<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="16" height="16" fill="currentColor" class="bi bi-clipboard" viewBox="0 0 16 16"><path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/><path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/></svg>'
const svgCheck =
  '<svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true"><path fill-rule="evenodd" fill="rgb(63, 185, 80)" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path></svg>'

const addCopyButtons = (clipboard) => {
  // 1. Look for pre > code elements in the DOM
  document.querySelectorAll('pre > code').forEach((codeBlock) => {
    // 2. Create a button that will trigger a copy operation
    const button = document.createElement('button')
    button.className = 'clipboard-button'
    button.type = 'button'
    button.innerHTML = svgCopy
    button.addEventListener('click', () => {
      clipboard.writeText(codeBlock.innerText).then(
        () => {
          button.blur()
          button.innerHTML = svgCheck
          setTimeout(() => (button.innerHTML = svgCopy), 2000)
        },
        // eslint-disable-next-line n/handle-callback-err
        (error) => (button.innerHTML = 'Error')
      )
    })
    // 3. Append the button directly before the pre tag
    const pre = codeBlock.parentNode
    pre.parentNode.insertBefore(button, pre)
  })
}

if (navigator && navigator.clipboard) {
  addCopyButtons(navigator.clipboard)
}
