import { ProductCard } from './ProductCard'

const products = [
  {
    name: 'OmniLLM',
    slug: 'omnillm',
    tagline: 'Multi-Provider LLM Abstraction',
    description:
      'Unified interface for multiple LLM providers. Switch between OpenAI, Anthropic, Google, xAI, and Ollama without changing your code.',
    features: [
      'Single API for all major LLM providers',
      'Streaming and non-streaming support',
      'Built-in observability hooks',
      'Framework-agnostic design',
    ],
    color: 'cyan' as const,
    status: 'stable' as const,
    githubUrl: 'https://github.com/agentplexus/omnillm',
    integrations: ['openai', 'anthropic', 'gemini', 'xai', 'ollama'],
  },
  {
    name: 'OmniVault',
    slug: 'omnivault',
    tagline: 'Multi-Provider Secret Management',
    description:
      'Unified secret management across providers. Use environment variables, files, OS keyring, or AWS secret managers with the same API.',
    features: [
      'Environment, file, and keyring providers',
      'AWS Secrets Manager and Parameter Store',
      'URI-based secret resolution',
      'Extensible provider architecture',
    ],
    color: 'purple' as const,
    status: 'stable' as const,
    githubUrl: 'https://github.com/agentplexus/omnivault',
    integrations: ['aws', 'macos', 'windows', 'linux'],
  },
  {
    name: 'OmniSerp',
    slug: 'omniserp',
    tagline: 'Multi-Provider Search Abstraction',
    description:
      'Unified search API for multiple providers. Query Serper, SerpAPI, or other search backends with a consistent interface.',
    features: [
      'Web search across providers',
      'News, images, and video search',
      'Structured result parsing',
      'Rate limiting and caching',
    ],
    color: 'pink' as const,
    status: 'stable' as const,
    githubUrl: 'https://github.com/agentplexus/omniserp',
    integrations: ['serper', 'serpapi'],
  },
  {
    name: 'OmniObserve',
    slug: 'omniobserve',
    tagline: 'Multi-Provider LLM Observability',
    description:
      'Unified observability for LLM applications. Send traces to Opik, Langfuse, or Phoenix without vendor lock-in.',
    features: [
      'Automatic trace collection',
      'Token usage tracking',
      'Latency metrics',
      'Integration with OmniLLM',
    ],
    color: 'violet' as const,
    status: 'stable' as const,
    githubUrl: 'https://github.com/agentplexus/omniobserve',
    integrations: ['opik', 'langfuse', 'phoenix'],
  },
  {
    name: 'Posture',
    slug: 'posture',
    tagline: 'Cross-Platform Security Assessment',
    description:
      'Security posture assessment for macOS, Windows, and Linux. Check TPM, Secure Boot, disk encryption, and biometrics.',
    features: [
      'CLI, MCP Server, and Go module',
      'Security scoring (0-100)',
      'Actionable recommendations',
      'Claude Desktop integration',
    ],
    color: 'cyan' as const,
    status: 'stable' as const,
    githubUrl: 'https://github.com/agentplexus/posture',
    integrations: ['macos', 'windows', 'linux'],
  },
  {
    name: 'VaultGuard',
    slug: 'vaultguard',
    tagline: 'Security-Gated Credentials',
    description:
      'Combines Posture security checks with OmniVault secret management. Enforce security policies before credential access.',
    features: [
      'Environment-aware security policies',
      'Local and cloud deployment support',
      'AWS IRSA, GCP Workload Identity',
      'Automatic provider selection',
    ],
    color: 'purple' as const,
    status: 'stable' as const,
    githubUrl: 'https://github.com/agentplexus/vaultguard',
    integrations: ['macos', 'windows', 'linux'],
  },
  {
    name: 'AgentKit',
    slug: 'agentkit',
    tagline: 'Reusable Agent Components',
    description:
      'Building blocks for AI agents. Base agent patterns, LLM factory, Eino orchestration, and multi-runtime deployment.',
    features: [
      'Base agent with LLM integration',
      'AWS Bedrock AgentCore support',
      'Eino workflow orchestration',
      'Kubernetes + Helm deployment',
    ],
    color: 'pink' as const,
    status: 'stable' as const,
    githubUrl: 'https://github.com/agentplexus/agentkit',
    integrations: ['agentcore', 'kubernetes', 'helm', 'docker'],
  },
  {
    name: 'OmniVoice',
    slug: 'omnivoice',
    tagline: 'Multi-Provider Voice & Audio',
    description:
      'Unified API for speech-to-text and text-to-speech. Currently supports ElevenLabs and Twilio, with more providers coming soon.',
    features: [
      'ElevenLabs TTS integration',
      'Twilio voice & phone support',
      'Streaming audio processing',
      'More providers coming soon',
    ],
    color: 'violet' as const,
    status: 'beta' as const,
    githubUrl: 'https://github.com/agentplexus/omnivoice',
    integrations: ['elevenlabs', 'twilio'],
  },
]

export function Products() {
  return (
    <section id="products" className="py-24 px-4" role="region" aria-label="Products">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Products</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Independent Go modules designed for composability. Use what you need, leave what you don't.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.name} {...product} />
          ))}
        </div>
      </div>
    </section>
  )
}
