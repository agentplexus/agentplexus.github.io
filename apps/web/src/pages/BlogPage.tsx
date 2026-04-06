import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Clock, ArrowRight, Rss } from 'lucide-react'
import blogPostsData from '../data/blog-posts.json'

export type BlogCategory = 'Product' | 'Engineering'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  tags: string[]
  author: string
  category: BlogCategory
}

// Import from JSON single source of truth
export const blogPosts: BlogPost[] = blogPostsData as BlogPost[]

export function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategory | 'All'>('All')

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory)

  return (
    <div className="min-h-screen bg-plexus-dark pt-28 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Blog</span>
          </h1>
          <p className="text-xl text-gray-400 mb-4">
            Insights, tutorials, and stories from building AI agent infrastructure.
          </p>
          <a
            href="/atom.xml"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-plexus-cyan transition-colors"
          >
            <Rss size={14} />
            Atom Feed
          </a>
        </div>

        {/* Category Filter */}
        <div className="flex justify-center gap-2 mb-12">
          {(['All', 'Product', 'Engineering'] as const).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-plexus-purple text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
              <span className="ml-2 text-xs opacity-60">
                ({category === 'All'
                  ? blogPosts.length
                  : blogPosts.filter(p => p.category === category).length})
              </span>
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {filteredPosts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-white/10 bg-plexus-slate/30 p-6 hover:border-white/20 transition-colors"
            >
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    post.category === 'Engineering'
                      ? 'bg-plexus-cyan/20 text-plexus-cyan'
                      : 'bg-plexus-pink/20 text-plexus-pink'
                  }`}
                >
                  {post.category}
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 rounded-full text-xs bg-plexus-purple/20 text-plexus-purple-light"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Link to={`/blog/${post.slug}`}>
                <h2 className="text-2xl font-bold text-white mb-3 hover:text-plexus-cyan transition-colors">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-400 mb-4">{post.excerpt}</p>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {post.readTime}
                  </span>
                </div>

                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-plexus-cyan hover:text-plexus-cyan-light transition-colors text-sm font-medium"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read more <ArrowRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
