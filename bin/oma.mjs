#!/usr/bin/env node
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const VERSION = '0.1.0';
const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(__dirname, '..');
const args = process.argv.slice(2);
const command = args[0] ?? 'help';

function hasFlag(name) {
  return args.includes(name);
}

function argValue(name) {
  const i = args.indexOf(name);
  if (i === -1 || i + 1 >= args.length) return null;
  return args[i + 1];
}

function findExecutable(name) {
  const result = spawnSync('zsh', ['-lc', `command -v ${name}`], { encoding: 'utf8' });
  if (result.status !== 0) return null;
  return result.stdout.trim() || null;
}

function commandOutput(commandLine) {
  const result = spawnSync('zsh', ['-lc', commandLine], { encoding: 'utf8' });
  return {
    ok: result.status === 0,
    status: result.status,
    stdout: (result.stdout ?? '').trim(),
    stderr: (result.stderr ?? '').trim(),
  };
}

function detectAntigravityCli() {
  const antigravityCliPath = findExecutable('antigravity-cli');
  const agyPath = findExecutable('agy');
  const path = antigravityCliPath ?? agyPath;
  const alias = antigravityCliPath ? 'antigravity-cli' : (agyPath ? 'agy' : null);
  const versionProbe = path ? commandOutput(`${path} --help | head -1`) : null;
  return { ok: Boolean(path), path, alias, versionProbe };
}

function workspaceInfo(target = process.cwd()) {
  const root = resolve(target);
  const omaDir = join(root, '.oma');
  const manifestPath = join(omaDir, 'manifest.json');
  let manifest = null;
  let manifestError = null;
  if (existsSync(manifestPath)) {
    try {
      manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
    } catch (error) {
      manifestError = error.message;
    }
  }
  return {
    root,
    oma_dir: omaDir,
    manifest_path: manifestPath,
    oma_present: existsSync(omaDir),
    manifest_present: existsSync(manifestPath),
    manifest_valid: Boolean(manifest),
    manifest_error: manifestError,
    manifest,
  };
}

function printHelp() {
  console.log(`oh-my-antigravity (oma) ${VERSION}\n\nUsage:\n  oma                 Show help\n  oma version         Show version\n  oma doctor [--json] Check Antigravity / antigravity-cli runtime assumptions\n  oma setup [path]    Create a minimal .oma workspace scaffold\n  oma status [path]   Show current .oma workspace status\n  oma inventory [--json]\n                      Show omx-to-oma command port classification\n  oma catalog [--json]\n                      Show omx skills/prompts/hooks migration catalog\n  oma skills [--json]\n                      List staged read-only skill candidates\n\nCurrent status:\n  Initial porting scaffold. Runtime integration targets Antigravity / antigravity-cli, not Codex.`);
}

function doctor() {
  const antigravity = detectAntigravityCli();
  const nodePath = findExecutable('node');
  const workspace = workspaceInfo(argValue('--workspace') ?? process.cwd());
  const payload = {
    ok: Boolean(antigravity.ok && nodePath),
    oma_version: VERSION,
    checks: {
      node: { ok: Boolean(nodePath), path: nodePath },
      antigravity_cli: antigravity,
      workspace,
    },
    notes: [
      'oma is an Antigravity / antigravity-cli port scaffold; Codex-specific hooks and state paths are intentionally not enabled yet.',
      antigravity.alias === 'agy' ? 'Detected local agy alias as the antigravity-cli compatibility surface.' : 'Detected canonical antigravity-cli executable.',
    ],
  };
  if (hasFlag('--json')) {
    console.log(JSON.stringify(payload, null, 2));
    return payload.ok ? 0 : 1;
  }
  console.log(`oma ${VERSION} doctor`);
  console.log(`- node: ${nodePath ? `ok (${nodePath})` : 'missing'}`);
  console.log(`- antigravity-cli: ${antigravity.ok ? `ok via ${antigravity.alias} (${antigravity.path})` : 'missing'}`);
  console.log(`- workspace: ${workspace.oma_present ? `ok (${workspace.oma_dir})` : `not initialized (${workspace.root})`}`);
  console.log('- status: initial Antigravity / antigravity-cli port scaffold');
  return payload.ok ? 0 : 1;
}

