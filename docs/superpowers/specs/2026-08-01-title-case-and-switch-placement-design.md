# Title casing and switch placement — design

- **Date:** 2026-08-01
- **Repo:** `gethinode/hinode` (branch base: `origin/main` @ `eacb0179`)
- **Origin:** infusal.io remediation gates D-12 and D-14, reframed upstream. Handover:
  `infusal/portal:docs/superpowers/handovers/2026-08-01-d12-d14-hinode-switch-placement.md`

## Problem

Four defects that share one shape: **a switch is honored in one place and ignored in
another.**

### 1. Headings are title-cased by a different rule than everything else (D-12)

`site.Params.main.titleCase` selects between two mechanisms that disagree:

| Path | Where | Mechanism |
| --- | --- | --- |
| CSS | markdown headings | `_markup/render-heading.html:24` adds `.title-case`; `assets/scss/common/_styles.scss:114` applies `text-transform: capitalize` |
| Go | `<title>`, H1, nav, taxonomy, captions, links, cards, breadcrumbs, sidebar | the `title` filter, inlined at 24 sites across 17 templates |

`text-transform: capitalize` has no stopword awareness. Go's `title` honors Hugo's
`titleCaseStyle`, which defaults to AP. So the same page renders its H1 as
`Types of Cookies We Use` and its H2 as `Types Of Cookies We Use`.

**The headline defect is not the disagreement itself — it is that the CSS path ignores
`titleCaseStyle` entirely**, while hinode's own documentation
(gethinode.com `content/docs/configuration/layout.md:83`) directs users to configure it.
Set `titleCaseStyle = "firstupper"` and every `<title>` and H1 obeys; every markdown
heading still gets full capitalization.

Reproduces on hinode's own exampleSite, which sets `titleCase = true` at
`exampleSite/config/_default/params.toml:9`:

| File | Heading | CSS renders | Go would render |
| --- | --- | --- | --- |
| `exampleSite/content/en/cookies.md:22` | `## Types of Cookies we use` | `Types Of Cookies We Use` | `Types of Cookies We Use` |
| `exampleSite/content/en/privacy.md:39` | `## Third party links & use of your information` | `... Use Of Your ...` | `... Use of Your ...` |

Secondary divergences, both verified: hyphenated compounds (`State-of-the-Art` vs
`State-Of-The-Art`), and `<code>` spans inside headings (CSS capitalizes their contents;
Go, as designed here, will too — see "Deliberately unchanged").

The divergence is **English-only**. AP style carries no stopword list for other
languages, so both paths already agree on nl/fr/de content.

### 2. `readingTime` and `wordCount` have no per-type cascade (D-14)

`site.Params.pages` has three consumers. Two cascade per content type; the third does not.

| Consumer | Param | Per-page | Per-type |
| --- | --- | --- | --- |
| `_partials/utilities/GetMetadata.html:3,5` | `metadata` | yes | yes |
| `_partials/utilities/GetIncludeTOC.html:4,7` | `includeToc` | yes | yes |
| `_partials/page/metadata.html:4-5` | `readingTime`, `wordCount` | **no** | **no** |

So "reading time on blog, off elsewhere" is inexpressible. The neighbouring `metadata`
param does cascade, but it is all-or-nothing — `none` drops the date and word count too.

### 3. `metadata = "original"` is documented but unimplemented

`GetMetadata.html:10` accepts `full`, `original`, `none`. gethinode.com
`content/docs/configuration/layout.md:366` documents `original` as "the modification date
is always omitted". But `page/metadata.html:2` branches only on `ne $metadata "none"`, and
nothing else reads the value. `full` and `original` render identically.

### 4. The mobile TOC dropdown bypasses the `includeToc` cascade

`baseof.html:29` resolves `includeToc` through `GetIncludeToc.html` into a scratch, which
`toc.html:2` reads. But `layouts/header.html:36` and `layouts/docs/header.html:34`
re-derive it inline:

```go-html-template
{{- if and .Site.Params.navigation.toc .Params.includeToc | default true -}}
```

