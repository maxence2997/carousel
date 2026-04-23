# ConcurrentQueue[T]

> Concurrency: **MPMC** (Multiple Producer, Multiple Consumer) — any number of goroutines may enqueue and dequeue concurrently without a mutex.

Lock-free FIFO queue backed by a Vyukov-style ring with per-slot sequence counters.

## Concurrency model

```
producer goroutines ──Enqueue──> [ queue ] ──Pop/TryPop──> consumer goroutines
```

- **Multiple producers, multiple consumers.** All methods are safe for concurrent use.
- **Enqueue never blocks.** Returns `ErrFull` when the queue is at capacity.
- **Pop spins while the queue is empty.** Uses `runtime.Gosched()` between attempts. Best suited for always-busy high-throughput pipelines where consumers are rarely idle. For idle-heavy workloads, use [RingQueue](ringqueue.md) instead.
- **No `ForceEnqueue`.** Drop-oldest semantics are not supported in the lock-free design. Use [RingQueue](ringqueue.md) if you need evict-oldest behaviour.

## Quick start

```go
q := carousel.NewConcurrentQueue[[]byte](256)
defer q.Close()

// Producer goroutines
if err := q.Enqueue(data); err != nil {
    // err == ErrFull or ErrClosed
}

// Consumer goroutines — blocking
for {
    item, err := q.Pop(ctx)
    if err != nil {
        return // ctx canceled or queue closed
    }
    process(item)
}

// Consumer goroutines — non-blocking
if item, ok := q.TryPop(); ok {
    process(item)
}
```

## Methods

### Constructor

**`NewConcurrentQueue[T](capacity int) *ConcurrentQueue[T]`**

Allocates a new queue of the given capacity. Panics if `capacity < 2` (the Vyukov MPMC algorithm requires at least 2 slots to distinguish between written and consumed slot states).

---

### Producing

**`Enqueue(item T) error`**

Appends `item` to the back of the queue. Non-blocking.

| Error | Condition |
|---|---|
| `ErrFull` | Queue is at capacity -- item is not added |
| `ErrClosed` | Queue has been closed |

---

### Consuming

**`TryPop() (T, bool)`**

Removes and returns the front item without blocking. Returns `(zero, false)` if the queue is empty.

**`Pop(ctx context.Context) (T, error)`**

Removes and returns the front item. Spins while the queue is empty.

| Return | Condition |
|---|---|
| `item, nil` | Item successfully dequeued |
| `zero, ctx.Err()` | Context was canceled or deadline exceeded |
| `zero, ErrClosed` | Queue was closed and no items remain |

> Items already in the queue when `Close` or context cancellation occurs are still delivered. `ErrClosed` and `ctx.Err()` are only returned after the buffer is empty.

`ctx` must be non-nil. Pass `context.Background()` to block indefinitely until an item is available or the queue is closed.

---

### Lifecycle

**`Close()`**

Closes the queue. Safe to call multiple times. After `Close`:

- `Enqueue` returns `ErrClosed` immediately.
- Pending and future `Pop`/`TryPop` calls drain remaining items, then return `ErrClosed` / `(zero, false)`.

---

### Utility

**`Len() int`**

Number of items currently in the queue. The value is a snapshot and may change immediately after the call.

**`Cap() int`**

Maximum number of items the queue can hold. Fixed at construction time.

**`Drain() []T`**

Removes and returns all current items in FIFO order via repeated `TryPop`. Returns `nil` if the queue is empty. Intended to be called after `Close` to flush remaining items. If called on an active queue, new items may be enqueued concurrently during the drain; no atomicity guarantee is made in that case.

---

## Algorithm

ConcurrentQueue uses the Vyukov bounded MPMC queue algorithm:

- Each slot holds a **sequence counter** (`atomic.Uint64`) and the data value.
- Two global counters, **head** and **tail** (`atomic.Uint64`), track the next read and write positions.
- Producers CAS-reserve a tail position, write the item, then advance the slot's sequence.
- Consumers CAS-reserve a head position, read the item, then advance the slot's sequence.
- The sequence handshake ensures correct visibility without any mutex.

Head, tail, and the closed flag are cache-line padded to avoid false sharing.

---

## Benchmarks

Measured on Apple M1 Max (`darwin/arm64`). Run `make bench` to reproduce.

| Operation | ns/op | B/op | allocs/op |
|---|---:|---:|---:|
| `Enqueue` (serial, no contention) | 20.5 | 0 | 0 |
| `TryPop` (serial, no contention) | 21.2 | 0 | 0 |
| `Pop` -- 1 producer + 1 consumer goroutine | 28.7 | 0 | 0 |
| `Enqueue` -- GOMAXPROCS parallel writers | 57.7 | 0 | 0 |

All operations are zero-allocation. Compared to `RingQueue` (~107 ns/op parallel), `ConcurrentQueue` achieves ~2x throughput under GOMAXPROCS contention.
