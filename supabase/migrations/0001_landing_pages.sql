-- Enum de categorías de cliente
create type landing_category as enum (
  'hotel',
  'finca',
  'glamping',
  'actividad',
  'bono_supermercado',
  'cafeteria',
  'otro'
);

create table landing_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  nombre_oferta text not null,
  subtitulo text,
  video_url text,
  imagenes_carrusel text[] not null default '{}',
  precio_original numeric(12,2) not null,
  precio_oferta_estado1 numeric(12,2) not null,
  precio_oferta_estado2 numeric(12,2) not null,
  wompi_reference text not null,
  wompi_public_key text not null,
  wompi_integrity_key text not null, -- SECRETA: solo se lee server-side (service role) en /api/landing/sign
  moneda text not null default 'COP',
  categoria landing_category not null default 'otro',
  tipo_badge text, -- override opcional del badge derivado de `categoria`
  beneficios text[] not null default '{}',
  activo boolean not null default true,
  texto_cta text, -- si es null, se usa "Comprar ahora"
  duracion_oferta_minutos integer not null default 15,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Índices
create unique index idx_landing_pages_slug on landing_pages (slug);
create index idx_landing_pages_activo on landing_pages (activo);

-- Trigger para updated_at
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql
set search_path = '';

create trigger trg_landing_pages_updated_at
before update on landing_pages
for each row execute function set_updated_at();

-- RLS
alter table landing_pages enable row level security;

-- Sin políticas para anon/authenticated (ni select, ni insert/update/delete):
-- la tabla incluye `wompi_integrity_key` (secreta), por lo que NINGÚN cliente
-- con la clave pública/anon puede leer esta tabla directamente.
-- Todo acceso (lectura desde page.tsx, lectura+firma desde /api/landing/sign)
-- ocurre server-side con el service role key, que bypassa RLS.
