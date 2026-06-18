export type LandingCategory =
  | 'hotel'
  | 'finca'
  | 'glamping'
  | 'actividad'
  | 'bono_supermercado'
  | 'cafeteria'
  | 'otro'

export type LandingVisitState = 'estado1' | 'estado2' | 'expired'

// Fila completa tal como viene de Supabase. SOLO se usa server-side
// (page.tsx para decidir la rama, route.ts de /api/landing/sign para el hash).
// NUNCA se serializa completa hacia un Client Component.
export interface LandingPage {
  id: string
  slug: string
  nombre_oferta: string
  subtitulo: string | null
  video_url: string | null
  imagenes_carrusel: string[]
  precio_original: number
  precio_oferta_estado1: number
  precio_oferta_estado2: number
  wompi_reference: string
  wompi_public_key: string
  wompi_integrity_key: string // SECRETA — solo server-side
  moneda: string
  categoria: LandingCategory
  tipo_badge: string | null
  beneficios: string[]
  activo: boolean
  texto_cta: string | null
  duracion_oferta_minutos: number
}

// Subconjunto seguro para enviar a Client Components (sin wompi_integrity_key).
// page.tsx construye este objeto explícitamente (no usa el spread de LandingPage)
// antes de pasarlo a <LandingExperience>.
export type LandingPageClient = Omit<LandingPage, 'wompi_integrity_key'>

// Estructura persistida en localStorage como `tsl_landing_<slug>`
export interface VisitRecord {
  firstVisitAt: number // epoch ms, fijado en la primera visita
  state1ExpiresAt: number // firstVisitAt + duracion_oferta_minutos * 60_000
  state2AvailableAt: number // firstVisitAt + 24h
  state2ExpiresAt: number | null // fijado cuando el usuario entra a estado2
}

export interface UseVisitStateResult {
  state: LandingVisitState
  /** timestamp objetivo (epoch ms) para el countdown activo, o null si el estado es 'expired' final */
  countdownTarget: number | null
  /** marca el inicio de estado2 si aún no se ha hecho (llamado por LandingExperience al detectar la transición) */
  startEstado2: () => void
}

export interface LandingExperienceProps {
  landing: LandingPageClient
}

export interface CountdownTimerProps {
  targetTimestamp: number
  variant?: 'urgent' | 'secondary' // urgent = rojo intenso (estado1), secondary = estado2
  onExpire?: () => void
}

export interface VideoPlayerProps {
  videoUrl: string
  onEnded?: () => void
}

export interface ImageCarouselProps {
  images: string[] // se asume length > 0; el padre decide si renderizar
}

export interface PriceBlockProps {
  precioOriginal: number
  precioOferta: number
  moneda: string
}

export interface CtaButtonProps {
  label: string // texto_cta ?? 'Comprar ahora'
  slug: string // usado para pedir la signature a /api/landing/sign
  wompiPublicKey: string
  wompiReference: string
  amountInCents: number
  currency: string
}

export interface BenefitsListProps {
  beneficios: string[]
}

export interface CategoryBadgeProps {
  categoria: LandingCategory
  tipoBadge: string | null
}

export interface ExpiredStateProps {
  variant: 'waiting-for-estado2' | 'final'
  nextAvailableAt?: number // para mostrar "vuelve en X horas" si variant = waiting-for-estado2
}

// Contrato de POST /api/landing/sign
export interface SignRequestBody {
  slug: string
  reference: string
  amountInCents: number
  currency: string
}

export interface SignResponseBody {
  signature: string
}

export interface PaymentStatusBannerProps {
  status: import('@/lib/utils/wompi').WompiTransactionStatus
}
