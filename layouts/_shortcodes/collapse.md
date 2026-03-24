{{- $args := partial "utilities/InitArgs.html" (dict "structure" "collapse" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{ trim .Inner " \r\n" -}}
{{- end -}}
