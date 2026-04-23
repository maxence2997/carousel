# Changelog

## [Unreleased]

## [1.0.0] - 2026-04-23

### Changed

- Minimum Go version corrected to 1.22 (range-over-int); go.mod previously declared 1.26 by mistake

### Fixed

- `RingBuffer` QuickStart example in README used a capacity that made the eviction demo incorrect
- Spelling: "cancelled" → "canceled" in README (American English consistency)

## [0.1.0] - 2026-04-23

### Added

- `RingBuffer[T]` — fixed-capacity FIFO circular buffer with `Push`, `ForcePush`,
  `Pop`, `Peek`, `Drain`, `Len`, `Cap`, `Clear`
- `RingQueue[T]` — concurrent blocking FIFO queue backed by `RingBuffer`;
  supports `Enqueue` (reject-on-full) and `ForceEnqueue` (evict-oldest-on-full);
  `Pop(ctx)` blocks until an item is available, the context is canceled, or the
  queue is closed
- `ErrFull` — returned by `Enqueue` when the queue is at capacity
- `ErrClosed` — returned by `Enqueue`, `ForceEnqueue`, and `Pop` after `Close` is called

[Unreleased]: https://github.com/maxence2997/carousel/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/maxence2997/carousel/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/maxence2997/carousel/releases/tag/v0.1.0
