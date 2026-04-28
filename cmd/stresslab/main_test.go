package main

import (
	"bytes"
	"context"
	"errors"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestBuildPlan(t *testing.T) {
	t.Parallel()

	plan, err := buildPlan(config{
		Count:      200,
		Timeout:    "300s",
		GOMAXPROCS: []int{1, 4},
		Mode:       "all",
		Packages:   "./...",
	})
	require.NoError(t, err)

	require.Len(t, plan, 5)
	assert.Equal(t, "full-suite", plan[0].Name)
	assert.Equal(t, []string{"go", "test", "-race", "-count=200", "-timeout=300s", "./..."}, plan[0].Command)

	assert.Equal(t, "cancel-race[gmp=1]", plan[1].Name)
	assert.Equal(t, []string{"GOMAXPROCS=1"}, plan[1].Env)
	assert.Contains(t, plan[1].Command, "-run=^TestRingQueue_C4b_PopCancelRaceLostWakeup$")

	assert.Equal(t, "drop-oldest-atomic[gmp=4]", plan[4].Name)
	assert.Equal(t, []string{"GOMAXPROCS=4"}, plan[4].Env)
	assert.Contains(t, plan[4].Command, "-run=^TestRingQueue_F2_DropOldestIsAtomic$")
}

func TestRunWithListMode(t *testing.T) {
	t.Parallel()

	var stdout bytes.Buffer
	called := false
	err := runWith([]string{"-list", "-gmp", "1,4"}, func(context.Context, scenario) error {
		called = true
		return nil
	}, &stdout)
	require.NoError(t, err)

	assert.False(t, called)
	assert.Contains(t, stdout.String(), "full-suite")
	assert.Contains(t, stdout.String(), "GOMAXPROCS=4 go test -race")
}

func TestExecutePlan(t *testing.T) {
	t.Parallel()

	plan := []scenario{
		{Name: "full-suite", Command: []string{"go", "test", "./..."}},
		{Name: "cancel-race[gmp=1]", Env: []string{"GOMAXPROCS=1"}, Command: []string{"go", "test", "-run=cancel", "./..."}},
	}

	var stdout bytes.Buffer
	tick := time.Unix(0, 0)
	results := executePlan(context.Background(), plan, func(_ context.Context, scenario scenario) error {
		if scenario.Name == "cancel-race[gmp=1]" {
			return errors.New("exit status 1")
		}
		return nil
	}, func() time.Time {
		current := tick
		tick = tick.Add(1500 * time.Millisecond)
		return current
	})

	err := renderSummary(&stdout, results)
	require.NoError(t, err)

	assert.Contains(t, stdout.String(), "PASS full-suite (1.50s)")
	assert.Contains(t, stdout.String(), "FAIL cancel-race[gmp=1] (1.50s)")
	assert.Contains(t, stdout.String(), "exit status 1")
}
