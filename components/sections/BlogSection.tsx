import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import BlogCard from '@/components/ui/BlogCard'

const BG = 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1800&q=80&auto=format&fit=crop'

interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  mainImage?: { asset: { _ref: string } }
  coverImage?: string
  categories?: string[]
  readTime?: number
  publishedAt?: string
  author?: { name: string; photo?: { asset: { _ref: string } }; role?: string }
}

const UNS = 'https://images.unsplash.com'
const fallbackPosts: Post[] = [
  {
    _id: '1',
    title: 'Building Scalable Cloud Infrastructure: Best Practices for 2025',
    slug: { current: 'building-scalable-cloud-infrastructure' },
    excerpt: 'Discover the key principles behind cloud systems that handle millions of requests while keeping costs under control.',
    coverImage: `${UNS}/photo-1451187580459-43490279c0fa?w=800&q=80&auto=format&fit=crop`,
    categories: ['Cloud', 'Infrastructure'],
    readTime: 5,
    publishedAt: '2025-03-15',
    author: { name: 'SWN Team' },
  },
  {
    _id: '2',
    title: 'How AI is Transforming Business Operations in 2025',
    slug: { current: 'ai-transforming-business-operations' },
    excerpt: 'From automated workflows to intelligent decision support — AI is no longer optional for competitive businesses.',
    coverImage: `${UNS}/photo-1677442135703-1787eea5ce01?w=800&q=80&auto=format&fit=crop`,
    categories: ['AI & Data'],
    readTime: 7,
    publishedAt: '2025-03-08',
    author: { name: 'SWN Team' },
  },
  {
    _id: '3',
    title: 'Cybersecurity Fundamentals Every Business Owner Should Know',
    slug: { current: 'cybersecurity-fundamentals-business' },
    excerpt: 'A practical guide to protecting your digital assets, customer data, and business continuity from modern threats.',
    coverImage: `${UNS}/photo-1526374965328-7f61d4dc18c5?w=800&q=80&auto=format&fit=crop`,
    categories: ['Security'],
    readTime: 6,
    publishedAt: '2025-02-28',
    author: { name: 'SWN Team' },
  },
]

export default function BlogSection({ posts, heading }: { posts?: Post[]; heading?: string }) {
  const items = posts && posts.length > 0 ? posts : fallbackPosts

  return (
    <section className="relative py-section border-b border-divider overflow-hidden">
      <div className="absolute inset-0">
        <Image src={BG} alt="" fill className="object-cover" style={{ opacity: 0.07 }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/88 to-background" />
      </div>
      <div className="page-container relative z-10">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="section-label mb-3">LATEST INSIGHTS</p>
            <h2 className="section-heading">{heading || 'From the Knowledge Base'}</h2>
          </div>
          <Link href="/blog" className="btn-outline hidden sm:flex items-center gap-2">
            ALL POSTS <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((post) => (
            <BlogCard key={post._id} {...post} />
          ))}
        </div>
        <div className="mt-8 sm:hidden">
          <Link href="/blog" className="btn-outline flex items-center justify-center gap-2 w-full">
            ALL POSTS <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
