"use client";

import { useCountdown } from "@/lib/hooks/useCountdown";
import type { CountdownTimerProps } from "@/types/landing";

function pad(value: number): string {
  return value.toString().padStart(2, "0");
}

export default function CountdownTimer({ targetTimestamp, variant = "urgent", onExpire }: CountdownTimerProps) {
  const { minutes, seconds, expired } = useCountdown(targetTimestamp, onExpire);

  const isUrgent = variant === "urgent";

  return (
    <div
      className={`flex items-center justify-center gap-2 rounded-full border px-4 py-2 font-mono text-lg font-bold ${
        isUrgent
          ? "border-[var(--color-urgency)] bg-[var(--color-urgency)]/10 text-[var(--color-urgency)]"
          : "border-[var(--color-brand-blue)] bg-[var(--color-brand-blue)]/10 text-[var(--color-brand-blue)]"
      }`}
    >
      {expired ? (
        <span>¡Tiempo agotado!</span>
      ) : (
        <span>
          {pad(minutes)}:{pad(seconds)}
        </span>
      )}
    </div>
  );
}
