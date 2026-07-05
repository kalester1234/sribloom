import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Terms and Conditions | SRI BLOOM',
  description: 'Terms and conditions for using the SRI BLOOM platform.',
}

export default function TermsPage() {
  return (
    <>
      <section
        style={{
          paddingTop: 'calc(var(--nav-height) + 5rem)',
          paddingBottom: '3rem',
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          padding: 'calc(var(--nav-height) + 5rem) 2rem 3rem',
        }}
      >
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            fontWeight: 300,
            marginBottom: '1rem',
            color: 'var(--color-text-primary)',
          }}
        >
          Terms and Conditions
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
          Last Updated: July 5, 2026
        </p>
      </section>

      <section
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 2rem 8rem',
          color: 'var(--color-text-secondary)',
          lineHeight: 1.8,
          fontSize: '1.0625rem',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
              1. Introduction
            </h2>
            <p>
              Welcome to SRI BLOOM. These Terms and Conditions govern your use of our website and services. By accessing or using our platform, you agree to be bound by these terms. If you do not agree, please refrain from using our services.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
              2. Intellectual Property
            </h2>
            <p>
              All content published and made available on our site is the property of SRI BLOOM and the site&apos;s creators. This includes, but is not limited to images, text, logos, documents, downloadable files and anything that contributes to the composition of our site.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
              3. Products and Pricing
            </h2>
            <p>
              We strive to display our products as accurately as possible. Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue a Product without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, or suspension.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
              4. Orders and Fulfillment
            </h2>
            <p>
              We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. 
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
              5. Governing Law
            </h2>
            <p>
              These Terms and Conditions and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of the jurisdiction in which SRI BLOOM operates.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
