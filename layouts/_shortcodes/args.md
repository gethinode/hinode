{{- $args := partial "utilities/InitArgs.html" (dict "structure" "args" "args" .Params "named" .IsNamedParams "group" "shortcode") -}}
{{- if not $args.err -}}
{{- $structDef := index site.Data.structures $args.structure -}}
{{- /* Fallback: resolve bookshop-{name} from the mounted component blueprint */ -}}
{{- if and (not $structDef) (strings.HasPrefix $args.structure "bookshop-") -}}
  {{- $compName := strings.TrimPrefix "bookshop-" $args.structure -}}
  {{- $blueprint := index (index (index site.Data.structures.components $compName) (printf "%s.bookshop" $compName)) "blueprint" | default dict -}}
  {{- if $blueprint -}}
    {{- $bpArgs := dict -}}
    {{- range $k, $v := $blueprint -}}
      {{- $kebab := $k | replaceRE "_" "-" -}}
      {{- $bpArgs = merge $bpArgs (dict $kebab nil) -}}
    {{- end -}}
    {{- $structDef = dict "arguments" $bpArgs -}}
  {{- end -}}
{{- end -}}
{{- with $structDef -}}
{{- $globalArgs := ((index site.Data.structures "_arguments") | default dict).arguments | default dict -}}
{{- $rows := slice -}}
{{- range $key, $val := .arguments -}}
{{- if and $val (reflect.IsMap $val) -}}{{- if $val.deprecated }}{{ continue }}{{ end -}}{{- end -}}
{{- $g := index $globalArgs $key | default dict -}}
{{- $argMap := dict -}}
{{- if and $val (reflect.IsMap $val) }}{{- $argMap = $val -}}{{ end -}}
{{- $merged := merge $g $argMap -}}
{{- if and $args.group $merged.group (ne $merged.group $args.group) }}{{ continue }}{{ end -}}
{{- $required := "" -}}
{{- if not (default false $merged.optional) }}{{- $required = "yes" -}}{{ end -}}
{{- $default := "" -}}
{{- with $merged.default }}{{- $default = printf "`%v`" . -}}{{ end -}}
{{- $comment := $merged.comment | default "" | replaceRE "\n" " " -}}
{{- if $merged.options.values -}}{{- $comment = printf "%s Supported values: [`%s`]." $comment (delimit $merged.options.values "`, `") -}}{{- end -}}
{{- $typeVal := $merged.type | default "string" -}}
{{- if reflect.IsSlice $typeVal }}{{- $typeVal = index $typeVal 0 | default "string" -}}{{ end -}}
{{- $rows = $rows | append (printf "| `%s` | %s | %s | %s | %s |" $key $typeVal $required $default $comment) -}}
{{- end -}}
{{- if $rows }}

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
{{ delimit $rows "\n" }}
{{- end -}}
{{- end -}}
{{- end -}}
