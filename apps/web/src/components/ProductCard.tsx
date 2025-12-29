import { Link } from 'react-router-dom'
import { Github, Play } from 'lucide-react'
import { cn } from '../lib/utils'

interface ProductCardProps {
  name: string
  slug: string
  tagline: string
  description: string
  features: string[]
  color: 'cyan' | 'purple' | 'pink' | 'violet'
  status?: 'stable' | 'beta' | 'coming-soon'
  githubUrl?: string
  integrations?: string[]
}

const colorClasses = {
  cyan: {
    border: 'border-plexus-cyan/30 hover:border-plexus-cyan/60',
    bg: 'bg-plexus-cyan/5',
    text: 'text-plexus-cyan',
    badge: 'bg-plexus-cyan/20 text-plexus-cyan',
  },
  purple: {
    border: 'border-plexus-purple/30 hover:border-plexus-purple/60',
    bg: 'bg-plexus-purple/5',
    text: 'text-plexus-purple',
    badge: 'bg-plexus-purple/20 text-plexus-purple-light',
  },
  pink: {
    border: 'border-plexus-pink/30 hover:border-plexus-pink/60',
    bg: 'bg-plexus-pink/5',
    text: 'text-plexus-pink',
    badge: 'bg-plexus-pink/20 text-plexus-pink-light',
  },
  violet: {
    border: 'border-plexus-violet/30 hover:border-plexus-violet/60',
    bg: 'bg-plexus-violet/5',
    text: 'text-plexus-violet',
    badge: 'bg-plexus-violet/20 text-plexus-violet',
  },
}

const statusBadges = {
  stable: { text: '✓ Stable', class: 'bg-green-500/20 text-green-400' },
  beta: { text: '⚡ Beta', class: 'bg-yellow-500/20 text-yellow-400' },
  'coming-soon': { text: '○ Coming Soon', class: 'bg-gray-500/20 text-gray-400' },
}

const bulletClasses = {
  cyan: 'bg-plexus-cyan',
  purple: 'bg-plexus-purple',
  pink: 'bg-plexus-pink',
  violet: 'bg-plexus-violet',
}

export function ProductCard({
  name,
  slug,
  tagline,
  description,
  features,
  color,
  status = 'stable',
  githubUrl,
  integrations = [],
}: ProductCardProps) {
  const colors = colorClasses[color]
  const statusBadge = statusBadges[status]

  return (
    <div
      className={cn(
        'rounded-xl border p-6 card-hover',
        colors.border,
        colors.bg
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <Link to={`/products/${slug}`} className="group rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple">
          <h3 className={cn('text-xl font-bold group-hover:opacity-80 group-focus-visible:opacity-80 transition-opacity', colors.text)}>{name}</h3>
          <p className="text-sm text-gray-300 group-hover:text-gray-200 group-focus-visible:text-gray-200 transition-colors">{tagline}</p>
        </Link>
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium', statusBadge.class)}>
          {statusBadge.text}
        </span>
      </div>

      <Link to={`/products/${slug}`} className="block text-gray-300 mb-4 hover:text-gray-200 focus-visible:text-gray-200 transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple">
        {description}
      </Link>

      <ul className="space-y-2 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
            <span className={cn('mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0', bulletClasses[color])} />
            {feature}
          </li>
        ))}
      </ul>

      {status !== 'coming-soon' && (
        <div className="flex flex-wrap items-center gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 text-sm font-medium transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple',
                colors.text,
                'hover:opacity-80 focus-visible:opacity-80'
              )}
            >
              <Github size={14} /> GitHub
            </a>
          )}
          <Link
            to={`/products/${slug}`}
            className={cn(
              'inline-flex items-center gap-2 text-sm font-medium transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plexus-purple',
              colors.text,
              'hover:opacity-80 focus-visible:opacity-80'
            )}
            aria-label={`Learn more about ${name}`}
          >
            Learn More <Play size={14} />
          </Link>
          {integrations.length > 0 && (
            <div className="flex items-center gap-1.5 ml-auto">
              {integrations.map((integration) => (
                <img
                  key={integration}
                  src={`/integrations/${integration}.svg`}
                  alt={integration}
                  className="w-4 h-4 opacity-70 hover:opacity-100 transition-opacity"
                  title={integration}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
