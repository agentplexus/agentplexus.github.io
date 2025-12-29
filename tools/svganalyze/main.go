// svganalyze analyzes SVG files for centering and padding
// It calculates the bounding box of content and compares to the viewBox
package main

import (
	"flag"
	"fmt"
	"math"
	"os"
	"path/filepath"
	"regexp"
	"strconv"
	"strings"

	"github.com/JoshVarga/svgparser"
)

const usage = `svganalyze - Analyze SVG files for centering and padding

Usage:
  svganalyze [options] <path>

Arguments:
  path    Path to an SVG file or directory containing SVG files
          If not specified, defaults to current directory

Options:
  -h, --help     Show this help message
  -fix           Suggest fixed viewBox values

Analysis performed:
  - ViewBox dimensions
  - Content bounding box (from path/shape coordinates)
  - Center offset (how far content center is from viewBox center)
  - Padding percentages (left, right, top, bottom)
  - Overall assessment (centered, off-center, too much padding, etc.)

Exit codes:
  0    All files analyzed successfully
  1    One or more files had issues
`

// BoundingBox represents a rectangular bounding box
type BoundingBox struct {
	MinX float64
	MinY float64
	MaxX float64
	MaxY float64
}

func NewBoundingBox() *BoundingBox {
	return &BoundingBox{
		MinX: math.MaxFloat64,
		MinY: math.MaxFloat64,
		MaxX: -math.MaxFloat64,
		MaxY: -math.MaxFloat64,
	}
}

func (b *BoundingBox) Width() float64 {
	return b.MaxX - b.MinX
}

func (b *BoundingBox) Height() float64 {
	return b.MaxY - b.MinY
}

func (b *BoundingBox) CenterX() float64 {
	return (b.MinX + b.MaxX) / 2
}

func (b *BoundingBox) CenterY() float64 {
	return (b.MinY + b.MaxY) / 2
}

func (b *BoundingBox) IsValid() bool {
	return b.MinX != math.MaxFloat64 && b.MaxX != -math.MaxFloat64
}

// Expand expands the bounding box to include the given point
func (b *BoundingBox) Expand(x, y float64) {
	if x < b.MinX {
		b.MinX = x
	}
	if x > b.MaxX {
		b.MaxX = x
	}
	if y < b.MinY {
		b.MinY = y
	}
	if y > b.MaxY {
		b.MaxY = y
	}
}

// Merge merges another bounding box into this one
func (b *BoundingBox) Merge(other *BoundingBox) {
	if !other.IsValid() {
		return
	}
	b.Expand(other.MinX, other.MinY)
	b.Expand(other.MaxX, other.MaxY)
}

// ViewBox represents an SVG viewBox
type ViewBox struct {
	X      float64
	Y      float64
	Width  float64
	Height float64
}

func (v *ViewBox) CenterX() float64 {
	return v.X + v.Width/2
}

func (v *ViewBox) CenterY() float64 {
	return v.Y + v.Height/2
}

// AnalysisResult contains the analysis of an SVG file
type AnalysisResult struct {
	FilePath         string
	ViewBox          ViewBox
	ContentBox       BoundingBox
	CenterOffsetX    float64
	CenterOffsetY    float64
	PaddingLeft      float64
	PaddingRight     float64
	PaddingTop       float64
	PaddingBottom    float64
	Assessment       string
	SuggestedViewBox string
	HasIssues        bool
}

// parseViewBox parses a viewBox string like "0 0 100 100"
func parseViewBox(s string) (ViewBox, error) {
	parts := strings.Fields(s)
	if len(parts) != 4 {
		return ViewBox{}, fmt.Errorf("invalid viewBox format: %s", s)
	}

	x, err := strconv.ParseFloat(parts[0], 64)
	if err != nil {
		return ViewBox{}, err
	}
	y, err := strconv.ParseFloat(parts[1], 64)
	if err != nil {
		return ViewBox{}, err
	}
	w, err := strconv.ParseFloat(parts[2], 64)
	if err != nil {
		return ViewBox{}, err
	}
	h, err := strconv.ParseFloat(parts[3], 64)
	if err != nil {
		return ViewBox{}, err
	}

	return ViewBox{X: x, Y: y, Width: w, Height: h}, nil
}

// PathCommand represents a single SVG path command
type PathCommand struct {
	Command byte
	Params  []float64
}

