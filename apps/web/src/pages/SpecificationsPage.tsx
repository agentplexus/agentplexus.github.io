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

export function SpecificationsPage() {
  const [specifications, setSpecifications] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then((data: ProductsData) => {
        const specs = data.products
          .filter((p) => p.category === 'specification' && p.docsUrl)
          .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
        setSpecifications(specs)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to load specifications:', err)
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
            <span className="gradient-text">Specifications</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Open formats for defining AI agents, design systems, and multi-agent architectures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {specifications.map((spec, index) => {
            const colors = colorClasses[index % colorClasses.length]
            return (
              <div
                key={spec.slug}
                className={cn(
                  'rounded-xl border bg-plexus-slate/30 p-6 transition-colors',
                  colors.border
                )}
              >
                <h2 className={cn('text-2xl font-bold mb-1', colors.text)}>
                  {spec.name}
                </h2>
                <p className="text-gray-400 text-sm mb-3">{spec.tagline}</p>
                {spec.description && (
                  <p className="text-gray-300 mb-5 line-clamp-3">{spec.description}</p>
                )}

                <div className="flex flex-wrap gap-3">
                  <Link
                    to={`/specifications/${spec.slug}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-plexus-cyan to-plexus-purple text-white font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    Learn More
                    <ArrowRight size={16} />
                  </Link>
                  {spec.githubUrl && (
                    <a
                      href={spec.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/20 text-gray-300 text-sm hover:bg-white/5 transition-colors"
                    >
                      <Github size={16} />
                      GitHub
                    </a>
                  )}
                  {spec.docsUrl && (
                    <a
                      href={spec.docsUrl.startsWith('/') ? `https://plexusone.dev${spec.docsUrl}` : spec.docsUrl}
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

        {specifications.length === 0 && (
          <div className="text-center text-gray-400">
            No specifications found.
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">
            Use multi-agent-spec with AssistantKit to generate plugins
          </p>
          <Link
            to="/libraries/assistantkit"
            className="inline-flex items-center gap-2 text-plexus-cyan hover:text-plexus-purple transition-colors"
          >
            Learn about AssistantKit
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}
