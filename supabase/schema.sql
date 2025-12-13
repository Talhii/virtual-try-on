-- VTO Studio Database Schema
-- Run this script in your Supabase SQL editor

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================
-- LEADS TABLE - Contact form submissions
-- ============================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  email TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'archived')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster email lookups
CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);

-- ============================================
-- PRODUCTS TABLE - Garment catalog
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  category TEXT,
  price DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT true,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for category filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);

-- ============================================
-- TRY_ON_RESULTS TABLE - Generated images
-- ============================================
CREATE TABLE IF NOT EXISTS try_on_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  session_id TEXT, -- For anonymous users
  model_image_url TEXT NOT NULL,
  garment_image_url TEXT NOT NULL,
  result_image_url TEXT NOT NULL,
  settings JSONB DEFAULT '{}',
  processing_time_ms INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user lookups
CREATE INDEX IF NOT EXISTS idx_try_on_user ON try_on_results(user_id);
CREATE INDEX IF NOT EXISTS idx_try_on_session ON try_on_results(session_id);
CREATE INDEX IF NOT EXISTS idx_try_on_created ON try_on_results(created_at DESC);

-- ============================================
-- USERS PROFILE TABLE - Extended user info
-- ============================================
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'starter' CHECK (plan IN ('starter', 'pro', 'business', 'enterprise')),
  credits_remaining INTEGER DEFAULT 10,
  credits_used_total INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- CREDIT_TRANSACTIONS TABLE - Usage tracking
-- ============================================
CREATE TABLE IF NOT EXISTS credit_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL, -- Positive for additions, negative for usage
  description TEXT,
  try_on_id UUID REFERENCES try_on_results(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_credits_user ON credit_transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_credits_created ON credit_transactions(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE try_on_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE credit_transactions ENABLE ROW LEVEL SECURITY;

-- Products: Public read access
DROP POLICY IF EXISTS "Products are viewable by everyone" ON products;
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (is_active = true);

-- Leads: Anyone can insert, only service role can read
DROP POLICY IF EXISTS "Leads are insertable by anyone" ON leads;
DROP POLICY IF EXISTS "Leads are viewable by service role" ON leads;
CREATE POLICY "Leads are insertable by anyone" ON leads
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Leads are viewable by service role" ON leads
  FOR SELECT USING (auth.role() = 'service_role');

-- Try-on results: Users can view/insert their own, service role can access all
DROP POLICY IF EXISTS "Users can view their own try-ons" ON try_on_results;
DROP POLICY IF EXISTS "Users can insert their own try-ons" ON try_on_results;
DROP POLICY IF EXISTS "Users can delete their own try-ons" ON try_on_results;
DROP POLICY IF EXISTS "Service role full access try-ons" ON try_on_results;

CREATE POLICY "Users can view their own try-ons" ON try_on_results
  FOR SELECT USING (user_id = auth.uid() OR auth.role() = 'service_role');
CREATE POLICY "Users can insert try-ons" ON try_on_results
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can delete their own try-ons" ON try_on_results
  FOR DELETE USING (user_id = auth.uid() OR auth.role() = 'service_role');

-- User profiles: Users can view and update their own
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Service role full access profiles" ON user_profiles;

CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (id = auth.uid() OR auth.role() = 'service_role');
CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (id = auth.uid() OR auth.role() = 'service_role');
CREATE POLICY "Users can insert their own profile" ON user_profiles
  FOR INSERT WITH CHECK (id = auth.uid() OR auth.role() = 'service_role');

-- Credit transactions: Users can view their own
DROP POLICY IF EXISTS "Users can view their own credits" ON credit_transactions;
DROP POLICY IF EXISTS "Service role can insert credits" ON credit_transactions;

CREATE POLICY "Users can view their own credits" ON credit_transactions
  FOR SELECT USING (user_id = auth.uid() OR auth.role() = 'service_role');
CREATE POLICY "Service role can insert credits" ON credit_transactions
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_leads_updated_at ON leads;
CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

DROP TRIGGER IF EXISTS update_profiles_updated_at ON user_profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, full_name, avatar_url, credits_remaining)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'avatar_url',
    10 -- Default credits for new users
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Helper function to increment credits (for refunds)
CREATE OR REPLACE FUNCTION increment_credits(p_user_id UUID, p_amount INTEGER DEFAULT 1)
RETURNS INTEGER AS $$
DECLARE
  new_credits INTEGER;
BEGIN
  UPDATE user_profiles
  SET credits_remaining = credits_remaining + p_amount
  WHERE id = p_user_id
  RETURNING credits_remaining INTO new_credits;
  
  RETURN new_credits;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- STORAGE BUCKETS (run separately or via Supabase dashboard)
-- ============================================
-- Note: Storage buckets should be created via Supabase Dashboard or CLI:
-- - model-images (public)
-- - garment-images (public)
-- - results (public)

-- ============================================
-- SAMPLE DATA
-- ============================================

INSERT INTO products (name, description, image_url, category, price) VALUES
  ('Pleated Midi Dress', 'Photorealistic pleated dress for VTO demos', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop', 'Dresses', 89.99),
  ('Everyday Tee', 'Basic tee available in multiple colors', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop', 'Tops', 29.99),
  ('Denim Jacket', 'Classic denim jacket with vintage wash', 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=1000&auto=format&fit=crop', 'Outerwear', 79.99),
  ('Silk Blouse', 'Elegant silk blouse for formal occasions', 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=1000&auto=format&fit=crop', 'Tops', 119.99),
  ('Summer Floral Dress', 'Light floral print perfect for warm days', 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop', 'Dresses', 69.99),
  ('Leather Jacket', 'Premium leather biker jacket', 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop', 'Outerwear', 249.99)
ON CONFLICT DO NOTHING;
