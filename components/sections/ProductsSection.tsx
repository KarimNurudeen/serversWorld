import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ui/ProductCard'

const BG = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=80&auto=format&fit=crop'

interface Product {
  _id: string
  title: string
  slug: { current: string }
  shortDescription?: string
  images?: Array<{ asset: { _ref: string } }>
  coverImage?: string
  price?: { amount: number; currency: string; billingCycle?: string }
  category?: string
}

const UNS = 'https://images.unsplash.com'
const fallbackProducts: Product[] = [
  {
    _id: '1',
    title: 'ServerPulse Monitoring',
    slug: { current: 'serverpulse' },
    shortDescription: 'Real-time server and application monitoring dashboard with intelligent alerting and anomaly detection.',
    coverImage: `${UNS}/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format&fit=crop`,
    category: 'devtools',
    price: { amount: 29, currency: 'USD', billingCycle: 'monthly' },
  },
  {
    _id: '2',
    title: 'SecureBox Vault',
    slug: { current: 'securebox' },
    shortDescription: 'End-to-end encrypted document and credential vault built for distributed teams.',
    coverImage: `${UNS}/photo-1614064641938-3bbee52942c7?w=800&q=80&auto=format&fit=crop`,
    category: 'security',
    price: { amount: 19, currency: 'USD', billingCycle: 'monthly' },
  },
  {
    _id: '3',
    title: 'FlowForm Builder',
    slug: { current: 'flowform' },
    shortDescription: 'Drag-and-drop form builder with workflow automation and native CRM integrations.',
    coverImage: `${UNS}/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop`,
    category: 'productivity',
    price: { amount: 0, currency: 'USD' },
  },
  {
    _id: '4',
    title: 'InfraKit Starter Pack',
    slug: { current: 'infrakit' },
    shortDescription: 'A curated bundle of DevOps scripts, IaC templates, and CI/CD pipelines for fast bootstrapping.',
    coverImage: `${UNS}/photo-1593720213428-28a5b9e94613?w=800&q=80&auto=format&fit=crop`,
    category: 'devtools',
    price: { amount: 49, currency: 'USD', billingCycle: 'one-time' },
  },
]

export default function ProductsSection({ products, heading }: { products?: Product[]; heading?: string }) {
  const items = products && products.length > 0 ? products : fallbackProducts

  return (
    <section className="relative py-section border-b border-divider overflow-hidden">
      <div className="absolute inset-0">
        <Image src={BG} alt="" fill className="object-cover" style={{ opacity: 0.06 }} />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/90 to-background/80" />
      </div>
      <div className="page-container relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">DIGITAL PRODUCTS</p>
            <h2 className="section-heading">{heading || 'Tools Built by Practitioners'}</h2>
          </div>
          <Link href="/products" className="btn-outline hidden sm:flex items-center gap-2">
            ALL PRODUCTS <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Link href="/products" className="btn-outline flex items-center justify-center gap-2 w-full">
            ALL PRODUCTS <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
