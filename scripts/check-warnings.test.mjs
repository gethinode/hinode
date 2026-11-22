import assert from 'node:assert/strict'
import { copyFileSync, mkdtempSync, rmSync, symlinkSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import test from 'node:test'
import { auditWarnings, checkBuild } from './check-warnings.mjs'

// Literal diagnostic expectations catch dropped severity/stream checks and stale allowances.
test('keeps only actual diagnostic lines and ignores blank/comment allowances', () => {
  assert.deepEqual(auditWarnings('Start building sites\nWARN  accepted notice\nTotal in 20 ms\n',
    '\n# https://github.com/gethinode/hinode/issues/2225\nWARN accepted notice\n'),
  { unexpected: [], stale: [] })
})

test('rejects new WARN and ERROR lines without treating ordinary prose as diagnostics', () => {
  assert.deepEqual(auditWarnings('WARN  new warning\nERROR new error\nPage title: WARN harmless\n', ''),
    { unexpected: ['WARN new warning', 'ERROR new error'], stale: [] })
})

test('a replacement at the same warning count is unexpected and leaves the old entry stale', () => {
  assert.deepEqual(auditWarnings('WARN replacement\n', 'WARN original\n'),
    { unexpected: ['WARN replacement'], stale: ['WARN original'] })
})

test('a clean log rejects every unused allowance but passes an empty list', () => {
  assert.deepEqual(auditWarnings('Pages 100\n', 'WARN old one\nWARN old two\n'),
    { unexpected: [], stale: ['WARN old one', 'WARN old two'] })
  assert.deepEqual(auditWarnings('', '# no accepted warnings\n'), { unexpected: [], stale: [] })
})

test('recognizes ANSI diagnostics and Windows line endings without losing severity', () => {
  assert.deepEqual(auditWarnings('\u001b[33mWARN \u001b[0m accepted\r\n\u001b[31mERROR\u001b[0m new\r\n',
    'WARN accepted\r\n'), { unexpected: ['ERROR new'], stale: [] })
})

test('matching one warning more than once never consumes its allowance', () => {
  assert.deepEqual(auditWarnings('WARN same\nWARN same\n', 'WARN same'),
    { unexpected: [], stale: [] })
})

test('matches diagnostic substrings and reports every unmatched diagnostic', () => {
  assert.deepEqual(auditWarnings('WARN path/a.md: accepted\nWARN path/b.md: unexpected\nERROR broken\n',
    'path/a.md: accepted'), { unexpected: ['WARN path/b.md: unexpected', 'ERROR broken'], stale: [] })
})

const build = (source, allowlistText = '') => checkBuild({
  command: process.execPath, args: ['-e', source], allowlistText
})

test('real child stdout and stderr both reach the warning guard and retained output', () => {
  const result = build('process.stdout.write("WARN accepted\\n"); process.stderr.write("WARN new\\n")', 'WARN accepted')
  assert.equal(result.status, 1)
  assert.deepEqual(result.unexpected, ['WARN new'])
  assert.equal(result.stdout, 'WARN accepted\n')
  assert.equal(result.stderr, 'WARN new\n')
})

test('a successful real child passes with matched allowances and fails for a stale one', () => {
  assert.equal(build('console.warn("WARN accepted")', 'WARN accepted').status, 0)
  const stale = build('console.log("Pages 10")', 'WARN disappeared')
  assert.equal(stale.status, 1)
  assert.deepEqual(stale.stale, ['WARN disappeared'])
})

test('a failing build stays failed even with an allowed error or no diagnostic', () => {
  assert.equal(build('console.error("ERROR accepted"); process.exit(7)', 'ERROR accepted').status, 7)
  assert.equal(build('process.exit(9)').status, 9)
})

test('missing executables cannot produce a passing empty log', () => {
  const result = checkBuild({ command: path.join(os.tmpdir(), 'hinode-no-such-executable'), args: [], allowlistText: '' })
  assert.equal(result.status, 1)
  assert.equal(result.error.code, 'ENOENT')
})

test('signal termination cannot pass as a successful child', { skip: process.platform === 'win32' }, () => {
  assert.equal(build('process.kill(process.pid, "SIGTERM")').status, 1)
})

test('a native Node executable path containing spaces passes without shell quoting', () => {
  const directory = mkdtempSync(path.join(os.tmpdir(), 'hinode warning node '))
  try {
    const command = path.join(directory, process.platform === 'win32' ? 'node.exe' : 'node')
    // Homebrew Node loads relative shared libraries; a POSIX symlink keeps those intact.
    if (process.platform === 'win32') copyFileSync(process.execPath, command)
    else symlinkSync(process.execPath, command)
    const result = checkBuild({ command, args: ['-e', 'console.warn("WARN accepted")'], allowlistText: 'WARN accepted' })
    assert.equal(result.status, 0)
    assert.equal(result.stderr, 'WARN accepted\n')
  } finally {
    rmSync(directory, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
  }
})
