import type { PaymentStatusBannerProps } from "@/types/landing";

const COPY: Record<PaymentStatusBannerProps["status"], { title: string; className: string }> = {
  APPROVED: {
    title: "¡Pago aprobado! Pronto recibirás los detalles de tu compra.",
    className: "border-[var(--color-offer)] bg-green-50 text-[var(--color-ink)]",
  },
  PENDING: {
    title: "Tu pago está pendiente de confirmación. Te avisaremos cuando se apruebe.",
    className: "border-yellow-400 bg-yellow-50 text-[var(--color-ink)]",
  },
  DECLINED: {
    title: "Tu pago fue rechazado. Intenta de nuevo con otro medio de pago.",
    className: "border-[var(--color-urgency)] bg-red-50 text-[var(--color-ink)]",
  },
  VOIDED: {
    title: "Tu pago fue anulado. Intenta de nuevo si fue un error.",
    className: "border-[var(--color-urgency)] bg-red-50 text-[var(--color-ink)]",
  },
  ERROR: {
    title: "Ocurrió un error procesando tu pago. Intenta de nuevo.",
    className: "border-[var(--color-urgency)] bg-red-50 text-[var(--color-ink)]",
  },
};

export default function PaymentStatusBanner({ status }: PaymentStatusBannerProps) {
  const { title, className } = COPY[status];

  return (
    <div role="status" className={`rounded-xl border-2 px-4 py-3 text-center text-sm font-semibold ${className}`}>
      {title}
    </div>
  );
}
