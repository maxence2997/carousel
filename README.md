# carousel

[![CI](https://github.com/maxence2997/carousel/actions/workflows/ci.yml/badge.svg)](https://github.com/maxence2997/carousel/actions/workflows/ci.yml)
[![Go Reference](https://pkg.go.dev/badge/github.com/maxence2997/carousel.svg)](https://pkg.go.dev/github.com/maxence2997/carousel)
[![Go](https://img.shields.io/badge/Go-1.22+-blue.svg?logo=go)](https://go.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Generic fixed-capacity ring data structures for Go.

```
go get github.com/maxence2997/carousel
```

## Types

| Type | Description |
|------|-------------|
| `RingBuffer[T]` | Fixed-capacity FIFO circular buffer. Not safe for concurrent use. |
| `RingQueue[T]` | Concurrent blocking FIFO queue backed by `RingBuffer`. Supports drop-on-full and evict-oldest-on-full strategies. |

## Quick Start

### RingBuffer

```go
import "github.com/maxence2997/carousel"

buf := carousel.NewRingBuffer[int](3)

buf.Push(1)
buf.Push(2)
buf.Push(3)

v, ok := buf.Pop()  // v=1, ok=true
v, ok  = buf.Peek() // v=2, ok=true (no removal)

// ForcePush evicts the oldest item when full
buf.Push(4) // buf: [2, 3, 4], full
evicted := buf.ForcePush(5) // evicted=true; buf: [3, 4, 5]

items := buf.Drain() // [3, 4, 5]; buf is now empty
```

### RingQueue

`RingQueue` is designed for the producer-consumer pattern: multiple producers enqueue concurrently, and a single consumer goroutine calls `Pop` in a loop.

```go
import (
    "context"
    "github.com/maxence2997/carousel"
)

q := carousel.NewRingQueue[[]byte](256)
defer q.Close()

// Producer goroutines (concurrent-safe)
err := q.Enqueue(data)               // returns ErrFull if at capacity
evicted, err := q.ForceEnqueue(data) // evicts oldest if full; never returns ErrFull

// Single consumer goroutine
go func() {
    for {
        item, err := q.Pop(ctx)
        if err != nil {
            // context canceled (ctx.Err()) or queue closed (ErrClosed)
            return
        }
        process(item)
    }
}()

// Bulk read without blocking — returns whatever is in the buffer right now
items := q.Drain()
```

`Pop` blocks until an item is available, the context is canceled, or the queue is closed.
Available items are always delivered before cancellation or close signals are returned.

## Errors

| Error | Returned by | When |
|-------|-------------|------|
| `carousel.ErrFull` | `Enqueue` | Queue is at capacity |
| `carousel.ErrClosed` | `Enqueue`, `ForceEnqueue`, `Pop` | Queue has been closed |

## Benchmarks

Measured on Apple M1 Max (`darwin/arm64`). Run `make bench` to reproduce.

| Type | Operation | ns/op | B/op | allocs/op |
|---|---|---:|---:|---:|
| `RingBuffer` | `Push` | 3.2 | 0 | 0 |
| `RingBuffer` | `ForcePush` | 5.7 | 0 | 0 |
| `RingBuffer` | `Pop` | 2.9 | 0 | 0 |
| `RingBuffer` | `Drain` (256 items) | 1 632 | 6 528 | 1 |
| `RingQueue` | `ForceEnqueue` (serial) | 13.8 | 0 | 0 |
| `RingQueue` | `Pop` — producer+consumer | 53 | 0 | 0 |
| `RingQueue` | `ForceEnqueue` — ×10 parallel | 107 | 0 | 0 |

`Drain` allocates one `[]T` slice to hold the returned items; all other operations are zero-allocation.

Benchmark history (CI, `linux/amd64`): [maxence2997.github.io/carousel/dev/bench](https://maxence2997.github.io/carousel/dev/bench/)

## License

[MIT](LICENSE)
