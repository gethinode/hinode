# Versioned documentation for gethinode.com

**Date:** 2026-07-14
**Status:** Design direction — approved for planning, not yet scheduled
**Driver:** The Bootstrap 6 release (pre-alpha) will force a breaking Hinode major. The
documentation site must serve two release lines at once, without freezing development on
either.

## Problem

gethinode.com documents exactly one generation of the theme. When Bootstrap 6 lands, the
site must serve the current release (Bootstrap 5) and the next one simultaneously, and it
must keep doing so through a migration window.

An earlier attempt exists in the `version-demo` repository. It works, but it has decayed and
is no longer maintained. Understanding *why* it decayed shapes this design more than the
choice of hosting topology does.

## Constraints

These are properties of the existing architecture, not preferences. They were verified
against the repositories on 2026-07-14.

**Build isolation is mandatory.** The docs are not ordinary content: 57 pages in `mod-docs`
render live `{{< example >}}` blocks *through the very theme they document*, and
gethinode.com sets `docs.basePath = "_vendor/github.com/gethinode/hinode/v3"`, so reference
pages read argument definitions straight out of the vendored theme source. A Hugo build can
therefore contain exactly one theme generation. The approach used by most documentation
frameworks — version the content, share the chrome — is unavailable to us: old docs cannot
be re-rendered by a new theme without misrepresenting, or crashing on, the components they
demonstrate.

**The theme and the docs are already versioned artifacts.** Hugo modules resolve by tag, and
Go semantic import versioning makes `hinode/v3` and `hinode/v4`, `mod-docs` and
`mod-docs/v2`, distinct module paths. A "version of the site" is therefore nothing more than
a `go.mod` pinning a generation. Only gethinode.com needs branches; the theme and the docs
content do not need long-lived forks to be consumed.

**`netlify.toml` is generated, not authored.** It is rendered by `pnpm run build:headers`
from the Hugo `headers` segment (`mod-csp/layouts/index.netlify.toml`), scaffolded by
`data/netlify.toml` and merged with `[modules.hinode.csp]` in `params.toml`. It must never
be hand-edited. gethinode.com already ships its own `data/netlify.toml`, which overrides the
mod-csp scaffold — so build-context changes are a site-local, one-file change.

## Decisions taken

**Lifecycle: short overlap, then retire.** The Bootstrap 5 docs stay live for a migration
window (roughly 6–12 months after the v4 GA), then are retired. We never need a deep
archive — at most two live lines at any time. This rules out permanently version-prefixing
every documentation URL (the Bootstrap `/docs/5.3/` scheme) as over-engineering, and it caps
the cost of splitting origins, because the split is temporary by construction.

**The next line is public and listed.** During the Bootstrap 6 pre-alpha and beta, the v4
docs are published to a first-class endpoint, reachable from the version selector on the
stable site, and excluded from search indexing. Early adopters can browse and migrate, and
the deploy pipeline is exercised long before the riskiest moment.

## Options considered

**Single origin via Netlify proxy rewrites.** Same branches, but each non-production line is
built with a prefixed `baseURL` and surfaced through a `status = 200` proxy from the root
site. Buys one analytics property, one consent banner, one CSP, and same-origin version
switching. Costs a proxy hop billed against the root site's bandwidth, unverified header
precedence on proxied responses, and a rebuild of the "frozen" line at flip time. Rejected:
it earns its keep only if versions are permanent, and ours are not — we would build a proxy
layer and delete it within a year.

**Monorepo, two builds, one deploy.** Keep the legacy line as a subdirectory project with
its own `go.mod`; build both in one Netlify command and copy the old output under
`public/v3/`. Structurally elegant — single origin without a proxy, and a version list that
is incapable of going stale because both versions always deploy together. Rejected: every
deploy of the current docs rebuilds the old ones, so a break in the legacy build blocks the
current site's deploy, and both lines are forced onto one Hugo/Node/dart-sass version —
precisely the coupling Bootstrap 6 will strain.

**A separate Netlify site per line.** Rejected: a branch deploy already carries its own
`netlify.toml`, so a second site buys nothing and adds another thing to monitor.

**Freeze to static.** Not a rival topology — it is the *exit stage*, and it composes with the
recommendation below. Naming it explicitly matters, because "how does this end" is the
question the existing concept never answered, and that is why it rotted.

## Design

### Topology

