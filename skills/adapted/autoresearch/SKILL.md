---
name: autoresearch
description: Stateful validator-gated research loop for Antigravity with explicit completion artifacts
---

# Autoresearch

Autoresearch is a bounded research workflow for Antigravity sessions. Use it when the research itself is a deliverable and must keep iterating until an explicit validator artifact passes.

It is not a detached launcher, a background pane recipe, or a claim that a model is finished because it said so. The loop ends only when the configured completion artifact exists and records the selected validation result.

## Boundary with planning research

Use this workflow when the user asks for a measured research loop with durable evidence. For ordinary pre-planning lookup, quick documentation checks, or best-practice scans, use the simpler best-practice research workflow instead.

If autoresearch runs before architecture planning, its approved artifact becomes evidence for the planning owner. It must not silently become the final architecture unless the user explicitly asks for that handoff.

## Use when

- The task has a bounded mission and a concrete validation criterion.
- The output should be rechecked until validator evidence exists.
- The session must preserve state across turns under `.oma/state/`.
- The user wants a research deliverable, not just a one-shot answer.

## Do not use when

- The validation regime is unknown.
- The task is casual lookup or pre-planning orientation.
- A direct runtime install path has not been implemented for the local Antigravity environment.
- The requested loop would create external effects without explicit approval.

## Core contract

1. **Init chooses exactly one validation mode.**
   - `mission-validator-script`
   - `prompt-architect-artifact`
2. **Persist mode state** in `.oma/state/autoresearch/{slug}/autoresearch-state.json` including:
   - `validation_mode`
   - `completion_artifact_path`
   - `mission_validator_command` or `validator_prompt`
   - optional `output_artifact_path`
3. **Completion is artifact-gated.** The loop does not stop because the model says “done”, because one idle cycle passed, or because several turns made no visible change.
4. **Direct runtime install remains disabled until OMA implements an Antigravity-safe install target.** Until then, treat this file as an adapted candidate and execute the pattern manually inside the active session.

## Completion artifact contract

### `mission-validator-script`

The completion artifact must exist and record a passing validator result, for example:

```json
{
  "status": "passed",
  "passed": true,
  "summary": "metric improved beyond baseline"
}
```

### `prompt-architect-artifact`

The completion artifact must include both an architect approval verdict and an output artifact path, for example:

```json
{
  "validator_prompt": "Review the research output against the mission.",
  "architect_review": { "verdict": "approved" },
  "output_artifact_path": ".oma/specs/autoresearch-demo/report.md"
}
```

## Recommended flow

1. Create `.oma/specs/autoresearch-{slug}/mission.md` with mission, constraints, sources allowed, and validation mode.
2. Create `.oma/specs/autoresearch-{slug}/sandbox.md` with allowed commands, write boundary, and stop conditions.
3. Write `.oma/state/autoresearch/{slug}/autoresearch-state.json` with the selected validation mode and completion artifact path.
4. Run bounded research iterations inside the active Antigravity session.
5. After each iteration, update the output artifact and run the selected validator.
6. Finish only after the completion artifact satisfies the chosen validation mode.

## Migration note

- No direct legacy command launch.
- No detached pane launch requirement.
- No no-op-count completion gate.
- Runtime install remains disabled until OMA defines the Antigravity skill target path and rollback behavior.
