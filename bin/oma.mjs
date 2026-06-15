#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const VERSION = '0.1.0';
const args = process.argv.slice(2);
const command = args[0] ?? 'help';

function hasFlag(name) {
  return args.includes(name);
}

function findExecutable(name) {
  const result = spawnSync('zsh', ['-lc', `command -v ${name}`], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  return result.stdout.trim() || null;
}

function printHelp() {
  console.log(`oh-my-antigravity (oma) ${VERSION}\n\nUsage:\n  oma                 Show help\n  oma version         Show version\n  oma doctor [--json] Check Antigravity-facing runtime assumptions\n  oma setup [path]    Create a minimal .oma workspace scaffold\n\nCurrent status:\n  Initial porting scaffold. Runtime integration targets Antigravity / antigravity-cli, not Codex.`);
}

function doctor() {
  const antigravityCliPath = findExecutable('antigravity-cli');
  const agyPath = findExecutable('agy');
  const nodePath = findExecutable('node');
  const payload = {
    ok: Boolean((antigravityCliPath || agyPath) && nodePath),
    oma_version: VERSION,
    checks: {
      node: { ok: Boolean(nodePath), path: nodePath },
      antigravity_cli: { ok: Boolean(antigravityCliPath || agyPath), path: antigravityCliPath ?? agyPath, alias: antigravityCliPath ? 'antigravity-cli' : (agyPath ? 'agy' : null) },
    },
    notes: [
      'oma is an Antigravity port scaffold; Codex-specific hooks and state paths are intentionally not enabled yet.',
    ],
  };
  if (hasFlag('--json')) {
    console.log(JSON.stringify(payload, null, 2));
    return payload.ok ? 0 : 1;
  }
  console.log(`oma ${VERSION} doctor`);
  console.log(`- node: ${nodePath ? `ok (${nodePath})` : 'missing'}`);
  console.log(`- antigravity-cli: ${antigravityCliPath ? `ok (${antigravityCliPath})` : (agyPath ? `ok via agy alias (${agyPath})` : 'missing')}`);
  console.log('- status: initial Antigravity port scaffold');
  return payload.ok ? 0 : 1;
}

function setup() {
  const target = args[1] && !args[1].startsWith('-') ? args[1] : process.cwd();
  const dir = join(target, '.oma');
  mkdirSync(dir, { recursive: true });
  const manifestPath = join(dir, 'manifest.json');
  if (!existsSync(manifestPath)) {
    writeFileSync(manifestPath, JSON.stringify({ schema: 'oma.workspace.v1', created_by: 'oma', runtime: 'antigravity' }, null, 2) + '\n');
  }
  console.log(`oma workspace scaffold ready: ${dir}`);
  return 0;
}

let exitCode = 0;
switch (command) {
  case 'help':
  case '--help':
  case '-h':
    printHelp();
    break;
  case 'version':
  case '--version':
  case '-v':
    console.log(VERSION);
    break;
  case 'doctor':
    exitCode = doctor();
    break;
  case 'setup':
    exitCode = setup();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    printHelp();
    exitCode = 2;
}
process.exit(exitCode);
