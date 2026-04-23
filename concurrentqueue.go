package carousel

import (
	"context"
	"fmt"
	"runtime"
	"sync/atomic"
)

// slot is a single entry in the ConcurrentQueue ring.
// The sequence field drives the Vyukov MPMC handshake:
//
//   - sequence == pos          → slot is empty and writable by the next producer at pos
//   - sequence == pos+1        → slot has been written and is readable by the consumer at pos
//   - sequence == pos+cap+1    → slot has been read and is writable again by the next producer
type slot[T any] struct {
	sequence atomic.Uint64
	data     T
}

// ConcurrentQueue is a lock-free fixed-capacity MPMC FIFO queue.
//
// Multiple goroutines may call Enqueue, TryPop, and Pop concurrently.
// Pop spins while the queue is empty — ConcurrentQueue is designed for
// always-busy high-throughput pipelines where consumers are rarely idle.
// For idle-heavy workloads or single-producer/single-consumer pipelines,
// use [RingQueue] instead.
//
// The zero value is not usable; create instances with [NewConcurrentQueue].
// Close is idempotent and must be called when the queue is no longer needed.
type ConcurrentQueue[T any] struct {
	slots  []slot[T]
	cap    uint64
	_      [56]byte // pad to avoid false sharing between head and tail
	head   atomic.Uint64
	_      [56]byte
	tail   atomic.Uint64
	_      [56]byte
	closed atomic.Bool
}

// NewConcurrentQueue creates a ConcurrentQueue with the given capacity.
//
// Panics if capacity < 1.
func NewConcurrentQueue[T any](capacity int) *ConcurrentQueue[T] {
	if capacity < 1 {
		panic(fmt.Sprintf("carousel: concurrent queue: capacity must be at least 1, got %d", capacity))
	}
	q := &ConcurrentQueue[T]{
		slots: make([]slot[T], capacity),
		cap:   uint64(capacity),
	}
	// Initialise each slot's sequence to its index so that the first producer
	// claiming position 0 sees sequence == pos (writable).
	for i := range q.slots {
		q.slots[i].sequence.Store(uint64(i))
	}
	return q
}

// Enqueue adds item to the queue.
// Returns [ErrFull] if the queue is at capacity.
// Returns [ErrClosed] if the queue has been closed.
func (q *ConcurrentQueue[T]) Enqueue(item T) error {
	if q.closed.Load() {
		return ErrClosed
	}
	for {
		tail := q.tail.Load()
		s := &q.slots[tail%q.cap]
		seq := s.sequence.Load()
		diff := int64(seq) - int64(tail)
		switch {
		case diff == 0:
			// Slot is ready to be written. Race to claim it.
			if q.tail.CompareAndSwap(tail, tail+1) {
				s.data = item
				// Publish: advance sequence to tail+1 so a consumer can read it.
				s.sequence.Store(tail + 1)
				return nil
			}
			// Another producer claimed the slot; retry with the new tail.
		case diff < 0:
			// The slot we want is still held by a consumer (queue is full).
			return ErrFull
		default:
			// Another producer advanced tail before us; retry with fresh tail.
		}
		runtime.Gosched()
	}
}

// TryPop removes and returns the front item without blocking.
// Returns (item, true) if an item was available, or (zero, false) if the queue is empty.
func (q *ConcurrentQueue[T]) TryPop() (T, bool) {
	for {
		head := q.head.Load()
		s := &q.slots[head%q.cap]
		seq := s.sequence.Load()
		diff := int64(seq) - int64(head+1)
		switch {
		case diff == 0:
			// Slot is ready to be read. Race to claim it.
			if q.head.CompareAndSwap(head, head+1) {
				item := s.data
				var zero T
				s.data = zero // release reference for GC
				// Publish: advance sequence so the slot can be reused by a producer.
				s.sequence.Store(head + q.cap)
				return item, true
			}
			// Another consumer claimed the slot; retry.
		case diff < 0:
			// No item available yet.
			var zero T
			return zero, false
		default:
			// Head has moved since we loaded it; retry.
		}
		runtime.Gosched()
	}
}

// Len returns the number of items currently in the queue.
// The value is a snapshot and may change immediately after the call.
func (q *ConcurrentQueue[T]) Len() int {
	tail := q.tail.Load()
	head := q.head.Load()
	if tail >= head {
		return int(tail - head)
	}
	return 0
}

// Cap returns the fixed capacity of the queue.
// Capacity is set at construction and never changes.
func (q *ConcurrentQueue[T]) Cap() int {
	return int(q.cap)
}

// Close marks the queue as closed.
// Idempotent — safe to call more than once.
// After Close, Enqueue returns [ErrClosed]. Pop and TryPop continue to
// deliver items already in the queue until it is empty.
func (q *ConcurrentQueue[T]) Close() {
	q.closed.Store(true)
}

// Pop blocks until an item is available, the context is canceled, or the
// queue is closed. Items already in the queue when Close or cancellation
// occurs are still delivered before the corresponding error is returned.
//
// Pop spins while waiting — see [ConcurrentQueue] for usage guidance.
// ctx must be non-nil; pass [context.Background] to opt out of cancellation.
func (q *ConcurrentQueue[T]) Pop(ctx context.Context) (T, error) {
	for {
		if v, ok := q.TryPop(); ok {
			return v, nil
		}
		if q.closed.Load() {
			var zero T
			return zero, ErrClosed
		}
		if ctx.Err() != nil {
			var zero T
			return zero, ctx.Err()
		}
		runtime.Gosched()
	}
}

// Drain removes and returns all current items in FIFO order without blocking.
// Returns nil if the queue is empty.
//
// Intended to be called after [ConcurrentQueue.Close] to flush remaining items.
// If called on an active queue, new items may be enqueued concurrently during
// the drain; no atomicity guarantee is made in that case.
func (q *ConcurrentQueue[T]) Drain() []T {
	n := q.tail.Load() - q.head.Load()
	if n == 0 {
		return nil
	}
	out := make([]T, 0, n)
	for {
		v, ok := q.TryPop()
		if !ok {
			break
		}
		out = append(out, v)
	}
	return out
}
