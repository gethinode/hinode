{{- $error := false -}}
{{- $args := partial "utilities/InitArgs.html" (dict "structure" "file" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if $args.err -}}{{- $error = true -}}{{- end -}}
{{- if not $error -}}
{{- $basePath := .Site.Params.docs.basePath -}}
{{- $file := or $args.file $args.path -}}
{{- if $file -}}
{{- if hasPrefix $file "./" -}}{{- $file = path.Clean $file -}}{{- else -}}{{- $file = path.Join $basePath (path.Clean $file) -}}{{- end -}}
{{- if fileExists $file -}}
{{- $extension := strings.TrimLeft "." (path.Ext $file) -}}
{{- $lang := $args.lang | default $extension -}}
{{- $content := readFile $file -}}
{{- printf "```%s\n%s\n```" $lang (trim $content "\r\n") -}}
{{- end -}}
{{- end -}}
{{- end -}}
