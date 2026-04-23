package carousel_test

import (
	"context"
	"sync"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"

	"github.com/maxence2997/carousel"
)

// ── A: Enqueue ───────────────────────────────────────────────────────────────

func TestRingQueue_A1_EnqueueSucceeds(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
	defer q.Close()
	err := q.Enqueue([]byte("a"))
	assert.NoError(t, err)
	assert.Equal(t, 1, q.Len())
}

func TestRingQueue_A2_EnqueueRejectsWhenFull(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](2)
	defer q.Close()
	require.NoError(t, q.Enqueue([]byte("a")))
	require.NoError(t, q.Enqueue([]byte("b")))
	err := q.Enqueue([]byte("c"))
	assert.ErrorIs(t, err, carousel.ErrFull)
	assert.Equal(t, 2, q.Len())
}

func TestRingQueue_A3_EnqueueAfterClose(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
	q.Close()
	err := q.Enqueue([]byte("x"))
	assert.ErrorIs(t, err, carousel.ErrClosed)
}

// ── B: ForceEnqueue ──────────────────────────────────────────────────────────

func TestRingQueue_B1_ForceEnqueueNoEviction(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
	defer q.Close()
	evicted, err := q.ForceEnqueue([]byte("a"))
	assert.NoError(t, err)
	assert.False(t, evicted)
}

func TestRingQueue_B2_ForceEnqueueEvictsOldest(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](2)
	defer q.Close()
	require.NoError(t, q.Enqueue([]byte("old1")))
	require.NoError(t, q.Enqueue([]byte("old2")))
	evicted, err := q.ForceEnqueue([]byte("new"))
	assert.NoError(t, err)
	assert.True(t, evicted)
	assert.Equal(t, 2, q.Len())
	drained := q.Drain()
	assert.Equal(t, [][]byte{[]byte("old2"), []byte("new")}, drained)
}

func TestRingQueue_B3_ForceEnqueueAfterClose(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
	q.Close()
	_, err := q.ForceEnqueue([]byte("x"))
	assert.ErrorIs(t, err, carousel.ErrClosed)
}

// ── C: Pop ───────────────────────────────────────────────────────────────────

func TestRingQueue_C1_PopReturnsItem(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
	defer q.Close()
	require.NoError(t, q.Enqueue([]byte("hello")))
	data, err := q.Pop(context.Background())
	assert.NoError(t, err)
	assert.Equal(t, []byte("hello"), data)
}

