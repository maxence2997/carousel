package main

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestExtractExampleSnippets(t *testing.T) {
	t.Parallel()

	src := []byte(`package carousel_test

import (
	"fmt"

	"github.com/maxence2997/carousel"
)

func ExampleRingBuffer() {
	buf := carousel.NewRingBuffer[int](3)
	buf.Push(1)
	buf.Push(2)
	fmt.Println(buf.Drain())
	// Output:
	// [1 2]
}

func ExampleRingQueue() {
	q := carousel.NewRingQueue[string](2)
	defer q.Close()
	_ = q.Enqueue("a")
	fmt.Println(q.Len())
	// Unordered output:
	// 1
}
`)

	got, err := extractExampleSnippets("examples_test.go", src)
	require.NoError(t, err)

	assert.Equal(t, strings.TrimSpace(`buf := carousel.NewRingBuffer[int](3)
buf.Push(1)
buf.Push(2)
fmt.Println(buf.Drain())`), got["ExampleRingBuffer"])

	assert.Equal(t, strings.TrimSpace(`q := carousel.NewRingQueue[string](2)
defer q.Close()
_ = q.Enqueue("a")
fmt.Println(q.Len())`), got["ExampleRingQueue"])
}

func TestReplaceManagedBlock(t *testing.T) {
	t.Parallel()

	markdown := strings.TrimSpace(`
## Quick start

<!-- examplesync:ExampleRingBuffer:start -->
old content
<!-- examplesync:ExampleRingBuffer:end -->
`) + "\n"

	got, err := replaceManagedBlock([]byte(markdown), "examplesync:ExampleRingBuffer", "```go\nbuf := carousel.NewRingBuffer[int](3)\n```")
	require.NoError(t, err)

	assert.Contains(t, string(got), "```go\nbuf := carousel.NewRingBuffer[int](3)\n```")
	assert.NotContains(t, string(got), "old content")
}

func TestSyncExamples(t *testing.T) {
	t.Parallel()

	root := t.TempDir()
	sourcePath := filepath.Join(root, "examples_test.go")
	targetPath := filepath.Join(root, "README.md")

	err := os.WriteFile(sourcePath, []byte(`package carousel_test

func ExampleRingBuffer() {
	buf := carousel.NewRingBuffer[int](3)
	buf.Push(1)
}
`), 0o644)
	require.NoError(t, err)

	err = os.WriteFile(targetPath, []byte(strings.TrimSpace(`
<!-- examplesync:ExampleRingBuffer:start -->
stale
<!-- examplesync:ExampleRingBuffer:end -->
`)+"\n"), 0o644)
	require.NoError(t, err)

	err = syncExamples([]syncTarget{{
		Source:     sourcePath,
		Example:    "ExampleRingBuffer",
		Markdown:   targetPath,
		MarkerName: "examplesync:ExampleRingBuffer",
	}})
	require.NoError(t, err)

	updated, err := os.ReadFile(targetPath)
	require.NoError(t, err)
	assert.Contains(t, string(updated), "```go\nbuf := carousel.NewRingBuffer[int](3)\nbuf.Push(1)\n```")
}

func TestRun(t *testing.T) {
	t.Parallel()

	root := t.TempDir()
	err := os.MkdirAll(filepath.Join(root, "docs"), 0o755)
	require.NoError(t, err)

	err = os.WriteFile(filepath.Join(root, "examples_test.go"), []byte(`package carousel_test

func ExampleRingBuffer() {
	buf := carousel.NewRingBuffer[int](3)
	buf.Push(1)
}

func ExampleRingQueue() {
	q := carousel.NewRingQueue[string](2)
	defer q.Close()
}
`), 0o644)
	require.NoError(t, err)

	for _, path := range []string{
		filepath.Join(root, "README.md"),
		filepath.Join(root, "docs", "ringbuffer.md"),
		filepath.Join(root, "docs", "ringqueue.md"),
	} {
		err = os.WriteFile(path, []byte(strings.TrimSpace(`
<!-- examplesync:ExampleRingBuffer:start -->
stale
<!-- examplesync:ExampleRingBuffer:end -->

<!-- examplesync:ExampleRingQueue:start -->
stale
<!-- examplesync:ExampleRingQueue:end -->
`)+"\n"), 0o644)
		require.NoError(t, err)
	}

	err = run([]string{"-root", root})
	require.NoError(t, err)

	readme, err := os.ReadFile(filepath.Join(root, "README.md"))
	require.NoError(t, err)
	assert.Contains(t, string(readme), "buf := carousel.NewRingBuffer[int](3)")
	assert.Contains(t, string(readme), "q := carousel.NewRingQueue[string](2)")
}
