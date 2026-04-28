package main

import (
	"context"
	"flag"
	"fmt"
	"io"
	"os"
	"os/exec"
	"strconv"
	"strings"
	"time"
)

type config struct {
	Count      int
	Timeout    string
	GOMAXPROCS []int
	Mode       string
	Packages   string
	ListOnly   bool
}

type scenario struct {
	Name    string
	Env     []string
	Command []string
}

type runResult struct {
	Scenario scenario
	Err      error
	Duration time.Duration
}

func main() {
	if err := runWith(os.Args[1:], execScenario, os.Stdout); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func runWith(args []string, runner func(context.Context, scenario) error, stdout io.Writer) error {
	cfg, err := parseConfig(args)
	if err != nil {
		return err
	}

	plan, err := buildPlan(cfg)
	if err != nil {
		return err
	}

	if cfg.ListOnly {
		for _, scenario := range plan {
			if _, err := fmt.Fprintf(stdout, "%s: %s\n", scenario.Name, joinScenarioCommand(scenario)); err != nil {
				return fmt.Errorf("write stress plan: %w", err)
			}
		}
		return nil
	}

	results := executePlan(context.Background(), plan, runner, time.Now)
	if err := renderSummary(stdout, results); err != nil {
		return err
	}

	for _, result := range results {
		if result.Err != nil {
			return fmt.Errorf("stress plan failed")
		}
	}

	return nil
}

func parseConfig(args []string) (config, error) {
	fs := flag.NewFlagSet("stresslab", flag.ContinueOnError)
	fs.SetOutput(os.Stderr)

	cfg := config{}
	gmp := fs.String("gmp", "1,4", "comma-separated GOMAXPROCS values for targeted scenarios")
	fs.IntVar(&cfg.Count, "count", 200, "go test -count value")
	fs.StringVar(&cfg.Timeout, "timeout", "300s", "go test timeout")
	fs.StringVar(&cfg.Mode, "mode", "all", "one of: all, full, targeted")
	fs.StringVar(&cfg.Packages, "packages", "./...", "package pattern to test")
	fs.BoolVar(&cfg.ListOnly, "list", false, "print planned commands without running them")

	if err := fs.Parse(args); err != nil {
		return config{}, err
	}

	values, err := parseGOMAXPROCS(*gmp)
	if err != nil {
		return config{}, err
	}
	cfg.GOMAXPROCS = values

	return cfg, nil
}

func parseGOMAXPROCS(raw string) ([]int, error) {
	parts := strings.Split(raw, ",")
	values := make([]int, 0, len(parts))
	for _, part := range parts {
		part = strings.TrimSpace(part)
		if part == "" {
			continue
		}
		value, err := strconv.Atoi(part)
		if err != nil || value < 1 {
			return nil, fmt.Errorf("invalid gmp value %q", part)
		}
		values = append(values, value)
	}
	if len(values) == 0 {
		return nil, fmt.Errorf("at least one gmp value is required")
	}
	return values, nil
}

func buildPlan(cfg config) ([]scenario, error) {
	switch cfg.Mode {
	case "all", "full", "targeted":
	default:
		return nil, fmt.Errorf("invalid mode %q", cfg.Mode)
	}

	var plan []scenario
	if cfg.Mode == "all" || cfg.Mode == "full" {
		plan = append(plan, scenario{
			Name:    "full-suite",
			Command: []string{"go", "test", "-race", fmt.Sprintf("-count=%d", cfg.Count), fmt.Sprintf("-timeout=%s", cfg.Timeout), cfg.Packages},
		})
	}

	if cfg.Mode == "all" || cfg.Mode == "targeted" {
		targets := []struct {
			name string
			run  string
		}{
			{
				name: "cancel-race",
				run:  "^TestRingQueue_C4b_PopCancelRaceLostWakeup$",
			},
			{
				name: "drop-oldest-atomic",
				run:  "^TestRingQueue_F2_DropOldestIsAtomic$",
			},
		}

		for _, gmp := range cfg.GOMAXPROCS {
			for _, target := range targets {
				plan = append(plan, scenario{
					Name: target.name + "[gmp=" + strconv.Itoa(gmp) + "]",
					Env:  []string{"GOMAXPROCS=" + strconv.Itoa(gmp)},
					Command: []string{
						"go",
						"test",
						"-race",
						fmt.Sprintf("-count=%d", cfg.Count),
						fmt.Sprintf("-timeout=%s", cfg.Timeout),
						"-run=" + target.run,
						cfg.Packages,
					},
				})
			}
		}
	}

	return plan, nil
}

func executePlan(
	ctx context.Context,
	plan []scenario,
	runner func(context.Context, scenario) error,
	now func() time.Time,
) []runResult {
	results := make([]runResult, 0, len(plan))
	for _, scenario := range plan {
		start := now()
		err := runner(ctx, scenario)
		results = append(results, runResult{
			Scenario: scenario,
			Err:      err,
			Duration: now().Sub(start),
		})
	}
	return results
}

func renderSummary(w io.Writer, results []runResult) error {
	for _, result := range results {
		status := "PASS"
		if result.Err != nil {
			status = "FAIL"
		}

		if _, err := fmt.Fprintf(w, "%s %s (%.2fs)\n", status, result.Scenario.Name, result.Duration.Seconds()); err != nil {
			return fmt.Errorf("write summary: %w", err)
		}
		if result.Err != nil {
			if _, err := fmt.Fprintf(w, "  %v\n", result.Err); err != nil {
				return fmt.Errorf("write summary error: %w", err)
			}
			if _, err := fmt.Fprintf(w, "  %s\n", joinScenarioCommand(result.Scenario)); err != nil {
				return fmt.Errorf("write summary command: %w", err)
			}
		}
	}
	return nil
}

func joinScenarioCommand(scenario scenario) string {
	parts := make([]string, 0, len(scenario.Env)+len(scenario.Command))
	parts = append(parts, scenario.Env...)
	parts = append(parts, scenario.Command...)
	return strings.Join(parts, " ")
}

func execScenario(ctx context.Context, scenario scenario) error {
	if len(scenario.Command) == 0 {
		return fmt.Errorf("empty command")
	}

	cmd := exec.CommandContext(ctx, scenario.Command[0], scenario.Command[1:]...)
	cmd.Env = append(os.Environ(), scenario.Env...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	return cmd.Run()
}
