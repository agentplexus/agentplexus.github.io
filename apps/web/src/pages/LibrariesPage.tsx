import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Github, BookOpen } from 'lucide-react'
import { cn } from '../lib/utils'

interface Product {
  name: string
  slug: string
  tagline: string
  description?: string
  category: string
  githubUrl?: string
  docsUrl?: string | null
  featured?: boolean
}

interface ProductsData {
  products: Product[]
}

const colorClasses = [
  { text: 'text-plexus-cyan', border: 'border-plexus-cyan/30 hover:border-plexus-cyan/50' },
  { text: 'text-plexus-purple', border: 'border-plexus-purple/30 hover:border-plexus-purple/50' },
  { text: 'text-plexus-pink', border: 'border-plexus-pink/30 hover:border-plexus-pink/50' },
  { text: 'text-plexus-violet', border: 'border-plexus-violet/30 hover:border-plexus-violet/50' },
]

export function LibrariesPage() {
  const [libraries, setLibraries] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data: ProductsData) => {
        const libs = data.products
          .filter((p) => p.category === 'library' && p.docsUrl)
          .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        setLibraries(libs)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load libraries:', err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4 flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Libraries</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Composable Go modules for building AI agent applications. Each library follows the "omni" pattern for multi-provider abstraction.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {libraries.map((library, index) => {
            const colors = colorClasses[index % colorClasses.length]
            return (
              <div
                key={library.slug}
                className={cn(
                  'rounded-xl border bg-plexus-slate/30 p-6 transition-colors',
                  colors.border
                )}
              >
                <h2 className={cn('text-2xl font-bold mb-1', colors.text)}>
                  {library.name}
                </h2>
                <p className="text-gray-400 text-sm mb-3">{library.tagline}</p>
                {library.description && (
                  <p className="text-gray-300 mb-5 line-clamp-2">{library.description}</p>
                )}

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/libraries/${library.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                  {library.githubUrl && (
                    <a
                      href={library.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                  )}
                  {library.docsUrl && (
                    <a
                      href={library.docsUrl.startsWith('/') ? `https://plexusone.dev${library.docsUrl}` : library.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                    >
                      <BookOpen size={16} />
                      Docs
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {libraries.length === 0 && (
          <div className="text-center text-gray-400">
            No libraries found.
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            All libraries are open source and available on GitHub
          </p>
          <a
            href="https://github.com/plexusone"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-plexus-cyan hover:text-plexus-purple transition-colors"
          >
            View all repositories
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </div>
  )
}
