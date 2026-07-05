import type { Metadata } from 'next'
import AdminSidebar from '@/components/admin/AdminSidebar'

export const metadata: Metadata = {
  title: 'Admin Panel | SRI BLOOM',
  description: 'SRI BLOOM admin dashboard for managing products and orders.',
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-background)' }}>
      <AdminSidebar />
      <div style={{ flex: 1, marginLeft: '260px', paddingTop: '2.5rem', minHeight: '100vh' }} className="admin-main">
        {children}
      </div>
    </div>
  )
}
