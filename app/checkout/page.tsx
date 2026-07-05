'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cart'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Lock, CheckCircle } from 'lucide-react'
import Footer from '@/components/layout/Footer'

interface FormData {
  full_name: string
  email: string
  phone: string
  address_line1: string
  address_line2: string
  city: string
  state: string
  postal_code: string
  country: string
}

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCartStore()
  const [step, setStep] = useState<'shipping' | 'review' | 'success'>('shipping')
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: 'India',
  })

  const totalPrice = getTotalPrice()
  const shipping = 0

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate order submission
    await new Promise((r) => setTimeout(r, 1500))

    setLoading(false)
    setStep('success')
    clearCart()
  }

  if (step === 'success') {
    return (
      <>
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            textAlign: 'center',
            paddingTop: 'var(--nav-height)',
          }}
        >
          <div
            style={{
              background: 'radial-gradient(ellipse at center, rgba(16,185,129,0.1) 0%, transparent 60%)',
              padding: '3rem',
              borderRadius: '16px',
              border: '1px solid rgba(16,185,129,0.2)',
              maxWidth: '500px',
              width: '100%',
            }}
          >
            <CheckCircle size={64} color="var(--color-success)" style={{ marginBottom: '1.5rem' }} />
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2.5rem',
                fontWeight: 400,
                marginBottom: '1rem',
              }}
            >
              Order Confirmed
            </h1>
            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Thank you for your ritual selection. We&apos;re preparing your order with love and care.
              You&apos;ll receive a confirmation email shortly.
            </p>
            <Link href="/products" className="btn-primary" id="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <section
        style={{
          minHeight: '100vh',
          paddingTop: 'calc(var(--nav-height) + 2rem)',
          paddingBottom: '4rem',
        }}
      >
        <div
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 2rem',
          }}
        >
          {/* Back */}
          <Link
            href="/products"
            id="back-from-checkout"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              marginBottom: '2rem',
            }}
          >
            <ArrowLeft size={14} />
            Back to Shop
          </Link>

          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              marginBottom: '2.5rem',
            }}
          >
            Ritual Checkout
          </h1>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.5fr 1fr',
              gap: '3rem',
              alignItems: 'start',
            }}
            className="checkout-grid"
          >
            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '2rem',
                  marginBottom: '1.5rem',
                }}
              >
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  Shipping Information
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Full Name *
                    </label>
                    <input
                      name="full_name"
                      required
                      value={form.full_name}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Your full name"
                      id="checkout-name"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="you@example.com"
                      id="checkout-email"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Phone *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="+91 98765 43210"
                      id="checkout-phone"
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Address *
                    </label>
                    <input
                      name="address_line1"
                      required
                      value={form.address_line1}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Street address"
                      id="checkout-address"
                    />
                  </div>

                  <div style={{ gridColumn: 'span 2' }}>
                    <input
                      name="address_line2"
                      value={form.address_line2}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Apartment, suite, etc. (optional)"
                      id="checkout-address2"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      City *
                    </label>
                    <input
                      name="city"
                      required
                      value={form.city}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="City"
                      id="checkout-city"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      State *
                    </label>
                    <input
                      name="state"
                      required
                      value={form.state}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="State"
                      id="checkout-state"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Postal Code *
                    </label>
                    <input
                      name="postal_code"
                      required
                      value={form.postal_code}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="PIN Code"
                      id="checkout-postal"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Country
                    </label>
                    <input
                      name="country"
                      value={form.country}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="Country"
                      id="checkout-country"
                    />
                  </div>
                </div>
              </div>

              {/* Payment section */}
              <div
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  padding: '2rem',
                  marginBottom: '1.5rem',
                }}
              >
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: '1rem' }}>
                  Payment
                </h2>
                <div
                  style={{
                    padding: '1.25rem',
                    background: 'var(--color-primary-glow)',
                    border: '1px solid rgba(139,92,246,0.2)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'var(--color-accent)',
                    fontSize: '0.9375rem',
                  }}
                >
                  <Lock size={16} />
                  Secure payment powered by Razorpay / Stripe (Connect in Supabase after setup)
                </div>
              </div>

              <button
                type="submit"
                id="place-order-btn"
                className="btn-primary"
                disabled={loading || items.length === 0}
                style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', position: 'relative', zIndex: 1 }}
              >
                {loading ? 'Processing...' : `Place Order — $${(totalPrice + shipping).toFixed(2)}`}
              </button>
            </form>

            {/* Order Summary */}
            <div
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '1.5rem',
                position: 'sticky',
                top: 'calc(var(--nav-height) + 2rem)',
              }}
            >
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                Your Ritual
              </h2>

              {items.length === 0 ? (
                <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '2rem 0' }}>
                  Your cart is empty. <Link href="/products" style={{ color: 'var(--color-accent)' }}>Shop now</Link>
                </p>
              ) : (
                <div>
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: '0.875rem',
                        paddingBottom: '1rem',
                        marginBottom: '1rem',
                        borderBottom: '1px solid var(--color-border)',
                      }}
                    >
                      <div
                        style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          flexShrink: 0,
                          background: 'var(--color-surface-2)',
                          position: 'relative',
                        }}
                      >
                        <Image
                          src={item.product.image_url}
                          alt={item.product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="60px"
                        />
                        <span
                          style={{
                            position: 'absolute',
                            top: '-6px',
                            right: '-6px',
                            background: 'var(--color-primary)',
                            color: 'white',
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {item.quantity}
                        </span>
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                          {item.product.name}
                        </p>
                        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>{item.product.size}</p>
                      </div>
                      <p style={{ fontWeight: 600, color: 'var(--color-accent)' }}>${(item.product.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}

                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>Shipping</span>
                    <span style={{ color: 'var(--color-success)' }}>Complimentary</span>
                  </div>
                  <div className="divider" style={{ marginBottom: '1.25rem' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.25rem' }}>Total</span>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', color: 'var(--color-accent)' }}>
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />

      <style jsx>{`
        @media (max-width: 900px) {
          .checkout-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  )
}
