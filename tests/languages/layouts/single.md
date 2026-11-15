{{- /*
    The markdown output of the abbr, args and nested pages, which renders the shortcodes' .md
    variants. The nested page escapes a command inside a nav-item and an accordion-item, which
    must render it as a fenced block rather than print the shortcode.
    Assertions against the expected Markdown; `errorf` fails the build.
*/ -}}
{{- /* The download row's type and comment come from mod-utils' global _arguments.yml. */ -}}
{{- $want := dict
    "/abbr/" (slice "cms (content management system)")
    "/args/" (slice
        "| `key` | string | yes |  |"
        "| `download` | string |  |  | Path to the download file, relative to the site's static folder. |"
    )
    "/nested/" (slice
        "In a terminal:\n\n```bash\nbrew install example\n```"
        "In a shell:\n\n```powershell\nwinget install example\n```"
    )
-}}
{{- /* A Windows checkout gives the content files CRLF line endings, which reach the output. */ -}}
{{- $content := replace .Content "\r\n" "\n" -}}
{{- range index $want .RelPermalink -}}
    {{- if not (strings.Contains $content .) -}}
        {{- errorf "markdown output of %s: want %q, got %s" $.RelPermalink . $content -}}
    {{- end -}}
{{- end -}}
{{ .Content }}
