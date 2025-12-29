import { ArrowDown, Github } from 'lucide-react'

export function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-16 relative overflow-hidden" role="region" aria-label="Hero">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-plexus-purple/10 via-transparent to-plexus-cyan/5 pointer-events-none" />

      {/* Decorative circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-plexus-purple/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-plexus-cyan/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <img
          src="/icon.png"
          alt="AgentPlexus"
          className="w-32 h-32 mx-auto mb-8 drop-shadow-2xl"
        />

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="text-white">Agent</span>
          <span className="gradient-text">Plexus</span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-4">
          Composable Infrastructure for AI Agents
        </p>

        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
          A collection of independent, focused Go modules for building AI agent applications.
          Each module does one thing well and can be used standalone or composed together.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#products"
            className="px-8 py-3 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-semibold hover:opacity-90 focus-visible:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple focus-visible:ring-offset-2 focus-visible:ring-offset-plexus-dark"
          >
            Explore Products
          </a>
          <a
            href="https://github.com/agentplexus"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/5 focus-visible:bg-white/5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple focus-visible:ring-offset-2 focus-visible:ring-offset-plexus-dark"
            aria-label="View AgentPlexus on GitHub (opens in new tab)"
          >
            <Github size={18} />
            View on GitHub
          </a>
        </div>
      </div>

      <a
        href="#products"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 motion-safe:animate-bounce rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
        aria-label="Scroll to products"
      >
        <ArrowDown size={32} />
      </a>
    </section>
  )
}
