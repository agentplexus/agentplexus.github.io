import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github, CheckCircle, Lightbulb, BookOpen } from 'lucide-react'
import { PresentationEmbed } from '@agentplexus/presentation-embed'
import { cn } from '../lib/utils'

interface Product {
  name: string
  slug: string
  tagline: string
  description: string
  color: 'cyan' | 'purple' | 'pink' | 'violet'
  githubUrl: string
  docsUrl?: string
  presentationUrl?: string
  features: string[]
  useCases: string[]
}

const products: Product[] = [
  {
    name: 'OmniLLM',
    slug: 'omnillm',
    tagline: 'Multi-Provider LLM Abstraction',
    description:
      'Unified interface for multiple LLM providers. Switch between OpenAI, Anthropic, Google, xAI, and Ollama without changing your code.',
    color: 'cyan',
    githubUrl: 'https://github.com/agentplexus/omnillm',
    presentationUrl: 'https://agentplexus.github.io/omnillm/',
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
    tagline: 'Multi-Provider Secret Management',
    description:
      'Unified secret management across providers. Use environment variables, files, OS keyring, or AWS secret managers with the same API.',
    color: 'purple',
    githubUrl: 'https://github.com/agentplexus/omnivault',
    presentationUrl: 'https://agentplexus.github.io/omnivault/',
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
    tagline: 'Multi-Provider Search Abstraction',
    description:
      'Unified search API for multiple providers. Query Serper, SerpAPI, or other search backends with a consistent interface.',
    color: 'pink',
    githubUrl: 'https://github.com/agentplexus/omniserp',
    presentationUrl: 'https://agentplexus.github.io/omniserp/',
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
    tagline: 'Multi-Provider LLM Observability',
    description:
      'Unified observability for LLM applications. Send traces to Opik (Comet), Langfuse, or Phoenix (Arize) without vendor lock-in.',
    color: 'violet',
    githubUrl: 'https://github.com/agentplexus/omniobserve',
    presentationUrl: 'https://agentplexus.github.io/omniobserve/',
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
  {
    name: 'Posture',
    slug: 'posture',
    tagline: 'Cross-Platform Security Assessment',
    description:
      'Security posture assessment for macOS, Windows, and Linux. Check TPM, Secure Boot, disk encryption, and biometrics.',
    color: 'cyan',
    githubUrl: 'https://github.com/agentplexus/posture',
    presentationUrl: 'https://agentplexus.github.io/posture/',
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
    tagline: 'Security-Gated Credentials',
    description:
      'Combines Posture security checks with OmniVault secret management. Enforce security policies before credential access.',
    color: 'purple',
    githubUrl: 'https://github.com/agentplexus/vaultguard',
    docsUrl: 'https://agentplexus.github.io/vaultguard/',
    presentationUrl: 'https://agentplexus.github.io/vaultguard/presentation.html',
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
    tagline: 'Reusable Agent Components',
    description:
      'Building blocks for AI agents. Base agent patterns, LLM factory, Eino orchestration, and multi-runtime deployment to Kubernetes or AWS Bedrock AgentCore.',
    color: 'pink',
    githubUrl: 'https://github.com/agentplexus/agentkit',
    presentationUrl: 'https://agentplexus.github.io/agentkit/presentation.html',
    docsUrl: 'https://agentplexus.github.io/agentkit/',
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
    tagline: 'Multi-Provider Voice & Audio',
    description:
      'Unified API for speech-to-text and text-to-speech. Currently supports ElevenLabs and Twilio, with more providers coming soon.',
    color: 'violet',
    githubUrl: 'https://github.com/agentplexus/omnivoice',
    presentationUrl: 'https://agentplexus.github.io/omnivoice/',
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

  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back link */}
        <Link
          to="/#products"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Products
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
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 transition-colors text-gray-300"
              >
                <BookOpen size={18} />
                Documentation
              </a>
            )}
            {product.presentationUrl && (
              <a
                href={product.presentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 transition-colors text-gray-300"
              >
                <ExternalLink size={18} />
                Open in New Tab
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
          <div className="mb-4">
            <h2 className="text-xl font-bold text-white">Presentation</h2>
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
