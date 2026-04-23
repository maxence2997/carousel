package carousel_test

import (
	"sync"
	"testing"

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
