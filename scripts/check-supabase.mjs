// Script de verificación del Sprint 1.
// Uso: node --env-file=.env.local scripts/check-supabase.mjs
//
// Confirma:
// 1. Que el service role key puede leer las 3 filas seed de landing_pages
//    (incluyendo wompi_integrity_key).
// 2. Que un cliente con la clave pública/anon NO puede leer la tabla (RLS).

import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // opcional, solo para el chequeo de RLS

if (!url || !serviceRoleKey) {
  console.error('Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY')
  process.exit(1)
}

const adminClient = createClient(url, serviceRoleKey, { auth: { persistSession: false } })

const { data, error } = await adminClient
  .from('landing_pages')
  .select('slug, nombre_oferta, activo, wompi_integrity_key')
  .order('slug')

if (error) {
  console.error('Error leyendo con service role:', error.message)
  process.exit(1)
}

console.log(`OK: service role leyó ${data.length} filas:`)
for (const row of data) {
  console.log(`  - ${row.slug} (activo=${row.activo}, integrity_key=${row.wompi_integrity_key ? 'presente' : 'AUSENTE'})`)
}

if (data.length !== 3) {
  console.warn(`Advertencia: se esperaban 3 filas seed, se encontraron ${data.length}`)
}

if (anonKey) {
  const anonClient = createClient(url, anonKey, { auth: { persistSession: false } })
  const { data: anonData, error: anonError } = await anonClient
    .from('landing_pages')
    .select('slug')

  if (anonError) {
    console.log('OK: el cliente anon NO puede leer landing_pages (bloqueado por RLS):', anonError.message)
  } else if (!anonData || anonData.length === 0) {
    console.log('OK: el cliente anon no recibió filas (RLS efectivo)')
  } else {
    console.error(`FALLO DE SEGURIDAD: el cliente anon leyó ${anonData.length} filas de landing_pages`)
    process.exit(1)
  }
} else {
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY no definido, se omite el chequeo de RLS con anon key')
}
