import Image from 'next/image'
import Link from 'next/link'
import { Clock, ArrowLeft, Tag } from 'lucide-react'
import { notFound } from 'next/navigation'
import { blogPosts } from '@/lib/data'
import BlogCard from '@/components/ui/BlogCard'
import CommentSection from '@/components/ui/CommentSection'
import type { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return { title: 'Post Not Found' }
  return { title: post.title, description: post.excerpt }
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const date = new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-divider">
        <div className="page-container py-4 flex items-center gap-2 text-body-sm font-secondary text-secondary-text">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{post.title}</span>
        </div>
      </div>

      <div className="page-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Article */}
          <article className="lg:col-span-3">
            <header className="mb-10">
              {post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/blog?category=${cat}`}
                      className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text border border-divider px-3 py-1 hover:border-white/50 hover:text-white transition-colors"
                    >
                      {cat}
                    </Link>
                  ))}
                </div>
              )}
              <h1 className="text-headline-lg font-primary font-bold text-white mb-5 leading-tight">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-5 py-4 border-y border-divider">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 border border-divider bg-hint flex items-center justify-center">
                    <span className="text-white font-primary font-bold text-sm">{post.author.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-white font-primary font-semibold text-body-sm">{post.author.name}</p>
                    {post.author.role && <p className="text-secondary-text text-body-sm font-secondary">{post.author.role}</p>}
                  </div>
                </div>
                <span className="text-secondary-text text-body-sm font-secondary">{date}</span>
                <div className="flex items-center gap-1.5 text-secondary-text text-body-sm font-secondary">
                  <Clock size={14} />
                  <span>{post.readTime} min read</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            <div className="mb-10 border border-divider overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full object-cover"
              />
            </div>

            {/* Article Body */}
            {post.body && (
              <div className="space-y-5 mb-10">
                {post.body.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-secondary-text text-body-lg font-secondary leading-relaxed">{paragraph}</p>
                ))}
              </div>
            )}

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 pt-6 border-t border-divider">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag size={14} className="text-secondary-text" />
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blog?search=${tag}`}
                      className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text border border-divider px-3 py-1 hover:border-white/50 hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Comments */}
            <div className="mt-12">
              <CommentSection postId={post._id} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-10">
            <Link href="/blog" className="flex items-center gap-2 text-secondary-text hover:text-white transition-colors text-body-sm font-secondary">
              <ArrowLeft size={14} /> Back to Blog
            </Link>

            <div>
              <h3 className="section-label mb-5">MORE ARTICLES</h3>
              <div className="space-y-6">
                {related.map((p) => (
                  <BlogCard
                    key={p._id}
                    title={p.title}
                    slug={{ current: p.slug }}
                    coverImage={p.coverImage}
                    readTime={p.readTime}
                    publishedAt={p.publishedAt}
                    variant="compact"
                  />
                ))}
              </div>
            </div>

            <div className="border border-divider p-6">
              <h3 className="section-label mb-4">ABOUT THE AUTHOR</h3>
              <div className="flex items-start gap-3">
                <div className="h-12 w-12 border border-divider bg-hint flex items-center justify-center shrink-0">
                  <span className="text-white font-primary font-bold text-lg">{post.author.name[0]}</span>
                </div>
                <div>
                  <p className="text-white font-primary font-semibold text-body-md">{post.author.name}</p>
                  {post.author.role && <p className="text-secondary-text text-body-sm font-secondary">{post.author.role}</p>}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
