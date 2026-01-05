import { Link } from 'react-router-dom'
import { ArrowRight, Bot, Search, Eye, Workflow, Code, FileCode, Mic, Github, Activity, Play, BookOpen } from 'lucide-react'

const projects = [
  {
    name: 'Statistics Agent Team',
    slug: 'stats-agent-team',
    description:
      'A multi-agent system that finds and verifies statistics from reputable web sources. Uses a 4-agent pipeline to ensure accuracy and prevent hallucinations.',
    modules: ['OmniLLM', 'OmniSerp', 'OmniObserve'],
    highlights: [
      { icon: Search, text: 'Web search via OmniSerp' },
      { icon: Bot, text: 'Multi-provider LLM via OmniLLM' },
      { icon: Eye, text: 'Tracing via OmniObserve' },
      { icon: Workflow, text: 'Eino orchestration' },
    ],
    githubUrl: 'https://github.com/agentplexus/stats-agent-team',
    docsUrl: 'https://agentplexus.github.io/stats-agent-team/',
    presentationUrl: 'https://agentplexus.github.io/stats-agent-team/presentation.html',
  },
  {
    name: 'OmniObserve AgentOps',
    slug: 'omniobserve-agentops',
    description:
      'OpenTelemetry semantic conventions for multi-agent AI systems. Extends gen_ai.agent.* with workflows, tasks, handoffs, and tool calls for first-class observability.',
    modules: ['OmniObserve'],
    highlights: [
      { icon: Activity, text: 'OpenTelemetry semantic conventions' },
      { icon: Workflow, text: 'Workflow & task tracking' },
      { icon: Bot, text: 'Agent handoff measurement' },
      { icon: Code, text: 'Middleware instrumentation' },
    ],
    githubUrl: 'https://github.com/agentplexus/omniobserve/tree/main/semconv/agent',
    presentationUrl: 'https://agentplexus.github.io/omniobserve/semconvagent.html',
  },
  {
    name: 'go-opik',
    slug: 'go-opik',
    description:
      'A complete Go SDK for Comet ML Opik, built in 4-5 hours using Claude Opus 4.5. Demonstrates AI-assisted SDK development from OpenAPI spec to production-ready library.',
    modules: ['OmniObserve'],
    highlights: [
      { icon: Code, text: '50+ Go files, 15K lines' },
      { icon: FileCode, text: 'ogen code generation' },
      { icon: Eye, text: 'LLM observability SDK' },
      { icon: Bot, text: 'Built with Claude Opus 4.5' },
    ],
    githubUrl: 'https://github.com/agentplexus/go-opik',
    docsUrl: 'https://agentplexus.github.io/go-opik/',
    presentationUrl: 'https://agentplexus.github.io/go-opik/presentation.html',
  },
  {
    name: 'go-elevenlabs',
    slug: 'go-elevenlabs',
    description:
      'A comprehensive Go SDK for ElevenLabs AI audio platform. 19 service wrappers covering TTS, STT, voice design, music generation, and real-time streaming.',
    modules: ['OmniVoice'],
    highlights: [
      { icon: Mic, text: '19 audio services' },
      { icon: Code, text: '330K + 8K lines of code' },
      { icon: FileCode, text: 'OpenAPI → ogen → wrappers' },
      { icon: Bot, text: 'Built with Claude Opus 4.5' },
    ],
    githubUrl: 'https://github.com/agentplexus/go-elevenlabs',
    docsUrl: 'https://agentplexus.github.io/go-elevenlabs/',
    presentationUrl: 'https://agentplexus.github.io/go-elevenlabs/presentation.html',
  },
]

export function ProjectsPage() {
  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Projects</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            SDKs, tools, and reference implementations.
          </p>
        </div>

        <div className="grid gap-8">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="rounded-xl border border-white/10 bg-plexus-slate/30 p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {project.name}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.modules.map((mod) => (
                      <span
                        key={mod}
                        className="px-3 py-1 rounded-full text-sm bg-plexus-purple/20 text-plexus-purple-light"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 mb-4">
                    {project.highlights.map((highlight, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-400"
                      >
                        <highlight.icon size={14} className="text-plexus-cyan shrink-0" />
                        {highlight.text}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      View Project <ArrowRight size={14} />
                    </Link>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                    >
                      <Github size={14} />
                      GitHub
                    </a>
                    {project.docsUrl && (
                      <a
                        href={project.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                      >
                        <BookOpen size={14} />
                        Docs
                      </a>
                    )}
                  </div>
                </div>

                {/* Presentation Preview */}
                {project.presentationUrl && (
                  <div className="lg:w-80 shrink-0">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="block rounded-lg overflow-hidden border border-white/10 hover:border-plexus-purple/50 transition-colors group"
                    >
                      <div className="relative aspect-video bg-plexus-dark">
                        <iframe
                          src={project.presentationUrl}
                          title={`${project.name} Presentation Preview`}
                          className="w-full h-full pointer-events-none"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-plexus-dark/80 via-transparent to-transparent" />
                        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-white/70 text-xs">
                          <Play size={12} className="text-plexus-cyan" />
                          View presentation
                        </div>
                        <div className="absolute inset-0 bg-plexus-purple/0 group-hover:bg-plexus-purple/10 transition-colors" />
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
