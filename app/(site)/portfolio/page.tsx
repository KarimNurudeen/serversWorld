import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { projects } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Portfolio' }

const CATEGORIES = [
  { value: 'all', label: 'All Work' },
  { value: 'web', label: 'Web Development' },
  { value: 'mobile', label: 'Mobile Apps' },
  { value: 'ecommerce', label: 'E-Commerce' },
  { value: 'ai', label: 'AI Solutions' },
  { value: 'crm_erp', label: 'CRM / ERP' },
  { value: 'cloud', label: 'Cloud & Infra' },
]

export default function PortfolioPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  const activeCategory = searchParams.category || 'all'

  const filtered = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-divider relative overflow-hidden min-h-[300px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1800&q=85&auto=format&fit=crop"
            alt="Portfolio of work"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
        </div>
        <div className="page-container py-16 relative z-10">
          <p className="section-label mb-4">OUR WORK</p>
          <h1 className="text-headline-lg font-primary font-bold text-white mb-4">Portfolio</h1>
          <p className="text-secondary-text text-body-lg font-secondary max-w-2xl">
            A showcase of enterprise solutions, digital products, and infrastructure projects we&apos;ve delivered for clients across Africa and globally.
          </p>
        </div>
      </div>

      <div className="page-container py-12">
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value === 'all' ? '/portfolio' : `/portfolio?category=${cat.value}`}
              className={`px-4 py-2 border text-label-md font-primary font-semibold uppercase tracking-wider transition-colors ${
                activeCategory === cat.value
                  ? 'border-white bg-white text-background'
                  : 'border-divider text-secondary-text hover:border-white/50 hover:text-white'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-divider">
            {filtered.map((project) => (
              <Link
                key={project._id}
                href={`/portfolio/${project.slug}`}
                className="border-r border-b border-divider group relative overflow-hidden min-h-[300px] block"
              >
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-label-sm font-primary font-bold uppercase tracking-widest text-secondary-text block mb-1">
                    {project.category.replace('_', ' ')}
                  </span>
                  <h3 className="font-primary font-semibold text-title-md text-white mb-2">{project.title}</h3>
                  <p className="text-secondary-text text-body-sm font-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Client: {project.client}
                  </p>
                </div>
                <div className="absolute top-4 right-4 h-9 w-9 border border-divider flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-background/70 backdrop-blur-sm">
                  <ArrowUpRight size={16} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-divider">
            <p className="text-secondary-text font-secondary text-body-lg mb-4">No projects in this category yet.</p>
            <Link href="/portfolio" className="text-white underline hover:no-underline font-secondary">View all projects</Link>
          </div>
        )}
      </div>
    </div>
  )
}
