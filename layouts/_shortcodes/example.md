{{- $args := partial "utilities/InitArgs.html" (dict "structure" "example" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $lang := $args.lang -}}
{{- if eq $lang "hugo" -}}{{- $lang = "markdown" -}}{{- end -}}
{{- printf "```%s\n%s\n```" $lang (trim .InnerDeindent "\r\n") -}}
{{- end -}}
