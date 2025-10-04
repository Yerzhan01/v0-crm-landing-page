-- Sales funnels and deals tables
-- For managing sales pipeline and deals

-- Funnels table (sales pipelines)
CREATE TABLE IF NOT EXISTS public.funnels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Funnel stages table
CREATE TABLE IF NOT EXISTS public.funnel_stages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  funnel_id UUID NOT NULL REFERENCES public.funnels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT '#3b82f6',
  position INTEGER NOT NULL DEFAULT 0,
  is_final BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deals table
CREATE TABLE IF NOT EXISTS public.deals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  funnel_id UUID NOT NULL REFERENCES public.funnels(id) ON DELETE CASCADE,
  stage_id UUID NOT NULL REFERENCES public.funnel_stages(id) ON DELETE RESTRICT,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  amount DECIMAL(10, 2),
  currency TEXT DEFAULT 'KZT',
  probability INTEGER DEFAULT 50 CHECK (probability >= 0 AND probability <= 100),
  expected_close_date DATE,
  assigned_to UUID REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'won', 'lost')),
  lost_reason TEXT,
  custom_fields JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Deal activities table (history of changes and interactions)
CREATE TABLE IF NOT EXISTS public.deal_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  deal_id UUID NOT NULL REFERENCES public.deals(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('note', 'stage_change', 'status_change', 'amount_change', 'call', 'email', 'meeting')),
  content TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.funnels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funnel_stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deal_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for funnels
CREATE POLICY "Users can view funnels in their tenant"
  ON public.funnels FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage funnels in their tenant"
  ON public.funnels FOR ALL
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

-- RLS Policies for funnel_stages
CREATE POLICY "Users can view stages in their tenant"
  ON public.funnel_stages FOR SELECT
  USING (funnel_id IN (
    SELECT id FROM public.funnels WHERE tenant_id IN (
      SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
    )
  ));

CREATE POLICY "Users can manage stages in their tenant"
  ON public.funnel_stages FOR ALL
  USING (funnel_id IN (
    SELECT id FROM public.funnels WHERE tenant_id IN (
      SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
    )
  ));

-- RLS Policies for deals
CREATE POLICY "Users can view deals in their tenant"
  ON public.deals FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage deals in their tenant"
  ON public.deals FOR ALL
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

-- RLS Policies for deal_activities
CREATE POLICY "Users can view activities in their tenant"
  ON public.deal_activities FOR SELECT
  USING (deal_id IN (
    SELECT id FROM public.deals WHERE tenant_id IN (
      SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
    )
  ));

CREATE POLICY "Users can create activities in their tenant"
  ON public.deal_activities FOR INSERT
  WITH CHECK (deal_id IN (
    SELECT id FROM public.deals WHERE tenant_id IN (
      SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
    )
  ));

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_funnels_tenant_id ON public.funnels(tenant_id);
CREATE INDEX IF NOT EXISTS idx_funnel_stages_funnel_id ON public.funnel_stages(funnel_id);
CREATE INDEX IF NOT EXISTS idx_funnel_stages_position ON public.funnel_stages(position);
CREATE INDEX IF NOT EXISTS idx_deals_tenant_id ON public.deals(tenant_id);
CREATE INDEX IF NOT EXISTS idx_deals_funnel_id ON public.deals(funnel_id);
CREATE INDEX IF NOT EXISTS idx_deals_stage_id ON public.deals(stage_id);
CREATE INDEX IF NOT EXISTS idx_deals_client_id ON public.deals(client_id);
CREATE INDEX IF NOT EXISTS idx_deal_activities_deal_id ON public.deal_activities(deal_id);

-- Triggers for updated_at
CREATE TRIGGER update_funnels_updated_at BEFORE UPDATE ON public.funnels
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_funnel_stages_updated_at BEFORE UPDATE ON public.funnel_stages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default funnel and stages
INSERT INTO public.funnels (tenant_id, name, description, is_default, is_active)
SELECT 
  t.id,
  'Основная воронка продаж',
  'Стандартная воронка для управления сделками',
  true,
  true
FROM public.tenants t
WHERE NOT EXISTS (SELECT 1 FROM public.funnels WHERE tenant_id = t.id);

-- Insert default stages for each funnel
INSERT INTO public.funnel_stages (funnel_id, name, color, position)
SELECT 
  f.id,
  stage.name,
  stage.color,
  stage.position
FROM public.funnels f
CROSS JOIN (
  VALUES 
    ('Новая заявка', '#94a3b8', 0),
    ('Квалификация', '#3b82f6', 1),
    ('Предложение', '#8b5cf6', 2),
    ('Переговоры', '#f59e0b', 3),
    ('Закрыто', '#10b981', 4)
) AS stage(name, color, position)
WHERE NOT EXISTS (
  SELECT 1 FROM public.funnel_stages WHERE funnel_id = f.id
);
