# Introducing the Releases Page: Tracking Progress Across AgentPlexus

We're building a lot at AgentPlexus. Multiple SDKs, MCP servers, infrastructure tools, and integrations—all moving forward simultaneously. Keeping track of what shipped and when was becoming a challenge. Today we're launching a dedicated [Releases page](/releases) that aggregates GitHub releases across all our repositories into a single, filterable view.

## The Problem: Release Visibility

When you're maintaining 20+ repositories, release announcements get scattered:

- GitHub notifications pile up
- Release notes live on individual repo pages
- There's no unified timeline of what shipped
- Contributors can't easily see the full picture of progress

We wanted something like [Zoom's Developer Changelog](https://developers.zoom.us/changelog/)—a single page showing all releases chronologically with filtering and search.

## The Solution: ReleaseLog

We built [ReleaseLog](https://github.com/grokify/releaselog), an open-source tool that aggregates GitHub releases into a unified view. It has two components:

### Go CLI for Fetching Releases

```bash
# Install
go install github.com/grokify/releaselog/cmd/releaselog@latest

# Fetch from an organization
releaselog fetch --org agentplexus -o releases.json

# Generate Markdown changelog
releaselog generate releases.json --format md -o RELEASES.md
```

The CLI fetches releases from GitHub organizations, users, or specific repositories and outputs a JSON intermediate representation. You can then generate Markdown, XLSX, or filtered JSON for different use cases.

### JavaScript Viewer for Embedding

The [@grokify/releaselog](https://www.npmjs.com/package/@grokify/releaselog) npm package provides an embeddable viewer with:

- **GitHub-style heatmap** showing release activity over time
- **Multi-select filtering** by repository
- **Search** across release names and notes
- **Pagination** for large release histories
- **Theming** via CSS custom properties

```html
<script src="https://unpkg.com/@grokify/releaselog/dist/releaselog-viewer.min.js"></script>
<script>
  new ReleaseLogViewer('#releases', {
    url: 'releases.json',
    showHeatmap: true
  });
</script>
```

## What You'll Find on Our Releases Page

Visit [agentplexus.dev/releases](/releases) to see:

- **All AgentPlexus releases** in one chronological feed
- **Activity heatmap** showing our release cadence (click any cell to filter by date)
- **Repository filter** to focus on specific projects
- **Direct links** to GitHub release pages for full notes

The heatmap uses our cyan color palette and provides a quick visual of when we're shipping. You might notice clusters around certain dates—those are usually coordinated releases across related packages.

## Why Open Source This?

ReleaseLog solves a real problem for any organization with multiple repositories. Whether you're a startup with a dozen microservices or an enterprise with hundreds of internal tools, having a unified release view helps:

- **Product managers** understand shipping velocity
- **Developers** see what dependencies have updated
- **Users** track changes across the tools they use
- **Leadership** get visibility into engineering output

The tool is intentionally simple. Fetch JSON, display it. No database, no complex infrastructure. You can run it as a static site on GitHub Pages.

## Try It Yourself

1. **View our releases**: [agentplexus.dev/releases](/releases)
2. **Try the demo**: [grokify.github.io/releaselog/examples/standalone.html](https://grokify.github.io/releaselog/examples/standalone.html)
3. **Install the CLI**: `go install github.com/grokify/releaselog/cmd/releaselog@latest`
4. **Use the npm package**: `npm install @grokify/releaselog`
5. **Read the docs**: [github.com/grokify/releaselog](https://github.com/grokify/releaselog)

## What's Next

We're continuing to improve ReleaseLog based on our own usage:

- Category filtering (features, fixes, security)
- Release notes preview on hover
- RSS/Atom feed generation
- Slack/Discord notifications for new releases

If you're managing multiple repositories and want better release visibility, give ReleaseLog a try. And if you build something cool with it, let us know on [GitHub](https://github.com/grokify/releaselog).
