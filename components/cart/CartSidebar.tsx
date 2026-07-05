'use client'

import { X, Minus, Plus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getTotalPrice } = useCartStore()
  const totalPrice = getTotalPrice()

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="cart-overlay animate-fade-in"
          onClick={closeCart}
          style={{ cursor: 'pointer' }}
        />
      )}

      {/* Sidebar */}
      <aside className={`cart-sidebar ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '1.5rem',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
              }}
            >
              Your Ritual Selection
            </h2>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
              {items.length} {items.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            onClick={closeCart}
            id="close-cart"
            style={{
              background: 'none',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              transition: 'all 0.2s',
            }}
            aria-label="Close cart"
          >
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
          {items.length === 0 ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                gap: '1rem',
                color: 'var(--color-text-muted)',
              }}
            >
              <ShoppingBag size={48} strokeWidth={1} />
              <p style={{ fontSize: '1rem' }}>Your ritual is empty</p>
              <button onClick={closeCart} className="btn-secondary" style={{ fontSize: '0.8125rem', padding: '0.625rem 1.5rem' }}>
                Explore Products
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    background: 'var(--color-surface-2)',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      background: 'var(--color-surface)',
                    }}
                  >
                    <Image
                      src={item.product.image_url}
                      alt={item.product.name}
                      width={72}
                      height={72}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                    />
                  </div>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        color: 'var(--color-text-primary)',
                        marginBottom: '0.25rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {item.product.name}
                    </p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.75rem' }}>
                      {item.product.size}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Quantity */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          background: 'var(--color-surface)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          padding: '0.25rem',
                        }}
                      >
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={12} />
                        </button>
                        <span style={{ fontSize: '0.875rem', minWidth: '20px', textAlign: 'center', color: 'var(--color-text-primary)' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-secondary)',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                          }}
                          aria-label="Increase quantity"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeItem(item.product.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text-muted)',
                            cursor: 'pointer',
                            padding: '0.25rem',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'color 0.2s',
                          }}
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: '1.5rem',
              borderTop: '1px solid var(--color-border)',
              background: 'var(--color-surface-2)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Subtotal</span>
              <span style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>${totalPrice.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--color-text-muted)' }}>Shipping</span>
              <span style={{ color: 'var(--color-success)', fontSize: '0.875rem' }}>Complimentary</span>
            </div>
            <div className="divider" style={{ marginBottom: '1.25rem' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>Total</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-accent)' }}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>

            <Link
              href="/checkout"
              id="checkout-btn"
              className="btn-primary"
              onClick={closeCart}
              style={{ width: '100%', justifyContent: 'center', position: 'relative', zIndex: 1 }}
            >
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>

            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.75rem' }}>
              Free shipping & premium gift wrapping included.
            </p>
          </div>
        )}
      </aside>
    </>
  )
}
