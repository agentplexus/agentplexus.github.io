import { Github } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <img src="/icon.png" alt="AgentPlexus" className="h-8 w-8" />
            <span className="text-lg font-bold">
              <span className="text-white">Agent</span>
              <span className="gradient-text">Plexus</span>
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <a
              href="https://github.com/agentplexus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Github size={20} />
              GitHub
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center">
          <p className="text-gray-500 text-sm">
            Built with Go. Designed for composability.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            © {new Date().getFullYear()} AgentPlexus. MIT License.
          </p>
        </div>
      </div>
    </footer>
  )
}