// parsePath parses an SVG path d attribute into commands
func parsePath(d string) []PathCommand {
	var commands []PathCommand

	// Match command letters followed by optional numbers
	cmdRe := regexp.MustCompile(`([MmLlHhVvCcSsQqTtAaZz])([^MmLlHhVvCcSsQqTtAaZz]*)`)
	// SVG path numbers can be:
	// - Optional sign, digits, optional decimal + digits: -123.45
	// - Optional sign, optional digits, decimal + digits: -.45 or .45
	// Numbers can be separated by whitespace, commas, or nothing when the next number starts with - or .
	numRe := regexp.MustCompile(`[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?`)

	matches := cmdRe.FindAllStringSubmatch(d, -1)
	for _, match := range matches {
		cmd := match[1][0]
		params := numRe.FindAllString(match[2], -1)

		var floatParams []float64
		for _, p := range params {
			if v, err := strconv.ParseFloat(p, 64); err == nil {
				floatParams = append(floatParams, v)
			}
		}

		commands = append(commands, PathCommand{Command: cmd, Params: floatParams})
	}

	return commands
}

// calculatePathBounds calculates the bounding box from path commands
func calculatePathBounds(d string) *BoundingBox {
	box := NewBoundingBox()
	commands := parsePath(d)

	var curX, curY float64
	var startX, startY float64

	for _, cmd := range commands {
		switch cmd.Command {
		case 'M': // moveto absolute
			for i := 0; i+1 < len(cmd.Params); i += 2 {
				curX, curY = cmd.Params[i], cmd.Params[i+1]
				if i == 0 {
					startX, startY = curX, curY
				}
				box.Expand(curX, curY)
			}
		case 'm': // moveto relative
			for i := 0; i+1 < len(cmd.Params); i += 2 {
				curX += cmd.Params[i]
				curY += cmd.Params[i+1]
				if i == 0 {
					startX, startY = curX, curY
				}
				box.Expand(curX, curY)
			}
		case 'L': // lineto absolute
			for i := 0; i+1 < len(cmd.Params); i += 2 {
				curX, curY = cmd.Params[i], cmd.Params[i+1]
				box.Expand(curX, curY)
			}
		case 'l': // lineto relative
			for i := 0; i+1 < len(cmd.Params); i += 2 {
				curX += cmd.Params[i]
				curY += cmd.Params[i+1]
				box.Expand(curX, curY)
			}
		case 'H': // horizontal absolute
			for _, x := range cmd.Params {
				curX = x
				box.Expand(curX, curY)
			}
		case 'h': // horizontal relative
			for _, dx := range cmd.Params {
				curX += dx
				box.Expand(curX, curY)
			}
		case 'V': // vertical absolute
			for _, y := range cmd.Params {
				curY = y
				box.Expand(curX, curY)
			}
		case 'v': // vertical relative
			for _, dy := range cmd.Params {
				curY += dy
				box.Expand(curX, curY)
			}
		case 'C': // cubic bezier absolute
			for i := 0; i+5 < len(cmd.Params); i += 6 {
				box.Expand(cmd.Params[i], cmd.Params[i+1])
				box.Expand(cmd.Params[i+2], cmd.Params[i+3])
				curX, curY = cmd.Params[i+4], cmd.Params[i+5]
				box.Expand(curX, curY)
			}
		case 'c': // cubic bezier relative
			for i := 0; i+5 < len(cmd.Params); i += 6 {
				box.Expand(curX+cmd.Params[i], curY+cmd.Params[i+1])
				box.Expand(curX+cmd.Params[i+2], curY+cmd.Params[i+3])
				curX += cmd.Params[i+4]
				curY += cmd.Params[i+5]
				box.Expand(curX, curY)
			}
		case 'S': // smooth cubic absolute
			for i := 0; i+3 < len(cmd.Params); i += 4 {
				box.Expand(cmd.Params[i], cmd.Params[i+1])
				curX, curY = cmd.Params[i+2], cmd.Params[i+3]
				box.Expand(curX, curY)
			}
		case 's': // smooth cubic relative
			for i := 0; i+3 < len(cmd.Params); i += 4 {
				box.Expand(curX+cmd.Params[i], curY+cmd.Params[i+1])
				curX += cmd.Params[i+2]
				curY += cmd.Params[i+3]
				box.Expand(curX, curY)
			}
		case 'Q': // quadratic bezier absolute
			for i := 0; i+3 < len(cmd.Params); i += 4 {
				box.Expand(cmd.Params[i], cmd.Params[i+1])
				curX, curY = cmd.Params[i+2], cmd.Params[i+3]
				box.Expand(curX, curY)
			}
		case 'q': // quadratic bezier relative
			for i := 0; i+3 < len(cmd.Params); i += 4 {
				box.Expand(curX+cmd.Params[i], curY+cmd.Params[i+1])
				curX += cmd.Params[i+2]
				curY += cmd.Params[i+3]
				box.Expand(curX, curY)
			}
		case 'T': // smooth quadratic absolute
			for i := 0; i+1 < len(cmd.Params); i += 2 {
				curX, curY = cmd.Params[i], cmd.Params[i+1]
				box.Expand(curX, curY)
			}
		case 't': // smooth quadratic relative
			for i := 0; i+1 < len(cmd.Params); i += 2 {
				curX += cmd.Params[i]
				curY += cmd.Params[i+1]
				box.Expand(curX, curY)
			}
		case 'A': // arc absolute
			for i := 0; i+6 < len(cmd.Params); i += 7 {
				curX, curY = cmd.Params[i+5], cmd.Params[i+6]
				box.Expand(curX, curY)
			}
		case 'a': // arc relative
			for i := 0; i+6 < len(cmd.Params); i += 7 {
				curX += cmd.Params[i+5]
				curY += cmd.Params[i+6]
				box.Expand(curX, curY)
			}
		case 'Z', 'z': // closepath
			curX, curY = startX, startY
		}
	}

	return box
}

