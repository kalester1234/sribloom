import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import { Leaf, FlaskConical, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About | Our Philosophy',
  description:
    'The story of SRI BLOOM — where high-fidelity science meets the art of apothecary. Discover our mission, vision, and founding principles.',
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: 'calc(var(--nav-height) + 5rem)',
          paddingBottom: '5rem',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          padding: 'calc(var(--nav-height) + 5rem) 2rem 5rem',
          background: 'radial-gradient(ellipse at top, rgba(139,92,246,0.1) 0%, transparent 60%)',
        }}
      >
        <span className="badge" style={{ marginBottom: '1.5rem', display: 'inline-flex' }}>
          The Origin
        </span>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3rem, 6vw, 5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: '2rem',
            color: 'var(--color-text-primary)',
          }}
        >
          About <span className="gradient-text">SRI BLOOM</span>
        </h1>
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '1.5rem',
            fontStyle: 'italic',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          &ldquo;In every petal, there is a story of quiet strength. In every soul, a bloom waiting to unfurl.&rdquo;
        </p>
      </section>

      <div className="divider" />

      {/* Who We Are */}
      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
        }}
        className="about-grid"
      >
        <div>
          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 400,
              marginBottom: '1.5rem',
              lineHeight: 1.2,
            }}
          >
            Who We Are
          </h2>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '1.5rem', fontSize: '1.0625rem' }}>
            SRI BLOOM is a cosmetic brand focused on helping individuals feel confident and beautiful
            in their own skin. Our products are designed for everyday use, combining quality with
            affordability.
          </p>
          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.0625rem' }}>
            Thoughtfully crafted beauty essentials that blend botanical care with modern performance —
            so your everyday routine feels elevated, not complicated.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {[
              '✓ Skin-first formulas',
              '✓ Consistent quality',
              '✓ Accessible care',
              '✓ Transparent sourcing',
            ].map((point) => (
              <div
                key={point}
                style={{
                  fontSize: '0.9375rem',
                  color: 'var(--color-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <span style={{ color: 'var(--color-primary)' }}>{point.split(' ')[0]}</span>
                {point.split(' ').slice(1).join(' ')}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[
            {
              icon: <FlaskConical size={20} />,
              title: 'Mission',
              desc: 'To provide reliable and skin-friendly cosmetic products that enhance confidence and promote self-care.',
            },
            {
              icon: <Globe size={20} />,
              title: 'Vision',
              desc: 'To become a trusted cosmetic brand both online and offline, known for quality and customer satisfaction.',
            },
            {
              icon: <Leaf size={20} />,
              title: 'Promise',
              desc: 'We ensure every product delivers a "feel good" experience that our customers can trust.',
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                padding: '1.5rem',
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: '10px',
                display: 'flex',
                gap: '1rem',
                transition: 'all 0.3s ease',
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '8px',
                  background: 'var(--color-primary-glow)',
                  border: '1px solid rgba(139, 92, 246, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent)',
                  flexShrink: 0,
                }}
              >
                {item.icon}
              </div>
              <div>
                <p style={{ fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: '0.375rem' }}>
                  {item.title}
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Studio Principles */}
      <section
        style={{
          background: 'var(--color-surface)',
          borderTop: '1px solid var(--color-border)',
          padding: '5rem 2rem',
        }}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Studio Principles</span>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}>
              Craft over noise.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                title: 'Small-Batch Precision',
                desc: 'Controlled production cycles to protect consistency, freshness, and texture integrity.',
              },
              {
                title: 'Evidence-Led Formulation',
                desc: 'Actives are selected for relevance, compatibility, and long-term skin barrier support.',
              },
              {
                title: 'Transparent Sourcing',
                desc: 'Every ingredient pathway is reviewed for ethics, traceability, and quality assurance.',
              },
            ].map((principle) => (
              <div
                key={principle.title}
                style={{
                  padding: '2rem',
                  background: 'var(--color-surface-2)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '10px',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>✦</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem', fontWeight: 500, marginBottom: '0.75rem' }}>
                  {principle.title}
                </h3>
                <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span className="badge" style={{ marginBottom: '1rem', display: 'inline-flex' }}>Our Path</span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400 }}>
            From first blend to global ritual.
          </h2>
        </div>

        <div style={{ position: 'relative', paddingLeft: '2rem', borderLeft: '1px solid var(--color-border-hover)' }}>
          {[
            {
              year: '2020',
              title: 'The First Formula',
              desc: 'Our founding team created a prototype botanical serum in a small Copenhagen studio.',
            },
            {
              year: '2022',
              title: 'Community Launch',
              desc: 'Sri Bloom introduced curated rituals for a growing audience of ingredient-conscious users.',
            },
            {
              year: '2024',
              title: 'Global Bloom',
              desc: 'Our routines now support customers across regions while preserving artisanal standards.',
            },
          ].map((event, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                paddingBottom: '3rem',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '-2.5rem',
                  top: '0.25rem',
                  width: '1rem',
                  height: '1rem',
                  borderRadius: '50%',
                  background: 'var(--color-primary)',
                  boxShadow: '0 0 12px var(--color-primary)',
                }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
                {event.year}
              </span>
              <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 500, margin: '0.5rem 0' }}>
                {event.title}
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>{event.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
