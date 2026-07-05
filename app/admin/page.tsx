'use client'

import { PRODUCTS } from '@/lib/products'
import Link from 'next/link'
import { Package, ShoppingCart, DollarSign, TrendingUp, Plus, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useState, useEffect } from 'react'

const MOCK_STATS = {
  totalRevenue: 4820.0,
  totalOrders: 52,
  activeProducts: PRODUCTS.filter((p) => p.is_active).length,
  pendingOrders: 7,
}

const MOCK_RECENT_ORDERS: any[] = []

const STATUS_COLORS: Record<string, string> = {
  pending: '#f59e0b',
  confirmed: '#6366f1',
  processing: '#8b5cf6',
  shipped: '#3b82f6',
  delivered: '#10b981',
  cancelled: '#ef4444',
}

export default function AdminDashboard() {
  const supabase = createClient()
  const [recentOrders, setRecentOrders] = useState<any[]>([])
  const [totalOrders, setTotalOrders] = useState(0)

  const fetchDashboardData = async () => {
    const { data: dbOrders } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })
      
    if (dbOrders) {
      setTotalOrders(dbOrders.length)
      const recent = dbOrders.slice(0, 5).map((o: any) => ({
        id: o.id.split('-').pop(),
        name: o.shipping_address?.full_name || 'Guest',
        product: o.order_items?.[0]?.product_name || 'No Items',
        total: o.total,
        status: o.status,
      }))
      setRecentOrders(recent)
    }
  }

  useEffect(() => {
    fetchDashboardData()

    const channel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => {
        fetchDashboardData()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Override total orders from mock to actual live DB
  const MOCK_STATS_REAL = { ...MOCK_STATS, totalOrders }

  return (
    <div style={{ padding: '0 2rem 3rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2.5rem',
            fontWeight: 400,
            marginBottom: '0.5rem',
            color: 'var(--color-text-primary)',
          }}
        >
          Dashboard
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
          Overview of your SRI BLOOM store
        </p>
      </div>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '1.25rem',
          marginBottom: '2.5rem',
        }}
      >
        {[
          {
            icon: <DollarSign size={20} />,
            label: 'Total Revenue',
            value: `$${MOCK_STATS.totalRevenue.toLocaleString()}`,
            color: '#10b981',
            change: '+12% this month',
          },
          {
            icon: <ShoppingCart size={20} />,
            label: 'Total Orders',
            value: MOCK_STATS_REAL.totalOrders,
            color: '#8b5cf6',
            change: '+5 this week',
          },
          {
            icon: <Package size={20} />,
            label: 'Active Products',
            value: MOCK_STATS.activeProducts,
            color: '#6366f1',
            change: 'In catalog',
          },
          {
            icon: <TrendingUp size={20} />,
            label: 'Pending Orders',
            value: MOCK_STATS.pendingOrders,
            color: '#f59e0b',
            change: 'Needs attention',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            style={{
              padding: '1.5rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '10px',
              transition: 'all 0.3s ease',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '10px',
                background: `${stat.color}18`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: stat.color,
                marginBottom: '1rem',
              }}
            >
              {stat.icon}
            </div>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)', marginBottom: '0.375rem' }}>
              {stat.label}
            </p>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '2rem',
                fontWeight: 400,
                color: 'var(--color-text-primary)',
                marginBottom: '0.25rem',
              }}
            >
              {stat.value}
            </p>
            <p style={{ fontSize: '0.75rem', color: stat.color }}>{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
        <Link
          href="/admin/products/new"
          id="admin-add-product"
          className="btn-primary"
          style={{ fontSize: '0.875rem' }}
        >
          <Plus size={16} />
          Add New Product
        </Link>
        <Link
          href="/admin/orders"
          id="admin-view-orders"
          className="btn-secondary"
          style={{ fontSize: '0.875rem' }}
        >
          <ShoppingCart size={16} />
          Manage Orders
        </Link>
      </div>

      {/* Recent Orders */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem', fontWeight: 400 }}>
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.8125rem',
              color: 'var(--color-accent)',
              textDecoration: 'none',
            }}
          >
            View All <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                {['Order', 'Customer', 'Product', 'Total', 'Status'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '0.875rem 1.5rem',
                      textAlign: 'left',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order, i) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom: i < recentOrders.length - 1 ? '1px solid var(--color-border)' : 'none',
                    transition: 'background 0.2s',
                  }}
                >
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--color-accent)' }}>
                    {order.id}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9375rem', color: 'var(--color-text-primary)' }}>
                    {order.name}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                    {order.product}
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.9375rem', fontWeight: 600 }}>
                    ${order.total.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: `${STATUS_COLORS[order.status]}18`,
                        color: STATUS_COLORS[order.status],
                        textTransform: 'capitalize',
                        border: `1px solid ${STATUS_COLORS[order.status]}30`,
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
