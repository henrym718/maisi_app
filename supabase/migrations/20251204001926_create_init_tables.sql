CREATE TYPE public.modality AS ENUM ('on-site', 'remote', 'hybrid');


CREATE TABLE public.profiles{
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.users(id),
    -- INFORMACIÓN BASE
    full_name text NOT NULL,
    avatar_url text,    
    city text NOT NULL,
    phone_number text NOT NULL,

    -- NOTIFICACIONES
    notifications_enabled boolean NOT NULL DEFAULT true,

    -- ESTADO Y MANTENIMIENTO
    is_onboarded boolean NOT NULL DEFAULT false,
    is_active boolean NOT NULL DEFAULT true,
    is_talent boolean NOT NULL DEFAULT false,
    is_client boolean NOT NULL DEFAULT false,
    
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),
}


CREATE TABLE public.talents{    
    id uuid NOT NULL PRIMARY KEY REFERENCES auth.profiles(id), 
    group_id uuid NOT NULL REFERENCES public.groups(id),
    category_id uuid NOT NULL REFERENCES public.categories(id), 

    -- INFORMACIÓN BASE
    title text NOT NULL,
    about_me text NOT NULL,    
    service_zone text[] NOT NULL,   
    modality public.modality NOT NULL,
    banner_url text NOT NULL,  
 
 -- PRUEBA SOCIAL / REPUTACIÓN
    rating numeric(2, 1) NOT NULL DEFAULT 0.0,   
    reviews_count integer NOT NULL DEFAULT 0,    
   
    -- ESTADO Y MANTENIMIENTO 
    is_active boolean NOT NULL DEFAULT false,
    is_verified boolean NOT NULL DEFAULT false,
    is_draft boolean NOT NULL DEFAULT true,
    best_talents boolean NOT NULL DEFAULT false,
    last_online timestamp without time zone,
   
    -- FAQ y METADATOS
    faq jsonb[],
       
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone DEFAULT now(),    
}

CREATE TABLE public.search_tags{
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,       
    category_id uuid NOT NULL REFERENCES public.categories(id),
}

CREATE TABLE public.talents_search_tags{    
    talent_id uuid NOT NULL REFERENCES public.talents(id),
    tag_id uuid NOT NULL REFERENCES public.search_tags(id),
    PRIMARY KEY (talent_id, tag_id)
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
    project_url text,        
}

CREATE TABLE public.portfolio_items_images{
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),
    portfolio_item_id uuid NOT NULL REFERENCES public.portfolio_items(id),
    image_url text NOT NULL,
    order_index integer NOT NULL,
    caption text,    
}

CREATE TABLE public.reviews (
    id uuid NOT NULL PRIMARY KEY DEFAULT gen_random_uuid(),    
    talent_id uuid NOT NULL REFERENCES public.talents(id),
    client_id uuid NOT NULL REFERENCES auth.clients(id),
    rating numeric(2, 1) NOT NULL CHECK (rating >= 1.0 AND rating <= 5.0),
    comment text NOT NULL,
    verification_token text NOT NULL UNIQUE,
    is_verified boolean NOT NULL DEFAULT false,
    service_date date,
    created_at timestamp without time zone DEFAULT now()
);

CREATE UNIQUE INDEX reviews_verification_token_idx ON public.reviews USING btree (verification_token);




