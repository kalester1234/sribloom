import { PRODUCTS } from '@/lib/products'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ProductDetailClient from './ProductDetailClient'
import Footer from '@/components/layout/Footer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params
  const product = PRODUCTS.find((p) => p.slug === slug)

  if (!product) notFound()

  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <>
      <ProductDetailClient product={product} relatedProducts={related} />
      <Footer />
    </>
  )
}
