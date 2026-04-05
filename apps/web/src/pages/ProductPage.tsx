import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github, CheckCircle, Lightbulb, BookOpen } from 'lucide-react'
import { PresentationEmbed } from '@plexusone/presentation-embed'
import { cn } from '../lib/utils'

type Category = 'library' | 'agent' | 'application' | 'specification'

interface Product {
  name: string
  slug: string
  category: Category
  tagline: string
  description: string
  color: 'cyan' | 'purple' | 'pink' | 'violet'
  githubUrl: string
  docsUrl?: string
  presentationUrl?: string
  features: string[]
  useCases: string[]
}

const CATEGORY_PATHS: Record<Category, string> = {
  library: '/libraries',
  agent: '/agents',
  application: '/applications',
  specification: '/specifications',
}

const CATEGORY_LABELS: Record<Category, string> = {
  library: 'Libraries',
  agent: 'Agents',
  application: 'Applications',
  specification: 'Specifications',
}

const products: Product[] = [
  // === LIBRARIES ===
  {
    name: 'OmniLLM',
    slug: 'omnillm',
    category: 'library',
    tagline: 'Multi-Provider LLM Abstraction',
    description:
      'Unified interface for multiple LLM providers. Switch between OpenAI, Anthropic, Google, xAI, and Ollama without changing your code.',
    color: 'cyan',
    githubUrl: 'https://github.com/plexusone/omnillm',
    docsUrl: 'https://plexusone.dev/omnillm/',
    presentationUrl: 'https://plexusone.dev/omnillm/presentation.html',
    features: [
      'Single API for OpenAI, Anthropic, Google Gemini, xAI Grok, and Ollama',
      'Streaming and non-streaming response support',
      'Built-in hooks for observability integration',
      'Tool/function calling with unified schema',
      'Automatic retry with exponential backoff',
      'Token counting and usage tracking',
    ],
    useCases: [
      'Build LLM apps that work with any provider without code changes',
      'A/B test different models by changing environment variables',
      'Fall back to alternative providers during outages',
      'Use local Ollama for development, cloud providers for production',
      'Add observability to all LLM calls with a single hook',
    ],
  },
  {
    name: 'OmniVault',
    slug: 'omnivault',
    category: 'library',
    tagline: 'Multi-Provider Secret Management',
    description:
      'Unified secret management across providers. Use environment variables, files, OS keyring, or AWS secret managers with the same API.',
    color: 'purple',
    githubUrl: 'https://github.com/plexusone/omnivault',
    docsUrl: 'https://plexusone.dev/omnivault/',
    presentationUrl: 'https://plexusone.dev/omnivault/presentation.html',
    features: [
      'Environment variables and .env file support',
      'File-based secret storage',
      'OS keyring integration (macOS Keychain, Windows Credential Manager, Linux Secret Service)',
      'AWS Secrets Manager and Parameter Store via omnivault-aws',
      'URI-based secret resolution (env://, file://, keyring://, aws-sm://)',
      'Extensible architecture for custom providers',
    ],
    useCases: [
      'Use env vars locally, AWS Secrets Manager in production',
      'Store sensitive API keys in OS keyring for development',
      'Reference secrets via URIs in configuration files',
      'Build apps that work in any deployment environment',
      'Chain multiple providers with automatic fallback',
    ],
  },
  {
    name: 'OmniSerp',
    slug: 'omniserp',
    category: 'library',
    tagline: 'Multi-Provider Search Abstraction',
    description:
      'Unified search API for multiple providers. Query Serper, SerpAPI, or other search backends with a consistent interface.',
    color: 'pink',
    githubUrl: 'https://github.com/plexusone/omniserp',
    docsUrl: 'https://plexusone.dev/omniserp/',
    presentationUrl: 'https://plexusone.dev/omniserp/presentation.html',
    features: [
      'Web search across Serper.dev and SerpAPI',
      'News, images, and video search support',
      'Structured result parsing with consistent schema',
      'Built-in rate limiting and request throttling',
      'Response caching for repeated queries',
      'Configurable result count and pagination',
    ],
    useCases: [
      'Build AI agents that search the web for information',
      'Create research tools that aggregate search results',
      'Switch search providers based on cost or availability',
      'Cache search results to reduce API costs',
      'Build RAG systems with web search augmentation',
    ],
  },
  {
    name: 'OmniObserve',
    slug: 'omniobserve',
    category: 'library',
    tagline: 'Multi-Provider LLM Observability',
    description:
      'Unified observability for LLM applications. Send traces to Opik (Comet), Langfuse, or Phoenix (Arize) without vendor lock-in.',
    color: 'violet',
    githubUrl: 'https://github.com/plexusone/omniobserve',
    docsUrl: 'https://plexusone.dev/omniobserve/',
    presentationUrl: 'https://plexusone.dev/omniobserve/presentation.html',
    features: [
      'Zero-config integration with OmniLLM via hooks',
      'Support for Opik (Comet), Langfuse, and Phoenix (Arize)',
      'Automatic trace and span creation',
      'Token usage and cost tracking',
      'Latency metrics and error recording',
      'AgentOps semantic conventions for multi-agent systems',
    ],
    useCases: [
      'Debug LLM applications with detailed traces',
      'Monitor token usage and costs across providers',
      'Identify slow or failing LLM calls',
      'Switch observability backends without code changes',
      'Track multi-agent workflows with AgentOps',
    ],
  },
  // === APPLICATIONS ===
  {
    name: 'Posture',
    slug: 'posture',
    category: 'application',
    tagline: 'Cross-Platform Security Assessment',
    description:
      'Security posture assessment for macOS, Windows, and Linux. Check TPM, Secure Boot, disk encryption, and biometrics.',
    color: 'cyan',
    githubUrl: 'https://github.com/plexusone/posture',
    presentationUrl: 'https://plexusone.dev/posture/index.html',
    features: [
      'Cross-platform support (macOS, Windows, Linux)',
      'TPM and Secure Boot detection',
      'Disk encryption status (FileVault, BitLocker, LUKS)',
      'Biometric authentication checks',
      'Security scoring (0-100) with recommendations',
      'CLI, MCP Server, and Go module interfaces',
    ],
    useCases: [
      'Verify device security before granting access to sensitive resources',
      'Build zero-trust systems that check device posture',
      'Create security dashboards showing fleet compliance',
      'Integrate with Claude Desktop via MCP for security queries',
      'Gate credential access based on device security level',
    ],
  },
  {
    name: 'VaultGuard',
    slug: 'vaultguard',
    category: 'application',
    tagline: 'Security-Gated Credentials',
    description:
      'Combines Posture security checks with OmniVault secret management. Enforce security policies before credential access.',
    color: 'purple',
    githubUrl: 'https://github.com/plexusone/vaultguard',
    docsUrl: 'https://plexusone.dev/vaultguard/',
    presentationUrl: 'https://plexusone.dev/vaultguard/presentation.html',
    features: [
      'Policy-based credential access control',
      'Integration with Posture security checks',
      'OmniVault backend for secret storage',
      'Environment-aware security policies',
      'Support for local and cloud deployments',
      'AWS IRSA and GCP Workload Identity support',
    ],
    useCases: [
      'Require disk encryption before accessing production credentials',
      'Block credential access from devices without biometrics',
      'Enforce different security levels for different environments',
      'Build zero-trust credential distribution systems',
      'Audit credential access with security context',
    ],
  },
  {
    name: 'AgentKit',
    slug: 'agentkit',
    category: 'library',
    tagline: 'Reusable Agent Components',
    description:
      'Building blocks for AI agents. Base agent patterns, LLM factory, Eino orchestration, and multi-runtime deployment to Kubernetes or AWS Bedrock AgentCore.',
    color: 'pink',
    githubUrl: 'https://github.com/plexusone/agentkit',
    presentationUrl: 'https://plexusone.dev/agentkit/presentation.html',
    docsUrl: 'https://plexusone.dev/agentkit/',
    features: [
      'Base agent struct with OmniLLM integration',
      'Multi-provider model factory (5 providers)',
      'Eino workflow patterns and type-safe orchestration',
      'HTTP and A2A protocol server factories',
      'AWS Bedrock AgentCore serverless deployment',
      'Kubernetes deployment with Helm charts',
    ],
    useCases: [
      'Deploy same code to Kubernetes or AWS AgentCore',
      'Build multi-agent systems with Eino orchestration',
      'Bootstrap agents with ~1,500 lines of boilerplate eliminated',
      'Create agents supporting HTTP and A2A protocols',
      'Run serverless agents with per-session Firecracker isolation',
    ],
  },
  {
    name: 'OmniVoice',
    slug: 'omnivoice',
    category: 'library',
    tagline: 'Multi-Provider Voice & Audio',
    description:
      'Unified API for speech-to-text and text-to-speech. Currently supports ElevenLabs and Twilio, with more providers coming soon.',
    color: 'violet',
    githubUrl: 'https://github.com/plexusone/omnivoice',
    docsUrl: 'https://plexusone.dev/omnivoice/',
    presentationUrl: 'https://plexusone.dev/omnivoice-core/presentation.html',
    features: [
      'ElevenLabs text-to-speech integration',
      'Twilio voice and phone call support',
      'Streaming audio processing',
      'Multiple voice and model options',
      'Unified interface across providers',
      'More providers coming soon (OpenAI Whisper, Google, Azure)',
    ],
    useCases: [
      'Build voice-enabled AI assistants',
      'Create phone-based AI agents with Twilio',
      'Generate natural-sounding speech from text',
      'Add voice capabilities to existing applications',
      'Switch TTS providers without code changes',
    ],
  },
  {
    name: 'AssistantKit',
    slug: 'assistantkit',
    category: 'library',
    tagline: 'Agent Plugin Generator',
    description:
      'CLI tool that transforms multi-agent-spec definitions into platform-specific plugins. Generate custom subagents for Claude Code and Kiro CLI from a single specification.',
    color: 'cyan',
    githubUrl: 'https://github.com/plexusone/assistantkit',
    presentationUrl: 'https://plexusone.dev/agentplexus-academy/agents-claude-code-kiro-cli/presentation.html',
    features: [
      'Generate Claude Code subagents from multi-agent-spec',
      'Generate Kiro CLI plugins from the same specification',
      'Support for agents, skills, and commands',
      'Automatic deployment configuration',
      'Version-controlled agent definitions',
      'Extensible plugin architecture',
    ],
    useCases: [
      'Create custom subagents for Claude Code from markdown files',
      'Build Kiro CLI plugins with reusable knowledge',
      'Share agent definitions across platforms',
      'Version control your AI agent configurations',
      'Deploy consistent agent behavior across tools',
    ],
  },
  // === AGENTS ===
  {
    name: 'OmniAgent',
    slug: 'omniagent',
    category: 'agent',
    tagline: 'Production AI Agent Framework',
    description:
      'Production-ready AI agent built on AgentKit. Supports tool use, multi-model providers, and deployment to Kubernetes or AWS Bedrock AgentCore. The reference implementation of the PlexusOne stack.',
    color: 'purple',
    githubUrl: 'https://github.com/plexusone/omniagent',
    docsUrl: 'https://plexusone.dev/omniagent/',
    features: [
      'Multi-provider LLM support via OmniLLM',
      'Tool calling and web search capabilities',
      'HTTP and A2A protocol support',
      'Kubernetes and AgentCore deployment',
      'Session management and conversation history',
      'Built-in observability with OmniObserve',
    ],
    useCases: [
      'Deploy production AI agents to Kubernetes',
      'Run serverless agents on AWS Bedrock AgentCore',
      'Build multi-tool agents with web search',
      'Create agents that work across LLM providers',
      'Monitor agent performance with full observability',
    ],
  },
  {
    name: 'Agent Team Stats',
    slug: 'agent-team-stats',
    category: 'agent',
    tagline: 'Statistics Research & Verification',
    description:
      'Multi-agent team that finds, validates, and sources statistics from reputable web sources using LLMs. Solves the problem of hallucinated statistics by verifying excerpts against original sources.',
    color: 'pink',
    githubUrl: 'https://github.com/plexusone/agent-team-stats',
    docsUrl: 'https://plexusone.dev/agent-team-stats/',
    presentationUrl: 'https://plexusone.dev/agent-team-stats/presentation.html',
    features: [
      '4-agent pipeline for research, synthesis, and verification',
      'Web search via OmniSerp integration',
      'Source verification against original pages',
      'Hallucination detection and flagging',
      'Type-safe orchestration with Cloudwego Eino',
      'Partial results handling with retry logic',
    ],
    useCases: [
      'Find verified statistics with real URLs and excerpts',
      'Research topics with fact-checked sources',
      'Build reports with accurate, cited statistics',
      'Avoid LLM hallucinations in research tasks',
      'Create data-driven content with verifiable claims',
    ],
  },
  {
    name: 'Agent Team Release',
    slug: 'agent-team-release',
    category: 'agent',
    tagline: 'Automated Release Management',
    description:
      'Multi-agent team for automating software releases. Handles version analysis, changelog generation, and release coordination using conventional commits.',
    color: 'cyan',
    githubUrl: 'https://github.com/plexusone/agent-team-release',
    docsUrl: 'https://plexusone.dev/agent-team-release/',
    features: [
      'Semantic version analysis from git history',
      'Automated changelog generation',
      'Release coordination and validation',
      'Git tag management',
      'Conventional commits support',
      'Multi-agent collaboration',
    ],
    useCases: [
      'Automate release version decisions',
      'Generate changelogs from commit history',
      'Coordinate multi-step release workflows',
      'Validate releases before publishing',
      'Manage git tags programmatically',
    ],
  },
  {
    name: 'PlexusOne App',
    slug: 'plexusone-app',
    category: 'application',
    tagline: 'macOS Desktop App',
    description:
      'Native macOS desktop application for PlexusOne. Unified interface for AI agents, LLM providers, and development tools with a local-first architecture.',
    color: 'purple',
    githubUrl: 'https://github.com/plexusone/plexusone-app',
    docsUrl: 'https://github.com/plexusone/plexusone-app',
    features: [
      'Native macOS experience',
      'Agent management interface',
      'LLM provider switching',
      'Local-first architecture',
      'Integration with PlexusOne libraries',
      'Secure credential management',
    ],
    useCases: [
      'Manage AI agents from your desktop',
      'Switch between LLM providers easily',
      'Run agents locally with full control',
      'Develop and test agent configurations',
      'Access PlexusOne tools in one place',
    ],
  },
  {
    name: 'W3Pilot',
    slug: 'w3pilot',
    category: 'application',
    tagline: 'Web Automation Framework',
    description:
      'AI-powered web automation and testing framework with browser control capabilities. Automate web interactions with intelligent navigation.',
    color: 'cyan',
    githubUrl: 'https://github.com/plexusone/w3pilot',
    docsUrl: 'https://plexusone.dev/w3pilot/',
    features: [
      'Browser automation with Playwright/ChromeDP',
      'AI-assisted navigation',
      'Screenshot capture and analysis',
      'Element interaction',
      'Form filling automation',
      'Multi-page workflows',
    ],
    useCases: [
      'Automate web testing with AI assistance',
      'Build web scrapers with intelligent navigation',
      'Create automated form submissions',
      'Monitor websites for changes',
      'Build browser-based agents',
    ],
  },
  // === SPECIFICATIONS ===
  {
    name: 'Multi-Agent Spec',
    slug: 'multi-agent-spec',
    category: 'specification',
    tagline: 'Platform-Agnostic Agent Definitions',
    description:
      'A specification format for defining AI agents, skills, and commands using Markdown with YAML frontmatter. Write once, deploy to Claude Code, Kiro CLI, and other platforms via AssistantKit.',
    color: 'violet',
    githubUrl: 'https://github.com/plexusone/multi-agent-spec',
    docsUrl: 'https://plexusone.dev/multi-agent-spec/',
    features: [
      'YAML frontmatter for agent configuration',
      'Markdown body for system prompts',
      'Platform-agnostic format',
      'Support for agents, skills, and commands',
      'Tool restrictions and permission modes',
      'Lifecycle hooks for pre/post execution',
    ],
    useCases: [
      'Define agents that work across platforms',
      'Version control agent configurations',
      'Share agent definitions with teams',
      'Generate plugins for Claude Code and Kiro',
      'Build reusable skill libraries',
    ],
  },
  {
    name: 'AX Spec',
    slug: 'ax-spec',
    category: 'specification',
    tagline: 'Agent Experience Specification',
    description:
      'Agent Experience (AX) specification for building user-friendly AI agents. Defines interaction patterns, feedback mechanisms, and usability guidelines for AI agent interfaces.',
    color: 'cyan',
    githubUrl: 'https://github.com/plexusone/ax-spec',
    docsUrl: 'https://plexusone.dev/ax-spec/',
    features: [
      'Interaction pattern guidelines',
      'Feedback mechanism standards',
      'Usability principles for agents',
      'Accessibility considerations',
      'Error handling patterns',
      'Progress indication standards',
    ],
    useCases: [
      'Design user-friendly AI agent interfaces',
      'Ensure consistent agent experiences',
      'Build accessible AI interactions',
      'Create intuitive feedback loops',
      'Standardize agent communication patterns',
    ],
  },
  {
    name: 'Design System Spec',
    slug: 'design-system-spec',
    category: 'specification',
    tagline: 'UI/UX Design System',
    description:
      'PlexusOne design system specification with tokens, components, and patterns. Defines the visual language and component library for PlexusOne products.',
    color: 'purple',
    githubUrl: 'https://github.com/plexusone/design-system-spec',
    docsUrl: 'https://plexusone.dev/design-system-spec/',
    features: [
      'Design tokens (colors, spacing, typography)',
      'Component specifications',
      'Accessibility guidelines',
      'Theme generation utilities',
      'Dark mode support',
      'Responsive patterns',
    ],
    useCases: [
      'Build consistent PlexusOne interfaces',
      'Generate theme files for different frameworks',
      'Ensure accessibility compliance',
      'Create cohesive visual experiences',
      'Maintain design consistency across products',
    ],
  },
]

