import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import PortfolioCard from '@/components/ui/PortfolioCard'

const BG = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1800&q=80&auto=format&fit=crop'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  client?: string
  category?: string
  shortDescription?: string
  mainImage?: { asset: { _ref: string } }
  coverImage?: string
  tags?: string[]
}

const UNS = 'https://images.unsplash.com'
const fallbackProjects: Project[] = [
  {
    _id: '1',
    title: 'Enterprise CRM Reconstruction',
    slug: { current: 'enterprise-crm' },
    client: 'FinEdge Africa',
    category: 'CRM / ERP',
    shortDescription: 'End-to-end rebuild of a legacy CRM system serving 50,000+ users across 12 African markets.',
    coverImage: `${UNS}/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop`,
    tags: ['React', 'Node.js', 'PostgreSQL'],
  },
  {
    _id: '2',
    title: 'AI-Powered Analytics Dashboard',
    slug: { current: 'ai-analytics-dashboard' },
    client: 'Meridian Holdings',
    category: 'AI Solution',
    shortDescription: 'Real-time business intelligence dashboard with predictive modelling and automated reporting.',
    coverImage: `${UNS}/photo-1551288049-bebda4e38f71?w=1200&q=80&auto=format&fit=crop`,
    tags: ['Python', 'Next.js', 'TensorFlow'],
  },
  {
    _id: '3',
    title: 'E-Commerce Platform Overhaul',
    slug: { current: 'ecommerce-overhaul' },
    client: 'Stackwell Labs',
    category: 'E-Commerce',
    shortDescription: 'Full-stack e-commerce rebuild with headless architecture, payment integration, and multi-vendor support.',
    coverImage: `${UNS}/photo-1556742049-0cfed4f6a45d?w=1200&q=80&auto=format&fit=crop`,
    tags: ['Next.js', 'Stripe', 'Paystack'],
  },
]

export default function PortfolioSection({ projects, heading }: { projects?: Project[]; heading?: string }) {
  const items = projects && projects.length > 0 ? projects : fallbackProjects

  return (
    <section className="relative py-section border-b border-divider overflow-hidden">
      <div className="absolute inset-0">
        <Image src={BG} alt="" fill className="object-cover" style={{ opacity: 0.07 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>
      <div className="page-container relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">PORTFOLIO HIGHLIGHTS</p>
            <h2 className="section-heading">{heading || 'Work That Speaks for Itself'}</h2>
          </div>
          <Link href="/portfolio" className="btn-outline hidden sm:flex items-center gap-2">
            ALL PROJECTS <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l border-t border-divider">
          <div className="col-span-2 border-r border-b border-divider">
            <PortfolioCard {...items[0]} className="" />
          </div>
          <div className="flex flex-col border-r border-divider">
            <div className="border-b border-divider flex-1">
              <PortfolioCard {...items[1]} className="" />
            </div>
            {items[2] && (
              <div className="flex-1">
                <PortfolioCard {...items[2]} className="" />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 sm:hidden">
          <Link href="/portfolio" className="btn-outline flex items-center justify-center gap-2 w-full">
            ALL PROJECTS <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
