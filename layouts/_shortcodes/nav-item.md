{{- $args := partial "utilities/InitArgs.html" (dict "structure" "nav-item" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $title := or $args.title $args.header -}}
{{ with $title }}### {{ . }}

{{ end -}}
{{ trim .Inner " \r\n" }}
{{- end -}}