const colorClasses = {
  cyan: 'text-plexus-cyan',
  purple: 'text-plexus-purple',
  pink: 'text-plexus-pink',
  violet: 'text-plexus-violet',
}

const colorBgClasses = {
  cyan: 'bg-plexus-cyan/10 border-plexus-cyan/20',
  purple: 'bg-plexus-purple/10 border-plexus-purple/20',
  pink: 'bg-plexus-pink/10 border-plexus-pink/20',
  violet: 'bg-plexus-violet/10 border-plexus-violet/20',
}

const colorBulletClasses = {
  cyan: 'bg-plexus-cyan',
  purple: 'bg-plexus-purple',
  pink: 'bg-plexus-pink',
  violet: 'bg-plexus-violet',
}

export function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const product = products.find((p) => p.slug === slug)

  // Determine back link based on product category
  const getBackLink = () => {
    if (!product) return { path: '/', label: 'Home' }
    const categoryPath = CATEGORY_PATHS[product.category]
    const categoryLabel = CATEGORY_LABELS[product.category]
    return { path: categoryPath, label: `Back to ${categoryLabel}` }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-plexus-dark pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Product Not Found</h1>
          <Link to="/" className="text-plexus-cyan hover:underline">
            Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const backLink = getBackLink()

  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          to={backLink.path}
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          {backLink.label}
        </Link>

        {/* Product header */}
        <div className="mb-10">
          <h1 className={cn('text-4xl md:text-5xl font-bold mb-3', colorClasses[product.color])}>
            {product.name}
          </h1>
          <p className="text-xl text-gray-400 mb-4">{product.tagline}</p>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">{product.description}</p>

          <div className="flex flex-wrap gap-4">
            <a
              href={product.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Github size={18} />
              View on GitHub
            </a>
            {product.docsUrl && (
              <a
                href={product.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-medium hover:opacity-90 transition-opacity"
              >
                <BookOpen size={18} />
                Documentation
              </a>
            )}
          </div>
        </div>

        {/* Features & Use Cases */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {/* Features */}
          <div className={cn('rounded-xl border p-6', colorBgClasses[product.color])}>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle size={20} className={colorClasses[product.color]} />
              <h2 className="text-xl font-bold text-white">Features</h2>
            </div>
            <ul className="space-y-3">
              {product.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className={cn('mt-1.5 w-1.5 h-1.5 rounded-full shrink-0', colorBulletClasses[product.color])} />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Use Cases */}
          <div className="rounded-xl border border-white/10 bg-plexus-slate/30 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb size={20} className="text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Use Cases</h2>
            </div>
            <ul className="space-y-3">
              {product.useCases.map((useCase, idx) => (
                <li key={idx} className="flex items-start gap-3 text-gray-300">
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                  {useCase}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section label for presentation */}
        {product.presentationUrl && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Presentation</h2>
            <a
              href={product.presentationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 transition-colors text-gray-300 text-sm"
            >
              <ExternalLink size={16} />
              Open in New Tab
            </a>
          </div>
        )}

        {/* Embedded presentation */}
        {product.presentationUrl ? (
          <PresentationEmbed
            src={product.presentationUrl}
            title={`${product.name} Presentation`}
            height="auto"
            minHeight={500}
            border="1px solid rgba(255, 255, 255, 0.1)"
          />
        ) : (
          <div className="rounded-xl border border-white/10 bg-plexus-slate/30 p-12 text-center">
            <p className="text-gray-400 text-lg">
              Presentation coming soon.
            </p>
            <p className="text-gray-500 mt-2">
              Check out the{' '}
              <a
                href={product.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-plexus-cyan hover:underline"
              >
                GitHub repository
              </a>{' '}
              for documentation.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
