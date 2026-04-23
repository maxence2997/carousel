# RingBuffer[T]

Fixed-capacity FIFO circular buffer backed by a pre-allocated array.

> Not safe for concurrent use. If you need concurrent access, use [RingQueue[T]](ringqueue.md).

## Quick start

```go
buf := carousel.NewRingBuffer[int](3)

buf.Push(1)
buf.Push(2)
buf.Push(3)          // full

buf.Push(4)          // returns false — buffer unchanged
buf.ForcePush(4)     // evicts 1, buffer: [2, 3, 4]

v, _ := buf.Pop()    // v=2, buffer: [3, 4]
v, _ = buf.Peek()    // v=3, buffer unchanged

items := buf.Drain() // [3, 4], buffer empty
```

## Methods

### Constructor

**`NewRingBuffer[T](capacity int) *RingBuffer[T]`**

Allocates a new buffer of the given capacity. Panics if `capacity < 1`.

---

### Writing

**`Push(item T) bool`**

Appends `item` to the back. Returns `false` if the buffer is full — the item is **not** added and the buffer is unchanged.

**`ForcePush(item T) bool`**

Appends `item` to the back. If the buffer is full, the oldest item is silently evicted to make room. Returns `true` if an eviction occurred.

---

### Reading

**`Pop() (T, bool)`**

Removes and returns the front item. Returns the zero value of `T` and `false` if the buffer is empty.

**`Peek() (T, bool)`**

Returns the front item without removing it. Returns the zero value of `T` and `false` if the buffer is empty.

---

### Bulk operations

**`Drain() []T`**

Removes and returns all items in FIFO order. Returns `nil` if the buffer is empty. Internal slots are zeroed after draining so that held references are released to the GC.

**`Clear()`**

Removes all items and zeros all internal slots. Equivalent to `Drain` but discards the items.

---

### Capacity

**`Len() int`**

Number of items currently in the buffer.

**`Cap() int`**

Maximum number of items the buffer can hold. Fixed at construction time.

---

## Benchmarks

Measured on Apple M1 Max (`darwin/arm64`). Run `make bench` to reproduce.

| Operation | ns/op | B/op | allocs/op |
|---|---:|---:|---:|
| `Push` | 3.2 | 0 | 0 |
| `ForcePush` | 5.7 | 0 | 0 |
| `Pop` | 2.9 | 0 | 0 |
| `Drain` (256 items, ~6 ns/item) | 1,632 | 6,528 | 1 |

`Drain` allocates one `[]T` slice to hold the returned items; all other operations are zero-allocation.
