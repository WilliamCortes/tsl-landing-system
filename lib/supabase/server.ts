import 'server-only'

import { createClient } from '@supabase/supabase-js'

/**
 * Cliente Supabase con service role key. Bypassa RLS — usar SOLO en
 * Server Components y Route Handlers (page.tsx, /api/landing/sign).
 * Nunca importar este módulo desde un Client Component.
 */
export function createServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Faltan NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en las variables de entorno'
    )
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
  })
}
