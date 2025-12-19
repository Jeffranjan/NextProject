-- Create sliders table
CREATE TABLE IF NOT EXISTS sliders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  tag TEXT,
  description TEXT,
  highlight TEXT,
  image TEXT NOT NULL,
  brand TEXT,
  price NUMERIC,
  active BOOLEAN DEFAULT true,
  "order" INTEGER DEFAULT 0,
  specs JSONB,
  technical_specs JSONB,
  accent TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Separate commands for policies to avoid transaction block errors if one fails
-- Enable RLS
ALTER TABLE sliders ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public sliders are viewable by everyone" ON sliders
  FOR SELECT USING (true);

-- Create policy for authenticated users to insert (assuming admins are authenticated)
CREATE POLICY "Users can insert sliders" ON sliders
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Create policy for authenticated users to update
CREATE POLICY "Users can update sliders" ON sliders
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create policy for authenticated users to delete
CREATE POLICY "Users can delete sliders" ON sliders
  FOR DELETE USING (auth.role() = 'authenticated');
