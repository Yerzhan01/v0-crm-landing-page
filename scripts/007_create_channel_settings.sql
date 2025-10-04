-- Таблица настроек каналов для каждого tenant
CREATE TABLE IF NOT EXISTS channel_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  channel_type VARCHAR(50) NOT NULL, -- 'whatsapp', 'telegram'
  channel_name VARCHAR(255) NOT NULL,
  
  -- WhatsApp (Green API) настройки
  green_api_instance_id VARCHAR(255),
  green_api_token VARCHAR(255),
  
  -- Telegram настройки
  telegram_bot_token VARCHAR(255),
  telegram_chat_id VARCHAR(255),
  
  -- Общие настройки
  is_active BOOLEAN DEFAULT true,
  auto_create_clients BOOLEAN DEFAULT true,
  auto_create_deals BOOLEAN DEFAULT true,
  default_funnel_id UUID REFERENCES funnels(id),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(tenant_id, channel_type, channel_name)
);

-- Индексы для быстрого поиска
CREATE INDEX idx_channel_settings_tenant ON channel_settings(tenant_id);
CREATE INDEX idx_channel_settings_green_api ON channel_settings(green_api_instance_id) WHERE green_api_instance_id IS NOT NULL;
CREATE INDEX idx_channel_settings_telegram ON channel_settings(telegram_bot_token) WHERE telegram_bot_token IS NOT NULL;

-- Функция обновления updated_at
CREATE OR REPLACE FUNCTION update_channel_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER channel_settings_updated_at
  BEFORE UPDATE ON channel_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_channel_settings_updated_at();
