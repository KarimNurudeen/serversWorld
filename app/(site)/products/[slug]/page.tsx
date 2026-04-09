import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink } from 'lucide-react'
import { notFound } from 'next/navigation'
import { products } from '@/lib/data'
import PaystackButton from '@/components/ui/PaystackButton'
import type { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) return { title: 'Product Not Found' }
  return { title: product.title, description: product.shortDescription }
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find((p) => p.slug === params.slug)
  if (!product) notFound()

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-divider">
        <div className="page-container py-4 flex items-center gap-2 text-body-sm font-secondary text-secondary-text">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-white transition-colors">Products</Link>
          <span>/</span>
          <span className="text-white">{product.title}</span>
        </div>
      </div>

      {/* Product Hero */}
      <div className="border-b border-divider">
        <div className="page-container py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="border border-divider overflow-hidden">
              <Image
                src={product.coverImage}
                alt={product.title}
                width={800}
                height={500}
                className="w-full object-cover"
              />
            </div>

            {/* Info */}
            <div>
              {product.category && (
                <span className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text block mb-3">
                  {product.category.replace('_', ' ')}
                </span>
              )}
              <h1 className="text-headline-md font-primary font-bold text-white mb-4">{product.title}</h1>
              <p className="text-secondary-text text-body-lg font-secondary leading-relaxed mb-6">{product.shortDescription}</p>

              {/* Price */}
              {product.price && (
                <div className="border border-divider p-5 mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-headline-md font-primary font-bold text-white">
                      {product.price.amount === 0 ? 'Free' : `$${product.price.amount}`}
                    </span>
                    {product.price.billingCycle && product.price.billingCycle !== 'one-time' && product.price.amount > 0 && (
                      <span className="text-secondary-text font-secondary">/ {product.price.billingCycle}</span>
                    )}
                  </div>
                  {product.price.billingCycle === 'one-time' && (
                    <p className="text-secondary-text text-body-sm font-secondary mt-1">One-time payment · Lifetime access</p>
                  )}
                </div>
              )}

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-primary font-semibold text-body-md text-white mb-3">What&apos;s included:</h3>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-secondary-text text-body-md font-secondary">
                        <CheckCircle size={15} className="text-white/60 shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="space-y-3">
                {product.price && product.price.amount > 0 ? (
                  <Link href="/contact" className="btn-primary flex items-center justify-center gap-2 w-full">
                    GET ACCESS <ArrowRight size={14} />
                  </Link>
                ) : (
                  <Link href="/contact" className="btn-primary flex items-center justify-center gap-2 w-full">
                    GET STARTED FREE <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      {product.description && (
        <div className="border-b border-divider">
          <div className="page-container py-16">
            <h2 className="font-primary font-semibold text-title-lg text-white mb-8">About This Product</h2>
            <p className="text-secondary-text text-body-lg font-secondary leading-relaxed max-w-3xl">{product.description}</p>
          </div>
        </div>
      )}

      <div className="border-t border-divider">
        <div className="page-container py-8">
          <Link href="/products" className="flex items-center gap-2 text-secondary-text hover:text-white transition-colors font-secondary text-body-md">
            <ArrowLeft size={14} /> Back to Products
          </Link>
        </div>
      </div>
    </div>
  )
}
