-- Drop the old policy
DROP POLICY IF EXISTS "Allow public insert on registrations" ON public.registrations;

-- Create new policy that allows anyone (including anonymous users) to insert
CREATE POLICY "Enable insert for all users"
  ON public.registrations
  FOR INSERT
  WITH CHECK (true);

-- Also allow public to insert explicitly
CREATE POLICY "Enable insert for anon users"
  ON public.registrations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
