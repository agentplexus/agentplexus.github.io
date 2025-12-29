import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Github, Copy, Check, Terminal, ExternalLink } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '../lib/utils'

interface MCPServer {
  name: string
  binary: string
  repo: string
  repoUrl: string
  description: string
  tools: string[]
  color: 'cyan' | 'purple' | 'pink'
  productSlug?: string
}

const mcpServers: MCPServer[] = [
  {
    name: 'OmniSerp',
    binary: 'mcp-omniserp',
    repo: 'agentplexus/omniserp',
    repoUrl: 'https://github.com/agentplexus/omniserp',
    description: 'Web search capabilities for Claude. Search Google, get news, images, and more.',
    tools: ['search', 'news_search', 'image_search'],
    color: 'pink',
    productSlug: 'omniserp',
  },
  {
    name: 'Posture',
    binary: 'mcp-posture',
    repo: 'agentplexus/posture',
    repoUrl: 'https://github.com/agentplexus/posture',
    description: 'Security posture assessment. Check device security, encryption, TPM, and biometrics.',
    tools: ['check_security', 'get_summary', 'get_score'],
    color: 'cyan',
    productSlug: 'posture',
  },
  {
    name: 'Stats Agent',
    binary: 'mcp-stats-agent',
    repo: 'agentplexus/stats-agent-team',
    repoUrl: 'https://github.com/agentplexus/stats-agent-team',
    description: 'Research and verify statistics. Multi-agent team that finds, validates, and sources facts.',
    tools: ['research_stats', 'verify_claim'],
    color: 'purple',
  },
]

interface OtherServer {
  name: string
  binary: string
  repo: string
  repoUrl: string
  description: string
  tools: string[]
  blogSlug?: string
  presentationUrl?: string
}

const otherServers: OtherServer[] = [
  {
    name: 'Confluence',
    binary: 'mcp-confluence',
    repo: 'agentplexus/mcp-confluence',
    repoUrl: 'https://github.com/agentplexus/mcp-confluence',
    description: 'Read and write Confluence pages without corrupting tables. Structured blocks for creation, raw XHTML for lossless editing.',
    tools: ['read_page', 'create_page', 'update_page', 'search_pages'],
    blogSlug: 'mcp-confluence-table-corruption',
    presentationUrl: 'https://agentplexus.github.io/mcp-confluence/',
  },
]

const colorClasses = {
  cyan: 'text-plexus-cyan',
  purple: 'text-plexus-purple',
  pink: 'text-plexus-pink',
}

const colorBgClasses = {
  cyan: 'bg-plexus-cyan/10 border-plexus-cyan/20',
  purple: 'bg-plexus-purple/10 border-plexus-purple/20',
  pink: 'bg-plexus-pink/10 border-plexus-pink/20',
}

function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <button
        onClick={handleCopy}
        className={cn(
          'p-2 rounded-lg bg-white/10 hover:bg-white/20 focus-visible:bg-white/20 transition-colors text-gray-400 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple',
          className
        )}
        aria-label="Copy code to clipboard"
        aria-pressed={copied}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
      <span aria-live="polite" role="status" className="sr-only">
        {copied ? 'Code copied to clipboard' : ''}
      </span>
    </>
  )
}

function generateClaudeConfig(): string {
  const config = {
    mcpServers: Object.fromEntries(
      mcpServers.map((server) => [
        server.binary.replace('mcp-', ''),
        { command: server.binary },
      ])
    ),
  }
  return JSON.stringify(config, null, 2)
}

