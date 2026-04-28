# CLAUDE.md — carousel

> This file is the **single source of truth** for all AI agents working on this project.
> Both `.github/copilot-instructions.md` and `AGENTS.md` reference this file.

## Project Overview

carousel is a **standalone Go library** providing generic fixed-capacity ring data structures.
Module path: `github.com/maxence2997/carousel`. Zero external production dependencies.

## Package Layout

| Type | Description |
|------|-------------|
| `RingBuffer[T]` | Fixed-capacity FIFO circular buffer. Not safe for concurrent use. |
| `RingQueue[T]` | Concurrent blocking FIFO queue backed by `RingBuffer`. mutex + sync.Cond + context.Context. |

Both types live in the root package `carousel`. Import: `github.com/maxence2997/carousel`.

## File Index

| File | Contents |
|------|----------|
| `doc.go` | Package-level GoDoc |
| `ringbuffer.go` | `RingBuffer[T]`, `NewRingBuffer[T]` |
| `ringbuffer_test.go` | `RingBuffer[T]` tests |
| `ringbuffer_internal_test.go` | Internal white-box tests for `RingBuffer` |
| `ringqueue.go` | `RingQueue[T]`, `NewRingQueue[T]`, `ErrFull`, `ErrClosed` |
| `ringqueue_test.go` | `RingQueue[T]` tests |
| `examples_test.go` | Runnable `Example*` functions (synced into docs) |
| `main_test.go` | `TestMain` with `goleak.VerifyTestMain` |
| `cmd/examplesync/` | CLI: sync example snippets into markdown docs |
| `cmd/benchsync/` | CLI: refresh benchmark tables in docs from bench output |
| `cmd/stresslab/` | CLI: run local race/stress test matrix |

## Development Workflow

```bash
make help          # list all available make targets
make fmt           # gofmt + goimports
make lint          # go vet + golangci-lint
make test          # race-detector tests (default count=50)
make check         # fmt-check + lint + test (pre-commit gate)
make bench         # quick local benchmarks with -benchmem
make bench-ci      # CI benchmark params, writes bench.txt
make bench-sync    # rerun local benchmarks and refresh docs tables
make examples-sync # sync examples_test.go snippets into markdown docs
make stresslab     # run the local stress matrix
make test-cover    # coverage report -> coverage.html
make tidy          # go mod tidy
make deps          # go mod download + tidy
make clean         # remove local coverage artifacts
```

### Useful One-Off Commands

```bash
go run ./cmd/stresslab -list
# show the planned stress scenarios without running them

go run ./cmd/stresslab -mode targeted -count 1 -gmp 1
# smoke-test the targeted RingQueue stress cases locally

go test -run '^$' -bench BenchmarkRingQueue_ProducerConsumer -benchmem -count=3 ./...
# rerun the hot RingQueue producer/consumer benchmark a few times
```

## Conventions

- **Go style**: `gofmt`/`goimports`, snake_case filenames, GoDoc on all public symbols.
- **Error format**: sentinel errors as `errors.New("carousel: <description>")`.
- **Panic policy**: panic only at construction time for programmer errors (e.g. `capacity < 1`).
  Never panic at steady-state runtime.
- **Naming**: exported types use full descriptive names (`RingBuffer`, `RingQueue`).
- **Markdown**: no emojis in documentation files.
- **Language consistency**: code and commit messages in English. Respond in the user's language
  (Traditional Chinese when applicable).
- **File encoding**: UTF-8 without BOM.

## Commit Messages

Follow `.github/instructions/commit-message-instructions.md`.

Format:

```
<type>: <subject>          (max 50 chars)

1.<reason> -> <change>     (max 50 chars each, max 3 items)
2.<reason> -> <change>
```

Types: `feat`, `fix`, `refactor`, `doc`, `style`, `test`, `chore`, `revert`, `merge`, `sync`.

Rules: one logical change per commit. English only. No half-word abbreviations.

## Git

- Branch strategy: `feat/<name>`, `refactor/<name>`, `bugfix/<name>`, `fix/<name>`, `chore/<name>`.
  Never push directly to `main`. Open a PR from a feature branch into `main`.
- Pull request description: follow `.github/PULL_REQUEST_TEMPLATE.md`. Fill in every section.

## Critical Rules

1. **Read before write** -- read the target file fully before any edit.
2. **Test first, fix second** -- for any bug fix, write a failing test first. Do not touch
   production code without a prior failing test.
3. **`make check` gates every commit** -- `fmt -> lint -> race-detector test` must pass.
   Skip only for documentation-only commits.
4. **Minimal changes** -- one concern per edit; no drive-by refactors.
5. **No breaking changes without version bump** -- never rename, remove, or change the
   signature of an exported symbol without a major version bump.
6. **Accuracy** -- do not make assumptions. Ask the user when clarification is needed.
7. **STOP -- before every commit, verify this checklist**:
   1. Run `make check` and confirm it passes.
   2. Commit message follows `commit-message-instructions.md`.
   3. This commit contains exactly one logical change.

## PR Comment Review -- MANDATORY

Every unresponded PR comment must be analyzed and responded to. No comment may be silently ignored.

1. Fetch all comments not yet replied to by the PR author.
2. For each: evaluate validity, severity, and cost.
3. Present analysis to the user before making any change or reply.
4. After approval, respond with one of:
   - `Fixed in {hash}. {what changed and why}`
   - `Tracked in TODOS.md -- {reason for deferring}`
   - `Won't fix. {clear reasoning}`
   - `Not applicable -- {explanation}`
5. Zero unaddressed comments before merge.

## Session Protocol

> Files under `doc/local/` are git-ignored and must never be committed.

### Start of every session -- MANDATORY

1. Read `doc/local/ai-learning.md` in full. If missing, create it with the table header.
2. Check `doc/local/plan/` for any in-progress plan and read it fully.

### During feature work

Before writing production code, create or update `doc/local/plan/<feature-name>.md`:

1. **What** -- what are you changing or adding?
2. **Why** -- what problem does it solve?
3. **How** -- what is the intended approach?

### End of every session -- MANDATORY

1. Append at least one entry to `doc/local/ai-learning.md`.
2. Update any in-progress plan in `doc/local/plan/`.
3. Verify `make check` passes.

**Entry format:**

```
| Date       | Issue or Learning | Root Cause | Prevention Rule |
| ---------- | ----------------- | ---------- | --------------- |
| YYYY-MM-DD | ...               | ...        | ...             |
```
