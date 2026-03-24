{{- $args := partial "utilities/InitArgs.html" (dict "structure" "button" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $title := trim .Inner " \r\n" | plainify -}}
{{- $href := $args.href -}}
{{- if $args.relref }}{{- $href = relref . $args.relref -}}{{- end -}}
{{- if $href -}}
[{{ $title }}]({{ $href }})
{{- else -}}
{{ $title }}
{{- end -}}
{{- end -}}
