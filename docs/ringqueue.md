# RingQueue[T]

Concurrent blocking FIFO queue backed by [RingBuffer[T]](ringbuffer.md).

## Concurrency model

```
producer goroutines ──Enqueue/ForceEnqueue──▶ [ queue ] ──Pop──▶ consumer goroutine
```

- **Producers never block.** `Enqueue` rejects when full; `ForceEnqueue` evicts the oldest item.
- **The consumer blocks.** `Pop` sleeps until an item is available, the context is canceled, or the queue is closed.
- Designed for **N producers, 1 consumer**. Multiple concurrent consumers are not a supported pattern.

## Quick start

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

## Methods

### Constructor

**`NewRingQueue[T](capacity int) *RingQueue[T]`**

Allocates a new queue of the given capacity. Panics if `capacity < 1`.

---

### Producing

**`Enqueue(item T) error`**

Appends `item` to the back of the queue. Non-blocking.

| Error | Condition |
|---|---|
| `ErrFull` | Queue is at capacity — item is not added |
| `ErrClosed` | Queue has been closed |

**`ForceEnqueue(item T) (evicted bool, err error)`**

Appends `item` to the back. If the queue is full, the oldest item is silently evicted. Returns `evicted=true` when an eviction occurred. Only returns `ErrClosed` — never `ErrFull`.

---

### Consuming

**`Pop(ctx context.Context) (T, error)`**

Removes and returns the front item. Blocks if the queue is empty.

| Return | Condition |
|---|---|
| `item, nil` | Item successfully dequeued |
| `zero, ctx.Err()` | Context was canceled or deadline exceeded |
| `zero, ErrClosed` | Queue was closed and no items remain |

> Items already in the queue when `Close` or context cancellation occurs are still delivered. `ErrClosed` and `ctx.Err()` are only returned after the buffer is drained.

`ctx` must be non-nil. Pass `context.Background()` to block indefinitely until an item is available or the queue is closed.

---

### Lifecycle

**`Close()`**

Closes the queue. Safe to call multiple times. After `Close`:

- `Enqueue` and `ForceEnqueue` return `ErrClosed` immediately.
- Pending and future `Pop` calls drain remaining items, then return `ErrClosed`.

---

### Utility

**`Len() int`**

Number of items currently in the queue.

**`Cap() int`**

Maximum number of items the queue can hold. Fixed at construction time.

**`Drain() []T`**

Removes and returns all current items in FIFO order without blocking. Returns `nil` if the queue is empty. Useful for flushing remaining items after `Close`.

---

## Benchmarks

Run `make bench-sync` to refresh these local numbers.

<!-- benchsync:ringqueue:start -->
Measured on `darwin/arm64` (`Apple M1 Max`).

| Operation | ns/op | B/op | allocs/op |
|---|---:|---:|---:|
| `ForceEnqueue (serial, no contention)` | 13.76 | 0 | 0 |
| `ProducerConsumer (1 producer + 1 consumer)` | 71.02 | 0 | 0 |
| `ForceEnqueue (parallel writers)` | 109.7 | 0 | 0 |
<!-- benchsync:ringqueue:end -->

The serial baseline (~14 ns) reflects uncontended mutex overhead on top of the underlying `RingBuffer` (~3 ns). The producer/consumer benchmark still reports `0 allocs/op`, but may show a few `B/op` from the benchmark harness.
