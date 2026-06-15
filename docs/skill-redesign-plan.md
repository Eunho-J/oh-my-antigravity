# OMA Skill Redesign Plan

상태: draft
대상 런타임: Antigravity / `antigravity-cli`

## 판정

`skills/omx-candidates/`에 staging된 9개 후보는 그대로 runtime enable하지 않는다.
이유는 모두 `omx` 명령, `.omx/` 상태 경로, Codex/goal/tmux 전제 중 하나 이상을 포함하기 때문이다.

## 안전핀

- `skills/manifest.json`의 `install_enabled=false` 유지
- `oma skills --audit` 통과 전 install 기능 금지
- Codex goal/tool reference가 남은 skill은 `requires_redesign`
- `.omx/` 경로는 `.oma/` 계약으로 명시 변환 후에만 enable 가능
- tmux 의존 workflow는 Antigravity session/pane 표면 확인 전 보류

## 우선순위

1. `ai-slop-cleaner`: workflow 자체는 유효하지만 `omx`/Codex 표현 제거 필요
2. `design`: repo-local 문서 workflow라 Antigravity 적응 비용이 낮음
3. `best-practice-research`: 외부/공식 evidence workflow로 독립성 높음
4. `ask`: local advisor CLI artifact 경로를 `.oma/artifacts`로 변경 필요
5. `wiki`: 저장소 wiki 경로를 `oma_wiki` 또는 `.oma/wiki` 계약으로 재설계 필요

## 보류

- `autoresearch`, `ultraqa`, `cancel`: stateful workflow와 cancellation semantics가 강함. `.oma/state` 계약 확정 후 재검토.
- `git-master`: subagent/prompt routing 방식이 Antigravity에서 어떻게 표현되는지 확인 필요.

## 검증 명령

```bash
node --check bin/oma.mjs
node bin/oma.mjs skills --audit --json
npm test
```


## 9. Adaptation contract

Skill conversion rules are now centralized in [`docs/skill-adaptation-contract.md`](./skill-adaptation-contract.md). No staged skill may be runtime-enabled until it satisfies that contract and passes `oma skills --audit --json`.
