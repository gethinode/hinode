{{- $args := partial "utilities/InitArgs.html" (dict "structure" "command" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- printf "```%s\n%s\n```" $args.shell (trim .InnerDeindent " \t\r\n") -}}
{{- end -}}
