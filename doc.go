// Package carousel provides generic fixed-capacity ring data structures.
//
// Two types are available:
//
//   - [RingBuffer] — a fixed-capacity FIFO circular buffer. Not safe for
//     concurrent use; callers must synchronize externally.
//
//   - [RingQueue] — a concurrent blocking FIFO queue backed by [RingBuffer].
//     Supports both drop-on-full and evict-oldest-on-full enqueue strategies,
//     and a blocking [RingQueue.Pop] that integrates with [context.Context].
package carousel
