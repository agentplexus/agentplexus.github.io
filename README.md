# PlexusOne.dev

Source code for [plexusone.dev](https://plexusone.dev) — the PlexusOne marketing website and documentation hosting hub.

## What This Repository Contains

| Directory | Purpose |
|-----------|---------|
| `apps/web/` | React SPA (marketing website at root) |
| `packages/plexus-nav/` | Lit Web Components navigation |
| `docs/` | GitHub Pages output (built assets + MkDocs sites) |

The `docs/` directory serves as the deployment target for:

- The main website (built from `apps/web/`)
- MkDocs documentation sites deployed to subdirectories (`/omnillm/`, `/agentkit/`, etc.)
- Shared assets (`/js/plexus-nav.js`, `/data/products.json`, `/css/`)

## Tech Stack

- **React 19** + TypeScript — Marketing website SPA
- **Lit 3** — Web Components for unified navigation
- **Vite** — Build tooling
- **Tailwind CSS 4** — Styling
- **GitHub Pages** — Hosting

## Key Features

### Unified Navigation

A single Lit Web Component (`<plexus-nav>`) powers navigation across:

- The React marketing website
- 33+ MkDocs documentation sites
- Any HTML page via `<script>` tag

```html
<!-- Works everywhere -->
<script src="https://plexusone.dev/js/plexus-nav.js"></script>
```

The component auto-initializes when it finds `#plexus-nav-root`, maintaining backward compatibility with existing MkDocs templates.

### Shared Data

`/data/products.json` serves as the single source of truth for product information, powering the mega menu across all properties.

## Development

```bash
# Install dependencies
npm install

# Start dev server (apps/web)
cd apps/web
npm run dev
```

## Build

```bash
# Build the website
cd apps/web
npm run build  # Outputs to ../../docs/

# Build the navigation component
cd packages/plexus-nav
npm run build
cp dist/plexus-nav.min.js ../../docs/js/plexus-nav.js
```

## Documentation

See [CLAUDE.md](./CLAUDE.md) for detailed documentation on:

- Repository structure
- Navigation component build/deploy workflow
- Blog post workflow
- Troubleshooting guide

## Deployment

The site deploys automatically via GitHub Pages on push to `main`. The `docs/` directory is served at plexusone.dev.

MkDocs sites from other repositories deploy to subdirectories via their own CI workflows.

## License

MIT
