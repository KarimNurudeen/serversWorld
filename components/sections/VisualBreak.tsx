import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const BREAK_IMG = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=85&auto=format&fit=crop'

export default function VisualBreak() {
  return (
    <section className="relative h-[520px] overflow-hidden">
      {/* Full-bleed photo — minimal overlay so image is the hero */}
      <Image
        src={BREAK_IMG}
        alt="Team at work"
        fill
        className="object-cover object-center"
      />
      {/* Very light overlay — just enough for the text strip */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Centred text block */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <p className="font-primary font-bold uppercase tracking-[0.3em] text-white/60 text-label-sm mb-4">
          Why Servers World Network
        </p>
        <h2
          className="font-primary font-bold text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}
        >
          We Believe In The Power<br />Of Digital Collaboration
        </h2>
        <p className="font-secondary text-white/70 text-body-lg max-w-xl leading-relaxed mb-8">
          From Lagos to London, our engineering teams deliver infrastructure and software that empowers African businesses to compete on a global stage.
        </p>
        <Link
          href="/about"
          className="inline-flex items-center gap-2 bg-white text-background font-primary font-bold text-label-md uppercase tracking-wider px-7 py-3.5 hover:bg-white/90 transition-colors"
        >
          Learn About Us <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  )
}
