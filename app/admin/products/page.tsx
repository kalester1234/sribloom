import { PRODUCTS } from '@/lib/products'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit2, Trash2, Eye } from 'lucide-react'

export default function AdminProductsPage() {
  return (
    <div style={{ padding: '0 2rem 3rem' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '2.5rem',
              fontWeight: 400,
              color: 'var(--color-text-primary)',
              marginBottom: '0.25rem',
            }}
          >
            Products
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
            {PRODUCTS.length} products in catalog
          </p>
        </div>
        <Link href="/admin/products/new" className="btn-primary" id="admin-new-product-btn" style={{ fontSize: '0.875rem' }}>
          <Plus size={16} />
          Add New Product
        </Link>
      </div>

      {/* Products Table */}
      <div
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-surface-2)' }}>
                {['Product', 'Category', 'Price', 'Stock', 'Status', 'Actions'].map((h) => (
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
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((product, i) => (
                <tr
                  key={product.id}
                  style={{
                    borderBottom: i < PRODUCTS.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  {/* Product */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem' }}>
                      <div
                        style={{
                          width: '52px',
                          height: '52px',
                          borderRadius: '6px',
                          overflow: 'hidden',
                          background: 'var(--color-surface-2)',
                          flexShrink: 0,
                          position: 'relative',
                        }}
                      >
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          style={{ objectFit: 'cover' }}
                          sizes="52px"
                        />
                      </div>
                      <div>
                        <p style={{ fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
                          {product.name}
                        </p>
                        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>{product.size}</p>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className="badge">{product.category}</span>
                  </td>

                  {/* Price */}
                  <td style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-accent)' }}>
                    ${product.price.toFixed(2)}
                  </td>

                  {/* Stock */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span
                      style={{
                        color:
                          product.stock_quantity < 20
                            ? 'var(--color-warning)'
                            : 'var(--color-success)',
                        fontWeight: 500,
                      }}
                    >
                      {product.stock_quantity}
                    </span>
                  </td>

                  {/* Status */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '100px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        background: product.is_active ? 'rgba(16,185,129,0.1)' : 'rgba(107,100,128,0.1)',
                        color: product.is_active ? 'var(--color-success)' : 'var(--color-text-muted)',
                        border: `1px solid ${product.is_active ? 'rgba(16,185,129,0.2)' : 'rgba(107,100,128,0.2)'}`,
                      }}
                    >
                      {product.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link
                        href={`/products/${product.slug}`}
                        title="View"
                        style={{
                          padding: '0.5rem',
                          background: 'var(--color-surface-2)',
                          border: '1px solid var(--color-border)',
                          borderRadius: '4px',
                          color: 'var(--color-text-muted)',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'all 0.2s',
                        }}
                        aria-label={`View ${product.name}`}
                      >
                        <Eye size={14} />
                      </Link>
                      <Link
                        href={`/admin/products/${product.id}/edit`}
                        title="Edit"
                        id={`edit-product-${product.id}`}
                        style={{
                          padding: '0.5rem',
                          background: 'rgba(139,92,246,0.1)',
                          border: '1px solid rgba(139,92,246,0.2)',
                          borderRadius: '4px',
                          color: 'var(--color-accent)',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'all 0.2s',
                        }}
                        aria-label={`Edit ${product.name}`}
                      >
                        <Edit2 size={14} />
                      </Link>
                      <button
                        title="Delete"
                        id={`delete-product-${product.id}`}
                        style={{
                          padding: '0.5rem',
                          background: 'rgba(239,68,68,0.1)',
                          border: '1px solid rgba(239,68,68,0.2)',
                          borderRadius: '4px',
                          color: 'var(--color-error)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'all 0.2s',
                        }}
                        aria-label={`Delete ${product.name}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
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