One Netlify site, with branch deploys enabled and the domain on Netlify DNS. Netlify's
automatic deploy subdomains (generally available) then serve each deployed branch at
`<branch>.gethinode.com`, provisioning wildcard DNS and SSL automatically.

Long-lived **release-line branches** on gethinode.com — not feature branches. Each pins a
generation in `go.mod` and nothing more:

| Context | Branch | Endpoint | `docs.status` |
| --- | --- | --- | --- |
| production | `main` | `gethinode.com` | `current` |
| branch deploy | `next` | `next.gethinode.com` | `preview` |
| branch deploy (from GA) | `v3` | `v3.gethinode.com` | `outdated` |
| deploy preview | pull requests | ephemeral | inherited from base |

Feature branches are unchanged, and this is what makes the scheme pleasant to work in: **a
feature branch's release line is simply its pull-request base.** A fix for the current
release targets `main`; Bootstrap 6 work targets `next`. Each pull request gets its usual
deploy preview, built against whichever generation its base branch pins — so a Bootstrap 6
pull request previews with Bootstrap 6, automatically, with no extra configuration.

`main` and `next` never merge into each other in the normal course. They are two parallel
pins of the module graph, and `next` lands on `main` exactly once, at GA.

The same branching shape applies one level down in `mod-docs`: v1 (Bootstrap 5 docs) stays on
`main`, v2 develops on a branch and takes the `/v2` module path, and becomes `main` at GA
while v1 moves to a maintenance branch. Backporting a docs fix is then the same operation at
both layers: commit to the maintenance branch, tag, bump `go.mod` on the corresponding site
line.

### Mechanisms

The topology is the easy part. Three mechanisms decide whether this survives contact with
reality, and all three are things the existing concept lacks.