That expression honors the global toggle and the per-page param but not
`site.Params.pages.<Type>.includeToc`. Setting a type's `includeToc = false` hides the
sidebar TOC while the mobile dropdown still renders. `layouts/minimal/header.html` has no
dropdown and is unaffected.

## Approach

Reconcile on the **Go** side, because `<title>` and `og:` meta cannot take CSS and
therefore the Go path can never be eliminated. Two options were rejected:

- **Wrap Go-lowercased words in spans and keep `text-transform: capitalize`.** Preserves
  the browser's `lang`-aware casing, but needs the same tokenizer *plus* extra markup in
  every heading. Rejected as more machinery for a benefit that matters mainly to Turkish,
  where AP-style casing is already semantically wrong.
- **Document the split and change nothing.** Zero risk, but leaves `titleCaseStyle`
  silently inapplicable to headings.

Two claims in the source handover did not survive checking, and both were load-bearing
against the Go approach:

- *"The Go filter destroys acronym casing."* Half true, and the half that is true was
  initially underweighted here. Existing uppercase is preserved — `title "the CLI and an
  AGENT"` returns `The CLI and an AGENT`. Only lowercase-authored acronyms are affected
  (`npm` → `Npm`), and `text-transform: capitalize` mangles those identically, so the two
  paths do look the same on screen. **But they are not equivalent:** under CSS the DOM
  still holds `npm`, so copy-paste, screen readers, and search indexing see the correct
  string; the Go filter puts the mangled spelling into the text itself. The gethinode.com
  dogfood build found six such headings. Addressed by `titleCaseExceptions` below.
- *"The Go filter mangles inline markup."* True of a naive `title` over rendered HTML,
  but solvable. See below; a working prototype is verified against 14 adversarial inputs.

## Design

### `layouts/_partials/utilities/TitleCase.html` — the one new primitive

Owns both *whether* to title-case and *how*, so the decision cannot drift between call
sites again.

```go-html-template
{{ partial "utilities/TitleCase.html" (dict "page" $page "text" $title) }}
{{ partial "utilities/TitleCase.html" (dict "exact" $args.exact "text" $title) }}
```

| Key | Required | Meaning |
| --- | --- | --- |
| `text` | yes | plain string or rendered HTML |
| `page` | yes, unless `exact` given | source of `.Params.exact` |
| `exact` | no | explicit override, for callers with no page in scope (`assets/card.html:203`) |

`site.Params.main.titleCaseExceptions` (list of strings, default empty) names words that
must keep their exact spelling — `["npm", "pnpm"]`. Restoration replaces the entry's
title-cased form with the entry, so only that spelling is affected and a deliberate `NPM`
survives. It is applied to the plain cased string, never to the final result, because the
result contains tags and a match inside an attribute value would corrupt markup.

Returns a plain string. Callers apply `safeHTML` exactly where they do today.

Algorithm:

1. `site.Params.main.titleCase` false → return `text` unchanged.
2. Resolve `exact`: the explicit key if present, else `page.Params.exact`. Truthy →
   return `text` unchanged.
3. **Fast path.** `text` contains neither `<` nor `&` → `return title text`. This covers
   effectively every frontmatter title, nav label, breadcrumb, and card title, so
   tokenizer cost falls only on headings carrying inline markup.
4. **Slow path.** Tokenize with `<[^>]+>|&#?[0-9a-zA-Z]+;|[^<&]+|[<&]`, giving three
   token classes: tags, character entities, and text runs. Build a plain string in which
   tags contribute nothing, **each entity contributes a single space**, and text runs
   contribute themselves. Apply `title` to that string **once**, then walk the tokens
   again — emitting tags and entities verbatim, and slicing the cased string positionally
   for text runs. Tags do not advance the position; entities advance it by one.
5. **Safety net.** If the cased string's rune count differs from the plain string's,
   return `text` unchanged rather than emit corrupted markup.

Three decisions in that algorithm are non-obvious and each is a bug found in prototyping:

- **The plain string is built from tokens, not `plainify`.** `plainify` collapses
  whitespace around a stripped element: `an image <img alt="the alt of it"> in a heading`
  plainifies to a single space where the source has two, which shifts every subsequent
  position and drops a space from the output.
