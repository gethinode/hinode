{{- $args := partial "utilities/InitArgs.html" (dict "structure" "example" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $lang := $args.lang -}}
{{- if eq $lang "hugo" -}}{{- $lang = "markdown" -}}{{- end -}}
{{- $body := trim .InnerDeindent "\r\n" -}}
{{- /* A fence must be longer than any fence the example itself contains, else the
       example's own fence closes this block early, as in file.md. */ -}}
{{- $fence := "```" -}}
{{- range findRE "(?m)^[ \t]*`{3,}" $body -}}
{{- $run := trim . " \t" -}}
{{- if ge (len $run) (len $fence) -}}{{- $fence = printf "%s`" $run -}}{{- end -}}
{{- end -}}
{{- printf "%s%s\n%s\n%s" $fence $lang $body $fence -}}
{{- end -}}
