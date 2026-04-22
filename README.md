# carousel

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

buf := carousel.NewRingBuffer[int](4)

buf.Push(1)
buf.Push(2)
buf.Push(3)

v, ok := buf.Pop()   // v=1, ok=true
v, ok  = buf.Peek()  // v=2, ok=true (no removal)

// ForcePush evicts the oldest item when full
buf.ForcePush(10)
buf.ForcePush(11)
buf.ForcePush(12)
evicted := buf.ForcePush(13) // evicted=true, oldest dropped

items := buf.Drain() // removes and returns all items in FIFO order
```

### RingQueue

```go
import (
    "context"
    "github.com/maxence2997/carousel"
)

q := carousel.NewRingQueue[[]byte](256)
defer q.Close()

// Producer goroutines
err := q.Enqueue(data)              // returns ErrFull if at capacity
evicted, err := q.ForceEnqueue(data) // evicts oldest if full

// Single consumer goroutine
item, err := q.Pop(ctx) // blocks until item available, ctx cancelled, or queue closed
if err == carousel.ErrClosed {
    // queue was closed
}
```

## Errors

| Error | Description |
|-------|-------------|
| `carousel.ErrFull` | `Enqueue` called on a full queue |
| `carousel.ErrClosed` | Operation on a closed queue |

## License

[MIT](LICENSE)
