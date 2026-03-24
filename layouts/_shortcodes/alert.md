{{- $args := partial "utilities/InitArgs.html" (dict "structure" "alert" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $body := trim .Inner " \r\n" | plainify -}}
{{- $callout := "NOTE" -}}
{{- if eq $args.alertType "danger" -}}{{- $callout = "WARNING" -}}{{- end -}}
> [!{{ $callout }}]
> {{ $body }}
{{- end -}}
