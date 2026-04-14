import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react'
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

  // Related services (same category, excluding current)
  const related = services.filter((s) => s.category === service.category && s.slug !== service.slug)

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

      {/* Hero — no pricing here */}
      <div className="border-b border-divider relative overflow-hidden min-h-[360px] flex items-center">
        {service.coverImage && (
          <div className="absolute inset-0">
            <Image
              src={service.coverImage}
              alt={service.title}
              fill
              priority
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/50" />
          </div>
        )}
        <div className="page-container py-16 relative z-10">
          <span className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text block mb-4">
            {service.category.replace('_', ' ')}
          </span>
          <h1 className="text-headline-lg font-primary font-bold text-white mb-5 max-w-2xl leading-tight">
            {service.title}
          </h1>
          <p className="text-secondary-text text-body-lg font-secondary leading-relaxed max-w-2xl mb-8">
            {service.shortDescription}
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/contact" className="btn-primary">
              GET A QUOTE <ArrowRight size={14} />
            </Link>
            <Link href="/services" className="btn-ghost flex items-center gap-2">
              <ArrowLeft size={14} /> All Services
            </Link>
          </div>
        </div>
      </div>

      {/* About + What We Deliver — full width 2-col */}
      <div className="border-b border-divider">
        <div className="page-container py-16 grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Description */}
          <div className="lg:border-r border-divider lg:pr-12">
            <p className="section-label mb-4">ABOUT THIS SERVICE</p>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-6">
              What We Do
            </h2>
            {service.description ? (
              <p className="text-secondary-text text-body-lg font-secondary leading-relaxed">
                {service.description}
              </p>
            ) : (
              <p className="text-secondary-text text-body-lg font-secondary leading-relaxed">
                {service.shortDescription}
              </p>
            )}
          </div>

          {/* Why choose this service — generic value props */}
          <div className="lg:pl-12 pt-10 lg:pt-0">
            <p className="section-label mb-4">WHY IT MATTERS</p>
            <h2 className="font-primary font-semibold text-title-lg text-white mb-6">
              The Value We Deliver
            </h2>
            <ul className="space-y-4">
              {[
                'Precision-engineered to your exact business requirements',
                'Delivered by specialists with deep domain expertise',
                'Built with security, scalability, and maintainability in mind',
                'Transparent process with regular progress updates',
                'Post-delivery support and iterative improvement',
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-white/50 mt-0.5 shrink-0" />
                  <p className="text-secondary-text text-body-md font-secondary leading-relaxed">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Features / Deliverables — full-width grid */}
      {service.features && service.features.length > 0 && (
        <div className="border-b border-divider">
          <div className="page-container py-16">
            <div className="text-center mb-12">
              <p className="section-label mb-3">WHAT&apos;S INCLUDED</p>
              <h2 className="section-heading">Key Deliverables</h2>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-divider`}>
              {service.features.map((f, i) => (
                <div key={i} className="border-r border-b border-divider p-8 group hover:bg-surface/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 mt-0.5 flex h-8 w-8 items-center justify-center border border-divider text-white/50 font-primary font-bold text-label-sm">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <h3 className="font-primary font-semibold text-title-md text-white mb-2">{f.title}</h3>
                      {f.description && (
                        <p className="text-secondary-text text-body-md font-secondary leading-relaxed">{f.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* How We Work */}
      <div className="border-b border-divider bg-surface/20">
        <div className="page-container py-16">
          <div className="text-center mb-12">
            <p className="section-label mb-3">THE PROCESS</p>
            <h2 className="section-heading">How We Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0 border-l border-t border-divider">
            {[
              { step: '01', title: 'Discovery', desc: 'We start by deeply understanding your business, goals, and constraints through structured workshops and stakeholder interviews.' },
              { step: '02', title: 'Architecture', desc: 'We design the technical approach, map out the scope, and present a clear plan before any development begins.' },
              { step: '03', title: 'Delivery', desc: 'Agile development with regular demos and feedback cycles — no black-box builds. You see progress every week.' },
              { step: '04', title: 'Handover', desc: 'Full documentation, knowledge transfer, and a defined support period to ensure your team is confident operating the solution.' },
            ].map((phase) => (
              <div key={phase.step} className="border-r border-b border-divider p-8">
                <p className="font-primary font-bold text-4xl text-white/10 mb-4 select-none">{phase.step}</p>
                <h3 className="font-primary font-semibold text-title-md text-white mb-3">{phase.title}</h3>
                <p className="text-secondary-text text-body-sm font-secondary leading-relaxed">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related services */}
      {related.length > 0 && (
        <div className="border-b border-divider">
          <div className="page-container py-16">
            <p className="section-label mb-8">RELATED SERVICES</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-divider">
              {related.map((s) => (
                <Link
                  key={s._id}
                  href={`/services/${s.slug}`}
                  className="border-r border-b border-divider p-7 group hover:bg-surface/50 transition-colors"
                >
                  <h3 className="font-primary font-semibold text-title-md text-white mb-2 group-hover:text-white/90">{s.title}</h3>
                  <p className="text-secondary-text text-body-sm font-secondary leading-relaxed line-clamp-2 mb-4">{s.shortDescription}</p>
                  <div className="flex items-center gap-2 text-label-sm font-primary font-semibold uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                    Learn More <ArrowRight size={12} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pricing — always last */}
      {service.pricing && (
        <div className="border-b border-divider">
          <div className="page-container py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-divider">
              <div className="p-10 lg:border-r border-divider">
                <p className="section-label mb-4">INVESTMENT</p>
                <h2 className="font-primary font-bold text-title-lg text-white mb-3">Transparent Pricing</h2>
                <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
                  Every engagement is scoped precisely so there are no surprises. Pricing reflects the complexity, scale, and timeline of your project.
                </p>
              </div>
              <div className="p-10 flex flex-col justify-center">
                <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-2">Starting From</p>
                <p className="text-headline-md font-primary font-bold text-white mb-3">{service.pricing.startingFrom}</p>
                {service.pricing.pricingNote && (
                  <p className="text-secondary-text text-body-sm font-secondary mb-6">{service.pricing.pricingNote}</p>
                )}
                <Link href="/contact" className="btn-primary self-start">
                  GET A CUSTOM QUOTE <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Final CTA */}
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
