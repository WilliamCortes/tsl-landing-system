import type { LandingCategory } from "@/types/landing";

interface CategoryBadge {
  emoji: string;
  label: string;
}

export const CATEGORY_BADGES: Record<LandingCategory, CategoryBadge> = {
  hotel: { emoji: "🏨", label: "Hospedaje" },
  finca: { emoji: "🌳", label: "Finca" },
  glamping: { emoji: "⛺", label: "Glamping" },
  actividad: { emoji: "🎉", label: "Actividad" },
  bono_supermercado: { emoji: "🛒", label: "Bono comercial" },
  cafeteria: { emoji: "☕", label: "Gastronomía" },
  otro: { emoji: "✨", label: "Oferta especial" },
};

/**
 * Resuelve el badge a mostrar: `tipoBadge` (si está presente) sobreescribe
 * solo el texto, conservando el emoji por defecto de `categoria`.
 */
export function resolveCategoryBadge(
  categoria: LandingCategory,
  tipoBadge: string | null
): CategoryBadge {
  const base = CATEGORY_BADGES[categoria];
  if (tipoBadge) {
    return { emoji: base.emoji, label: tipoBadge };
  }
  return base;
}
