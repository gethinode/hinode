{{- $args := partial "utilities/InitArgs.html" (dict "structure" "release" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $state := or $args.releaseState $args.state -}}
{{- if eq $state "deprecated" -}}
{{- T "deprecatedFeature" $args.version -}}
{{- else -}}
{{- T "addedFeature" $args.version -}}
{{- end -}}
{{- end -}}
