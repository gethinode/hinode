// Guard the existing example CI build without hiding its accepted Hugo diagnostics.
import { spawnSync } from 'node:child_process'
import { readFileSync, realpathSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { stripVTControlCharacters } from 'node:util'

export function auditWarnings (output, allowlistText) {
  const entries = allowlistText.split(/\r?\n/).map(line => line.trim())
    .filter(line => line && !line.startsWith('#'))
  const diagnostics = stripVTControlCharacters(output).split(/\r?\n/)
    .map(line => line.match(/^\s*(WARN|ERROR)\b\s*(.*)$/))
    .filter(Boolean).map(([, level, message]) => `${level} ${message}`)
  return {
    unexpected: diagnostics.filter(line => !entries.some(entry => line.includes(entry))),
    stale: entries.filter(entry => !diagnostics.some(line => line.includes(entry)))
  }
}

export function checkBuild ({ command, args, cwd, env, allowlistText }) {
  // Native Node execution also handles absolute package-manager paths containing spaces.
  const result = spawnSync(command, args, { cwd, env, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 })
  const stdout = result.stdout || ''
  const stderr = result.stderr || ''
  // Keep stream boundaries: an unterminated stdout line must not hide stderr's WARN prefix.
  const { unexpected, stale } = auditWarnings(`${stdout}\n${stderr}`, allowlistText)
  const status = result.status === null ? 1 : result.status || (unexpected.length || stale.length ? 1 : 0)
  return { status, stdout, stderr, unexpected, stale, error: result.error }
}

const sourceFile = realpathSync(fileURLToPath(import.meta.url))
const entryFile = process.argv[1]
if (entryFile && entryFile !== '-' && realpathSync(path.resolve(entryFile)) === sourceFile) {
  const root = path.resolve(path.dirname(sourceFile), '..')
  try {
    if (!process.env.npm_execpath) throw new Error('Run this guard with pnpm run test:warnings')
    const allowlistText = readFileSync(path.join(root, 'tests/warnings-allowlist.txt'), 'utf8')
    const result = checkBuild({
      command: process.execPath, args: [process.env.npm_execpath, 'run', 'build:example:ci'],
      cwd: root, allowlistText
    })
    process.stdout.write(result.stdout)
    process.stderr.write(result.stderr)
    if (result.error) console.error(`Warning guard could not run the build: ${result.error.message}`)
    for (const line of result.unexpected) console.error(`Unexpected Hugo diagnostic: ${line}`)
    for (const entry of result.stale) console.error(`Stale Hugo warning allowance: ${entry}`)
    if (result.status) console.error(`Warning guard failed (build or diagnostic policy, exit ${result.status})`)
    else console.log('PASS example Hugo warning guard')
    process.exitCode = result.status
  } catch (error) {
    console.error(`Warning guard failed: ${error.message}`)
    process.exitCode = 1
  }
}
