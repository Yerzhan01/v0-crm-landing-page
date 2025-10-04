-- Add referral_code column to clients table
ALTER TABLE clients ADD COLUMN IF NOT EXISTS referral_code VARCHAR(20) UNIQUE;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS bonus_balance NUMERIC DEFAULT 0;
ALTER TABLE clients ADD COLUMN IF NOT EXISTS total_referrals INTEGER DEFAULT 0;

-- Create function to generate unique referral code
CREATE OR REPLACE FUNCTION generate_referral_code(client_id UUID)
RETURNS VARCHAR AS $$
DECLARE
  code VARCHAR(20);
  exists BOOLEAN;
BEGIN
  LOOP
    -- Generate code: first 4 chars of UUID + random 4 digits
    code := UPPER(SUBSTRING(client_id::TEXT FROM 1 FOR 4)) || LPAD(FLOOR(RANDOM() * 10000)::TEXT, 4, '0');
    
    -- Check if code already exists
    SELECT EXISTS(SELECT 1 FROM clients WHERE referral_code = code) INTO exists;
    
    EXIT WHEN NOT exists;
  END LOOP;
  
  RETURN code;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-generate referral code for new clients
CREATE OR REPLACE FUNCTION auto_generate_referral_code()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.referral_code IS NULL THEN
    NEW.referral_code := generate_referral_code(NEW.id);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_auto_generate_referral_code ON clients;
CREATE TRIGGER trigger_auto_generate_referral_code
  BEFORE INSERT ON clients
  FOR EACH ROW
  EXECUTE FUNCTION auto_generate_referral_code();

-- Update existing clients with referral codes
UPDATE clients 
SET referral_code = generate_referral_code(id)
WHERE referral_code IS NULL;

-- Create referral_transactions table for tracking bonuses
CREATE TABLE IF NOT EXISTS referral_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL,
  referrer_id UUID NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  referred_client_id UUID REFERENCES clients(id) ON DELETE SET NULL,
  deal_id UUID REFERENCES deals(id) ON DELETE SET NULL,
  transaction_type VARCHAR(50) NOT NULL, -- 'referral_bonus', 'sale_commission'
  amount NUMERIC NOT NULL,
  percentage NUMERIC,
  sale_amount NUMERIC,
  status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'completed', 'cancelled'
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT fk_tenant FOREIGN KEY (tenant_id) REFERENCES tenants(id) ON DELETE CASCADE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_referral_transactions_referrer ON referral_transactions(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referral_transactions_tenant ON referral_transactions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_clients_referral_code ON clients(referral_code);

-- Create function to process referral bonus
CREATE OR REPLACE FUNCTION process_referral_bonus(
  p_referral_code VARCHAR,
  p_referred_client_id UUID,
  p_tenant_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
  v_referrer_id UUID;
  v_bonus_amount NUMERIC := 500; -- Default bonus amount
BEGIN
  -- Find referrer by code
  SELECT id INTO v_referrer_id
  FROM clients
  WHERE referral_code = p_referral_code
    AND tenant_id = p_tenant_id;
  
  IF v_referrer_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Create transaction
  INSERT INTO referral_transactions (
    tenant_id,
    referrer_id,
    referred_client_id,
    transaction_type,
    amount,
    status,
    description,
    processed_at
  ) VALUES (
    p_tenant_id,
    v_referrer_id,
    p_referred_client_id,
    'referral_bonus',
    v_bonus_amount,
    'completed',
    'Бонус за приведенного клиента',
    NOW()
  );
  
  -- Update referrer balance and count
  UPDATE clients
  SET 
    bonus_balance = bonus_balance + v_bonus_amount,
    total_referrals = total_referrals + 1
  WHERE id = v_referrer_id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Create function to process sale commission
CREATE OR REPLACE FUNCTION process_sale_commission(
  p_deal_id UUID,
  p_sale_amount NUMERIC,
  p_commission_percentage NUMERIC DEFAULT 10
)
RETURNS BOOLEAN AS $$
DECLARE
  v_referrer_id UUID;
  v_tenant_id UUID;
  v_commission_amount NUMERIC;
  v_client_id UUID;
BEGIN
  -- Get deal info
  SELECT client_id, tenant_id INTO v_client_id, v_tenant_id
  FROM deals
  WHERE id = p_deal_id;
  
  IF v_client_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Check if client was referred
  SELECT id INTO v_referrer_id
  FROM clients c1
  WHERE EXISTS (
    SELECT 1 FROM referral_transactions rt
    WHERE rt.referred_client_id = v_client_id
      AND rt.referrer_id = c1.id
      AND rt.transaction_type = 'referral_bonus'
  );
  
  IF v_referrer_id IS NULL THEN
    RETURN FALSE;
  END IF;
  
  -- Calculate commission
  v_commission_amount := p_sale_amount * (p_commission_percentage / 100);
  
  -- Create transaction
  INSERT INTO referral_transactions (
    tenant_id,
    referrer_id,
    referred_client_id,
    deal_id,
    transaction_type,
    amount,
    percentage,
    sale_amount,
    status,
    description,
    processed_at
  ) VALUES (
    v_tenant_id,
    v_referrer_id,
    v_client_id,
    p_deal_id,
    'sale_commission',
    v_commission_amount,
    p_commission_percentage,
    p_sale_amount,
    'completed',
    'Комиссия с продажи по реферальному коду',
    NOW()
  );
  
  -- Update referrer balance
  UPDATE clients
  SET bonus_balance = bonus_balance + v_commission_amount
  WHERE id = v_referrer_id;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;
