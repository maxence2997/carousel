package carousel_test

import (
	"context"
	"runtime"
	"sync"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/maxence2997/carousel"
)

// ── A: Enqueue ───────────────────────────────────────────────────────────────

func TestConcurrentQueue_A1_EnqueueSucceeds(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](4)
	defer q.Close()
	err := q.Enqueue([]byte("a"))
	assert.NoError(t, err)
	assert.Equal(t, 1, q.Len())
}

func TestConcurrentQueue_A2_EnqueueRejectsWhenFull(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](2)
	defer q.Close()
	require.NoError(t, q.Enqueue([]byte("a")))
	require.NoError(t, q.Enqueue([]byte("b")))
	err := q.Enqueue([]byte("c"))
	assert.ErrorIs(t, err, carousel.ErrFull)
	assert.Equal(t, 2, q.Len())
}

func TestConcurrentQueue_A3_EnqueueAfterClose(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](4)
	q.Close()
	err := q.Enqueue([]byte("x"))
	assert.ErrorIs(t, err, carousel.ErrClosed)
}

// ── B: TryPop ────────────────────────────────────────────────────────────────

func TestConcurrentQueue_B1_TryPopReturnsItem(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](4)
	defer q.Close()
	require.NoError(t, q.Enqueue([]byte("hello")))
	v, ok := q.TryPop()
	assert.True(t, ok)
	assert.Equal(t, []byte("hello"), v)
	assert.Equal(t, 0, q.Len())
}

func TestConcurrentQueue_B2_TryPopReturnsFalseWhenEmpty(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](4)
	defer q.Close()
	v, ok := q.TryPop()
	assert.False(t, ok)
	assert.Nil(t, v)
}

func TestConcurrentQueue_B3_TryPopFIFOOrder(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[int](4)
	defer q.Close()
	for i := range 4 {
		require.NoError(t, q.Enqueue(i))
	}
	for i := range 4 {
		v, ok := q.TryPop()
		assert.True(t, ok)
		assert.Equal(t, i, v)
	}
}

// ── C: Cap / Len ─────────────────────────────────────────────────────────────

func TestConcurrentQueue_C1_CapIsConstant(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](8)
	defer q.Close()
	assert.Equal(t, 8, q.Cap())
	require.NoError(t, q.Enqueue([]byte("a")))
	assert.Equal(t, 8, q.Cap())
}

func TestConcurrentQueue_C2_PanicsOnZeroCapacity(t *testing.T) {
	t.Parallel()
	assert.Panics(t, func() { carousel.NewConcurrentQueue[int](0) })
}

// ── D: Pop ───────────────────────────────────────────────────────────────────

func TestConcurrentQueue_D1_PopBlocksUntilEnqueue(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](4)
	defer q.Close()
	ready := make(chan struct{})
	result := make(chan []byte, 1)
	go func() {
		close(ready)
		data, _ := q.Pop(context.Background())
		result <- data
	}()
	<-ready
	require.NoError(t, q.Enqueue([]byte("wakeup")))
	select {
	case data := <-result:
		assert.Equal(t, []byte("wakeup"), data)
	case <-time.After(time.Second):
		t.Fatal("Pop did not unblock after Enqueue")
	}
}

func TestConcurrentQueue_D2_PopUnblocksOnClose(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](4)
	ready := make(chan struct{})
	errCh := make(chan error, 1)
	go func() {
		close(ready)
		_, err := q.Pop(context.Background())
		errCh <- err
	}()
	<-ready
	q.Close()
	select {
	case err := <-errCh:
		assert.ErrorIs(t, err, carousel.ErrClosed)
	case <-time.After(time.Second):
		t.Fatal("Pop did not unblock after Close")
	}
}

func TestConcurrentQueue_D3_PopUnblocksOnContextCancel(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](4)
	defer q.Close()
	ctx, cancel := context.WithCancel(context.Background())
	ready := make(chan struct{})
	errCh := make(chan error, 1)
	go func() {
		close(ready)
		_, err := q.Pop(ctx)
		errCh <- err
	}()
	<-ready
	cancel()
	select {
	case err := <-errCh:
		assert.ErrorIs(t, err, context.Canceled)
	case <-time.After(time.Second):
		t.Fatal("Pop did not unblock after context cancel")
	}
}

func TestConcurrentQueue_D4_PopDrainsBeforeClose(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](4)
	require.NoError(t, q.Enqueue([]byte("a")))
	require.NoError(t, q.Enqueue([]byte("b")))
	q.Close()
	data1, err1 := q.Pop(context.Background())
	data2, err2 := q.Pop(context.Background())
	_, err3 := q.Pop(context.Background())
	assert.NoError(t, err1)
	assert.NoError(t, err2)
	assert.Equal(t, []byte("a"), data1)
	assert.Equal(t, []byte("b"), data2)
	assert.ErrorIs(t, err3, carousel.ErrClosed)
}

