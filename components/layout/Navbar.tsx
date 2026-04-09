'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef } from 'react'
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react'
import clsx from 'clsx'
import { useAppearance } from '@/context/AppearanceContext'
import type { AppearanceSettings } from '@/types/appearance'

const UNS = 'https://images.unsplash.com'

interface DropdownLink { label: string; href: string; description?: string }

interface NavItem {
  label: string
  href: string
  dropdown?: {
    image: string
    imageAlt: string
    title: string
    subtitle?: string
    columns: DropdownLink[][]
    cta?: { label: string; href: string }
  }
}

const navItems: NavItem[] = [
  { label: 'HOME', href: '/' },
  {
    label: 'SERVICES',
    href: '/services',
    dropdown: {
      image: `${UNS}/photo-1461749280684-dccba630e2f6?w=900&q=80&auto=format&fit=crop`,
      imageAlt: 'Software development services',
      title: 'Our Services',
      subtitle: 'End-to-end digital solutions from infrastructure to growth',
      columns: [
        [
          { label: 'Web & App Development', href: '/services/web-app-development', description: 'Custom websites, platforms & mobile apps' },
          { label: 'AI & Data Solutions', href: '/services/ai-data', description: 'Automation, analytics & intelligent chatbots' },
          { label: 'Cybersecurity Services', href: '/services/security', description: 'Pen testing, audits & compliance' },
        ],
        [
          { label: 'Business Systems', href: '/services/business-systems', description: 'CRM, ERP, POS & management tools' },
          { label: 'Digital Growth & Marketing', href: '/services/digital-growth', description: 'SEO, social media & brand strategy' },
          { label: 'Cloud & Infrastructure', href: '/services/cloud-infrastructure', description: 'Hosting, DevOps & CI/CD pipelines' },
        ],
      ],
      cta: { label: 'View All Services', href: '/services' },
    },
  },
  {
    label: 'PRODUCTS',
    href: '/products',
    dropdown: {
      image: `${UNS}/photo-1555949963-aa79dcee981c?w=900&q=80&auto=format&fit=crop`,
      imageAlt: 'Digital products and tools',
      title: 'Digital Products',
      subtitle: 'Software tools built by practitioners, for practitioners',
      columns: [
        [
          { label: 'ServerPulse Monitoring', href: '/products/serverpulse', description: 'Real-time server & app monitoring' },
          { label: 'SecureBox Vault', href: '/products/securebox', description: 'End-to-end encrypted credential vault' },
          { label: 'FlowForm Builder', href: '/products/flowform', description: 'Drag-and-drop forms with automation' },
          { label: 'InfraKit Starter Pack', href: '/products/infrakit', description: 'DevOps scripts & IaC templates' },
        ],
      ],
      cta: { label: 'Browse All Products', href: '/products' },
    },
  },
  {
    label: 'PORTFOLIO',
    href: '/portfolio',
    dropdown: {
      image: `${UNS}/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop`,
      imageAlt: 'Our portfolio of work',
      title: 'Our Work',
      subtitle: 'Enterprise solutions delivered across Africa and globally',
      columns: [
        [
          { label: 'Enterprise CRM Reconstruction', href: '/portfolio/enterprise-crm', description: 'FinEdge Africa · 50,000+ users' },
          { label: 'AI-Powered Analytics Dashboard', href: '/portfolio/ai-analytics-dashboard', description: 'Meridian Holdings · 23 companies' },
          { label: 'E-Commerce Platform Overhaul', href: '/portfolio/ecommerce-overhaul', description: 'Stackwell Labs · 120+ vendors' },
        ],
      ],
      cta: { label: 'View All Projects', href: '/portfolio' },
    },
  },
  {
    label: 'BLOG',
    href: '/blog',
    dropdown: {
      image: `${UNS}/photo-1499750310107-5fef28a66643?w=900&q=80&auto=format&fit=crop`,
      imageAlt: 'Blog and insights',
      title: 'Knowledge Base',
      subtitle: 'Deep dives into tech, infrastructure, AI, and security',
      columns: [
        [
          { label: 'Building Scalable Cloud Infrastructure', href: '/blog/building-scalable-cloud-infrastructure', description: '5 min read · Cloud & Infrastructure' },
          { label: 'AI Transforming Business Operations', href: '/blog/ai-transforming-business-operations', description: '7 min read · AI & Data' },
          { label: 'Cybersecurity Fundamentals for Business', href: '/blog/cybersecurity-fundamentals-business', description: '6 min read · Security' },
        ],
      ],
      cta: { label: 'View All Posts', href: '/blog' },
    },
  },
  {
    label: 'ABOUT',
    href: '/about',
    dropdown: {
      image: `${UNS}/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop`,
      imageAlt: 'About Servers World Network',
      title: 'About Us',
      subtitle: 'A pan-African technology company built for the digital future',
      columns: [
        [
          { label: 'Who We Are', href: '/about', description: 'Our story, mission, and vision' },
          { label: 'Our Values', href: '/about#values', description: 'The principles that guide everything we do' },
          { label: 'Meet the Team', href: '/about#team', description: 'The people behind the platform' },
          { label: 'Client Testimonials', href: '/about#testimonials', description: 'What our clients say about us' },
        ],
      ],
      cta: { label: 'Learn More About Us', href: '/about' },
    },
  },
  { label: 'CONTACT', href: '/contact' },
]

