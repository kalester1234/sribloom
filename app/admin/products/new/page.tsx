'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Upload, Plus, X } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = ['serum', 'cleanser', 'day-cream', 'bundle']

export default function NewProductPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [ingredients, setIngredients] = useState<string[]>([''])
  const [concerns, setConcerns] = useState<string[]>([''])
  const [howToUse, setHowToUse] = useState<string[]>([''])

  const [form, setForm] = useState({
    name: '',
    slug: '',
    description: '',
    long_description: '',
    price: '',
    category: 'serum',
    skin_type: '',
    size: '',
    key_ingredient: '',
    stock_quantity: '50',
    is_active: true,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setForm({
      ...form,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
      ...(name === 'name' && {
        slug: value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      }),
    })
  }

  const handleArrayChange = (
    arr: string[],
    setArr: (v: string[]) => void,
    idx: number,
    value: string
  ) => {
    const next = [...arr]
    next[idx] = value
    setArr(next)
  }

  const handleArrayAdd = (arr: string[], setArr: (v: string[]) => void) => setArr([...arr, ''])
  const handleArrayRemove = (arr: string[], setArr: (v: string[]) => void, idx: number) =>
    setArr(arr.filter((_, i) => i !== idx))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    // In production: call Supabase to insert product
    const productData = {
      ...form,
      price: parseFloat(form.price),
      stock_quantity: parseInt(form.stock_quantity),
      ingredients: ingredients.filter(Boolean),
      concerns: concerns.filter(Boolean),
      how_to_use: howToUse.filter(Boolean),
      image_url: '/hero-products.png',
    }

    console.log('Creating product:', productData)

    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200))
    setSaving(false)
    setSaved(true)
    setTimeout(() => router.push('/admin/products'), 1000)
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.875rem 1rem',
    background: 'var(--color-surface-2)',
    border: '1px solid var(--color-border)',
    borderRadius: '4px',
    color: 'var(--color-text-primary)',
    fontFamily: 'Outfit, sans-serif',
    fontSize: '0.9375rem',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.8125rem',
    color: 'var(--color-text-muted)',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    fontWeight: 500,
  }

  const sectionCardStyle: React.CSSProperties = {
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    borderRadius: '12px',
    padding: '1.5rem',
    marginBottom: '1.5rem',
  }

  return (
    <div style={{ padding: '0 2rem 3rem', maxWidth: '900px' }}>
      <Link
        href="/admin/products"
        id="back-to-admin-products"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          color: 'var(--color-text-muted)',
          textDecoration: 'none',
          fontSize: '0.875rem',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          marginBottom: '1.5rem',
        }}
      >
        <ArrowLeft size={14} />
        Back to Products
      </Link>

      <h1
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '2.5rem',
          fontWeight: 400,
          color: 'var(--color-text-primary)',
          marginBottom: '2rem',
        }}
      >
        Add New Product
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div style={sectionCardStyle}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem', marginBottom: '1.5rem' }}>
            Basic Information
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Product Name *</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                style={fieldStyle}
                placeholder="e.g. Botanical Glow Serum"
                id="product-name"
              />
            </div>

            <div>
              <label style={labelStyle}>URL Slug</label>
              <input
                name="slug"
                value={form.slug}
                onChange={handleChange}
                style={fieldStyle}
                placeholder="auto-generated"
                id="product-slug"
              />
            </div>

            <div>
              <label style={labelStyle}>Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                id="product-category"
                style={{ ...fieldStyle, cursor: 'pointer' }}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} style={{ background: '#11111a' }}>
                    {cat.replace('-', ' ').toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Short Description *</label>
              <input
                name="description"
                required
                value={form.description}
                onChange={handleChange}
                style={fieldStyle}
                placeholder="One-line product description"
                id="product-description"
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Long Description</label>
              <textarea
                name="long_description"
                value={form.long_description}
                onChange={handleChange}
                rows={4}
                id="product-long-description"
                style={{ ...fieldStyle, resize: 'vertical' }}
                placeholder="Detailed product description..."
              />
            </div>
          </div>
        </div>

        {/* Pricing & Specs */}
        <div style={sectionCardStyle}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem', marginBottom: '1.5rem' }}>
            Pricing & Specs
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem' }}>
            <div>
              <label style={labelStyle}>Price (USD) *</label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                required
                value={form.price}
                onChange={handleChange}
                style={fieldStyle}
                placeholder="0.00"
                id="product-price"
              />
            </div>

            <div>
              <label style={labelStyle}>Stock Quantity</label>
              <input
                name="stock_quantity"
                type="number"
                min="0"
                value={form.stock_quantity}
                onChange={handleChange}
                style={fieldStyle}
                id="product-stock"
              />
            </div>

            <div>
              <label style={labelStyle}>Size / Volume</label>
              <input
                name="size"
                value={form.size}
                onChange={handleChange}
                style={fieldStyle}
                placeholder="e.g. 30ml | 1.0 fl oz"
                id="product-size"
              />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label style={labelStyle}>Skin Type Suitability</label>
              <input
                name="skin_type"
                value={form.skin_type}
                onChange={handleChange}
                style={fieldStyle}
                placeholder="e.g. Normal, combination, and oily skin"
                id="product-skin-type"
              />
            </div>

            <div>
              <label style={labelStyle}>Key Ingredient</label>
              <input
                name="key_ingredient"
                value={form.key_ingredient}
                onChange={handleChange}
                style={fieldStyle}
                placeholder="e.g. Niacinamide"
                id="product-key-ingredient"
              />
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div style={sectionCardStyle}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem', marginBottom: '1.5rem' }}>
            Ingredients
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {ingredients.map((ing, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  value={ing}
                  onChange={(e) => handleArrayChange(ingredients, setIngredients, i, e.target.value)}
                  style={fieldStyle}
                  placeholder={`Ingredient ${i + 1}`}
                  id={`ingredient-${i}`}
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(ingredients, setIngredients, i)}
                    style={{
                      padding: '0 0.875rem',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '4px',
                      color: 'var(--color-error)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                    aria-label="Remove ingredient"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleArrayAdd(ingredients, setIngredients)}
            id="add-ingredient-btn"
            style={{
              marginTop: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: '1px dashed var(--color-border)',
              borderRadius: '4px',
              padding: '0.625rem 1rem',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              width: '100%',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <Plus size={14} />
            Add Ingredient
          </button>
        </div>

        {/* Concerns */}
        <div style={sectionCardStyle}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem', marginBottom: '1.5rem' }}>
            Skin Concerns Targeted
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {concerns.map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  value={c}
                  onChange={(e) => handleArrayChange(concerns, setConcerns, i, e.target.value)}
                  style={fieldStyle}
                  placeholder={`e.g. Dullness`}
                  id={`concern-${i}`}
                />
                {concerns.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(concerns, setConcerns, i)}
                    style={{
                      padding: '0 0.875rem',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '4px',
                      color: 'var(--color-error)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleArrayAdd(concerns, setConcerns)}
            id="add-concern-btn"
            style={{
              marginTop: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: '1px dashed var(--color-border)',
              borderRadius: '4px',
              padding: '0.625rem 1rem',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Plus size={14} />
            Add Concern
          </button>
        </div>

        {/* How to Use */}
        <div style={sectionCardStyle}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem', marginBottom: '1.5rem' }}>
            How to Use Steps
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {howToUse.map((step, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.25rem',
                    color: 'var(--color-primary)',
                    minWidth: '2rem',
                    paddingTop: '0.75rem',
                  }}
                >
                  0{i + 1}
                </span>
                <input
                  value={step}
                  onChange={(e) => handleArrayChange(howToUse, setHowToUse, i, e.target.value)}
                  style={{ ...fieldStyle, flex: 1 }}
                  placeholder={`Step ${i + 1} instruction`}
                  id={`step-${i}`}
                />
                {howToUse.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleArrayRemove(howToUse, setHowToUse, i)}
                    style={{
                      padding: '0 0.875rem',
                      height: '51px',
                      background: 'rgba(239,68,68,0.1)',
                      border: '1px solid rgba(239,68,68,0.2)',
                      borderRadius: '4px',
                      color: 'var(--color-error)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => handleArrayAdd(howToUse, setHowToUse)}
            id="add-step-btn"
            style={{
              marginTop: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'none',
              border: '1px dashed var(--color-border)',
              borderRadius: '4px',
              padding: '0.625rem 1rem',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              fontSize: '0.875rem',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Plus size={14} />
            Add Step
          </button>
        </div>

        {/* Image Upload */}
        <div style={sectionCardStyle}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.375rem', marginBottom: '1.5rem' }}>
            Product Image
          </h2>
          <div
            style={{
              border: '2px dashed var(--color-border-hover)',
              borderRadius: '8px',
              padding: '3rem',
              textAlign: 'center',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            id="image-upload-area"
          >
            <Upload size={32} style={{ margin: '0 auto 1rem', color: 'var(--color-primary)' }} />
            <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>Drop image here or click to upload</p>
            <p style={{ fontSize: '0.8125rem' }}>PNG, JPG, WebP up to 10MB</p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
              (After Supabase Storage is configured, this will upload to the bucket)
            </p>
          </div>
        </div>

        {/* Active toggle */}
        <div
          style={{
            ...sectionCardStyle,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>Published</p>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              Make this product visible in the store
            </p>
          </div>
          <label
            style={{
              position: 'relative',
              width: '52px',
              height: '28px',
              cursor: 'pointer',
            }}
          >
            <input
              type="checkbox"
              name="is_active"
              checked={form.is_active}
              onChange={handleChange}
              id="product-active"
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: 'absolute',
                inset: 0,
                background: form.is_active ? 'var(--color-primary)' : 'var(--color-surface-2)',
                borderRadius: '100px',
                transition: 'all 0.3s',
                border: '1px solid var(--color-border)',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: '3px',
                left: form.is_active ? '27px' : '3px',
                width: '20px',
                height: '20px',
                background: 'white',
                borderRadius: '50%',
                transition: 'left 0.3s',
              }}
            />
          </label>
        </div>

        {/* Submit */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            type="submit"
            id="save-product-btn"
            className="btn-primary"
            disabled={saving || saved}
            style={{ flex: 1, justifyContent: 'center', padding: '1rem', fontSize: '1rem', position: 'relative', zIndex: 1 }}
          >
            {saved ? '✓ Product Saved!' : saving ? 'Saving...' : 'Save Product'}
          </button>
          <Link
            href="/admin/products"
            className="btn-secondary"
            style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center' }}
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
