// svg is a CLI tool for SVG processing: analyzing, verifying, and converting icons.
package main

import (
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/spf13/cobra"

	"agentplexus.github.io/tools/svg/internal/analyze"
	"agentplexus.github.io/tools/svg/internal/convert"
	"agentplexus.github.io/tools/svg/internal/svg"
	"agentplexus.github.io/tools/svg/internal/verify"
)

var version = "1.0.0"

func main() {
	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}

var rootCmd = &cobra.Command{
	Use:     "svg",
	Short:   "SVG processing tool for icons",
	Long:    `A CLI tool for analyzing, verifying, and converting SVG icons.`,
	Version: version,
}

// analyze command
var analyzeShowFix bool

var analyzeCmd = &cobra.Command{
	Use:   "analyze [path]",
	Short: "Analyze SVG files for centering and padding",
	Long: `Analyze SVG files to check:
- ViewBox dimensions
- Content centering
- Padding percentages
- Suggested viewBox fixes`,
	Args: cobra.MaximumNArgs(1),
	RunE: runAnalyze,
}

func runAnalyze(cmd *cobra.Command, args []string) error {
	path := "."
	if len(args) > 0 {
		path = args[0]
	}

	info, err := svg.GetPathInfo(path)
	if err != nil {
		return fmt.Errorf("error: %w", err)
	}

	var results []*analyze.Result
	if info.IsDir {
		results, err = analyze.AnalyzeDirectory(path)
		if err != nil {
			return fmt.Errorf("error: %w", err)
		}
	} else {
		result, err := analyze.AnalyzeSVG(path)
		if err != nil {
			return fmt.Errorf("error: %w", err)
		}
		results = []*analyze.Result{result}
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
		if analyzeShowFix && r.HasIssues && r.SuggestedViewBox != "" {
			fmt.Printf("  Suggested viewBox: %s\n", r.SuggestedViewBox)
		}
		fmt.Println()
	}

	if hasAnyIssues {
		return fmt.Errorf("one or more files have issues")
	}
	return nil
}

// verify command
var verifyCmd = &cobra.Command{
	Use:   "verify [path]",
	Short: "Verify SVG files are pure vector",
	Long: `Verify SVG files are pure vector images without:
- Embedded binary data (base64 images)
- Data URIs
- External binary image references`,
	Args: cobra.MaximumNArgs(1),
	RunE: runVerify,
}

