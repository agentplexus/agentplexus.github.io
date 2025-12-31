# SVG Tool

A CLI tool for processing SVG icons: analyzing centering, verifying purity, and converting colors.

## Installation

```bash
cd tools/svg
make build
```

Or install globally:

```bash
cd tools/svg
make install
```

## Commands

### `svg analyze` - Check centering and padding

Analyzes SVG files for proper centering and padding within their viewBox.

```bash
# Analyze a single file
svg analyze icon.svg

# Analyze all SVGs in a directory
svg analyze ./icons/

# Show suggested viewBox fixes
svg analyze --fix icon.svg
```

**Output:**
```
✓ openai.svg
  ViewBox: 0.0 0.0 24.0 24.0
  Content: 1.0,1.0 to 23.0,23.0 (22.0x22.0)
  Padding: L:4.2% R:4.2% T:4.2% B:4.2%
  Center offset: X:0.0 Y:0.0
  Assessment: OK

✗ bad-icon.svg
  ViewBox: 0.0 0.0 100.0 100.0
  Content: 20.0,5.0 to 80.0,95.0 (60.0x90.0)
  Padding: L:20.0% R:20.0% T:5.0% B:5.0%
  Center offset: X:0.0 Y:0.0
  Assessment: uneven vertical padding (T:5.0% B:5.0%)
  Suggested viewBox: -3.2 -3.2 66.3 99.5
```

**Thresholds:**
- Center offset: < 5% of viewBox dimension
- Excessive padding: < 20% on any side
- Uneven padding: < 10% difference between opposite sides

### `svg verify` - Check for embedded binary

Validates SVG files are pure vector without embedded binary data.

```bash
# Verify a single file
svg verify icon.svg

# Verify all SVGs in a directory
svg verify ./icons/
```

**Output:**
```
✓ anthropic.svg
  Vector elements: path:1
✓ kubernetes.svg
  Vector elements: path:2, rect:1
✗ bad-icon.svg
  Error: contains base64 embedded image
```

**Checks:**
- No base64-encoded images (`data:image/png`, etc.)
- No `xlink:href` or `href` with data URIs
- No `<image>` elements referencing binary files
- Valid XML structure

### `svg convert` - Convert colors

Converts fill colors in an SVG file.

```bash
# Convert to white
svg convert icon_orig.svg -o icon_white.svg --color ffffff

# Convert to black
svg convert icon.svg -o output.svg --color 000000

# Using named colors
svg convert icon.svg -o output.svg --color white

# Copy without color change
svg convert icon.svg -o output.svg

# Include stroke colors
svg convert icon.svg -o output.svg --color ffffff --include-stroke

# Remove background rect/circle before converting
svg convert icon_orig.svg -o icon_white.svg --remove-background --color ffffff
```

**Flags:**

- `-o, --output` - Output file path (required)
- `-c, --color` - Target color (hex or name: `ffffff`, `#fff`, `white`)
- `--include-stroke` - Also convert stroke colors (default: false)
- `--preserve-masks` - Don't modify colors in mask/clipPath (default: true)
- `--remove-background` - Remove full-bleed background rect/circle (default: false)

**Supported color formats:**

- Hex: `ffffff`, `#ffffff`, `fff`, `#fff`
- Named: `white`, `black`, `red`, `green`, `blue`, `cyan`, `magenta`, `yellow`, `gray`

**Special handling:**

- Skips `fill="none"`, `fill="transparent"`, `fill="currentColor"`
- Preserves mask/clipPath internals by default (black/white have special meaning)

**Background removal:**

The `--remove-background` flag detects and removes:

- `<rect>` elements at viewBox origin with width/height matching the viewBox
- `<circle>` elements centered in the viewBox with radius = half the viewBox size

This is useful for icons that have a colored or white background square/circle that should be transparent. Use this flag only when you want to remove backgrounds—some icons intentionally have backgrounds (e.g., app icons with rounded corners).

### `svg process` - All-in-one pipeline

Processes an SVG through the complete pipeline: remove background, convert, analyze, verify.

```bash
# Full pipeline
svg process icon_orig.svg -o icon_white.svg --color ffffff --center --strict

# Remove background, convert to white
svg process icon_orig.svg -o icon_white.svg --remove-background --color ffffff

# Just analyze and verify (no color change)
svg process input.svg -o output.svg --center --strict

# Quick conversion without centering
svg process icon.svg -o output.svg --color white
```

**Flags:**

- `-o, --output` - Output file path (required)
- `-c, --color` - Target color (omit to keep original)
- `--center` - Auto-fix viewBox for centering (default: false)
- `--strict` - Fail on embedded binary (default: true)
- `--include-stroke` - Also convert stroke colors (default: false)
- `--remove-background` - Remove full-bleed background rect/circle (default: false)

**Output:**
```
✓ Removed background element
✓ Color converted to #ffffff
✓ ViewBox centered: 2.5 2.5 95.0 95.0
  Padding: L:5.0% R:5.0% T:5.0% B:5.0%
✓ Verified pure vector (path:3, circle:2)

✓ Processed: icon_orig.svg → icon_white.svg
```

**Exit codes:**
- 0: Success
- 1: Error (verification failed, conversion error, etc.)

## Icon Processing Workflow

### 1. Source the Icon

Get icons from official brand resources and save to `agentplexus-assets-internal/logos/other/`:
- `icon_<name>_orig.svg` - Original version

### 2. Process the Icon

```bash
# Convert to white, center, and verify
svg process icon_pulumi_orig.svg -o icon_pulumi_white.svg --color ffffff --center --strict

# If the icon has a background rect/circle, remove it first
svg process icon_pulumi_orig.svg -o icon_pulumi_white.svg --remove-background --color ffffff --strict
```

### 3. Deploy

Copy to production:
```bash
cp icon_pulumi_white.svg ../../apps/web/public/integrations/pulumi.svg
```

### 4. Register in Code

Add to `apps/web/src/components/Integrations.tsx`:
```typescript
{ name: 'Pulumi', logo: '/integrations/pulumi.svg' },
```

## Development

```bash
# Build
make build

# Run tests
make test

# Clean build artifacts
make clean

# Download dependencies
make deps
```

## Project Structure

```
tools/svg/
├── cmd/svg/main.go           # CLI entry point
├── internal/
│   ├── analyze/analyze.go    # Centering analysis
│   ├── verify/verify.go      # Purity verification
│   ├── convert/convert.go    # Color conversion
│   └── svg/                   # Shared utilities
│       ├── bounds.go         # BoundingBox, ViewBox
│       ├── parser.go         # Path/element parsing
│       └── file.go           # File operations
├── go.mod
├── Makefile
└── README.md
```
