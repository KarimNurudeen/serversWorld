import ProductCard from '@/components/ui/ProductCard'
import { products } from '@/lib/data'
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = { title: 'Products' }

const CATEGORIES = [
  { value: 'all', label: 'All Products' },
  { value: 'devtools', label: 'Dev Tools' },
  { value: 'security', label: 'Security' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'ai_tools', label: 'AI Tools' },
]

export default function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; search?: string }
}) {
  const activeCategory = searchParams.category || 'all'
  const searchQuery = searchParams.search?.toLowerCase() || ''

  const filtered = products.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory
    const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery) || p.shortDescription?.toLowerCase().includes(searchQuery)
    return matchesCat && matchesSearch
  })

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-divider relative overflow-hidden min-h-[300px] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1800&q=85&auto=format&fit=crop"
            alt="Digital products"
            fill
            priority
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/60" />
        </div>
        <div className="page-container py-16 relative z-10">
          <p className="section-label mb-4">DIGITAL PRODUCTS</p>
          <h1 className="text-headline-lg font-primary font-bold text-white mb-4">Products & Tools</h1>
          <p className="text-secondary-text text-body-lg font-secondary max-w-2xl">
            Software tools, AI utilities, templates, and training courses built by our team for businesses and developers.
          </p>
        </div>
      </div>

      <div className="page-container py-12">
        {/* Search + Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <form className="flex gap-3 flex-1">
            <input
              type="search"
              name="search"
              defaultValue={searchParams.search}
              placeholder="Search products..."
              className="input-field flex-1"
            />
            <button type="submit" className="btn-primary px-8">SEARCH</button>
          </form>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.value}
              href={cat.value === 'all' ? '/products' : `/products?category=${cat.value}`}
              className={`px-4 py-2 border text-label-md font-primary font-semibold uppercase tracking-wider transition-colors ${
                activeCategory === cat.value
                  ? 'border-white bg-white text-background'
                  : 'border-divider text-secondary-text hover:border-white/50 hover:text-white'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard
                key={p._id}
                title={p.title}
                slug={{ current: p.slug }}
                shortDescription={p.shortDescription}
                coverImage={p.coverImage}
                category={p.category}
                price={p.price}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border border-divider">
            <p className="text-secondary-text font-secondary text-body-lg mb-3">No products found.</p>
            <Link href="/products" className="text-white underline font-secondary hover:no-underline">Clear filters</Link>
          </div>
        )}
      </div>
    </div>
  )
}
