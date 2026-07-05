import type { Metadata } from 'next'
import Footer from '@/components/layout/Footer'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact Us | SRI BLOOM',
  description: 'Get in touch with SRI BLOOM. We are here to assist you with inquiries, product information, and support.',
}

export default function ContactPage() {
  return (
    <>
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
          Get in Touch
        </span>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: '1.5rem',
            color: 'var(--color-text-primary)',
          }}
        >
          We&apos;re Here to <span className="gradient-text">Help</span>
        </h1>
        <p
          style={{
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            maxWidth: '500px',
            margin: '0 auto',
            fontSize: '1.0625rem',
          }}
        >
          Whether you have a question about our botanical formulas, an order, or just want to say hello, we&apos;d love to hear from you.
        </p>
      </section>

      <section
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 2rem 8rem',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)',
          gap: '4rem',
        }}
        className="contact-grid"
      >
        {/* Contact Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2rem',
                fontWeight: 400,
                marginBottom: '1.5rem',
              }}
            >
              Contact Information
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '2.5rem', lineHeight: 1.7 }}>
              Our concierge team is available to assist you during business hours. We strive to respond to all inquiries within 24 hours.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                icon: <Mail size={20} />,
                title: 'Email',
                desc: 'hello@sribloom.com',
                sub: 'For general inquiries & support',
              },
              {
                icon: <Phone size={20} />,
                title: 'Phone',
                desc: '+91 99999 99999',
                sub: 'Mon - Sat, 10 AM - 7 PM (IST)',
              },
              {
                icon: <MapPin size={20} />,
                title: 'Studio',
                desc: 'Copenhagen, Denmark',
                sub: 'By appointment only',
              },
              {
                icon: <Clock size={20} />,
                title: 'Business Hours',
                desc: 'Monday - Saturday',
                sub: '10:00 AM - 7:00 PM',
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  alignItems: 'flex-start',
                  padding: '1.5rem',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '12px',
                  transition: 'border-color 0.3s ease',
                }}
                className="glass-hover"
              >
                <div style={{ color: 'var(--color-primary)', marginTop: '0.25rem' }}>{item.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--color-accent)', margin: '0.25rem 0', fontSize: '0.9375rem' }}>
                    {item.desc}
                  </p>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8125rem' }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <div
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '16px',
              padding: '3rem',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            }}
          >
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2rem',
                fontWeight: 400,
                marginBottom: '2rem',
              }}
            >
              Send a Message
            </h2>

            <form
              style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    First Name *
                  </label>
                  <input type="text" className="input-field" placeholder="Jane" required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                    Last Name *
                  </label>
                  <input type="text" className="input-field" placeholder="Doe" required />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  Email Address *
                </label>
                <input type="email" className="input-field" placeholder="jane@example.com" required />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  Subject Options
                </label>
                <select
                  className="input-field"
                  style={{ appearance: 'none', cursor: 'pointer' }}
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a topic
                  </option>
                  <option value="order">Order Tracking & Issues</option>
                  <option value="product">Product Information</option>
                  <option value="press">Press & Media</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', fontWeight: 500 }}>
                  Message *
                </label>
                <textarea
                  className="input-field"
                  placeholder="How can we help you?"
                  rows={5}
                  required
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '0.5rem' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
