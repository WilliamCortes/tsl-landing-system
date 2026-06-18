"use client";

import { useActionState } from "react";
import { loginAction, type AdminFormState } from "@/app/admin/actions";

const initialState: AdminFormState = {};

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-surface-alt)] px-6">
      <form
        action={action}
        className="w-full max-w-sm rounded-xl border border-black/10 bg-white p-8 shadow-sm"
      >
        <h1 className="text-xl font-semibold text-[var(--color-brand-text)]">
          TSL <span className="text-[var(--color-brand-blue)]">Admin</span>
        </h1>
        <p className="mt-1 text-sm text-[var(--color-strike)]">
          Ingresa la contraseña para acceder al panel.
        </p>

        <div className="mt-6 flex flex-col gap-2">
          <label htmlFor="password" className="text-sm font-medium text-[var(--color-brand-text)]">
            Contraseña
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="rounded-md border border-black/15 px-3 py-2 text-sm outline-none focus:border-[var(--color-brand-blue)]"
          />
        </div>

        {state.error && (
          <p className="mt-3 text-sm font-medium text-[var(--color-urgency)]">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-6 w-full rounded-md bg-[var(--color-brand-blue)] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Verificando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
