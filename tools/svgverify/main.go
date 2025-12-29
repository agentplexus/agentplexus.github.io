// svgverify validates SVG files to ensure they are pure vector images
// without embedded binary data (base64-encoded PNGs, JPEGs, etc.)
package main

import (
	"encoding/xml"
	"flag"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

const usage = `svgverify - Validate SVG files are pure vector images

Usage:
  svgverify [options] <path>

Arguments:
  path    Path to an SVG file or directory containing SVG files
          If not specified, defaults to current directory

Options:
  -h, --help    Show this help message

Examples:
  # Verify all SVG files in a directory
  svgverify ./icons

  # Verify a single SVG file
  svgverify ./logo.svg

  # Verify SVG files in current directory
  svgverify

Checks performed:
  - Valid XML structure
  - No embedded binary data (base64 images, data URIs)
  - No external binary image references
  - Counts vector elements (path, rect, circle, polygon, etc.)

Exit codes:
  0    All files are valid pure vector SVGs
  1    One or more files failed validation
`

// SVGValidationResult contains the result of validating an SVG file
type SVGValidationResult struct {
	FilePath        string
	IsValid         bool
	IsPureVector    bool
	HasEmbeddedData bool
	VectorElements  []string
	Errors          []string
}

// ValidateSVG checks if an SVG file is a pure vector image without embedded binary data
func ValidateSVG(filePath string) (*SVGValidationResult, error) {
	result := &SVGValidationResult{
		FilePath:       filePath,
		IsValid:        true,
		IsPureVector:   true,
		VectorElements: []string{},
		Errors:         []string{},
	}

	content, err := os.ReadFile(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %w", err)
	}

	contentStr := string(content)

	// Check for valid XML/SVG structure
	if !strings.Contains(contentStr, "<svg") {
		result.IsValid = false
		result.Errors = append(result.Errors, "missing <svg> element")
	}

	// Patterns that indicate embedded binary data
	embeddedPatterns := []struct {
		pattern *regexp.Regexp
		desc    string
	}{
		{regexp.MustCompile(`data:image/(png|jpeg|jpg|gif|webp|bmp)`), "base64 embedded image"},
		{regexp.MustCompile(`xlink:href\s*=\s*["']data:`), "xlink:href with data URI"},
		{regexp.MustCompile(`href\s*=\s*["']data:image`), "href with embedded image data"},
		{regexp.MustCompile(`<image[^>]+xlink:href\s*=\s*["'][^"']*\.(png|jpg|jpeg|gif|webp|bmp)`), "image element referencing binary file"},
	}

	for _, p := range embeddedPatterns {
		if p.pattern.MatchString(contentStr) {
			result.IsPureVector = false
			result.HasEmbeddedData = true
			result.Errors = append(result.Errors, fmt.Sprintf("contains %s", p.desc))
		}
	}

	// Count vector elements
	vectorPatterns := map[string]*regexp.Regexp{
		"path":     regexp.MustCompile(`<path\b`),
		"rect":     regexp.MustCompile(`<rect\b`),
		"circle":   regexp.MustCompile(`<circle\b`),
		"ellipse":  regexp.MustCompile(`<ellipse\b`),
		"line":     regexp.MustCompile(`<line\b`),
		"polyline": regexp.MustCompile(`<polyline\b`),
		"polygon":  regexp.MustCompile(`<polygon\b`),
		"text":     regexp.MustCompile(`<text\b`),
	}

	for name, pattern := range vectorPatterns {
		matches := pattern.FindAllString(contentStr, -1)
		if len(matches) > 0 {
			result.VectorElements = append(result.VectorElements, fmt.Sprintf("%s:%d", name, len(matches)))
		}
	}

	// Verify it's valid XML
	var svgDoc interface{}
	if err := xml.Unmarshal(content, &svgDoc); err != nil {
		result.IsValid = false
		result.Errors = append(result.Errors, fmt.Sprintf("invalid XML: %v", err))
	}

	return result, nil
}

// ValidateSVGDirectory validates all SVG files in a directory
func ValidateSVGDirectory(dirPath string) ([]*SVGValidationResult, error) {
	var results []*SVGValidationResult

	entries, err := os.ReadDir(dirPath)
	if err != nil {
		return nil, fmt.Errorf("failed to read directory: %w", err)
	}

	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		if !strings.HasSuffix(strings.ToLower(entry.Name()), ".svg") {
			continue
		}

		filePath := filepath.Join(dirPath, entry.Name())
		result, err := ValidateSVG(filePath)
		if err != nil {
			results = append(results, &SVGValidationResult{
				FilePath: filePath,
				IsValid:  false,
				Errors:   []string{err.Error()},
			})
			continue
		}
		results = append(results, result)
	}

	return results, nil
}

func main() {
	flag.Usage = func() {
		fmt.Fprint(os.Stderr, usage)
	}
	flag.Parse()

	path := "."
	if flag.NArg() > 0 {
		path = flag.Arg(0)
	}

	// Check if path is a file or directory
	info, err := os.Stat(path)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}

	var results []*SVGValidationResult
	if info.IsDir() {
		results, err = ValidateSVGDirectory(path)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error: %v\n", err)
			os.Exit(1)
		}
	} else {
		result, err := ValidateSVG(path)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error: %v\n", err)
			os.Exit(1)
		}
		results = []*SVGValidationResult{result}
	}

	allValid := true
	for _, r := range results {
		status := "✓"
		if !r.IsPureVector || !r.IsValid {
			status = "✗"
			allValid = false
		}

		fmt.Printf("%s %s\n", status, filepath.Base(r.FilePath))
		if len(r.VectorElements) > 0 {
			fmt.Printf("  Vector elements: %s\n", strings.Join(r.VectorElements, ", "))
		}
		if len(r.Errors) > 0 {
			for _, e := range r.Errors {
				fmt.Printf("  Error: %s\n", e)
			}
		}
	}

	if !allValid {
		os.Exit(1)
	}
}
