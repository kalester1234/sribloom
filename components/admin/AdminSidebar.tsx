'use client'

import Image from 'next/image'

export default function AdminSidebar() {
  return (
    <aside
      style={{
        width: '260px',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        background: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        padding: '1.5rem',
        zIndex: 30,
      }}
      className="admin-sidebar"
    >
      {/* Logo */}
      <div style={{ marginBottom: '2.5rem' }}>
        <a
          href="/"
          style={{
            display: 'inline-block',
            textDecoration: 'none',
          }}
        >
          <Image src="/logo.png" alt="SRI BLOOM" width={100} height={90} style={{ objectFit: 'contain' }} priority />
        </a>
        <p
          style={{
            fontSize: '0.6875rem',
            color: 'var(--color-text-muted)',
            marginTop: '0.25rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}
        >
          Admin Panel
        </p>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
        {[
          { href: '/admin', icon: '◈', label: 'Dashboard' },
          { href: '/admin/products', icon: '◉', label: 'Products' },
          { href: '/admin/orders', icon: '◎', label: 'Orders' },
          { href: '/admin/products/new', icon: '+', label: 'Add Product' },
        ].map((item) => (
          <a
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: '6px',
              color: 'var(--color-text-secondary)',
              textDecoration: 'none',
              fontSize: '0.9375rem',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-surface-2)'
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-primary)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
              ;(e.currentTarget as HTMLAnchorElement).style.color = 'var(--color-text-secondary)'
            }}
          >
            <span style={{ color: 'var(--color-primary)', width: '20px' }}>{item.icon}</span>
            {item.label}
          </a>
        ))}
      </nav>

      {/* Back to Store */}
      <a
        href="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.75rem 1rem',
          borderRadius: '6px',
          background: 'var(--color-primary-glow)',
          border: '1px solid rgba(139, 92, 246, 0.2)',
          color: 'var(--color-accent)',
          textDecoration: 'none',
          fontSize: '0.875rem',
          marginTop: '1rem',
        }}
      >
        ← Back to Store
      </a>
    </aside>
  )
}
