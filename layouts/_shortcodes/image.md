{{- $args := partial "utilities/InitArgs.html" (dict "structure" "image" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $src := or $args.src $args.url -}}
{{- $alt := or $args.title $args.caption "image" -}}
![{{ $alt }}]({{ $src }})
{{- end -}}
