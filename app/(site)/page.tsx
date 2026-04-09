'use client'

import { useAppearance } from '@/context/AppearanceContext'
import { services, products, blogPosts, projects, testimonials } from '@/lib/data'
import type { AppearanceSettings } from '@/types/appearance'
import HeroSection from '@/components/sections/HeroSection'
import VisualBreak from '@/components/sections/VisualBreak'
import ServicesSection from '@/components/sections/ServicesSection'
import PortfolioSection from '@/components/sections/PortfolioSection'
import ProductsSection from '@/components/sections/ProductsSection'
import BlogSection from '@/components/sections/BlogSection'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import NewsletterForm from '@/components/ui/NewsletterForm'

const SECTION_SHOW_KEY: Record<string, keyof AppearanceSettings> = {
  whyChooseUs:  'showWhyChooseUs',
  services:     'showServices',
  visualBreak:  'showVisualBreak',
  portfolio:    'showPortfolio',
  products:     'showProducts',
  testimonials: 'showTestimonials',
  blog:         'showBlog',
  newsletter:   'showNewsletter',
}

export default function HomePage() {
  const { settings } = useAppearance()

  const sectionServices = services.map((s) => ({
    _id: s._id, title: s.title, slug: { current: s.slug },
    category: s.category, shortDescription: s.shortDescription, coverImage: s.coverImage,
  }))

  const sectionProducts = products.map((p) => ({
    _id: p._id, title: p.title, slug: { current: p.slug },
    shortDescription: p.shortDescription, coverImage: p.coverImage,
    category: p.category, price: p.price,
  }))

  const sectionPosts = blogPosts.map((p) => ({
    _id: p._id, title: p.title, slug: { current: p.slug },
    excerpt: p.excerpt, coverImage: p.coverImage, categories: p.categories,
    readTime: p.readTime, publishedAt: p.publishedAt, author: p.author,
  }))

  const sectionProjects = projects.map((p) => ({
    _id: p._id, title: p.title, slug: { current: p.slug },
    client: p.client, category: p.category, shortDescription: p.shortDescription,
    coverImage: p.coverImage, tags: p.tags,
  }))

  return (
    <>
      <HeroSection />
      {settings.sectionOrder.map((key) => {
        const showKey = SECTION_SHOW_KEY[key]
        if (showKey && !settings[showKey]) return null

        switch (key) {
          case 'whyChooseUs':
            return <WhyChooseUs key={key} heading={settings.whyChooseUsHeading} />
          case 'services':
            return <ServicesSection key={key} services={sectionServices} heading={settings.servicesHeading} />
          case 'visualBreak':
            return <VisualBreak key={key} />
          case 'portfolio':
            return <PortfolioSection key={key} projects={sectionProjects} heading={settings.portfolioHeading} />
          case 'products':
            return <ProductsSection key={key} products={sectionProducts} heading={settings.productsHeading} />
          case 'testimonials':
            return <TestimonialsSection key={key} testimonials={testimonials} heading={settings.testimonialsHeading} />
          case 'blog':
            return <BlogSection key={key} posts={sectionPosts} heading={settings.blogHeading} />
          case 'newsletter':
            return <NewsletterForm key={key} />
          default:
            return null
        }
      })}
    </>
  )
}
