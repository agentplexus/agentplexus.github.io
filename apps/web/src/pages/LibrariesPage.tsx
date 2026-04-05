import { Link } from 'react-router-dom'
import { ArrowRight, Github, BookOpen } from 'lucide-react'
import { cn } from '../lib/utils'

interface Library {
  name: string
  slug: string
  tagline: string
  description: string
  color: 'cyan' | 'purple' | 'pink' | 'violet'
  githubUrl: string
  docsUrl?: string
}

const libraries: Library[] = [
  {
    name: 'OmniLLM',
    slug: 'omnillm',
    tagline: 'Multi-Provider LLM Abstraction',
    description:
      'Unified interface for multiple LLM providers. Switch between OpenAI, Anthropic, Google, xAI, and Ollama without changing your code.',
    color: 'cyan',
    githubUrl: 'https://github.com/plexusone/omnillm',
    docsUrl: 'https://plexusone.dev/omnillm/',
  },
  {
    name: 'OmniVault',
    slug: 'omnivault',
    tagline: 'Multi-Provider Secret Management',
    description:
      'Unified secret management across providers. Use environment variables, files, OS keyring, or AWS secret managers with the same API.',
    color: 'purple',
    githubUrl: 'https://github.com/plexusone/omnivault',
    docsUrl: 'https://plexusone.dev/omnivault/',
  },
  {
    name: 'OmniSerp',
    slug: 'omniserp',
    tagline: 'Multi-Provider Search Abstraction',
    description:
      'Unified search API for multiple providers. Query Serper, SerpAPI, or other search backends with a consistent interface.',
    color: 'pink',
    githubUrl: 'https://github.com/plexusone/omniserp',
    docsUrl: 'https://plexusone.dev/omniserp/',
  },
  {
    name: 'OmniObserve',
    slug: 'omniobserve',
    tagline: 'Multi-Provider LLM Observability',
    description:
      'Unified observability for LLM applications. Send traces to Opik (Comet), Langfuse, or Phoenix (Arize) without vendor lock-in.',
    color: 'violet',
    githubUrl: 'https://github.com/plexusone/omniobserve',
    docsUrl: 'https://plexusone.dev/omniobserve/',
  },
  {
    name: 'AgentKit',
    slug: 'agentkit',
    tagline: 'Reusable Agent Components',
    description:
      'Building blocks for AI agents. Base agent patterns, LLM factory, Eino orchestration, and multi-runtime deployment to Kubernetes or AWS Bedrock AgentCore.',
    color: 'pink',
    githubUrl: 'https://github.com/plexusone/agentkit',
    docsUrl: 'https://plexusone.dev/agentkit/',
  },
  {
    name: 'OmniVoice',
    slug: 'omnivoice',
    tagline: 'Multi-Provider Voice & Audio',
    description:
      'Unified API for speech-to-text and text-to-speech. Currently supports ElevenLabs and Twilio, with more providers coming soon.',
    color: 'violet',
    githubUrl: 'https://github.com/plexusone/omnivoice',
  },
  {
    name: 'AssistantKit',
    slug: 'assistantkit',
    tagline: 'Agent Plugin Generator',
    description:
      'CLI tool that transforms multi-agent-spec definitions into platform-specific plugins. Generate custom subagents for Claude Code and Kiro CLI from a single specification.',
    color: 'cyan',
    githubUrl: 'https://github.com/plexusone/assistantkit',
  },
]

const colorClasses = {
  cyan: 'text-plexus-cyan',
  purple: 'text-plexus-purple',
  pink: 'text-plexus-pink',
  violet: 'text-plexus-violet',
}

const colorBorderClasses = {
  cyan: 'border-plexus-cyan/30 hover:border-plexus-cyan/50',
  purple: 'border-plexus-purple/30 hover:border-plexus-purple/50',
  pink: 'border-plexus-pink/30 hover:border-plexus-pink/50',
  violet: 'border-plexus-violet/30 hover:border-plexus-violet/50',
}

export function LibrariesPage() {
  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Libraries</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Composable Go modules for building AI agent applications. Each library follows the "omni" pattern for multi-provider abstraction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {libraries.map((library) => (
            <div
              key={library.slug}
              className={cn(
                'rounded-xl border bg-plexus-slate/30 p-6 transition-colors',
                colorBorderClasses[library.color]
              )}
            >
              <h2 className={cn('text-2xl font-bold mb-1', colorClasses[library.color])}>
                {library.name}
              </h2>
              <p className="text-gray-400 text-sm mb-3">{library.tagline}</p>
              <p className="text-gray-300 mb-5 line-clamp-2">{library.description}</p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/libraries/${library.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Learn More
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={library.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                >
                  <Github size={16} />
                  GitHub
                </a>
                {library.docsUrl && (
                  <a
                    href={library.docsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                  >
                    <BookOpen size={16} />
                    Docs
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            All libraries are open source and available on GitHub
          </p>
          <a
            href="https://github.com/plexusone"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-plexus-cyan hover:text-plexus-purple transition-colors"
          >
            View all repositories
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
