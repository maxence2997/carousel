// Package carousel provides generic fixed-capacity ring data structures.
//
// Three types are available:
//
//   - [RingBuffer] — a fixed-capacity FIFO circular buffer. Not safe for
//     concurrent use; callers must synchronize externally.
//
//   - [RingQueue] — a concurrent blocking FIFO queue backed by [RingBuffer].
//     Supports both drop-on-full and evict-oldest-on-full enqueue strategies,
//     and a blocking [RingQueue.Pop] that integrates with [context.Context].
//     Designed for N-producer, 1-consumer pipelines.
//
//   - [ConcurrentQueue] — a lock-free MPMC FIFO queue backed by a Vyukov-style
//     ring with per-slot sequence counters. Multiple goroutines may enqueue and
//     pop concurrently without a mutex. Pop spins while the queue is empty, so
//     this type is best suited for always-busy high-throughput pipelines.
package carousel