export function MCPPage() {
  const installAllCommand = mcpServers
    .map((s) => `go install github.com/${s.repo}/cmd/${s.binary}@latest`)
    .join('\n')

  const claudeConfig = generateClaudeConfig()

  return (
    <div className="min-h-screen bg-plexus-dark pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">MCP Servers</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Extend Claude Desktop with AgentPlexus capabilities via the{' '}
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-plexus-cyan hover:underline"
            >
              Model Context Protocol
            </a>
            .
          </p>
        </div>

        {/* Quick Start */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">Quick Start</h2>
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Install */}
            <div className="rounded-xl border border-white/10 bg-plexus-slate/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Terminal size={18} className="text-plexus-cyan" />
                  Install
                </h3>
                <CopyButton text={installAllCommand} />
              </div>
              <SyntaxHighlighter
                language="bash"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.8rem',
                }}
              >
                {installAllCommand}
              </SyntaxHighlighter>
              <p className="text-gray-500 text-sm mt-3">
                Requires Go 1.21+. Binaries install to <code className="text-plexus-cyan">~/go/bin/</code>
              </p>
            </div>

            {/* Configure */}
            <div className="rounded-xl border border-white/10 bg-plexus-slate/30 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">
                  Configure Claude Desktop
                </h3>
                <CopyButton text={claudeConfig} />
              </div>
              <p className="text-gray-400 text-sm mb-3">
                Add to <code className="text-plexus-cyan">~/Library/Application Support/Claude/claude_desktop_config.json</code>
              </p>
              <SyntaxHighlighter
                language="json"
                style={oneDark}
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.8rem',
                }}
              >
                {claudeConfig}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>

        {/* Servers */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Available Servers</h2>
          <div className="grid gap-6">
            {mcpServers.map((server) => (
              <div
                key={server.binary}
                className={cn(
                  'rounded-xl border p-6',
                  colorBgClasses[server.color]
                )}
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={cn('text-xl font-bold', colorClasses[server.color])}>
                        {server.name}
                      </h3>
                      <code className="text-sm text-gray-400 bg-black/20 px-2 py-0.5 rounded">
                        {server.binary}
                      </code>
                    </div>
                    <p className="text-gray-300 mb-4">{server.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {server.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {server.productSlug && (
                      <Link
                        to={`/products/${server.productSlug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 focus-visible:bg-white/5 transition-colors text-gray-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                        aria-label={`Learn more about ${server.name}`}
                      >
                        Learn more
                      </Link>
                    )}
                    <a
                      href={server.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 focus-visible:bg-white/20 transition-colors text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                      aria-label={`${server.name} on GitHub (opens in new tab)`}
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                  </div>
                </div>

                {/* Install command */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm text-gray-400 bg-black/20 px-3 py-2 rounded font-mono overflow-x-auto">
                      go install github.com/{server.repo}/cmd/{server.binary}@latest
                    </code>
                    <CopyButton
                      text={`go install github.com/${server.repo}/cmd/${server.binary}@latest`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Servers */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-2">Other Servers</h2>
          <p className="text-gray-400 mb-6">
            MCP servers published by AgentPlexus for specific integrations. Future releases will add{' '}
            <Link to="/products/vaultguard" className="text-plexus-purple hover:underline">
              VaultGuard
            </Link>{' '}
            security-gated credentials.
          </p>
          <div className="grid gap-6">
            {otherServers.map((server) => (
              <div
                key={server.binary}
                className="rounded-xl border border-white/10 bg-plexus-slate/30 p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-white">
                        {server.name}
                      </h3>
                      <code className="text-sm text-gray-400 bg-black/20 px-2 py-0.5 rounded">
                        {server.binary}
                      </code>
                    </div>
                    <p className="text-gray-300 mb-4">{server.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {server.tools.map((tool) => (
                        <span
                          key={tool}
                          className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 font-mono"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {server.blogSlug && (
                      <Link
                        to={`/blog/${server.blogSlug}`}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 focus-visible:bg-white/5 transition-colors text-gray-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                      >
                        Blog post
                      </Link>
                    )}
                    {server.presentationUrl && (
                      <a
                        href={server.presentationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 focus-visible:bg-white/5 transition-colors text-gray-300 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                      >
                        Presentation
                      </a>
                    )}
                    <a
                      href={server.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 focus-visible:bg-white/20 transition-colors text-white text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                      aria-label={`${server.name} on GitHub (opens in new tab)`}
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                  </div>
                </div>

                {/* Install command */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <code className="flex-1 text-sm text-gray-400 bg-black/20 px-3 py-2 rounded font-mono overflow-x-auto">
                      go install github.com/{server.repo}/cmd/{server.binary}@latest
                    </code>
                    <CopyButton
                      text={`go install github.com/${server.repo}/cmd/${server.binary}@latest`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What is MCP */}
        <div className="mt-16 rounded-xl border border-white/10 bg-plexus-slate/30 p-8">
          <h2 className="text-2xl font-bold text-white mb-4">What is MCP?</h2>
          <p className="text-gray-300 mb-4">
            The{' '}
            <a
              href="https://modelcontextprotocol.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-plexus-cyan hover:underline focus-visible:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
            >
              Model Context Protocol (MCP)
            </a>{' '}
            is an open standard that enables AI assistants like Claude to interact with external
            tools and data sources. MCP servers expose capabilities that Claude can discover and
            use during conversations.
          </p>
          <p className="text-gray-400">
            AgentPlexus MCP servers bring our Go modules to Claude Desktop, enabling web search,
            security checks, statistics verification, and more—all through natural conversation.
          </p>
          <div className="mt-6">
            <a
              href="https://modelcontextprotocol.io/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-plexus-purple hover:text-plexus-purple-light focus-visible:text-plexus-purple-light transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
              aria-label="Read the MCP documentation (opens in new tab)"
            >
              Read the MCP documentation <ExternalLink size={16} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
