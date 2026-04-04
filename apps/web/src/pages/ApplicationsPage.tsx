import { ExternalLink, Github, Bot, Workflow, Server, Zap, BookOpen } from 'lucide-react'

interface Application {
  name: string
  slug: string
  tagline: string
  description: string
  githubUrl: string
  docsUrl?: string
  presentationUrl?: string
  highlights: {
    icon: typeof Bot
    title: string
    description: string
  }[]
  features: string[]
}

const applications: Application[] = [
  {
    name: 'OmniAgent',
    slug: 'omniagent',
    tagline: 'Multi-Runtime AI Agent',
    description:
      'Production-ready AI agent built on AgentKit. Supports tool use, multi-model providers, and deployment to Kubernetes or AWS Bedrock AgentCore. The reference implementation of the PlexusOne stack.',
    githubUrl: 'https://github.com/plexusone/omniagent',
    docsUrl: 'https://plexusone.github.io/omniagent/',
    highlights: [
      {
        icon: Bot,
        title: 'Multi-Provider',
        description: 'OpenAI, Anthropic, Google Gemini, xAI Grok, Ollama via OmniLLM',
      },
      {
        icon: Workflow,
        title: 'Tool Use',
        description: 'Web search, code execution, file operations, and custom tools',
      },
      {
        icon: Server,
        title: 'Multi-Runtime',
        description: 'Deploy to Kubernetes or AWS Bedrock AgentCore',
      },
      {
        icon: Zap,
        title: 'Observable',
        description: 'Built-in tracing with OmniObserve integration',
      },
    ],
    features: [
      'HTTP and A2A protocol support',
      'Streaming responses with tool call handling',
      'Session management and conversation history',
      'Environment-based configuration',
      'Docker and Helm deployment artifacts',
      'AWS Bedrock AgentCore serverless deployment',
      'Built-in observability hooks',
      'Extensible tool registry',
    ],
  },
]

export function ApplicationsPage() {
  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Applications</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Production-ready AI applications built on the PlexusOne stack.
          </p>
        </div>

        <div className="grid gap-8">
          {applications.map((app) => (
            <div
              key={app.slug}
              className="rounded-xl border border-white/10 bg-plexus-slate/30 p-8"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-white mb-2">{app.name}</h2>
                  <p className="text-xl text-plexus-purple mb-4">{app.tagline}</p>
                  <p className="text-gray-400 mb-6">{app.description}</p>

                  <div className="flex flex-wrap gap-4 mb-8">
                    <a
                      href={app.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-medium hover:opacity-90 transition-opacity"
                    >
                      <Github size={18} />
                      View on GitHub
                    </a>
                    {app.docsUrl && (
                      <a
                        href={app.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5 transition-colors"
                      >
                        <BookOpen size={18} />
                        Documentation
                      </a>
                    )}
                    {app.presentationUrl && (
                      <a
                        href={app.presentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 text-gray-300 hover:bg-white/5 transition-colors"
                      >
                        <ExternalLink size={18} />
                        Presentation
                      </a>
                    )}
                  </div>

                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {app.highlights.map((highlight) => (
                      <div
                        key={highlight.title}
                        className="rounded-lg border border-white/10 bg-plexus-dark/50 p-4"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <highlight.icon size={18} className="text-plexus-cyan" />
                          <h4 className="font-semibold text-white">{highlight.title}</h4>
                        </div>
                        <p className="text-sm text-gray-400">{highlight.description}</p>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
                  <ul className="grid sm:grid-cols-2 gap-2">
                    {app.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-gray-400">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-plexus-purple shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:w-80 shrink-0">
                  <div className="rounded-lg border border-white/10 bg-plexus-dark/50 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Quick Start</h3>
                    <pre className="text-sm text-gray-400 overflow-x-auto whitespace-pre-wrap">
{`# Clone and run
git clone https://github.com/\\
  plexusone/omniagent
cd omniagent

# Configure
cp .env.example .env
# Edit .env with API keys

# Run locally
go run ./cmd/omniagent

# Or with Docker
docker-compose up`}
                    </pre>
                  </div>

                  <div className="mt-4 rounded-lg border border-white/10 bg-plexus-dark/50 p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">Built With</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-plexus-cyan" />
                        OmniLLM - Multi-provider LLM
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-plexus-purple" />
                        OmniVault - Secret management
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-plexus-pink" />
                        OmniObserve - Observability
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-plexus-violet" />
                        AgentKit - Agent framework
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
