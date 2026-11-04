{{- /*
    The markdown output of the abbr and args pages, which renders the shortcodes' .md variants.
    Assertions against the expected Markdown; `errorf` fails the build.
*/ -}}
{{- /* The download row's type and comment come from mod-utils' global _arguments.yml. */ -}}
{{- $want := dict
    "/abbr/" (slice "cms (content management system)")
    "/args/" (slice
        "| `key` | string | yes |  |"
        "| `download` | string |  |  | Path to the download file, relative to the site's static folder. |"
    )
-}}
{{- range index $want .RelPermalink -}}
    {{- if not (strings.Contains $.Content .) -}}
        {{- errorf "markdown output of %s: want %q, got %s" $.RelPermalink . $.Content -}}
    {{- end -}}
{{- end -}}
{{ .Content }}
