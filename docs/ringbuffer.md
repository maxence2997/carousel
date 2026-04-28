# RingBuffer[T]

Fixed-capacity FIFO circular buffer backed by a pre-allocated array.

> Not safe for concurrent use. If you need concurrent access, use [RingQueue[T]](ringqueue.md).

## Quick start

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

Run `make bench-sync` to refresh these local numbers.

<!-- benchsync:ringbuffer:start -->
Measured on `darwin/arm64` (`Apple M1 Max`).

| Operation | ns/op | B/op | allocs/op |
|---|---:|---:|---:|
| `Push` | 2.979 | 0 | 0 |
| `ForcePush` | 5.553 | 0 | 0 |
| `Pop` | 2.893 | 0 | 0 |
| `Drain (256 items)` | 1,495 | 6,528 | 1 |
<!-- benchsync:ringbuffer:end -->

`Drain` allocates one `[]T` slice to hold the returned items; all other operations are zero-allocation.