function setup() {
  const target = args[1] && !args[1].startsWith('-') ? args[1] : process.cwd();
  const dir = join(resolve(target), '.oma');
  mkdirSync(dir, { recursive: true });
  const manifestPath = join(dir, 'manifest.json');
  if (!existsSync(manifestPath)) {
    writeFileSync(manifestPath, JSON.stringify({ schema: 'oma.workspace.v1', created_by: 'oma', runtime: 'antigravity-cli' }, null, 2) + '\n');
  }
  const payload = { ok: true, workspace: workspaceInfo(target) };
  if (hasFlag('--json')) console.log(JSON.stringify(payload, null, 2));
  else console.log(`oma workspace scaffold ready: ${dir}`);
  return 0;
}



function readJsonDoc(name) {
  const path = join(REPO_ROOT, 'docs', name);
  return { path, data: JSON.parse(readFileSync(path, 'utf8')) };
}


function skills() {
  const { path, data } = readJsonDoc('../skills/manifest.json');
  if (hasFlag('--json')) {
    console.log(JSON.stringify({ ok: true, path, skills: data }, null, 2));
    return 0;
  }
  console.log(`oma ${VERSION} skills`);
  console.log(`- status: ${data.status}`);
  console.log(`- install enabled: ${data.install_enabled}`);
  for (const item of data.candidates) {
    console.log(`- ${item.name}: ${item.status} (${item.path})`);
  }
  return 0;
}

function catalog() {
  const { path, data } = readJsonDoc('omx-catalog-inventory.json');
  if (hasFlag('--json')) {
    console.log(JSON.stringify({ ok: true, path, catalog: data }, null, 2));
    return 0;
  }
  console.log(`oma ${VERSION} catalog`);
  console.log(`- source: ${data.source.package} ${data.source.observed_version}`);
  console.log(`- target: ${data.target.package} (${data.target.bin}) -> ${data.target.runtime}`);
  console.log(`- skills: ${data.summary.skills_total} total / ${data.summary.skill_candidates} candidates / ${data.summary.skill_requires_redesign} redesign / ${data.summary.skill_low_priority} low-priority`);
  console.log(`- prompts: ${data.summary.prompts_total} prompt files`);
  console.log(`- hooks: ${data.summary.hooks_total} hook modules require Antigravity hook-surface mapping`);
  console.log(`- next: ${data.next_steps[0]}`);
  return 0;
}

function readInventory() {
  const path = join(REPO_ROOT, 'docs', 'omx-port-inventory.json');
  return { path, data: JSON.parse(readFileSync(path, 'utf8')) };
}

function inventory() {
  const { path, data } = readInventory();
  if (hasFlag('--json')) {
    console.log(JSON.stringify({ ok: true, path, inventory: data }, null, 2));
    return 0;
  }
  console.log(`oma ${VERSION} inventory`);
  console.log(`- source: ${data.source.package} ${data.source.observed_version}`);
  console.log(`- target: ${data.target.package} (${data.target.bin}) -> ${data.target.runtime}`);
  for (const [name, group] of Object.entries(data.categories)) {
    console.log(`- ${name}: ${group.commands.join(', ')}`);
  }
  console.log(`- next wave: ${data.next_wave.join(', ')}`);
  return 0;
}

function status() {
  const target = args[1] && !args[1].startsWith('-') ? args[1] : process.cwd();
  const antigravity = detectAntigravityCli();
  const workspace = workspaceInfo(target);
  const payload = {
    ok: true,
    oma_version: VERSION,
    runtime_target: 'antigravity-cli',
    antigravity_cli: { ok: antigravity.ok, path: antigravity.path, alias: antigravity.alias },
    workspace,
    codex_coupling: false,
  };
  if (hasFlag('--json')) {
    console.log(JSON.stringify(payload, null, 2));
    return 0;
  }
  console.log(`oma ${VERSION} status`);
  console.log(`- runtime target: antigravity-cli`);
  console.log(`- executable: ${antigravity.ok ? `${antigravity.alias} (${antigravity.path})` : 'missing'}`);
  console.log(`- workspace: ${workspace.oma_present ? workspace.oma_dir : 'not initialized'}`);
  console.log(`- manifest: ${workspace.manifest_present ? (workspace.manifest_valid ? 'valid' : `invalid (${workspace.manifest_error})`) : 'missing'}`);
  console.log(`- codex coupling: disabled`);
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
  case 'status':
    exitCode = status();
    break;
  case 'inventory':
    exitCode = inventory();
    break;
  case 'catalog':
    exitCode = catalog();
    break;
  case 'skills':
    exitCode = skills();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    printHelp();
    exitCode = 2;
}
process.exit(exitCode);
