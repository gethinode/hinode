{{- $args := partial "utilities/InitArgs.html" (dict "structure" "tooltip" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{ trim .Inner " \r\n" | plainify -}}
{{- end -}}
