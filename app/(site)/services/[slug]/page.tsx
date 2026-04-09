import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react'
import { notFound } from 'next/navigation'
import { services } from '@/lib/data'
import type { Metadata } from 'next'

export const dynamicParams = false

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return { title: 'Service Not Found' }
  return { title: service.title, description: service.shortDescription }
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-divider">
        <div className="page-container py-4 flex items-center gap-2 text-body-sm font-secondary text-secondary-text">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-white transition-colors">Services</Link>
          <span>/</span>
          <span className="text-white">{service.title}</span>
        </div>
      </div>

      {/* Hero */}
      <div className="border-b border-divider relative overflow-hidden min-h-[340px] flex items-center">
        {service.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={service.coverImage}
              alt={service.title}
              fill
              priority
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/50" />
          </div>
        )}
        <div className="page-container py-16 relative z-10">
          <span className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text block mb-4">
            {service.category.replace('_', ' ')}
          </span>
          <h1 className="text-headline-lg font-primary font-bold text-white mb-5 max-w-2xl">{service.title}</h1>
          <p className="text-secondary-text text-body-lg font-secondary leading-relaxed mb-8 max-w-2xl">{service.shortDescription}</p>

          {service.pricing && (
            <div className="border border-white/20 bg-white/5 backdrop-blur-sm p-5 inline-block mb-8">
              <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-1">Starting From</p>
              <p className="text-title-lg font-primary font-bold text-white">{service.pricing.startingFrom}</p>
              {service.pricing.pricingNote && (
                <p className="text-secondary-text text-body-sm font-secondary mt-1">{service.pricing.pricingNote}</p>
              )}
            </div>
          )}

          <div className="flex gap-4">
            <Link href="/contact" className="btn-primary">
              GET A QUOTE <ArrowRight size={14} />
            </Link>
            <Link href="/services" className="btn-ghost flex items-center gap-2">
              <ArrowLeft size={14} /> Back to Services
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="page-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Description */}
          <div className="lg:col-span-2">
            {service.description && (
              <div>
                <h2 className="font-primary font-semibold text-title-lg text-white mb-6">About This Service</h2>
                <p className="text-secondary-text text-body-lg font-secondary leading-relaxed">{service.description}</p>
              </div>
            )}
          </div>

          {/* Features */}
          {service.features && service.features.length > 0 && (
            <div>
              <h2 className="font-primary font-semibold text-title-md text-white mb-6">Key Features</h2>
              <div className="space-y-4">
                {service.features.map((f, i) => (
                  <div key={i} className="border border-divider p-5">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={16} className="text-white/60 mt-0.5 shrink-0" />
                      <div>
                        <p className="font-primary font-semibold text-body-md text-white">{f.title}</p>
                        {f.description && (
                          <p className="text-secondary-text text-body-sm font-secondary mt-1 leading-relaxed">{f.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-divider bg-surface/20">
        <div className="page-container py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-primary font-bold text-title-lg text-white mb-1">Ready to get started?</h3>
            <p className="text-secondary-text font-secondary text-body-md">Let&apos;s discuss your project requirements.</p>
          </div>
          <Link href="/contact" className="btn-primary whitespace-nowrap">
            CONTACT US <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
