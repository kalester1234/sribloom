-- =============================================
-- SRI BLOOM E-COMMERCE SUPABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PRODUCTS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('serum', 'cleanser', 'day-cream', 'bundle')),
  image_url TEXT NOT NULL,
  skin_type TEXT,
  size TEXT,
  key_ingredient TEXT,
  ingredients TEXT[] DEFAULT '{}',
  concerns TEXT[] DEFAULT '{}',
  how_to_use TEXT[] DEFAULT '{}',
  stock_quantity INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ORDERS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  guest_email TEXT,
  status TEXT NOT NULL DEFAULT 'pending' 
    CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal DECIMAL(10, 2) NOT NULL,
  shipping DECIMAL(10, 2) DEFAULT 0,
  total DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB NOT NULL,
  payment_method TEXT DEFAULT 'card',
  payment_status TEXT NOT NULL DEFAULT 'pending'
    CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ORDER ITEMS TABLE
-- =============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  product_image TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- USER PROFILES TABLE (extends auth.users)
-- =============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  role TEXT DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TIMESTAMPS AUTO-UPDATE TRIGGER
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- AUTO CREATE PROFILE ON SIGNUP
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Products: Public read, admin write
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active products"
  ON products FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Orders: Users can see their own orders, admins see all
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (user_id = auth.uid() OR guest_email = auth.jwt()->>'email');

CREATE POLICY "Users can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can manage all orders"
  ON orders FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Order Items: same visibility as orders
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND (orders.user_id = auth.uid())
    )
  );

CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage order items"
  ON order_items FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (id = auth.uid());

-- =============================================
-- SEED INITIAL PRODUCTS
-- =============================================
INSERT INTO products (name, slug, description, long_description, price, category, image_url, skin_type, size, key_ingredient, ingredients, concerns, how_to_use, stock_quantity) VALUES
(
  'Botanical Glow Serum',
  'botanical-glow-serum',
  'A lightweight daily serum that hydrates deeply and revives dull, tired skin.',
  'Our Botanical Glow Serum is built for everyday performance. The texture sinks in quickly, layers cleanly under moisturizer and sunscreen, and helps the skin look brighter and more balanced over time.',
  62.00,
  'serum',
  '/serum.png',
  'Normal, combination, and oily skin',
  '30ml | 1.0 fl oz',
  'Niacinamide',
  ARRAY['Niacinamide', 'Hyaluronic Acid', 'Squalane', 'Green Tea Extract'],
  ARRAY['Dullness', 'Uneven texture', 'Early dehydration'],
  ARRAY['Apply 2-3 drops on clean, slightly damp skin.', 'Press gently over face and neck until absorbed.', 'Follow with Day Cream; finish with SPF in morning routine.'],
  50
),
(
  'Luminance Day Cream',
  'luminance-day-cream',
  'A barrier-supporting moisturizer that keeps skin soft, smooth, and comfortable all day.',
  'Day Cream is designed for long daytime comfort. It locks in hydration, supports the skin barrier, and creates a smooth base under sunscreen and makeup.',
  48.00,
  'day-cream',
  '/day-cream.png',
  'Normal, dry, and combination skin',
  '50ml | 1.7 fl oz',
  'Ceramides',
  ARRAY['Ceramides', 'Panthenol', 'Peptide Complex', 'Vitamin E'],
  ARRAY['Dryness', 'Barrier support', 'Rough texture'],
  ARRAY['Use after Serum in the morning and afternoon as needed.', 'Massage a pea-sized amount across face and neck.', 'Layer sunscreen on top during daytime exposure.'],
  75
),
(
  'Pure Clarity Cleanser',
  'pure-clarity-cleanser',
  'A gentle gel cleanser that removes buildup without stripping essential moisture.',
  'Cleanser gives you a fresh reset without that tight, dry after-feel. The low-foam gel lifts sunscreen, pollution, and excess oil while maintaining comfort.',
  29.00,
  'cleanser',
  '/cleanser.png',
  'All skin types, including sensitive skin',
  '150ml | 5.0 fl oz',
  'Aloe Vera',
  ARRAY['Aloe Vera', 'Glycerin', 'Rice Amino Acids', 'Chamomile Extract'],
  ARRAY['Daily buildup', 'Sensitive cleansing', 'Post-wash tightness'],
  ARRAY['Massage onto damp skin for 30-40 seconds.', 'Rinse with lukewarm water and pat dry gently.', 'Follow with Serum and Day Cream for complete routine.'],
  100
),
(
  'The Complete Ritual Set',
  'complete-ritual-set',
  'The full SRI BLOOM routine — Cleanser, Serum, and Day Cream — at a curated price.',
  'Start with Cleanser to reset the skin, apply Serum to target hydration and brightness, then lock in comfort with Day Cream.',
  125.00,
  'bundle',
  '/hero-products.png',
  'All skin types',
  'Full size trio set',
  'Botanical Complex',
  ARRAY['Niacinamide', 'Ceramides', 'Aloe Vera', 'Hyaluronic Acid'],
  ARRAY['Complete routine', 'Daily hydration', 'Skin harmony'],
  ARRAY['Cleanse morning and evening with Pure Clarity Cleanser.', 'Apply 2-3 drops of Botanical Glow Serum on damp skin.', 'Finish with Luminance Day Cream to lock in moisture.'],
  30
);

-- =============================================
-- STORAGE BUCKET FOR PRODUCT IMAGES
-- Run this separately in Supabase Storage UI
-- or via the Storage API:
-- Create bucket: "product-images" (public)
-- =============================================
