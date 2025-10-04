-- Create registrations table for storing CRM trial signups
CREATE TABLE IF NOT EXISTS public.registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  business_type TEXT NOT NULL CHECK (business_type IN ('classic', 'services', 'kaspi')),
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'professional', 'enterprise')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert registrations (public form)
CREATE POLICY "Allow public insert on registrations"
  ON public.registrations
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Only authenticated users can view registrations (for admin dashboard later)
CREATE POLICY "Allow authenticated users to view registrations"
  ON public.registrations
  FOR SELECT
  TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON public.registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_registrations_business_type ON public.registrations(business_type);
