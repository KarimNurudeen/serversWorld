'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ArrowRight, CheckCircle, Loader2 } from 'lucide-react'

const BG = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&q=80&auto=format&fit=crop'

export default function NewsletterForm({ heading, subtext }: { heading?: string; subtext?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    // In production, connect to your email marketing service
    await new Promise((r) => setTimeout(r, 1000))
    setStatus('success')
    setEmail('')
  }

  return (
    <section className="relative border-y border-divider overflow-hidden">
      <div className="absolute inset-0">
        <Image src={BG} alt="" fill className="object-cover object-center" style={{ opacity: 0.15 }} />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/95" />
      </div>
      <div className="page-container py-16 text-center relative z-10">
        <p className="section-label mb-3">Newsletter</p>
        <h2 className="section-heading mb-3">{heading || 'Stay Ahead of the Digital Curve'}</h2>
        <p className="text-secondary-text text-body-lg font-secondary max-w-lg mx-auto mb-8">
          {subtext || 'Get the latest insights on technology, AI, and digital transformation delivered to your inbox.'}
        </p>

        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 text-white">
            <CheckCircle size={20} />
            <span className="font-secondary text-body-lg">You&apos;re subscribed! Welcome aboard.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="input-field flex-1"
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-primary whitespace-nowrap flex items-center gap-2 justify-center"
            >
              {status === 'loading' ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <>SUBSCRIBE <ArrowRight size={14} /></>
              )}
            </button>
          </form>
        )}
        {status === 'error' && (
          <p className="text-sw-error text-body-sm font-secondary mt-3">Something went wrong. Please try again.</p>
        )}
      </div>
    </section>
  )
}
