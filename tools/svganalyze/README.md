# SVG Icon Process

> **DEPRECATED**: This tool has been superseded by [`tools/svg`](../svg/README.md).
> Use `svg analyze` instead of `svganalyze`.
>
> ```bash
> cd tools/svg && make build
> ./svg analyze icon.svg
> ./svg analyze --fix icon.svg
> ```

---

This document describes the process for adding and validating SVG icons for the AgentPlexus website.

## Overview

Integration icons are displayed on the homepage and Integrations page. They must be:
- SVG format with white fill (`#FFFFFF`)
- Properly centered within their viewBox
- Reasonably padded (not too tight, not excessive whitespace)

## Directory Structure

```
agentplexus.github.io/
├── apps/web/public/integrations/    # Production icons (white, optimized)
└── tools/svganalyze/                # Icon analysis tool

agentplexus-assets-internal/
└── logos/other/                     # Source icons (original colors)
```

## Adding a New Icon

### 1. Source the Icon

Get the icon from:
- Official brand resources/press kit
- SVG repositories (with appropriate licensing)
- Original asset files

Save to `agentplexus-assets-internal/logos/other/` with naming convention:
- `icon_<name>_orig.svg` - Original version
- `icon_<name>_white.svg` - White version (if provided)

### 2. Convert to White

If the icon isn't already white, modify the SVG:

```xml
<!-- Before -->
<path d="..." fill="#000000"/>

<!-- After -->
<path d="..." fill="#FFFFFF"/>
```

For multi-path SVGs, ensure all visible paths have `fill="#FFFFFF"`.

**Tips:**
- Remove XML declarations (`<?xml ...?>`)
- Remove comments and metadata
- Keep viewBox, remove width/height attributes (allows scaling)
- Remove `id` attributes unless referenced

### 3. Analyze with svganalyze

Build and run the analysis tool:

```bash
cd tools/svganalyze
go build -o svganalyze .
./svganalyze /path/to/icon.svg
```

**Good output:**
```
✓ icon.svg
  ViewBox: 0.0 0.0 24.0 24.0
  Content: 1.0,1.0 to 23.0,23.0 (22.0x22.0)
  Padding: L:4.2% R:4.2% T:4.2% B:4.2%
  Center offset: X:0.0 Y:0.0
  Assessment: OK
```

**Issues to fix:**
- `content shifted RIGHT/LEFT/UP/DOWN` - Adjust viewBox origin
- `excessive padding` - Reduce viewBox dimensions
- `uneven padding` - Adjust viewBox to center content

### 4. Fix Centering Issues

If the icon is off-center, adjust the viewBox:

```xml
<!-- Original viewBox (content shifted right and down) -->
<svg viewBox="0 0 310 310">

<!-- Fixed viewBox (crops to content with even padding) -->
<svg viewBox="14 13 296 294">
```

The tool with `-fix` flag suggests corrected viewBox values:
```bash
./svganalyze -fix /path/to/icon.svg
```

### 5. Copy to Production

Copy the finalized white icon to:
```
apps/web/public/integrations/<name>.svg
```

### 6. Update Code

Add the integration to the appropriate file:

**Homepage cloud** (`src/components/Integrations.tsx`):
```typescript
{ name: 'New Integration', logo: '/integrations/newicon.svg' },
```

**Full integrations page** (`src/pages/IntegrationsPage.tsx`):
```typescript
{
  name: 'New Integration',
  logo: '/integrations/newicon.svg',
  description: 'Brief description of the integration',
  url: 'https://example.com',
},
```

## Acceptable Thresholds

The svganalyze tool uses these thresholds:
- **Center offset**: < 5% of viewBox dimension
- **Excessive padding**: < 20% on any side
- **Uneven padding**: < 10% difference between opposite sides

## Common Issues

### Numbers in path data parsed incorrectly
SVG paths can have numbers like `.37` (no leading digit) or `-1.94` immediately following another number. The tool handles these, but very complex paths may have minor inaccuracies.

### Arc commands
SVG arc commands (`A`/`a`) have flag parameters that can concatenate with numbers. The tool may slightly misparse these, but results are usually close enough.

### Transforms
The tool does not account for `transform` attributes. If an icon uses transforms, the bounding box calculation may be wrong. Prefer icons without transforms, or apply transforms to the path data.

### Masks and ClipPaths
The tool skips `<mask>`, `<clipPath>`, and `<defs>` elements to avoid counting non-visible content.

## Tool Maintenance

The svganalyze tool is in `tools/svganalyze/main.go`. It uses:
- `github.com/JoshVarga/svgparser` for SVG XML parsing
- Custom regex-based path data parsing

To rebuild after changes:
```bash
cd tools/svganalyze
go build -o svganalyze .
```
