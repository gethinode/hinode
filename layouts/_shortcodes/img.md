{{- $args := partial "utilities/InitArgs.html" (dict "structure" "carousel-item" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
![{{ $args.caption | default "image" }}]({{ $args.src }})
{{- end -}}
