// Builds the tests/feeds fixture and reads the RSS feeds that layouts/rss.xml writes for the
// home page, a section, the tags taxonomy and two of its terms, in English with a limit and in
// Dutch without one. A page whose robots setting is noindex or none must be absent from every
// feed, the RSS limit must count only the pages that are listed, and lastBuildDate must come
// from those pages alone. A feed whose pages are all noindex must still build, without items
// and without a lastBuildDate.
// The dates subfixture also checks effective term metadata, typed overrides and per-language
// sitemap URL sets. Ordinary page dates and the existing listing rules stay unchanged.
// Run with: node --test scripts/test-feeds.mjs
import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {mkdtempSync, readFileSync, rmSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {after, before, test} from 'node:test';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'tests', 'feeds');
const base = 'https://example.org';

let destination;
before(() => {
	destination = mkdtempSync(path.join(os.tmpdir(), 'hinode-feeds-'));
	// One command string through the shell, as package.json runs hugo.
	const command = `hugo -s "${site}" --logLevel error -d "${destination}"`;
	const result = spawnSync(command, {cwd: root, encoding: 'utf8', shell: true});
	if (result.error) throw result.error;
	assert.equal(result.status, 0, `hugo build failed:\n${result.stdout}\n${result.stderr}`);
});

after(() => {
	if (destination) rmSync(destination, {recursive: true, force: true});
});

// Returns the item links and the lastBuildDate of the feed at rel below the build output.
function readFeed(rel) {
	const xml = readFileSync(path.join(destination, rel, 'index.xml'), 'utf8');
	const items = [...xml.matchAll(/<item>[\s\S]*?<link>([^<]*)<\/link>[\s\S]*?<\/item>/g)].map(m => m[1]);
	const lastBuildDate = xml.match(/<lastBuildDate>([^<]*)<\/lastBuildDate>/)?.[1];
	return {xml, items, lastBuildDate};
}

const page = name => `${base}/posts/${name}/`;

test('home feed lists the newest indexable pages up to the limit', () => {
	const feed = readFeed('');
	assert.deepEqual(feed.items, [page('d'), page('c'), page('b')]);
	assert.equal(feed.lastBuildDate, 'Sun, 04 Jan 2026 00:00:00 +0000');
});

test('section feed lists the newest indexable pages up to the limit', () => {
	const feed = readFeed('posts');
	assert.deepEqual(feed.items, [page('d'), page('c'), page('b')]);
	assert.equal(feed.lastBuildDate, 'Sun, 04 Jan 2026 00:00:00 +0000');
});

test('term feed leaves out a noindex page that carries the term', () => {
	const feed = readFeed('tags/shared');
	assert.deepEqual(feed.items, [page('b'), page('a')]);
	assert.equal(feed.lastBuildDate, 'Fri, 02 Jan 2026 00:00:00 +0000');
});

test('taxonomy feed leaves out a noindex term', () => {
	const feed = readFeed('tags');
	assert.deepEqual(feed.items, [`${base}/tags/shared/`]);
	assert.equal(feed.lastBuildDate, 'Fri, 02 Jan 2026 00:00:00 +0000');
	assert.match(feed.xml, /<pubDate>Fri, 02 Jan 2026 00:00:00 \+0000<\/pubDate>/);
});

for (const rel of ['empty', 'tags/secret']) {
	test(`feed of ${rel}, whose pages are all noindex, builds without items or lastBuildDate`, () => {
		const feed = readFeed(rel);
		assert.match(feed.xml, /<channel>/);
		assert.deepEqual(feed.items, []);
		assert.equal(feed.lastBuildDate, undefined);
	});
}

test('feed of undated, whose node has no date, lists its page without lastBuildDate', () => {
	const feed = readFeed('undated');
	assert.deepEqual(feed.items, [`${base}/undated/page/`]);
	assert.equal(feed.lastBuildDate, undefined);
});

test('feed of mixed, whose only dated page is noindex, lists its undated page without lastBuildDate', () => {
	const feed = readFeed('mixed');
	assert.deepEqual(feed.items, [`${base}/mixed/undated/`]);
	assert.equal(feed.lastBuildDate, undefined);
});

