export interface AppearanceSettings {
  // ── Branding ─────────────────────────────────────────────────
  siteName: string
  logoText: string

  // ── Colors ───────────────────────────────────────────────────
  accentColor: string
  accentColorDark: string
  backgroundColor: string
  surfaceColor: string
  primaryTextColor: string
  secondaryTextColor: string

  // ── Navbar ───────────────────────────────────────────────────
  navbarStyle: 'solid' | 'glass' | 'transparent'
  navbarBg: string
  navShowServices: boolean
  navShowProducts: boolean
  navShowPortfolio: boolean
  navShowBlog: boolean
  navShowAbout: boolean
  navShowContact: boolean

  // ── Typography ───────────────────────────────────────────────
  headingFont: string        // full font-family value, e.g. "'Poppins', sans-serif"
  bodyFont: string
  fontSizeScale: 'compact' | 'normal' | 'large'

  // ── Layout ───────────────────────────────────────────────────
  pageWidth: 'contained' | 'wide' | 'full'
  sectionSpacing: 'tight' | 'normal' | 'spacious'
  cardStyle: 'bordered' | 'shadowed' | 'flat'
  buttonStyle: 'filled' | 'outline' | 'ghost'
  buttonRadius: 'none' | 'sm' | 'md' | 'full'

  // ── Animations ───────────────────────────────────────────────
  enableAnimations: boolean
  transitionSpeed: 'fast' | 'normal' | 'slow'

  // ── Hero ─────────────────────────────────────────────────────
  heroHeadline: string
  heroSubtext: string
  heroCta1Label: string
  heroCta1Href: string
  heroCta2Label: string
  heroCta2Href: string
  heroImageUrl: string

  // ── Section headings ─────────────────────────────────────────
  whyChooseUsHeading: string
  servicesHeading: string
  portfolioHeading: string
  productsHeading: string
  testimonialsHeading: string
  blogHeading: string

  // ── Section visibility ───────────────────────────────────────
  showWhyChooseUs: boolean
  showServices: boolean
  showVisualBreak: boolean
  showPortfolio: boolean
  showProducts: boolean
  showTestimonials: boolean
  showBlog: boolean
  showNewsletter: boolean

  // ── Section order ────────────────────────────────────────────
  sectionOrder: string[]

  // ── Footer ───────────────────────────────────────────────────
  footerTagline: string
  showSocialLinks: boolean
  twitterUrl: string
  linkedinUrl: string
  instagramUrl: string
  githubUrl: string
  youtubeUrl: string
}

export const defaultAppearance: AppearanceSettings = {
  siteName: 'Servers World Network',
  logoText: 'Servers World',

  accentColor: '#ffffff',
  accentColorDark: '#e5e5e5',
  backgroundColor: '#1A2744',
  surfaceColor: '#233152',
  primaryTextColor: '#FFFFFF',
  secondaryTextColor: '#B0B8C4',

  navbarStyle: 'solid',
  navbarBg: '#0a0f1e',
  navShowServices: true,
  navShowProducts: true,
  navShowPortfolio: true,
  navShowBlog: true,
  navShowAbout: true,
  navShowContact: true,

  headingFont: "'Noto Sans JP', sans-serif",
  bodyFont: "'Space Grotesk', sans-serif",
  fontSizeScale: 'normal',

  pageWidth: 'contained',
  sectionSpacing: 'normal',
  cardStyle: 'bordered',
  buttonStyle: 'filled',
  buttonRadius: 'none',

  enableAnimations: true,
  transitionSpeed: 'normal',

  heroHeadline: "ARCHITECTING\nTHE DIGITAL\nFUTURE",
  heroSubtext: 'We bridge the infrastructure gap in Africa and beyond — delivering world-class software, cloud systems, and AI solutions for businesses ready to lead.',
  heroCta1Label: 'Contact Us',
  heroCta1Href: '/contact',
  heroCta2Label: 'View Portfolio',
  heroCta2Href: '/portfolio',
  heroImageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1920&q=95&auto=format&fit=crop',

  whyChooseUsHeading: 'The Difference Is in Our Precision',
  servicesHeading: 'Categorized Solutions',
  portfolioHeading: 'Work That Speaks for Itself',
  productsHeading: 'Tools Built by Practitioners',
  testimonialsHeading: 'What Our Clients Say',
  blogHeading: 'From the Knowledge Base',

  showWhyChooseUs: true,
  showServices: true,
  showVisualBreak: true,
  showPortfolio: true,
  showProducts: true,
  showTestimonials: true,
  showBlog: true,
  showNewsletter: true,

  sectionOrder: ['whyChooseUs', 'services', 'visualBreak', 'portfolio', 'products', 'testimonials', 'blog', 'newsletter'],

  footerTagline: 'Architecting the digital future — one solution at a time.',
  showSocialLinks: true,
  twitterUrl: '',
  linkedinUrl: '',
  instagramUrl: '',
  githubUrl: '',
  youtubeUrl: '',
}
