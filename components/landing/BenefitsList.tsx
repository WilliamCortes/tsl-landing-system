import type { BenefitsListProps } from "@/types/landing";

export default function BenefitsList({ beneficios }: BenefitsListProps) {
  if (beneficios.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-col gap-2">
      {beneficios.map((beneficio) => (
        <li key={beneficio} className="flex items-start gap-2 text-sm text-[var(--color-brand-text)]">
          <span className="mt-0.5 text-[var(--color-offer)]">✔</span>
          <span>{beneficio}</span>
        </li>
      ))}
    </ul>
  );
}