test('feed of own-lastmod, whose node Hugo leaves undated, lists its dated page without lastBuildDate', () => {
	// Hugo's embedded template leaves lastBuildDate out when the feed's own date is zero.
	const feed = readFeed('own-lastmod');
	assert.deepEqual(feed.items, [`${base}/own-lastmod/page/`]);
	assert.equal(feed.lastBuildDate, undefined);
});

test('Dutch home feed, whose only dated page is noindex, lists its undated pages without lastBuildDate', () => {
	const feed = readFeed('nl');
	assert.deepEqual(feed.items, [
		...['a', 'b', 'c', 'd'].map(name => `${base}/nl/posts/${name}/`),
		`${base}/nl/undated/page/`,
	]);
	assert.equal(feed.lastBuildDate, undefined);
});

test('Dutch section feed, whose limit is -1, lists every indexable page', () => {
	const feed = readFeed('nl/posts');
	assert.deepEqual(feed.items, ['a', 'b', 'c', 'd'].map(name => `${base}/nl/posts/${name}/`));
});

test('a translation is checked on its own robots setting, not on its counterpart', () => {
	assert.deepEqual(readFeed('mixed').items, [`${base}/mixed/undated/`]);
	assert.deepEqual(readFeed('nl/mixed').items, []);
});

test('no feed names a noindex page', () => {
	for (const rel of ['', 'posts', 'empty', 'undated', 'mixed', 'own-lastmod', 'tags', 'tags/shared', 'tags/secret', 'nl', 'nl/posts', 'nl/mixed', 'nl/undated']) {
		const {xml} = readFeed(rel);
		assert.doesNotMatch(xml, /hidden|Hidden/, `feed ${rel || '/'} names a noindex page`);
	}
});

let dateDestination;
before(() => {
	dateDestination = mkdtempSync(path.join(os.tmpdir(), 'hinode-term-dates-'));
	const result = spawnSync('hugo', ['-s', path.join(site, 'dates'), '--logLevel', 'error', '-d', dateDestination], {cwd: root, encoding: 'utf8'});
	assert.equal(result.status, 0, `date fixture build failed:\n${result.stdout}\n${result.stderr}`);
});
after(() => {
	if (dateDestination) rmSync(dateDestination, {recursive: true, force: true});
});

