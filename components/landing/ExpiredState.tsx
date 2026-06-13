"use client";

import { useCountdown } from "@/lib/hooks/useCountdown";
import OfertaNoDisponible from "@/components/landing/OfertaNoDisponible";
import type { ExpiredStateProps } from "@/types/landing";

export default function ExpiredState({ variant, nextAvailableAt }: ExpiredStateProps) {
  const { totalSeconds } = useCountdown(nextAvailableAt ?? 0);

  if (variant === "final") {
    return (
      <OfertaNoDisponible
        title="Esta oferta ha expirado"
        message="Esta oferta ya no está disponible, pero tenemos muchas más experiencias esperándote."
      />
    );
  }

  const hoursRemaining = Math.max(1, Math.ceil(totalSeconds / 3600));

  return (
    <div className="mx-auto flex max-w-[680px] flex-1 flex-col items-center justify-center gap-4 px-6 py-20 text-center">
      <h1 className="text-2xl font-semibold text-[var(--color-ink)]">Esta oferta expiró</h1>
      <p className="text-[var(--color-brand-text)]">
        Vuelve en {hoursRemaining} {hoursRemaining === 1 ? "hora" : "horas"} para ver un nuevo precio.
      </p>
      <a
        href="https://www.turismosinlimites.com.co/"
        className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-urgency)] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        Busca más ofertas en Turismo Sin Límites
      </a>
    </div>
  );
}
