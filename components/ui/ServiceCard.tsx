import Link from 'next/link'
import { ArrowRight, Code, Cpu, Shield, TrendingUp, Cloud, Headphones, BookOpen, MessageSquare, BarChart3 } from 'lucide-react'
import clsx from 'clsx'

const categoryIcons: Record<string, React.ElementType> = {
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

interface ServiceCardProps {
  title: string
  slug: { current: string }
  category: string
  shortDescription?: string
  icon?: string
  className?: string
}

export default function ServiceCard({ title, slug, category, shortDescription, className }: ServiceCardProps) {
  const Icon = categoryIcons[category] || Code

  return (
    <Link
      href={`/services/${slug.current}`}
      className={clsx('card-stitched group flex flex-col gap-4', className)}
    >
      <div className="flex h-11 w-11 items-center justify-center border border-divider group-hover:border-white/50 transition-colors">
        <Icon size={20} className="text-white/70 group-hover:text-white transition-colors" />
      </div>
      <div>
        <h3 className="font-primary font-semibold text-title-md text-white mb-2">{title}</h3>
        {shortDescription && (
          <p className="text-secondary-text text-body-md font-secondary leading-relaxed line-clamp-3">{shortDescription}</p>
        )}
      </div>
      <div className="flex items-center gap-2 text-label-md font-primary font-semibold uppercase tracking-wider text-white/60 group-hover:text-white transition-colors mt-auto">
        Learn More <ArrowRight size={14} />
      </div>
    </Link>
  )
}
