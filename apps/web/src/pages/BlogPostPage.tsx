import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Clock, Github, Play, ExternalLink } from 'lucide-react'
import { MarkdownRenderer, useMarkdownContent } from '@agentplexus/markdown-blog'
import { blogPosts } from './BlogPage'

interface RelatedProduct {
  slug: string
  name: string
  color: 'cyan' | 'purple' | 'pink' | 'violet'
}

interface PostMeta {
  githubUrl?: string
  projectUrl?: string
  relatedProjects?: {
    slug: string
    name: string
    tagline: string
    presentationUrl: string
  }[]
  relatedProducts?: RelatedProduct[]
}

const postMeta: Record<string, PostMeta> = {
  'mcp-confluence-table-corruption': {
    githubUrl: 'https://github.com/agentplexus/mcp-confluence',
    relatedProducts: [
      { slug: 'vaultguard', name: 'VaultGuard', color: 'purple' },
    ],
  },
  'security-gated-mcp-servers': {
    githubUrl: 'https://github.com/agentplexus/omniserp',
    relatedProducts: [
      { slug: 'vaultguard', name: 'VaultGuard', color: 'purple' },
      { slug: 'omnivault', name: 'OmniVault', color: 'purple' },
      { slug: 'posture', name: 'Posture', color: 'cyan' },
      { slug: 'omniserp', name: 'OmniSerp', color: 'pink' },
    ],
  },
  'wcag-accessibility-with-ai': {
    githubUrl: 'https://github.com/agentplexus/agentplexus-docs/tree/main/accessibility',
  },
  'otel-semantic-conventions-agentic-ai': {
    githubUrl: 'https://github.com/agentplexus/omniobserve/tree/main/semconv/agent',
    relatedProjects: [
      {
        slug: 'omniobserve-agentops',
        name: 'OmniObserve AgentOps',
        tagline: 'OpenTelemetry Semantic Conventions for Multi-Agent AI',
        presentationUrl: 'https://agentplexus.github.io/omniobserve/semconvagent.html',
      },
    ],
    relatedProducts: [
      { slug: 'omniobserve', name: 'OmniObserve', color: 'violet' },
    ],
  },
  'ai-assisted-sdk-development': {
    githubUrl: 'https://github.com/agentplexus/go-opik',
    projectUrl: '/projects/go-opik',
    relatedProjects: [
      {
        slug: 'go-opik',
        name: 'go-opik',
        tagline: 'Go SDK for LLM Observability - Built in 4-5 Hours',
        presentationUrl: 'https://agentplexus.github.io/go-opik/presentation.html',
      },
      {
        slug: 'go-elevenlabs',
        name: 'go-elevenlabs',
        tagline: 'Go SDK for AI Audio Generation - 19 Services',
        presentationUrl: 'https://agentplexus.github.io/go-elevenlabs/presentation.html',
      },
    ],
    relatedProducts: [
      { slug: 'omniobserve', name: 'OmniObserve', color: 'violet' },
      { slug: 'omnivoice', name: 'OmniVoice', color: 'violet' },
    ],
  },
  'building-stats-agent-team': {
    githubUrl: 'https://github.com/agentplexus/stats-agent-team',
    projectUrl: '/projects/stats-agent-team',
    relatedProjects: [
      {
        slug: 'stats-agent-team',
        name: 'Statistics Agent Team',
        tagline: 'Multi-Agent Statistics Verification System',
        presentationUrl: 'https://agentplexus.github.io/stats-agent-team/presentation.html',
      },
    ],
    relatedProducts: [
      { slug: 'omnillm', name: 'OmniLLM', color: 'cyan' },
      { slug: 'omniserp', name: 'OmniSerp', color: 'pink' },
      { slug: 'omniobserve', name: 'OmniObserve', color: 'violet' },
    ],
  },
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const { content, loading, error } = useMarkdownContent(slug ? `/blog/${slug}.md` : undefined)

  const meta = blogPosts.find((p) => p.slug === slug)
  const extra = slug ? postMeta[slug] : undefined

  if (!meta) {
    return (
      <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-plexus-cyan hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={16} />
          Back to Blog
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex flex-wrap gap-2 mb-4">
            {meta.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 rounded-full text-xs bg-plexus-purple/20 text-plexus-purple-light"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {meta.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-6">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(meta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {meta.readTime}
            </span>
            <span>{meta.author}</span>
          </div>

          <div className="flex flex-wrap gap-3">
            {extra?.githubUrl && (
              <a
                href={extra.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white text-sm"
              >
                <Github size={16} />
                View Code
              </a>
            )}
            {extra?.projectUrl && (
              <Link
                to={extra.projectUrl}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 transition-colors text-gray-300 text-sm"
              >
                View Project
              </Link>
            )}
          </div>
        </header>

        {/* Content */}
        {loading ? (
          <div className="text-gray-400 text-center py-12">Loading...</div>
        ) : error ? (
          <div className="text-red-400 text-center py-12">
            Failed to load article content.
          </div>
        ) : (
          <MarkdownRenderer
            content={content}
            className="prose prose-invert prose-lg max-w-none"
            theme={{
              linkColor: '#06b6d4',
              inlineCodeColor: '#06b6d4',
            }}
          />
        )}

        {/* Related Projects with Presentations */}
        {extra?.relatedProjects && extra.relatedProjects.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-6">Full Case Studies with Presentations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {extra.relatedProjects.map((project) => (
                <div
                  key={project.slug}
                  className="rounded-xl border border-white/10 bg-plexus-slate/30 overflow-hidden hover:border-plexus-purple/50 transition-colors"
                >
                  {/* Presentation Preview */}
                  <div className="relative aspect-video bg-plexus-dark">
                    <iframe
                      src={project.presentationUrl}
                      title={`${project.name} Presentation Preview`}
                      className="w-full h-full pointer-events-none"
                      style={{ transform: 'scale(1)', transformOrigin: 'top left' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-plexus-dark/90 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-white/80 text-sm">
                        <Play size={14} className="text-plexus-cyan" />
                        Presentation included
                      </div>
                    </div>
                  </div>
                  {/* Card Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{project.tagline}</p>
                    <div className="flex gap-3">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white text-sm font-medium hover:opacity-90 transition-opacity"
                      >
                        View Case Study
                      </Link>
                      <a
                        href={project.presentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                      >
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer CTA */}
        {extra?.relatedProducts && extra.relatedProducts.length > 0 && (
          <div className="mt-16 p-8 rounded-xl border border-white/10 bg-plexus-slate/30 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Want to build something similar?</h3>
            <p className="text-gray-400 mb-6">
              Check out the AgentPlexus modules related to this project.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {extra.relatedProducts.map((product) => (
                <Link
                  key={product.slug}
                  to={`/products/${product.slug}`}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    product.color === 'cyan'
                      ? 'bg-plexus-cyan/20 text-plexus-cyan hover:bg-plexus-cyan/30'
                      : product.color === 'pink'
                      ? 'bg-plexus-pink/20 text-plexus-pink hover:bg-plexus-pink/30'
                      : product.color === 'purple'
                      ? 'bg-plexus-purple/20 text-plexus-purple-light hover:bg-plexus-purple/30'
                      : 'bg-plexus-violet/20 text-plexus-violet hover:bg-plexus-violet/30'
                  }`}
                >
                  {product.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
