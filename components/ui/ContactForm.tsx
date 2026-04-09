'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle } from 'lucide-react'

const SERVICES = [
  'Web Development',
  'Mobile App Development',
  'AI & Automation',
  'Cloud Infrastructure',
  'Cybersecurity',
  'Business Systems (CRM/ERP)',
  'Digital Marketing & SEO',
  'Consulting & Advisory',
  'Other',
]

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', service: '', budget: '', message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    // In production, POST to an API route or email service
    await new Promise((r) => setTimeout(r, 1500))
    setStatus('success')
  }

  if (status === 'success') {
    return (
      <div className="border border-divider p-12 text-center">
        <CheckCircle size={40} className="text-white/60 mx-auto mb-4" />
        <h3 className="font-primary font-bold text-title-lg text-white mb-2">Message Sent!</h3>
        <p className="text-secondary-text font-secondary text-body-md">
          Thank you for reaching out. A member of our team will get back to you within 2 business hours.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text block mb-2">
            Full Name *
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            className="input-field"
          />
        </div>
        <div>
          <label className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text block mb-2">
            Email Address *
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="john@company.com"
            required
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text block mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+234 000 000 0000"
            className="input-field"
          />
        </div>
        <div>
          <label className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text block mb-2">
            Company / Organization
          </label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company Name"
            className="input-field"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text block mb-2">
            Service Interested In
          </label>
          <select
            name="service"
            value={form.service}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select a service...</option>
            {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text block mb-2">
            Budget Range
          </label>
          <select
            name="budget"
            value={form.budget}
            onChange={handleChange}
            className="input-field"
          >
            <option value="">Select budget range...</option>
            <option value="under-500k">Under ₦500,000</option>
            <option value="500k-2m">₦500,000 – ₦2,000,000</option>
            <option value="2m-5m">₦2,000,000 – ₦5,000,000</option>
            <option value="5m-20m">₦5,000,000 – ₦20,000,000</option>
            <option value="20m+">₦20,000,000+</option>
            <option value="to-discuss">Prefer to Discuss</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text block mb-2">
          Project Details *
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your project, goals, and any specific requirements..."
          required
          rows={6}
          className="input-field resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-primary flex items-center gap-2"
      >
        {status === 'loading' ? (
          <><Loader2 size={16} className="animate-spin" /> SENDING...</>
        ) : (
          <><Send size={15} /> SEND MESSAGE</>
        )}
      </button>
    </form>
  )
}
