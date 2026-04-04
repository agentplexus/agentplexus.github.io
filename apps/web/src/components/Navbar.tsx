import { Menu, X, Github, Rss, ChevronDown } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'

type DropdownName = 'products' | 'developers' | 'community' | null

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<DropdownName>(null)
  const location = useLocation()
  const firstMenuItemRef = useRef<HTMLAnchorElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const dropdownRefs = {
    products: useRef<HTMLDivElement>(null),
    developers: useRef<HTMLDivElement>(null),
    community: useRef<HTMLDivElement>(null),
  }

  // Close mobile menu on Escape key and manage focus
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (openDropdown) {
          setOpenDropdown(null)
        } else if (isOpen) {
          setIsOpen(false)
          menuButtonRef.current?.focus()
        }
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, openDropdown])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      const clickedOutsideAll = Object.values(dropdownRefs).every(
        ref => !ref.current?.contains(target)
      )
      if (clickedOutsideAll) {
        setOpenDropdown(null)
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

  // Check if any page in a dropdown is current
  const isProductsPage = isCurrentPage('/#products') || isCurrentPage('/integrations') || isCurrentPage('/specifications') || isCurrentPage('/applications') || location.pathname.startsWith('/products/')
  const isDevelopersPage = isCurrentPage('/academy') || isCurrentPage('/mcp') || location.pathname.startsWith('/academy/')
  const isCommunityPage = isCurrentPage('/blog') || isCurrentPage('/releases') || isCurrentPage('/#philosophy') || location.pathname.startsWith('/blog/')

  const toggleDropdown = (name: DropdownName) => {
    setOpenDropdown(openDropdown === name ? null : name)
  }

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
            <img src="/icon.png" alt="PlexusOne" className="h-10 w-10" />
            <span className="text-xl font-bold">
              <span className="text-white">Plexus</span>
              <span className="gradient-text">One</span>
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {/* Products dropdown */}
            <div className="relative" ref={dropdownRefs.products}>
              <button
                onClick={() => toggleDropdown('products')}
                className={`inline-flex items-center gap-1 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple ${isProductsPage ? 'text-plexus-cyan' : 'text-gray-300 hover:text-plexus-cyan'}`}
                aria-expanded={openDropdown === 'products'}
                aria-haspopup="true"
              >
                Products
                <ChevronDown size={16} className={`transition-transform ${openDropdown === 'products' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'products' && (
                <div className="absolute top-full left-0 mt-2 w-48 py-2 bg-plexus-dark/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl">
                  <a
                    href="/#products"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                    aria-current={isCurrentPage('/#products') ? 'page' : undefined}
                  >
                    Libraries
                  </a>
                  <a
                    href="/specifications"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                    aria-current={isCurrentPage('/specifications') ? 'page' : undefined}
                  >
                    Specifications
                  </a>
                  <a
                    href="/applications"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                    aria-current={isCurrentPage('/applications') ? 'page' : undefined}
                  >
                    Applications
                  </a>
                  <a
                    href="/integrations"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                    aria-current={isCurrentPage('/integrations') ? 'page' : undefined}
                  >
                    Integrations
                  </a>
                </div>
              )}
            </div>

            <a href="/projects" className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple" aria-current={isCurrentPage('/projects') ? 'page' : undefined}>
              Projects
            </a>

            {/* Developers dropdown */}
            <div className="relative" ref={dropdownRefs.developers}>
              <button
                onClick={() => toggleDropdown('developers')}
                className={`inline-flex items-center gap-1 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple ${isDevelopersPage ? 'text-plexus-cyan' : 'text-gray-300 hover:text-plexus-cyan'}`}
                aria-expanded={openDropdown === 'developers'}
                aria-haspopup="true"
              >
                Developers
                <ChevronDown size={16} className={`transition-transform ${openDropdown === 'developers' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'developers' && (
                <div className="absolute top-full left-0 mt-2 w-48 py-2 bg-plexus-dark/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl">
                  <a
                    href="/academy"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                    aria-current={isCurrentPage('/academy') ? 'page' : undefined}
                  >
                    Academy
                  </a>
                  <a
                    href="/mcp"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                    aria-current={isCurrentPage('/mcp') ? 'page' : undefined}
                  >
                    MCP
                  </a>
                </div>
              )}
            </div>

            {/* Community dropdown */}
            <div className="relative" ref={dropdownRefs.community}>
              <button
                onClick={() => toggleDropdown('community')}
                className={`inline-flex items-center gap-1 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple ${isCommunityPage ? 'text-plexus-cyan' : 'text-gray-300 hover:text-plexus-cyan'}`}
                aria-expanded={openDropdown === 'community'}
                aria-haspopup="true"
              >
                Community
                <ChevronDown size={16} className={`transition-transform ${openDropdown === 'community' ? 'rotate-180' : ''}`} />
              </button>
              {openDropdown === 'community' && (
                <div className="absolute top-full left-0 mt-2 w-48 py-2 bg-plexus-dark/95 backdrop-blur-md border border-white/10 rounded-lg shadow-xl">
                  <a
                    href="/blog"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                    aria-current={isCurrentPage('/blog') ? 'page' : undefined}
                  >
                    Blog
                  </a>
                  <a
                    href="/releases"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setOpenDropdown(null)}
                    aria-current={isCurrentPage('/releases') ? 'page' : undefined}
                  >
                    Releases
                  </a>
                  <a
                    href="/#philosophy"
                    className="block px-4 py-2 text-gray-300 hover:text-plexus-cyan hover:bg-white/5 transition-colors"
                    onClick={() => setOpenDropdown(null)}
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
                    onClick={() => setOpenDropdown(null)}
                  >
                    <Rss size={14} />
                    RSS Feed
                  </a>
                </div>
              )}
            </div>

            <a
              href="https://github.com/plexusone"
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
              {/* Products section */}
              <div className="pt-2">
                <span className="text-xs uppercase tracking-wider text-gray-500">Products</span>
              </div>
              <a
                ref={firstMenuItemRef}
                href="/#products"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/#products') ? 'page' : undefined}
              >
                Libraries
              </a>
              <a
                href="/specifications"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/specifications') ? 'page' : undefined}
              >
                Specifications
              </a>
              <a
                href="/applications"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/applications') ? 'page' : undefined}
              >
                Applications
              </a>
              <a
                href="/integrations"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/integrations') ? 'page' : undefined}
              >
                Integrations
              </a>

              {/* Projects link */}
              <div className="pt-2 border-t border-white/10">
                <a
                  href="/projects"
                  className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                  onClick={() => setIsOpen(false)}
                  aria-current={isCurrentPage('/projects') ? 'page' : undefined}
                >
                  Projects
                </a>
              </div>

              {/* Developers section */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider text-gray-500">Developers</span>
              </div>
              <a
                href="/academy"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/academy') ? 'page' : undefined}
              >
                Academy
              </a>
              <a
                href="/mcp"
                className="text-gray-300 hover:text-plexus-cyan transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple"
                onClick={() => setIsOpen(false)}
                aria-current={isCurrentPage('/mcp') ? 'page' : undefined}
              >
                MCP
              </a>

              {/* Community section */}
              <div className="pt-2 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider text-gray-500">Community</span>
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
                href="https://github.com/plexusone"
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
