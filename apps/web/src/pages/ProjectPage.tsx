import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Github, CheckCircle, BookOpen } from 'lucide-react'
import { PresentationEmbed } from '@agentplexus/presentation-embed'

interface Project {
  name: string
  slug: string
  tagline: string
  description: string
  problem: string
  solution: string
  githubUrl: string
  docsUrl?: string
  presentationUrl?: string
  modules: {
    name: string
    slug: string
    usage: string
  }[]
  architecture: {
    title: string
    description: string
  }[]
  features: string[]
}

const projects: Record<string, Project> = {
  'stats-agent-team': {
    name: 'Statistics Agent Team',
    slug: 'stats-agent-team',
    tagline: 'Multi-Agent Statistics Verification System',
    description:
      'A sophisticated multi-agent system that finds and verifies statistics from reputable web sources using LLMs. It solves a critical problem: finding accurate, fact-checked statistics from real sources rather than hallucinated data.',
    problem:
      'LLMs often hallucinate statistics or cite non-existent sources. Getting verified, accurate statistics with real URLs and excerpts is challenging.',
    solution:
      'A 4-agent pipeline where each agent has a specific role: search for sources, extract statistics, verify against original pages, and orchestrate the workflow. This separation ensures accuracy and prevents hallucinations.',
    githubUrl: 'https://github.com/agentplexus/stats-agent-team',
    docsUrl: 'https://agentplexus.github.io/stats-agent-team/',
    presentationUrl: 'https://agentplexus.github.io/stats-agent-team/presentation.html',
    modules: [
      {
        name: 'OmniLLM',
        slug: 'omnillm',
        usage: 'Powers the Synthesis and Verification agents with multi-provider LLM abstraction. Supports Gemini, Claude, OpenAI, Ollama, and xAI through a unified interface.',
      },
      {
        name: 'OmniSerp',
        slug: 'omniserp',
        usage: 'Powers the Research agent with web search capabilities. Abstracts Serper.dev and SerpAPI behind a unified search interface.',
      },
      {
        name: 'OmniObserve',
        slug: 'omniobserve',
        usage: 'Provides zero-config observability via hooks into OmniLLM. Traces all LLM operations to Opik, Langfuse, or Phoenix.',
      },
    ],
    architecture: [
      {
        title: 'Research Agent',
        description: 'Discovers sources via OmniSerp web search. No LLM needed—pure search.',
      },
      {
        title: 'Synthesis Agent',
        description: 'Extracts statistics from web pages using OmniLLM. Finds verbatim excerpts containing numbers.',
      },
      {
        title: 'Verification Agent',
        description: 'Re-fetches sources and validates excerpts exist. Flags hallucinations and discrepancies.',
      },
      {
        title: 'Orchestration Agent',
        description: 'Coordinates the pipeline using Eino graph-based workflow. Deterministic and type-safe.',
      },
    ],
    features: [
      'Multi-provider LLM support (swap with env vars)',
      'Dual protocol: HTTP for debugging, A2A for interoperability',
      'Type-safe orchestration with Cloudwego Eino',
      'Zero-config observability integration',
      'Verified statistics with real URLs and excerpts',
      'Partial results handling with retry logic',
    ],
  },
  'go-opik': {
    name: 'go-opik',
    slug: 'go-opik',
    tagline: 'Go SDK for LLM Observability - Built in 4-5 Hours',
    description:
      'A complete Go SDK for Comet ML Opik, an open-source LLM observability platform. Built entirely using Claude Opus 4.5 in just 4-5 hours, demonstrating AI-assisted SDK development from OpenAPI spec to production-ready library.',
    problem:
      'Opik only had a Python SDK. Go developers building LLM applications needed observability but had no native library. Building an SDK manually would take 5-8 weeks.',
    solution:
      'Used Claude Opus 4.5 with Claude Code to analyze the Python SDK and OpenAPI spec, then generate a complete Go SDK with ogen for type-safe API clients, wrapper services for clean interfaces, and comprehensive tests.',
    githubUrl: 'https://github.com/agentplexus/go-opik',
    docsUrl: 'https://agentplexus.github.io/go-opik/',
    presentationUrl: 'https://agentplexus.github.io/go-opik/presentation.html',
    modules: [
      {
        name: 'OmniObserve',
        slug: 'omniobserve',
        usage: 'This SDK is the foundation for OmniObserve\'s Opik integration. OmniObserve uses go-opik to send traces to Opik.',
      },
    ],
    architecture: [
      {
        title: 'OpenAPI Analysis',
        description: 'Parsed 15K line OpenAPI spec with 201 operations to understand the full API surface.',
      },
      {
        title: 'ogen Generation',
        description: 'Used ogen to generate type-safe API client code with proper optional/nullable handling.',
      },
      {
        title: 'Wrapper Services',
        description: 'Built clean Go interfaces over generated code using functional options pattern.',
      },
      {
        title: 'Testing & Docs',
        description: 'Created comprehensive test suite with mock server and MkDocs documentation site.',
      },
    ],
    features: [
      'Complete in 4-5 hours (~50-80x faster than manual)',
      '50+ Go source files, ~15K lines of code',
      'Traces, spans, datasets, experiments, prompts',
      '10+ heuristic metrics, 8+ LLM judge metrics',
      'OpenAI, Anthropic, GoLLM integrations',
      'CLI tool and HTTP middleware',
    ],
  },
  'go-elevenlabs': {
    name: 'go-elevenlabs',
    slug: 'go-elevenlabs',
    tagline: 'Go SDK for AI Audio Generation',
    description:
      'A comprehensive Go SDK for ElevenLabs AI audio platform, covering text-to-speech, speech-to-text, voice design, music generation, and real-time WebSocket streaming. Built using the same AI-assisted approach as go-opik.',
    problem:
      'ElevenLabs has a powerful API with 204 operations, but no official Go SDK. The 54K line OpenAPI spec would take weeks to wrap manually.',
    solution:
      'Applied the same pattern: ogen for code generation (330K lines), wrapper services for clean interfaces, and comprehensive documentation. Created 19 service wrappers covering core audio, voice, and real-time features.',
    githubUrl: 'https://github.com/agentplexus/go-elevenlabs',
    docsUrl: 'https://agentplexus.github.io/go-elevenlabs/',
    presentationUrl: 'https://agentplexus.github.io/go-elevenlabs/presentation.html',
    modules: [
      {
        name: 'OmniVoice',
        slug: 'omnivoice',
        usage: 'This SDK will power OmniVoice\'s ElevenLabs integration for text-to-speech and voice synthesis capabilities.',
      },
    ],
    architecture: [
      {
        title: 'OpenAPI Spec',
        description: '54K line spec with 204 operations analyzed and categorized by service area.',
      },
      {
        title: 'ogen Generation',
        description: 'Generated 330K lines of typed Go code handling complex optional and oneOf types.',
      },
      {
        title: '19 Service Wrappers',
        description: 'TTS, STT, voices, music, sound effects, dubbing, real-time WebSocket, and more.',
      },
      {
        title: 'Documentation',
        description: '32-page MkDocs site with service guides, examples, and API coverage page.',
      },
    ],
    features: [
      'Text-to-Speech with streaming and timestamps',
      'Speech-to-Text with speaker diarization',
      'Real-time WebSocket TTS and STT',
      'Voice design and cloning',
      'Music generation and sound effects',
      'Twilio phone integration',
    ],
  },
  'omniobserve-agentops': {
    name: 'OmniObserve AgentOps',
    slug: 'omniobserve-agentops',
    tagline: 'OpenTelemetry Semantic Conventions for Multi-Agent AI',
    description:
      'Semantic conventions and middleware for observability in multi-agent AI systems. Extends OpenTelemetry GenAI conventions with workflows, tasks, handoffs, and tool calls—giving multi-agent systems first-class observability.',
    problem:
      'OpenTelemetry GenAI conventions cover model identification and token usage, but don\'t address multi-agent challenges: tracking workflows across agents, measuring handoff latency, understanding task dependencies, and attributing costs.',
    solution:
      'Extended gen_ai.agent.* namespace with workflow, task, handoff, and tool_call concepts. Built middleware that instruments agent systems with minimal code changes while providing full observability.',
    githubUrl: 'https://github.com/agentplexus/omniobserve/tree/main/semconv/agent',
    presentationUrl: 'https://agentplexus.github.io/omniobserve/semconvagent.html',
    modules: [
      {
        name: 'OmniObserve',
        slug: 'omniobserve',
        usage: 'AgentOps is a module within OmniObserve that provides semantic conventions and middleware for multi-agent observability.',
      },
    ],
    architecture: [
      {
        title: 'Semantic Conventions',
        description: 'YAML-defined attributes for workflows, tasks, handoffs, and tool calls following OTel patterns.',
      },
      {
        title: 'Middleware Layer',
        description: 'StartWorkflow, AgentHandler, AgentClient, and ToolCall wrappers for automatic instrumentation.',
      },
      {
        title: 'Context Propagation',
        description: 'Automatic context flow via Go context and HTTP headers (X-AgentOps-*) across agent boundaries.',
      },
      {
        title: 'Storage Backend',
        description: 'PostgreSQL storage with support for querying workflows, tasks, handoffs, and tool invocations.',
      },
    ],
    features: [
      'Extends OpenTelemetry gen_ai.agent.* namespace',
      'Workflow tracking with task counts and duration',
      'Agent handoff latency and payload measurement',
      'Tool call timing with retry tracking',
      'Automatic HTTP header propagation',
      'Minimal code changes via middleware pattern',
    ],
  },
}

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>()
  const project = slug ? projects[slug] : undefined

  if (!project) {
    return (
      <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
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
          to="/#projects"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {project.name}
          </h1>
          <p className="text-xl text-plexus-cyan mb-4">{project.tagline}</p>
          <p className="text-gray-300 mb-6 text-lg leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-medium hover:opacity-90 transition-opacity"
            >
              <Github size={18} />
              View on GitHub
            </a>
            {project.docsUrl && (
              <a
                href={project.docsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 transition-colors text-gray-300"
              >
                <BookOpen size={18} />
                Documentation
              </a>
            )}
            {project.presentationUrl && (
              <a
                href={project.presentationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/5 transition-colors text-gray-300"
              >
                <ExternalLink size={18} />
                Open Presentation
              </a>
            )}
          </div>
        </div>

        {/* Problem & Solution */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-6">
            <h3 className="text-lg font-semibold text-red-400 mb-3">The Problem</h3>
            <p className="text-gray-300">{project.problem}</p>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6">
            <h3 className="text-lg font-semibold text-green-400 mb-3">The Solution</h3>
            <p className="text-gray-300">{project.solution}</p>
          </div>
        </div>

        {/* Architecture */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Architecture</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.architecture.map((step, idx) => (
              <div
                key={step.title}
                className="rounded-xl border border-white/10 bg-plexus-slate/30 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-6 h-6 rounded-full bg-plexus-purple/30 text-plexus-purple-light text-sm font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                </div>
                <p className="text-sm text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Modules Used */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">AgentPlexus Modules Used</h2>
          <div className="space-y-4">
            {project.modules.map((mod) => (
              <div
                key={mod.name}
                className="rounded-xl border border-white/10 bg-plexus-slate/30 p-5 flex flex-col sm:flex-row sm:items-start gap-4"
              >
                <Link
                  to={`/products/${mod.slug}`}
                  className="text-lg font-semibold text-plexus-cyan hover:text-plexus-cyan-light transition-colors shrink-0"
                >
                  {mod.name}
                </Link>
                <p className="text-gray-400">{mod.usage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {project.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-3 text-gray-300">
                <CheckCircle size={18} className="text-plexus-cyan mt-0.5 shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Presentation */}
        {project.presentationUrl && (
          <>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-white">Presentation</h2>
            </div>
            <PresentationEmbed
              src={project.presentationUrl}
              title={`${project.name} Presentation`}
              height="calc(100vh - 200px)"
              minHeight={500}
              border="1px solid rgba(255, 255, 255, 0.1)"
            />
          </>
        )}
      </div>
    </div>
  )
}
