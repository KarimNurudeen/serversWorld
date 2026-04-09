import type { Metadata } from 'next'
import Image from 'next/image'
import ContactForm from '@/components/ui/ContactForm'
import { Mail, Phone, MapPin, Clock, MessageSquare } from 'lucide-react'
import { TwitterIcon, LinkedinIcon, InstagramIcon } from '@/components/ui/SocialIcons'

export const metadata: Metadata = { title: 'Contact Us' }

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-divider relative overflow-hidden min-h-[300px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1800&q=85&auto=format&fit=crop"
            alt="Get in touch"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
        </div>
        <div className="page-container py-16 relative z-10">
          <p className="section-label mb-4">GET IN TOUCH</p>
          <h1 className="text-headline-lg font-primary font-bold text-white mb-4">Contact Us</h1>
          <p className="text-secondary-text text-body-lg font-secondary max-w-2xl">
            Ready to transform your digital infrastructure? Let&apos;s talk. Our team of experts is ready to architect the right solution for your business.
          </p>
        </div>
      </div>

      <div className="page-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <h2 className="font-primary font-semibold text-title-lg text-white mb-8">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-10">
            {/* Info Cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: 'Email', value: 'hello@serversworld.net', href: 'mailto:hello@serversworld.net' },
                { icon: Phone, label: 'Phone', value: '+234 123 456 7890', href: 'tel:+2341234567890' },
                { icon: MapPin, label: 'Location', value: 'Nigeria · Pan-Africa · Global', href: null },
                { icon: Clock, label: 'Support Hours', value: '24 / 7 Expert Support', href: null },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="border border-divider p-5 hover:bg-surface/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 border border-divider flex items-center justify-center shrink-0">
                      <Icon size={17} className="text-white/60" />
                    </div>
                    <div>
                      <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-1">{label}</p>
                      {href ? (
                        <a href={href} className="text-white font-secondary text-body-md hover:text-secondary-text transition-colors">
                          {value}
                        </a>
                      ) : (
                        <p className="text-white font-secondary text-body-md">{value}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* WhatsApp */}
            <div className="border border-divider p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 border border-divider flex items-center justify-center shrink-0">
                  <MessageSquare size={17} className="text-white/60" />
                </div>
                <div>
                  <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text mb-1">WhatsApp</p>
                  <p className="text-white font-secondary text-body-md mb-3">Chat with us on WhatsApp for quick responses</p>
                  <a
                    href="https://wa.me/2341234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-xs py-2 px-4"
                  >
                    OPEN WHATSAPP
                  </a>
                </div>
              </div>
            </div>

            {/* Socials */}
            <div>
              <h3 className="section-label mb-4">FOLLOW US</h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: TwitterIcon, label: 'Twitter', href: '#' },
                  { icon: LinkedinIcon, label: 'LinkedIn', href: '#' },
                  { icon: InstagramIcon, label: 'Instagram', href: '#' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="border border-divider p-4 flex flex-col items-center gap-2 hover:bg-surface/50 hover:border-white/40 transition-colors group"
                  >
                    <Icon size={18} className="text-secondary-text group-hover:text-white transition-colors" />
                    <span className="text-label-sm font-primary font-bold uppercase tracking-wider text-secondary-text group-hover:text-white transition-colors">
                      {label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
