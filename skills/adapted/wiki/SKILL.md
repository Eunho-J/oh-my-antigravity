---
name: wiki
description: Persistent markdown project wiki stored under repository oma_wiki with keyword search and lifecycle capture
triggers: ["wiki add", "wiki lint", "wiki query", "wiki read", "wiki delete"]
---

# Wiki

Persistent, self-maintained markdown knowledge base for project and session knowledge.

## Operations

### Ingest
```bash
oma wiki wiki_ingest --input '{"title":"Auth Architecture","content":"...","tags":["auth","architecture"],"category":"architecture"}' --json
```

### Query
```bash
oma wiki wiki_query --input '{"query":"authentication","tags":["auth"],"category":"architecture"}' --json
```

### Lint
```bash
oma wiki wiki_lint --json
```

### Quick Add
```bash
oma wiki wiki_add --input '{"title":"Page Title","content":"...","tags":["tag1"],"category":"decision"}' --json
```

### List / Read / Delete
```bash
oma wiki wiki_list --json
oma wiki wiki_read --input '{"page":"auth-architecture"}' --json
oma wiki wiki_delete --input '{"page":"outdated-page"}' --json
oma wiki wiki_refresh --json
```

## Categories
`architecture`, `decision`, `pattern`, `debugging`, `environment`, `session-log`, `reference`, `convention`

## Storage
- Pages: `oma_wiki/*.md`
- Index: `oma_wiki/index.md`
- Log: `oma_wiki/log.md`

## Cross-References
Use `[[page-name]]` wiki-link syntax to create cross-references between pages.

## Auto-Capture
At session end, discoveries can be captured as `session-log-*` pages. Configure via `wiki.autoCapture` in `.oma/config.json`.

## Hard Constraints
- No vector embeddings — query uses keyword + tag matching only
- Wiki files are repository project knowledge under `oma_wiki/`; legacy `.oma/wiki/` is read-only compatibility input when no canonical wiki exists


## OMA Port Status
- Adapted candidate only; runtime installation remains disabled until `oma` defines an Antigravity skill install target and rollback path.
- Command examples target the `oma` CLI surface and repository-local `oma_wiki/` state.
