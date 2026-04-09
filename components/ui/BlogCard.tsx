import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight } from 'lucide-react'

interface BlogCardProps {
  title: string
  slug: { current: string }
  excerpt?: string
  coverImage?: string
  categories?: string[]
  readTime?: number
  publishedAt?: string
  author?: { name: string; role?: string }
  variant?: 'default' | 'horizontal' | 'compact'
}

export default function BlogCard({
  title, slug, excerpt, coverImage, categories, readTime, publishedAt, author, variant = 'default',
}: BlogCardProps) {
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : null

  if (variant === 'compact') {
    return (
      <Link href={`/blog/${slug.current}`} className="flex gap-4 group">
        {coverImage && (
          <div className="shrink-0 w-16 h-16 overflow-hidden border border-divider">
            <Image
              src={coverImage}
              alt={title}
              width={64}
              height={64}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}
        <div>
          <h4 className="text-body-md font-primary font-semibold text-white group-hover:text-white/80 transition-colors line-clamp-2 mb-1">
            {title}
          </h4>
          {date && <p className="text-body-sm font-secondary text-secondary-text">{date}</p>}
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${slug.current}`} className="card-stitched group flex flex-col">
      {coverImage ? (
        <div className="overflow-hidden border-b border-divider -mx-6 -mt-6 mb-5 h-48">
          <Image
            src={coverImage}
            alt={title}
            width={600}
            height={300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      ) : (
        <div
          className="border-b border-divider -mx-6 -mt-6 mb-5 h-36 bg-surface/60 relative overflow-hidden flex items-center justify-center"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.12) 1px, transparent 0)`,
            backgroundSize: '20px 20px',
          }}
        >
          {categories && categories[0] && (
            <span className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text">
              {categories[0]}
            </span>
          )}
        </div>
      )}
      {categories && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {categories.slice(0, 2).map((cat) => (
            <span key={cat} className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text border border-divider px-2 py-0.5">
              {cat}
            </span>
          ))}
        </div>
      )}
      <h3 className="font-primary font-semibold text-title-md text-white mb-2 group-hover:text-white/90 line-clamp-2">
        {title}
      </h3>
      {excerpt && (
        <p className="text-secondary-text text-body-md font-secondary line-clamp-3 mb-4 leading-relaxed">{excerpt}</p>
      )}
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-divider">
        <div className="flex items-center gap-3">
          {author && (
            <span className="text-body-sm font-secondary text-secondary-text">{author.name}</span>
          )}
          {readTime && (
            <div className="flex items-center gap-1 text-secondary-text text-body-sm font-secondary">
              <Clock size={12} />
              <span>{readTime} min</span>
            </div>
          )}
        </div>
        <ArrowRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
      </div>
    </Link>
  )
}
