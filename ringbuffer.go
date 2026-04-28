package carousel

import "fmt"

// RingBuffer is a fixed-capacity FIFO circular buffer.
//
// The zero value is not usable; create instances with [NewRingBuffer].
// Not safe for concurrent use — callers are responsible for synchronization
// when shared across goroutines.
//
// Internal layout: head is the index of the oldest element; the write
// position (tail) is derived as (head+size)%len(data) and is not stored.
type RingBuffer[T any] struct {
	data []T
	head int // index of the oldest element
	size int // number of elements currently stored
}

// NewRingBuffer creates a RingBuffer with the given capacity.
//
// Panics if capacity < 1.
func NewRingBuffer[T any](capacity int) *RingBuffer[T] {
	if capacity < 1 {
		panic(fmt.Sprintf("carousel: ring buffer: capacity must be at least 1, got %d", capacity))
	}
	return &RingBuffer[T]{
		data: make([]T, capacity),
	}
}

// Push appends item to the back of the buffer.
// Returns false if the buffer is full; the item is not added.
func (rb *RingBuffer[T]) Push(item T) bool {
	if rb.size == len(rb.data) {
		return false
	}
	rb.data[(rb.head+rb.size)%len(rb.data)] = item
	rb.size++
	return true
}

// ForcePush appends item to the back of the buffer. If the buffer is full,
// the oldest item is evicted to make room.
// Returns true if an item was evicted.
func (rb *RingBuffer[T]) ForcePush(item T) (evicted bool) {
	if rb.size == len(rb.data) {
		// Overwrite the oldest slot and advance head.
		rb.data[rb.head] = item
		rb.head = (rb.head + 1) % len(rb.data)
		return true
	}
	rb.data[(rb.head+rb.size)%len(rb.data)] = item
	rb.size++
	return false
}

// Pop removes and returns the oldest item.
// Returns the zero value of T and false if the buffer is empty.
func (rb *RingBuffer[T]) Pop() (T, bool) {
	if rb.size == 0 {
		var zero T
		return zero, false
	}
	item := rb.data[rb.head]
	var zero T
	rb.data[rb.head] = zero // release reference for GC
	rb.head = (rb.head + 1) % len(rb.data)
	rb.size--
	return item, true
}

// Peek returns the oldest item without removing it.
// Returns the zero value of T and false if the buffer is empty.
func (rb *RingBuffer[T]) Peek() (T, bool) {
	if rb.size == 0 {
		var zero T
		return zero, false
	}
	return rb.data[rb.head], true
}

// Drain removes and returns all items in FIFO order.
// Returns nil if the buffer is empty.
// After Drain, the buffer is empty and all internal slots are zeroed.
func (rb *RingBuffer[T]) Drain() []T {
	if rb.size == 0 {
		return nil
	}
	out := make([]T, rb.size)
	end := rb.head + rb.size
	if end <= len(rb.data) {
		copy(out, rb.data[rb.head:end])
		clear(rb.data[rb.head:end]) // release references for GC
	} else {
		n := copy(out, rb.data[rb.head:])
		copy(out[n:], rb.data[:end-len(rb.data)])
		clear(rb.data[rb.head:])          // release references for GC
		clear(rb.data[:end-len(rb.data)]) // release references for GC
	}
	rb.head = 0
	rb.size = 0
	return out
}

// Len returns the number of items currently in the buffer.
func (rb *RingBuffer[T]) Len() int {
	return rb.size
}

// Cap returns the maximum number of items the buffer can hold.
func (rb *RingBuffer[T]) Cap() int {
	return len(rb.data)
}

// Clear removes all items and releases slot references for GC.
func (rb *RingBuffer[T]) Clear() {
	if rb.size == 0 {
		return
	}
	end := rb.head + rb.size
	if end <= len(rb.data) {
		clear(rb.data[rb.head:end])
	} else {
		clear(rb.data[rb.head:])
		clear(rb.data[:end-len(rb.data)])
	}
	rb.head = 0
	rb.size = 0
}
