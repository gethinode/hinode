"{{ trim .Inner "\r\n " }}"
{{ with .Get "contact" }}— {{ . }}{{ with $.Get "role" }}, {{ . }}{{ end }}{{ with $.Get "url" }} ({{ . }}){{ end }}
{{ end -}}
