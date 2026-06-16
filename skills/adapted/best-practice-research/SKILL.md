<!--
OMA adapted skill candidate.
Source: staged best-practice-research migration copy.
Status: adapted_candidate; not runtime-installed until install gate is implemented.
-->

---
name: best-practice-research
description: "Bounded best-practice research wrapper using official/upstream evidence first"
argument-hint: "<technology|decision|practice question>"
---

# Best-Practice Research

Use this skill when a task depends on current external best practices, version-aware guidance, standards, official recommendations, or upstream behavior. This is a workflow wrapper: it routes evidence gathering and synthesis; it is not a new research authority and it does not replace the active research capability available in the current Antigravity environment.

## Purpose

Produce a cited, reusable best-practice answer or handoff that separates current external evidence from repo-local facts and dependency-selection decisions. For pre-planning investigation, this is the ordinary first research wrapper: gather official/upstream evidence, then hand it to the planning owner or caller as planning input. Do not present `$best-practice-research` as a final architecture component or as a validator-gated research loop.

## Activate When

- The user asks for best practices, recommended approach, current guidance, official recommendations, standards, or version-aware external behavior.
- a planning, interview, team, or execution workflow needs current external evidence before planning or execution can be correct.
- The task involves an already chosen technology and needs authoritative usage guidance, migration notes, API behavior, lifecycle rules, or current safety guidance.

## Do Not Activate When

- The answer is fully repo-local; use local repository inspection for codebase facts.
- The main question is whether to adopt, replace, upgrade, or compare dependencies; use a dependency review workflow.
- The user only needs implementation against already-grounded requirements; use the appropriate implementation or team execution workflow.
- The task can be answered from stable local project conventions without current external lookup.

## Specialist Routing

1. Use local repository inspection first for brownfield facts: current code usage, local constraints, versions, config, and integration points.
2. Use the available research capability for official/upstream docs, release notes, standards, migration guides, source-backed examples, and current best-practice evidence for an already chosen technology.
3. Use a dependency review workflow only for adoption/upgrade/replacement/comparison decisions.
4. Return to the caller with explicit evidence, uncertainty, and any implementation handoff constraints.

## Source-Quality Rules

- Prefer official documentation, upstream source, release notes, changelogs, standards, and maintainer guidance.
- Include source URLs for material claims.
- State date/version context for current best-practice claims.
- Label third-party summaries as supplemental; do not use them before official/upstream sources.
- Flag stale, conflicting, undocumented, or version-mismatched evidence.
- Do not over-fetch: gather the smallest evidence set that can support the decision.

## Workflow

1. Classify the question: conceptual best practice, implementation guidance, migration/version guidance, standards/compliance guidance, or mixed local + external guidance.
2. Gather repo-local facts with local inspection when local usage or constraints affect the answer.
3. Gather external evidence with the available research/browser capability when current or version-aware practice affects correctness.
4. Synthesize a concise answer with source quality, version/date context, caveats, and an implementation or planning handoff.
5. Stop when the answer is grounded enough for the caller; otherwise report the exact blocker or specialist handoff needed.

## Output Contract

```md
## Best-Practice Research: <question>

### Direct Recommendation
<actionable guidance or decision support>

### Evidence Used
- Official/upstream: <source URL> — <what it establishes>
- Supplemental, if any: <source URL> — <why it is secondary>

### Version / Date Context
<versions, dates, release channels, or unknowns>

### Repo-Local Context
<facts from local inspection, or "not needed">

### Boundaries / Non-goals
<what this research does not decide>

### Handoff
<planning/execution/test implications>
```

## Stop Rules

- Stop after a source-backed recommendation is reusable by the caller.
- Stop and route upward if the task becomes dependency comparison, broad architecture, or implementation.
- Do not continue researching when remaining work would only polish wording rather than change the recommendation.

Task: {{ARGUMENTS}}
