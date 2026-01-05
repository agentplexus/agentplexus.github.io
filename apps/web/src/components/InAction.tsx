import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    name: 'Statistics Agent Team',
    slug: 'stats-agent-team',
    tagline: 'Multi-agent statistics verification system',
    modules: ['OmniLLM', 'OmniSerp', 'OmniObserve'],
  },
  {
    name: 'OmniObserve AgentOps',
    slug: 'omniobserve-agentops',
    tagline: 'OpenTelemetry semantic conventions for multi-agent AI',
    modules: ['OmniObserve'],
  },
  {
    name: 'go-opik',
    slug: 'go-opik',
    tagline: 'Go SDK for LLM observability - built in 4-5 hours',
    modules: ['OmniObserve'],
  },
  {
    name: 'go-elevenlabs',
    slug: 'go-elevenlabs',
    tagline: 'Go SDK for AI audio - 19 service wrappers',
    modules: ['OmniVoice'],
  },
]

export function InAction() {
  return (
    <section id="projects" className="py-24 px-4 bg-plexus-navy/50" role="region" aria-label="Projects">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            SDKs, tools, and reference implementations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              to={`/projects/${project.slug}`}
              className="rounded-xl border border-white/10 bg-plexus-slate/30 p-5 hover:border-plexus-purple/50 hover:bg-plexus-slate/50 focus-visible:border-plexus-purple/50 focus-visible:bg-plexus-slate/50 transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
            >
              <h3 className="text-lg font-bold text-white mb-1 group-hover:text-plexus-cyan group-focus-visible:text-plexus-cyan transition-colors">
                {project.name}
              </h3>
              <p className="text-sm text-gray-300 mb-3">
                {project.tagline}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.modules.map((mod) => (
                  <span
                    key={mod}
                    className="px-2 py-0.5 rounded-full text-xs bg-plexus-purple/20 text-plexus-purple-light"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-medium hover:opacity-90 focus-visible:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple focus-visible:ring-offset-2 focus-visible:ring-offset-plexus-dark"
          >
            View All Projects <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
