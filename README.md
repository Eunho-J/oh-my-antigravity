# oh-my-antigravity (`oma`)

`oh-my-antigravity`는 `oh-my-codex(omx)`의 운영 철학을 Antigravity/`agy` 환경으로 이식하기 위한 공개 프로젝트다.

목표는 Codex 전용 가정(`codex`, `.codex`, Codex hook/goal/state 표면)을 제거하고, Antigravity의 실행 모델과 MCP 설정 표면에 맞춘 보조 CLI `oma`를 제공하는 것이다.

## 현재 상태

초기 포팅 스캐폴드다.

포함된 것:

- `oma` CLI 엔트리포인트
- `oma doctor`: `node`/`agy` 존재 확인
- `oma setup`: `.oma/manifest.json` 워크스페이스 골격 생성
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
```

## 원칙

- 실행 명령은 `oma`다.
- 대상 런타임은 Antigravity/`agy`다.
- Codex 전용 경로와 상태 파일은 직접 재사용하지 않는다.
- Antigravity 내부 config 보호 경계는 우회하지 않는다. 읽기가 차단되면 schema directory, operator evidence, runtime receipt 같은 대체 증거를 사용한다.
