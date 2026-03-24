{{- $args := partial "utilities/InitArgs.html" (dict "structure" "link" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $destination := or $args.href $args.name $args.url -}}
{{- $text := chomp .Inner | plainify -}}
[{{ $text }}]({{ $destination }})
{{- end -}}
