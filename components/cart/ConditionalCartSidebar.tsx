'use client'

import { usePathname } from 'next/navigation'
import CartSidebar from './CartSidebar'

export default function ConditionalCartSidebar() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null
  return <CartSidebar />
}
