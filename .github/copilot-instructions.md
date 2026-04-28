# Copilot Instructions -- carousel

> **Single source of truth**: [`CLAUDE.md`](../CLAUDE.md) at the project root.
> This file re-exports the shared rules for GitHub Copilot. All project conventions,
> development workflow, critical rules, and session protocol are defined there.
> When in doubt, follow `CLAUDE.md`.

## Quick Reference

- Module: `github.com/maxence2997/carousel` -- standalone Go library, zero production dependencies.
- Types: `RingBuffer[T]` (single-threaded FIFO), `RingQueue[T]` (concurrent blocking FIFO).
- Pre-commit gate: `make check` (fmt + lint + race-detector test).
- Commit format: `.github/instructions/commit-message-instructions.md`.
- PR template: `.github/PULL_REQUEST_TEMPLATE.md`.

## Copilot-Specific Notes

- Copilot Chat and Copilot Workspace should read `CLAUDE.md` for the full rule set.
- Inline completions: prefer `assert`/`require` from `testify` in test files.
  Use `goleak.VerifyTestMain` in `main_test.go`.
- Do not generate code that adds external production dependencies.
- Respond in the user's language (Traditional Chinese when applicable).
  Code and commit messages are always in English.
