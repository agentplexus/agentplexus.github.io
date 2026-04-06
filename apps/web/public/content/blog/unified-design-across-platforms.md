# Achieving Design Consistency Across 54+ Properties with Design System Spec and Lit Web Components

PlexusOne spans a marketing website, 33 MkDocs documentation sites, and ~20 Marp presentation decks. Keeping them visually consistent was becoming impossible. Here's how we solved it with a design system spec, unified navigation, and Lit web components.

| Metric | Before | After |
|--------|--------|-------|
| **Navigation code** | 1,390 lines (2 implementations) | 400 lines (1 implementation) |
| **Code reduction** | — | **-71%** |
| **Implementations to sync** | 2 (React + vanilla JS) | **1** (Lit Web Component) |
| **Properties with consistent nav** | ~50% | **100%** (54+ sites) |

## The Problem: Design Drift at Scale

Every developer knows the pattern. You start with a consistent design, then entropy takes over:

- The main website uses Tailwind with a custom dark theme
- Documentation sites use MkDocs Material with "indigo" as the primary color
- Some older docs use `readthedocs` theme entirely
- Presentations use whatever colors the author remembered

After a few months, we had:

| Property Type | Count | Color Schemes |
|---------------|-------|---------------|
| Website | 1 | Custom cyan/purple/pink |
| MkDocs Sites | 33 | 5+ variations (indigo, teal, cyan, custom) |
| Marp Decks | ~20 | Inconsistent |

The PlexusOne brand is cyan (`#06b6d4`), purple (`#8b5cf6`), and pink (`#ec4899`) on a dark background (`#0a0e1a`). But you wouldn't know that from visiting half our documentation sites.

### The Navigation Divergence

The navigation bar was worse. We had two completely separate implementations:

| Implementation | Location | Lines | Maintainer |
|----------------|----------|-------|------------|
| React Components | `Navbar.tsx` + `MegaMenu.tsx` | ~570 | Website team |
| Vanilla JavaScript | `plexus-nav.js` | ~820 | Docs team |

When we added clickable category headers to the mega menu, we updated the React version. The vanilla JS version lagged behind. When we restructured the mobile menu, same story. Each change required manual synchronization across two codebases with different paradigms.

## Solution Part 1: Design System as Code

