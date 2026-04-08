// Pre-apply sidebar collapsed state before body renders to prevent label flash.
(function () {
  try {
    if (localStorage.getItem('sidebar-collapsed') === '1') {
      document.documentElement.classList.add('sidebar-pre-collapsed')
    }
  } catch { /* ignore localStorage errors */ }
}())
