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
  user_id UUID, -- Optional: link to auth.users if using Supabase Auth
  session_id TEXT, -- For anonymous users
  model_image_url TEXT NOT NULL,
  garment_image_url TEXT NOT NULL,
  result_image_url TEXT NOT NULL,
  settings JSONB DEFAULT '{}',
  processing_time_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for user lookups
CREATE INDEX IF NOT EXISTS idx_try_on_user ON try_on_results(user_id);
CREATE INDEX IF NOT EXISTS idx_try_on_session ON try_on_results(session_id);

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
  try_on_id UUID REFERENCES try_on_results(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_credits_user ON credit_transactions(user_id);

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
CREATE POLICY "Products are viewable by everyone" ON products
  FOR SELECT USING (is_active = true);

-- Leads: Service role only (server-side access)
CREATE POLICY "Leads are insertable by anyone" ON leads
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Leads are viewable by service role" ON leads
  FOR SELECT USING (auth.role() = 'service_role');

-- Try-on results: Users can view their own
CREATE POLICY "Users can view their own try-ons" ON try_on_results
  FOR SELECT USING (
    user_id = auth.uid() OR 
    session_id = current_setting('request.headers', true)::json->>'x-session-id'
  );
CREATE POLICY "Users can insert their own try-ons" ON try_on_results
  FOR INSERT WITH CHECK (true);

-- User profiles: Users can view and update their own
CREATE POLICY "Users can view their own profile" ON user_profiles
  FOR SELECT USING (id = auth.uid());
CREATE POLICY "Users can update their own profile" ON user_profiles
  FOR UPDATE USING (id = auth.uid());

-- Credit transactions: Users can view their own
CREATE POLICY "Users can view their own credits" ON credit_transactions
  FOR SELECT USING (user_id = auth.uid());

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

CREATE TRIGGER update_leads_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SAMPLE DATA
-- ============================================

INSERT INTO products (name, description, image_url, category, price) VALUES
  ('Pleated Midi Dress', 'Photorealistic pleated dress for VTO demos', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?q=80&w=1000&auto=format&fit=crop', 'Dresses', 89.99),
  ('Everyday Tee', 'Basic tee available in multiple colors', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop', 'Tops', 29.99),
  ('Denim Jacket', 'Classic denim jacket with vintage wash', 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?q=80&w=1000&auto=format&fit=crop', 'Outerwear', 79.99),
  ('Silk Blouse', 'Elegant silk blouse for formal occasions', 'https://images.unsplash.com/photo-1518049362265-d5b2a6467637?q=80&w=1000&auto=format&fit=crop', 'Tops', 119.99)
ON CONFLICT DO NOTHING;
