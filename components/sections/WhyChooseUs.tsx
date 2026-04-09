import Image from 'next/image'
import { Zap, Target, Clock, Shield, Globe, Users } from 'lucide-react'

const BG = 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1800&q=80&auto=format&fit=crop'

const reasons = [
  { icon: Zap,    title: 'Cutting-Edge Technology',   desc: 'We deploy the latest tech stack and frameworks to build future-proof solutions that scale with your business.' },
  { icon: Target, title: 'Results-Driven Approach',    desc: "Every project is measured against clear KPIs. We're not done until you see tangible business outcomes." },
  { icon: Clock,  title: '24/7 Expert Support',        desc: 'Our dedicated team is always available. Your systems never sleep, and neither does our support.' },
  { icon: Shield, title: 'Security-First Design',      desc: 'Enterprise-grade security baked into every layer of your infrastructure and application.' },
  { icon: Globe,  title: 'Global-Scale Infrastructure',desc: 'Built for international reach with 99.9% uptime SLA and multi-region deployment capabilities.' },
  { icon: Users,  title: 'Dedicated Team Model',       desc: 'Work directly with senior engineers and specialists, not account managers or intermediaries.' },
]

export default function WhyChooseUs({ heading }: { heading?: string }) {
  return (
    <section className="relative py-section overflow-hidden border-b border-divider">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src={BG} alt="" fill className="object-cover opacity-10" />
        <div className="absolute inset-0 bg-background/80" />
      </div>

      <div className="page-container relative z-10">
        <div className="text-center mb-14">
          <p className="section-label mb-3">WHY SERVERS WORLD NETWORK</p>
          <h2 className="section-heading">{heading || 'The Difference Is in Our Precision'}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-divider border border-divider">
          {reasons.map((reason, i) => {
            const Icon = reason.icon
            return (
              <div key={i} className="bg-background/60 backdrop-blur-sm p-8 hover:bg-surface/60 transition-colors group">
                <div className="flex h-11 w-11 items-center justify-center border border-divider group-hover:border-white/40 mb-5 transition-colors">
                  <Icon size={20} className="text-white/50 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-primary font-semibold text-title-md text-white mb-3">{reason.title}</h3>
                <p className="text-secondary-text text-body-md font-secondary leading-relaxed">{reason.desc}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
