{{- $args := partial "utilities/InitArgs.html" (dict "structure" "video" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
[{{ or $args.title "YouTube Video" }}](https://www.youtube.com/watch?v={{ or $args.mediaId $args.id }})
{{- end -}}