- **Entities are emitted verbatim but stand in as a space.** Two separate hazards. Casing
  an entity's own text corrupts it — `title` capitalizes the `amp` inside `&amp;`,
  producing `&Amp;` — so the original is always re-emitted. But *omitting* entities from
  the plain string joins the words on either side, and the word after one then never
  starts a word: `the&nbsp;cat sat` cased to `The&nbsp;cat Sat`. Substituting one space
  per entity fixes the boundary while the verbatim re-emission preserves the entity, and
  the one-rune width keeps the positional mapping exact. Found in review of Task 1.
- **`title` is applied once, to the whole string.** Applying it per text run would break
  stopword logic at run boundaries — a run starting with `and` would be treated as a
  first word and capitalized.

Verified prototype output:

```text
set up a project and environments
  → Set Up a Project and Environments
the&nbsp;cat sat
  → The&nbsp;Cat Sat
state-of-the-art <code>npm</code> tooling for the win
  → State-of-the-Art <code>Npm</code> Tooling for the Win
a link to <a href="/x">the docs</a> of hinode
  → A Link to <a href="/x">the Docs</a> of Hinode
third party links &amp; use of your information
  → Third Party Links &amp; Use of Your Information
an image <img src="/a.png" alt="the alt of it"> in a heading
  → An Image <img src="/a.png" alt="the alt of it"> in a Heading
über den wolken und <strong>der</strong> stadt
  → Über Den Wolken Und <strong>Der</strong> Stadt
```

### `layouts/_partials/utilities/GetPageFlag.html` — generic per-type flag resolver

```go-html-template
{{ partial "utilities/GetPageFlag.html" (dict "page" . "name" "readingTime" "default" true) }}
```

Precedence, highest first: **per-page, then per-type, then global, then the caller's
default.** Implemented as successive overrides in the reverse of that order, mirroring
`GetIncludeToc.html` including its `printf "%T"` bool check and `errorf` on a bad value.

| Source | Example |
| --- | --- |
| caller's `default` | `true` |
| global | `site.Params.pages.readingTime` |
| per type | `site.Params.pages.blog.readingTime` |
| per page | frontmatter `readingTime` |

Generic rather than a `GetReadingTime.html` / `GetWordCount.html` pair, so
`GetIncludeToc` can migrate onto it later without adding a third near-identical file.

## Work breakdown

Two pull requests. Both `feat:` — hinode merge-commits PRs, so semantic-release reads
branch commits, and each PR needs at least one `feat:` to produce a minor.

### PR 1 — reconcile title casing (D-12)

| File | Change |
| --- | --- |
| `layouts/_partials/utilities/TitleCase.html` | new |
| `layouts/_markup/render-heading.html` | call the partial on `.Text`; drop `$titleCase` (line 3) and the `title-case` class (line 24); update the class-list comment |
| `assets/scss/common/_styles.scss:107-116` | delete the `.title-case` rule and its comment block |
| 17 templates, 23 sites | replace inline `and site.Params.main.titleCase (not …exact)` guards with the partial |

`grep -rc site.Params.main.titleCase layouts/` reports 24 occurrences across 18 files; one
of each is `render-heading.html`, covered by its own row above. The remaining 23, by file:
`header.html`, `docs/header.html`, `minimal/header.html`,
`tags/list.html`, `_partials/head/seo.html` (×2), `_partials/page/taxonomy-list.html`,
`_partials/page/taxonomy-tag.html`, `_partials/assets/image.html`,
`_partials/assets/link.html`, `_partials/assets/section-title.html`,
`_partials/assets/card.html`, `_partials/assets/breadcrumb.html` (×3),
`_partials/assets/sidebar.html` (×4), `_partials/assets/helpers/navbar-item.html`,
`_partials/assets/args.html`, `_partials/footer/social.html`, `_shortcodes/link.html`.

Four different spellings of the `exact` lookup collapse into one:
`.Page.Params.exact`, `$.Page.Params.exact`, `$args.page.Params.exact`, `$args.exact`.

`_partials/assets/image.html:41` additionally drops its `(eq $caption (plainify $caption))`
condition. That guard exists only to skip captions containing markup — exactly what the
new partial handles. Captions with markup begin receiving title case; intentional, and
noted in the release.

