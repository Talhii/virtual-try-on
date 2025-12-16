-- ============================================
-- STORAGE BUCKETS SETUP
-- Run this script in your Supabase SQL editor or dashboard
-- ============================================

-- Create storage buckets for virtual try-on images
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('model-images', 'model-images', true),
  ('garment-images', 'garment-images', true),
  ('results', 'results', true)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- STORAGE POLICIES
-- ============================================

-- Allow public uploads to model-images bucket
DROP POLICY IF EXISTS "Anyone can upload model images" ON storage.objects;
CREATE POLICY "Anyone can upload model images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'model-images');

-- Allow public reading from model-images bucket
DROP POLICY IF EXISTS "Anyone can read model images" ON storage.objects;
CREATE POLICY "Anyone can read model images"
ON storage.objects FOR SELECT
USING (bucket_id = 'model-images');

-- Allow users to delete their own model images
DROP POLICY IF EXISTS "Users can delete their own model images" ON storage.objects;
CREATE POLICY "Users can delete their own model images"
ON storage.objects FOR DELETE
USING (bucket_id = 'model-images' AND (auth.uid()::text = (storage.foldername(name))[1] OR auth.role() = 'service_role'));

-- Allow public uploads to garment-images bucket
DROP POLICY IF EXISTS "Anyone can upload garment images" ON storage.objects;
CREATE POLICY "Anyone can upload garment images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'garment-images');

-- Allow public reading from garment-images bucket
DROP POLICY IF EXISTS "Anyone can read garment images" ON storage.objects;
CREATE POLICY "Anyone can read garment images"
ON storage.objects FOR SELECT
USING (bucket_id = 'garment-images');

-- Allow users to delete their own garment images
DROP POLICY IF EXISTS "Users can delete their own garment images" ON storage.objects;
CREATE POLICY "Users can delete their own garment images"
ON storage.objects FOR DELETE
USING (bucket_id = 'garment-images' AND (auth.uid()::text = (storage.foldername(name))[1] OR auth.role() = 'service_role'));

-- Allow public uploads to results bucket
DROP POLICY IF EXISTS "Anyone can upload results" ON storage.objects;
CREATE POLICY "Anyone can upload results"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'results');

-- Allow public reading from results bucket
DROP POLICY IF EXISTS "Anyone can read results" ON storage.objects;
CREATE POLICY "Anyone can read results"
ON storage.objects FOR SELECT
USING (bucket_id = 'results');

-- Allow users to delete their own results
DROP POLICY IF EXISTS "Users can delete their own results" ON storage.objects;
CREATE POLICY "Users can delete their own results"
ON storage.objects FOR DELETE
USING (bucket_id = 'results' AND (auth.uid()::text = (storage.foldername(name))[1] OR auth.role() = 'service_role'));

-- ============================================
-- VERIFY SETUP
-- ============================================
-- Run this query to verify buckets were created:
-- SELECT * FROM storage.buckets;
