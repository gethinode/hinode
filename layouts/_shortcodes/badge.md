{{- $args := partial "utilities/InitArgs.html" (dict "structure" "badge" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{ $args.title | plainify -}}
{{- end -}}
