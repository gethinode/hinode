#!/usr/bin/env node
// Visual regression harness for the mod-utils v6 adoption program.
// Subcommands: `shoot` (screenshot a built Hugo site) and `compare` (pixelmatch two shoot dirs).
// See tests/visual/README.md for usage and the baseline protocol.

import http from 'node:http';
import fs from 'node:fs/promises';
import fssync from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

// The mod-docs component pages live under /<locale>/docs/components/, not /components/ —
// discovered by inspecting exampleSite/public sitemaps (root sitemap.xml is a sitemapindex
// with one nested sitemap per locale). The alternation also matches each locale's home page
// (e.g. /en/) and the bare root (/).
const DEFAULT_INCLUDE = '^/([a-z]{2}(-[a-z]+)?/)?(docs/components/|$)';
const DEFAULT_BASE = 'http://127.0.0.1:8947';
const DEFAULT_THRESHOLD = 0.001;
const MASK_SELECTORS = ['.carousel', 'video', 'iframe', '.leaflet-container', '[data-lottie]', '.lottie', 'canvas'];
const ANIMATION_DISABLE_CSS = '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}';

const CONTENT_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.txt': 'text/plain; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
};

// ~20-line static file server: map / to index.html, resolve directory URLs to /index.html.
function startStaticServer(rootDir, port) {
  const server = http.createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(req.url.split('?')[0].split('#')[0]);
      let filePath = path.join(rootDir, urlPath);
      let stat = await fs.stat(filePath).catch(() => null);
      if (stat?.isDirectory()) {
        filePath = path.join(filePath, 'index.html');
        stat = await fs.stat(filePath).catch(() => null);
      }
      if (!stat || !stat.isFile()) {
        res.writeHead(404, { 'content-type': 'text/plain' });
        res.end('Not found');
        return;
      }
      const type = CONTENT_TYPES[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
      res.writeHead(200, { 'content-type': type });
      fssync.createReadStream(filePath).pipe(res);
    } catch (err) {
      res.writeHead(500, { 'content-type': 'text/plain' });
      res.end(String(err));
    }
  });
  return new Promise((resolve, reject) => {
    server.on('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

function extractLocs(xml) {
  const out = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) out.push(m[1].trim());
  return out;
}

// Parses <siteDir>/sitemap.xml, following one level of sitemapindex nesting if present.
async function getPagePaths(siteDir) {
  const rootFile = path.join(siteDir, 'sitemap.xml');
  const rootXml = await fs.readFile(rootFile, 'utf8');
  let locs;
  if (/<sitemapindex[\s>]/.test(rootXml)) {
    const nestedUrls = extractLocs(rootXml);
    locs = [];
    for (const nestedUrl of nestedUrls) {
      const pathname = safePathname(nestedUrl);
      const nestedFile = path.join(siteDir, pathname);
      try {
        const nestedXml = await fs.readFile(nestedFile, 'utf8');
        locs.push(...extractLocs(nestedXml));
      } catch (err) {
        console.warn(`warn: failed to read nested sitemap ${nestedFile}: ${err.message}`);
      }
    }
  } else {
    locs = extractLocs(rootXml);
  }
  const pathnames = locs.map(safePathname);
  return [...new Set(pathnames)];
}

function safePathname(loc) {
  try {
    return new URL(loc).pathname;
  } catch {
    return loc.startsWith('/') ? loc : `/${loc}`;
  }
}

// Some pages (e.g. mod-mermaid's diagram gallery) render client-side after networkidle and can
// finish a frame or two apart between runs, shifting full-page height by a pixel. Poll document
// height until it holds steady before the fixed post-load wait, instead of masking (masks hide
// pixels, they do not fix a full-page screenshot's height).
async function waitForStableLayout(page, { interval = 200, stableRounds = 2, maxWait = 4000 } = {}) {
  const start = Date.now();
  let lastHeight = null;
  let stableCount = 0;
  while (Date.now() - start < maxWait) {
    const height = await page.evaluate(() => document.documentElement.scrollHeight).catch(() => null);
    if (height !== null && height === lastHeight) {
      stableCount += 1;
      if (stableCount >= stableRounds) return;
    } else {
      stableCount = 0;
    }
    lastHeight = height;
    await page.waitForTimeout(interval);
  }
}

function sanitizePath(pathname) {
  const trimmed = pathname.replace(/^\/+|\/+$/g, '');
  const cleaned = trimmed.replace(/[^a-zA-Z0-9_-]+/g, '_');
  return cleaned.length ? cleaned : 'index';
}

function parseFlags(argv) {
  const flags = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (next === undefined || next.startsWith('--')) {
        flags[key] = true;
      } else {
        flags[key] = next;
        i += 1;
      }
    }
  }
  return flags;
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function cmdShoot(flags) {
  const siteDir = path.resolve(process.cwd(), required(flags, 'site'));
  const outDir = path.resolve(process.cwd(), required(flags, 'out'));
  const includeSource = flags.include || DEFAULT_INCLUDE;
  const base = flags.base || DEFAULT_BASE;
  const include = new RegExp(includeSource);
  const baseUrl = new URL(base);
  const port = Number(baseUrl.port) || 80;
  const localHost = baseUrl.host;

  const sitemapFile = path.join(siteDir, 'sitemap.xml');
  if (!fssync.existsSync(sitemapFile)) {
    throw new Error(`sitemap.xml not found at ${sitemapFile}`);
  }

  await ensureDir(outDir);

  const allPaths = await getPagePaths(siteDir);
  const matched = allPaths.filter((p) => include.test(p)).sort();

  console.log(`Discovered ${allPaths.length} sitemap page(s); ${matched.length} match include ${include}.`);

  const server = await startStaticServer(siteDir, port);
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  await context.addInitScript((css) => {
    const style = document.createElement('style');
    style.textContent = css;
    document.documentElement.appendChild(style);
  }, ANIMATION_DISABLE_CSS);

  const shot = [];
  const failed = [];

  try {
    for (const pagePath of matched) {
      const url = new URL(pagePath, base).toString();
      const file = `${sanitizePath(pagePath)}.png`;
      const outFile = path.join(outDir, file);
      const page = await context.newPage();
      await page.route('**/*', (route) => {
        const reqUrl = new URL(route.request().url());
        if (reqUrl.host !== localHost) {
          route.abort();
        } else {
          route.continue();
        }
      });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      try {
        const response = await page.goto(url, { waitUntil: 'networkidle' });
        const status = response ? response.status() : null;
        if (!response || !response.ok()) {
          failed.push({ path: pagePath, file, reason: `HTTP ${status ?? 'no-response'}` });
          await page.close();
          continue;
        }
        await page.evaluate(() => (document.fonts && document.fonts.ready ? document.fonts.ready : null)).catch(() => {});
        await waitForStableLayout(page);
        await page.waitForTimeout(500);
        const masks = MASK_SELECTORS.map((selector) => page.locator(selector));
        await page.screenshot({ path: outFile, fullPage: true, mask: masks });
        shot.push({ path: pagePath, file, httpStatus: status });
      } catch (err) {
        failed.push({ path: pagePath, file, reason: err.message });
      } finally {
        await page.close();
      }
    }
  } finally {
    await context.close();
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }

  const manifest = {
    site: siteDir,
    base,
    include: includeSource,
    generatedAt: new Date().toISOString(),
    totalSitemapPages: allPaths.length,
    totalMatched: matched.length,
    shot,
    failed,
  };
  await fs.writeFile(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log(`Shot ${shot.length} page(s), ${failed.length} failure(s). Manifest: ${path.join(outDir, 'manifest.json')}`);
  if (failed.length) {
    console.log('Failures:');
    for (const f of failed) console.log(`  ${f.path} -> ${f.reason}`);
  }
}

function required(flags, key) {
  if (flags[key] === undefined || flags[key] === true) {
    throw new Error(`Missing required --${key}`);
  }
  return flags[key];
}

async function listPngs(dir) {
  const entries = await fs.readdir(dir).catch(() => []);
  return entries.filter((f) => f.toLowerCase().endsWith('.png')).sort();
}

function readPng(file) {
  return PNG.sync.read(fssync.readFileSync(file));
}

async function cmdCompare(flags) {
  const baselineDir = path.resolve(process.cwd(), required(flags, 'baseline'));
  const candidateDir = path.resolve(process.cwd(), required(flags, 'candidate'));
  const reportDir = path.resolve(process.cwd(), required(flags, 'report'));
  const threshold = flags.threshold !== undefined ? Number(flags.threshold) : DEFAULT_THRESHOLD;

  const baselineFiles = new Set(await listPngs(baselineDir));
  const candidateFiles = new Set(await listPngs(candidateDir));
  const allNames = [...new Set([...baselineFiles, ...candidateFiles])].sort();

  await ensureDir(reportDir);
  const imagesDir = path.join(reportDir, 'images');
  await ensureDir(imagesDir);

  const results = [];

  for (const name of allNames) {
    const inBaseline = baselineFiles.has(name);
    const inCandidate = candidateFiles.has(name);
    if (!inBaseline) {
      results.push({ name, status: 'missing-baseline', diffRatio: null, flagged: true });
      continue;
    }
    if (!inCandidate) {
      results.push({ name, status: 'missing-candidate', diffRatio: null, flagged: true });
      continue;
    }

    const baselinePath = path.join(baselineDir, name);
    const candidatePath = path.join(candidateDir, name);
    const baseImg = readPng(baselinePath);
    const candImg = readPng(candidatePath);

    if (baseImg.width !== candImg.width || baseImg.height !== candImg.height) {
      results.push({
        name,
        status: 'dimension-mismatch',
        diffRatio: null,
        flagged: true,
        detail: `${baseImg.width}x${baseImg.height} vs ${candImg.width}x${candImg.height}`,
      });
      continue;
    }

    const { width, height } = baseImg;
    const diff = new PNG({ width, height });
    const numDiffPixels = pixelmatch(baseImg.data, candImg.data, diff.data, width, height, { threshold: 0.1 });
    const diffRatio = numDiffPixels / (width * height);
    const flagged = diffRatio > threshold;

    let diffFile = null;
    if (flagged) {
      diffFile = `${path.basename(name, '.png')}-diff.png`;
      await fs.writeFile(path.join(imagesDir, diffFile), PNG.sync.write(diff));
      await fs.copyFile(baselinePath, path.join(imagesDir, `${path.basename(name, '.png')}-baseline.png`));
      await fs.copyFile(candidatePath, path.join(imagesDir, `${path.basename(name, '.png')}-candidate.png`));
    }

    results.push({ name, status: flagged ? 'flagged' : 'ok', diffRatio, flagged, diffFile });
  }

  const flaggedResults = results.filter((r) => r.flagged);
  await writeReport(reportDir, { baselineDir, candidateDir, threshold, results, flaggedResults });

  console.log(`Compared ${results.length} page(s): ${results.length - flaggedResults.length} ok, ${flaggedResults.length} flagged.`);
  if (flaggedResults.length) {
    console.log('Flagged:');
    for (const r of flaggedResults) {
      const ratio = r.diffRatio !== null ? (r.diffRatio * 100).toFixed(3) + '%' : 'n/a';
      console.log(`  ${r.name} [${r.status}] diff=${ratio}`);
    }
  }
  console.log(`Report: ${path.join(reportDir, 'index.html')}`);

  process.exitCode = flaggedResults.length > 0 ? 1 : 0;
}

async function writeReport(reportDir, { baselineDir, candidateDir, threshold, results, flaggedResults }) {
  const escape = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const rows = results
    .map((r) => {
      const ratio = r.diffRatio !== null ? (r.diffRatio * 100).toFixed(4) + '%' : (r.detail || 'n/a');
      const statusClass = r.flagged ? 'flagged' : 'ok';
      return `<tr class="${statusClass}"><td>${escape(r.name)}</td><td>${escape(r.status)}</td><td>${escape(ratio)}</td><td>${r.flagged ? '<a href="#img-' + escape(r.name) + '">view</a>' : '-'}</td></tr>`;
    })
    .join('\n');

  const images = flaggedResults
    .filter((r) => r.diffFile)
    .map((r) => {
      const base = path.basename(r.name, '.png');
      return `<section id="img-${escape(r.name)}"><h3>${escape(r.name)}</h3>
      <div class="side-by-side">
        <figure><figcaption>Baseline</figcaption><img src="images/${base}-baseline.png" alt="baseline ${escape(r.name)}"></figure>
        <figure><figcaption>Candidate</figcaption><img src="images/${base}-candidate.png" alt="candidate ${escape(r.name)}"></figure>
        <figure><figcaption>Diff</figcaption><img src="images/${r.diffFile}" alt="diff ${escape(r.name)}"></figure>
      </div></section>`;
    })
    .join('\n');

  const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Visual regression report</title>
<style>
body{font-family:system-ui,sans-serif;margin:2rem;color:#1a1a1a;background:#fff}
table{border-collapse:collapse;width:100%;margin-bottom:2rem}
th,td{border:1px solid #ccc;padding:0.4rem 0.6rem;text-align:left;font-size:0.9rem}
tr.flagged{background:#fde2e2}
tr.ok{background:#eafbea}
.side-by-side{display:flex;gap:1rem;flex-wrap:wrap;margin-bottom:2rem}
.side-by-side figure{margin:0;max-width:32%}
.side-by-side img{max-width:100%;border:1px solid #999}
</style>
</head>
<body>
<h1>Visual regression report</h1>
<p>Baseline: <code>${escape(baselineDir)}</code><br>Candidate: <code>${escape(candidateDir)}</code><br>Threshold: ${threshold}</p>
<p>${results.length} page(s) compared, ${flaggedResults.length} flagged.</p>
<table>
<thead><tr><th>Page</th><th>Status</th><th>Diff ratio</th><th>Images</th></tr></thead>
<tbody>
${rows}
</tbody>
</table>
${images}
</body>
</html>
`;
  await fs.writeFile(path.join(reportDir, 'index.html'), html);
}

async function main() {
  const [subcommand, ...rest] = process.argv.slice(2);
  const flags = parseFlags(rest);
  try {
    if (subcommand === 'shoot') {
      await cmdShoot(flags);
    } else if (subcommand === 'compare') {
      await cmdCompare(flags);
    } else {
      console.error('Usage:');
      console.error('  node visual.mjs shoot --site <publicDir> --out <shotsDir> [--include <regex>] [--base <baseURL>]');
      console.error('  node visual.mjs compare --baseline <dirA> --candidate <dirB> --report <reportDir> [--threshold 0.001]');
      process.exitCode = 1;
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exitCode = 1;
  }
}

main();
