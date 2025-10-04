-- Core tables for multi-tenant CRM system
-- This creates the foundation: tenants, users, and their relationships

-- Tenants table (organizations/companies using the CRM)
CREATE TABLE IF NOT EXISTS public.tenants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  crm_type TEXT NOT NULL CHECK (crm_type IN ('classic', 'services', 'kaspi')),
  plan TEXT NOT NULL DEFAULT 'starter' CHECK (plan IN ('starter', 'professional', 'enterprise')),
  status TEXT NOT NULL DEFAULT 'trial' CHECK (status IN ('trial', 'active', 'suspended', 'cancelled')),
  trial_ends_at TIMESTAMPTZ,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User profiles (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  tenant_id UUID REFERENCES public.tenants(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('owner', 'admin', 'manager', 'user')),
  avatar_url TEXT,
  phone TEXT,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Clients table (customers in the CRM)
CREATE TABLE IF NOT EXISTS public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id UUID NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  source TEXT,
  tags TEXT[] DEFAULT '{}',
  custom_fields JSONB DEFAULT '{}',
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tenants
CREATE POLICY "Users can view their own tenant"
  ON public.tenants FOR SELECT
  USING (id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Owners can update their tenant"
  ON public.tenants FOR UPDATE
  USING (id IN (
    SELECT tenant_id FROM public.user_profiles 
    WHERE id = auth.uid() AND role IN ('owner', 'admin')
  ));

-- RLS Policies for user_profiles
CREATE POLICY "Users can view profiles in their tenant"
  ON public.user_profiles FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can update their own profile"
  ON public.user_profiles FOR UPDATE
  USING (id = auth.uid());

-- RLS Policies for clients
CREATE POLICY "Users can view clients in their tenant"
  ON public.clients FOR SELECT
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can insert clients in their tenant"
  ON public.clients FOR INSERT
  WITH CHECK (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can update clients in their tenant"
  ON public.clients FOR UPDATE
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

CREATE POLICY "Users can delete clients in their tenant"
  ON public.clients FOR DELETE
  USING (tenant_id IN (
    SELECT tenant_id FROM public.user_profiles WHERE id = auth.uid()
  ));

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_profiles_tenant_id ON public.user_profiles(tenant_id);
CREATE INDEX IF NOT EXISTS idx_clients_tenant_id ON public.clients(tenant_id);
CREATE INDEX IF NOT EXISTS idx_clients_created_at ON public.clients(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_tenants_updated_at BEFORE UPDATE ON public.tenants
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
