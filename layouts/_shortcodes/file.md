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
{{- /* A fence must be longer than any fence the file itself contains, else the
       file's own fence closes this block early. CommonMark ends a fenced block
       at the first closing run at least as long as the opening one, so a file
       holding a ```-fenced example emitted inside a ``` fence stops the block
       mid-file: the rest of the file is then read as prose, and later fences
       re-open and swallow the content after them. */ -}}
{{- $fence := "```" -}}
{{- range findRE "(?m)^[ \t]*`{3,}" $content -}}
{{- $run := trim . " \t" -}}
{{- if ge (len $run) (len $fence) -}}{{- $fence = printf "%s`" $run -}}{{- end -}}
{{- end -}}
{{- printf "%s%s\n%s\n%s" $fence $lang (trim $content "\r\n") $fence -}}
{{- end -}}
{{- end -}}
{{- end -}}
