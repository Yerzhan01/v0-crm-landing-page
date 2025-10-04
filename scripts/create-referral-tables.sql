-- Таблица реферальных кодов
CREATE TABLE IF NOT EXISTS referral_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  code VARCHAR(20) UNIQUE NOT NULL,
  commission_rate DECIMAL(5,2) DEFAULT 10.00,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Таблица конверсий по рефералам
CREATE TABLE IF NOT EXISTS referral_conversions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  referrer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referred_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referred_email VARCHAR(255),
  referral_code VARCHAR(20) NOT NULL,
  status VARCHAR(20) DEFAULT 'clicked', -- clicked, registered, paid
  plan VARCHAR(50),
  plan_amount DECIMAL(10,2),
  commission_amount DECIMAL(10,2),
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  registered_at TIMESTAMP WITH TIME ZONE,
  paid_at TIMESTAMP WITH TIME ZONE
);

-- Таблица выплат
CREATE TABLE IF NOT EXISTS referral_payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(50),
  payment_details JSONB,
  status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Индексы для производительности
CREATE INDEX IF NOT EXISTS idx_referral_codes_user_id ON referral_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_referral_codes_code ON referral_codes(code);
CREATE INDEX IF NOT EXISTS idx_referral_conversions_referrer_id ON referral_conversions(referrer_id);
CREATE INDEX IF NOT EXISTS idx_referral_conversions_referred_user_id ON referral_conversions(referred_user_id);
CREATE INDEX IF NOT EXISTS idx_referral_conversions_status ON referral_conversions(status);
CREATE INDEX IF NOT EXISTS idx_referral_payouts_user_id ON referral_payouts(user_id);

-- Функция для автоматического создания реферального кода при регистрации
CREATE OR REPLACE FUNCTION create_referral_code_for_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO referral_codes (user_id, code)
  VALUES (
    NEW.id,
    SUBSTRING(MD5(RANDOM()::TEXT || NEW.id::TEXT) FROM 1 FOR 8)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Триггер для автоматического создания реферального кода
DROP TRIGGER IF EXISTS trigger_create_referral_code ON auth.users;
CREATE TRIGGER trigger_create_referral_code
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_referral_code_for_user();

-- RLS политики
ALTER TABLE referral_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_conversions ENABLE ROW LEVEL SECURITY;
ALTER TABLE referral_payouts ENABLE ROW LEVEL SECURITY;

-- Пользователь может видеть только свой реферальный код
CREATE POLICY "Users can view own referral code"
  ON referral_codes FOR SELECT
  USING (auth.uid() = user_id);

-- Пользователь может видеть только свои конверсии
CREATE POLICY "Users can view own conversions"
  ON referral_conversions FOR SELECT
  USING (auth.uid() = referrer_id);

-- Пользователь может видеть только свои выплаты
CREATE POLICY "Users can view own payouts"
  ON referral_payouts FOR SELECT
  USING (auth.uid() = user_id);
