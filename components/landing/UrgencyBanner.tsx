"use client";

import { useEffect, useState } from "react";

interface UrgencyBannerProps {
  nombreOferta: string;
}

export default function UrgencyBanner({ nombreOferta }: UrgencyBannerProps) {
  const [visible, setVisible] = useState(false);

  // Animación de entrada diferida para que el usuario la vea aparecer
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className={`overflow-hidden transition-all duration-500 ease-out ${
        visible ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="flex items-start gap-3 rounded-lg border border-[var(--color-urgency)]/30 bg-[var(--color-urgency)]/10 px-4 py-3">
        <span className="mt-0.5 text-xl leading-none" aria-hidden>⚠️</span>
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-bold text-[var(--color-urgency)]">¡ATENCIÓN!</p>
          <p className="text-sm text-[var(--color-brand-text)]">
            La tarifa especial de{" "}
            <strong className="font-semibold">{nombreOferta}</strong> está
            disponible por tiempo limitado. Cuando el contador llegue a cero, el
            precio aumenta.
          </p>
        </div>
      </div>
    </div>
  );
}
