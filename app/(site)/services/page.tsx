import { Code, Cpu, Shield, TrendingUp, Cloud, Headphones, BookOpen, MessageSquare, BarChart3, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { services } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Services' }

const categories = [
  { id: 'development', label: 'Development', icon: Code },
  { id: 'ai_data', label: 'AI & Data', icon: Cpu },
  { id: 'business_systems', label: 'Business Systems', icon: BarChart3 },
  { id: 'digital_growth', label: 'Digital Growth', icon: TrendingUp },
  { id: 'cloud_infrastructure', label: 'Cloud & Infrastructure', icon: Cloud },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'communication', label: 'Communication', icon: MessageSquare },
  { id: 'support', label: 'Support', icon: Headphones },
  { id: 'training', label: 'Training', icon: BookOpen },
]

export default function ServicesPage() {
  const groupedServices = categories.map((cat) => ({
    ...cat,
    services: services.filter((s) => s.category === cat.id),
  }))

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-divider relative overflow-hidden min-h-[300px] flex items-center">
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
          <p className="text-secondary-text text-body-lg font-secondary max-w-2xl">
            From enterprise software development to AI automation, cloud infrastructure, and cybersecurity — we architect comprehensive digital solutions tailored to your business.
          </p>
        </div>
      </div>

      {/* Service Categories */}
      <div className="page-container py-16 space-y-20">
        {groupedServices.map((cat) => {
          const Icon = cat.icon
          return (
            <div key={cat.id} id={cat.id}>
              <div className="flex items-center gap-4 mb-8 pb-5 border-b border-divider">
                <div className="flex h-12 w-12 items-center justify-center border border-divider">
                  <Icon size={22} className="text-white/70" />
                </div>
                <h2 className="font-primary font-bold text-title-lg text-white">{cat.label}</h2>
              </div>

              {cat.services.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-divider">
                  {cat.services.map((service) => (
                    <Link
                      key={service._id}
                      href={`/services/${service.slug}`}
                      className="border-r border-b border-divider p-7 group hover:bg-surface/50 transition-colors"
                    >
                      <h3 className="font-primary font-semibold text-title-md text-white mb-2 group-hover:text-white/90">{service.title}</h3>
                      <p className="text-secondary-text text-body-md font-secondary leading-relaxed line-clamp-3 mb-4">{service.shortDescription}</p>
                      <div className="flex items-center gap-2 text-label-md font-primary font-semibold uppercase tracking-wider text-white/40 group-hover:text-white transition-colors">
                        View Details <ArrowRight size={13} />
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="border border-divider p-8 bg-surface/20 text-center">
                  <p className="text-secondary-text font-secondary text-body-md">
                    Services in this category coming soon.{' '}
                    <Link href="/contact" className="text-white underline hover:no-underline">Contact us</Link> to discuss your needs.
                  </p>
                </div>
              )}
            </div>
          )
        })}
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
