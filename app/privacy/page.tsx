import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | SRI BLOOM',
  description: 'Privacy Policy and data handling terms for the SRI BLOOM platform.',
}

export default function PrivacyPage() {
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
          Privacy Policy
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
              1. Information We Collect
            </h2>
            <p>
              When you visit SRI BLOOM, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. We collect this data to ensure the platform operates efficiently.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
              2. How We Use Your Information
            </h2>
            <p>
              We use the Device Information that we collect to help us screen for potential risk and fraud, and more generally to improve and optimize our Site (for example, by generating analytics about how our customers browse and interact with the Site).
            </p>
            <p style={{ marginTop: '1rem' }}>
              Order Information is used to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
              3. Data Sharing
            </h2>
            <p>
              We share your Personal Information with third parties solely to help us leverage it as described above. For example, we use analytical tools to understand how our customers navigate our platform. We may also share your Personal Information to comply with applicable laws and regulations.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
              4. Data Retention
            </h2>
            <p>
              When you place an order through the Site, we will maintain your Order Information for our records unless and until you ask us to delete this information.
            </p>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.75rem', fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '1rem' }}>
              5. Your Rights
            </h2>
            <p>
              If you are a European resident, you have the right to access personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information provided on our site.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
