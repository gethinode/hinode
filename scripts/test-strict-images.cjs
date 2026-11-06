const fs = require('fs');
const http = require('http');
const path = require('path');
const zlib = require('zlib');
const { spawn } = require('child_process');

// The last step of `test:templates`: the template tests in the
// `strict-images` environment, whose overlay sets
// params.debugging.failOnMissingImage. In that mode a missing image is
// an ERROR, which already fails the build. This script also fails the
// run on any WARN line, so a warning from the image pipeline cannot
// pass unnoticed either.
//
// Hugo's own --panicOnWarning cannot do this: it also panics on Hugo's
// deprecation notices. So the log is read instead, and only lines that
// start with "WARN  deprecated:" are let through.
//
// A remote thumbnail must be left alone, but a sibling lookup for a
// remote URL that the helper fails to recognize does not show offline:
// the fetch fails, and the URL comes back unchanged anyway. So the
// script serves a PNG for every request from a local server, hands its
// origin to the build as params.tests.remoteOrigin, and fails the run
// on any request the build makes to it. The `strict-images` overlay
// lets Hugo fetch from 127.0.0.1, which its default policy refuses.
//
// The script reads the size of each fixture image the build processes
// from the PNG header. A file name ending in -1280x640 only shows which
// size was asked for, not which size was written. For the two JPEG
// fixtures with EXIF orientation 6, it also reads four pixels of the
// processed file, to show that the image came out upright.
//
// A second build sets params.tests.remoteThumbnail, which adds two
// pages whose front-matter thumbnail is a remote URL on the local
// server. head/seo.html hands such a thumbnail to
// assets/helpers/image-dimension.html, and in this site that path logs
// two warnings: image-set.html reports that it cannot find the mounted
// hugo adapter, and utilities/GetImage.html reports a missing image,
// because the adapter asks for https://127.0.0.1/img/remote.png, without
// the port. So the second build runs without the WARN check and the
// request check of the first. Its og:image assertions fail it instead
// when a remote thumbnail is resolved as a resource, which fetches it
// from the local server and gives it dimensions. Those assertions run
// only when the parameter reaches the build, so the script also reads
// the rendered assertion table and fails the run unless both remote
// cases passed in it.
//
// The og:image assertions print the og:image of each case they pass.
// The script decodes the path of each one on the site's host and checks
// that it names a file in the output of the first build, and, unless
// the case has neither a width nor a height, that the file is a PNG of
// the size they give. A url
// is a string, so an assertion on it alone does not show that the file
// was published under that name. The script also fails the run on any
// directory in that output whose name ends in an image extension, which
// a file name taken for a directory path would leave. The first build
// sets params.tests.questionMark except on Windows, which adds a bundle
// image with a "?" in its name, and the script checks that its case
// passed.
//
// Last, the `image-warnings` build adds the og:image cases that log a
// warning on purpose, and the script compares its warnings with
// `expectedWarnings` below. The first build already shows that the
// bundle images Hugo cannot decode or give a URL log no warning.
const root = path.join(__dirname, '..');
const site = path.join(root, 'tests', 'templates');
const destination = path.join(site, 'public', 'strict-images');
const remoteDestination = path.join(site, 'public', 'strict-images-remote');
const warningsDestination = path.join(site, 'public', 'image-warnings');
const remoteCases = ['remote-thumbnail', 'remote-thumbnail-upper'].map(
  (page) => `PASS og image: ${page} keeps the image-dimension.html path`
);
const host = 'https://example.org/';
const questionCase =
  'PASS og image: bundle image named with a question mark is processed with a hyphen in its place';