The first step was establishing a single source of truth for design tokens. We created [Design System Spec](https://github.com/plexusone/design-system-spec) (DSS) - a JSON-based specification format for design systems.

```
plexusone-specs/
└── design-system/
    ├── meta.json              # Brand metadata
    ├── principles.json        # "Dark-first", "Gradient accents"
    ├── foundations/
    │   ├── colors.json        # Cyan/purple/pink palette
    │   ├── typography.json    # Inter + JetBrains Mono
    │   └── spacing.json       # 4px base scale
    └── contexts/
        ├── web.json           # Tailwind v4 adjustments
        ├── slides.json        # Brighter for projection
        └── docs.json          # MkDocs Material config
```

The key insight: **same tokens, different outputs**. The DSS CLI generates context-appropriate CSS:

```bash
# Generate Tailwind v4 theme
dss generate --css web.css --css-format tailwind4

# Generate MkDocs Material overrides
dss generate --css mkdocs.css --css-format mkdocs-material

# Generate Marp theme (15% brighter for projection)
dss generate --css slides.css --css-format marp --context slides
```

One change to `colors.json` propagates to all 54+ properties on next build.

For the full implementation details, see the [PlexusOne Case Study](/design-system-spec/case-studies/plexusone/) in the DSS documentation.

## Solution Part 2: GitHub Pages with Custom Domain

Having a design spec is useless if properties can't access the generated assets. We needed distribution.

The solution: host everything under `plexusone.dev` using GitHub Pages with a custom domain.

```
plexusone.dev/
├── /                    # Main React website
├── /omnillm/           # OmniLLM docs (MkDocs)
├── /agentkit/          # AgentKit docs (MkDocs)
├── /design-system-spec/ # DSS docs (MkDocs)
├── /data/products.json  # Shared product catalog
├── /js/plexus-nav.js   # Shared navigation component
└── /css/plexusone.css  # Shared design tokens
```

Each MkDocs site deploys to a subdirectory. The main website at the root. Shared assets accessible to all.

This unified hosting meant:

- **Single domain** - No CORS issues loading shared assets
- **Consistent URLs** - `/omnillm/` not `omnillm.plexusone.dev`
- **Shared resources** - One `products.json` powers all navigation menus

## Solution Part 3: Unified Navigation

With distribution solved, we tackled the navigation divergence. The goal: one implementation that works everywhere.

### Why Web Components?

We evaluated several options:

| Approach | Pros | Cons |
|----------|------|------|
| Keep both (React + vanilla) | No migration | Eternal sync burden |
| React-only | Type safety, modern DX | MkDocs can't use React |
| Vanilla-only | Works everywhere | 800+ lines, no reactivity |
| **Web Components (Lit)** | Framework-agnostic, reactive | Learning curve |

Web Components won because they're **browser-native custom elements** that work in any context:

```html
<!-- Works in React SPA -->
<plexus-nav></plexus-nav>

<!-- Works in MkDocs HTML -->
<plexus-nav></plexus-nav>

<!-- Same element, same behavior -->
```

### Why Lit Over Vanilla?

We chose [Lit](https://lit.dev/) (by Google) over hand-rolling Web Components:

```typescript
// Vanilla: Manual state management, verbose
class PlexusNav extends HTMLElement {
  static get observedAttributes() { return ['open']; }
  attributeChangedCallback(name, old, val) {
    if (name === 'open') this._render();
  }
  _render() {
    this.shadowRoot.innerHTML = `<nav>...</nav>`;
  }
}

// Lit: Declarative, reactive, ~200 lines vs ~500
@customElement('plexus-nav')
class PlexusNav extends LitElement {
  @state() open = false;

  render() {
    return html`<nav>...</nav>`;
  }
}
```

Lit adds ~5KB gzipped but eliminates entire classes of bugs through reactive state management.

### The Component Architecture

```
packages/plexus-nav/
├── src/
│   ├── plexus-nav.ts         # Main orchestrator
│   ├── plexus-mega-menu.ts   # Desktop product grid
│   ├── plexus-mobile-menu.ts # Mobile collapsible menu
│   ├── types.ts              # TypeScript interfaces
│   ├── constants.ts          # URLs, category mappings
│   ├── icons.ts              # SVG templates
│   └── styles/               # Scoped CSS-in-JS
└── dist/
    ├── plexus-nav.js         # ES module (~54KB)
    └── plexus-nav.min.js     # IIFE for <script> (~46KB)
```

The main component fetches `products.json` and passes data to sub-components:

```typescript
@customElement('plexus-nav')
export class PlexusNav extends LitElement {
  @state() private _data: ProductsData | null = null;
  @state() private _megaMenuOpen = false;

  async connectedCallback() {
    super.connectedCallback();
    const res = await fetch('/data/products.json');
    this._data = await res.json();
  }

  render() {
    return html`
      <nav>
        ${this._renderBrand()}
        ${this._renderDesktopLinks()}
        <plexus-mega-menu
          ?open=${this._megaMenuOpen}
          .data=${this._data}
        ></plexus-mega-menu>
      </nav>
    `;
  }
}
```

### Bundle Distribution: IIFE for Backward Compatibility

The build produces two formats:

| Bundle | Format | Size | Use Case |
|--------|--------|------|----------|
| `plexus-nav.js` (in dist) | ES module | ~54KB | `<script type="module">` |
| `plexus-nav.min.js` | IIFE | ~46KB | Regular `<script>` tags |

**Important:** MkDocs sites use regular `<script>` tags without `type="module"`. ES modules don't work with regular script tags. So we serve the **IIFE bundle** at `/js/plexus-nav.js` for backward compatibility:

```html
<!-- MkDocs sites load this (IIFE bundle, not ES module) -->
<script src="https://plexusone.dev/js/plexus-nav.js"></script>
```

The IIFE bundle wraps everything in `var PlexusNav = function(d) { ... }({})` which executes immediately and registers the custom element.

### Auto-Initialization for MkDocs

The existing MkDocs templates used this pattern:

```html
<div id="plexus-nav-root"></div>
<script src="https://plexusone.dev/js/plexus-nav.js"></script>
```

The old vanilla JS injected itself into `#plexus-nav-root`. The new Lit component expects `<plexus-nav></plexus-nav>`. To maintain backward compatibility without updating every MkDocs site, we added auto-initialization:

```typescript
// Auto-init for backward compatibility with MkDocs
function autoInit() {
  const root = document.getElementById('plexus-nav-root');
  if (root && !root.querySelector('plexus-nav')) {
    const nav = document.createElement('plexus-nav');
    root.appendChild(nav);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoInit);
} else {
  autoInit();
}
```

This means **zero changes to MkDocs sites**. They automatically get the new Lit implementation.

### Migration Path

The migration was straightforward because we kept the same URL:

**MkDocs (unchanged):**

```html
<script src="https://plexusone.dev/js/plexus-nav.js"></script>
```

Same URL, same element name, new implementation. Auto-init handles the rest.

**React (minimal change):**

```tsx
// Before
import { Navbar } from './components/Navbar'
<Navbar />

// After
// Load via <script> in index.html
<plexus-nav></plexus-nav>
```

We added TypeScript declarations for JSX support:

```typescript
// custom-elements.d.ts
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'plexus-nav': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
```

## Results

### Code Reduction

| Before | After | Change |
|--------|-------|--------|
| React: 570 lines | - | Deleted |
| Vanilla JS: 820 lines | - | Deleted |
| **Total: 1,390 lines** | **Lit: ~400 lines** | **-71%** |

### Maintenance Burden

| Metric | Before | After |
|--------|--------|-------|
| Implementations to sync | 2 | 1 |
| Type safety | Partial (React only) | Full |
| Style drift risk | High | None (Shadow DOM) |
| Update propagation | Manual | Automatic |

### Feature Parity

The new component includes everything from both previous implementations:

- Desktop mega menu with 4-column category grid
- Clickable category headers (was missing from vanilla JS)
- Mobile hamburger menu with collapsible sections
- Developers and Community dropdown menus
- Keyboard navigation (Escape to close)
- ARIA attributes for accessibility
- Dynamic product data from `products.json`

## Key Lessons

### 1. Design Tokens First

Don't jump to implementation. Define your design system in a machine-readable format first. JSON works well because it's:

- Version-controllable
- Diffable in PRs
- Consumable by generators
- Readable by AI assistants

### 2. Distribution Matters

A design system that lives in a Figma file or a wiki page won't get adopted. Distribute via:

- NPM packages for JS/TS projects
- CDN URLs for static sites
- PyPI packages for Python projects (MkDocs plugins)

### 3. Web Components for Cross-Framework UI

When you need the same UI in React and non-React contexts, Web Components are the answer. The ~5KB overhead of Lit is worth it for:

- Reactive state management
- Scoped styles via Shadow DOM
- TypeScript support
- Smaller, more maintainable code

### 4. IIFE for Legacy Integration

Modern ES modules are great, but many static site generators use regular `<script>` tags. Build both formats and serve the IIFE bundle for backward compatibility.

### 5. Auto-Init for Zero-Touch Migration

Adding auto-initialization code that detects legacy DOM structures lets you migrate without touching every consumer. The MkDocs sites got the new implementation automatically.

## What's Next

The unified navigation is deployed. Future enhancements tracked in [TASKS.md](https://github.com/plexusone/plexusone.github.io/blob/main/TASKS.md):

- Active page highlighting
- `currentProduct` config for highlighting current product
- Bundle size optimization (externalize Lit for ES builds)
- TypeScript declaration generation

## Resources

- [Design System Spec](https://github.com/plexusone/design-system-spec) - The DSS specification and CLI
- [PlexusOne Case Study](/design-system-spec/case-studies/plexusone/) - Full DSS implementation details
- [Lit Documentation](https://lit.dev/) - Web Components library by Google
- [plexus-nav Package](https://github.com/plexusone/plexusone.github.io/tree/main/packages/plexus-nav) - The navigation component source

## The Bottom Line

Design consistency at scale requires automation. Manual synchronization doesn't scale past a handful of properties. By treating design as code (DSS), centralizing distribution (GitHub Pages), and unifying UI components (Lit Web Components), we reduced maintenance burden while improving consistency across 54+ properties.

The investment in infrastructure—design specs, build pipelines, shared components—pays dividends every time we add a new documentation site or update the brand.