**1. A single `status` param per line.** `params.docs.status` takes one of `current`,
`preview`, or `outdated`, and drives *everything* conditional: the `noindex` robots meta,
sitemap exclusion, the canonical URL, and an in-page banner ("You are reading the
documentation for a preview release"). One param, one line to change at the flip, and the
state of every deploy is auditable at a glance.

This is the cheapest and highest-leverage piece of the design. Splitting origins has exactly
one serious failure mode — search engines indexing a preview or superseded line and sending
users to the wrong version — and this param is what prevents it. Without it, the guard is a
handful of unrelated conditionals that someone must remember to flip in the right order.

**2. `versions.json` as the single source of truth for the version list.** The current
concept pins `redirect = "https://v0-9--gethinode-version-demo.netlify.app/docs/0.9/"` — a
hardcoded deploy URL, baked into a `docs.releases` list that lives in *each branch's*
`params.toml`. That design guarantees decay: every branch holds its own copy of the truth,
and a frozen branch can never be corrected. This is the actual reason the existing concept
rotted, and it would rot again under any topology.

The fix: the apex publishes `versions.json` from a single data file. The version selector
stays **server-rendered and baked** — it works with JavaScript disabled, and the baked list
is the fallback. A small script then fetches `versions.json` from the apex and uses it to
keep the *pointer to the current release* honest: refreshing the dropdown entries, and
driving the "a newer release is available" banner link. If the fetch fails — offline, CSP,
apex moved — nothing happens and the baked list stands.

Deliberately scoped: JavaScript does **not** re-render the whole dropdown. Doing so would
mean shuttling the i18n strings, the active-item marker, and the header/divider structure out
to JavaScript and rebuilding markup Hugo already knows how to build. Keeping the render in
Hugo keeps this to roughly a custom output format, ~30 lines of JavaScript, and one CSP
entry.

The rule that keeps it from growing: **`versions.json` is generated from the same data file
that renders the baked dropdown.** One source, two consumers. The moment those diverge we are
back to version-demo's failure mode with extra steps.

The payoff is the endgame. Because the fetch is client-side, even a frozen, never-rebuilt v3
snapshot can still route a visitor to the current documentation — indefinitely, without a
rebuild. Without it, "retire" means "leave dead ends on the internet".

**3. Derive `docs.basePath`.** `"_vendor/github.com/gethinode/hinode/v3"` is a v3 literal
sitting in `params.toml`. On the v4 line it silently points at a tree that does not exist,
and reference pages degrade quietly instead of failing loudly. It must be derived from the
module graph, or reduced to a single version token used in one place.

### Supporting changes

**Branch `baseURL`.** The generated `[context.branch-deploy]` builds with
`-b $DEPLOY_PRIME_URL`, which resolves to `next--gethinode.netlify.app`, **not**
`next.gethinode.com`. Left as-is, every canonical URL and absolute link on a release-line
deploy points at the wrong host — the same class of rot that hardcoded a `netlify.app` URL
into version-demo's config.

Fix in gethinode.com's own `data/netlify.toml` (which already overrides the mod-csp scaffold)
by making the branch command fall back rather than assume:

```text
command = 'pnpm install && pnpm run build -- -b "${SITE_BASEURL:-$DEPLOY_PRIME_URL}"'
```

`SITE_BASEURL` is then set per branch as a branch-scoped environment variable in the Netlify
UI. Deploy previews, which have no such variable, keep `$DEPLOY_PRIME_URL` and continue to
work unchanged. No per-version template churn, and no upstream mod-csp change.

**CSP.** `connect-src` is currently `'self' …`; on a subdomain, `'self'` is the subdomain, so
the release-line deploys need the apex added in order to fetch `versions.json`. The
cross-origin side already works — the site sends `Access-Control-Allow-Origin: *`. The
`frame-ancestors` list needs the new subdomains. Both changes go into
`[modules.hinode.csp]` in `params.toml` and are picked up by `pnpm run build:headers` —
never by editing `netlify.toml`.

Freshness of `versions.json` is currently guaranteed by the site-wide
`cache-control: max-age=0, no-cache, no-store, must-revalidate` header. That is fine as-is,
but the guarantee *comes from that header* — if it is ever relaxed, `versions.json` needs an
explicit exemption.

**Version switching and 404s.** The selector switches to the *same path* on the target line.
After the GA flip, a v3-only page has no v4 counterpart and will 404 at its old URL. Rather
than maintain a redirect map by hand, the 404 page becomes version-aware: it offers the same
path on the other live line. This degrades gracefully and needs no upkeep.

### Where the code lives

The mechanisms belong in the **theme**, not the site: the selector partial
(`layouts/_partials/assets/helpers/navbar-versions.html`), the `status` param, the
`versions.json` output format, and the version-aware 404 are all Hinode. Other Hinode users
inherit versioning as a feature.

gethinode.com contributes only the branch topology, the `go.mod` pins, `data/netlify.toml`,
and the CSP entries.

**This ordering is a hard scheduling constraint:** the theme work must ship in a v3 release
that the stable line can consume *before* the GA flip. A frozen v3 snapshot can only
self-heal if it was built with the hydration script already in it.

### Lifecycle

**Now.** Land the theme mechanisms in a v3 release. Cut `next` on gethinode.com pinned to the
Bootstrap 6 prerelease modules; enable the branch deploy and `next.gethinode.com`; set its
status to `preview`.

**At GA.** Cut `v3` from `main`'s last v3 commit — it begins deploying to `v3.gethinode.com`
with status `outdated`. Merge `next` into `main`; the apex flips to v4. The whole flip is a
merge plus a branch cut, and it is revertable by reverting the merge.

**At retirement.** Freeze or redirect `v3.gethinode.com`. Because the version list is fetched
client-side, a frozen snapshot keeps routing visitors to the live documentation even with no
build pipeline behind it.

## To verify before implementation

- **Is gethinode.com on Netlify DNS?** Automatic deploy subdomains require it (a delegated
  standalone subdomain also works). This is the one hard prerequisite for the recommended
  topology; everything else has a fallback.
- If a custom TLS certificate is ever adopted, it must list each deploy subdomain
  explicitly — wildcard syntax does not cover them.
- Confirm Netlify branch-scoped environment variables apply to branch deploys as expected, so
  `SITE_BASEURL` resolves per line.

## Out of scope

- Versioning demo.gethinode.com (the theme's own exampleSite deploy).
- Any permanent multi-version archive. The lifecycle decision is explicitly "retire", and
  the design should not be stretched to support versions that outlive their migration window.
- Localised version selectors beyond what the existing partial already handles.

## References

- [Configure an automatic subdomain for deploys](https://docs.netlify.com/manage/domains/configure-domains/configure-an-automatic-subdomain-for-deploys/)
- [Automatic deploy subdomains — generally available](https://www.netlify.com/blog/automatic-deploy-subdomains-ga/)
- [Delegate a standalone subdomain](https://docs.netlify.com/manage/domains/configure-domains/delegate-a-standalone-subdomain/)
- Prior art: `gethinode/version-demo` (outdated, unmaintained)
