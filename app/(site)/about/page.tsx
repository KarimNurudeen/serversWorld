import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { TwitterIcon, LinkedinIcon, GithubIcon } from '@/components/ui/SocialIcons'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import { team, testimonials } from '@/lib/data'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'About Us' }

const values = [
  { title: 'Precision Engineering', desc: 'Every line of code, every infrastructure decision is made with deliberate care and technical excellence.' },
  { title: 'Client Partnership', desc: "We don't just build products — we build relationships. Your success defines our success." },
  { title: 'Innovation First', desc: 'We stay ahead of the technological curve so our clients always have access to the best solutions.' },
  { title: 'Security & Trust', desc: 'We handle your data and systems with enterprise-grade security standards and complete transparency.' },
  { title: 'Pan-African Vision', desc: "Rooted in Nigeria, serving Africa, reaching the world. We believe in the continent's digital potential." },
  { title: 'Continuous Learning', desc: 'Technology never stops evolving, and neither do we. Our team invests deeply in upskilling and research.' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-divider relative overflow-hidden min-h-[380px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&q=85&auto=format&fit=crop"
            alt="Team collaboration"
            fill
            priority
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
        </div>
        <div className="page-container py-20 relative z-10">
          <p className="section-label mb-4">WHO WE ARE</p>
          <h1 className="text-headline-lg font-primary font-bold text-white mb-6 max-w-2xl">
            Architecting Digital Excellence Since Day One
          </h1>
          <p className="text-secondary-text text-body-lg font-secondary leading-relaxed max-w-2xl">
            Servers World Network is a pan-African technology company delivering high-density infrastructure, bespoke software, and transformative digital solutions to businesses ready to compete at a global level.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="border-b border-divider">
        <div className="page-container py-16 grid grid-cols-1 md:grid-cols-2 gap-0 border-l border-t border-divider">
          <div className="border-r border-b border-divider p-10">
            <h2 className="font-primary font-bold text-title-lg text-white mb-4">Our Mission</h2>
            <p className="text-secondary-text text-body-lg font-secondary leading-relaxed">
              To bridge the infrastructure gap in Africa and beyond by delivering world-class digital solutions that empower businesses to grow, compete, and lead in the digital economy.
            </p>
          </div>
          <div className="border-r border-b border-divider p-10">
            <h2 className="font-primary font-bold text-title-lg text-white mb-4">Our Vision</h2>
            <p className="text-secondary-text text-body-lg font-secondary leading-relaxed">
              A future where every African business has access to the technology infrastructure and expertise that powers the world&apos;s leading enterprises — built on African soil, for African ambition.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="border-b border-divider">
        <div className="page-container py-16">
          <div className="text-center mb-12">
            <p className="section-label mb-3">OUR VALUES</p>
            <h2 className="section-heading">What Guides Everything We Do</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-l border-t border-divider">
            {values.map((v, i) => (
              <div key={i} className="border-r border-b border-divider p-8 hover:bg-surface/50 transition-colors">
                <div className="text-4xl mb-4 font-primary font-bold text-white/10 select-none">{String(i + 1).padStart(2, '0')}</div>
                <h3 className="font-primary font-semibold text-title-md text-white mb-3">{v.title}</h3>
                <p className="text-secondary-text text-body-md font-secondary leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="border-b border-divider">
        <div className="page-container py-16">
          <div className="text-center mb-12">
            <p className="section-label mb-3">THE TEAM</p>
            <h2 className="section-heading">The People Behind the Platform</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-t border-divider">
            {team.map((member) => (
              <div key={member._id} className="border-r border-b border-divider p-6 group hover:bg-surface/50 transition-colors">
                {member.coverImage ? (
                  <div className="border border-divider overflow-hidden mb-4 aspect-square">
                    <Image
                      src={member.coverImage}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="border border-divider mb-4 aspect-square bg-hint flex items-center justify-center">
                    <span className="text-4xl font-primary font-bold text-white/30">{member.name[0]}</span>
                  </div>
                )}
                <h3 className="font-primary font-semibold text-body-lg text-white">{member.name}</h3>
                {member.role && <p className="text-secondary-text text-body-sm font-secondary mb-1">{member.role}</p>}
                {member.department && (
                  <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-hint mb-3">{member.department}</p>
                )}
                {member.bio && (
                  <p className="text-secondary-text text-body-sm font-secondary line-clamp-3 mb-4">{member.bio}</p>
                )}
                <div className="flex gap-3">
                  {member.socials?.linkedin && (
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
                      className="text-secondary-text hover:text-white transition-colors">
                      <LinkedinIcon size={15} />
                    </a>
                  )}
                  {member.socials?.twitter && (
                    <a href={member.socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter"
                      className="text-secondary-text hover:text-white transition-colors">
                      <TwitterIcon size={15} />
                    </a>
                  )}
                  {member.socials?.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"
                      className="text-secondary-text hover:text-white transition-colors">
                      <GithubIcon size={15} />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <TestimonialsSection testimonials={testimonials} />

      {/* CTA */}
      <div className="border-t border-divider bg-surface/20">
        <div className="page-container py-16 text-center">
          <h2 className="section-heading mb-4">Join Us on This Journey</h2>
          <p className="text-secondary-text text-body-lg font-secondary mb-8 max-w-lg mx-auto">
            Whether you&apos;re a business looking to transform digitally, or a talent wanting to build the future — we&apos;d love to hear from you.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/contact" className="btn-primary">GET IN TOUCH <ArrowRight size={14} /></Link>
            <Link href="/services" className="btn-outline">EXPLORE SERVICES</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
