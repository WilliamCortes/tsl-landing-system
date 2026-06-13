import { notFound } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import LandingShell from "@/components/landing/LandingShell";
import OfertaNoDisponible from "@/components/landing/OfertaNoDisponible";
import LandingExperience from "@/components/landing/LandingExperience";
import type { LandingPage, LandingPageClient } from "@/types/landing";

interface LandingPageRouteProps {
  params: Promise<{ slug: string }>;
}

export default async function LandingPageRoute({ params }: LandingPageRouteProps) {
  const { slug } = await params;

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle<LandingPage>();

  if (error) {
    throw new Error(`Error consultando landing_pages: ${error.message}`);
  }

  if (!data) {
    notFound();
  }

  if (!data.activo) {
    return (
      <LandingShell>
        <OfertaNoDisponible />
      </LandingShell>
    );
  }

  // Construido explícitamente: nunca incluye wompi_integrity_key.
  const landing: LandingPageClient = {
    id: data.id,
    slug: data.slug,
    nombre_oferta: data.nombre_oferta,
    subtitulo: data.subtitulo,
    video_url: data.video_url,
    imagenes_carrusel: data.imagenes_carrusel,
    precio_original: data.precio_original,
    precio_oferta_estado1: data.precio_oferta_estado1,
    precio_oferta_estado2: data.precio_oferta_estado2,
    wompi_reference: data.wompi_reference,
    wompi_public_key: data.wompi_public_key,
    moneda: data.moneda,
    categoria: data.categoria,
    tipo_badge: data.tipo_badge,
    beneficios: data.beneficios,
    activo: data.activo,
    texto_cta: data.texto_cta,
    duracion_oferta_minutos: data.duracion_oferta_minutos,
  };

  return (
    <LandingShell>
      <LandingExperience landing={landing} />
    </LandingShell>
  );
}
