import { Link } from 'react-router-dom'
import { ArrowRight, Github, BookOpen } from 'lucide-react'
import { cn } from '../lib/utils'

interface Agent {
  name: string
  slug: string
  tagline: string
  description: string
  color: 'cyan' | 'purple' | 'pink' | 'violet'
  githubUrl: string
  docsUrl?: string
}

const agents: Agent[] = [
  {
    name: 'OmniAgent',
    slug: 'omniagent',
    tagline: 'Production AI Agent Framework',
    description:
      'Production-ready AI agent built on AgentKit. Supports tool use, multi-model providers, and deployment to Kubernetes or AWS Bedrock AgentCore.',
    color: 'purple',
    githubUrl: 'https://github.com/plexusone/omniagent',
    docsUrl: 'https://plexusone.dev/omniagent/',
  },
  {
    name: 'Agent Team Stats',
    slug: 'agent-team-stats',
    tagline: 'Statistics Research & Verification',
    description:
      'Multi-agent team that finds, validates, and sources statistics from reputable web sources using LLMs. Solves the problem of hallucinated statistics by verifying excerpts against original sources.',
    color: 'pink',
    githubUrl: 'https://github.com/plexusone/agent-team-stats',
    docsUrl: 'https://plexusone.dev/agent-team-stats/',
  },
  {
    name: 'Agent Team Release',
    slug: 'agent-team-release',
    tagline: 'Automated Release Management',
    description:
      'Multi-agent team for automating software releases. Handles version analysis, changelog generation, and release coordination using conventional commits.',
    color: 'cyan',
    githubUrl: 'https://github.com/plexusone/agent-team-release',
    docsUrl: 'https://plexusone.dev/agent-team-release/',
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

export function AgentsPage() {
  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Agents</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Production-ready AI agents and multi-agent teams built on the PlexusOne stack. Deploy to Kubernetes or AWS Bedrock AgentCore.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent) => (
            <div
              key={agent.slug}
              className={cn(
                'rounded-xl border bg-plexus-slate/30 p-6 transition-colors',
                colorBorderClasses[agent.color]
              )}
            >
              <h2 className={cn('text-2xl font-bold mb-1', colorClasses[agent.color])}>
                {agent.name}
              </h2>
              <p className="text-gray-400 text-sm mb-3">{agent.tagline}</p>
              <p className="text-gray-300 mb-5 line-clamp-3">{agent.description}</p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/agents/${agent.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Learn More
                  <ArrowRight size={16} />
                </Link>
                <a
                  href={agent.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                >
                  <Github size={16} />
                  GitHub
                </a>
                {agent.docsUrl && (
                  <a
                    href={agent.docsUrl}
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
            Build your own agents with AgentKit
          </p>
          <Link
            to="/libraries/agentkit"
            className="inline-flex items-center gap-2 text-plexus-cyan hover:text-plexus-purple transition-colors"
          >
            Learn about AgentKit
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
