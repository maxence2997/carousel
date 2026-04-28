package main

import (
	"bytes"
	"flag"
	"fmt"
	"go/ast"
	"go/parser"
	"go/token"
	"os"
	"path/filepath"
	"strings"
)

type syncTarget struct {
	Source     string
	Example    string
	Markdown   string
	MarkerName string
}

func main() {
	if err := run(os.Args[1:]); err != nil {
		fmt.Fprintln(os.Stderr, err)
		os.Exit(1)
	}
}

func run(args []string) error {
	fs := flag.NewFlagSet("examplesync", flag.ContinueOnError)
	fs.SetOutput(os.Stderr)

	root := fs.String("root", ".", "repository root")
	if err := fs.Parse(args); err != nil {
		return err
	}

	return syncExamples(defaultTargets(*root))
}

func defaultTargets(root string) []syncTarget {
	source := filepath.Join(root, "examples_test.go")
	return []syncTarget{
		{
			Source:     source,
			Example:    "ExampleRingBuffer",
			Markdown:   filepath.Join(root, "README.md"),
			MarkerName: "examplesync:ExampleRingBuffer",
		},
		{
			Source:     source,
			Example:    "ExampleRingQueue",
			Markdown:   filepath.Join(root, "README.md"),
			MarkerName: "examplesync:ExampleRingQueue",
		},
		{
			Source:     source,
			Example:    "ExampleRingBuffer",
			Markdown:   filepath.Join(root, "docs", "ringbuffer.md"),
			MarkerName: "examplesync:ExampleRingBuffer",
		},
		{
			Source:     source,
			Example:    "ExampleRingQueue",
			Markdown:   filepath.Join(root, "docs", "ringqueue.md"),
			MarkerName: "examplesync:ExampleRingQueue",
		},
	}
}

func extractExampleSnippets(filename string, src []byte) (map[string]string, error) {
	fset := token.NewFileSet()
	file, err := parser.ParseFile(fset, filename, src, parser.ParseComments)
	if err != nil {
		return nil, fmt.Errorf("parse go source: %w", err)
	}

	out := make(map[string]string)
	for _, decl := range file.Decls {
		fn, ok := decl.(*ast.FuncDecl)
		if !ok || fn.Body == nil || !strings.HasPrefix(fn.Name.Name, "Example") {
			continue
		}

		start := fset.Position(fn.Body.Lbrace).Offset + 1
		end := fset.Position(fn.Body.Rbrace).Offset
		body := stripExampleOutput(src[start:end])
		out[fn.Name.Name] = strings.TrimSpace(body)
	}

	return out, nil
}

func stripExampleOutput(body []byte) string {
	lines := strings.Split(string(body), "\n")
	trimmed := make([]string, 0, len(lines))
	for _, line := range lines {
		if marker := strings.TrimSpace(line); marker == "// Output:" || marker == "// Unordered output:" {
			break
		}
		trimmed = append(trimmed, strings.TrimRight(line, " \t"))
	}
	return strings.TrimSpace(dedentBlock(strings.Join(trimmed, "\n")))
}

func dedentBlock(block string) string {
	lines := strings.Split(block, "\n")
	minIndent := -1
	for _, line := range lines {
		if strings.TrimSpace(line) == "" {
			continue
		}
		indent := len(line) - len(strings.TrimLeft(line, " \t"))
		if minIndent == -1 || indent < minIndent {
			minIndent = indent
		}
	}
	if minIndent <= 0 {
		return block
	}
	for i, line := range lines {
		if strings.TrimSpace(line) == "" {
			continue
		}
		lines[i] = line[minIndent:]
	}
	return strings.Join(lines, "\n")
}

func replaceManagedBlock(markdown []byte, marker, content string) ([]byte, error) {
	startMarker := "<!-- " + marker + ":start -->"
	endMarker := "<!-- " + marker + ":end -->"

	start := bytes.Index(markdown, []byte(startMarker))
	if start == -1 {
		return nil, fmt.Errorf("start marker not found: %s", marker)
	}

	end := bytes.Index(markdown[start:], []byte(endMarker))
	if end == -1 {
		return nil, fmt.Errorf("end marker not found: %s", marker)
	}
	end += start

	var out bytes.Buffer
	out.Write(markdown[:start+len(startMarker)])
	out.WriteString("\n")
	out.WriteString(content)
	out.WriteString("\n")
	out.Write(markdown[end:])
	return out.Bytes(), nil
}

func syncExamples(targets []syncTarget) error {
	cache := make(map[string]map[string]string)

	for _, target := range targets {
		snippets, ok := cache[target.Source]
		if !ok {
			src, err := os.ReadFile(target.Source)
			if err != nil {
				return fmt.Errorf("read source %s: %w", target.Source, err)
			}

			snippets, err = extractExampleSnippets(target.Source, src)
			if err != nil {
				return fmt.Errorf("extract examples from %s: %w", target.Source, err)
			}
			cache[target.Source] = snippets
		}

		snippet, ok := snippets[target.Example]
		if !ok {
			return fmt.Errorf("example %s not found in %s", target.Example, target.Source)
		}

		markdown, err := os.ReadFile(target.Markdown)
		if err != nil {
			return fmt.Errorf("read markdown %s: %w", target.Markdown, err)
		}

		updated, err := replaceManagedBlock(markdown, target.MarkerName, "```go\n"+snippet+"\n```")
		if err != nil {
			return fmt.Errorf("update %s: %w", target.Markdown, err)
		}

		if err := os.WriteFile(target.Markdown, updated, 0o644); err != nil {
			return fmt.Errorf("write markdown %s: %w", target.Markdown, err)
		}
	}

	return nil
}
