import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Leaf, Shield, Sparkles, Clock } from 'lucide-react'
import { PRODUCTS } from '@/lib/products'
import ProductCard from '@/components/products/ProductCard'
import Footer from '@/components/layout/Footer'
import HeroImageSlider from '@/components/home/HeroImageSlider'

export default function HomePage() {
  const featuredProducts = PRODUCTS.filter((p) => p.category !== 'bundle').slice(0, 3)

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: 'var(--nav-height)',
        }}
      >
        {/* Background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <Image
            src="/hero-banner.png"
            alt="SRI BLOOM hero"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center top' }}
            priority
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(135deg, rgba(10,10,15,0.92) 0%, rgba(10,10,15,0.7) 50%, rgba(10,10,15,0.85) 100%)',
            }}
          />
          {/* Purple glow bottom */}
          <div
            style={{
              position: 'absolute',
              bottom: '-100px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '400px',
              background: 'radial-gradient(ellipse, rgba(139,92,246,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left copy */}
          <div>
            <div className="badge" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
              ✦ Botanical Precision
            </div>
            <h1
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                fontWeight: 300,
                lineHeight: 1.05,
                marginBottom: '1.5rem',
                color: 'var(--color-text-primary)',
              }}
            >
              Bloom Into
              <br />
              <span className="gradient-text">Your Best Self</span>
            </h1>
            <p
              style={{
                fontSize: '1.0625rem',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                maxWidth: '520px',
                marginBottom: '2.5rem',
              }}
            >
              Where futuristic precision meets ancient botanical wisdom. Our formulations are designed
              at the molecular level to harmonize with your unique dermal frequency, revealing a
              luminosity that transcends time.
            </p>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/products" className="btn-primary" id="hero-shop-btn">
                Shop the Collection
                <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="btn-secondary" id="hero-about-btn">
                Our Philosophy
              </Link>
            </div>

            {/* Trust stats */}
            <div
              style={{
                display: 'flex',
                gap: '2.5rem',
                marginTop: '3rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--color-border)',
              }}
            >
              {[
                { value: '3', label: 'Core Products' },
                { value: '100%', label: 'Skin-Tested' },
                { value: '∞', label: 'Natural Glow' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '2rem',
                      fontWeight: 400,
                      color: 'var(--color-accent)',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — floating products */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div className="animate-float" style={{ position: 'relative', zIndex: 2 }}>
              <div
                style={{
                  width: '380px',
                  height: '420px',
                  position: 'relative',
                }}
                className="animate-pulse-glow"
              >
                <HeroImageSlider />
              </div>
            </div>

          </div>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--color-text-muted)',
            fontSize: '0.75rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          <span>Scroll</span>
          <div
            style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, var(--color-primary), transparent)',
              animation: 'fadeIn 2s ease infinite',
            }}
          />
        </div>
      </section>

      {/* ── PHILOSOPHY STRIP ── */}
      <section
        style={{
          background: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
          padding: '2rem 0',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '3rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 2rem',
          }}
        >
          {[
            { icon: <Leaf size={18} />, text: 'Botanically Sourced' },
            { icon: <Shield size={18} />, text: 'Dermatologically Tested' },
            { icon: <Sparkles size={18} />, text: 'Premium Efficacy' },
            { icon: <Clock size={18} />, text: 'Everyday Ritual' },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                color: 'var(--color-text-secondary)',
                fontSize: '0.875rem',
                letterSpacing: '0.05em',
              }}
            >
              <span style={{ color: 'var(--color-primary)' }}>{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section
        id="featured"
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '6rem 2rem',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            Curated Collections
          </span>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)',
              fontWeight: 400,
              color: 'var(--color-text-primary)',
              marginBottom: '1rem',
            }}
          >
            The Alchemy Cycle
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '0 auto', lineHeight: 1.7 }}>
            Three essentials for a complete daily skincare routine — carefully formulated to work in
            harmony with your skin&apos;s natural rhythm.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {featuredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link href="/products" className="btn-secondary" id="view-all-btn">
            View All Products
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── THE RITUAL SECTION ── */}
      <section
        style={{
          background: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          padding: '6rem 2rem',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '4rem',
              alignItems: 'center',
            }}
            className="ritual-grid"
          >
            <div>
              <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
                The Ritual
              </span>
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2rem, 3.5vw, 3rem)',
                  fontWeight: 400,
                  marginBottom: '1.5rem',
                  lineHeight: 1.2,
                }}
              >
                The Molecular Alchemy of Radical Radiance.
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '2rem' }}>
                At SRI BLOOM, every product tells a story of quiet strength. Each formula is crafted
                to work at the skin&apos;s molecular frequency — balancing hydration, brightness, and barrier
                protection in a synergistic daily ritual.
              </p>

              {/* Steps */}
              {[
                { step: '01', title: 'Cleanse', desc: 'Reset and prepare — the gentle foundation.' },
                { step: '02', title: 'Treat', desc: 'Target dehydration and dullness with active botanicals.' },
                { step: '03', title: 'Protect', desc: 'Seal hydration and fortify the skin barrier.' },
              ].map((s) => (
                <div
                  key={s.step}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    marginBottom: '1.25rem',
                    padding: '1rem',
                    borderRadius: '6px',
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.25rem',
                      color: 'var(--color-primary)',
                      minWidth: '2.5rem',
                    }}
                  >
                    {s.step}
                  </span>
                  <div>
                    <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                      {s.title}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>{s.desc}</p>
                  </div>
                </div>
              ))}

              <Link href="/products" className="btn-primary" id="ritual-shop-btn" style={{ marginTop: '1rem' }}>
                Start Your Ritual
                <ArrowRight size={16} />
              </Link>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}
            >
              {['/serum.png', '/day-cream.png', '/cleanser.png', '/hero-products.png'].map((src, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: '8px',
                    overflow: 'hidden',
                    paddingBottom: i === 0 || i === 3 ? '120%' : '80%',
                    position: 'relative',
                    background: 'var(--color-surface-2)',
                    border: '1px solid var(--color-border)',
                    gridColumn: i === 3 ? 'span 2' : 'auto',
                  }}
                >
                  <Image
                    src={src}
                    alt={`SRI BLOOM product ${i + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="200px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── BUNDLE CTA ── */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '6rem 2rem',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(99,102,241,0.1) 100%)',
            border: '1px solid var(--color-border-hover)',
            borderRadius: '16px',
            padding: '4rem 2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse at center, rgba(139,92,246,0.1) 0%, transparent 60%)',
              pointerEvents: 'none',
            }}
          />
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
            Best Value
          </span>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 300,
              marginBottom: '1rem',
              position: 'relative',
            }}
          >
            The Complete Ritual Set
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '520px', margin: '0 auto 2rem', lineHeight: 1.7 }}>
            Your DNA is the blueprint. Get the full three-product routine — Cleanser, Serum, and Day
            Cream — curated to work in perfect harmony.
          </p>
          <div
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '3rem',
              color: 'var(--color-accent)',
              marginBottom: '2rem',
            }}
          >
            $125.00{' '}
            <span
              style={{
                fontSize: '1.25rem',
                color: 'var(--color-text-muted)',
                textDecoration: 'line-through',
                marginLeft: '0.5rem',
              }}
            >
              $139.00
            </span>
          </div>
          <Link href="/products/complete-ritual-set" className="btn-primary" id="bundle-cta-btn" style={{ fontSize: '1rem' }}>
            Explore the Ritual Set
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* ── PHILOSOPHY ── */}
      <section
        style={{
          background: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          padding: '6rem 2rem',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            &ldquo;In every petal, there is a story of quiet strength.
            <br />
            In every soul, a bloom waiting to unfurl.&rdquo;
          </p>
          <div className="divider" />
          <p style={{ marginTop: '2rem', color: 'var(--color-text-muted)', fontSize: '0.875rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            — SRI BLOOM, Founded in Copenhagen
          </p>
        </div>
      </section>

      <Footer />
    </>
  )
}