const NAV_SHOW_MAP: Record<string, keyof AppearanceSettings> = {
  SERVICES:  'navShowServices',
  PRODUCTS:  'navShowProducts',
  PORTFOLIO: 'navShowPortfolio',
  BLOG:      'navShowBlog',
  ABOUT:     'navShowAbout',
  CONTACT:   'navShowContact',
}

export default function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { settings } = useAppearance()

  const visibleNavItems = navItems.filter((item) => {
    const key = NAV_SHOW_MAP[item.label]
    if (!key) return true // HOME always visible
    return settings[key] !== false
  })

  const navBgClass =
    settings.navbarStyle === 'transparent' ? 'bg-transparent' :
    settings.navbarStyle === 'glass'       ? 'bg-background/60 backdrop-blur-md' :
    'backdrop-blur-md'

  const navStyle = settings.navbarStyle === 'solid'
    ? { backgroundColor: settings.navbarBg }
    : undefined

  const openDropdown = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setActiveDropdown(label)
  }

  const closeDropdown = () => {
    closeTimer.current = setTimeout(() => setActiveDropdown(null), 150)
  }

  return (
    <header className={`sticky top-0 z-50 border-b border-divider ${navBgClass}`} style={navStyle}>
      <div className="page-container">
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="flex h-9 w-9 items-center justify-center border border-white/80 group-hover:bg-white group-hover:text-background transition-all duration-200">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="2" width="9" height="9" />
                <rect x="13" y="2" width="9" height="9" />
                <rect x="2" y="13" width="9" height="9" />
                <rect x="13" y="13" width="9" height="9" opacity="0.4" />
              </svg>
            </div>
            <span className="font-primary font-extrabold text-title-md tracking-wide text-white uppercase hidden sm:block">
              {settings.logoText}
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-0">
            {visibleNavItems.map((item, idx) => (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => item.dropdown && openDropdown(item.label)}
                onMouseLeave={() => item.dropdown && closeDropdown()}
              >
                <Link
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-1 px-4 py-2 font-primary text-label-md font-semibold tracking-widest uppercase transition-colors duration-150',
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                      ? 'border-b-2 pb-1.5 text-white'
                      : 'text-secondary-text hover:text-white'
                  )}
                  style={
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                      ? { borderColor: 'var(--accent)', color: 'var(--accent)' }
                      : undefined
                  }
                >
                  {item.label}
                  {item.dropdown && (
                    <ChevronDown
                      size={13}
                      className={clsx(
                        'transition-transform duration-200 mt-px',
                        activeDropdown === item.label ? 'rotate-180 text-white' : ''
                      )}
                    />
                  )}
                </Link>

                {/* Dropdown card — anchored to nav item */}
                {item.dropdown && activeDropdown === item.label && (
                  <div
                    className={clsx(
                      'absolute top-full mt-px z-50 bg-white shadow-2xl border border-gray-200 flex overflow-hidden',
                      item.dropdown.columns.length > 1 ? 'w-[50vw] min-w-[560px]' : 'w-[50vw] min-w-[460px]',
                      idx >= visibleNavItems.length - 2 ? 'right-0' : 'left-0'
                    )}
                    style={{ minHeight: 210 }}
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={() => closeDropdown()}
                  >
                    {/* Left — Image (~37% of panel) */}
                    <div className={clsx('relative shrink-0', item.dropdown.columns.length > 1 ? 'w-[220px]' : 'w-[180px]')}>
                      <Image
                        src={item.dropdown.image}
                        alt={item.dropdown.imageAlt}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Right — Links */}
                    <div className="flex-1 px-6 py-5">
                      <p className="font-primary font-bold text-label-lg uppercase tracking-wider mb-4" style={{ color: 'var(--accent)' }}>
                        {item.dropdown.title}
                      </p>
                      <div className={clsx('flex gap-8', item.dropdown.columns.length > 1 ? '' : 'flex-col')}>
                        {item.dropdown.columns.map((col, ci) => (
                          <ul key={ci} className="space-y-2 flex-1">
                            {col.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  onClick={() => setActiveDropdown(null)}
                                  className="font-secondary text-body-md text-gray-600 hover:text-gray-900 hover:translate-x-0.5 inline-block transition-all duration-150"
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ))}
                      </div>
                      {item.dropdown.cta && (
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <Link
                            href={item.dropdown.cta.href}
                            onClick={() => setActiveDropdown(null)}
                            className="inline-flex items-center gap-1.5 font-primary font-bold text-label-sm uppercase tracking-wider transition-colors"
                            style={{ color: 'var(--accent)' }}
                          >
                            {item.dropdown.cta.label} <ArrowRight size={13} />
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center shrink-0">
            <Link href="/contact" className="btn-primary text-xs py-2.5 px-5">
              GET STARTED
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>


      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-divider bg-background">
          <div className="page-container py-4 flex flex-col">
            {visibleNavItems.map((item) => (
              <div key={item.href} className="border-b border-divider last:border-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => { if (!item.dropdown) setMobileOpen(false) }}
                    className={clsx(
                      'flex-1 font-primary text-label-lg font-semibold tracking-widest uppercase py-4',
                      pathname === item.href ? 'text-white' : 'text-secondary-text'
                    )}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <button
                      onClick={() => setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                      className="p-3 text-secondary-text"
                      aria-label="Toggle submenu"
                    >
                      <ChevronDown
                        size={16}
                        className={clsx('transition-transform', mobileExpanded === item.label ? 'rotate-180' : '')}
                      />
                    </button>
                  )}
                </div>

                {item.dropdown && mobileExpanded === item.label && (
                  <div className="pb-4 pl-3 space-y-1">
                    <div className="relative h-32 w-full overflow-hidden mb-4">
                      <Image
                        src={item.dropdown.image}
                        alt={item.dropdown.imageAlt}
                        fill
                        className="object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-transparent" />
                      <div className="absolute bottom-3 left-3">
                        <p className="font-primary font-bold text-label-md uppercase tracking-widest text-orange-400">{item.dropdown.title}</p>
                        {item.dropdown.subtitle && (
                          <p className="text-secondary-text text-body-sm font-secondary mt-0.5">{item.dropdown.subtitle}</p>
                        )}
                      </div>
                    </div>
                    {item.dropdown.columns.flat().map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => { setMobileOpen(false); setMobileExpanded(null) }}
                        className="flex flex-col py-2.5 border-b border-divider last:border-0"
                      >
                        <span className="font-primary font-semibold text-body-md text-white">{link.label}</span>
                        {link.description && (
                          <span className="font-secondary text-body-sm text-secondary-text mt-0.5">{link.description}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary mt-4 text-center">
              GET STARTED
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
