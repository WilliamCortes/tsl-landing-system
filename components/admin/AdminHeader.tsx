import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

export default function AdminHeader() {
  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/admin" className="text-lg font-semibold text-[var(--color-brand-text)]">
          TSL <span className="text-[var(--color-brand-blue)]">Admin</span>
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/admin"
            className="text-sm font-medium text-[var(--color-brand-text)] hover:text-[var(--color-brand-blue)]"
          >
            Landings
          </Link>
          <Link
            href="/admin/nueva"
            className="rounded-md bg-[var(--color-brand-blue)] px-3 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            + Nueva landing
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-sm font-medium text-[var(--color-strike)] hover:text-[var(--color-urgency)]"
            >
              Salir
            </button>
          </form>
        </nav>
      </div>
    </header>
  );
}
