import { Blocks, GitFork, Lock, Zap } from 'lucide-react'

const principles = [
  {
    icon: Blocks,
    title: 'Single Responsibility',
    description:
      'Each module does one thing well. OmniLLM handles LLM abstraction. OmniVault handles secrets. No feature creep, no kitchen sinks.',
    color: 'text-plexus-cyan',
  },
  {
    icon: GitFork,
    title: 'No Framework Lock-in',
    description:
      'Use our modules with any framework—or none at all. Unlike many framework-specific abstractions, our libraries remain extractable and independent.',
    color: 'text-plexus-purple',
  },
  {
    icon: Zap,
    title: 'Composable by Design',
    description:
      'Integration modules like VaultGuard and AgentKit combine primitives without coupling them. The core libraries stay independent.',
    color: 'text-plexus-pink',
  },
  {
    icon: Lock,
    title: 'Clean Boundaries',
    description:
      'Separate modules encourage clean interfaces. The friction of multiple repos is the price of libraries that remain genuinely reusable.',
    color: 'text-plexus-violet',
  },
]

export function Philosophy() {
  return (
    <section id="philosophy" className="py-24 px-4 bg-plexus-navy/50" role="region" aria-label="Philosophy">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Philosophy</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We build composable infrastructure, not monolithic frameworks.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="p-6 rounded-xl bg-plexus-slate/30 border border-white/5"
            >
              <principle.icon className={`w-10 h-10 ${principle.color} mb-4`} />
              <h3 className="text-xl font-bold text-white mb-2">{principle.title}</h3>
              <p className="text-gray-300">{principle.description}</p>
            </div>
          ))}
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="p-8 rounded-xl bg-gradient-to-r from-plexus-purple/10 to-plexus-cyan/10 border border-white/10">
            <h3 className="text-2xl font-bold text-white mb-4">The Unix Philosophy for AI</h3>
            <p className="text-gray-300 mb-4">
              Write programs that do one thing and do it well. Write programs to work together.
            </p>
            <p className="text-gray-300">
              Many frameworks bundle useful abstractions that can't be used outside that framework.
              LLM libraries coupled to specific orchestration patterns. Storage backends buried in monolithic tools.
              AgentPlexus modules are designed from day one to be used independently—whether you're
              building with ADK, LangChain, your own framework, or no framework at all.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
