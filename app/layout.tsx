import type { Metadata } from 'next'
import './globals.css'
import ConditionalNavbar from '@/components/layout/ConditionalNavbar'
import ConditionalCartSidebar from '@/components/cart/ConditionalCartSidebar'

export const metadata: Metadata = {
  title: {
    default: 'SRI BLOOM | Bloom with Confidence',
    template: '%s | SRI BLOOM',
  },
  description:
    'SRI BLOOM — Where beauty meets care with premium, skin-friendly skincare products. Thoughtfully crafted botanicals for everyday confidence and natural radiance.',
  keywords: ['skincare', 'serum', 'cleanser', 'day cream', 'natural', 'botanical', 'luxury'],
  openGraph: {
    title: 'SRI BLOOM | Bloom with Confidence',
    description: 'Premium botanical skincare for everyday confidence.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ConditionalNavbar />
        <main>{children}</main>
        <ConditionalCartSidebar />
      </body>
    </html>
  )
}
