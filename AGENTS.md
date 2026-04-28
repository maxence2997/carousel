# AGENTS.md — carousel

> Canonical reference: [`CLAUDE.md`](CLAUDE.md). This file provides agent-specific guidance
> that supplements the shared rules defined there. Read `CLAUDE.md` first.

## For All Agents

- This is a Go library with zero production dependencies. Do not add external dependencies
  without explicit user approval.
- `make check` (fmt + lint + race-detector test) must pass before any commit.
- One logical change per commit. Follow the commit message format in
  `.github/instructions/commit-message-instructions.md`.

## Code Agent

When writing or modifying code:

1. Read the target file in full before editing.
2. Bug fixes require a failing test first -- do not touch production code without one.
3. Run `make check` after every change to confirm nothing is broken.
4. Do not add, rename, or remove exported symbols without a major version bump discussion.
5. Keep the concurrency model clear: `RingBuffer` is single-threaded; `RingQueue` uses
   mutex + sync.Cond. Document which goroutine owns which state.

## Test Agent

When writing or modifying tests:

1. Follow the existing naming convention: test groups A/B/C with descriptive subtest names.
2. Use `github.com/stretchr/testify/assert` and `require` consistently.
3. `main_test.go` runs `goleak.VerifyTestMain` -- all goroutines must be cleaned up.
4. For `RingQueue` tests, verify context cancellation paths and `Close()` ordering.

## Documentation Agent

When editing documentation:

1. Do not manually edit code blocks managed by `examplesync` (delimited by
   `<!-- examplesync:MARKER:start/end -->` comments). Run `make examples-sync` instead.
2. Do not manually edit benchmark tables managed by `benchsync` (delimited by
   `<!-- benchsync:MARKER:start/end -->` comments). Run `make bench-sync` instead.
3. No emojis in markdown files.
4. Keep `CHANGELOG.md` up to date for user-facing changes.

## Review Agent

When reviewing code or PRs:

1. Every unresponded PR comment must be analyzed -- see the PR Comment Review section
   in `CLAUDE.md`.
2. Flag P0 violations (correctness, race conditions, error swallowing) as blockers.
3. Verify `make check` passes on the branch under review.
