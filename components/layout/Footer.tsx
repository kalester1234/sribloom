import Link from 'next/link'
import Image from 'next/image'
import { Globe2, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        padding: '4rem 2rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          gap: '3rem',
          marginBottom: '3rem',
        }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <Link
            href="/"
            style={{
              display: 'inline-block',
              marginBottom: '1rem',
            }}
          >
            <Image src="/logo.png" alt="SRI BLOOM" width={110} height={70} style={{ objectFit: 'contain' }} />
          </Link>
          <p
            style={{
              fontSize: '0.875rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              maxWidth: '280px',
            }}
          >
            The intersection of high-fidelity science and the art of apothecary. Refined for the
            modern alchemist.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
            <a
              href="mailto:hello@sribloom.com"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              aria-label="Email us"
            >
              <Mail size={15} />
            </a>
            <a
              href="tel:+919999999999"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              aria-label="Call us"
            >
              <Phone size={15} />
            </a>
            <a
              href="#"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-text-muted)',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
              aria-label="Social media"
            >
              <Globe2 size={15} />
            </a>
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
              marginBottom: '1.25rem',
            }}
          >
            Shop
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { href: '/products', label: 'All Products' },
              { href: '/products/botanical-glow-serum', label: 'Serum' },
              { href: '/products/luminance-day-cream', label: 'Day Cream' },
              { href: '/products/pure-clarity-cleanser', label: 'Cleanser' },
              { href: '/products/complete-ritual-set', label: 'Ritual Set' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
              marginBottom: '1.25rem',
            }}
          >
            Navigate
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              { href: '/about', label: 'About' },
              { href: '/contact', label: 'Contact' },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h4
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: 'var(--color-text-primary)',
              marginBottom: '1.25rem',
            }}
          >
            Connect
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="mailto:hello@sribloom.com"
              style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}
            >
              hello@sribloom.com
            </a>
            <a
              href="tel:+919999999999"
              style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}
            >
              +91 99999 99999
            </a>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Mon – Sat, 10 AM – 7 PM</p>
          </div>
        </div>
      </div>

      <div className="divider" />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingTop: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
          © 2026 SRI BLOOM. All Rights Reserved.
        </p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { href: '/privacy', label: 'Privacy' },
            { href: '/terms', label: 'Terms' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', textDecoration: 'none' }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>


    </footer>
  )
}
