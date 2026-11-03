// Drives Bookshop's live-editing Hugo renderer (@bookshop/hugo-engine's hugo_renderer.wasm) from
// Node, so templates can be tested in the Hugo that CloudCannon's Live Editor runs.
//
// To reuse it, e.g. from hinode or mod-blocks, copy this file into your repo: a Hugo project's
// vendored copy of this module (hugo mod vendor) leaves tests/ out. The file imports only
// Node.js built-ins and @bookshop/hugo-engine, so add @bookshop/hugo-engine to your own
// devDependencies, pinned to an exact version as this repo pins it, or pass engineDir.
// Node.js must require() an ES module without a flag (v22.12.0 or later on Node 22), since the
// harness loads the engine's wasm_exec.js that way.
//
//   import {createRenderer, readTree} from './harness.mjs';
//   const renderer = await createRenderer({files: {
//     ...readTree('layouts', 'layouts'), // partials, keyed the way Bookshop keys its extraFiles
//     ...readTree('data', 'data'),       // data files, as Bookshop's extraFiles and storeInfo supply them
//   }});
//   const {error, output} = renderer.render('{{ partial "utilities/GetData.html" . }}');
//   renderer.close(); // when done, or the process does not exit
//
// The renderer is one Go program per process with one in-memory file system, so every
// createRenderer call returns the same instance and files stay written until overwritten.
// Its file API takes UTF-8 text only: a binary file such as an image arrives corrupted, so
// resourceStub below supplies images through base64 instead.
import {readdirSync, readFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {gunzipSync} from 'node:zlib';

// The site config Bookshop's engine writes (Engine.initializeHugo and Engine.storeMeta).
export const bookshopConfig = [
	'params.env_bookshop_live = true',
	'markup.goldmark.renderer.unsafe = true',
	'disableKinds = ["taxonomy", "term", "RSS", "sitemap", "robotsTXT", "404"]',
].join('\n');

const defaultEngineDir = () => path.dirname(fileURLToPath(import.meta.resolve('@bookshop/hugo-engine')));

// Returns every file below dir as {'<prefix>/<path relative to dir>': content}, with forward
// slashes on every OS. Image files are skipped, since the renderer cannot take them.
export function readTree(dir, prefix) {
	const files = {};
	for (const entry of readdirSync(dir, {recursive: true, withFileTypes: true})) {
		if (!entry.isFile() || /\.(?:avif|bmp|gif|ico|jpe?g|png|tiff?|webp)$/i.test(entry.name)) continue;
		const full = path.join(entry.parentPath, entry.name);
		const rel = path.relative(dir, full).split(path.sep).join('/');
		files[`${prefix}/${rel}`] = readFileSync(full, 'utf8');
	}

	return files;
}

// Returns the files that replace utilities/GetResource.html with a stub resolving each url in
// images ({url: path to an image file}) to that image, decoded inside the renderer from base64
// data. Use it to reach a partial's image code (e.g. GetImage) in the renderer. Any other url
// resolves to nothing.
export function resourceStub(images) {
	const data = {};
	for (const [url, file] of Object.entries(images)) data[url] = readFileSync(file).toString('base64');
	return {
		'data/harness_images.json': JSON.stringify(data),
		'layouts/_partials/utilities/GetResource.html': [
			'{{ $res := "" }}',
			'{{ with index (site.Data.harness_images | default dict) .url }}',
			'    {{ $res = resources.FromString $.url (base64Decode .) }}',
			'{{ end }}',
			'{{ return $res }}',
		].join('\n'),
	};
}

let instance;

// Loads the renderer and returns {write, build, read, render, close}. files are written before the
// renderer reads its config: a data file written into a data folder that did not exist at that
// point is invisible to site.Data.
export async function createRenderer({engineDir = defaultEngineDir(), config = bookshopConfig, files = {}} = {}) {
	if (instance) return instance;

	const g = globalThis;
	g.window ??= g;
	g.self ??= g;
	createRequire(import.meta.url)(path.join(engineDir, 'full-hugo-renderer', 'wasm_exec.js'));
	const go = new g.Go();
	const bytes = gunzipSync(readFileSync(path.join(engineDir, 'full-hugo-renderer', 'hugo_renderer.wasm.gz')));
	const {instance: wasm} = await WebAssembly.instantiate(bytes, go.importObject);
	go.run(wasm);
	for (let waited = 0; !g.buildHugo; waited += 10) {
		if (waited > 15_000) throw new Error('Hugo WASM did not register buildHugo');
		await new Promise((resolve) => {
			setTimeout(resolve, 10);
		});
	}

	const write = (entries) => {
		const error = g.writeHugoFiles(JSON.stringify(entries));
		if (error) throw new Error(`writeHugoFiles: ${error}`);
	};

	// Builds the site. Returns {error, logs}: error is the build error (null on success), logs
	// the renderer's log lines.
	const build = () => {
		g.hugo_wasm_logging = [];
		const error = g.buildHugo() || null;
		return {error: error && String(error), logs: g.hugo_wasm_logging || []};
	};

	// Returns {path: content} for the given output paths, e.g. 'public/index.html'.
	const read = (paths) => g.readHugoFiles(JSON.stringify(paths));

	write({...files, 'config.toml': config, 'layouts/all.html': 'x', 'content/_index.md': '{}\n'});
	const initError = g.initHugoConfig();
	if (initError) throw new Error(`initHugoConfig: ${initError}`);

	let nonce = 0;
	// Renders template as the layout of a page of its own (content/harness-render.md, type
	// harness-render), with params as the page's JSON front matter, much as Bookshop renders a
	// component into a page. Its own page type keeps a site's layouts (e.g. a home layout) from
	// taking precedence over the template. Returns {error, logs, output}, where output is the
	// rendered page without the harness's markers.
	const render = (template, params = {}) => {
		nonce += 1;
		// The markers keep the output non-empty and tie it to this render: the renderer does not
		// replace an output file when a render's output is empty, so an unmarked read could
		// return a previous render's output.
		const begin = `<harness-${nonce}>`;
		const end = `</harness-${nonce}>`;
		write({'layouts/harness-render/single.html': `${begin}${template}${end}`});
		write({'content/harness-render.md': `${JSON.stringify({...params, type: 'harness-render'})}\n`});
		const {error, logs} = build();
		if (error) return {error, logs, output: null};
		const file = 'public/harness-render/index.html';
		const html = read([file])[file] ?? '';
		const from = html.indexOf(begin);
		const to = html.lastIndexOf(end);
		if (from === -1 || to === -1) throw new Error(`render ${nonce} left no output: ${html.slice(0, 200)}`);
		return {error: null, logs, output: html.slice(from + begin.length, to)};
	};

	// Cancels the Go runtime's pending timers. Without this, a process that loaded the renderer
	// does not exit, since the runtime keeps a timer scheduled. Call it once the tests are done.
	const close = () => {
		for (const id of go._scheduledTimeouts.values()) clearTimeout(id);
		go._scheduledTimeouts.clear();
	};

	instance = {write, build, read, render, close};
	return instance;
}
