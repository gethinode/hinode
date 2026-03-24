{{ $error := false -}}

{{/* Initialize arguments */}}
{{- $args := partial "utilities/InitArgs.html" (dict "structure" "docs" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if or $args.err $args.warnmsg -}}
    {{- partial (cond $args.err "utilities/LogErr.html" "utilities/LogWarn.html") (dict
        "partial"  "shortcodes/docs.md"
        "warnid"   "warn-invalid-arguments"
        "msg"      "Invalid arguments"
        "details"  ($args.errmsg | append $args.warnmsg)
        "file"     page.File
        "position" .Position
    )}}
    {{ $error = $args.err }}
{{- end -}}

{{/* Initialize local arguments */}}
{{- $basePath := .Site.Params.docs.basePath -}}
{{- $file := $args.file -}}
{{- if hasPrefix $file "./" -}}
    {{- $file = path.Clean $file -}}
{{- else -}}
    {{- $file = path.Join $basePath (path.Clean $file) -}}
{{- end -}}
{{- $extension := strings.TrimLeft "." (path.Ext $file) -}}
{{- $captureStart := "" -}}
{{- $captureEnd := "" -}}

{{- $supportedExtensions := slice "js" "scss" "toml" -}}
{{- if in $supportedExtensions $extension -}}
    {{- if eq $extension "toml" -}}
        {{- $captureStart = printf "# toml-docs-start %s" $args.name -}}
        {{- $captureEnd = printf "# toml-docs-end %s" $args.name -}}
    {{- else -}}
        {{- $captureStart = printf "// %s-docs-start %s" $extension $args.name -}}
        {{- $captureEnd = printf "// %s-docs-end %s" $extension $args.name -}}
    {{- end -}}
{{- else -}}
    {{- errorf "File format not supported (line %s): %s" .Position $file -}}
{{- end -}}

{{/* Main code */}}
{{- if not $error -}}
    {{- $statResult := try (os.Stat $file) -}}
    {{- if $statResult.Err -}}
        {{- warnf "shortcodes/docs.md - Cannot find file: %q. Skipping." $file -}}
        {{- $error = true -}}
    {{- end -}}
{{- end -}}
{{- if not $error -}}
    {{- $regex := printf `%s((?:.|\n)*)%s` $captureStart $captureEnd -}}
    {{- $match := findRE $regex (readFile $file) -}}
    {{- $match = index $match 0 -}}

    {{- if not $match -}}
        {{- errorf "%s: %q: Got no matches for name=%q in file=%q!" .Position .Name $args.name $file -}}
    {{- end -}}

    {{- $match = replace $match $captureStart "" -}}
    {{- $match = replace $match $captureEnd "" -}}

```{{ $extension }}
{{ trim $match "\r\n" }}
```
{{- end -}}
