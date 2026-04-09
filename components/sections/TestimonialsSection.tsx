import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

const BG = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1800&q=80&auto=format&fit=crop'

interface Testimonial {
  _id: string
  name: string
  role?: string
  company?: string
  content?: string
  rating?: number
}

const fallbackTestimonials: Testimonial[] = [
  { _id: '1', name: 'David Okafor',    role: 'CTO',            company: 'FinEdge Africa',    content: 'Servers World Network transformed our entire infrastructure. Their team understands both the technical depth and the business urgency required at our scale.', rating: 5 },
  { _id: '2', name: 'Sara Al-Rashidi', role: 'Head of Digital', company: 'Meridian Holdings', content: 'The precision and reliability of their cloud systems gave us the confidence to expand regionally. Truly a top-tier engineering partner.', rating: 5 },
  { _id: '3', name: 'James Whitfield', role: 'Founder',         company: 'Stackwell Labs',     content: 'From concept to deployment in 6 weeks. They delivered exactly what we scoped without the usual overruns. Exceptional execution.', rating: 5 },
]

export default function TestimonialsSection({ testimonials, heading }: { testimonials?: Testimonial[]; heading?: string }) {
  const items = testimonials && testimonials.length > 0 ? testimonials : fallbackTestimonials

  return (
    <section className="relative py-section overflow-hidden border-b border-divider">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image src={BG} alt="" fill className="object-cover opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/70 to-background/85" />
      </div>

      <div className="page-container relative z-10">
        <div className="text-center mb-14">
          <p className="section-label mb-3">CLIENT TESTIMONIALS</p>
          <h2 className="section-heading">{heading || 'What Our Clients Say'}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t._id} className="border border-divider bg-background/60 backdrop-blur-sm p-7 flex flex-col gap-4 hover:bg-surface/60 transition-colors">
              <Quote size={28} className="text-white/20" />
              <p className="text-secondary-text text-body-md font-secondary leading-relaxed flex-1 italic">
                &ldquo;{t.content}&rdquo;
              </p>
              {t.rating && (
                <div className="flex gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
              )}
              <div className="flex items-center gap-3 pt-4 border-t border-divider">
                <div className="h-10 w-10 border border-divider bg-surface flex items-center justify-center shrink-0">
                  <span className="text-white font-primary font-bold text-sm">{t.name[0]}</span>
                </div>
                <div>
                  <p className="text-white font-primary font-semibold text-body-md">{t.name}</p>
                  {(t.role || t.company) && (
                    <p className="text-secondary-text text-body-sm font-secondary">
                      {t.role}{t.role && t.company ? ', ' : ''}{t.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
