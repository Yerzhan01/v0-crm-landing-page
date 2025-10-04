-- Calendar system tables for appointments and scheduling
-- Custom calendar without Google Calendar dependency

-- Services table (for service-based CRM)
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price DECIMAL(10, 2),
  color TEXT DEFAULT '#3b82f6',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Staff/Masters table
CREATE TABLE IF NOT EXISTS public.staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  role TEXT DEFAULT 'master',
  phone TEXT,
  email TEXT,
  color TEXT DEFAULT '#8b5cf6',
  is_active BOOLEAN DEFAULT true,
  working_hours JSONB DEFAULT '{"monday": {"start": "09:00", "end": "18:00"}, "tuesday": {"start": "09:00", "end": "18:00"}, "wednesday": {"start": "09:00", "end": "18:00"}, "thursday": {"start": "09:00", "end": "18:00"}, "friday": {"start": "09:00", "end": "18:00"}}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
  staff_id UUID REFERENCES public.staff(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for services
CREATE POLICY "Users can view services in their tenant"
  ON public.services FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage services in their tenant"
  ON public.services FOR ALL
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

-- RLS Policies for staff
CREATE POLICY "Users can view staff in their tenant"
  ON public.staff FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage staff in their tenant"
  ON public.staff FOR ALL
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

-- RLS Policies for appointments
CREATE POLICY "Users can view appointments in their tenant"
  ON public.appointments FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can manage appointments in their tenant"
  ON public.appointments FOR ALL
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_services_tenant_id ON public.services(tenant_id);
CREATE INDEX IF NOT EXISTS idx_staff_tenant_id ON public.staff(tenant_id);
CREATE INDEX IF NOT EXISTS idx_appointments_tenant_id ON public.appointments(tenant_id);
CREATE INDEX IF NOT EXISTS idx_appointments_start_time ON public.appointments(start_time);
CREATE INDEX IF NOT EXISTS idx_appointments_client_id ON public.appointments(client_id);
CREATE INDEX IF NOT EXISTS idx_appointments_staff_id ON public.appointments(staff_id);

-- Triggers for updated_at
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_staff_updated_at BEFORE UPDATE ON public.staff
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
