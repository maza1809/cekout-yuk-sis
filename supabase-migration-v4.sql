-- Migration v4: Create media table for Media Library
-- Run in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size TEXT DEFAULT '0 KB',
  type TEXT DEFAULT 'image',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE media ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon select" ON media;
DROP POLICY IF EXISTS "anon insert" ON media;
DROP POLICY IF EXISTS "anon update" ON media;
DROP POLICY IF EXISTS "anon delete" ON media;
CREATE POLICY "anon select" ON media FOR SELECT USING (true);
CREATE POLICY "anon insert" ON media FOR INSERT WITH CHECK (true);
CREATE POLICY "anon update" ON media FOR UPDATE USING (true);
CREATE POLICY "anon delete" ON media FOR DELETE USING (true);
