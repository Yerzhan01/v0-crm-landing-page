-- Create referral_codes table
CREATE TABLE IF NOT EXISTS referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_user_referral_code UNIQUE (user_id)
);

-- Add referred_by column to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES auth.users(id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON referral_codes(code);
CREATE INDEX IF NOT EXISTS idx_profiles_referred_by ON profiles(referred_by);

-- Function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code()
RETURNS TEXT AS $$
DECLARE
  chars TEXT := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  result TEXT := '';
  i INTEGER;
BEGIN
  FOR i IN 1..8 LOOP
    result := result || substr(chars, floor(random() * length(chars) + 1)::int, 1);
  END LOOP;
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to create referral code for new users
CREATE OR REPLACE FUNCTION create_referral_code_for_user()
RETURNS TRIGGER AS $$
DECLARE
  new_code TEXT;
  code_exists BOOLEAN;
BEGIN
  LOOP
    new_code := generate_referral_code();
    SELECT EXISTS(SELECT 1 FROM referral_codes WHERE code = new_code) INTO code_exists;
    EXIT WHEN NOT code_exists;
  END LOOP;
  
  INSERT INTO referral_codes (user_id, code)
  VALUES (NEW.id, new_code);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically create referral code when profile is created
DROP TRIGGER IF EXISTS trigger_create_referral_code ON profiles;
CREATE TRIGGER trigger_create_referral_code
  AFTER INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION create_referral_code_for_user();

-- Enable RLS
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;

-- RLS Policies for referral_codes
CREATE POLICY "Users can view their own referral code"
  ON referral_codes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own referral code"
  ON referral_codes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create referral codes for existing users
INSERT INTO referral_codes (user_id, code)
SELECT id, generate_referral_code()
FROM auth.users
WHERE id NOT IN (SELECT user_id FROM referral_codes)
ON CONFLICT (user_id) DO NOTHING;
