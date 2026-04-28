package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestParseBenchResults(t *testing.T) {
	t.Parallel()

	input := []byte(`
goos: darwin
goarch: arm64
cpu: Apple M1 Max
BenchmarkRingBuffer_Push-12              1000000    3.2 ns/op      0 B/op    0 allocs/op
BenchmarkRingBuffer_Drain-12             1000000    1632 ns/op   6528 B/op    1 allocs/op
BenchmarkRingQueue_Parallel-12           1000000     107 ns/op      0 B/op    0 allocs/op
PASS
`)

	got, err := parseBenchResults(input)
	require.NoError(t, err)

	assert.Equal(t, "darwin", got.Env.GOOS)
	assert.Equal(t, "arm64", got.Env.GOARCH)
	assert.Equal(t, "Apple M1 Max", got.Env.CPU)

	assert.Equal(t, benchResult{
		NSPerOp:     "3.2",
		BPerOp:      "0",
		AllocsPerOp: "0",
	}, got.Results["BenchmarkRingBuffer_Push"])

	assert.Equal(t, "1632", got.Results["BenchmarkRingBuffer_Drain"].NSPerOp)
	assert.Equal(t, "6528", got.Results["BenchmarkRingBuffer_Drain"].BPerOp)
	assert.Equal(t, "1", got.Results["BenchmarkRingBuffer_Drain"].AllocsPerOp)
}

func TestRun(t *testing.T) {
	t.Parallel()

	root := t.TempDir()
	err := os.MkdirAll(filepath.Join(root, "docs"), 0o755)
	require.NoError(t, err)

	benchFile := filepath.Join(root, "bench.txt")
	err = os.WriteFile(benchFile, []byte(`
goos: darwin
goarch: arm64
cpu: Apple M1 Max
BenchmarkRingBuffer_Push-12              1000000      3.2 ns/op      0 B/op    0 allocs/op
BenchmarkRingBuffer_ForcePush-12         1000000      5.7 ns/op      0 B/op    0 allocs/op
BenchmarkRingBuffer_Pop-12               1000000      2.9 ns/op      0 B/op    0 allocs/op
BenchmarkRingBuffer_Drain-12             1000000     1632 ns/op   6528 B/op    1 allocs/op
BenchmarkRingQueue_ForceEnqueue-12       1000000     13.8 ns/op      0 B/op    0 allocs/op
BenchmarkRingQueue_ProducerConsumer-12   1000000       53 ns/op      0 B/op    0 allocs/op
BenchmarkRingQueue_Parallel-12           1000000      107 ns/op      0 B/op    0 allocs/op
`), 0o644)
	require.NoError(t, err)

	for _, path := range []string{
		filepath.Join(root, "docs", "ringbuffer.md"),
		filepath.Join(root, "docs", "ringqueue.md"),
	} {
		err = os.WriteFile(path, []byte(strings.TrimSpace(`
## Benchmarks

<!-- benchsync:ringbuffer:start -->
stale
<!-- benchsync:ringbuffer:end -->

<!-- benchsync:ringqueue:start -->
stale
<!-- benchsync:ringqueue:end -->
`)+"\n"), 0o644)
		require.NoError(t, err)
	}

	err = run([]string{"-root", root, "-input", benchFile})
	require.NoError(t, err)

	ringbufferDoc, err := os.ReadFile(filepath.Join(root, "docs", "ringbuffer.md"))
	require.NoError(t, err)
	assert.Contains(t, string(ringbufferDoc), "Measured on `darwin/arm64` (`Apple M1 Max`).")
	assert.Contains(t, string(ringbufferDoc), "| `Push` | 3.2 | 0 | 0 |")
	assert.Contains(t, string(ringbufferDoc), "| `Drain (256 items)` | 1,632 | 6,528 | 1 |")

	ringqueueDoc, err := os.ReadFile(filepath.Join(root, "docs", "ringqueue.md"))
	require.NoError(t, err)
	assert.Contains(t, string(ringqueueDoc), "Measured on `darwin/arm64` (`Apple M1 Max`).")
	assert.Contains(t, string(ringqueueDoc), "| `ForceEnqueue (serial, no contention)` | 13.8 | 0 | 0 |")
	assert.Contains(t, string(ringqueueDoc), "| `ProducerConsumer (1 producer + 1 consumer)` | 53 | 0 | 0 |")
	assert.Contains(t, string(ringqueueDoc), "| `ForceEnqueue (parallel writers)` | 107 | 0 | 0 |")
}

func TestFormatMetric(t *testing.T) {
	t.Parallel()

	assert.Equal(t, "107", formatMetric("107.0"))
	assert.Equal(t, "5.59", formatMetric("5.590"))
	assert.Equal(t, "1,626", formatMetric("1626"))
	assert.Equal(t, "3.007", formatMetric("3.007"))
}
