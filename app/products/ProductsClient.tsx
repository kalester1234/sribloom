'use client'

import { useState } from 'react'
import { Product } from '@/lib/types'
import ProductCard from '@/components/products/ProductCard'

const CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'serum', label: 'Serum' },
  { value: 'cleanser', label: 'Cleanser' },
  { value: 'day-cream', label: 'Day Cream' },
  { value: 'bundle', label: 'Bundles' },
]

interface ProductsClientProps {
  products: Product[]
}

export default function ProductsClient({ products }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered =
    activeCategory === 'all'
      ? products
      : products.filter((p) => p.category === activeCategory)

  return (
    <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem 6rem' }}>
      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '3rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            id={`filter-${cat.value}`}
            onClick={() => setActiveCategory(cat.value)}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '100px',
              background:
                activeCategory === cat.value
                  ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                  : 'var(--color-surface)',
              border:
                activeCategory === cat.value
                  ? 'none'
                  : '1px solid var(--color-border)',
              color:
                activeCategory === cat.value
                  ? 'white'
                  : 'var(--color-text-secondary)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              letterSpacing: '0.03em',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}
      >
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--color-text-muted)' }}>
          <p style={{ fontSize: '1.125rem' }}>No products found in this category.</p>
        </div>
      )}
    </section>
  )
}
