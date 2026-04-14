import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MapPin, Users, Globe, Award, Zap, Shield, TrendingUp, Heart, BookOpen, ChevronRight } from 'lucide-react'
import { TwitterIcon, LinkedinIcon, GithubIcon } from '@/components/ui/SocialIcons'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import { team, testimonials } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About Us — Servers World Network' }

const stats = [
  { value: '7+',   label: 'Years of Experience', icon: Award },
  { value: '120+', label: 'Projects Delivered',  icon: Zap },
  { value: '40+',  label: 'Enterprise Clients',  icon: Users },
  { value: '12',   label: 'Countries Served',    icon: Globe },
]

const values = [
  { icon: Zap,        title: 'Precision Engineering', desc: 'Every line of code, every infrastructure decision is made with deliberate care and technical excellence.' },
  { icon: Heart,      title: 'Client Partnership',    desc: "We don't just build products — we build relationships. Your success defines our success." },
  { icon: TrendingUp, title: 'Innovation First',      desc: 'We stay ahead of the technological curve so our clients always have access to the best solutions.' },
  { icon: Shield,     title: 'Security & Trust',      desc: 'We handle your data and systems with enterprise-grade security standards and complete transparency.' },
  { icon: MapPin,     title: 'Pan-African Vision',    desc: "Rooted in Nigeria, serving Africa, reaching the world. We believe in the continent's digital potential." },
  { icon: BookOpen,   title: 'Continuous Learning',   desc: 'Technology never stops evolving, and neither do we. Our team invests deeply in upskilling and research.' },
]

const milestones = [
  { year: '2017', title: 'Founded in Lagos',         desc: 'Started as a two-person infrastructure consultancy serving local SMEs.' },
  { year: '2019', title: 'First Enterprise Client',  desc: 'Delivered a critical cloud migration for a 500-seat financial institution.' },
  { year: '2021', title: 'Product Division Launched',desc: 'Began building in-house SaaS products to solve recurring client pain points.' },
  { year: '2023', title: 'Pan-African Expansion',    desc: 'Extended operations to Ghana, Kenya, and South Africa with regional delivery teams.' },
  { year: '2024', title: 'AI & Automation Practice', desc: 'Launched dedicated AI/ML division, serving enterprises across three continents.' },
]

