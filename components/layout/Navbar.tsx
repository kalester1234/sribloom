'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCartStore } from '@/store/cart'
import { useState, useEffect } from 'react'
import Image from 'next/image'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { getTotalItems, openCart } = useCartStore()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const totalItems = mounted ? getTotalItems() : 0

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          height: 'var(--nav-height)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 2rem',
          transition: 'all 0.3s ease',
          background: scrolled
            ? 'rgba(10, 10, 15, 0.95)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : 'none',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            marginRight: 'auto',
          }}
        >
          <Image src="/logo.png" alt="SRI BLOOM" width={90} height={45} style={{ objectFit: 'contain' }} priority />
        </Link>

        {/* Desktop Nav */}
        <div
          style={{
            display: 'flex',
            gap: '2.5rem',
            alignItems: 'center',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          className="hidden-mobile"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color:
                  pathname === link.href
                    ? 'var(--color-accent)'
                    : 'var(--color-text-secondary)',
                textDecoration: 'none',
                fontSize: '0.8125rem',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
                borderBottom:
                  pathname === link.href
                    ? '1px solid var(--color-primary)'
                    : '1px solid transparent',
                paddingBottom: '2px',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
          {/* Cart */}
          <button
            onClick={openCart}
            id="cart-button"
            style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s',
            }}
            aria-label={`Shopping cart with ${totalItems} items`}
          >
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: 'var(--color-primary)',
                  color: 'white',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {totalItems}
              </span>
            )}
          </button>



          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-primary)',
              cursor: 'pointer',
              padding: '0.5rem',
              display: 'none',
            }}
            className="mobile-menu-btn"
            aria-label="Toggle mobile menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 40,
            paddingTop: 'var(--nav-height)',
            background: 'rgba(10, 10, 15, 0.98)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2.5rem',
                color:
                  pathname === link.href
                    ? 'var(--color-accent)'
                    : 'var(--color-text-primary)',
                textDecoration: 'none',
                fontWeight: 400,
              }}
            >
              {link.label}
            </Link>
          ))}

        </div>
      )}

      <style jsx>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .admin-link-desktop { display: inline-flex !important; }
        }
        button:hover {
          color: var(--color-accent) !important;
        }
      `}</style>
    </>
  )
}
