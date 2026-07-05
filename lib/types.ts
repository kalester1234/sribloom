export interface Product {
  id: string
  name: string
  slug: string
  description: string
  long_description: string
  price: number
  category: 'serum' | 'cleanser' | 'day-cream' | 'bundle'
  image_url: string
  skin_type: string
  size: string
  key_ingredient: string
  ingredients: string[]
  concerns: string[]
  how_to_use: string[]
  stock_quantity: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface Order {
  id: string
  user_id: string | null
  guest_email: string | null
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
  subtotal: number
  shipping: number
  total: number
  shipping_address: ShippingAddress
  payment_method: string
  payment_status: 'pending' | 'paid' | 'failed' | 'refunded'
  notes: string | null
  created_at: string
  updated_at: string
  order_items: OrderItem[]
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  product_name: string
  product_image: string
  quantity: number
  unit_price: number
  total_price: number
}

export interface ShippingAddress {
  full_name: string
  email: string
  phone: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
}

export interface User {
  id: string
  email: string
  role: 'customer' | 'admin'
  full_name: string | null
  created_at: string
}