const questionMark = process.platform !== 'win32';
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
// The warnings of the `image-warnings` build, each the first line of one
// warning, in the order the build logs them. origin/main logs the first
// six as well: its head/seo.html hands a front-matter thumbnail that
// names a page resource to image-dimension.html, which in this site logs
// that it cannot find the adapter and that the image is missing. This
// build keeps that path for an AVIF or HEIC resource and for one Hugo
// cannot decode. origin/main also logs a missing image for four pages
// whose thumbnail this build processes: thumbnails/raster-bundle,
// og-image/exif-thumbnail, og-image/space-thumbnail and
// og-image/hash-asset. The last two warnings are new: Hugo logs one when
// utilities/GetImage.html reads the metadata of an image, for its EXIF
// orientation, and cannot decode it. Here the bytes of a .webp file are
// PNG; a JPEG whose EXIF block Hugo cannot decode, such as one whose
// Orientation tag has an invalid TIFF type, logs the same warning. For
// those two pages origin/main logged a missing image for the thumbnail and
// nothing for the bundle image. normalizeWarning below gives the lines
// of a Windows build the form of these.
const expectedWarnings = [
  'WARN  Cannot find adapter: /layouts/_partials/assets/adapters/hugo.html',
  ...['avif', 'heic', 'empty', 'truncated', 'lfs'].map(
    (name) => `WARN  partial [utilities/GetImage.html] - Missing image: og-image/${name}-thumbnail/index.md`
  ),
  'WARN  Unable to decode metadata from image: /og-image/mislabeled-bundle/feature.webp',
  'WARN  Unable to decode metadata from image: /og-image/mislabeled-thumbnail/x.webp'
];
const png = fs.readFileSync(path.join(site, 'assets', 'img', 'asset-sibling.png'));
const processed = [
  path.join('img', 'asset-sibling-1280x640.png'),
  path.join('img', 'jpg-sibling-1280x640.png'),
  path.join('thumbnails', 'bundle', 'feature-1280x640.png'),
  path.join('thumbnails', 'featured', 'feature-1280x640.png'),
  path.join('thumbnails', 'featured-raster', 'feature-1280x640.png'),
  path.join('thumbnails', 'raster-bundle', 'feature-1280x640.png'),
  path.join('og-image', 'feature-wins', 'feature-1280x640.png'),
  path.join('og-image', 'cover-only', 'cover-1280x640.png'),
  path.join('og-image', 'thumbnail-only', 'thumbnail-1280x640.png'),
  path.join('og-image', 'gif-bundle', 'feature-1280x640.png'),
  path.join('og-image', 'tiff-bundle', 'feature-1280x640.png'),
  path.join('og-image', 'bmp-bundle', 'feature-1280x640.png')
];
// Each fixture stores a red top half over a blue bottom half. Turned
// upright by its EXIF orientation 6, it has a blue left half and a red
// right half, which a 1280x640 fill keeps whichever rows it crops to.
// Left on its side, it fills to a red top half over a blue bottom half.
const upright = [
  path.join('og-image', 'exif-bundle'),
  path.join('og-image', 'exif-thumbnail')
];
const samples = [
  [160, 160, 'blue'],
  [1120, 160, 'red'],
  [160, 480, 'blue'],
  [1120, 480, 'red']
];

// Returns the WARN lines of a build log, without color codes, except
// Hugo's deprecation notices.
function warningLines(log) {
  return log
    .split(/\r?\n/)
    .map((line) => line.replace(/\x1b\[[0-9;]*m/g, ''))
    .filter((line) => /^WARN\b/.test(line) && !/^WARN\s+deprecated:/.test(line));
}

// Returns a warning of the `image-warnings` build in the form that
// `expectedWarnings` uses. It leaves out the hash that Hugo appends to
// the file name in the metadata warning. A warning that
// utilities/LogMsg.html logs for a partial ends with the path of the page
// file, which Hugo gives with the separator of the operating system, so a
// Windows build logs og-image\avif-thumbnail\index.md where
// `expectedWarnings` has og-image/avif-thumbnail/index.md. Only that path
// has its backslashes turned into slashes.
function normalizeWarning(line) {
  return line
    .replace(/^(WARN\s+Unable to decode metadata from image: .*)_\d+$/, '$1')
    .replace(/^(WARN\s+partial \[[^\]]*\] - [^:]*: )(.*)$/, (_, head, file) => head + file.replace(/\\/g, '/'));
}

function build(origin, target, logLevel, env, environment = 'strict-images') {
  return new Promise((resolve) => {
    const child = spawn(
      'hugo',
      ['-s', site, '-d', target, '--environment', environment, '--logLevel', logLevel],
      {
        cwd: root,
        env: { ...process.env, HUGO_PARAMS_TESTS_REMOTEORIGIN: origin, ...env },
        shell: process.platform === 'win32'
      }
    );
    let log = '';
    child.stdout.on('data', (chunk) => {
      process.stdout.write(chunk);
      log += chunk;
    });
    child.stderr.on('data', (chunk) => {
      process.stderr.write(chunk);
      log += chunk;
    });
    child.on('error', (error) => resolve({ status: null, log, error }));
    child.on('close', (status) => resolve({ status, log }));
  });
}

