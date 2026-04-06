import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

interface Product {
  name: string
  slug: string
  tagline: string
  category: string
  docsUrl?: string | null
  githubUrl?: string
  featured?: boolean
}

interface Category {
  label: string
  description: string
  order: number
}

interface ProductsData {
  categories: Record<string, Category>
  products: Product[]
}

interface MegaMenuProps {
  isActive?: boolean
}

const CATEGORY_ORDER = ['library', 'agent', 'application', 'specification']

// Category key to plural URL path
const CATEGORY_PATHS: Record<string, string> = {
  library: '/libraries',
  agent: '/agents',
  application: '/applications',
  specification: '/specifications',
}

export function MegaMenu({ isActive = false }: MegaMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [data, setData] = useState<ProductsData | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Fetch products.json
  useEffect(() => {
    fetch('/data/products.json')
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
  }, [])

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Get featured products by category, sorted by order
  const getProductsByCategory = (category: string) => {
    if (!data) return []
    return data.products
      .filter((p) => p.category === category && p.featured && p.docsUrl)
      .slice(0, 5)
  }

  // Get total count for category
  const getCategoryCount = (category: string) => {
    if (!data) return 0
    return data.products.filter((p) => p.category === category && p.docsUrl).length
  }

  // Resolve product URL - link to category-based path
  const getProductUrl = (product: Product) => {
    const categoryPath = CATEGORY_PATHS[product.category] || '/products'
    return `${categoryPath}/${product.slug}`
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple ${
          isActive || isOpen ? 'text-plexus-cyan' : 'text-gray-300 hover:text-plexus-cyan'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        Products
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && data && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 top-16 bg-black/50 backdrop-blur-sm z-40" />

          {/* Mega menu panel */}
          <div className="fixed left-0 right-0 top-16 z-50 bg-plexus-dark/98 backdrop-blur-md border-b border-white/10 shadow-2xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-4 gap-8">
                {CATEGORY_ORDER.map((categoryKey) => {
                  const category = data.categories[categoryKey]
                  const products = getProductsByCategory(categoryKey)
                  const totalCount = getCategoryCount(categoryKey)
                  const remainingCount = totalCount - products.length

                  return (
                    <div key={categoryKey}>
                      {/* Category header */}
                      <div className="mb-4">
                        <Link
                          to={CATEGORY_PATHS[categoryKey]}
                          className="text-sm font-semibold text-white uppercase tracking-wider hover:text-plexus-cyan transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {category.label}
                        </Link>
                        <p className="text-xs text-gray-500 mt-1">
                          {category.description}
                        </p>
                      </div>

                      {/* Products list */}
                      <ul className="space-y-3">
                        {products.map((product) => (
                          <li key={product.slug}>
                            <Link
                              to={getProductUrl(product)}
                              className="group block"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="text-sm font-medium text-gray-200 group-hover:text-plexus-cyan transition-colors">
                                {product.name}
                              </span>
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                                {product.tagline}
                              </p>
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* View all link */}
                      {remainingCount > 0 && (
                        <Link
                          to={CATEGORY_PATHS[categoryKey]}
                          className="inline-flex items-center gap-1 mt-4 text-xs text-plexus-cyan hover:text-plexus-cyan-light transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          +{remainingCount} more {category.label.toLowerCase()}
                          <ChevronDown size={12} className="rotate-[-90deg]" />
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Bottom bar with quick links */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Link
                    to="/#products"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    All Products
                  </Link>
                  <Link
                    to="/integrations"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Integrations
                  </Link>
                  <a
                    href="https://github.com/plexusone"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </div>
                <p className="text-xs text-gray-600">
                  {data.products.length} products across {Object.keys(data.categories).length} categories
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
