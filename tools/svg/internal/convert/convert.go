// Package convert provides SVG color conversion functionality.
package convert

import (
	"fmt"
	"os"
	"regexp"
	"strings"
)

// Options configures the color conversion behavior.
type Options struct {
	Color            string // Target color (hex or named)
	IncludeStroke    bool   // Also convert stroke colors
	PreserveMasks    bool   // Don't modify colors in mask/clipPath
	RemoveBackground bool   // Remove background rect/circle elements
}

// Result contains the result of a color conversion.
type Result struct {
	InputPath         string
	OutputPath        string
	OriginalColor     string
	TargetColor       string
	Converted         bool
	BackgroundRemoved bool
	Error             error
}

// namedColors maps color names to hex values.
var namedColors = map[string]string{
	"white":       "#ffffff",
	"black":       "#000000",
	"red":         "#ff0000",
	"green":       "#00ff00",
	"blue":        "#0000ff",
	"yellow":      "#ffff00",
	"cyan":        "#00ffff",
	"magenta":     "#ff00ff",
	"gray":        "#808080",
	"grey":        "#808080",
	"transparent": "none",
}

// NormalizeColor converts a color input to a standard #RRGGBB format.
// Accepts: "ffffff", "#ffffff", "fff", "#fff", "white", etc.
func NormalizeColor(color string) (string, error) {
	if color == "" {
		return "", nil
	}

	color = strings.ToLower(strings.TrimSpace(color))

	// Check for named colors
	if hex, ok := namedColors[color]; ok {
		return hex, nil
	}

	// Remove # prefix if present
	color = strings.TrimPrefix(color, "#")

	// Validate hex format
	if len(color) == 3 {
		// Expand 3-digit hex to 6-digit
		color = string(color[0]) + string(color[0]) +
			string(color[1]) + string(color[1]) +
			string(color[2]) + string(color[2])
	}

	if len(color) != 6 {
		return "", fmt.Errorf("invalid color format: %s (expected hex like 'ffffff' or '#ffffff')", color)
	}

	// Validate hex characters
	for _, c := range color {
		if !((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f')) {
			return "", fmt.Errorf("invalid hex color: %s", color)
		}
	}

	return "#" + color, nil
}

// ConvertSVG converts colors in an SVG file.
func ConvertSVG(inputPath, outputPath string, opts Options) (*Result, error) {
	result := &Result{
		InputPath:  inputPath,
		OutputPath: outputPath,
	}

	// Normalize target color
	targetColor, err := NormalizeColor(opts.Color)
	if err != nil {
		result.Error = err
		return result, err
	}
	result.TargetColor = targetColor

	// Read input file
	content, err := os.ReadFile(inputPath)
	if err != nil {
		result.Error = fmt.Errorf("failed to read file: %w", err)
		return result, result.Error
	}

	contentStr := string(content)

	// Remove background elements if requested
	if opts.RemoveBackground {
		contentStr, result.BackgroundRemoved = removeBackgroundElements(contentStr)
	}

	// If no color specified, just copy the file (possibly with background removed)
	if targetColor == "" {
		if err := os.WriteFile(outputPath, []byte(contentStr), 0644); err != nil {
			result.Error = fmt.Errorf("failed to write file: %w", err)
			return result, result.Error
		}
		result.Converted = true
		return result, nil
	}

	// Convert colors
	converted := convertColors(contentStr, targetColor, opts)

	// Write output file
	if err := os.WriteFile(outputPath, []byte(converted), 0644); err != nil {
		result.Error = fmt.Errorf("failed to write file: %w", err)
		return result, result.Error
	}

	result.Converted = true
	return result, nil
}

// convertColors replaces colors in SVG content.
func convertColors(content, targetColor string, opts Options) string {
	// Skip values that shouldn't be converted
	skipValues := map[string]bool{
		"none":         true,
		"transparent":  true,
		"currentColor": true,
		"inherit":      true,
	}

	// Pattern to match fill attribute
	fillAttrRe := regexp.MustCompile(`(fill\s*=\s*["'])([^"']+)(["'])`)

	// Pattern to match fill in style attribute
	fillStyleRe := regexp.MustCompile(`(fill\s*:\s*)([^;"']+)`)

	// Pattern to match stroke attribute (if includeStroke)
	strokeAttrRe := regexp.MustCompile(`(stroke\s*=\s*["'])([^"']+)(["'])`)

	// Pattern to match stroke in style attribute
	strokeStyleRe := regexp.MustCompile(`(stroke\s*:\s*)([^;"']+)`)

	// Track if we're inside a mask or clipPath (if preserveMasks)
	if opts.PreserveMasks {
		content = convertWithMaskPreservation(content, targetColor, skipValues, fillAttrRe, fillStyleRe, strokeAttrRe, strokeStyleRe, opts.IncludeStroke)
	} else {
		content = convertAllColors(content, targetColor, skipValues, fillAttrRe, fillStyleRe, strokeAttrRe, strokeStyleRe, opts.IncludeStroke)
	}

	return content
}

// convertAllColors converts all fill/stroke colors without regard to masks.
func convertAllColors(content, targetColor string, skipValues map[string]bool,
	fillAttrRe, fillStyleRe, strokeAttrRe, strokeStyleRe *regexp.Regexp, includeStroke bool) string {

	// Convert fill attributes
	content = fillAttrRe.ReplaceAllStringFunc(content, func(match string) string {
		parts := fillAttrRe.FindStringSubmatch(match)
		if len(parts) < 4 {
			return match
		}
		value := strings.TrimSpace(parts[2])
		if skipValues[value] {
			return match
		}
		return parts[1] + targetColor + parts[3]
	})

	// Convert fill in style attributes
	content = fillStyleRe.ReplaceAllStringFunc(content, func(match string) string {
		parts := fillStyleRe.FindStringSubmatch(match)
		if len(parts) < 3 {
			return match
		}
		value := strings.TrimSpace(parts[2])
		if skipValues[value] {
			return match
		}
		return parts[1] + targetColor
	})

	if includeStroke {
		// Convert stroke attributes
		content = strokeAttrRe.ReplaceAllStringFunc(content, func(match string) string {
			parts := strokeAttrRe.FindStringSubmatch(match)
			if len(parts) < 4 {
				return match
			}
			value := strings.TrimSpace(parts[2])
			if skipValues[value] {
				return match
			}
			return parts[1] + targetColor + parts[3]
		})

		// Convert stroke in style attributes
		content = strokeStyleRe.ReplaceAllStringFunc(content, func(match string) string {
			parts := strokeStyleRe.FindStringSubmatch(match)
			if len(parts) < 3 {
				return match
			}
			value := strings.TrimSpace(parts[2])
			if skipValues[value] {
				return match
			}
			return parts[1] + targetColor
		})
	}

	return content
}

// convertWithMaskPreservation converts colors but preserves mask/clipPath internals.
func convertWithMaskPreservation(content, targetColor string, skipValues map[string]bool,
	fillAttrRe, fillStyleRe, strokeAttrRe, strokeStyleRe *regexp.Regexp, includeStroke bool) string {

	// Find mask and clipPath regions to exclude
	maskRe := regexp.MustCompile(`(?s)<mask[^>]*>.*?</mask>`)
	clipPathRe := regexp.MustCompile(`(?s)<clipPath[^>]*>.*?</clipPath>`)

	// Extract masks and clipPaths, replace with placeholders
	var masks []string
	var clipPaths []string

	content = maskRe.ReplaceAllStringFunc(content, func(match string) string {
		placeholder := fmt.Sprintf("__MASK_PLACEHOLDER_%d__", len(masks))
		masks = append(masks, match)
		return placeholder
	})

	content = clipPathRe.ReplaceAllStringFunc(content, func(match string) string {
		placeholder := fmt.Sprintf("__CLIPPATH_PLACEHOLDER_%d__", len(clipPaths))
		clipPaths = append(clipPaths, match)
		return placeholder
	})

	// Convert colors in the remaining content
	content = convertAllColors(content, targetColor, skipValues, fillAttrRe, fillStyleRe, strokeAttrRe, strokeStyleRe, includeStroke)

	// Restore masks and clipPaths
	for i, mask := range masks {
		placeholder := fmt.Sprintf("__MASK_PLACEHOLDER_%d__", i)
		content = strings.Replace(content, placeholder, mask, 1)
	}

	for i, clipPath := range clipPaths {
		placeholder := fmt.Sprintf("__CLIPPATH_PLACEHOLDER_%d__", i)
		content = strings.Replace(content, placeholder, clipPath, 1)
	}

	return content
}

// removeBackgroundElements removes rect and circle elements that appear to be
// full-bleed backgrounds (spanning the entire viewBox).
func removeBackgroundElements(content string) (string, bool) {
	removed := false

	// Parse viewBox to determine dimensions
	viewBox := parseViewBoxFromContent(content)
	if viewBox.width == 0 || viewBox.height == 0 {
		return content, false
	}

	// Remove full-bleed rect elements
	// Match <rect ... /> or <rect ...></rect>
	rectRe := regexp.MustCompile(`(?s)<rect\s+[^>]*/>|<rect\s+[^>]*>\s*</rect>`)
	content = rectRe.ReplaceAllStringFunc(content, func(match string) string {
		if isFullBleedRect(match, viewBox) {
			removed = true
			return ""
		}
		return match
	})

	// Remove full-bleed circle elements
	circleRe := regexp.MustCompile(`(?s)<circle\s+[^>]*/>|<circle\s+[^>]*>\s*</circle>`)
	content = circleRe.ReplaceAllStringFunc(content, func(match string) string {
		if isFullBleedCircle(match, viewBox) {
			removed = true
			return ""
		}
		return match
	})

	// Clean up any empty lines left behind
	if removed {
		emptyLineRe := regexp.MustCompile(`\n\s*\n\s*\n`)
		content = emptyLineRe.ReplaceAllString(content, "\n\n")
	}

	return content, removed
}

type viewBoxInfo struct {
	x, y, width, height float64
}

// parseViewBoxFromContent extracts the viewBox from SVG content.
func parseViewBoxFromContent(content string) viewBoxInfo {
	// Try viewBox attribute first
	viewBoxRe := regexp.MustCompile(`viewBox\s*=\s*["']([^"']+)["']`)
	if matches := viewBoxRe.FindStringSubmatch(content); len(matches) > 1 {
		parts := strings.Fields(matches[1])
		if len(parts) == 4 {
			return viewBoxInfo{
				x:      parseFloatSafe(parts[0]),
				y:      parseFloatSafe(parts[1]),
				width:  parseFloatSafe(parts[2]),
				height: parseFloatSafe(parts[3]),
			}
		}
	}

	// Fall back to width/height attributes on <svg>
	widthRe := regexp.MustCompile(`<svg[^>]*\swidth\s*=\s*["']([^"']+)["']`)
	heightRe := regexp.MustCompile(`<svg[^>]*\sheight\s*=\s*["']([^"']+)["']`)

	var width, height float64
	if matches := widthRe.FindStringSubmatch(content); len(matches) > 1 {
		width = parseFloatSafe(strings.TrimSuffix(matches[1], "px"))
	}
	if matches := heightRe.FindStringSubmatch(content); len(matches) > 1 {
		height = parseFloatSafe(strings.TrimSuffix(matches[1], "px"))
	}

	return viewBoxInfo{x: 0, y: 0, width: width, height: height}
}

// parseFloatSafe parses a float, returning 0 on error.
func parseFloatSafe(s string) float64 {
	var f float64
	fmt.Sscanf(s, "%f", &f)
	return f
}

// isFullBleedRect checks if a rect element spans the full viewBox.
func isFullBleedRect(rectElement string, vb viewBoxInfo) bool {
	// Extract attributes
	x := extractAttrFloat(rectElement, "x", 0)
	y := extractAttrFloat(rectElement, "y", 0)
	width := extractAttrFloat(rectElement, "width", 0)
	height := extractAttrFloat(rectElement, "height", 0)

	// Check if it matches the viewBox (with small tolerance)
	tolerance := vb.width * 0.01 // 1% tolerance

	xMatch := abs(x-vb.x) < tolerance
	yMatch := abs(y-vb.y) < tolerance
	widthMatch := abs(width-vb.width) < tolerance
	heightMatch := abs(height-vb.height) < tolerance

	return xMatch && yMatch && widthMatch && heightMatch
}

// isFullBleedCircle checks if a circle element spans the full viewBox.
func isFullBleedCircle(circleElement string, vb viewBoxInfo) bool {
	cx := extractAttrFloat(circleElement, "cx", 0)
	cy := extractAttrFloat(circleElement, "cy", 0)
	r := extractAttrFloat(circleElement, "r", 0)

	// Check if circle is centered and spans the viewBox
	expectedCx := vb.x + vb.width/2
	expectedCy := vb.y + vb.height/2
	expectedR := min(vb.width, vb.height) / 2

	tolerance := vb.width * 0.01

	cxMatch := abs(cx-expectedCx) < tolerance
	cyMatch := abs(cy-expectedCy) < tolerance
	rMatch := abs(r-expectedR) < tolerance

	return cxMatch && cyMatch && rMatch
}

// extractAttrFloat extracts a float attribute value from an element string.
func extractAttrFloat(element, attrName string, defaultVal float64) float64 {
	pattern := fmt.Sprintf(`%s\s*=\s*["']([^"']+)["']`, attrName)
	re := regexp.MustCompile(pattern)
	if matches := re.FindStringSubmatch(element); len(matches) > 1 {
		return parseFloatSafe(strings.TrimSuffix(matches[1], "px"))
	}
	return defaultVal
}

func abs(x float64) float64 {
	if x < 0 {
		return -x
	}
	return x
}

func min(a, b float64) float64 {
	if a < b {
		return a
	}
	return b
}
