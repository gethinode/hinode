{{- $args := partial "utilities/InitArgs.html" (dict "structure" "abbr" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $entries := index site.Data $args.data -}}
{{- $title := "" -}}
{{- with where $entries "id" (lower $args.key) -}}{{- $title = index (index . 0) "long" -}}{{- end -}}
{{ $args.key }}{{ with $title }} ({{ . }}){{ end -}}
{{- end -}}
