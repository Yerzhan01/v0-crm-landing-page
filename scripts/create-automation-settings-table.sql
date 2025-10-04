-- Create automation_settings table
CREATE TABLE IF NOT EXISTS automation_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES tenants(id) ON DELETE CASCADE,
  enabled BOOLEAN DEFAULT true,
  ai_agent_enabled BOOLEAN DEFAULT true,
  chatbot_enabled BOOLEAN DEFAULT true,
  notifications_enabled BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(tenant_id)
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_automation_settings_tenant ON automation_settings(tenant_id);

-- Add RLS policies
ALTER TABLE automation_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their tenant's automation settings"
  ON automation_settings FOR SELECT
  USING (
    tenant_id IN (
      SELECT tenant_id FROM user_profiles WHERE id = auth.uid()
    )
  );

CREATE POLICY "Users can update their tenant's automation settings"
  ON automation_settings FOR ALL
  USING (
    tenant_id IN (
      SELECT tenant_id FROM user_profiles WHERE id = auth.uid()
    )
  );