// getElementBounds calculates bounds for an SVG element
func getElementBounds(elem *svgparser.Element) *BoundingBox {
	box := NewBoundingBox()

	switch elem.Name {
	case "path":
		if d, ok := elem.Attributes["d"]; ok {
			box.Merge(calculatePathBounds(d))
		}
	case "circle":
		cx := parseFloat(elem.Attributes["cx"], 0)
		cy := parseFloat(elem.Attributes["cy"], 0)
		r := parseFloat(elem.Attributes["r"], 0)
		box.Expand(cx-r, cy-r)
		box.Expand(cx+r, cy+r)
	case "ellipse":
		cx := parseFloat(elem.Attributes["cx"], 0)
		cy := parseFloat(elem.Attributes["cy"], 0)
		rx := parseFloat(elem.Attributes["rx"], 0)
		ry := parseFloat(elem.Attributes["ry"], 0)
		box.Expand(cx-rx, cy-ry)
		box.Expand(cx+rx, cy+ry)
	case "rect":
		x := parseFloat(elem.Attributes["x"], 0)
		y := parseFloat(elem.Attributes["y"], 0)
		w := parseFloat(elem.Attributes["width"], 0)
		h := parseFloat(elem.Attributes["height"], 0)
		box.Expand(x, y)
		box.Expand(x+w, y+h)
	case "line":
		x1 := parseFloat(elem.Attributes["x1"], 0)
		y1 := parseFloat(elem.Attributes["y1"], 0)
		x2 := parseFloat(elem.Attributes["x2"], 0)
		y2 := parseFloat(elem.Attributes["y2"], 0)
		box.Expand(x1, y1)
		box.Expand(x2, y2)
	case "polygon", "polyline":
		if points, ok := elem.Attributes["points"]; ok {
			box.Merge(parsePoints(points))
		}
	}

	// Recursively process children
	for _, child := range elem.Children {
		// Skip mask and clipPath elements - they define clipping regions, not visible content
		if child.Name == "mask" || child.Name == "clipPath" || child.Name == "defs" {
			continue
		}
		childBox := getElementBounds(child)
		box.Merge(childBox)
	}

	return box
}

func parseFloat(s string, defaultVal float64) float64 {
	if s == "" {
		return defaultVal
	}
	// Remove "px" suffix if present
	s = strings.TrimSuffix(s, "px")
	v, err := strconv.ParseFloat(s, 64)
	if err != nil {
		return defaultVal
	}
	return v
}

// parsePoints parses polygon/polyline points attribute
func parsePoints(points string) *BoundingBox {
	box := NewBoundingBox()
	re := regexp.MustCompile(`-?[\d]+\.?[\d]*`)
	matches := re.FindAllString(points, -1)

	for i := 0; i+1 < len(matches); i += 2 {
		x, _ := strconv.ParseFloat(matches[i], 64)
		y, _ := strconv.ParseFloat(matches[i+1], 64)
		box.Expand(x, y)
	}

	return box
}

