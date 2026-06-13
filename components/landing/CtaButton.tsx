"use client";

import { useState } from "react";
import type { CtaButtonProps, SignRequestBody, SignResponseBody } from "@/types/landing";
import { ensureWompiScriptLoaded, getWompiEnv, openWompiWidget } from "@/lib/utils/wompi";

export default function CtaButton({
  label,
  slug,
  wompiPublicKey,
  wompiReference,
  amountInCents,
  currency,
}: CtaButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setIsLoading(true);
    setError(null);

    try {
      const reference = `${wompiReference}-${Date.now()}`;

      const body: SignRequestBody = { slug, reference, amountInCents, currency };

      const response = await fetch("/api/landing/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error("No se pudo iniciar el pago");
      }

      const { signature } = (await response.json()) as SignResponseBody;

      await ensureWompiScriptLoaded();

      const env = getWompiEnv(wompiPublicKey);
      const redirectUrl = `${window.location.origin}${window.location.pathname}?env=${env}`;

      openWompiWidget({
        publicKey: wompiPublicKey,
        currency,
        amountInCents,
        reference,
        signature,
        redirectUrl,
        onResult: () => {
          setIsLoading(false);
        },
      });
    } catch {
      setError("No se pudo iniciar el pago. Intenta de nuevo.");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="w-full rounded-full bg-[var(--color-urgency)] px-6 py-4 text-lg font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
      >
        {isLoading ? "Cargando..." : label}
      </button>
      {error && <p className="text-center text-sm font-semibold text-[var(--color-urgency)]">{error}</p>}
    </div>
  );
}
