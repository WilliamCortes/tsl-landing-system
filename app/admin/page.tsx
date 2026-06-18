import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { CATEGORY_BADGES } from "@/lib/utils/categoryBadges";
import AdminHeader from "@/components/admin/AdminHeader";
import { toggleActivoAction } from "@/app/admin/actions";
import type { LandingCategory } from "@/types/landing";

export const dynamic = "force-dynamic";

interface LandingRow {
  id: string;
  slug: string;
  nombre_oferta: string;
  categoria: LandingCategory;
  precio_oferta_estado1: number;
  moneda: string;
  activo: boolean;
}

function formatPrice(value: number, moneda: string): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function AdminLandingsPage() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("landing_pages")
    .select("id, slug, nombre_oferta, categoria, precio_oferta_estado1, moneda, activo")
    .order("created_at", { ascending: false })
    .returns<LandingRow[]>();

  if (error) {
    throw new Error(`Error consultando landing_pages: ${error.message}`);
  }

  const landings = data ?? [];

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)]">
      <AdminHeader />

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-[var(--color-brand-text)]">Landings</h1>
          <span className="text-sm text-[var(--color-strike)]">
            {landings.length} {landings.length === 1 ? "landing" : "landings"}
          </span>
        </div>

        <div className="mt-4 overflow-x-auto rounded-lg border border-black/10 bg-white">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-black/10 text-xs uppercase tracking-wide text-[var(--color-strike)]">
                <th className="px-4 py-3 font-medium">Oferta</th>
                <th className="px-4 py-3 font-medium">Categoría</th>
                <th className="px-4 py-3 font-medium">Precio (estado 1)</th>
                <th className="px-4 py-3 font-medium">Estado</th>
                <th className="px-4 py-3 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {landings.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-[var(--color-strike)]">
                    No hay landings creadas todavía.
                  </td>
                </tr>
              )}

              {landings.map((landing) => (
                <tr key={landing.id} className="border-b border-black/5 last:border-0">
                  <td className="px-4 py-3">
                    <p className="font-medium text-[var(--color-brand-text)]">
                      {landing.nombre_oferta}
                    </p>
                    <p className="text-xs text-[var(--color-strike)]">/landing/{landing.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    {CATEGORY_BADGES[landing.categoria]?.emoji}{" "}
                    {CATEGORY_BADGES[landing.categoria]?.label ?? landing.categoria}
                  </td>
                  <td className="px-4 py-3">
                    {formatPrice(landing.precio_oferta_estado1, landing.moneda)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        landing.activo
                          ? "bg-[var(--color-offer)]/15 text-[var(--color-offer)]"
                          : "bg-[var(--color-strike)]/15 text-[var(--color-strike)]"
                      }`}
                    >
                      {landing.activo ? "Activa" : "Desactivada"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/${landing.id}`}
                        className="text-sm font-medium text-[var(--color-brand-blue)] hover:underline"
                      >
                        Editar
                      </Link>
                      <form
                        action={toggleActivoAction.bind(null, landing.id, !landing.activo)}
                      >
                        <button
                          type="submit"
                          className="text-sm font-medium text-[var(--color-brand-text)] hover:text-[var(--color-urgency)]"
                        >
                          {landing.activo ? "Desactivar" : "Activar"}
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
