'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Play } from 'lucide-react'
import { useAppearance } from '@/context/AppearanceContext'
import { defaultAppearance } from '@/types/appearance'

export default function HeroSection() {
  const { settings } = useAppearance()
  const s = settings ?? defaultAppearance

  const lines = s.heroHeadline.split(/\\n|\n/)

  return (
    <section className="relative min-h-screen flex flex-col">

      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={s.heroImageUrl}
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center w-full py-24 lg:py-32">
        <div className="w-full px-5">
          <div className="w-full bg-black/50 backdrop-blur-sm px-5 py-12">
            {/* Eyebrow */}
            <span className="inline-block border border-white/30 bg-white/10 px-4 py-1.5 text-label-sm font-primary font-bold uppercase tracking-widest text-white/80 mb-6">
              {s.siteName}
            </span>

            {/* Headline */}
            <h1 className="font-primary font-bold text-white leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}>
              {lines.map((line, i) => (
                <span key={i}>{line}{i < lines.length - 1 && <br />}</span>
              ))}
            </h1>

            {/* Subtext */}
            <p className="font-secondary text-white/70 text-body-lg leading-relaxed mb-10 max-w-xl">
              {s.heroSubtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={s.heroCta1Href}
                className="inline-flex items-center gap-2 bg-white text-background font-primary font-bold text-label-md uppercase tracking-wider px-7 py-3.5 hover:bg-white/90 transition-colors"
              >
                {s.heroCta1Label}
              </Link>
              <Link
                href={s.heroCta2Href}
                className="inline-flex items-center gap-2 border border-white/40 text-white font-primary font-semibold text-label-md uppercase tracking-wider px-7 py-3.5 hover:bg-white/10 hover:border-white/60 transition-colors"
              >
                <Play size={14} fill="currentColor" />
                {s.heroCta2Label}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 bg-black/50 backdrop-blur-sm border-t border-white/10">
        <div className="page-container">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { metric: '500+', label: 'Projects Delivered' },
              { metric: '50+',  label: 'Enterprise Clients' },
              { metric: '12',   label: 'African Markets' },
              { metric: '24/7', label: 'Expert Support' },
            ].map(({ metric, label }) => (
              <div key={label} className="px-6 py-5 text-center">
                <p className="font-primary font-bold text-title-lg text-white">{metric}</p>
                <p className="text-label-sm font-secondary text-white/50 mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  )
}
