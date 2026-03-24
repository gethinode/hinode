{{- $args := partial "utilities/InitArgs.html" (dict "structure" "card" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $title := .Get "title" -}}
{{- $description := trim .Inner " \r\n" | plainify -}}
{{ with $title }}**{{ . }}**{{ if $description }}: {{ end }}{{ end -}}
{{- $description }}
{{- end -}}