// Decodes the non-interlaced 8-bit RGB PNG that Hugo writes for the two
// JPEG fixtures, and returns its size and a function that reads the RGB
// value of one pixel. Any other kind of PNG throws.
function readPNG(file) {
  const data = fs.readFileSync(file);
  const idat = [];
  let header;
  for (let pos = 8; pos < data.length; ) {
    const length = data.readUInt32BE(pos);
    const type = data.toString('ascii', pos + 4, pos + 8);
    const body = data.subarray(pos + 8, pos + 8 + length);
    if (type === 'IHDR') header = body;
    if (type === 'IDAT') idat.push(body);
    pos += 12 + length;
  }
  const width = header.readUInt32BE(0);
  const height = header.readUInt32BE(4);
  if (header[8] !== 8 || header[9] !== 2 || header[12] !== 0) {
    throw new Error(`${file} is not a non-interlaced 8-bit RGB PNG`);
  }
  const raw = zlib.inflateSync(Buffer.concat(idat));
  const stride = width * 3;
  const pixels = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    for (let x = 0; x < stride; x++) {
      const i = y * stride + x;
      const a = x >= 3 ? pixels[i - 3] : 0;
      const b = y > 0 ? pixels[i - stride] : 0;
      const c = x >= 3 && y > 0 ? pixels[i - stride - 3] : 0;
      let predictor = 0;
      if (filter === 1) predictor = a;
      if (filter === 2) predictor = b;
      if (filter === 3) predictor = (a + b) >> 1;
      if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        predictor = pa <= pb && pa <= pc ? a : pb <= pc ? b : c;
      }
      pixels[i] = (raw[y * (stride + 1) + 1 + x] + predictor) & 0xff;
    }
  }
  const rgb = (x, y) => [...pixels.subarray(y * stride + x * 3, y * stride + x * 3 + 3)];
  return { width, height, rgb };
}

function colorName([r, g, b]) {
  if (r > 200 && g < 60 && b < 60) return 'red';
  if (b > 200 && r < 60 && g < 60) return 'blue';
  return `rgb(${r},${g},${b})`;
}

