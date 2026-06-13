import type { PriceBlockProps } from "@/types/landing";

function formatPrice(value: number, moneda: string): string {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: moneda,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function PriceBlock({ precioOriginal, precioOferta, moneda }: PriceBlockProps) {
  const discountPercent = Math.round((1 - precioOferta / precioOriginal) * 100);

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-base text-[var(--color-strike)] line-through">
          {formatPrice(precioOriginal, moneda)}
        </span>
        {discountPercent > 0 && (
          <span className="rounded-full bg-[var(--color-offer)] px-2 py-0.5 text-xs font-bold text-white">
            -{discountPercent}% OFF
          </span>
        )}
      </div>
      <span className="text-3xl font-extrabold text-[var(--color-offer)]">
        {formatPrice(precioOferta, moneda)}
      </span>
    </div>
  );
}
