// Import Bootstrap directly instead of relying on the window global, so the script does
// not depend on script-ordering within the bundle (esbuild deduplicates the module).
import bootstrap from './modules/bootstrap/bootstrap.bundle.js'

const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
// eslint-disable-next-line no-unused-vars
const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
