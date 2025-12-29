import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Rss } from 'lucide-react'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  author: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'mcp-confluence-table-corruption',
    title: 'Why We Built Another Confluence MCP Server',
    excerpt:
      'Existing Confluence MCP servers corrupt tables. The root cause: LLMs generate Markdown or HTML5, but Confluence uses Storage Format XHTML. We built a server that handles both structured creation and lossless editing.',
    date: '2024-12-29',
    readTime: '6 min',
    tags: ['MCP', 'Confluence', 'Engineering'],
    author: 'AgentPlexus Team',
  },
  {
    slug: 'security-gated-mcp-servers',
    title: 'Security-Gated MCP Servers with VaultGuard',
    excerpt:
      'MCP servers need API keys. Environment variables in config files are convenient but insecure. We built a pattern using VaultGuard that gates credential access on device security posture.',
    date: '2024-12-29',
    readTime: '8 min',
    tags: ['MCP', 'Security', 'VaultGuard', 'OmniVault'],
    author: 'AgentPlexus Team',
  },
  {
    slug: 'wcag-accessibility-with-ai',
    title: 'A Severity Rubric for WCAG 2.2 AA Prioritization',
    excerpt:
      'WCAG defines conformance levels, not severity. When you find 14 accessibility issues, which do you fix first? We built a severity rubric based on user impact and share our initial implementation pass.',
    date: '2024-12-29',
    readTime: '12 min',
    tags: ['Accessibility', 'WCAG', 'Engineering'],
    author: 'AgentPlexus Team',
  },
  {
    slug: 'otel-semantic-conventions-agentic-ai',
    title: 'OpenTelemetry Semantic Conventions for Agentic AI',
    excerpt:
      'Multi-agent AI systems need observability beyond what OpenTelemetry GenAI provides. We built semantic conventions for workflows, tasks, handoffs, and tool calls—extending gen_ai.agent.* to give multi-agent systems first-class observability.',
    date: '2024-12-28',
    readTime: '8 min',
    tags: ['OpenTelemetry', 'Observability', 'Multi-Agent', 'OmniObserve'],
    author: 'AgentPlexus Team',
  },
  {
    slug: 'ai-assisted-sdk-development',
    title: 'Building Production Go SDKs with Claude Opus 4.5',
    excerpt:
      'We built two complete Go SDKs in hours instead of weeks. The pattern: OpenAPI spec → ogen code generation → wrapper services. Here\'s what we learned about AI-assisted SDK development.',
    date: '2024-12-28',
    readTime: '8 min',
    tags: ['Claude Opus 4.5', 'SDK Development', 'Go', 'Engineering'],
    author: 'AgentPlexus Team',
  },
  {
    slug: 'building-stats-agent-team',
    title: 'Building a Multi-Agent Statistics Verification System',
    excerpt:
      'The journey of creating stats-agent-team: from hallucinated statistics to verified facts. Lessons learned building a 4-agent pipeline with OmniLLM, OmniSerp, and OmniObserve.',
    date: '2024-12-28',
    readTime: '10 min',
    tags: ['Multi-Agent', 'OmniLLM', 'OmniSerp', 'Case Study'],
    author: 'AgentPlexus Team',
  },
]

export function BlogPage() {
  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 mb-4">
            Insights, tutorials, and stories from building AI agent infrastructure.
          </p>
          <a
            href="/atom.xml"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-plexus-cyan transition-colors"
          >
            <Rss size={14} />
            Atom Feed
          </a>
        </div>

        <div className="space-y-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-white/10 bg-plexus-slate/30 p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full text-xs bg-plexus-purple/20 text-plexus-purple-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold text-white mb-3 hover:text-plexus-cyan transition-colors">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-400 mb-4">{post.excerpt}</p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-plexus-cyan hover:text-plexus-cyan-light transition-colors text-sm font-medium"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read more <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
