// Builds the tests/feeds fixture and reads the RSS feeds that layouts/rss.xml writes for the
// home page, a section, the tags taxonomy and two of its terms, in English with a limit and in
// Dutch without one. A page whose robots setting is noindex or none must be absent from every
// feed, the RSS limit must count only the pages that are listed, and lastBuildDate must come
// from those pages alone. A feed whose pages are all noindex must still build, without items
// and without a lastBuildDate.
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
