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

| Type | Description | Doc |
|---|---|---|
| `RingBuffer[T]` | Fixed-capacity FIFO circular buffer. Not safe for concurrent use. | [docs/ringbuffer.md](docs/ringbuffer.md) |
| `RingQueue[T]` | Concurrent blocking FIFO queue backed by `RingBuffer`. Supports drop-on-full and evict-oldest-on-full strategies. | [docs/ringqueue.md](docs/ringqueue.md) |
| `ConcurrentQueue[T]` | Lock-free MPMC FIFO queue. Multiple producers and consumers, no mutex. | [docs/concurrentqueue.md](docs/concurrentqueue.md) |

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

See per-type results in [docs/ringbuffer.md](docs/ringbuffer.md#benchmarks), [docs/ringqueue.md](docs/ringqueue.md#benchmarks), and [docs/concurrentqueue.md](docs/concurrentqueue.md#benchmarks).

Benchmark history (CI, `linux/amd64`): [benchmarks](https://maxence2997.github.io/carousel/benchmarks/)

## License

[MIT](LICENSE)
