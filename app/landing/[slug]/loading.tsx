import LandingShell from "@/components/landing/LandingShell";

export default function Loading() {
  return (
    <LandingShell>
      <div className="mx-auto flex w-full max-w-xl flex-1 flex-col gap-4 px-6 py-12">
        <div className="h-6 w-2/3 animate-pulse rounded bg-[var(--color-surface-alt)]" />
        <div className="h-48 w-full animate-pulse rounded bg-[var(--color-surface-alt)]" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-[var(--color-surface-alt)]" />
        <div className="h-10 w-40 animate-pulse rounded-full bg-[var(--color-surface-alt)]" />
      </div>
    </LandingShell>
  );
}
