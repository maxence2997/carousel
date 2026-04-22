package carousel

import (
	"context"
	"errors"
	"sync"
)

// ErrFull is returned by [RingQueue.Enqueue] when the queue is at capacity.
var ErrFull = errors.New("carousel: queue is full")

// ErrClosed is returned by [RingQueue.Enqueue], [RingQueue.ForceEnqueue], and
// [RingQueue.Pop] after [RingQueue.Close] has been called.
var ErrClosed = errors.New("carousel: queue is closed")

// RingQueue is a concurrent fixed-capacity FIFO queue backed by [RingBuffer].
//
// The zero value is not usable; create instances with [NewRingQueue].
// Multiple goroutines may call Enqueue and ForceEnqueue concurrently.
// Pop is intended to be called by a single goroutine (consumer).
// Close is idempotent and must be called when the queue is no longer needed.
type RingQueue[T any] struct {
	mu     sync.Mutex
	cond   *sync.Cond
	buf    *RingBuffer[T]
	closed bool
}

// NewRingQueue creates a RingQueue with the given capacity.
//
// Panics if capacity < 1.
func NewRingQueue[T any](capacity int) *RingQueue[T] {
	q := &RingQueue[T]{
		buf: NewRingBuffer[T](capacity),
	}
	q.cond = sync.NewCond(&q.mu)
	return q
}

// Enqueue adds item to the queue.
// Returns [ErrFull] if the queue is at capacity.
// Returns [ErrClosed] if the queue has been closed.
func (q *RingQueue[T]) Enqueue(item T) error {
	q.mu.Lock()
	defer q.mu.Unlock()

	if q.closed {
		return ErrClosed
	}
	if !q.buf.Push(item) {
		return ErrFull
	}
	q.cond.Signal()
	return nil
}

// ForceEnqueue adds item to the queue, evicting the oldest item if full.
// Returns true if an item was evicted.
// Returns [ErrClosed] if the queue has been closed.
func (q *RingQueue[T]) ForceEnqueue(item T) (evicted bool, err error) {
	q.mu.Lock()
	defer q.mu.Unlock()

	if q.closed {
		return false, ErrClosed
	}
	evicted = q.buf.ForcePush(item)
	q.cond.Signal()
	return evicted, nil
}

// Pop blocks until an item is available, the context is canceled, or the
// queue is closed. Available items are always delivered before cancellation
// or close signals are returned. Returns [ErrClosed] when the queue is closed
// and all remaining items have been consumed. Returns ctx.Err() when the
// context is canceled and the buffer is empty.
//
// Concurrent calls to Pop are not supported — use a single consumer goroutine.
// ctx must be non-nil; pass [context.Background] to opt out of cancellation.
func (q *RingQueue[T]) Pop(ctx context.Context) (T, error) {
	// Register context cancellation to wake the blocked cond.Wait.
	// The callback acquires q.mu before broadcasting to prevent a lost-wakeup:
	// if the context is canceled between the ctx.Err() check and cond.Wait(),
	// the broadcast fires after Wait() is entered, not before.
	stop := context.AfterFunc(ctx, func() {
		q.mu.Lock()
		q.cond.Broadcast()
		q.mu.Unlock()
	})
	defer stop()

	q.mu.Lock()
	defer q.mu.Unlock()

	for {
		if item, ok := q.buf.Pop(); ok {
			return item, nil
		}
		if q.closed {
			var zero T
			return zero, ErrClosed
		}
		if ctx.Err() != nil {
			var zero T
			return zero, ctx.Err()
		}
		q.cond.Wait()
	}
}

// Drain removes and returns all current items in FIFO order without blocking.
// Returns nil if the queue is empty.
//
// Unlike [RingQueue.Pop], Drain does not wait for new items — it returns
// whatever is in the buffer at the moment of the call. Useful for bulk
// reads or flushing remaining items during shutdown without going through
// the blocking Pop interface.
func (q *RingQueue[T]) Drain() []T {
	q.mu.Lock()
	defer q.mu.Unlock()
	return q.buf.Drain()
}

// Len returns the number of items currently in the queue.
func (q *RingQueue[T]) Len() int {
	q.mu.Lock()
	defer q.mu.Unlock()
	return q.buf.Len()
}

// Cap returns the fixed capacity of the queue.
// Capacity is set at construction and never changes; RingQueue does not support resizing.
func (q *RingQueue[T]) Cap() int {
	// No lock needed — capacity is immutable after construction.
	return q.buf.Cap()
}

// Close marks the queue as closed and wakes any goroutine blocked in Pop.
// Idempotent — safe to call more than once; subsequent calls are no-ops.
func (q *RingQueue[T]) Close() {
	q.mu.Lock()
	defer q.mu.Unlock()
	if q.closed {
		return
	}
	q.closed = true
	q.cond.Broadcast()
}
