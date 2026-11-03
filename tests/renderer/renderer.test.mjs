// Renders the partials and shortcodes that guard a newer Hugo API in Bookshop's live-editing
// renderer (Hugo 0.147.6, see harness.mjs, copied from mod-utils). There each guard has to take
// its old branch: the newer APIs (hugo.Sites, hugo.Data, .Language.Label, .Language.Locale) fail
// in that Hugo, and a failed render breaks live editing for the page.
// Run with: node --test tests/renderer/renderer.test.mjs (after pnpm mod:vendor).
import assert from 'node:assert/strict';
import path from 'node:path';
import {after, before, describe, test} from 'node:test';
import {fileURLToPath} from 'node:url';
import {bookshopConfig, createRenderer, readTree} from './harness.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const vendor = path.join(root, '_vendor', 'github.com', 'gethinode');

// Three languages, so the language partials have more than one to list. French sorts before
// German by weight but after it by name. The names are set through languageName, not label:
// Hugo v0.147.6 predates label.
const config = `${bookshopConfig}
defaultContentLanguage = 'en'
params.sharing.providers = []
[languages.en]
  languageName = 'English'
  weight = 1
[languages.fr]
  languageName = 'Français'
  weight = 2
[languages.de]
  languageName = 'Deutsch'
  weight = 3
`;

let renderer;
before(async () => {
	renderer = await createRenderer({
		config,
		files: {
			// Module files first, so hinode's own files take precedence, as with Hugo's module mounts.
			...readTree(path.join(vendor, 'mod-utils', 'v6', 'layouts'), 'layouts'),
			...readTree(path.join(vendor, 'mod-utils', 'v6', 'data'), 'data'),
			// Only hinode's partials and shortcodes: its page layouts would take over the harness's
			// pages.
			...readTree(path.join(root, 'layouts', '_partials'), 'layouts/_partials'),
			...readTree(path.join(root, 'layouts', '_shortcodes'), 'layouts/_shortcodes'),
			...readTree(path.join(root, 'data'), 'data'),
			...readTree(path.join(root, 'i18n'), 'i18n'),
			// The harness loads no icon module, so a stub stands in for mod-fontawesome's partial.
			'layouts/_partials/assets/icon.html': '',
			// Fixtures for the abbr test below.
			'data/abbr.yml': '- id: cms\n  long: content management system\n',
			'data/abbr.fr.yml': '- id: cms\n  long: système de gestion de contenu\n',
		},
	});
});
after(() => renderer?.close());

describe('renderer', () => {
	test('is the Hugo that Bookshop live editing runs', () => {
		const {error, output} = renderer.render('{{ hugo.Version }}');
		assert.equal(error, null);
		assert.equal(output, '0.147.6');
	});

	test('negative control: an unguarded hugo.Sites fails', () => {
		const {error} = renderer.render('{{ len hugo.Sites }}');
		assert.match(error ?? 'no error', /can't evaluate field Sites/);
	});

	test('negative control: an unguarded .Language.Label fails', () => {
		const {error} = renderer.render('{{ site.Language.Label }}');
		assert.match(error ?? 'no error', /can't evaluate field Label/);
	});

	test('negative control: an unguarded .Language.Locale fails', () => {
		const {error} = renderer.render('{{ site.Language.Locale }}');
		assert.match(error ?? 'no error', /can't evaluate field Locale/);
	});
});

describe('partials in the renderer', () => {
	test('utilities/GetLanguages returns each language once, by weight', () => {
		const {error, output} = renderer.render(
			'{{ range partial "utilities/GetLanguages.html" . }}[{{ .Lang }}]{{ end }}',
		);
		assert.equal(error, null);
		assert.equal(output, '[en][fr][de]');
	});

	// head.html only defines the head block, which baseof.html runs, so a partial call renders
	// nothing. Its language check counts the languages through GetLanguages, tested above.
	test('head/head.html only defines a block', () => {
		const {error, output} = renderer.render('{{ partial "head/head.html" . }}');
		assert.equal(error, null);
		assert.equal(output, '');
	});

	test('assets/helpers/navbar-languages lists every language of an untranslated page', () => {
		const {error, output} = renderer.render(
			'{{ partial "assets/helpers/navbar-languages.html" (dict "page" . "breakpoint" "md") }}',
		);
		assert.equal(error, null);
		const items = [...output.matchAll(/hreflang="([^"]+)">([^<]*)</g)].map((m) => `${m[1]}:${m[2]}`);
		assert.deepEqual(items, ['en:English', 'fr:Français', 'de:Deutsch']);
	});

	// The renderer's fileExists reports no file at all, so download.html and sharing.html fail on
	// any download there before they reach their language code (see the next test). Without a
	// download they render the rest. scripts/test-languages.mjs runs their language code on the
	// current Hugo.
	test('fileExists finds no file in the renderer', () => {
		renderer.write({'harness/exists.txt': 'x'});
		const {error, output} = renderer.render('{{ fileExists "harness/exists.txt" }}');
		assert.equal(error, null);
		assert.equal(output, 'false');
	});

	test('assets/download renders a download button', () => {
		const {error, output} = renderer.render(
			'{{ partial "assets/download.html" (dict "page" . "download" "") }}',
		);
		assert.equal(error, null);
		assert.match(output, /Download/);
	});

	test('page/sharing renders', () => {
		const {error, output} = renderer.render('{{ .Scratch.Set "sharing" true }}{{ partial "page/sharing.html" . }}');
		assert.equal(error, null);
		assert.match(output, /<span class="hstack gap-2 text-body-secondary">/);
	});

	test('assets/helpers/GetDimension reads the dimensions data file', () => {
		const {error, output} = renderer.render(
			'{{ delimit (partial "assets/helpers/GetDimension.html" (dict "ratio" "3x1")) "," }}',
		);
		assert.equal(error, null);
		assert.equal(output, '576x192,768x256,992x331,1200x400,1400x467,2800x933');
	});

	test('the abbr shortcode reads the abbreviation data file, by language first', () => {
		renderer.write({'layouts/harness-abbr/single.html': '{{ .Content }}'});
		const page = '---\ntitle: abbr\ntype: harness-abbr\n---\n{{< abbr "cms" >}}\n';
		// One page per build: the renderer left one of two pages added in the same build unrendered.
		for (const [lang, file, long] of [
			['en', 'public/harness-abbr/index.html', 'content management system'],
			['fr', 'public/fr/harness-abbr/index.html', 'système de gestion de contenu'],
		]) {
			renderer.write({[`content/harness-abbr.${lang}.md`]: page});
			const {error, logs} = renderer.build();
			assert.equal(error, null, logs.join('\n'));
			assert.match(renderer.read([file])[file] ?? '', new RegExp(`title="${long}"`));
		}
	});

	test('navbar-languages labels the translations of a translated page', () => {
		// Written last: the translation stays in the renderer's file system for later renders.
		renderer.write({'content/harness-render.fr.md': '{"type": "harness-render"}\n'});
		const {error, output} = renderer.render(
			'{{ partial "assets/helpers/navbar-languages.html" (dict "page" . "breakpoint" "md") }}',
		);
		assert.equal(error, null);
		const items = [...output.matchAll(/hreflang="([^"]+)" href="[^"]*">([^<]*)</g)].map((m) => `${m[1]}:${m[2]}`);
		assert.deepEqual(items, ['en:English', 'fr:Français']);
	});
});
