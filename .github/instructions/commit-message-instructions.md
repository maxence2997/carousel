---
applyTo: "**"
---

# Commit Message Rules

## Format

```
<type>: <subject>

1.<reason> → <change>
2.<reason> → <change>
3.<reason> → <change>
```

- **Header**: must include type and subject, max 50 characters.
- **Second line**: blank (required).
- **Body** (line 3+): numbered items. Each item states the reason first, then the change. Keep each item under 50 characters. Max 3 items.
- Body is optional for trivial changes.

---

## Type Definitions

| Type       | When to use                                                                    |
| ---------- | ------------------------------------------------------------------------------ |
| `feat`     | New code for a new feature, support method, or interface                       |
| `fix`      | Fix a bug or incorrect behavior                                                |
| `refactor` | Restructure code for readability or maintainability without changing behavior  |
| `doc`      | Documentation-only or comment-only changes                                     |
| `style`    | Code formatting, parameter reordering, or other non-functional changes         |
| `test`     | Add or modify tests (unit, integration, test fixtures)                         |
| `chore`    | Dependency upgrades, tooling changes, or build configuration                   |
| `revert`   | Revert one or more previous commits                                            |
| `merge`    | Merge operations                                                               |
| `sync`     | Resolve conflicts between branches                                             |

---

## Rules

1. Each commit contains exactly one logical change. Do not mix unrelated modifications.
2. Header max 50 characters. Body items max 50 characters each, max 3 items.
3. Use a colon `:` between type and subject.
4. All text in English.
5. Use only common, universally recognized abbreviations; avoid half-word truncations (e.g. `sess`, `conn`, `svc`, `mgr`). Readability is the highest priority.

---

## Examples

```
feat: add RingBuffer with Push/Pop/ForcePush

1.Need fixed-capacity FIFO for hub send queue → added RingBuffer[T]
2.Added ForcePush for drop-oldest backpressure
3.Added full test coverage including wrap-around paths
```

```
fix: correct Clear to zero all slots from head

1.Clear started from index 0 not head → slots before head leaked refs
2.Fixed loop to start from (head+i)%cap
3.Added non-zero-head test to cover the path
```
