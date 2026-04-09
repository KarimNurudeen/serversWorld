import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'

interface PortfolioCardProps {
  title: string
  slug: { current: string }
  client?: string
  category?: string
  shortDescription?: string
  mainImage?: { asset: { _ref: string } }
  coverImage?: string
  tags?: string[]
  className?: string
}

export default function PortfolioCard({
  title, slug, client, category, shortDescription, mainImage, coverImage, tags, className = '',
}: PortfolioCardProps) {
  const imgSrc = coverImage ?? null

  return (
    <Link
      href={`/portfolio/${slug.current}`}
      className={`group relative overflow-hidden border border-divider block ${className}`}
    >
      <div className="relative w-full h-full min-h-[280px]">
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
        )}
        {/* Overlay */}
        <div className="absolute inset-0 bg-background/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
          <div>
            {category && (
              <span className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text mb-2 block">
                {category.replace('_', ' ')}
              </span>
            )}
            <h3 className="font-primary font-semibold text-title-lg text-white mb-2">{title}</h3>
            {client && <p className="text-secondary-text text-body-sm font-secondary mb-3">Client: {client}</p>}
            {shortDescription && (
              <p className="text-secondary-text text-body-md font-secondary line-clamp-2 mb-4">{shortDescription}</p>
            )}
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 4).map((tag) => (
                  <span key={tag} className="text-label-sm font-primary font-bold uppercase tracking-wider text-white/60 border border-divider px-2 py-0.5">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Always visible bottom bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-divider px-5 py-3 flex items-center justify-between">
          <h3 className="font-primary font-semibold text-body-lg text-white truncate">{title}</h3>
          <ArrowUpRight size={18} className="shrink-0 text-white/60 group-hover:text-white transition-colors" />
        </div>
      </div>
    </Link>
  )
}
