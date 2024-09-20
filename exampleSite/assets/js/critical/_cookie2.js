// TODO: move to module

/* eslint-disable no-undef, no-unused-vars */
{{- if or site.Params.modules.cookieyes.force (not hugo.IsServer) -}}
    {{ with site.Params.modules.cookieyes.id }}

class CookieYesManager {
  #consent

  updateConsent () {
    if (window.getCkyConsent) {
      this.#consent = getCkyConsent()
    }
  }

  constructor () {
    loadScriptSync('https://cdn-cookieyes.com/client_data/{{ (. | urlize) }}/script.js', 'cookieyes')
    this.updateConsent()
  }

  hasConsent (category) {
    if (typeof this.#consent !== 'undefined' && this.#consent !== null) {
      console.log('invoke cky consent: ' + category + this.#consent)
      return true
    } else {
      console.log('cky consent undefined: ' + category)
      return false
    }
  }
}

_manager = new CookieYesManager()
document.addEventListener("cookieyes_consent_update", function () { _manager.updateConsent() })

    {{ else }}
        {{ warnf "Cannot find CookieYes ID, check 'params.modules.cookieyes.id'" }}
    {{ end }}
{{ end }}