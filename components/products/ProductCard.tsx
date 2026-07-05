'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingBag, ArrowRight } from 'lucide-react'
import { Product } from '@/lib/types'
import { useCartStore } from '@/store/cart'
import { useState } from 'react'

interface ProductCardProps {
  product: Product
  index?: number
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem, openCart } = useCartStore()
  const [adding, setAdding] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setAdding(true)
    addItem(product)
    setTimeout(() => {
      setAdding(false)
      openCart()
    }, 400)
  }

  return (
    <div
      className="product-card"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: 'both',
      }}
    >
      {/* Image Container */}
      <Link href={`/products/${product.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            paddingBottom: '100%',
            overflow: 'hidden',
            background: 'var(--color-surface-2)',
          }}
        >
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Category Badge */}
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
            }}
          >
            <span className="badge">{product.category}</span>
          </div>

          {/* Hover overlay */}
          <div
            className="card-overlay"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10,10,15,0.8) 0%, transparent 60%)',
              opacity: 0,
              transition: 'opacity 0.3s ease',
            }}
          />
        </div>
      </Link>

      {/* Content */}
      <div style={{ padding: '1.25rem' }}>
        <Link href={`/products/${product.slug}`} style={{ textDecoration: 'none' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginBottom: '0.375rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            {product.key_ingredient}
          </p>
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.375rem',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              marginBottom: '0.5rem',
              lineHeight: 1.2,
            }}
          >
            {product.name}
          </h3>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '1rem',
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.5rem',
              fontWeight: 400,
              color: 'var(--color-accent)',
            }}
          >
            ${product.price.toFixed(2)}
          </span>

          <button
            id={`add-to-cart-${product.slug}`}
            onClick={handleAddToCart}
            disabled={adding}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.125rem',
              background: adding
                ? 'var(--color-success)'
                : 'linear-gradient(135deg, #8b5cf6, #6366f1)',
              border: 'none',
              borderRadius: '2px',
              color: 'white',
              fontSize: '0.8125rem',
              fontWeight: 500,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag size={14} />
            {adding ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>

      <style jsx>{`
        .product-card:hover .card-overlay {
          opacity: 1 !important;
        }
        .product-card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  )
}