async function main() {
  const requests = [];
  const server = http.createServer((request, response) => {
    requests.push(request.url);
    response.writeHead(200, { 'Content-Type': 'image/png' });
    response.end(png);
  });
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;

  fs.rmSync(destination, { recursive: true, force: true });
  const result = await build(
    origin,
    destination,
    'warn',
    questionMark ? { HUGO_PARAMS_TESTS_QUESTIONMARK: 'true' } : {}
  );
  const fetched = requests.splice(0);
  fs.rmSync(remoteDestination, { recursive: true, force: true });
  const remote = await build(origin, remoteDestination, 'error', {
    HUGO_PARAMS_TESTS_REMOTETHUMBNAIL: 'true'
  });
  fs.rmSync(warningsDestination, { recursive: true, force: true });
  const warnings = await build(origin, warningsDestination, 'warn', {}, 'image-warnings');
  await new Promise((resolve) => server.close(resolve));

  const failures = [];
  for (const [name, run] of [
    ['first build', result],
    ['remote thumbnail build', remote],
    ['image-warnings build', warnings]
  ]) {
    if (run.error) {
      failures.push(`${name}: cannot run hugo: ${run.error.message}`);
    } else if (run.status !== 0) {
      failures.push(`${name}: hugo exited with status ${run.status}`);
    }
  }

  for (const line of warningLines(result.log)) {
    failures.push(`warning: ${line}`);
  }

  const table = path.join(remoteDestination, 'thumbnails', 'index.html');
  const rendered = fs.existsSync(table) ? fs.readFileSync(table, 'utf8') : '';
  for (const line of remoteCases) {
    if (!rendered.includes(line)) {
      failures.push(`remote thumbnail build: no "${line}" in ${table}`);
    }
  }

  const got = warningLines(warnings.log).map(normalizeWarning);
  // The line a Windows build logs for the first missing image, so that a
  // run on any platform shows that normalizeWarning gives the expected one.
  const windowsLine =
    'WARN  partial [utilities/GetImage.html] - Missing image: og-image\\avif-thumbnail\\index.md';
  if (normalizeWarning(windowsLine) !== expectedWarnings[1]) {
    failures.push(`normalizeWarning gives "${normalizeWarning(windowsLine)}" for "${windowsLine}"`);
  }
  if (got.join('\n') !== expectedWarnings.join('\n')) {
    failures.push(
      'image-warnings build: the warnings differ from the expected ones',
      ...expectedWarnings.map((line) => `  want ${line}`),
      ...got.map((line) => `  got  ${line}`)
    );
  }

  for (const url of fetched) {
    failures.push(`the build fetched a remote image: ${origin}${url}`);
  }

  const ogTable = path.join(destination, 'thumbnails', 'index.html');
  const ogRendered = fs.existsSync(ogTable) ? fs.readFileSync(ogTable, 'utf8') : '';
  const passed = ogRendered.match(/^PASS og image: /gm) || [];
  const previews = [...ogRendered.matchAll(/^\s*og:image=(\S*) width=(\S+) height=(\S+)$/gm)];
  if (previews.length === 0 || previews.length !== passed.length) {
    failures.push(`${ogTable}: ${passed.length} og image cases passed, but ${previews.length} print their og:image`);
  }
  if (questionMark && !ogRendered.includes(questionCase)) {
    failures.push(`first build: no "${questionCase}" in ${ogTable}`);
  }
  for (const [, url, width, height] of previews) {
    if (!url.startsWith(host)) continue;
    const file = path.join(destination, ...decodeURIComponent(new URL(url).pathname).split('/'));
    if (!fs.existsSync(file) || !fs.statSync(file).isFile()) {
      failures.push(`og:image ${url} names no file in the first build`);
      continue;
    }
    if (width === '-' && height === '-') continue;
    const header = fs.readFileSync(file).subarray(0, 24);
    if (header.length < 24 || !header.subarray(0, 8).equals(pngSignature)) {
      failures.push(`og:image ${url} is no PNG, but its tags give ${width}x${height}`);
      continue;
    }
    const size = `${header.readUInt32BE(16)}x${header.readUInt32BE(20)}`;
    if (size !== `${width}x${height}`) {
      failures.push(`og:image ${url} is ${size}, but its tags give ${width}x${height}`);
    }
  }

  const imageDirs = [];
  const walk = (dir) => {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      const full = path.join(dir, entry.name);
      if (/\.(png|jpe?g|gif|tiff?|bmp|webp|avif|heic|svg)$/i.test(entry.name)) {
        imageDirs.push(path.relative(destination, full));
      }
      walk(full);
    }
  };
  walk(destination);
  for (const dir of imageDirs) {
    failures.push(`first build: directory named like an image: ${dir}`);
  }

  // A PNG starts with an 8-byte signature and the IHDR chunk, whose
  // data holds the width and the height as 32-bit big-endian integers
  // at byte offsets 16 and 20 of the file.
  for (const file of processed) {
    const full = path.join(destination, file);
    if (!fs.existsSync(full)) {
      failures.push(`missing processed image: ${file}`);
      continue;
    }
    const header = fs.readFileSync(full).subarray(0, 24);
    const size = `${header.readUInt32BE(16)}x${header.readUInt32BE(20)}`;
    if (size !== '1280x640') {
      failures.push(`${file} is ${size}, want 1280x640`);
    }
  }

  // GetImage.html turns the image upright with a filter, which gives
  // the processed file a hashed name.
  for (const dir of upright) {
    const full = path.join(destination, dir);
    const names = fs.existsSync(full)
      ? fs.readdirSync(full).filter((name) => /^feature_hu_[0-9a-z]+-1280x640\.png$/.test(name))
      : [];
    if (names.length !== 1) {
      failures.push(`want one feature_hu_*-1280x640.png in ${dir}, found ${names.length}`);
      continue;
    }
    const file = path.join(dir, names[0]);
    let image;
    try {
      image = readPNG(path.join(destination, file));
    } catch (error) {
      failures.push(error.message);
      continue;
    }
    if (`${image.width}x${image.height}` !== '1280x640') {
      failures.push(`${file} is ${image.width}x${image.height}, want 1280x640`);
      continue;
    }
    const got = samples.map(([x, y]) => colorName(image.rgb(x, y)));
    const want = samples.map(([, , color]) => color);
    if (got.join() !== want.join()) {
      failures.push(`${file} is not upright: pixels ${got.join(', ')}, want ${want.join(', ')}`);
    }
  }

  if (failures.length > 0) {
    console.error('test-strict-images: FAIL');
    for (const failure of failures) {
      console.error(`  ${failure}`);
    }
    process.exit(1);
  }
  console.log('test-strict-images: PASS');
}

main();
