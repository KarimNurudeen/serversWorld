'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { Menu, X, ChevronDown, ArrowRight, LogIn, LogOut, User } from 'lucide-react'
import clsx from 'clsx'
import { useAppearance } from '@/context/AppearanceContext'
import { useAuth } from '@/context/AuthContext'
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
      columns: [
        [
          { label: 'Web & App Development',     href: '/services/web-app-development',  description: 'Custom websites, platforms & mobile apps' },
          { label: 'AI & Data Solutions',        href: '/services/ai-data',              description: 'Automation, analytics & intelligent chatbots' },
          { label: 'Cybersecurity Services',     href: '/services/security',             description: 'Pen testing, audits & compliance' },
        ],
        [
          { label: 'Business Systems',           href: '/services/business-systems',     description: 'CRM, ERP, POS & management tools' },
          { label: 'Digital Growth & Marketing', href: '/services/digital-growth',       description: 'SEO, social media & brand strategy' },
          { label: 'Cloud & Infrastructure',     href: '/services/cloud-infrastructure', description: 'Hosting, DevOps & CI/CD pipelines' },
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
      columns: [
        [
          { label: 'ServerPulse Monitoring', href: '/products/serverpulse', description: 'Real-time server & app monitoring' },
          { label: 'SecureBox Vault',        href: '/products/securebox',   description: 'End-to-end encrypted credential vault' },
          { label: 'FlowForm Builder',       href: '/products/flowform',    description: 'Drag-and-drop forms with automation' },
          { label: 'InfraKit Starter Pack',  href: '/products/infrakit',    description: 'DevOps scripts & IaC templates' },
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
      columns: [
        [
          { label: 'Enterprise CRM Reconstruction',  href: '/portfolio/enterprise-crm',         description: 'FinEdge Africa · 50,000+ users' },
          { label: 'AI-Powered Analytics Dashboard', href: '/portfolio/ai-analytics-dashboard', description: 'Meridian Holdings · 23 companies' },
          { label: 'E-Commerce Platform Overhaul',   href: '/portfolio/ecommerce-overhaul',     description: 'Stackwell Labs · 120+ vendors' },
        ],
      ],
      cta: { label: 'View All Projects', href: '/portfolio' },
    },
  },
  { label: 'BLOG',    href: '/blog' },
  { label: 'ABOUT',   href: '/about' },
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
  const [mobileOpen, setMobileOpen]         = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const { settings } = useAppearance()
  const { user, openAuthModal, logout } = useAuth()

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); setMobileExpanded(null) }, [pathname])

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const visibleNavItems = navItems.filter((item) => {
    const key = NAV_SHOW_MAP[item.label]
    return key ? settings[key] !== false : true
  })

  const navBgClass =
    settings.navbarStyle === 'transparent' ? 'bg-transparent' :
    settings.navbarStyle === 'glass'       ? 'bg-background/60 backdrop-blur-md' :
    'backdrop-blur-md'

  const navStyle = settings.navbarStyle === 'solid' ? { backgroundColor: settings.navbarBg } : undefined

  const openDropdown  = (label: string) => { if (closeTimer.current) clearTimeout(closeTimer.current); setActiveDropdown(label) }
  const closeDropdown = () => { closeTimer.current = setTimeout(() => setActiveDropdown(null), 150) }

  const closeMobile = () => { setMobileOpen(false); setMobileExpanded(null) }

  return (
    <>
      <header className={`sticky top-0 z-50 border-b border-divider ${navBgClass}`} style={navStyle}>
        <div className="page-container">
          <nav className="flex h-16 sm:h-20 items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center border border-white/80 group-hover:bg-white group-hover:text-background transition-all duration-200">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="9" height="9" />
                  <rect x="13" y="2" width="9" height="9" />
                  <rect x="2" y="13" width="9" height="9" />
                  <rect x="13" y="13" width="9" height="9" opacity="0.4" />
                </svg>
              </div>
              <span className="font-primary font-extrabold text-sm sm:text-title-md tracking-wide text-white uppercase">
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
                      <ChevronDown size={13} className={clsx('transition-transform duration-200 mt-px', activeDropdown === item.label ? 'rotate-180' : '')} />
                    )}
                  </Link>

                  {item.dropdown && activeDropdown === item.label && (
                    <div
                      className={clsx(
                        'absolute top-full mt-px z-50 bg-white shadow-2xl border border-gray-200 flex overflow-hidden',
                        item.dropdown.columns.length > 1 ? 'w-[50vw] min-w-[580px]' : 'w-[40vw] min-w-[380px]',
                        idx >= visibleNavItems.length - 2 ? 'right-0' : 'left-0'
                      )}
                      style={{ minHeight: 210 }}
                      onMouseEnter={() => openDropdown(item.label)}
                      onMouseLeave={() => closeDropdown()}
                    >
                      <div className={clsx('relative shrink-0', item.dropdown.columns.length > 1 ? 'w-[220px]' : 'w-[180px]')}>
                        <Image src={item.dropdown.image} alt={item.dropdown.imageAlt} fill className="object-cover" priority />
                        <div className="absolute inset-0 bg-black/20" />
                      </div>
                      <div className="flex-1 px-6 py-5">
                        <p className="font-primary font-bold text-label-lg uppercase tracking-wider mb-4" style={{ color: 'var(--accent)' }}>
                          {item.dropdown.title}
                        </p>
                        <div className={clsx('flex gap-8', item.dropdown.columns.length > 1 ? '' : 'flex-col')}>
                          {item.dropdown.columns.map((col, ci) => (
                            <ul key={ci} className="flex-1 divide-y divide-orange-400">
                              {col.map((link) => (
                                <li key={link.href}>
                                  <Link href={link.href} onClick={() => setActiveDropdown(null)} className="flex flex-col py-2.5 group/link">
                                    <span className="font-secondary text-body-md text-gray-700 group-hover/link:text-gray-900 transition-colors">{link.label}</span>
                                    {link.description && <span className="font-secondary text-body-sm text-gray-400 mt-0.5">{link.description}</span>}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ))}
                        </div>
                        {item.dropdown.cta && (
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            <Link href={item.dropdown.cta.href} onClick={() => setActiveDropdown(null)}
                              className="inline-flex items-center gap-1.5 font-primary font-bold text-label-sm uppercase tracking-wider transition-colors"
                              style={{ color: 'var(--accent)' }}>
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

            {/* Desktop auth */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {user ? (
                <>
                  <span className="font-primary font-semibold text-label-sm uppercase tracking-wider text-white/70">{user.name.split(' ')[0]}</span>
                  <button onClick={logout} className="btn-ghost text-xs py-2 px-4 text-secondary-text hover:text-white">LOG OUT</button>
                </>
              ) : (
                <button onClick={() => openAuthModal('login')} className="btn-primary text-xs py-2.5 px-5">SIGN IN</button>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 text-white"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </nav>
        </div>
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMobile} />

          {/* Drawer panel */}
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-[320px] bg-background border-l border-divider flex flex-col">

            {/* Drawer header */}
            <div className="flex items-center justify-between px-5 h-16 border-b border-divider shrink-0">
              <Link href="/" onClick={closeMobile} className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center border border-white/80">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="2" y="2" width="9" height="9" />
                    <rect x="13" y="2" width="9" height="9" />
                    <rect x="2" y="13" width="9" height="9" />
                    <rect x="13" y="13" width="9" height="9" opacity="0.4" />
                  </svg>
                </div>
                <span className="font-primary font-extrabold text-sm tracking-wide text-white uppercase">SWN</span>
              </Link>
              <button onClick={closeMobile} className="flex items-center justify-center w-9 h-9 text-secondary-text hover:text-white transition-colors" aria-label="Close menu">
                <X size={20} />
              </button>
            </div>

            {/* Nav links — scrollable */}
            <div className="flex-1 overflow-y-auto">
              {visibleNavItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))
                const isExpanded = mobileExpanded === item.label

                return (
                  <div key={item.href} className="border-b border-divider">
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        onClick={() => { if (!item.dropdown) closeMobile() }}
                        className={clsx(
                          'flex-1 px-5 py-4 font-primary font-semibold text-sm tracking-widest uppercase transition-colors',
                          isActive ? 'text-white' : 'text-secondary-text hover:text-white'
                        )}
                      >
                        {item.label}
                      </Link>
                      {item.dropdown && (
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : item.label)}
                          className="px-5 py-4 text-secondary-text hover:text-white transition-colors"
                          aria-label="Expand"
                        >
                          <ChevronDown size={16} className={clsx('transition-transform duration-200', isExpanded ? 'rotate-180' : '')} />
                        </button>
                      )}
                    </div>

                    {/* Sub-links */}
                    {item.dropdown && isExpanded && (
                      <div className="bg-surface/40">
                        {item.dropdown.columns.flat().map((link, i, arr) => (
                          <Link
                            key={link.href}
                            href={link.href}
                            onClick={closeMobile}
                            className={clsx(
                              'flex flex-col px-6 py-3.5 hover:bg-surface/60 transition-colors',
                              i < arr.length - 1 ? 'border-b border-divider' : ''
                            )}
                          >
                            <span className="font-primary font-semibold text-body-sm text-white">{link.label}</span>
                            {link.description && (
                              <span className="font-secondary text-body-sm text-secondary-text mt-0.5">{link.description}</span>
                            )}
                          </Link>
                        ))}
                        {item.dropdown.cta && (
                          <Link
                            href={item.dropdown.cta.href}
                            onClick={closeMobile}
                            className="flex items-center gap-2 px-6 py-3.5 font-primary font-bold text-label-sm uppercase tracking-wider text-white/50 hover:text-white transition-colors border-t border-divider"
                          >
                            {item.dropdown.cta.label} <ArrowRight size={12} />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Drawer footer — auth */}
            <div className="shrink-0 border-t border-divider p-5">
              {user ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center border border-divider bg-surface">
                      <User size={14} className="text-white/60" />
                    </div>
                    <div>
                      <p className="font-primary font-semibold text-body-sm text-white">{user.name}</p>
                      <p className="font-secondary text-body-sm text-secondary-text">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => { closeMobile(); logout() }}
                    className="flex items-center gap-1.5 text-secondary-text hover:text-white transition-colors text-body-sm font-secondary"
                    aria-label="Log out"
                  >
                    <LogOut size={15} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { closeMobile(); openAuthModal('login') }}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <LogIn size={15} /> SIGN IN
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