const readDateFile = rel => readFileSync(path.join(dateDestination, rel), 'utf8');
function termItem(name, language = '') {
	const xml = readDateFile(`${language}tags/index.xml`);
	const link = `${base}/${language}tags/${name}/`;
	return [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(m => m[1]).find(item => item.includes(`<link>${link}</link>`));
}
function sitemapEntry(name, language = '') {
	const xml = readDateFile(`${language || 'en/'}sitemap.xml`);
	assert.match(xml, /<urlset\s/, 'read the language URL set, not the sitemap index');
	return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(m => m[1]).find(item => item.includes(`<loc>${base}/${language}tags/${name}/</loc>`));
}
const field = (xml, name) => xml?.match(new RegExp(`<${name}>([^<]*)</${name}>`))?.[1];
const rssDate = date => new Date(`${date}T00:00:00Z`).toUTCString().replace('GMT', '+0000');
function assertTerm(name, expected, language = '') {
	const item = termItem(name, language);
	const entry = sitemapEntry(name, language);
	assert.ok(item, `${language}${name} stays listed in taxonomy RSS`);
	assert.ok(entry, `${language}${name} stays listed in sitemap`);
	assert.equal(field(item, 'pubDate'), expected.publishDate ? rssDate(expected.publishDate) : undefined, `${name} pubDate`);
	assert.equal(field(entry, 'lastmod'), expected.lastmod ? `${expected.lastmod}T00:00:00+00:00` : undefined, `${name} sitemap lastmod`);
	const actual = JSON.parse(readDateFile(`${language}tags/${name}/index.html`));
	for (const key of ['date', 'publishDate', 'lastmod']) {
		assert.equal(actual[key], `${expected[key] || '0001-01-01'}T00:00:00Z`, `${name} helper ${key}`);
	}
}
const derivedDates = {date: '2025-01-03', publishDate: '2025-01-04', lastmod: '2025-01-05'};

test('term dates independently derive from indexable members only', () => {
	assertTerm('derived', derivedDates);
	assert.equal(field(readDateFile('tags/derived/index.xml'), 'lastBuildDate'), rssDate('2025-01-05'));
	// Every listed term has an effective lastmod no later than the branch member.
	assert.equal(field(readDateFile('tags/index.xml'), 'lastBuildDate'), rssDate('2025-02-03'));
});

test('resolved overrides keep full, date-only, partial and aliased term fields', () => {
	assertTerm('full', {date: '2024-01-01', publishDate: '2024-02-01', lastmod: '2024-03-01'});
	assertTerm('date-only', {date: '2024-04-01', publishDate: '2024-04-01', lastmod: '2024-04-01'});
	assertTerm('partial', {...derivedDates, lastmod: '2024-05-01'});
	assertTerm('alias', {...derivedDates, lastmod: '2024-06-01'});
});

test('reserved typed custom date keys override while non-time strings are ignored', () => {
	assertTerm('typed', {date: '2023-01-01', publishDate: '2023-02-01', lastmod: '2023-03-01'});
	assertTerm('typed-partial', {...derivedDates, publishDate: '2023-04-01'});
	assertTerm('custom-string', derivedDates);
});

test('authored and custom typed zeros suppress dates despite inherited native values', () => {
	assertTerm('zero', {});
	assertTerm('typed-zero', {});
	assertTerm('partial-zero', {date: derivedDates.date, publishDate: derivedDates.publishDate});
});

test('terms with no indexable or no dated members remain listed without date elements', () => {
	assertTerm('empty', {});
	assertTerm('missing', {});
	assert.equal(field(readDateFile('tags/empty/index.xml'), 'lastBuildDate'), undefined);
	assert.equal(field(readDateFile('tags/missing/index.xml'), 'lastBuildDate'), undefined);
});

test('branch page members contribute their corresponding dates', () => {
	assertTerm('branch', {date: '2025-02-01', publishDate: '2025-02-02', lastmod: '2025-02-03'});
});

test('same-title terms and language/site robots settings do not share cached dates', () => {
	assertTerm('same-a', derivedDates);
	assertTerm('same-b', {date: '2022-01-01', publishDate: '2022-01-01', lastmod: '2022-01-01'});
	assertTerm('derived', {date: '2021-01-01', publishDate: '2021-01-01', lastmod: '2021-01-01'}, 'nl/');
	assert.equal(field(readDateFile('nl/tags/index.xml'), 'lastBuildDate'), rssDate('2021-01-01'));
	assert.doesNotMatch(readDateFile('nl/sitemap.xml'), /<loc>[^<]*\/nl\/posts\/a\//);
});

test('ordinary page dates, listed order and language sitemap exclusions stay unchanged', () => {
	const xml = readDateFile('posts/index.xml');
	const links = [...xml.matchAll(/<item>[\s\S]*?<link>([^<]*)<\/link>/g)].map(m => m[1]);
	assert.deepEqual(links, ['a', 'b', 'same-b', 'missing'].map(name => `${base}/posts/${name}/`));
	const first = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)][0][1];
	assert.equal(field(first, 'pubDate'), rssDate('2025-01-01'));
	const ordinarySitemap = readDateFile('en/sitemap.xml');
	assert.match(ordinarySitemap, /<loc>https:\/\/example.org\/posts\/a\/<\/loc>\s*<lastmod>2025-01-02T00:00:00\+00:00<\/lastmod>/);
	for (const language of ['en', 'nl']) {
		const sitemap = readFileSync(path.join(destination, language, 'sitemap.xml'), 'utf8');
		assert.match(sitemap, /<urlset\s/);
		assert.doesNotMatch(sitemap, /hidden|Hidden/);
		assert.doesNotMatch(sitemap, /href="https:\/\/example.org\/nl\/mixed\/undated\//);
	}
	// Zero-date ordinary pages retain Hugo's existing pubDate behavior.
	assert.match(xml, /<pubDate>Mon, 01 Jan 0001 00:00:00 \+0000<\/pubDate>/);
});
