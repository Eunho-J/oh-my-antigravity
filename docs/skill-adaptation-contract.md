# OMA Skill Adaptation Contract

Status: draft
Runtime target: Antigravity / `antigravity-cli`

## Purpose

Staged `omx` skills are not runtime-enabled until they are rewritten against OMA contracts. This document defines the minimum conversion rules for moving a skill from `staged_read_only` to `adapted_candidate`.

## Required conversions

1. Command surface
   - Replace `omx ...` invocations with `oma ...` only when the matching OMA command exists.
   - If no OMA command exists, mark the step `blocked: missing_oma_surface` instead of inventing parity.

2. State paths
   - Replace `.omx/` state paths with `.oma/` only after the target schema is defined.
   - Do not alias `.omx` to `.oma` silently.

3. Codex coupling
   - Remove or redesign references to Codex-specific goal tools, native hooks, `.codex`, Codex auth, and Codex session semantics.
   - A skill with remaining Codex coupling cannot be installed into Antigravity runtime.

4. Antigravity boundary
   - Do not bypass Antigravity internal config protection boundaries.
   - Prefer schema directory, runtime receipt, and operator evidence when direct config reads are blocked.

5. Runtime enablement
   - `skills/manifest.json` must keep `install_enabled=false` until at least one skill has an `adapted_candidate` entry with a passing audit.
   - Runtime install must be explicit and reversible.

## First adaptation wave

Recommended order:

1. `ai-slop-cleaner` — mostly workflow text; convert command/path references first.
2. `design` — repo-local document workflow; low runtime dependency.
3. `best-practice-research` — evidence workflow; requires browsing/source policy alignment.
4. `ask` — convert artifact path to `.oma/artifacts` and define local advisor CLI rules.
5. `wiki` — requires canonical `oma_wiki` or `.oma/wiki` storage contract.

## Audit gates

```bash
node --check bin/oma.mjs
node bin/oma.mjs skills --audit --json
npm test
```

Promotion rule:

- `portable_candidate` or `requires_adaptation` may become `adapted_candidate` only after manual review of the converted skill text.
- `requires_redesign` cannot be promoted by regex cleanup alone.
