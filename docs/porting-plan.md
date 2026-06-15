# oh-my-codex → oh-my-antigravity 포팅 계획

## 1. 범위

`oma`는 `omx`의 전체 기능을 무비판적으로 복제하지 않는다. 먼저 Antigravity resident/CLI 운용에 필요한 안전한 최소 표면을 세운다.

## 2. 1차 목표

- `oma doctor`: `agy`, `node`, MCP schema directory, workspace 쓰기 가능 여부 진단
- `oma setup`: `.oma/` 작업 상태 디렉터리와 Antigravity 친화 템플릿 생성
- `oma status`: 현재 workspace의 `.oma` 상태와 agy 실행 표면 요약
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
| `omx team` | agy pane/session 모델 확인 전 보류 |
| `omx ultragoal` | Antigravity goal equivalent 부재 시 보류 |
| state/memory MCP | report-only부터 시작 |

## 5. 다음 작업

1. `omx`의 실제 설치 산출물 목록 작성.
2. Antigravity에서 대응 가능한 표면과 불가능한 표면 분리.
3. `oma doctor`에 MCP/config/schema 진단 추가.
4. 최소 npm 패키지 배포 가능성 검증.
