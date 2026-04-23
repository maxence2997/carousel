# carousel

[![CI](https://github.com/maxence2997/carousel/actions/workflows/ci.yml/badge.svg)](https://github.com/maxence2997/carousel/actions/workflows/ci.yml)
[![Go Reference](https://pkg.go.dev/badge/github.com/maxence2997/carousel.svg)](https://pkg.go.dev/github.com/maxence2997/carousel)
[![Go](https://img.shields.io/badge/Go-1.22+-blue.svg?logo=go)](https://go.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

Generic fixed-capacity ring data structures for Go.

## Quick install

```
go get github.com/maxence2997/carousel
```

## Types

| Type | Concurrency model | Description | Doc |
|---|---|---|---|
| `RingBuffer[T]` | Caller-synchronized | Fixed-capacity FIFO circular buffer. Not safe for concurrent use without external locking. | [docs/ring-buffer.md](docs/ring-buffer.md) |
| `RingQueue[T]` | MPSC | Blocking FIFO queue backed by `RingBuffer`. N producers, 1 consumer. Supports drop-on-full and evict-oldest-on-full. | [docs/ring-queue.md](docs/ring-queue.md) |
| `ConcurrentQueue[T]` | MPMC | Lock-free FIFO queue. N producers, M consumers, no mutex. | [docs/concurrent-queue.md](docs/concurrent-queue.md) |

> **MPSC** = Multiple Producer, Single Consumer.
> **MPMC** = Multiple Producer, Multiple Consumer.

## Quick start

### RingBuffer

```go
buf := carousel.NewRingBuffer[int](3)

buf.Push(1); buf.Push(2); buf.Push(3) // full
buf.Push(4)                            // false — buffer unchanged
buf.ForcePush(4)                       // evicts 1, buffer: [2, 3, 4]

v, _ := buf.Pop()    // v=2
items := buf.Drain() // [3, 4]
```

### RingQueue

```go
q := carousel.NewRingQueue[[]byte](256)
defer q.Close()

// producer goroutine(s)
q.Enqueue(data)      // ErrFull if at capacity
q.ForceEnqueue(data) // evicts oldest if full, never ErrFull

// consumer goroutine
for {
    item, err := q.Pop(ctx)
    if err != nil { return }
    process(item)
}
```

### ConcurrentQueue

```go
q := carousel.NewConcurrentQueue[[]byte](256)
defer q.Close()

// producer goroutines (many)
if err := q.Enqueue(data); err != nil {
    // err == ErrFull or ErrClosed
}

// consumer goroutines (many)
item, err := q.Pop(ctx)         // spin-waits until available
item, ok  := q.TryPop()         // non-blocking
```

## Benchmarks

See per-type results in [docs/ring-buffer.md](docs/ring-buffer.md#benchmarks), [docs/ring-queue.md](docs/ring-queue.md#benchmarks), and [docs/concurrent-queue.md](docs/concurrent-queue.md#benchmarks).

Benchmark history (CI, `linux/amd64`): [benchmarks](https://maxence2997.github.io/carousel/benchmarks/)

## License

[MIT](LICENSE)
