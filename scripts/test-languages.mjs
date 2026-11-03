#!/usr/bin/env node
// Builds the tests/languages fixture once per environment: without versions or roles, with
// the versions and the roles overlays under tests/languages/config, and with English only.
// hugo.Sites holds one site per language, version and role, so only the versions and roles
// overlays show whether a partial that reads the languages or pages from hugo.Sites repeats
// them.
//
// The fixture's own templates fail the build (errorf) when utilities/GetLanguages.html,
// assets/download.html, page/sharing.html, assets/helpers/navbar-languages.html,
// assets/helpers/GetDimension.html or the abbr shortcode disagree with the deprecated APIs they
// replace. This script also compares every _redirects file that layouts/index.redir writes with
// the allpages file beside it, which the fixture writes through site.AllPages, and checks that
// head/head.html declares the language exactly when the site has more than one. A last build,
// in the quiet environment, renders the partials without those comparisons and fails on any
// deprecation it logs.
// Run with: node scripts/test-languages.mjs (after pnpm mod:vendor).
import {spawnSync} from 'node:child_process';
import {mkdtempSync, readdirSync, readFileSync, rmSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import process from 'node:process';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = path.join(root, 'tests', 'languages');
const environments = ['development', 'versions', 'roles', 'monolingual'];

let failed = false;
for (const environment of environments) {
	const destination = mkdtempSync(path.join(os.tmpdir(), `hinode-languages-${environment}-`));
	try {
		// One command string through the shell, as package.json runs hugo.
		const command = `hugo -s "${site}" --logLevel error --environment ${environment} -d "${destination}"`;
		const result = spawnSync(command, {cwd: root, encoding: 'utf8', shell: true});
		if (result.error) throw result.error;
		if (result.status !== 0) {
			process.stdout.write(result.stdout ?? '');
			process.stderr.write(result.stderr ?? '');
			console.error(`FAIL: build in environment '${environment}'`);
			failed = true;
			continue;
		}

		const before = failed;
		const redirects = readdirSync(destination, {recursive: true})
			.filter((file) => path.basename(file) === '_redirects')
			.sort();
		if (redirects.length === 0) {
			console.error(`FAIL: no _redirects written in environment '${environment}'`);
			failed = true;
		}

		for (const file of redirects) {
			const got = readFileSync(path.join(destination, file), 'utf8');
			const want = readFileSync(path.join(destination, path.dirname(file), 'allpages'), 'utf8');
			if (want.trim() === '') {
				console.error(`FAIL: ${environment}: the site.AllPages oracle beside ${file} is empty`);
				failed = true;
			} else if (got !== want) {
				console.error(`FAIL: ${environment}: ${file} differs from site.AllPages:`);
				console.error(`--- got\n${got}--- want\n${want}`);
				failed = true;
			}
		}

		// head/head.html, run by the fixture's home pages, declares the language only when the
		// site has more than one; the monolingual environment has one.
		const multilingual = environment !== 'monolingual';
		const homes = readdirSync(destination, {recursive: true})
			.filter((file) => path.basename(file) === 'index.html')
			.filter((file) => readFileSync(path.join(destination, file), 'utf8').includes('<head-test>'));
		if (homes.length === 0) {
			console.error(`FAIL: ${environment}: no home page ran the head block`);
			failed = true;
		}

		for (const file of homes) {
			const head = readFileSync(path.join(destination, file), 'utf8').split('<head-test>')[1];
			if (/<meta name="lang" content="[^"]+">/.test(head) !== multilingual) {
				console.error(`FAIL: ${environment}: ${file}: the head ${multilingual ? 'lacks' : 'has'} the lang meta`);
				failed = true;
			}
		}

		if (failed === before) console.log(`${environment}: PASS (${redirects.length} _redirects files)`);
	} finally {
		rmSync(destination, {recursive: true, force: true});
	}
}

// Last, the partials alone at log level info: the comparisons above call the deprecated APIs
// themselves, so only this build shows whether the partials, or the fixture's config, still
// use one.
{
	const destination = mkdtempSync(path.join(os.tmpdir(), 'hinode-languages-quiet-'));
	try {
		const command = `hugo -s "${site}" --logLevel info --environment quiet -d "${destination}"`;
		const result = spawnSync(command, {cwd: root, encoding: 'utf8', shell: true});
		if (result.error) throw result.error;
		const log = `${result.stdout ?? ''}${result.stderr ?? ''}`;
		const deprecated = log.split('\n').filter((line) => /deprecated/i.test(line));
		if (result.status !== 0) {
			process.stdout.write(log);
			console.error('FAIL: build in environment \'quiet\'');
			failed = true;
		} else if (deprecated.length > 0) {
			console.error(`FAIL: quiet: the build logs deprecations:\n${deprecated.join('\n')}`);
			failed = true;
		} else {
			console.log('quiet: PASS (no deprecation logged)');
		}
	} finally {
		rmSync(destination, {recursive: true, force: true});
	}
}

if (failed) process.exit(1);
