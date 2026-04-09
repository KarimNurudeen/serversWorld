import BlogCard from '@/components/ui/BlogCard'
import { blogPosts } from '@/lib/data'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = { title: 'Blog' }

const CATEGORIES = [
  { value: 'all', label: 'All Posts' },
  { value: 'Cloud', label: 'Cloud' },
  { value: 'Infrastructure', label: 'Infrastructure' },
  { value: 'AI & Data', label: 'AI & Data' },
  { value: 'Security', label: 'Security' },
  { value: 'Business', label: 'Business' },
]

export default function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string }
}) {
  const activeCategory = searchParams.category || 'all'
  const searchQuery = searchParams.search?.toLowerCase() || ''

  const filtered = blogPosts.filter((post) => {
    const matchesCategory = activeCategory === 'all' || post.categories.includes(activeCategory)
    const matchesSearch = !searchQuery || post.title.toLowerCase().includes(searchQuery) || post.excerpt?.toLowerCase().includes(searchQuery)
    return matchesCategory && matchesSearch
  })

  const popular = blogPosts.slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-divider relative overflow-hidden min-h-[300px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1800&q=85&auto=format&fit=crop"
            alt="Blog and insights"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
        </div>
        <div className="page-container py-16 relative z-10">
          <p className="section-label mb-4">KNOWLEDGE BASE</p>
          <h1 className="text-headline-lg font-primary font-bold text-white mb-4">Blog & Insights</h1>
          <p className="text-secondary-text text-body-lg font-secondary max-w-2xl">
            Deep dives into technology, software development, AI, cybersecurity, and the future of digital infrastructure.
          </p>
        </div>
      </div>

      <div className="page-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search */}
            <form className="mb-8">
              <div className="flex gap-3">
                <input
                  type="search"
                  name="search"
                  defaultValue={searchParams.search}
                  placeholder="Search articles..."
                  className="input-field flex-1"
                />
                <button type="submit" className="btn-primary px-8">SEARCH</button>
              </div>
            </form>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.value}
                  href={cat.value === 'all' ? '/blog' : `/blog?category=${cat.value}`}
                  className={`px-4 py-2 border text-label-md font-primary font-semibold uppercase tracking-wider transition-colors ${
                    activeCategory === cat.value
                      ? 'border-white bg-white text-background'
                      : 'border-divider text-secondary-text hover:border-white/50 hover:text-white'
                  }`}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filtered.map((post) => (
                  <BlogCard
                    key={post._id}
                    title={post.title}
                    slug={{ current: post.slug }}
                    excerpt={post.excerpt}
                    coverImage={post.coverImage}
                    categories={post.categories}
                    readTime={post.readTime}
                    publishedAt={post.publishedAt}
                    author={post.author}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-divider">
                <p className="text-secondary-text font-secondary text-body-lg mb-3">No posts found.</p>
                <Link href="/blog" className="text-white underline font-secondary hover:no-underline">Clear filters</Link>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            <div>
              <h3 className="section-label mb-5">POPULAR POSTS</h3>
              <div className="space-y-6">
                {popular.map((post) => (
                  <BlogCard
                    key={post._id}
                    title={post.title}
                    slug={{ current: post.slug }}
                    coverImage={post.coverImage}
                    readTime={post.readTime}
                    publishedAt={post.publishedAt}
                    variant="compact"
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="section-label mb-5">CATEGORIES</h3>
              <div className="space-y-2">
                {CATEGORIES.slice(1).map((cat) => (
                  <Link
                    key={cat.value}
                    href={`/blog?category=${cat.value}`}
                    className="flex items-center justify-between py-2 border-b border-divider text-secondary-text hover:text-white transition-colors group"
                  >
                    <span className="font-secondary text-body-md">{cat.label}</span>
                    <span className="text-label-sm font-primary font-bold tracking-wider text-hint group-hover:text-white/60 transition-colors">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="section-label mb-5">FOLLOW US</h3>
              <div className="space-y-3">
                {[
                  { label: 'Twitter / X', handle: '@serversworld' },
                  { label: 'LinkedIn', handle: 'Servers World Network' },
                  { label: 'Instagram', handle: '@serversworld' },
                  { label: 'YouTube', handle: 'Servers World Network' },
                ].map((s) => (
                  <a key={s.label} href="#" className="flex items-center justify-between py-2 border-b border-divider group">
                    <div>
                      <p className="text-body-sm font-primary font-semibold text-white">{s.label}</p>
                      <p className="text-body-sm font-secondary text-secondary-text">{s.handle}</p>
                    </div>
                    <span className="text-secondary-text group-hover:text-white transition-colors">→</span>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
