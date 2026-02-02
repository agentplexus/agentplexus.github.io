# Contributing to AgentPlexus Website

This guide covers internal operations for maintaining the AgentPlexus website.

## Setup

```bash
# Clone the repository
git clone https://github.com/agentplexus/agentplexus.github.io.git
cd agentplexus.github.io

# Install dependencies
cd apps/web
npm install

# Start development server
npm run dev
```

The dev server runs at `http://localhost:5173` (or next available port).

## Project Structure

```
agentplexus.github.io/
├── apps/web/                    # React app source
│   ├── public/                  # Static assets (copied to build)
│   │   ├── content/blog/        # Blog markdown files
│   │   ├── releases/            # Release data JSON
│   │   └── blog/atom.xml        # Atom feed
│   └── src/
│       ├── components/          # Shared components (Navbar, Footer)
│       └── pages/               # Page components
├── docs/                        # Build output (published to GitHub Pages)
├── CHANGELOG.md                 # Site changelog
└── CONTRIBUTING.md              # This file
```

## Operations

### Update Releases Page

The releases page displays data from `/releases/releases.json`.

1. **Fetch latest releases** using the releaselog CLI:

   ```bash
   # Install releaselog CLI
   go install github.com/grokify/releaselog/cmd/releaselog@latest

   # Fetch releases from AgentPlexus org
   releaselog fetch --org agentplexus -o releases.json
   ```

2. **Copy to public directory**:

   ```bash
   cp releases.json apps/web/public/releases/releases.json
   ```

3. **Rebuild and deploy** (see Deployment section)

### Add a Blog Post

1. **Create the markdown file** in `apps/web/public/content/blog/`:

   ```bash
   # File: apps/web/public/content/blog/my-new-post.md
   ```

   Do NOT include an H1 title - the page component renders the title from metadata.

2. **Add entry to BlogPage.tsx** at `apps/web/src/pages/BlogPage.tsx`:

   ```tsx
   export const blogPosts: BlogPost[] = [
     {
       slug: 'my-new-post',           // Must match filename (without .md)
       title: 'My New Post Title',
       excerpt: 'A brief description for the blog listing...',
       date: '2026-02-02',            // YYYY-MM-DD format
       readTime: '5 min',
       tags: ['Tag1', 'Tag2'],
       author: 'AgentPlexus Team',
     },
     // ... existing posts
   ]
   ```

   Add new posts at the TOP of the array (newest first).

3. **Optional: Add post metadata** in `BlogPostPage.tsx` for GitHub links, related products:

   ```tsx
   const postMeta: Record<string, PostMeta> = {
     'my-new-post': {
       githubUrl: 'https://github.com/agentplexus/...',
       relatedProducts: [
         { slug: 'omnillm', name: 'OmniLLM', color: 'cyan' },
       ],
     },
     // ... existing metadata
   }
   ```

4. **Add entry to blog-posts.json** at `content/data/blog-posts.json`:

   Add the new post at the TOP of the array (newest first):

   ```json
   {
     "slug": "my-new-post",
     "title": "My New Post Title",
     "excerpt": "A brief description...",
     "date": "2026-02-02",
     "readTime": "5 min",
     "tags": ["Tag1", "Tag2"],
     "author": "AgentPlexus Team"
   }
   ```

   **Note**: This file must stay in sync with `BlogPage.tsx`.

5. **Regenerate Atom feed** using the atomfeed tool:

   ```bash
   ./tools/atomfeed/atomfeed
   ```

   This reads from `content/data/blog-posts.json` and generates `apps/web/public/blog/atom.xml`.

6. **Rebuild and deploy** (see Deployment section)

### Add an Integration

Edit `apps/web/src/pages/IntegrationsPage.tsx`:

1. **Find the appropriate category** in the `integrations` object:

   - `llmProviders` - LLM providers (OpenAI, Anthropic, etc.)
   - `observability` - Observability platforms
   - `vectorDatabases` - Vector databases
   - `cloudProviders` - Cloud platforms
   - `devTools` - Development tools

2. **Add the integration**:

   ```tsx
   {
     name: 'New Service',
     description: 'Brief description of the integration',
     icon: ServiceIcon,  // Import from lucide-react or create custom
     status: 'available' | 'coming-soon',
     docsUrl: 'https://...',  // Optional
   }
   ```

3. **Rebuild and deploy**

### Add a Project

Edit `apps/web/src/pages/ProjectsPage.tsx`:

1. **Add to the `projects` array**:

   ```tsx
   {
     name: 'project-name',
     description: 'What this project does',
     language: 'Go',
     stars: 0,
     status: 'active' | 'beta' | 'experimental',
     tags: ['tag1', 'tag2'],
     githubUrl: 'https://github.com/agentplexus/project-name',
   }
   ```

2. **Rebuild and deploy**

### Add an MCP Server

Edit `apps/web/src/pages/McpPage.tsx`:

1. **Add to the `mcpServers` array**:

   ```tsx
   {
     name: 'mcp-service-name',
     description: 'What this MCP server provides',
     icon: ServiceIcon,
     features: ['feature1', 'feature2'],
     githubUrl: 'https://github.com/agentplexus/mcp-service-name',
     status: 'available' | 'coming-soon',
   }
   ```

2. **Rebuild and deploy**

### Update Navigation

Edit `apps/web/src/components/Navbar.tsx`:

- **Desktop nav**: Modify `navItems` array or Resources dropdown
- **Mobile nav**: Update the mobile menu section (separate from desktop)

## Deployment

The site deploys to GitHub Pages from the `docs/` directory on the `main` branch.

1. **Build the site**:

   ```bash
   cd apps/web
   npm run build
   ```

   This outputs to `../../docs/` (the repo root `docs/` folder).

2. **Commit and push**:

   ```bash
   cd ../..  # Back to repo root
   git add docs/ apps/web/
   git commit -m "feat: description of changes"
   git push origin main
   ```

3. **Verify deployment**:

   - Check GitHub Actions for `pages-build-deployment` workflow
   - Site updates at https://agentplexus.dev within a few minutes

## Conventions

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new blog post about X
fix: correct typo in navigation
docs: update CONTRIBUTING.md
chore: update dependencies
```

### Blog Post Guidelines

- **No H1 in markdown**: The title comes from BlogPage.tsx metadata
- **Use H2 (##) for sections**: These become the main headings in the post
- **Code blocks**: Use fenced code blocks with language hints
- **Images**: Place in `apps/web/public/images/blog/` and reference as `/images/blog/filename.png`

### File Naming

- Blog posts: `kebab-case.md` (e.g., `my-new-feature.md`)
- Components: `PascalCase.tsx` (e.g., `BlogPostPage.tsx`)

## Troubleshooting

### Blog post shows raw markdown on refresh

Ensure markdown files are in `apps/web/public/content/blog/`, NOT `apps/web/public/blog/`. The `/blog/{slug}` route must 404 to trigger SPA routing.

### Changes not appearing after deploy

1. Check that `docs/` was committed (not just source files)
2. Hard refresh browser (`Cmd+Shift+R` / `Ctrl+Shift+R`)
3. Check GitHub Actions completed successfully

### Development server not reflecting changes

For changes to `public/` files, you may need to restart the dev server.
