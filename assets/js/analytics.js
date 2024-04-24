// Adapted from https://github.com/gohugoio/hugo/blob/master/tpl/tplimpl/embedded/templates/google_analytics.html

{{ if and (not hugo.IsServer) (not site.Config.Privacy.GoogleAnalytics.Disable) }}
  {{ with site.Config.Services.GoogleAnalytics.ID }}
    {{ if strings.HasPrefix (lower .) "ua-" }}
      {{ warnf "Google Analytics 4 (GA4) replaced Google Universal Analytics (UA) effective 1 July 2023. See https://support.google.com/analytics/answer/11583528. Create a GA4 property and data stream, then replace the Google Analytics ID in your site configuration with the new value." }}
    {{ else }}
        var doNotTrack = false;
        if ({{ site.Config.Privacy.GoogleAnalytics.RespectDoNotTrack }}) {
          var dnt = (navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack);
          var doNotTrack = (dnt == "1" || dnt == "yes");
        }
        if (!doNotTrack) {
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '{{ . }}');
        }
    {{ end }}
  {{ end }}
{{ end }}