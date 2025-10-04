-- Create default funnel if none exists
DO $$
DECLARE
  v_tenant_id uuid;
  v_funnel_id uuid;
BEGIN
  -- Get the first tenant (you can modify this to target specific tenant)
  SELECT id INTO v_tenant_id FROM tenants LIMIT 1;
  
  IF v_tenant_id IS NOT NULL THEN
    -- Check if default funnel exists
    IF NOT EXISTS (SELECT 1 FROM funnels WHERE tenant_id = v_tenant_id AND is_default = true) THEN
      -- Create default funnel
      INSERT INTO funnels (name, description, tenant_id, is_active, is_default)
      VALUES ('Основная воронка', 'Воронка продаж по умолчанию', v_tenant_id, true, true)
      RETURNING id INTO v_funnel_id;
      
      -- Create default stages
      INSERT INTO funnel_stages (funnel_id, name, description, color, position, is_final)
      VALUES
        (v_funnel_id, 'Неразобранное', 'Новые заявки требующие обработки', '#94a3b8', 0, false),
        (v_funnel_id, 'Квалификация', 'Определение потребностей клиента', '#3b82f6', 1, false),
        (v_funnel_id, 'Предложение', 'Отправлено коммерческое предложение', '#8b5cf6', 2, false),
        (v_funnel_id, 'Переговоры', 'Обсуждение условий сделки', '#f59e0b', 3, false),
        (v_funnel_id, 'Успешно', 'Сделка успешно закрыта', '#10b981', 4, true),
        (v_funnel_id, 'Проиграно', 'Сделка не состоялась', '#ef4444', 5, true);
      
      RAISE NOTICE 'Default funnel created successfully';
    ELSE
      RAISE NOTICE 'Default funnel already exists';
    END IF;
  ELSE
    RAISE NOTICE 'No tenant found';
  END IF;
END $$;
