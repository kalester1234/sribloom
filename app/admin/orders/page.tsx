'use client'

import { useState, useEffect } from 'react'
import { Search, Filter } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

const MOCK_ORDERS: any[] = []

const STATUS_COLORS: Record<string, string> = {
  pending: '#f59e0b',
  confirmed: '#6366f1',
  processing: '#8b5cf6',
  shipped: '#3b82f6',
  delivered: '#10b981',
  cancelled: '#ef4444',
}

const ALL_STATUSES = ['all', 'pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

export default function AdminOrdersPage() {
  const [supabase] = useState(() => createClient())
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [updatingId, setUpdatingId] = useState<string | null>(null)
  const [orders, setOrders] = useState<any[]>([])

  const fetchOrders = async () => {
    const { data: dbOrders } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false })

    if (dbOrders) {
      const formatted = dbOrders.map((o: any) => ({
        id: o.id.split('-').pop(), // Display shortened UUID
        raw_id: o.id,
        name: o.shipping_address?.full_name || 'Guest',
        email: o.guest_email || 'No Email',
        items: o.order_items?.length || 0,
        product: o.order_items?.[0]?.product_name || 'No Items',
        total: o.total,
        status: o.status,
        date: o.created_at
      }))
      setOrders(formatted)
    }
  }

  useEffect(() => {
    fetchOrders()

    const channelName = `admin-orders-${Math.random()}`
    const channel = supabase
      .channel(channelName)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        console.log('Real-time order change:', payload)
        fetchOrders()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.name.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || o.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId)
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId)
    await fetchOrders()
    setUpdatingId(null)
  }

  return (
    <div style={{ padding: '0 2rem 3rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '2.5rem',
            fontWeight: 400,
            color: 'var(--color-text-primary)',
            marginBottom: '0.25rem',
          }}
        >
          Orders
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
          {orders.length} total orders
        </p>
      </div>

      {/* Filters */}
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        {/* Search */}
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)',
            }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders by name, email, ID..."
            id="order-search"
            style={{
              width: '100%',
              padding: '0.75rem 1rem 0.75rem 2.75rem',
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '6px',
              color: 'var(--color-text-primary)',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '0.9375rem',
              outline: 'none',
            }}
          />
        </div>

        {/* Status Filter */}
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              id={`status-filter-${s}`}
              onClick={() => setStatusFilter(s)}
              style={{
                padding: '0.5rem 0.875rem',
                borderRadius: '100px',
                background:
                  statusFilter === s
                    ? s === 'all'
                      ? 'linear-gradient(135deg, #8b5cf6, #6366f1)'
                      : `${STATUS_COLORS[s]}18`
                    : 'var(--color-surface)',
                border:
                  statusFilter === s
                    ? s === 'all'
                      ? 'none'
                      : `1px solid ${STATUS_COLORS[s]}40`
                    : '1px solid var(--color-border)',
                color:
                  statusFilter === s
                    ? s === 'all'
                      ? 'white'
                      : STATUS_COLORS[s]
                    : 'var(--color-text-muted)',
                fontSize: '0.8125rem',
                fontWeight: 500,
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
                {['Order ID', 'Customer', 'Product', 'Total', 'Date', 'Status', 'Action'].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '0.875rem 1.25rem',
                      textAlign: 'left',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-muted)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((order, i) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--color-border)' : 'none',
                    transition: 'background 0.2s',
                    opacity: updatingId === order.id ? 0.6 : 1,
                  }}
                >
                  <td style={{ padding: '1rem 1.25rem', fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--color-accent)' }}>
                    {order.id}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>{order.name}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{order.email}</p>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)', maxWidth: '180px' }}>
                    <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{order.product}</p>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{order.items} item(s)</p>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    ${order.total.toFixed(2)}
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontSize: '0.875rem', color: 'var(--color-text-muted)', whiteSpace: 'nowrap' }}>
                    {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: `${STATUS_COLORS[order.status]}18`,
                        color: STATUS_COLORS[order.status],
                        border: `1px solid ${STATUS_COLORS[order.status]}30`,
                        textTransform: 'capitalize',
                      }}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.raw_id, e.target.value)}
                      id={`update-status-${order.raw_id}`}
                      disabled={updatingId === order.raw_id}
                      style={{
                        padding: '0.375rem 0.75rem',
                        background: 'var(--color-surface-2)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        color: 'var(--color-text-primary)',
                        fontSize: '0.8125rem',
                        cursor: 'pointer',
                        fontFamily: 'Outfit, sans-serif',
                        outline: 'none',
                      }}
                    >
                      {['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'].map((s) => (
                        <option key={s} value={s} style={{ background: '#11111a' }}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
            <Filter size={32} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
            <p>No orders match your filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