// AnalyzeSVG analyzes an SVG file for centering and padding
func AnalyzeSVG(filePath string) (*AnalysisResult, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, fmt.Errorf("failed to open file: %w", err)
	}
	defer file.Close()

	svg, err := svgparser.Parse(file, false)
	if err != nil {
		return nil, fmt.Errorf("failed to parse SVG: %w", err)
	}

	// Get viewBox
	var viewBox ViewBox
	if vb, ok := svg.Attributes["viewBox"]; ok {
		viewBox, err = parseViewBox(vb)
		if err != nil {
			return nil, fmt.Errorf("failed to parse viewBox: %w", err)
		}
	} else {
		// Try to use width/height
		w := parseFloat(svg.Attributes["width"], 0)
		h := parseFloat(svg.Attributes["height"], 0)
		if w > 0 && h > 0 {
			viewBox = ViewBox{X: 0, Y: 0, Width: w, Height: h}
		} else {
			return nil, fmt.Errorf("no viewBox or width/height found")
		}
	}

	// Calculate content bounds
	contentBox := NewBoundingBox()
	for _, child := range svg.Children {
		// Skip defs, mask, clipPath
		if child.Name == "defs" || child.Name == "mask" || child.Name == "clipPath" {
			continue
		}
		childBox := getElementBounds(child)
		contentBox.Merge(childBox)
	}

	if !contentBox.IsValid() {
		return nil, fmt.Errorf("no parseable content found")
	}

	// Calculate center offsets
	viewBoxCenterX := viewBox.CenterX()
	viewBoxCenterY := viewBox.CenterY()
	contentCenterX := contentBox.CenterX()
	contentCenterY := contentBox.CenterY()

	centerOffsetX := contentCenterX - viewBoxCenterX
	centerOffsetY := contentCenterY - viewBoxCenterY

	// Calculate padding percentages
	paddingLeft := ((contentBox.MinX - viewBox.X) / viewBox.Width) * 100
	paddingRight := ((viewBox.X + viewBox.Width - contentBox.MaxX) / viewBox.Width) * 100
	paddingTop := ((contentBox.MinY - viewBox.Y) / viewBox.Height) * 100
	paddingBottom := ((viewBox.Y + viewBox.Height - contentBox.MaxY) / viewBox.Height) * 100

	// Generate assessment
	var issues []string
	hasIssues := false

	// Check centering (threshold: 5% of viewBox dimension)
	centerThresholdX := viewBox.Width * 0.05
	centerThresholdY := viewBox.Height * 0.05

	if math.Abs(centerOffsetX) > centerThresholdX {
		if centerOffsetX > 0 {
			issues = append(issues, fmt.Sprintf("content shifted RIGHT by %.1f%%", (centerOffsetX/viewBox.Width)*100))
		} else {
			issues = append(issues, fmt.Sprintf("content shifted LEFT by %.1f%%", (-centerOffsetX/viewBox.Width)*100))
		}
		hasIssues = true
	}

	if math.Abs(centerOffsetY) > centerThresholdY {
		if centerOffsetY > 0 {
			issues = append(issues, fmt.Sprintf("content shifted DOWN by %.1f%%", (centerOffsetY/viewBox.Height)*100))
		} else {
			issues = append(issues, fmt.Sprintf("content shifted UP by %.1f%%", (-centerOffsetY/viewBox.Height)*100))
		}
		hasIssues = true
	}

	// Check for excessive padding (more than 20%)
	if paddingLeft > 20 || paddingRight > 20 || paddingTop > 20 || paddingBottom > 20 {
		maxPadding := math.Max(math.Max(paddingLeft, paddingRight), math.Max(paddingTop, paddingBottom))
		issues = append(issues, fmt.Sprintf("excessive padding (max %.1f%%)", maxPadding))
		hasIssues = true
	}

	// Check for uneven padding (difference > 10%)
	hPaddingDiff := math.Abs(paddingLeft - paddingRight)
	vPaddingDiff := math.Abs(paddingTop - paddingBottom)
	if hPaddingDiff > 10 {
		issues = append(issues, fmt.Sprintf("uneven horizontal padding (L:%.1f%% R:%.1f%%)", paddingLeft, paddingRight))
		hasIssues = true
	}
	if vPaddingDiff > 10 {
		issues = append(issues, fmt.Sprintf("uneven vertical padding (T:%.1f%% B:%.1f%%)", paddingTop, paddingBottom))
		hasIssues = true
	}

	assessment := "OK"
	if len(issues) > 0 {
		assessment = strings.Join(issues, "; ")
	}

	// Suggest fixed viewBox (5% padding on all sides)
	targetPadding := 0.05 // 5%
	contentWidth := contentBox.Width()
	contentHeight := contentBox.Height()
	newWidth := contentWidth / (1 - 2*targetPadding)
	newHeight := contentHeight / (1 - 2*targetPadding)

	// Make it square if aspect ratio is close
	aspectRatio := newWidth / newHeight
	if aspectRatio > 0.9 && aspectRatio < 1.1 {
		size := math.Max(newWidth, newHeight)
		newWidth = size
		newHeight = size
	}

	newX := contentBox.MinX - (newWidth-contentWidth)/2
	newY := contentBox.MinY - (newHeight-contentHeight)/2

	suggestedViewBox := fmt.Sprintf("%.1f %.1f %.1f %.1f", newX, newY, newWidth, newHeight)

	return &AnalysisResult{
		FilePath:         filePath,
		ViewBox:          viewBox,
		ContentBox:       *contentBox,
		CenterOffsetX:    centerOffsetX,
		CenterOffsetY:    centerOffsetY,
		PaddingLeft:      paddingLeft,
		PaddingRight:     paddingRight,
		PaddingTop:       paddingTop,
		PaddingBottom:    paddingBottom,
		Assessment:       assessment,
		SuggestedViewBox: suggestedViewBox,
		HasIssues:        hasIssues,
	}, nil
}

