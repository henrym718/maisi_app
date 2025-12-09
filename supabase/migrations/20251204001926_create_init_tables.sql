CREATE TYPE public.modality AS ENUM (
    'on-site',
    'remote',
    'hybrid'
);

CREATE TYPE public.transaction_type AS ENUM (
    -- Ingresos
    'PURCHASE',         -- Compra de coins (por T o C)
    'INITIAL_GIFT',     -- Regalo inicial al crear cuenta (T o C)    
    'REFUND',           -- Devolución de coins (T o C) si una oferta es cancelada y hay aplicaciones
    'MONTHLY_GIFT',     -- Regalo mensual recurrente (Solo C)
        -- Egresos (Fees/Gastos)
    'APPLICATION_FEE',  -- Gasto del Talento por aplicar a trabajos
    'FEATURED_FEE',     -- Gasto del Talento por promoción
    'CONTACT_FEE'       -- Gasto del Cliente por contacto directo
);

CREATE TYPE public.transaction_status AS ENUM (
    'pending', 
    'completed', 
    'failed',
);


CREATE TABLE public.profiles{
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id),
    -- INFORMACIÓN BASE
    full_name text NOT NULL,
    avatar_url text,       
    city text NOT NULL,
    whatsapp text NOT NULL,

    -- NOTIFICACIONES
    notifications_enabled boolean NOT NULL DEFAULT true,

    -- ESTADO Y MANTENIMIENTO
    is_active boolean NOT NULL DEFAULT true,
    is_onboarded boolean NOT NULL DEFAULT false,    
    is_talent boolean NOT NULL DEFAULT false,
    is_client boolean NOT NULL DEFAULT false,
    last_online timestamp without time zone,
    
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
}


CREATE TABLE public.talents{    
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid NOT NULL REFERENCES public.profiles(id), 
    group_id uuid NOT NULL REFERENCES public.groups(id),
    category_id uuid NOT NULL REFERENCES public.categories(id), 
    

    -- INFORMACIÓN BASE
    title text NOT NULL,
    about_me text NOT NULL,    
    service_areas text[] NOT NULL,   
    modality public.modality NOT NULL,
    cover_image_url text NOT NULL,  
    intro_video_url text NOT NULL,
 

 -- POLÍTICA COMERCIAL Y DISPONIBILIDAD
    reference_price text, -- Texto libre (ej: "Desde $40" o "A convenir").
    visit_cost text, -- Texto libre (ej: "Visita $15 (deducible)" o "Presupuesto Gratis").
    service_hours text, -- Texto simple (ej: "Lun-Sab 8:00 - 18:00").
    handles_emergencies boolean NOT NULL DEFAULT false, -- Campo booleano para filtrar rápidamente.
    warranty_description text, -- Texto libre (ej: "30 días en mano de obra").


 -- PRUEBA SOCIAL / REPUTACIÓN
    rating numeric(2, 1) NOT NULL DEFAULT 0.0,   
    total_reviews integer NOT NULL DEFAULT 0,    

    -- CAPACIDAD Y NIVEL
    team_members integer NOT NULL DEFAULT 1,

    -- REPUTACIÓN Y EXPERIENCIA
    jobs_completed integer NOT NULL DEFAULT 0,      
    jobs_in_progress integer NOT NULL DEFAULT 0, 
    experience_years integer NOT NULL DEFAULT 0,
  
    -- ESTADO Y MANTENIMIENTO     
    is_available_now boolean NOT NULL DEFAULT false,
    is_verified boolean NOT NULL DEFAULT false,
    is_draft boolean NOT NULL DEFAULT true,
    is_top_talent boolean NOT NULL DEFAULT false,
    is_featured boolean NOT NULL DEFAULT false,
  
   
    -- FAQ y METADATOS
    faqs jsonb[],
       
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),  

    CONSTRAINT profile_must_be_talent CHECK (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = profile_id AND p.is_talent = true)
)
}


CREATE TABLE public.search_keywords{
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,       
    category_id uuid NOT NULL REFERENCES public.categories(id),
}


CREATE TABLE public.talents_search_keywords{    
    talent_id uuid NOT NULL REFERENCES public.talents(id),
    keyword_id uuid NOT NULL REFERENCES public.search_keywords(id),
    PRIMARY KEY (talent_id, keyword_id)
}


CREATE TABLE public.skills{
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,       
    category_id uuid NOT NULL REFERENCES public.categories(id),
}


CREATE TABLE public.talents_skills{    
    talent_id uuid NOT NULL REFERENCES public.talents(id),
    skill_id uuid NOT NULL REFERENCES public.skills(id),
    PRIMARY KEY (talent_id, skill_id)
}


CREATE TABLE public.groups{
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,    
}


CREATE TABLE public.categories{
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    group_id uuid NOT NULL REFERENCES public.groups(id),       
}


CREATE TABLE public.portfolio_items{
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    talent_id uuid NOT NULL REFERENCES public.talents(id),
    title text NOT NULL,
    description text NOT NULL,
    external_link text,        
}


CREATE TABLE public.portfolio_items_images{
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_item_id uuid NOT NULL REFERENCES public.portfolio_items(id),
    storage_path text NOT NULL,
    order_index integer NOT NULL,
    caption text,    
}


CREATE TABLE public.wallet {
    id uuid NOT NULL PRIMARY KEY REFERENCES public.profiles(id),    
    balance integer NOT NULL DEFAULT 0,    
}


CREATE TABLE public.coin_transactions{
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id uuid NOT NULL REFERENCES public.profiles(id),
    amount integer NOT NULL,
    real_money_spent numeric(10, 2),
    currency_code text NOT NULL DEFAULT 'USD',
    payment_provider_id text,
    type public.transaction_type NOT NULL,
    status public.transaction_status NOT NULL,
    created_at timestamp without time zone DEFAULT now(),
}


CREATE TABLE public.reviews (
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),    
    talent_id uuid NOT NULL REFERENCES public.talents(id),
    client_id uuid NOT NULL REFERENCES public.clients(id),
    rating numeric(2, 1) NOT NULL CHECK (rating >= 1.0 AND rating <= 5.0),
    comment text NOT NULL,
    verification_token text NOT NULL UNIQUE,
    is_verified boolean NOT NULL DEFAULT false,
    service_date date,
    created_at timestamp without time zone DEFAULT now()
);

CREATE UNIQUE INDEX reviews_verification_token_idx ON public.reviews USING btree (verification_token);


CREATE TABLE public.clients {
    id uuid NOT NULL PRIMARY KEY REFERENCES public.profiles(id),
    -- HISTORIAL
    projects_posted integer DEFAULT 0,
    projects_completed integer DEFAULT 0,        
    rating numeric(2,1) DEFAULT 0.0,
    total_reviews integer DEFAULT 0,

    -- DINERO
    total_spent decimal(10,2) DEFAULT 0,

    -- ESTADO Y MANTENIMIENTO
    is_active boolean NOT NULL DEFAULT true,
           
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),    

    CONSTRAINT profile_must_be_client CHECK (
    EXISTS (SELECT 1 FROM profiles p WHERE p.id = clients.id AND p.is_client = true)
)
}

CREATE TABLE public.jobs{
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),    
    client_id uuid NOT NULL REFERENCES public.clients(id),
    title text NOT NULL,
    description text NOT NULL,
    reported_final_price decimal(10,2) NOT NULL,                  
    created_at timestamp without time zone DEFAULT now(), 
}




