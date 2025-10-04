-- Messaging tables for WhatsApp integration
-- For managing conversations and messages with clients

-- Conversations table (chat threads)
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  channel TEXT NOT NULL DEFAULT 'whatsapp' CHECK (channel IN ('whatsapp', 'telegram', 'sms', 'email')),
  phone_number TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'archived', 'blocked')),
  last_message_at TIMESTAMPTZ,
  unread_count INTEGER DEFAULT 0,
  assigned_to UUID REFERENCES auth.users(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages table
CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
  sender_type TEXT NOT NULL CHECK (sender_type IN ('client', 'user', 'system')),
  sender_id UUID REFERENCES auth.users(id),
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text' CHECK (message_type IN ('text', 'image', 'video', 'audio', 'document', 'location')),
  media_url TEXT,
  status TEXT NOT NULL DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'delivered', 'read', 'failed')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Message templates table (for quick replies)
CREATE TABLE IF NOT EXISTS public.message_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.message_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations
CREATE POLICY "Users can view conversations in their tenant"
  ON public.conversations FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage conversations in their tenant"
  ON public.conversations FOR ALL
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their tenant"
  ON public.messages FOR SELECT
  USING (conversation_id IN (
    SELECT id FROM public.conversations WHERE tenant_id IN (
      SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
    )
  ));

CREATE POLICY "Users can create messages in their tenant"
  ON public.messages FOR INSERT
  WITH CHECK (conversation_id IN (
    SELECT id FROM public.conversations WHERE tenant_id IN (
      SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
    )
  ));

-- RLS Policies for message_templates
CREATE POLICY "Users can view templates in their tenant"
  ON public.message_templates FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage templates in their tenant"
  ON public.message_templates FOR ALL
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_conversations_tenant_id ON public.conversations(tenant_id);
CREATE INDEX IF NOT EXISTS idx_conversations_client_id ON public.conversations(client_id);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON public.conversations(status);
CREATE INDEX IF NOT EXISTS idx_conversations_last_message_at ON public.conversations(last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON public.messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_message_templates_tenant_id ON public.message_templates(tenant_id);

-- Triggers for updated_at
CREATE TRIGGER update_conversations_updated_at BEFORE UPDATE ON public.conversations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_message_templates_updated_at BEFORE UPDATE ON public.message_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to update conversation last_message_at
CREATE OR REPLACE FUNCTION update_conversation_last_message()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.conversations
  SET last_message_at = NEW.created_at
  WHERE id = NEW.conversation_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_conversation_on_message
  AFTER INSERT ON public.messages
  FOR EACH ROW
  EXECUTE FUNCTION update_conversation_last_message();

-- Insert default message templates
INSERT INTO public.message_templates (tenant_id, name, content, category, created_by)
SELECT 
  t.id,
  template.name,
  template.content,
  template.category,
  NULL
FROM public.tenants t
CROSS JOIN (
  VALUES 
    ('Приветствие', 'Здравствуйте! Спасибо за обращение. Чем могу помочь?', 'greeting'),
    ('Подтверждение записи', 'Ваша запись подтверждена на {date} в {time}. Ждем вас!', 'appointment'),
    ('Напоминание', 'Напоминаем о вашей записи завтра в {time}. До встречи!', 'reminder'),
    ('Благодарность', 'Спасибо за визит! Будем рады видеть вас снова.', 'followup')
) AS template(name, content, category)
WHERE NOT EXISTS (
  SELECT 1 FROM public.message_templates WHERE tenant_id = t.id
);
