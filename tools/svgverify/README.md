# svgverify

> **DEPRECATED**: This tool has been superseded by [`tools/svg`](../svg/README.md).
> Use `svg verify` instead of `svgverify`.
>
> ```bash
> cd tools/svg && make build
> ./svg verify icon.svg
> ./svg verify ./icons/
> ```

---

A tool to validate SVG files are pure vector images without embedded binary data.

## Purpose

Ensures SVG icons and graphics are true vector images, not SVGs with embedded raster images (base64-encoded PNGs, JPEGs, etc.). This is important for:

- Maintaining scalability at any resolution
- Keeping file sizes small
- Ensuring consistent rendering across platforms

## Installation

```bash
cd tools/svgverify
go build -o svgverify
```

Or run directly:

```bash
go run main.go <path>
```

## Usage

```bash
# Verify all SVG files in a directory
svgverify ./icons

# Verify a single SVG file
svgverify ./logo.svg

# Verify SVG files in current directory
svgverify

# Show help
svgverify --help
```

## Example Output

```
✓ anthropic.svg
  Vector elements: path:1
✓ docker.svg
  Vector elements: path:1
✓ kubernetes.svg
  Vector elements: path:2, rect:1
✗ bad-icon.svg
  Error: contains base64 embedded image
```

## Checks Performed

- **Valid XML structure** - Ensures the file is well-formed XML
- **No embedded binary data** - Detects base64-encoded images and data URIs
- **No external binary references** - Detects `<image>` elements referencing PNG/JPEG files
- **Vector element count** - Reports the types and counts of vector elements found:
  - `path`, `rect`, `circle`, `ellipse`
  - `line`, `polyline`, `polygon`, `text`

## Exit Codes

| Code | Meaning |
|------|---------|
| 0 | All files are valid pure vector SVGs |
| 1 | One or more files failed validation |

## Use Cases

### CI/CD Integration

Add to your build pipeline to prevent accidentally committing SVGs with embedded raster images:

```yaml
- name: Validate SVG icons
  run: |
    cd tools/svgverify
    go run main.go ../../apps/web/public/integrations
```

### Pre-commit Hook

```bash
#!/bin/bash
go run tools/svgverify/main.go apps/web/public/icons
```
