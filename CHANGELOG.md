# Changelog

## [Unreleased]

## [1.0.4] - 2026-04-28

### Changed

- `RingBuffer.Drain` and `Clear` now use bulk `copy`/`clear` paths for wrapped segments, reducing local `Drain` CPU cost without changing allocation behavior

## [1.0.3] - 2026-04-28

### Added

- Repo maintenance CLIs: `examplesync`, `benchsync`, and `stresslab`
- Runnable `Example*` tests in `examples_test.go`, synced into README and package docs

### Changed

- Benchmark workflow now runs `make bench-ci` so CI, docs refresh, and local benchmark capture share one command path
- Benchmark tables in `docs/` are now auto-generated from fresh local runs and include the measured platform

### Fixed

- `RingQueue.Pop` now registers its cancellation wakeup lazily, removing the fast-path `context.AfterFunc` overhead and bringing `BenchmarkRingQueue_ProducerConsumer` back to `0 B/op` locally

## [1.0.2] - 2026-04-23

### Added

- Benchmark history page at [maxence2997.github.io/carousel/benchmarks](https://maxence2997.github.io/carousel/benchmarks/) — CI tracks performance on every push to main

### Changed

- README: replaced benchmark badges with a static table (M1 Max numbers); added benchmark history link
- Benchmark workflow: repurposed as regression guard (fails if any op regresses >50% vs baseline); skips markdown-only pushes

## [1.0.1] - 2026-04-23

### Added

- `BenchmarkRingQueue_ForceEnqueue`, `BenchmarkRingQueue_ProducerConsumer`,
  `BenchmarkRingQueue_Parallel` — benchmark coverage for `RingQueue`

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

[Unreleased]: https://github.com/maxence2997/carousel/compare/v1.0.4...HEAD
[1.0.4]: https://github.com/maxence2997/carousel/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/maxence2997/carousel/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/maxence2997/carousel/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/maxence2997/carousel/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/maxence2997/carousel/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/maxence2997/carousel/releases/tag/v0.1.0
