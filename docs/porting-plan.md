# oh-my-codex → oh-my-antigravity 포팅 계획

## 1. 범위

`oma`는 `omx`의 전체 기능을 무비판적으로 복제하지 않는다. 먼저 Antigravity / `antigravity-cli` resident/CLI 운용에 필요한 안전한 최소 표면을 세운다. 로컬 binary alias가 `agy`인 설치도 호환 표면으로 탐지하지만, 포팅 목표 명칭은 `antigravity-cli`로 고정한다.

## 2. 1차 목표

- `oma doctor`: `antigravity-cli`/`agy` alias, `node`, MCP schema directory, workspace 쓰기 가능 여부 진단
- `oma setup`: `.oma/` 작업 상태 디렉터리와 Antigravity 친화 템플릿 생성
- `oma status`: 현재 workspace의 `.oma` 상태와 `antigravity-cli`/`agy` 호환 실행 표면 요약
- `oma inventory`: `omx` 기능의 이식 가능성/보류 사유를 표준 장부로 출력
- `oma mcp-serve`: 필요한 경우 oma 전용 report-only MCP 도구 노출

## 3. 포팅 금지선

- Codex 전용 `.codex` 상태를 Antigravity에 그대로 주입하지 않는다.
- Antigravity 내부 설정 파일 보호 경계를 우회하지 않는다.
- 자동 human interrupt, credential export, permission escalation은 기본 기능으로 넣지 않는다.

## 4. omx 기능 매핑 초안

| omx 기능 | oma 이식 방향 |
| --- | --- |
| `omx doctor` | `oma doctor`로 우선 이식 |
| `omx setup` | `.oma` 중심으로 축소 이식 |
| Codex native hooks | Antigravity hook 표면 조사 후 별도 설계 |
| `omx team` | Antigravity / `antigravity-cli` pane/session 모델 확인 전 보류 |
| `omx ultragoal` | Antigravity goal equivalent 부재 시 보류 |
| state/memory MCP | report-only부터 시작 |

## 5. 다음 작업

1. `omx`의 실제 설치 산출물 목록 작성.
2. Antigravity에서 대응 가능한 표면과 불가능한 표면 분리.
3. `oma doctor`에 MCP/config/schema 진단 추가.
4. `oma status`를 workspace 상태와 runtime alias 진단의 표준 보고면으로 확장.
5. 최소 npm 패키지 배포 가능성 검증.


## 6. 1차 인벤토리

정형 인벤토리는 [`docs/omx-port-inventory.json`](./omx-port-inventory.json)에 둔다. `oma inventory`는 이 장부를 읽어 사람이 보는 요약 또는 `--json` 출력을 제공한다.


## 7. Skills / prompts / hooks 카탈로그

정형 카탈로그는 [`docs/omx-catalog-inventory.json`](./omx-catalog-inventory.json)에 둔다. `oma catalog`는 `omx`의 skills, prompts/subagents, hook modules를 읽기 전용으로 분류한다. 아직 runtime 이식이 아니라 migration control plane이다.
