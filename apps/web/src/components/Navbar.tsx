import { Menu, X, Github, Rss, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)
  const location = useLocation()
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const resourcesRef = useRef<HTMLDivElement>(null)

  // Close mobile menu on Escape key and manage focus
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (resourcesOpen) {
          setResourcesOpen(false)
        } else if (isOpen) {
          setIsOpen(false)
          menuButtonRef.current?.focus()
        }
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, resourcesOpen])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Focus first menu item when menu opens
  useEffect(() => {
    if (isOpen) {
      firstMenuItemRef.current?.focus()
    }
  }, [isOpen])

  // Helper to check if link is current page
  const isCurrentPage = (href: string) => {
    if (href.startsWith('/#')) return location.pathname === '/' && location.hash === href.slice(1)
    return location.pathname === href
  }

  // Check if any resource page is current
  const isResourcePage = isCurrentPage('/blog') || isCurrentPage('/releases') || isCurrentPage('/#philosophy')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-plexus-dark/80 backdrop-blur-md border-b border-white/10" aria-label="Main navigation">
      {/* Skip link for keyboard navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-plexus-purple focus:text-white focus:rounded-lg"
      >
        Skip to main content
      </a>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple focus-visible:ring-offset-2 focus-visible:ring-offset-plexus-dark">
            <img src="/icon.png" alt="AgentPlexus" className="h-10 w-10" />
            <span className="text-xl font-bold">
              <span className="text-white">Agent</span>
              <span className="gradient-text">Plexus</span>
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/#products" className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple" aria-current={isCurrentPage('/#products') ? 'page' : undefined}>
              Products
            </a>
            <a href="/projects" className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple" aria-current={isCurrentPage('/projects') ? 'page' : undefined}>
              Projects
            </a>
            <a href="/integrations" className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple" aria-current={isCurrentPage('/integrations') ? 'page' : undefined}>
              Integrations
            </a>
            <a href="/mcp" className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple" aria-current={isCurrentPage('/mcp') ? 'page' : undefined}>
              MCP
            </a>

            {/* Resources dropdown */}
            <div className="relative" ref={resourcesRef}>
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className={`inline-flex items-center gap-1 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple ${isResourcePage ? 'text-plexus-cyan' : 'text-gray-300 hover:text-plexus-cyan'}`}
                aria-expanded={resourcesOpen}
                aria-haspopup="true"
              >
                Resources
                <ChevronDown size={16} className={`transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {resourcesOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 py-2 bg-plexus-dark/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl">
                  <a
                    href="/blog"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                    aria-current={isCurrentPage('/blog') ? 'page' : undefined}
                  >
                    Blog
                  </a>
                  <a
                    href="/releases"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                    aria-current={isCurrentPage('/releases') ? 'page' : undefined}
                  >
                    Releases
                  </a>
                  <a
                    href="/#philosophy"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                    aria-current={isCurrentPage('/#philosophy') ? 'page' : undefined}
                  >
                    Philosophy
                  </a>
                  <div className="border-t border-white/10 my-2"></div>
                  <a
                    href="/blog/atom.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setResourcesOpen(false)}
                  >
                    <Rss size={14} />
                    RSS Feed
                  </a>
                </div>
              )}
            </div>

            <a
              href="https://github.com/agentplexus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-plexus-purple/20 border border-plexus-purple/50 text-plexus-purple-light hover:bg-plexus-purple/30 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple focus-visible:ring-offset-2 focus-visible:ring-offset-plexus-dark"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            className="md:hidden p-2 text-gray-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div
            id="mobile-menu"
            className="md:hidden py-4 border-t border-white/10"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-4">
              <a
                ref={firstMenuItemRef}
                href="/#products"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/#products') ? 'page' : undefined}
              >
                Products
              </a>
              <a
                href="/projects"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/projects') ? 'page' : undefined}
              >
                Projects
              </a>
              <a
                href="/integrations"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/integrations') ? 'page' : undefined}
              >
                Integrations
              </a>
              <a
                href="/mcp"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/mcp') ? 'page' : undefined}
              >
                MCP
              </a>

              {/* Resources section in mobile */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider text-gray-500">Resources</span>
              </div>
              <a
                href="/blog"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/blog') ? 'page' : undefined}
              >
                Blog
              </a>
              <a
                href="/releases"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/releases') ? 'page' : undefined}
              >
                Releases
              </a>
              <a
                href="/#philosophy"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/#philosophy') ? 'page' : undefined}
              >
                Philosophy
              </a>
              <a
                href="/blog/atom.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
              >
                <Rss size={16} />
                RSS Feed
              </a>
              <a
                href="https://github.com/agentplexus"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-plexus-purple-light rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
              >
                <Github size={16} />
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