func runVerify(cmd *cobra.Command, args []string) error {
	path := "."
	if len(args) > 0 {
		path = args[0]
	}

	info, err := svg.GetPathInfo(path)
	if err != nil {
		return fmt.Errorf("error: %w", err)
	}

	var results []*verify.Result
	if info.IsDir {
		results, err = verify.VerifyDirectory(path)
		if err != nil {
			return fmt.Errorf("error: %w", err)
		}
	} else {
		result, err := verify.VerifySVG(path)
		if err != nil {
			return fmt.Errorf("error: %w", err)
		}
		results = []*verify.Result{result}
	}

	allValid := true
	for _, r := range results {
		status := "✓"
		if !r.IsSuccess() {
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
		return fmt.Errorf("one or more files failed verification")
	}
	return nil
}

// convert command
var (
	convertOutput           string
	convertColor            string
	convertIncludeStroke    bool
	convertPreserveMasks    bool
	convertRemoveBackground bool
)

var convertCmd = &cobra.Command{
	Use:   "convert <input>",
	Short: "Convert SVG colors",
	Long: `Convert colors in an SVG file.

Examples:
  svg convert icon_orig.svg -o icon_white.svg --color ffffff
  svg convert icon.svg -o output.svg --color black
  svg convert icon.svg -o output.svg --remove-background  # Remove background rect/circle
  svg convert icon.svg -o output.svg  # Just copy without color change`,
	Args: cobra.ExactArgs(1),
	RunE: runConvert,
}

func runConvert(cmd *cobra.Command, args []string) error {
	inputPath := args[0]

	if convertOutput == "" {
		return fmt.Errorf("output path is required (-o, --output)")
	}

	opts := convert.Options{
		Color:            convertColor,
		IncludeStroke:    convertIncludeStroke,
		PreserveMasks:    convertPreserveMasks,
		RemoveBackground: convertRemoveBackground,
	}

	result, err := convert.ConvertSVG(inputPath, convertOutput, opts)
	if err != nil {
		return err
	}

	if result.Converted {
		if result.BackgroundRemoved {
			fmt.Printf("✓ Removed background element\n")
		}
		if result.TargetColor != "" {
			fmt.Printf("✓ Converted %s → %s (color: %s)\n", filepath.Base(inputPath), filepath.Base(convertOutput), result.TargetColor)
		} else {
			fmt.Printf("✓ Copied %s → %s\n", filepath.Base(inputPath), filepath.Base(convertOutput))
		}
	}

	return nil
}

// process command (all-in-one)
var (
	processOutput           string
	processColor            string
	processCenter           bool
	processStrict           bool
	processIncludeStroke    bool
	processRemoveBackground bool
)

var processCmd = &cobra.Command{
	Use:   "process <input>",
	Short: "Process SVG: convert, analyze, verify",
	Long: `Process an SVG file through the complete pipeline:
1. Remove background elements (if --remove-background)
2. Convert colors (if --color specified)
3. Analyze centering and fix viewBox (if --center)
4. Verify pure vector (if --strict)

Examples:
  svg process icon_orig.svg -o icon_white.svg --color ffffff --center --strict
  svg process icon_orig.svg -o icon_white.svg --remove-background --color ffffff
  svg process input.svg -o output.svg --center --strict`,
	Args: cobra.ExactArgs(1),
	RunE: runProcess,
}

func runProcess(cmd *cobra.Command, args []string) error {
	inputPath := args[0]

	if processOutput == "" {
		return fmt.Errorf("output path is required (-o, --output)")
	}

	// Step 1: Convert colors (to a temp file if we need to modify viewBox)
	tempOutput := processOutput
	if processCenter {
		// Use temp file for intermediate processing
		tempOutput = processOutput + ".tmp"
	}

	opts := convert.Options{
		Color:            processColor,
		IncludeStroke:    processIncludeStroke,
		PreserveMasks:    true,
		RemoveBackground: processRemoveBackground,
	}

	result, err := convert.ConvertSVG(inputPath, tempOutput, opts)
	if err != nil {
		return fmt.Errorf("conversion failed: %w", err)
	}

	if result.BackgroundRemoved {
		fmt.Printf("✓ Removed background element\n")
	}
	if result.TargetColor != "" {
		fmt.Printf("✓ Color converted to %s\n", result.TargetColor)
	}

	// Step 2: Analyze (and optionally fix centering)
	analysisResult, err := analyze.AnalyzeSVG(tempOutput)
	if err != nil {
		if processCenter {
			os.Remove(tempOutput)
		}
		return fmt.Errorf("analysis failed: %w", err)
	}

	if processCenter && analysisResult.HasIssues {
		// Apply the suggested viewBox fix
		content, err := os.ReadFile(tempOutput)
		if err != nil {
			os.Remove(tempOutput)
			return fmt.Errorf("failed to read for centering: %w", err)
		}

		contentStr := string(content)

		// Replace viewBox with suggested value
		viewBoxPattern := fmt.Sprintf(`viewBox\s*=\s*["'][^"']*["']`)
		newViewBox := fmt.Sprintf(`viewBox="%s"`, analysisResult.SuggestedViewBox)

		var viewBoxRe = regexp.MustCompile(viewBoxPattern)
		if viewBoxRe.MatchString(contentStr) {
			contentStr = viewBoxRe.ReplaceAllString(contentStr, newViewBox)
		}

		if err := os.WriteFile(processOutput, []byte(contentStr), 0644); err != nil {
			os.Remove(tempOutput)
			return fmt.Errorf("failed to write centered file: %w", err)
		}

		if tempOutput != processOutput {
			os.Remove(tempOutput)
		}

		fmt.Printf("✓ ViewBox centered: %s\n", analysisResult.SuggestedViewBox)
	} else if processCenter {
		// No issues, just rename temp to final
		if tempOutput != processOutput {
			if err := os.Rename(tempOutput, processOutput); err != nil {
				return fmt.Errorf("failed to finalize output: %w", err)
			}
		}
		fmt.Printf("✓ Centering OK (no changes needed)\n")
	}

	// Print analysis summary
	fmt.Printf("  Padding: L:%.1f%% R:%.1f%% T:%.1f%% B:%.1f%%\n",
		analysisResult.PaddingLeft, analysisResult.PaddingRight,
		analysisResult.PaddingTop, analysisResult.PaddingBottom)

	// Step 3: Verify (if strict mode)
	if processStrict {
		verifyResult, err := verify.VerifySVG(processOutput)
		if err != nil {
			return fmt.Errorf("verification failed: %w", err)
		}

		if !verifyResult.IsSuccess() {
			fmt.Printf("✗ Verification failed:\n")
			for _, e := range verifyResult.Errors {
				fmt.Printf("  - %s\n", e)
			}
			return fmt.Errorf("SVG contains embedded binary data")
		}

		fmt.Printf("✓ Verified pure vector (%s)\n", strings.Join(verifyResult.VectorElements, ", "))
	}

	fmt.Printf("\n✓ Processed: %s → %s\n", filepath.Base(inputPath), filepath.Base(processOutput))
	return nil
}

func init() {
	// analyze command
	analyzeCmd.Flags().BoolVar(&analyzeShowFix, "fix", false, "Show suggested viewBox fixes")
	rootCmd.AddCommand(analyzeCmd)

	// verify command
	rootCmd.AddCommand(verifyCmd)

	// convert command
	convertCmd.Flags().StringVarP(&convertOutput, "output", "o", "", "Output file path (required)")
	convertCmd.Flags().StringVarP(&convertColor, "color", "c", "", "Target color (hex or name, e.g., ffffff, white)")
	convertCmd.Flags().BoolVar(&convertIncludeStroke, "include-stroke", false, "Also convert stroke colors")
	convertCmd.Flags().BoolVar(&convertPreserveMasks, "preserve-masks", true, "Don't modify colors in mask/clipPath")
	convertCmd.Flags().BoolVar(&convertRemoveBackground, "remove-background", false, "Remove full-bleed background rect/circle")
	rootCmd.AddCommand(convertCmd)

	// process command
	processCmd.Flags().StringVarP(&processOutput, "output", "o", "", "Output file path (required)")
	processCmd.Flags().StringVarP(&processColor, "color", "c", "", "Target color (hex or name)")
	processCmd.Flags().BoolVar(&processCenter, "center", false, "Auto-fix viewBox for centering")
	processCmd.Flags().BoolVar(&processStrict, "strict", true, "Fail on embedded binary")
	processCmd.Flags().BoolVar(&processIncludeStroke, "include-stroke", false, "Also convert stroke colors")
	processCmd.Flags().BoolVar(&processRemoveBackground, "remove-background", false, "Remove full-bleed background rect/circle")
	rootCmd.AddCommand(processCmd)
}