// ── E: Drain ─────────────────────────────────────────────────────────────────

func TestConcurrentQueue_E1_DrainReturnsAllItems(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](4)
	defer q.Close()
	require.NoError(t, q.Enqueue([]byte("x")))
	require.NoError(t, q.Enqueue([]byte("y")))
	got := q.Drain()
	assert.Equal(t, [][]byte{[]byte("x"), []byte("y")}, got)
	assert.Equal(t, 0, q.Len())
}

func TestConcurrentQueue_E2_DrainReturnsNilWhenEmpty(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](4)
	defer q.Close()
	assert.Nil(t, q.Drain())
}

func TestConcurrentQueue_E3_DrainAfterClose(t *testing.T) {
	t.Parallel()
	q := carousel.NewConcurrentQueue[[]byte](4)
	require.NoError(t, q.Enqueue([]byte("a")))
	require.NoError(t, q.Enqueue([]byte("b")))
	q.Close()
	got := q.Drain()
	assert.Equal(t, [][]byte{[]byte("a"), []byte("b")}, got)
	assert.Equal(t, 0, q.Len())
}

// ── F: Concurrency ───────────────────────────────────────────────────────────

// TestConcurrentQueue_F1_ConcurrentEnqueueTryPopNoRace verifies that concurrent
// producers and consumers do not trigger the race detector.
func TestConcurrentQueue_F1_ConcurrentEnqueueTryPopNoRace(t *testing.T) {
	t.Parallel()
	const workers = 4
	const perWorker = 64
	q := carousel.NewConcurrentQueue[int](32)
	defer q.Close()

	var wg sync.WaitGroup
	for range workers {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for i := range perWorker {
				_ = q.Enqueue(i) // ErrFull is acceptable under concurrent load
			}
		}()
	}
	for range workers {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for range perWorker {
				q.TryPop() //nolint:errcheck
			}
		}()
	}
	wg.Wait()
}

// ── Benchmarks ───────────────────────────────────────────────────────────────

// BenchmarkConcurrentQueue_Enqueue measures single-goroutine Enqueue throughput
// with no contention; queue is kept from filling by interleaving TryPop.
func BenchmarkConcurrentQueue_Enqueue(b *testing.B) {
	q := carousel.NewConcurrentQueue[[]byte](256)
	defer q.Close()
	data := make([]byte, 64)
	b.ResetTimer()
	for range b.N {
		if q.Enqueue(data) == carousel.ErrFull {
			q.TryPop()
			q.Enqueue(data) //nolint:errcheck
		}
	}
}

// BenchmarkConcurrentQueue_TryPop measures single-goroutine TryPop throughput
// from a pre-filled queue.
func BenchmarkConcurrentQueue_TryPop(b *testing.B) {
	q := carousel.NewConcurrentQueue[[]byte](256)
	defer q.Close()
	data := make([]byte, 64)
	b.ResetTimer()
	for range b.N {
		if _, ok := q.TryPop(); !ok {
			q.Enqueue(data) //nolint:errcheck
			q.TryPop()      //nolint:errcheck
		}
	}
}

// BenchmarkConcurrentQueue_ProducerConsumer measures Enqueue throughput with a
// concurrent consumer draining the queue via Pop.
func BenchmarkConcurrentQueue_ProducerConsumer(b *testing.B) {
	q := carousel.NewConcurrentQueue[[]byte](256)
	data := make([]byte, 64)
	ctx, cancel := context.WithCancel(context.Background())

	consumed := make(chan struct{})
	go func() {
		defer close(consumed)
		for {
			if _, err := q.Pop(ctx); err != nil {
				return
			}
		}
	}()

	b.ResetTimer()
	for range b.N {
		for q.Enqueue(data) == carousel.ErrFull {
			runtime.Gosched()
		}
	}
	b.StopTimer()

	cancel()
	q.Close()
	<-consumed
}

// BenchmarkConcurrentQueue_Parallel measures Enqueue throughput under
// GOMAXPROCS concurrent writers — the primary benchmark target (sub-30 ns/op).
func BenchmarkConcurrentQueue_Parallel(b *testing.B) {
	q := carousel.NewConcurrentQueue[[]byte](512)
	defer q.Close()
	data := make([]byte, 64)

	// Background consumer to prevent the queue from filling up permanently.
	ctx, cancel := context.WithCancel(context.Background())
	consumed := make(chan struct{})
	go func() {
		defer close(consumed)
		for {
			if _, err := q.Pop(ctx); err != nil {
				return
			}
		}
	}()

	b.ResetTimer()
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			for q.Enqueue(data) == carousel.ErrFull {
				runtime.Gosched()
			}
		}
	})
	b.StopTimer()

	cancel()
	q.Close()
	<-consumed
}
