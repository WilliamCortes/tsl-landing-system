import LandingShell from "@/components/landing/LandingShell";
import OfertaNoDisponible from "@/components/landing/OfertaNoDisponible";

export default function NotFound() {
  return (
    <LandingShell>
      <OfertaNoDisponible
        title="Esta oferta no existe"
        message="El enlace que seguiste no corresponde a ninguna oferta activa. Pero no te preocupes, tenemos muchas más experiencias esperándote."
      />
    </LandingShell>
  );
}
