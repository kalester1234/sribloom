'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, ArrowLeft, ArrowRight, Check, Star, Droplets, Sparkles } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCartStore } from '@/store/cart'
import ProductCard from '@/components/products/ProductCard'

interface Props {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetailClient({ product, relatedProducts }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'howto'>('details')
  const { addItem, openCart } = useCartStore()

  const handleAddToCart = () => {
    addItem(product, quantity)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      openCart()
    }, 600)
  }

  return (
    <>
      {/* Back button */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'calc(var(--nav-height) + 2rem) 2rem 0',
        }}
      >
        <Link
          href="/products"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-text-muted)',
            textDecoration: 'none',
            fontSize: '0.875rem',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}
          id="back-to-products"
        >
          <ArrowLeft size={14} />
          Back to Products
        </Link>
      </div>

      {/* Main Product Section */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '2rem 2rem 5rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'start',
        }}
        className="product-detail-grid"
      >
        {/* Left: Image */}
        <div style={{ position: 'sticky', top: 'calc(var(--nav-height) + 2rem)' }}>
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              position: 'relative',
              paddingBottom: '100%',
            }}
            className="animate-pulse-glow"
          >
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Glow overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 60%)',
                pointerEvents: 'none',
              }}
            />
          </div>

          {/* Thumbnail row */}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem' }}>
            {[product.image_url, '/hero-products.png'].map((src, i) => (
              <div
                key={i}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: i === 0 ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                  cursor: 'pointer',
                  position: 'relative',
                  flex: '0 0 auto',
                }}
              >
                <Image src={src} alt={`View ${i + 1}`} fill style={{ objectFit: 'cover' }} sizes="80px" />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            {product.category}
          </span>

          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 400,
              lineHeight: 1.1,
              marginBottom: '0.75rem',
              color: 'var(--color-text-primary)',
            }}
          >
            {product.name}
          </h1>

          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.0625rem' }}>
            {product.description}
          </p>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star key={s} size={14} fill="var(--color-warning)" color="var(--color-warning)" />
            ))}
            <span style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginLeft: '0.25rem' }}>
              4.9 (128 reviews)
            </span>
          </div>

          {/* Price */}
          <div
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2.5rem',
              color: 'var(--color-accent)',
              marginBottom: '0.5rem',
              fontWeight: 400,
            }}
          >
            ${product.price.toFixed(2)}
          </div>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-success)', marginBottom: '2rem' }}>
            ✓ Complimentary shipping & gift wrapping
          </p>

          {/* Size & skin type */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.75rem',
              marginBottom: '2rem',
            }}
          >
            {[
              { icon: <Droplets size={14} />, label: 'Size', value: product.size },
              { icon: <Sparkles size={14} />, label: 'Skin Type', value: product.skin_type },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  padding: '0.875rem',
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '6px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
                  {item.icon}
                  <span style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-text-muted)' }}>
                    {item.label}
                  </span>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>{item.value}</p>
              </div>
            ))}
          </div>

          {/* Quantity & Add to Cart */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                border: '1px solid var(--color-border)',
                borderRadius: '4px',
                overflow: 'hidden',
              }}
            >
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: '44px',
                  height: '52px',
                  background: 'var(--color-surface-2)',
                  border: 'none',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span
                style={{
                  width: '52px',
                  textAlign: 'center',
                  fontSize: '1rem',
                  color: 'var(--color-text-primary)',
                  fontWeight: 600,
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: '44px',
                  height: '52px',
                  background: 'var(--color-surface-2)',
                  border: 'none',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  fontSize: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              id={`pdp-add-to-cart-${product.slug}`}
              onClick={handleAddToCart}
              disabled={added}
              className="btn-primary"
              style={{
                flex: 1,
                background: added ? 'var(--color-success)' : undefined,
                padding: '0.875rem',
              }}
            >
              {added ? (
                <>
                  <Check size={16} /> Added to Ritual
                </>
              ) : (
                <>
                  <ShoppingBag size={16} /> Add to Ritual
                </>
              )}
            </button>
          </div>

          <Link href="/checkout" className="btn-secondary" id={`buy-now-${product.slug}`} style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            Buy Now
            <ArrowRight size={16} />
          </Link>

          {/* Tabs */}
          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem' }}>
            <div style={{ display: 'flex', gap: '0', marginBottom: '1.5rem', borderBottom: '1px solid var(--color-border)' }}>
              {[
                { key: 'details', label: 'Details' },
                { key: 'ingredients', label: 'Ingredients' },
                { key: 'howto', label: 'How to Use' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  id={`tab-${tab.key}`}
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  style={{
                    padding: '0.75rem 1.25rem',
                    background: 'none',
                    border: 'none',
                    borderBottom: activeTab === tab.key ? '2px solid var(--color-primary)' : '2px solid transparent',
                    color: activeTab === tab.key ? 'var(--color-accent)' : 'var(--color-text-muted)',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em',
                    transition: 'all 0.2s',
                    marginBottom: '-1px',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === 'details' && (
              <div>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                  {product.long_description}
                </p>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Targets
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {product.concerns.map((c) => (
                      <span
                        key={c}
                        className="badge"
                        style={{ borderRadius: '4px' }}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <div
                  style={{
                    padding: '1rem',
                    background: 'var(--color-primary-glow)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    borderRadius: '6px',
                    marginBottom: '1.5rem',
                  }}
                >
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-accent)', fontWeight: 600, marginBottom: '0.25rem' }}>
                    Key Extract
                  </p>
                  <p style={{ fontSize: '1.125rem', color: 'var(--color-text-primary)' }}>{product.key_ingredient}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    Selected for compatibility, comfort, and performance within modern routines.
                  </p>
                </div>
                <div>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Core Formula
                  </p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {product.ingredients.map((ing) => (
                      <li
                        key={ing}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          padding: '0.75rem',
                          background: 'var(--color-surface-2)',
                          borderRadius: '4px',
                          fontSize: '0.9375rem',
                          color: 'var(--color-text-primary)',
                        }}
                      >
                        <span style={{ color: 'var(--color-primary)' }}>◈</span>
                        {ing}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'howto' && (
              <ol style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {product.how_to_use.map((step, i) => (
                  <li
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      padding: '1rem',
                      background: 'var(--color-surface-2)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '6px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.25rem',
                        color: 'var(--color-primary)',
                        minWidth: '2rem',
                        fontWeight: 500,
                      }}
                    >
                      0{i + 1}
                    </span>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6, fontSize: '0.9375rem' }}>{step}</p>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section
          style={{
            background: 'var(--color-surface)',
            borderTop: '1px solid var(--color-border)',
            padding: '5rem 2rem',
          }}
        >
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2.25rem',
                fontWeight: 400,
                marginBottom: '2.5rem',
                textAlign: 'center',
              }}
            >
              Complete Your Ritual
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          .product-detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