/* ─── reusable section background ─────────────────────────────────────────── */
function SectionBg({ src, gradient = 'from-background/80 via-background/60 to-background/40' }: { src: string; gradient?: string }) {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Image src={src} alt="" fill className="object-cover opacity-30" />
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
    </div>
  )
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">

      {/* ── 1. Hero ── team collaboration */}
      <div className="relative overflow-hidden border-b border-divider">
        <SectionBg
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&q=80&auto=format&fit=crop"
          gradient="from-background/85 via-background/65 to-background/45"
        />
        <div className="page-container relative z-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <p className="section-label mb-5">WHO WE ARE</p>
            <h1 className="text-headline-lg font-primary font-bold text-white mb-6 leading-tight">
              Architecting Digital<br />
              <span style={{ color: 'var(--accent)' }}>Excellence</span> for Africa
            </h1>
            <p className="text-secondary-text text-body-lg font-secondary leading-relaxed mb-10 max-w-xl">
              Servers World Network is a pan-African technology company delivering high-density infrastructure, bespoke software, and transformative digital solutions to businesses ready to compete at a global level.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary">WORK WITH US <ArrowRight size={14} /></Link>
              <Link href="/portfolio" className="btn-outline">VIEW OUR WORK</Link>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative z-10 border-t border-divider">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-divider">
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} className="px-8 py-7 flex items-center gap-4 hover:bg-surface/40 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center border border-divider bg-surface shrink-0">
                  <Icon size={18} className="text-white/60" />
                </div>
                <div>
                  <p className="font-primary font-bold text-title-xl text-white leading-none mb-0.5">{value}</p>
                  <p className="font-secondary text-body-sm text-secondary-text">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 2. Story + Mission/Vision ── office workspace */}
      <div className="border-b border-divider relative overflow-hidden">
        <SectionBg
          src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1800&q=80&auto=format&fit=crop"
          gradient="from-background/80 via-background/60 to-background/40"
        />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2">

          {/* Left — story */}
          <div className="lg:border-r border-divider">
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden border-b border-divider">
              <Image
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=1200&q=85&auto=format&fit=crop"
                alt="SWN team at work"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
              <div className="absolute bottom-6 left-8">
                <p className="font-primary font-bold text-white text-title-md">Lagos, Nigeria</p>
                <p className="text-secondary-text text-body-sm font-secondary">Headquarters since 2017</p>
              </div>
            </div>
            <div className="p-10">
              <p className="section-label mb-4">OUR STORY</p>
              <p className="text-secondary-text text-body-lg font-secondary leading-relaxed mb-4">
                We started with a single conviction: that African businesses deserve the same calibre of digital infrastructure and engineering talent that powers the world&apos;s leading tech companies.
              </p>
              <p className="text-secondary-text text-body-md font-secondary leading-relaxed">
                From a small Lagos office in 2017, we have grown into a multi-disciplinary technology company trusted by banks, e-commerce giants, government bodies, and ambitious startups — all united by a drive to lead in the digital era.
              </p>
            </div>
          </div>

          {/* Right — mission + vision */}
          <div className="flex flex-col">
            <div className="flex-1 p-10 border-b border-divider relative overflow-hidden">
              <div className="absolute top-6 right-6 font-primary font-bold text-[80px] leading-none text-white/[0.04] select-none pointer-events-none">01</div>
              <div className="flex h-12 w-12 items-center justify-center border border-divider bg-surface mb-6">
                <Globe size={22} className="text-white/60" />
              </div>
              <p className="section-label mb-4">MISSION</p>
              <h2 className="font-primary font-bold text-title-xl text-white mb-4 leading-snug">Bridge the Infrastructure Gap</h2>
              <p className="text-secondary-text text-body-lg font-secondary leading-relaxed">
                To deliver world-class digital solutions that empower African businesses to grow, compete, and lead in the global digital economy — without compromise on quality or ambition.
              </p>
            </div>
            <div className="flex-1 p-10 relative overflow-hidden">
              <div className="absolute top-6 right-6 font-primary font-bold text-[80px] leading-none text-white/[0.04] select-none pointer-events-none">02</div>
              <div className="flex h-12 w-12 items-center justify-center border border-divider bg-surface mb-6">
                <TrendingUp size={22} className="text-white/60" />
              </div>
              <p className="section-label mb-4">VISION</p>
              <h2 className="font-primary font-bold text-title-xl text-white mb-4 leading-snug">Built on African Soil</h2>
              <p className="text-secondary-text text-body-lg font-secondary leading-relaxed">
                A future where every African business has access to the technology infrastructure and expertise that powers the world&apos;s leading enterprises — built locally, for continental ambition.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Values ── circuit board / technology abstract */}
      <div className="border-b border-divider relative overflow-hidden">
        <SectionBg
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1800&q=80&auto=format&fit=crop"
          gradient="from-background/80 via-background/60 to-background/40"
        />
        <div className="page-container relative z-10 py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <p className="section-label mb-3">OUR VALUES</p>
              <h2 className="section-heading max-w-sm">What Guides Everything We Do</h2>
            </div>
            <p className="text-secondary-text text-body-md font-secondary max-w-sm leading-relaxed">
              Six principles that shape every decision, every project, and every relationship we build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-divider">
            {values.map(({ icon: Icon, title, desc }, i) => (
              <div key={i} className="border-r border-b border-divider p-8 group hover:bg-surface/50 transition-colors relative overflow-hidden">
                <div className="absolute top-4 right-6 font-primary font-bold text-[64px] leading-none text-white/[0.04] select-none pointer-events-none group-hover:text-white/[0.07] transition-colors">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex h-11 w-11 items-center justify-center border border-divider bg-surface mb-6 group-hover:border-white/30 transition-colors">
                  <Icon size={18} className="text-white/60 group-hover:text-white/80 transition-colors" />
                </div>
                <h3 className="font-primary font-semibold text-title-md text-white mb-3">{title}</h3>
                <p className="text-secondary-text text-body-md font-secondary leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. Timeline ── city / infrastructure */}
      <div className="border-b border-divider relative overflow-hidden">
        <SectionBg
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1800&q=80&auto=format&fit=crop"
          gradient="from-background/80 via-background/60 to-background/40"
        />
        <div className="page-container relative z-10 py-20">
          <div className="text-center mb-14">
            <p className="section-label mb-3">OUR JOURNEY</p>
            <h2 className="section-heading">From Startup to Industry Leader</h2>
          </div>
          <div className="relative">
            <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-divider hidden lg:block" />
            <div className="space-y-0">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-0 border-b border-divider last:border-b-0 ${
                    i % 2 === 0 ? '' : 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1'
                  }`}
                >
                  <div className={`p-8 lg:p-12 flex items-center ${i % 2 === 0 ? 'lg:justify-end lg:border-r border-divider' : 'lg:pl-12 lg:border-l border-divider'}`}>
                    <div className={i % 2 === 0 ? 'lg:text-right' : ''}>
                      <p className="font-primary font-bold text-[56px] leading-none mb-1" style={{ color: 'var(--accent)', opacity: 0.7 }}>{m.year}</p>
                      <h3 className="font-primary font-bold text-title-lg text-white">{m.title}</h3>
                    </div>
                  </div>
                  <div className={`px-8 pb-8 pt-0 lg:p-12 flex items-center ${i % 2 === 0 ? '' : 'lg:justify-end lg:border-r border-divider lg:text-right'}`}>
                    <p className="text-secondary-text text-body-lg font-secondary leading-relaxed max-w-xs">{m.desc}</p>
                  </div>
                  <div className="absolute left-[calc(50%-6px)] top-1/2 -translate-y-1/2 w-3 h-3 border-2 border-white/40 bg-background rounded-full hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── 5. Team ── office interior */}
      <div className="border-b border-divider relative overflow-hidden">
        <SectionBg
          src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1800&q=80&auto=format&fit=crop"
          gradient="from-background/80 via-background/60 to-background/40"
        />
        <div className="page-container relative z-10 py-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div>
              <p className="section-label mb-3">THE TEAM</p>
              <h2 className="section-heading max-w-sm">The People Behind the Platform</h2>
            </div>
            <p className="text-secondary-text text-body-md font-secondary max-w-sm leading-relaxed">
              Senior engineers, strategists, and operators united by a single purpose: building exceptional digital solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-divider">
            {team.map((member) => (
              <div key={member._id} className="border-r border-b border-divider group overflow-hidden">
                <div className="relative overflow-hidden aspect-[4/3] border-b border-divider">
                  {member.coverImage ? (
                    <Image
                      src={member.coverImage}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-surface flex items-center justify-center">
                      <span className="text-5xl font-primary font-bold text-white/20">{member.name[0]}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  {member.department && (
                    <p className="text-label-sm font-primary font-bold uppercase tracking-wider mb-1" style={{ color: 'var(--accent)', opacity: 0.8 }}>
                      {member.department}
                    </p>
                  )}
                  <h3 className="font-primary font-bold text-title-md text-white mb-0.5">{member.name}</h3>
                  {member.role && <p className="text-secondary-text text-body-sm font-secondary mb-4">{member.role}</p>}
                  {member.bio && (
                    <p className="text-secondary-text text-body-sm font-secondary leading-relaxed line-clamp-3 mb-5 border-t border-divider pt-4">{member.bio}</p>
                  )}
                  <div className="flex gap-3">
                    {member.socials?.linkedin && (
                      <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                        className="flex h-7 w-7 items-center justify-center border border-divider text-secondary-text hover:text-white hover:border-white/40 transition-colors">
                        <LinkedinIcon size={12} />
                      </a>
                    )}
                    {member.socials?.twitter && (
                      <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                        className="flex h-7 w-7 items-center justify-center border border-divider text-secondary-text hover:text-white hover:border-white/40 transition-colors">
                        <TwitterIcon size={12} />
                      </a>
                    )}
                    {member.socials?.github && (
                      <a href={member.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                        className="flex h-7 w-7 items-center justify-center border border-divider text-secondary-text hover:text-white hover:border-white/40 transition-colors">
                        <GithubIcon size={12} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 6. Testimonials ── */}
      <TestimonialsSection testimonials={testimonials} />

      {/* ── 7. CTA ── aerial / global network */}
      <div className="border-t border-divider relative overflow-hidden">
        <SectionBg
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1800&q=80&auto=format&fit=crop"
          gradient="from-background/80 via-background/60 to-background/40"
        />
        <div className="page-container relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-4">JOIN THE JOURNEY</p>
              <h2 className="section-heading mb-4">Ready to Build Something Extraordinary?</h2>
              <p className="text-secondary-text text-body-lg font-secondary leading-relaxed">
                Whether you&apos;re a business looking to transform digitally or a talent wanting to build the future of African technology — we&apos;d love to hear from you.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 lg:justify-end">
              <Link href="/contact" className="btn-primary flex items-center gap-2">
                START A PROJECT <ArrowRight size={14} />
              </Link>
              <Link href="/services" className="btn-outline flex items-center gap-2">
                EXPLORE SERVICES <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