// AnalyzeDirectory analyzes all SVG files in a directory
func AnalyzeDirectory(dirPath string) ([]*AnalysisResult, error) {
	var results []*AnalysisResult

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
		result, err := AnalyzeSVG(filePath)
		if err != nil {
			results = append(results, &AnalysisResult{
				FilePath:   filePath,
				Assessment: fmt.Sprintf("Error: %v", err),
				HasIssues:  true,
			})
			continue
		}
		results = append(results, result)
	}

	return results, nil
}

func main() {
	showFix := flag.Bool("fix", false, "Show suggested viewBox fixes")
	flag.Usage = func() {
		fmt.Fprint(os.Stderr, usage)
	}
	flag.Parse()

	path := "."
	if flag.NArg() > 0 {
		path = flag.Arg(0)
	}

	info, err := os.Stat(path)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error: %v\n", err)
		os.Exit(1)
	}

	var results []*AnalysisResult
	if info.IsDir() {
		results, err = AnalyzeDirectory(path)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error: %v\n", err)
			os.Exit(1)
		}
	} else {
		result, err := AnalyzeSVG(path)
		if err != nil {
			fmt.Fprintf(os.Stderr, "Error: %v\n", err)
			os.Exit(1)
		}
		results = []*AnalysisResult{result}
	}

	hasAnyIssues := false
	for _, r := range results {
		status := "✓"
		if r.HasIssues {
			status = "✗"
			hasAnyIssues = true
		}

		fmt.Printf("%s %s\n", status, filepath.Base(r.FilePath))
		if r.ViewBox.Width > 0 {
			fmt.Printf("  ViewBox: %.1f %.1f %.1f %.1f\n", r.ViewBox.X, r.ViewBox.Y, r.ViewBox.Width, r.ViewBox.Height)
			fmt.Printf("  Content: %.1f,%.1f to %.1f,%.1f (%.1fx%.1f)\n",
				r.ContentBox.MinX, r.ContentBox.MinY, r.ContentBox.MaxX, r.ContentBox.MaxY,
				r.ContentBox.Width(), r.ContentBox.Height())
			fmt.Printf("  Padding: L:%.1f%% R:%.1f%% T:%.1f%% B:%.1f%%\n",
				r.PaddingLeft, r.PaddingRight, r.PaddingTop, r.PaddingBottom)
			fmt.Printf("  Center offset: X:%.1f Y:%.1f\n", r.CenterOffsetX, r.CenterOffsetY)
		}
		fmt.Printf("  Assessment: %s\n", r.Assessment)
		if *showFix && r.HasIssues && r.SuggestedViewBox != "" {
			fmt.Printf("  Suggested viewBox: %s\n", r.SuggestedViewBox)
		}
		fmt.Println()
	}

	if hasAnyIssues {
		os.Exit(1)
	}
}
