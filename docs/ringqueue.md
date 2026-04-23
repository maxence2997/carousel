# RingQueue[T]

> Concurrency: **MPSC** (Multiple Producer, Single Consumer) — N goroutines may enqueue concurrently; only one goroutine should call Pop.

Concurrent blocking FIFO queue backed by [RingBuffer[T]](ringbuffer.md).

## Concurrency model

```
producer goroutines ──Enqueue/ForceEnqueue──▶ [ queue ] ──Pop──▶ consumer goroutine
```

- **Producers never block.** `Enqueue` rejects when full; `ForceEnqueue` evicts the oldest item.
- **The consumer blocks.** `Pop` sleeps until an item is available, the context is canceled, or the queue is closed.
- Designed for **N producers, 1 consumer**. Multiple concurrent consumers are not a supported pattern.

## Quick start

```go
q := carousel.NewRingQueue[[]byte](256)
defer q.Close()

// Producer goroutine(s)
if err := q.Enqueue(data); err != nil {
    // err == ErrFull or ErrClosed
}
_, _ = q.ForceEnqueue(data) // never returns ErrFull

// Consumer goroutine
for {
    item, err := q.Pop(ctx)
    if err != nil {
        return // ctx canceled or queue closed
    }
    process(item)
}
```

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

Measured on Apple M1 Max (`darwin/arm64`). Run `make bench` to reproduce.

| Operation | ns/op | B/op | allocs/op |
|---|---:|---:|---:|
| `ForceEnqueue` (serial, no contention) | 13.8 | 0 | 0 |
| `Pop` — 1 producer + 1 consumer goroutine | 53 | 0 | 0 |
| `ForceEnqueue` — ×10 parallel writers | 107 | 0 | 0 |

All operations are zero-allocation. The serial baseline (~14 ns) reflects uncontended mutex overhead on top of the underlying `RingBuffer` (~3 ns).
