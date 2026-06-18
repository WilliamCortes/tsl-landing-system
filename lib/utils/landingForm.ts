import type { LandingCategory } from "@/types/landing";

export const LANDING_CATEGORIES: LandingCategory[] = [
  "hotel",
  "finca",
  "glamping",
  "actividad",
  "bono_supermercado",
  "cafeteria",
  "otro",
];

export interface LandingFormValues {
  slug: string;
  nombre_oferta: string;
  subtitulo: string | null;
  video_url: string | null;
  imagenes_carrusel: string[];
  precio_original: number;
  precio_oferta_estado1: number;
  precio_oferta_estado2: number;
  wompi_reference: string;
  wompi_public_key: string;
  wompi_integrity_key: string;
  moneda: string;
  categoria: LandingCategory;
  tipo_badge: string | null;
  beneficios: string[];
  activo: boolean;
  texto_cta: string | null;
  duracion_oferta_minutos: number;
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function parseListField(raw: FormDataEntryValue | null): string[] {
  return String(raw ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function parseOptionalText(raw: FormDataEntryValue | null): string | null {
  const value = String(raw ?? "").trim();
  return value.length > 0 ? value : null;
}

function parseNumber(raw: FormDataEntryValue | null, field: string): number {
  const value = Number(String(raw ?? "").trim());
  if (!Number.isFinite(value) || value < 0) {
    throw new Error(`"${field}" debe ser un número válido`);
  }
  return value;
}

/**
 * Convierte el FormData del formulario de admin en una fila lista para
 * insertar/actualizar en `landing_pages`. Lanza Error con un mensaje en
 * español listo para mostrar al usuario si algo es inválido.
 */
export function parseLandingForm(formData: FormData): LandingFormValues {
  const slug = String(formData.get("slug") ?? "").trim().toLowerCase();
  if (!SLUG_PATTERN.test(slug)) {
    throw new Error(
      'El "slug" solo puede tener letras minúsculas, números y guiones (ej: finca-el-eden)'
    );
  }

  const nombre_oferta = String(formData.get("nombre_oferta") ?? "").trim();
  if (!nombre_oferta) {
    throw new Error('El "nombre de la oferta" es obligatorio');
  }

  const wompi_reference = String(formData.get("wompi_reference") ?? "").trim();
  if (!wompi_reference) {
    throw new Error('La "referencia Wompi" es obligatoria');
  }

  const wompi_public_key = String(formData.get("wompi_public_key") ?? "").trim();
  if (!wompi_public_key) {
    throw new Error('La "llave pública Wompi" es obligatoria');
  }

  const wompi_integrity_key = String(formData.get("wompi_integrity_key") ?? "").trim();
  if (!wompi_integrity_key) {
    throw new Error('La "llave de integridad Wompi" es obligatoria');
  }

  const categoria = String(formData.get("categoria") ?? "") as LandingCategory;
  if (!LANDING_CATEGORIES.includes(categoria)) {
    throw new Error("Selecciona una categoría válida");
  }

  const moneda = String(formData.get("moneda") ?? "").trim().toUpperCase() || "COP";

  const duracion_oferta_minutos = Math.round(
    parseNumber(formData.get("duracion_oferta_minutos"), "Duración de la oferta (minutos)")
  );
  if (duracion_oferta_minutos < 1) {
    throw new Error('La "duración de la oferta" debe ser mayor a 0');
  }

  return {
    slug,
    nombre_oferta,
    subtitulo: parseOptionalText(formData.get("subtitulo")),
    video_url: parseOptionalText(formData.get("video_url")),
    imagenes_carrusel: parseListField(formData.get("imagenes_carrusel")),
    precio_original: parseNumber(formData.get("precio_original"), "Precio original"),
    precio_oferta_estado1: parseNumber(
      formData.get("precio_oferta_estado1"),
      "Precio oferta (estado 1)"
    ),
    precio_oferta_estado2: parseNumber(
      formData.get("precio_oferta_estado2"),
      "Precio oferta (estado 2)"
    ),
    wompi_reference,
    wompi_public_key,
    wompi_integrity_key,
    moneda,
    categoria,
    tipo_badge: parseOptionalText(formData.get("tipo_badge")),
    beneficios: parseListField(formData.get("beneficios")),
    activo: formData.get("activo") === "on",
    texto_cta: parseOptionalText(formData.get("texto_cta")),
    duracion_oferta_minutos,
  };
}
