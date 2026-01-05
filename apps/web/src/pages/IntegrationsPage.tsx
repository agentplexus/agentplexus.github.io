import { ExternalLink } from 'lucide-react'

interface Integration {
  name: string
  logo: string
  description: string
  url?: string
}

interface Category {
  title: string
  description: string
  module: string
  moduleUrl: string
  integrations: Integration[]
}

const categories: Category[] = [
  {
    title: 'LLM Providers',
    description: 'Multi-provider language model abstraction',
    module: 'OmniLLM',
    moduleUrl: 'https://github.com/agentplexus/omnillm',
    integrations: [
      {
        name: 'OpenAI',
        logo: '/integrations/openai.svg',
        description: 'GPT and other OpenAI models',
        url: 'https://openai.com',
      },
      {
        name: 'Anthropic',
        logo: '/integrations/anthropic.svg',
        description: 'Claude Opus, Sonnet, and Haiku models',
        url: 'https://anthropic.com',
      },
      {
        name: 'Google Gemini',
        logo: '/integrations/gemini.svg',
        description: 'Gemini models from Google',
        url: 'https://deepmind.google/technologies/gemini/',
      },
      {
        name: 'xAI',
        logo: '/integrations/xai.svg',
        description: 'Grok models from xAI',
        url: 'https://x.ai',
      },
      {
        name: 'Ollama',
        logo: '/integrations/ollama.svg',
        description: 'Local models via Ollama (Llama, Mistral, etc.)',
        url: 'https://ollama.ai',
      },
    ],
  },
  {
    title: 'Observability',
    description: 'LLM tracing and monitoring platforms',
    module: 'OmniObserve',
    moduleUrl: 'https://github.com/agentplexus/omniobserve',
    integrations: [
      {
        name: 'Opik',
        logo: '/integrations/opik.svg',
        description: 'Open-source LLM evaluation and tracing from Comet',
        url: 'https://comet.com/site/products/opik/',
      },
      {
        name: 'Phoenix',
        logo: '/integrations/phoenix.svg',
        description: 'Open-source observability for LLM applications from Arize',
        url: 'https://phoenix.arize.com',
      },
      {
        name: 'Langfuse',
        logo: '/integrations/langfuse.svg',
        description: 'Open-source LLM engineering platform',
        url: 'https://langfuse.com',
      },
    ],
  },
  {
    title: 'Search',
    description: 'Web search APIs for retrieval and research',
    module: 'OmniSerp',
    moduleUrl: 'https://github.com/agentplexus/omniserp',
    integrations: [
      {
        name: 'Serper',
        logo: '/integrations/serper.svg',
        description: 'Google Search API for developers',
        url: 'https://serper.dev',
      },
      {
        name: 'SerpApi',
        logo: '/integrations/serpapi.svg',
        description: 'Search engine results API',
        url: 'https://serpapi.com',
      },
    ],
  },
  {
    title: 'Voice & Audio',
    description: 'Speech-to-text and text-to-speech providers',
    module: 'OmniVoice',
    moduleUrl: 'https://github.com/agentplexus/omnivoice',
    integrations: [
      {
        name: 'Twilio',
        logo: '/integrations/twilio.svg',
        description: 'Voice, SMS, and communication APIs',
        url: 'https://twilio.com',
      },
      {
        name: 'ElevenLabs',
        logo: '/integrations/elevenlabs.svg',
        description: 'AI voice synthesis and cloning',
        url: 'https://elevenlabs.io',
      },
    ],
  },
  {
    title: 'Infrastructure',
    description: 'Deployment and orchestration platforms',
    module: 'AgentKit',
    moduleUrl: 'https://github.com/agentplexus/agentkit',
    integrations: [
      {
        name: 'AWS Bedrock AgentCore',
        logo: '/integrations/agentcore.svg',
        description: 'Serverless AI agent runtime with Firecracker isolation',
        url: 'https://aws.amazon.com/bedrock/agents/',
      },
      {
        name: 'Docker',
        logo: '/integrations/docker.svg',
        description: 'Container runtime and packaging',
        url: 'https://docker.com',
      },
      {
        name: 'Kubernetes',
        logo: '/integrations/kubernetes.svg',
        description: 'Container orchestration platform',
        url: 'https://kubernetes.io',
      },
      {
        name: 'Helm',
        logo: '/integrations/helm.svg',
        description: 'Kubernetes package manager',
        url: 'https://helm.sh',
      },
      {
        name: 'AWS CDK',
        logo: '/integrations/aws-cdk.svg',
        description: 'Infrastructure as code for AWS deployments',
        url: 'https://aws.amazon.com/cdk/',
      },
      {
        name: 'Pulumi',
        logo: '/integrations/pulumi.svg',
        description: 'Infrastructure as code for AWS deployments',
        url: 'https://pulumi.com',
      },
    ],
  },
  {
    title: 'Secret Management',
    description: 'Cloud and local secret storage providers',
    module: 'OmniVault',
    moduleUrl: 'https://github.com/agentplexus/omnivault',
    integrations: [
      {
        name: 'AWS',
        logo: '/integrations/aws.svg',
        description: 'AWS Secrets Manager and Parameter Store',
        url: 'https://aws.amazon.com/secrets-manager/',
      },
      {
        name: 'macOS Keychain',
        logo: '/integrations/macos.svg',
        description: 'macOS Keychain via omnivault-keyring',
        url: 'https://support.apple.com/guide/keychain-access',
      },
      {
        name: 'Windows Credentials',
        logo: '/integrations/windows.svg',
        description: 'Windows Credential Manager via omnivault-keyring',
        url: 'https://support.microsoft.com/en-us/windows/credential-manager',
      },
      {
        name: 'Linux Secret Service',
        logo: '/integrations/linux.svg',
        description: 'Linux Secret Service API via omnivault-keyring',
        url: 'https://specifications.freedesktop.org/secret-service/',
      },
    ],
  },
  {
    title: 'Security Posture',
    description: 'Endpoint security analysis and compliance',
    module: 'VaultGuard',
    moduleUrl: 'https://github.com/agentplexus/vaultguard',
    integrations: [
      {
        name: 'macOS',
        logo: '/integrations/macos.svg',
        description: 'Security posture analysis for macOS systems',
        url: 'https://apple.com/macos',
      },
      {
        name: 'Windows',
        logo: '/integrations/windows.svg',
        description: 'Security posture analysis for Windows endpoints',
        url: 'https://microsoft.com/windows',
      },
      {
        name: 'Linux',
        logo: '/integrations/linux.svg',
        description: 'Security posture analysis for Linux servers',
        url: 'https://kernel.org',
      },
    ],
  },
]

export function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-plexus-dark pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Integrations</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            AgentPlexus modules integrate with the tools and platforms you already use.
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category) => (
            <div key={category.title}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-2">
                <div>
                  <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                  <p className="text-gray-300">{category.description}</p>
                </div>
                <a
                  href={category.moduleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-plexus-purple hover:text-plexus-purple-light focus-visible:text-plexus-purple-light transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                  aria-label={`${category.module} on GitHub (opens in new tab)`}
                >
                  via {category.module} <ExternalLink size={14} />
                </a>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.integrations.map((integration) => (
                  <a
                    key={integration.name}
                    href={integration.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 rounded-xl bg-plexus-slate/30 border border-white/5 hover:border-white/10 hover:bg-plexus-slate/50 focus-visible:border-plexus-purple/50 focus-visible:bg-plexus-slate/50 transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                    aria-label={`${integration.name} (opens in new tab)`}
                  >
                    <div className="w-12 h-12 rounded-lg bg-white/5 p-2 flex-shrink-0">
                      <img
                        src={integration.logo}
                        alt={integration.name}
                        className="w-full h-full object-contain filter brightness-0 invert opacity-75 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white truncate">{integration.name}</h3>
                      <p className="text-sm text-gray-300 truncate">{integration.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
