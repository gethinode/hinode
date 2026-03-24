const btnTOCShowMore = document.getElementById('btnTOCShowMore')
if (btnTOCShowMore !== null) {
  btnTOCShowMore.addEventListener('click', _e => {
    btnTOCShowMore.style.display = 'none'
  })
}

const btnTOCShowLess = document.getElementById('btnTOCShowLess')
if ((btnTOCShowLess !== null) && (btnTOCShowMore !== null)) {
  btnTOCShowLess.addEventListener('click', _e => {
    btnTOCShowMore.style.display = 'initial'
  })
}
