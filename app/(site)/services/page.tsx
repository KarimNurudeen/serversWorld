import { Code, Cpu, Shield, TrendingUp, Cloud, Headphones, BookOpen, MessageSquare, BarChart3, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { services } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Services' }

const categories = [
  { id: 'development',       label: 'Development',         icon: Code },
  { id: 'ai_data',           label: 'AI & Data',           icon: Cpu },
  { id: 'business_systems',  label: 'Business Systems',    icon: BarChart3 },
  { id: 'digital_growth',    label: 'Digital Growth',      icon: TrendingUp },
  { id: 'cloud_infrastructure', label: 'Cloud & Infra',   icon: Cloud },
  { id: 'security',          label: 'Security',            icon: Shield },
  { id: 'communication',     label: 'Communication',       icon: MessageSquare },
  { id: 'support',           label: 'Support',             icon: Headphones },
  { id: 'training',          label: 'Training',            icon: BookOpen },
]

export default function ServicesPage() {
  const groupedServices = categories.map((cat) => ({
    ...cat,
    services: services.filter((s) => s.category === cat.id),
  }))

  const activeCategories = groupedServices.filter((cat) => cat.services.length > 0)
  const emptyCategories  = groupedServices.filter((cat) => cat.services.length === 0)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-divider relative overflow-hidden min-h-[320px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=85&auto=format&fit=crop"
            alt="Technology services"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
        </div>
        <div className="page-container py-16 relative z-10">
          <p className="section-label mb-4">WHAT WE DO</p>
          <h1 className="text-headline-lg font-primary font-bold text-white mb-4">Our Services</h1>
          <p className="text-secondary-text text-body-lg font-secondary max-w-2xl leading-relaxed">
            From enterprise software development to AI automation, cloud infrastructure, and cybersecurity — we architect comprehensive digital solutions tailored to your business.
          </p>
        </div>
      </div>

      {/* Stats bar */}
      <div className="border-b border-divider bg-surface/40">
        <div className="page-container py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-divider">
            {[
              { metric: '6+', label: 'Service Categories' },
              { metric: '50+', label: 'Delivered Projects' },
              { metric: '24/7', label: 'Expert Support' },
              { metric: '100%', label: 'Client Satisfaction' },
            ].map((stat) => (
              <div key={stat.label} className="border-r border-b border-divider px-8 py-6 text-center">
                <p className="text-headline-sm font-primary font-bold text-white">{stat.metric}</p>
                <p className="text-secondary-text text-label-sm font-primary font-bold uppercase tracking-wider mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main layout — sticky sidebar + content */}
      <div className="page-container">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-0">
          {/* Sticky sidebar */}
          <aside className="hidden lg:block border-r border-divider">
            <div className="sticky top-20 py-10 pr-6">
              <p className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text mb-4 pl-1">
                Categories
              </p>
              <nav className="space-y-0.5">
                {categories.map((cat) => {
                  const Icon = cat.icon
                  const hasServices = services.some((s) => s.category === cat.id)
                  return (
                    <a
                      key={cat.id}
                      href={`#${cat.id}`}
                      className={`flex items-center gap-3 px-3 py-2.5 transition-colors group ${
                        hasServices
                          ? 'text-secondary-text hover:text-white hover:bg-surface/60'
                          : 'text-white/20 cursor-default pointer-events-none'
                      }`}
                    >
                      <Icon size={14} className="shrink-0" />
                      <span className="text-body-sm font-secondary">{cat.label}</span>
                      {!hasServices && (
                        <span className="ml-auto text-[10px] font-primary font-bold uppercase tracking-wider text-white/20">Soon</span>
                      )}
                    </a>
                  )
                })}
              </nav>

              <div className="mt-10 border-t border-divider pt-8 pl-1">
                <p className="text-secondary-text text-body-sm font-secondary leading-relaxed mb-4">
                  Can&apos;t find what you need?
                </p>
                <Link href="/contact" className="btn-outline text-xs w-full text-center block">
                  TALK TO US
                </Link>
              </div>
            </div>
          </aside>

          {/* Service categories */}
          <main className="lg:pl-12 py-12 space-y-16">
            {/* Active categories */}
            {activeCategories.map((cat) => {
              const Icon = cat.icon
              return (
                <section key={cat.id} id={cat.id} className="scroll-mt-24">
                  {/* Category header */}
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex h-12 w-12 items-center justify-center border border-divider shrink-0">
                      <Icon size={20} className="text-white/70" />
                    </div>
                    <div className="flex-1">
                      <h2 className="font-primary font-bold text-title-lg text-white">{cat.label}</h2>
                    </div>
                    <Link
                      href={`/services?category=${cat.id}`}
                      className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      View All <ArrowRight size={12} />
                    </Link>
                  </div>

                  {/* Service cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-divider">
                    {cat.services.map((service) => (
                      <Link
                        key={service._id}
                        href={`/services/${service.slug}`}
                        className="border-r border-b border-divider group hover:bg-surface/50 transition-colors overflow-hidden"
                      >
                        {/* Image thumbnail */}
                        {service.coverImage && (
                          <div className="relative h-44 overflow-hidden border-b border-divider">
                            <Image
                              src={service.coverImage}
                              alt={service.title}
                              fill
                              className="object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                            {service.pricing && (
                              <div className="absolute bottom-3 left-4">
                                <span className="font-primary font-bold text-label-sm uppercase tracking-wider text-white/60">
                                  From {service.pricing.startingFrom}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                        {/* Card body */}
                        <div className="p-7">
                          <h3 className="font-primary font-semibold text-title-md text-white mb-2 group-hover:text-white/90">
                            {service.title}
                          </h3>
                          <p className="text-secondary-text text-body-md font-secondary leading-relaxed line-clamp-2 mb-5">
                            {service.shortDescription}
                          </p>
                          <div className="flex items-center gap-2 text-label-sm font-primary font-bold uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                            View Details <ArrowRight size={12} />
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )
            })}

            {/* Coming-soon categories */}
            {emptyCategories.length > 0 && (
              <section>
                <div className="border border-divider p-8">
                  <p className="section-label mb-4">COMING SOON</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {emptyCategories.map((cat) => {
                      const Icon = cat.icon
                      return (
                        <div key={cat.id} className="flex items-center gap-3 text-secondary-text/40">
                          <Icon size={14} />
                          <span className="font-secondary text-body-sm">{cat.label}</span>
                        </div>
                      )
                    })}
                  </div>
                  <p className="text-secondary-text text-body-sm font-secondary mt-5">
                    Interested in one of these areas?{' '}
                    <Link href="/contact" className="text-white underline underline-offset-2 hover:no-underline">
                      Get in touch
                    </Link>
                    .
                  </p>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-divider bg-surface/20">
        <div className="page-container py-16 text-center">
          <h2 className="section-heading mb-4">Don&apos;t See What You Need?</h2>
          <p className="text-secondary-text text-body-lg font-secondary mb-8 max-w-lg mx-auto">
            We build custom solutions. Tell us about your challenge and our team will architect the right approach.
          </p>
          <Link href="/contact" className="btn-primary">
            START A CONVERSATION <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