### PR 2 — switch-placement consistency (D-14 + items 3 and 4)

| File | Change |
| --- | --- |
| `layouts/_partials/utilities/GetPageFlag.html` | new |
| `layouts/_partials/page/metadata.html:4-5` | resolve `readingTime` / `wordCount` through it — closes D-14, and adds per-page overrides they lack today |
| `layouts/_partials/page/metadata.html:10` | gate the lastmod branch on `ne $metadata "original"` — implements the documented behavior |
| `layouts/header.html:36`, `layouts/docs/header.html:34` | read `.Scratch.Get "includeToc"` instead of re-deriving inline |

## Verification

hinode had no template test harness — `pnpm test` ran lint only, and `tests/visual/`
contained nothing but stray `node_modules`. This work introduces a minimal one at
`tests/templates/`: a Hugo site that mounts the partials under test via relative
`[[module.mounts]]` entries and calls `errorf` on a failed assertion, which exits Hugo
non-zero. No test runner or new dependency is involved. It is wired into CI through the
workflow's `build-command`, the only hook in the shared reusable workflow that runs with
Hugo available.

Beyond those unit assertions, verification is build-and-assert against the exampleSite.

**Per PR:**

1. `pnpm build:example`, then assert on rendered HTML in `exampleSite/public/`:
   - PR 1: `cookies/index.html` contains `Types of Cookies We Use`;
     `privacy/index.html` contains `Use of Your`; `blog/first-post/index.html` retains its
     `<code>` element with casing applied around it; no `class="title-case"` anywhere.
   - PR 2: with `pages.blog.readingTime = false` added to the exampleSite config, blog
     posts omit reading time while keeping the date and word count; `metadata = "original"`
     suppresses the modification date; `pages.blog.includeToc = false` renders neither the
     sidebar TOC nor the mobile dropdown. These config additions are local scaffolding for
     the assertion run and are reverted before commit — the exampleSite ships unchanged.
2. A throwaway Hugo site exercising `TitleCase.html` over the 14 adversarial inputs
   already collected (tags, entities, `<img>` with `alt`, emoji, multibyte, double spaces,
   hyphens, `AT&T`, bare `<` and `&`).
3. `pnpm lint`.
4. A `titleCaseStyle = "go"` build, confirming the migration escape reproduces today's
   heading output.
5. Build gethinode.com against the branch. It sets `titleCase = true`
   (`config/_default/params.toml:8`), so its headings shift; this is the dogfood check
   before release.

## Migration

Sites preferring today's heading behavior set `titleCaseStyle = "go"` in Hugo config.
Verified equivalent: `Set Up A Project And Environments`, `State-Of-The-Art Tooling`. No
new theme parameter is needed, and `exact: true` remains the per-page escape.

The `.title-case` class stops being emitted. It is not in the PurgeCSS safelist and has no
other consumer inside hinode, but downstream sites or modules that style it will find the
hook gone; the release note must say so.

## Deliberately unchanged

- **Locale-aware capitalization is lost.** CSS `capitalize` uses the `lang` attribute;
  Go's AP casing does not. This matters for Turkish dotted-i. Accepted, because AP-style
  casing on Turkish content is already wrong, and hinode's exampleSite disables
  `titleCase` for its non-English variants.
- **`<code>` contents still get cased.** `<code>npm</code>` → `<code>Npm</code>`. This
  matches today's CSS behavior exactly; changing it is a separate question.
- **The `GetIncludeToc.html` / `GetIncludeTOC.html` casing mismatch.** `baseof.html:29`
  calls `GetIncludeToc.html`; the file is `GetIncludeTOC.html`. It works via Hugo's
  lowercased partial lookup. Cosmetic; out of scope.
- **Migrating `GetIncludeToc` and `GetMetadata` onto `GetPageFlag`.** Deferred.
- **Documentation.** Lives in gethinode.com, not hinode. A follow-up PR there must drop
  the `titleCaseStyle` caveat from the `titleCase` row (`layout.md:83`) and add
  `readingTime` / `wordCount` rows with cascade semantics to the `pages` table
  (`layout.md:366`). Sequenced after the hinode release.
