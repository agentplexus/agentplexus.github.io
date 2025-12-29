---
marp: true
theme: default
paginate: true
backgroundColor: #0a0a0f
color: #e5e5e5
style: |
  section {
    font-family: 'Inter', system-ui, sans-serif;
  }
  h1, h2, h3 {
    color: #ffffff;
  }
  h1 {
    background: linear-gradient(135deg, #06b6d4, #a855f7, #ec4899);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  code {
    background: #1e1e2e;
    padding: 2px 8px;
    border-radius: 4px;
    color: #06b6d4;
  }
  pre {
    background: #1e1e2e !important;
    border-radius: 8px;
    padding: 16px !important;
  }
  a {
    color: #06b6d4;
  }
  strong {
    color: #a855f7;
  }
  blockquote {
    border-left: 4px solid #a855f7;
    padding-left: 16px;
    color: #9ca3af;
  }
  ul li::marker {
    color: #06b6d4;
  }
  table {
    font-size: 0.9em;
  }
  th {
    background: #1e1e2e;
    color: #a855f7;
  }
  td {
    background: #12121a;
  }
---

# Building AgentPlexus.github.io

## A Case Study in Human-AI Collaborative Development

**Built with Claude Opus 4.5**

---

# The Starting Point

## What We Set Out to Build

A **portfolio site** for AgentPlexus showcasing:

- 8 open source Go modules (OmniLLM, OmniVault, OmniSerp, etc.)
- Example projects with embedded presentations
- Technical blog with markdown support
- Modern, responsive design

**Tech Stack:** React + Vite + TypeScript + Tailwind CSS v4

---

# The Development Journey

## Iterative, Conversational Development

```
User: "on footer, for GitHub, we have the Octocat icon.
       Should we also add it to the header nav bar?"

Claude: [Updates Navbar, Hero, ProductCard, InAction components]

User: "Update the homepage to indicate OmniVoice is available"

Claude: [Updates status from 'coming-soon' to 'beta', adds presentation URL]
```

Each change built on the previous, maintaining consistency across the codebase.

---

# Feature: Dynamic Blog Infrastructure

## Markdown-Powered Content

```typescript
// Blog posts with rich metadata
interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  author: string
}
```

- **react-markdown** with remark-gfm for rendering
- **react-syntax-highlighter** with oneDark theme
- Dynamic related products/examples per post

---

# Feature: Embedded Presentations

## Marp Slides Inside the Site

Each product and example can embed its HTML presentation:

```tsx
{product.presentationUrl && (
  <iframe
    src={product.presentationUrl}
    title={`${product.name} Presentation`}
    className="w-full"
    style={{ height: 'calc(100vh - 300px)' }}
  />
)}
```

Preview thumbnails on the Examples page for quick browsing.

---

# Feature: Atom Feed with Go

## Server-Side Generation

```go
// cmd/atomfeed/main.go
type BlogPost struct {
    Slug     string   `json:"slug"`
    Title    string   `json:"title"`
    Excerpt  string   `json:"excerpt"`
    Date     string   `json:"date"`
    Tags     []string `json:"tags"`
    Author   string   `json:"author"`
}
```

Data lives in `data/blog-posts.json`, feed outputs to `public/atom.xml`.

Keeps the React SPA simple while supporting RSS readers.

---

# Problem Solving: Tailwind Dynamic Classes

## The Bug

```tsx
// This doesn't work - Tailwind can't detect dynamic class names
<span className={`bg-${color === 'cyan' ? 'plexus-cyan' : ...}`} />
```

Bullets were invisible because classes weren't in the build.

## The Fix

```tsx
const bulletClasses = {
  cyan: 'bg-plexus-cyan',
  purple: 'bg-plexus-purple',
  // Static strings Tailwind can detect
}

<span className={bulletClasses[color]} />
```

---

# Problem Solving: Code Block Styling

## User Feedback

> "The code on this page has a background per-line which looks non-standard"

## Solution

Installed `react-syntax-highlighter` and added detection logic:

```tsx
const isCodeBlock =
  (children?.toString().includes('\n')) ||
  (className?.includes('language-'))

return isCodeBlock
  ? <SyntaxHighlighter style={oneDark}>{children}</SyntaxHighlighter>
  : <code className="...">{children}</code>
```

---

# The Refactoring Pattern

## Examples Section Evolution

**Before:** All examples on homepage (getting long)

**User:** "is this section getting long? Should it be broken out?"

**After:**
- `ExamplesPage.tsx` - Full listings with presentation previews
- `InAction.tsx` - Compact 4-column grid on homepage
- "View All Examples" button linking between them

---

# Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Embedded iframes | Native presentation experience |
| Go for Atom feed | Matches project ecosystem |
| Static bullet class maps | Tailwind build compatibility |
| Dynamic blog footers | Context-aware related content |
| Two-column Features/Use Cases | Matches Examples page style |

---

# What Made It Work

## Human-AI Collaboration Patterns

1. **User provides direction** - "Should we have Features/Benefits boxes?"
2. **Claude proposes options** - "Features + Use Cases would work well"
3. **User confirms** - "Okay, great! Let's do this!"
4. **Claude implements** - Full implementation across all products
5. **User refines** - "The bullets are hard to see"
6. **Claude fixes** - Identifies root cause and resolves

---

# Development Stats

## What We Built Together

- **8 product pages** with Features & Use Cases
- **4 example pages** with presentation embeds
- **3 blog articles** with syntax highlighting
- **1 Atom feed** generated with Go
- **2 reusable npm packages** (markdown-blog, presentation-embed)
- **Monorepo structure** with apps, packages, content, tools
- **MkDocs internal docs** for team knowledge

All in a **single conversation session**.

---

# Feature: Integration Icons

## Pure Vector SVG Icons

Created **15 white SVG icons** for integrations display:

- OpenAI, Anthropic, Gemini, xAI, Ollama
- Kubernetes, Docker, Helm
- Langfuse, Phoenix, Opik
- Serper, SerpApi, Twilio, ElevenLabs

**Challenges solved:**
- Kubernetes helm wheel with SVG mask for transparent cutout
- Extracted icon portions from full logos (Serper, Phoenix, Opik)
- Normalized viewBox sizing across all icons

---

# Tool: svgverify

## Validating Pure Vector SVGs

```go
// tools/svgverify/main.go
func ValidateSVG(filePath string) (*SVGValidationResult, error) {
    // Checks for embedded binary data (base64, data URIs)
    // Counts vector elements (path, rect, polygon, etc.)
    // Validates XML structure
}
```

```bash
$ svgverify ./apps/web/public/integrations
✓ kubernetes.svg
  Vector elements: path:2, rect:1
✓ xai.svg
  Vector elements: polygon:4
```

Prevents accidentally committing SVGs with embedded raster images.

---

# Lessons Learned

## For AI-Assisted Development

1. **Iterative refinement works** - Small changes compound
2. **User feedback is essential** - Catches issues AI misses
3. **Consistency matters** - Icons, colors, patterns
4. **Static analysis limitations** - Dynamic Tailwind classes fail
5. **Right tool for the job** - Go for feeds, React for UI

---

# The Result

## AgentPlexus.github.io

A complete portfolio site featuring:

- Modern dark theme with gradient accents
- Embedded Marp presentations
- Markdown blog with syntax highlighting
- Atom feed for RSS readers
- Responsive design throughout

**Built collaboratively in one session.**

---

# Try It Yourself

## Resources

- **Site:** https://agentplexus.github.io
- **Source:** https://github.com/agentplexus/agentplexus.github.io
- **Claude Code:** https://claude.ai/code

> "The best code is written in conversation."

---

# Thank You

## Questions?

**AgentPlexus** - Open source building blocks for AI agents

Built with Claude Opus 4.5
