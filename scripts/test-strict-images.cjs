const fs = require('fs');
const http = require('http');
const path = require('path');
const { spawn } = require('child_process');

// Fourth `test:templates` build: the template tests in the
// `strict-images` environment, whose overlay sets
// params.debugging.failOnMissingImage. In that mode a missing image is
// an ERROR, which already fails the build. This script also fails the
// run on any WARN line, so a warning from the image pipeline cannot
// pass unnoticed either.
//
// Hugo's own --panicOnWarning cannot do this: it also panics on Hugo's
// deprecation notices, and tests/templates/hugo.toml keeps the
// deprecated `languageCode` key on purpose. So the log is read instead,
// and only lines that start with "WARN  deprecated:" are let through.
//
// A remote thumbnail must be left alone, but a sibling lookup for a
// remote URL that the helper fails to recognize does not show offline:
// the fetch fails, and the URL comes back unchanged anyway. So the
// script serves a PNG for every request from a local server, hands its
// origin to the build as params.tests.remoteOrigin, and fails the run
// on any request the build makes to it. The `strict-images` overlay
// lets Hugo fetch from 127.0.0.1, which its default policy refuses.
//
// Last, the script reads the size of each fixture image the build
// processes from the PNG header. A file name ending in -1280x640 only
// shows which size was asked for, not which size was written.
const root = path.join(__dirname, '..');
const site = path.join(root, 'tests', 'templates');
const destination = path.join(site, 'public', 'strict-images');
const png = fs.readFileSync(path.join(site, 'assets', 'img', 'asset-sibling.png'));
const processed = [
  path.join('img', 'asset-sibling-1280x640.png'),
  path.join('img', 'jpg-sibling-1280x640.png'),
  path.join('thumbnails', 'bundle', 'feature-1280x640.png')
];

function build(origin) {
  return new Promise((resolve) => {
    const child = spawn(
      'hugo',
      ['-s', site, '-d', destination, '--environment', 'strict-images', '--logLevel', 'warn'],
      {
        cwd: root,
        env: { ...process.env, HUGO_PARAMS_TESTS_REMOTEORIGIN: origin },
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
  const result = await build(origin);
  await new Promise((resolve) => server.close(resolve));

  const failures = [];
  if (result.error) {
    failures.push(`cannot run hugo: ${result.error.message}`);
  } else if (result.status !== 0) {
    failures.push(`hugo exited with status ${result.status}`);
  }

  const lines = result.log
    .split(/\r?\n/)
    .map((line) => line.replace(/\x1b\[[0-9;]*m/g, ''));
  for (const line of lines) {
    if (/^WARN\b/.test(line) && !/^WARN\s+deprecated:/.test(line)) {
      failures.push(`warning: ${line}`);
    }
  }

  for (const url of requests) {
    failures.push(`the build fetched a remote image: ${origin}${url}`);
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
