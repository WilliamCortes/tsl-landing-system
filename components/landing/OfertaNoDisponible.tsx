interface OfertaNoDisponibleProps {
  title?: string;
  message?: string;
}

export default function OfertaNoDisponible({
  title = "Esta oferta ya no está disponible",
  message = "Puede que haya expirado o que el enlace ya no exista. Pero no te preocupes, tenemos muchas más experiencias esperándote.",
}: OfertaNoDisponibleProps) {
  return (
    <div className="mx-auto flex max-w-[680px] flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
      <h1 className="text-2xl font-semibold text-[var(--color-ink)]">{title}</h1>
      <p className="text-[var(--color-brand-text)]">{message}</p>
      <a
        href="https://www.turismosinlimites.com.co/"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-urgency)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Busca más ofertas en Turismo Sin Límites
      </a>
    </div>
  );
}
