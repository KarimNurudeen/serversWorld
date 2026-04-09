import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Code, Cpu, Shield, TrendingUp, Cloud, Headphones, BookOpen, MessageSquare, BarChart3 } from 'lucide-react'

const UNS = 'https://images.unsplash.com'
const BG = `${UNS}/photo-1451187580459-43490279c0fa?w=1800&q=80&auto=format&fit=crop`

const categoryIconMap: Record<string, React.ElementType> = {
  development: Code,
  ai_data: Cpu,
  security: Shield,
  digital_growth: TrendingUp,
  cloud_infrastructure: Cloud,
  support: Headphones,
  training: BookOpen,
  communication: MessageSquare,
  business_systems: BarChart3,
}

const fallbackServices = [
  { _id: '1', title: 'Web & App Development', slug: { current: 'web-app-development' }, category: 'development', shortDescription: 'Custom business websites, e-commerce platforms, and mobile application development.', coverImage: `${UNS}/photo-1461749280684-dccba630e2f6?w=800&q=80&auto=format&fit=crop` },
  { _id: '2', title: 'AI & Data Solutions', slug: { current: 'ai-data' }, category: 'ai_data', shortDescription: 'Automation services, data science solutions, and intelligent AI chatbots.', coverImage: `${UNS}/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format&fit=crop` },
  { _id: '3', title: 'Cybersecurity Services', slug: { current: 'security' }, category: 'security', shortDescription: 'Cybersecurity services, penetration testing, and robust system protection.', coverImage: `${UNS}/photo-1526374965328-7f61d4dc18c5?w=800&q=80&auto=format&fit=crop` },
  { _id: '4', title: 'Business Systems', slug: { current: 'business-systems' }, category: 'business_systems', shortDescription: 'CRM, ERP, POS systems, and management solutions for your enterprise.', coverImage: `${UNS}/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop` },
  { _id: '5', title: 'Digital Growth & Marketing', slug: { current: 'digital-growth' }, category: 'digital_growth', shortDescription: 'SEO, social media management, branding, and content strategies.', coverImage: `${UNS}/photo-1533750516457-a7f992034fec?w=800&q=80&auto=format&fit=crop` },
  { _id: '6', title: 'Cloud & Infrastructure', slug: { current: 'cloud-infrastructure' }, category: 'cloud_infrastructure', shortDescription: 'Web hosting, DevOps, CI/CD pipelines, and API development.', coverImage: `${UNS}/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop` },
]

interface Service {
  _id: string
  title: string
  slug: { current: string }
  category: string
  shortDescription?: string
  coverImage?: string
}

export default function ServicesSection({ services, heading }: { services?: Service[]; heading?: string }) {
  const items = services && services.length > 0 ? services : fallbackServices

  return (
    <section className="relative py-section border-b border-divider overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src={BG} alt="" fill className="object-cover opacity-8" style={{ opacity: 0.08 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      <div className="page-container relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">OUR CAPABILITIES</p>
            <h2 className="section-heading">{heading || 'Categorized Solutions'}</h2>
          </div>
          <Link href="/services" className="btn-outline hidden sm:flex items-center gap-2">
            VIEW ALL SERVICES <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-divider">
          {items.map((service) => {
            const Icon = categoryIconMap[service.category] || Code
            return (
              <Link
                key={service._id}
                href={`/services/${service.slug.current}`}
                className="border-r border-b border-divider group flex flex-col overflow-hidden"
              >
                {/* Image strip */}
                {service.coverImage && (
                  <div className="relative h-40 overflow-hidden border-b border-divider">
                    <Image
                      src={service.coverImage}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-70 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <div className="absolute bottom-3 left-4">
                      <div className="flex h-9 w-9 items-center justify-center border border-white/20 bg-background/50 backdrop-blur-sm">
                        <Icon size={17} className="text-white/70" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="p-7 flex flex-col gap-3 flex-1 group-hover:bg-surface/50 transition-colors">
                  {!service.coverImage && (
                    <div className="flex h-11 w-11 items-center justify-center border border-divider group-hover:border-white/40 transition-colors">
                      <Icon size={20} className="text-white/60 group-hover:text-white transition-colors" />
                    </div>
                  )}
                  <h3 className="font-primary font-semibold text-title-md text-white">{service.title}</h3>
                  {service.shortDescription && (
                    <p className="text-secondary-text text-body-md font-secondary leading-relaxed line-clamp-2">
                      {service.shortDescription}
                    </p>
                  )}
                  <div className="flex items-center gap-2 text-label-md font-primary font-semibold uppercase tracking-wider text-white/40 group-hover:text-white transition-colors mt-auto pt-2">
                    Explore <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <div className="mt-8 sm:hidden">
          <Link href="/services" className="btn-outline flex items-center justify-center gap-2 w-full">
            VIEW ALL SERVICES <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
