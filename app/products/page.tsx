import type { Metadata } from 'next'
import { PRODUCTS } from '@/lib/products'
import ProductsClient from './ProductsClient'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Products | Shop All Skincare',
  description: 'Browse the SRI BLOOM collection — Serum, Day Cream, Cleanser, and the Complete Ritual Set.',
}

export default function ProductsPage() {
  return (
    <>
      {/* Hero Header */}
      <section
        style={{
          paddingTop: 'calc(var(--nav-height) + 4rem)',
          paddingBottom: '4rem',
          textAlign: 'center',
          background: 'radial-gradient(ellipse at top, rgba(139,92,246,0.12) 0%, transparent 60%)',
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '1rem' }}>
          The Collection
        </p>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
            fontWeight: 300,
            color: 'var(--color-text-primary)',
            lineHeight: 1.1,
            marginBottom: '1rem',
          }}
        >
          Our Products
        </h1>
        <p style={{ color: 'var(--color-text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          A focused skincare routine designed to cleanse, treat, and moisturize — no unnecessary steps.
        </p>
      </section>

      <ProductsClient products={PRODUCTS} />
      <Footer />
    </>
  )
}
