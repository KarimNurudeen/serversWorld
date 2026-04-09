import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Tag } from 'lucide-react'

interface ProductCardProps {
  title: string
  slug: { current: string }
  shortDescription?: string
  images?: Array<{ asset: { _ref: string } }>
  coverImage?: string
  price?: { amount: number; currency: string; billingCycle?: string }
  category?: string
  upcoming?: boolean
  releaseDate?: string
}

export default function ProductCard({
  title, slug, shortDescription, images, coverImage, price, category, upcoming, releaseDate,
}: ProductCardProps) {
  const imgSrc = coverImage ?? null

  return (
    <Link href={`/products/${slug.current}`} className="card-stitched group flex flex-col">
      {imgSrc ? (
        <div className="overflow-hidden border-b border-divider -mx-6 -mt-6 mb-5 h-48 relative">
          <Image
            src={imgSrc}
            alt={title}
            width={600}
            height={300}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          />
          {upcoming && (
            <div className="absolute top-3 left-3 bg-background/90 backdrop-blur border border-white/30 px-3 py-1">
              <span className="text-label-sm font-primary font-bold uppercase tracking-wider text-white">Upcoming</span>
            </div>
          )}
        </div>
      ) : (
        <div className="border-b border-divider -mx-6 -mt-6 mb-5 h-48 bg-surface relative overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.5) 1px, transparent 0)`,
              backgroundSize: '24px 24px',
            }}
          />
          <Tag size={28} className="text-secondary-text relative z-10" />
        </div>
      )}

      {category && (
        <span className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-2">
          {category.replace('_', ' ')}
        </span>
      )}

      <h3 className="font-primary font-semibold text-title-md text-white mb-2 group-hover:text-white/90 line-clamp-2">
        {title}
      </h3>

      {shortDescription && (
        <p className="text-secondary-text text-body-md font-secondary line-clamp-2 mb-4 leading-relaxed">{shortDescription}</p>
      )}

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-divider">
        <div>
          {upcoming && releaseDate ? (
            <span className="text-secondary-text text-body-sm font-secondary">
              Available {new Date(releaseDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </span>
          ) : price ? (
            <div>
              <span className="text-white font-primary font-bold text-title-md">
                ${price.amount}
              </span>
              {price.billingCycle && price.billingCycle !== 'one-time' && (
                <span className="text-secondary-text text-body-sm font-secondary ml-1">/{price.billingCycle === 'monthly' ? 'mo' : 'yr'}</span>
              )}
            </div>
          ) : (
            <span className="text-secondary-text text-body-sm font-secondary">View Details</span>
          )}
        </div>
        <ArrowRight size={16} className="text-white/40 group-hover:text-white transition-colors" />
      </div>
    </Link>
  )
}