func TestRingQueue_C2_PopBlocksUntilEnqueue(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
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

func TestRingQueue_C3_PopUnblocksOnClose(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
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

func TestRingQueue_C4_PopUnblocksOnContextCancel(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
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

// TestRingQueue_C4b_PopCancelRaceLostWakeup is a regression test for the
// lost-wakeup race: context.AfterFunc must hold the queue lock before
// broadcasting so that a cancellation that occurs between the ctx.Err()
// check and the cond.Wait() call is never silently dropped.
func TestRingQueue_C4b_PopCancelRaceLostWakeup(t *testing.T) {
	t.Parallel()
	const iterations = 10000
	for range iterations {
		ctx, cancel := context.WithCancel(context.Background())
		q := carousel.NewRingQueue[[]byte](1)
		done := make(chan error, 1)
		go func() {
			_, err := q.Pop(ctx)
			done <- err
		}()
		cancel()
		timer := time.NewTimer(time.Second)
		select {
		case err := <-done:
			timer.Stop()
			assert.ErrorIs(t, err, context.Canceled)
			q.Close()
		case <-timer.C:
			t.Fatal("Pop blocked despite context cancel (lost-wakeup regression)")
		}
	}
}

func TestRingQueue_C5_PopDrainsExistingItemsBeforeClose(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
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

// ── D: Drain ─────────────────────────────────────────────────────────────────

func TestRingQueue_D1_DrainReturnsAllItems(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
	defer q.Close()
	require.NoError(t, q.Enqueue([]byte("x")))
	require.NoError(t, q.Enqueue([]byte("y")))
	got := q.Drain()
	assert.Equal(t, [][]byte{[]byte("x"), []byte("y")}, got)
	assert.Equal(t, 0, q.Len())
}

func TestRingQueue_D2_DrainReturnsNilWhenEmpty(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
	defer q.Close()
	assert.Nil(t, q.Drain())
}

// ── E: Cap / Len ─────────────────────────────────────────────────────────────

func TestRingQueue_E1_CapIsConstant(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](8)
	defer q.Close()
	assert.Equal(t, 8, q.Cap())
	require.NoError(t, q.Enqueue([]byte("a")))
	assert.Equal(t, 8, q.Cap())
}

// ── F: Concurrency ───────────────────────────────────────────────────────────

func TestRingQueue_F1_ConcurrentEnqueueNoRace(t *testing.T) {
	t.Parallel()
	const bufSize = 16
	const workers = 8
	const perWorker = 64
	q := carousel.NewRingQueue[[]byte](bufSize)

	ctx, cancel := context.WithCancel(context.Background())

	var popped int
	var popMu sync.Mutex
	popDone := make(chan struct{})
	go func() {
		defer close(popDone)
		for {
			_, err := q.Pop(ctx)
			if err != nil {
				return
			}
			popMu.Lock()
			popped++
			popMu.Unlock()
		}
	}()

	var wg sync.WaitGroup
	for range workers {
		wg.Add(1)
		go func() {
			defer wg.Done()
			for range perWorker {
				q.ForceEnqueue([]byte("x")) //nolint:errcheck
			}
		}()
	}
	wg.Wait()
	cancel()
	q.Close()
	<-popDone

	popMu.Lock()
	total := popped + q.Len()
	popMu.Unlock()

	assert.LessOrEqual(t, total, workers*perWorker)
	assert.GreaterOrEqual(t, total, 0)
}

// TestRingQueue_F2_DropOldestIsAtomic is the critical regression test for the
// TOCTOU race: verifies that drop-oldest enqueue in a concurrent scenario never
// loses the newest message.
func TestRingQueue_F2_DropOldestIsAtomic(t *testing.T) {
	t.Parallel()
	const bufSize = 2
	const iterations = 500

	for range iterations {
		q := carousel.NewRingQueue[[]byte](bufSize)
		require.NoError(t, q.Enqueue([]byte("old1")))
		require.NoError(t, q.Enqueue([]byte("old2")))

		ready := make(chan struct{})
		poppedCh := make(chan []byte, 1)
		var wg sync.WaitGroup
		wg.Add(2)

		go func() {
			defer wg.Done()
			<-ready
			data, _ := q.Pop(context.Background())
			poppedCh <- data
		}()

		go func() {
			defer wg.Done()
			<-ready
			q.ForceEnqueue([]byte("newest")) //nolint:errcheck
		}()

		close(ready)
		wg.Wait()
		q.Close()

		popped := <-poppedCh
		remaining := q.Drain()
		newestFound := string(popped) == "newest"
		for _, item := range remaining {
			if string(item) == "newest" {
				newestFound = true
				break
			}
		}
		assert.True(t, newestFound, "newest message must not be silently dropped")
		assert.LessOrEqual(t, q.Len(), bufSize)
	}
}

// ── G: TryPop ────────────────────────────────────────────────────────────────

func TestRingQueue_G1_TryPopReturnsItemWhenNonEmpty(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
	defer q.Close()
	require.NoError(t, q.Enqueue([]byte("hello")))
	v, ok := q.TryPop()
	assert.True(t, ok)
	assert.Equal(t, []byte("hello"), v)
	assert.Equal(t, 0, q.Len())
}

func TestRingQueue_G2_TryPopReturnsFalseWhenEmpty(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
	defer q.Close()
	v, ok := q.TryPop()
	assert.False(t, ok)
	assert.Nil(t, v)
}

func TestRingQueue_G3_TryPopDrainsRemainingAfterClose(t *testing.T) {
	t.Parallel()
	q := carousel.NewRingQueue[[]byte](4)
	require.NoError(t, q.Enqueue([]byte("a")))
	require.NoError(t, q.Enqueue([]byte("b")))
	q.Close()
	v1, ok1 := q.TryPop()
	v2, ok2 := q.TryPop()
	v3, ok3 := q.TryPop()
	assert.True(t, ok1)
	assert.Equal(t, []byte("a"), v1)
	assert.True(t, ok2)
	assert.Equal(t, []byte("b"), v2)
	assert.False(t, ok3)
	assert.Nil(t, v3)
}

// ── Benchmarks ───────────────────────────────────────────────────────────────

// BenchmarkRingQueue_ForceEnqueue measures single-goroutine ForceEnqueue
// throughput with no contention; evicts oldest when full.
func BenchmarkRingQueue_ForceEnqueue(b *testing.B) {
	q := carousel.NewRingQueue[[]byte](256)
	defer q.Close()
	data := make([]byte, 64)
	b.ResetTimer()
	for range b.N {
		q.ForceEnqueue(data) //nolint:errcheck
	}
}

// BenchmarkRingQueue_ProducerConsumer measures ForceEnqueue throughput with a
// concurrent consumer draining the queue — the canonical send-buffer pattern.
func BenchmarkRingQueue_ProducerConsumer(b *testing.B) {
	q := carousel.NewRingQueue[[]byte](256)
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
		q.ForceEnqueue(data) //nolint:errcheck
	}
	b.StopTimer()

	cancel()
	q.Close()
	<-consumed
}

// BenchmarkRingQueue_Parallel measures ForceEnqueue throughput under mutex
// contention with GOMAXPROCS concurrent writers.
func BenchmarkRingQueue_Parallel(b *testing.B) {
	q := carousel.NewRingQueue[[]byte](512)
	defer q.Close()
	data := make([]byte, 64)
	b.ResetTimer()
	b.RunParallel(func(pb *testing.PB) {
		for pb.Next() {
			q.ForceEnqueue(data) //nolint:errcheck
		}
	})
}
