'use client'

import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'
import { TwitterIcon, LinkedinIcon, InstagramIcon, GithubIcon, YoutubeIcon } from '@/components/ui/SocialIcons'
import { useAppearance } from '@/context/AppearanceContext'

const serviceLinks = [
  { label: 'Development', href: '/services?category=development' },
  { label: 'AI & Data', href: '/services?category=ai_data' },
  { label: 'Business Systems', href: '/services?category=business_systems' },
  { label: 'Digital Growth', href: '/services?category=digital_growth' },
  { label: 'Cloud & Infrastructure', href: '/services?category=cloud_infrastructure' },
  { label: 'Security', href: '/services?category=security' },
  { label: 'Communication', href: '/services?category=communication' },
  { label: 'Support & Training', href: '/services?category=support' },
]

const productLinks = [
  { label: 'Software Tools', href: '/products?category=software' },
  { label: 'AI Tools', href: '/products?category=ai_tools' },
  { label: 'Templates & Themes', href: '/products?category=templates' },
  { label: 'Courses & Training', href: '/products?category=courses' },
  { label: 'Upcoming Products', href: '/products?tab=upcoming' },
]

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
]

export default function Footer() {
  const { settings } = useAppearance()
  return (
    <footer className="bg-surface border-t border-divider">
      <div className="page-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 group mb-5">
              <div className="flex h-8 w-8 items-center justify-center border border-white/80">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="9" height="9" rx="0" />
                  <rect x="13" y="2" width="9" height="9" rx="0" />
                  <rect x="2" y="13" width="9" height="9" rx="0" />
                  <rect x="13" y="13" width="9" height="9" rx="0" opacity="0.4" />
                </svg>
              </div>
              <span className="font-primary font-extrabold text-sm tracking-wide text-white uppercase">
                Servers World Network
              </span>
            </Link>
            <p className="text-secondary-text text-body-md font-secondary leading-relaxed mb-6">
              {settings.footerTagline}
            </p>
            {settings.showSocialLinks && (
              <div className="flex items-center gap-3">
                {[
                  { Icon: TwitterIcon, href: '#', label: 'Twitter' },
                  { Icon: LinkedinIcon, href: '#', label: 'LinkedIn' },
                  { Icon: InstagramIcon, href: '#', label: 'Instagram' },
                  { Icon: GithubIcon, href: '#', label: 'GitHub' },
                  { Icon: YoutubeIcon, href: '#', label: 'YouTube' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="h-9 w-9 flex items-center justify-center border border-divider text-secondary-text hover:text-white hover:border-white/50 transition-colors"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <div>
            <h3 className="section-label mb-5">Services</h3>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary-text hover:text-white text-body-md font-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="section-label mb-5">Products</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary-text hover:text-white text-body-md font-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="section-label mt-8 mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-secondary-text hover:text-white text-body-md font-secondary transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="section-label mb-5">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-secondary-text">
                <Mail size={16} className="mt-0.5 shrink-0 text-white/60" />
                <a href="mailto:hello@serversworld.net" className="text-body-md font-secondary hover:text-white transition-colors">
                  hello@serversworld.net
                </a>
              </li>
              <li className="flex items-start gap-3 text-secondary-text">
                <Phone size={16} className="mt-0.5 shrink-0 text-white/60" />
                <a href="tel:+2341234567890" className="text-body-md font-secondary hover:text-white transition-colors">
                  +234 123 456 7890
                </a>
              </li>
              <li className="flex items-start gap-3 text-secondary-text">
                <MapPin size={16} className="mt-0.5 shrink-0 text-white/60" />
                <span className="text-body-md font-secondary">Nigeria · Pan-Africa · Global</span>
              </li>
            </ul>

            <div className="mt-8 p-4 border border-divider">
              <p className="text-label-sm font-primary font-bold uppercase tracking-wider text-white mb-1">Support Hours</p>
              <p className="text-secondary-text text-body-sm font-secondary">24 / 7 Expert Support</p>
              <p className="text-secondary-text text-body-sm font-secondary mt-1">Response within 2 hours</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-divider">
        <div className="page-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-secondary-text text-body-sm font-secondary">
            © {new Date().getFullYear()} Servers World Network. All rights reserved.
          </p>
          <p className="text-secondary-text text-body-sm font-secondary">
            {settings.footerTagline}
          </p>
        </div>
      </div>
    </footer>
  )
}
