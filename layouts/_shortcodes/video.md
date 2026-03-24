{{- $args := partial "utilities/InitArgs.html" (dict "structure" "video" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $title := $args.title | default "Video" -}}
{{- $provider := or $args.host $args.provider -}}
{{- $id := or $args.mediaId $args.id -}}
[Video: {{ $title }}]{{ with $provider }} ({{ . }}{{ with $id }}: {{ . }}{{ end }}){{ end }}
{{- end -}}
