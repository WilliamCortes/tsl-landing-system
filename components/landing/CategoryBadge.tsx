import { resolveCategoryBadge } from "@/lib/utils/categoryBadges";
import type { CategoryBadgeProps } from "@/types/landing";

export default function CategoryBadge({ categoria, tipoBadge }: CategoryBadgeProps) {
  const { emoji, label } = resolveCategoryBadge(categoria, tipoBadge);

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-surface-alt)] px-3 py-1 text-sm font-medium text-[var(--color-ink)]">
      <span aria-hidden="true">{emoji}</span>
      {label}
    </span>
  );
}
