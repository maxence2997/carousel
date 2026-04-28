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

## Quick start

### RingBuffer

<!-- examplesync:ExampleRingBuffer:start -->
```go
buf := carousel.NewRingBuffer[int](3)

buf.Push(1)
buf.Push(2)
buf.Push(3)
buf.ForcePush(4)

value, _ := buf.Pop()
fmt.Println(value)
fmt.Println(buf.Drain())
```
<!-- examplesync:ExampleRingBuffer:end -->

### RingQueue

<!-- examplesync:ExampleRingQueue:start -->
```go
q := carousel.NewRingQueue[string](3)
defer q.Close()

_ = q.Enqueue("alpha")
_ = q.Enqueue("beta")

item, _ := q.Pop(context.Background())
fmt.Println(item)
fmt.Println(q.Drain())
```
<!-- examplesync:ExampleRingQueue:end -->

## Benchmarks

See per-type results in [docs/ringbuffer.md](docs/ringbuffer.md#benchmarks) and [docs/ringqueue.md](docs/ringqueue.md#benchmarks).

Benchmark history (CI, `linux/amd64`): [benchmarks](https://maxence2997.github.io/carousel/benchmarks/)

## Tooling

- `make examples-sync` refreshes runnable examples in the README and package docs from [examples_test.go](examples_test.go).
- `make bench-sync` reruns local benchmarks and rewrites the benchmark tables in [docs/](docs/).
- `make stresslab` runs the local race/stress matrix for the queue regression tests.

## License

[MIT](LICENSE)
