# oh-my-antigravity (`oma`)

`oh-my-antigravity`는 `oh-my-codex(omx)`의 운영 철학을 Antigravity / `antigravity-cli` 환경으로 이식하기 위한 공개 프로젝트다.

목표는 Codex 전용 가정(`codex`, `.codex`, Codex hook/goal/state 표면)을 제거하고, **Antigravity / `antigravity-cli`**의 실행 모델과 MCP 설정 표면에 맞춘 보조 CLI `oma`를 제공하는 것이다. 현재 로컬 실행 바이너리명이 `agy`로 노출되는 환경도 `antigravity-cli` 계열 호환 표면으로 취급하되, 프로젝트 문서와 설계 목표 명칭은 `antigravity-cli`로 고정한다.

## 현재 상태

초기 포팅 스캐폴드다.

포함된 것:

- `oma` CLI 엔트리포인트
- `oma doctor`: `node` 및 `antigravity-cli`/`agy` alias 존재 확인
- `oma setup`: `.oma/manifest.json` 워크스페이스 골격 생성
- `oma status`: 런타임 대상, 실행 바이너리, `.oma` manifest 상태 요약
- `oma inventory
oma catalog`: `omx` command를 `oma` 이식 우선순위로 분류
- `oma catalog`: `omx` skills/prompts/hooks/subagent 자산의 이식 상태 요약
- 포팅 계획 문서

아직 포함하지 않은 것:

- Codex hook의 Antigravity hook 대응 이식
- `omx team`, `ultragoal`, state MCP의 Antigravity 런타임 이식
- Antigravity workspace/config 보호 경계별 자동 설치기

## 사용

```bash
npm install -g .
oma doctor
oma setup /path/to/project
oma status /path/to/project
oma inventory
oma catalog
```

## 원칙

- 실행 명령은 `oma`다.
- 대상 런타임은 Antigravity / `antigravity-cli`다. 로컬 alias가 `agy`인 경우에도 `antigravity-cli` 호환 실행면으로 감지한다.
- Codex 전용 경로와 상태 파일은 직접 재사용하지 않는다.
- Antigravity 내부 config 보호 경계는 우회하지 않는다. 읽기가 차단되면 schema directory, operator evidence, runtime receipt 같은 대체 증거를 사용한다.
