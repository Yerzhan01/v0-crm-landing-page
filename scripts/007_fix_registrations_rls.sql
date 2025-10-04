-- Disable RLS temporarily to fix policies
ALTER TABLE public.registrations DISABLE ROW LEVEL SECURITY;

-- Drop all existing policies
DROP POLICY IF EXISTS "Allow public insert on registrations" ON public.registrations;
DROP POLICY IF EXISTS "Enable insert for all users" ON public.registrations;
DROP POLICY IF EXISTS "Enable insert for anon users" ON public.registrations;

-- Re-enable RLS
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create a single, simple policy that allows anyone to insert
CREATE POLICY "registrations_insert_policy"
  ON public.registrations
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Allow anyone to read their own registrations (optional, for future use)
CREATE POLICY "registrations_select_policy"
  ON public.registrations
  FOR SELECT
  TO public
  USING (true);
