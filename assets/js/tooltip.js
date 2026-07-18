// Bootstrap tooltip example: https://getbootstrap.com/docs/5.2/components/tooltips/
// Import Bootstrap directly instead of relying on the window global, so the script does
// not depend on script-ordering within the bundle (esbuild deduplicates the module).
import bootstrap from './modules/bootstrap/bootstrap.bundle.js'

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
// eslint-disable-next-line no-unused-vars
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
