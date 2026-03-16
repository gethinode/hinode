{{- $args := partial "utilities/InitArgs.html" (dict "structure" "video" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
[{{ or $args.title "Vimeo Video" }}](https://vimeo.com/{{ or $args.mediaId $args.id }})
{{- end -}}
