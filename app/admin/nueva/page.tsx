import AdminHeader from "@/components/admin/AdminHeader";
import LandingForm from "@/components/admin/LandingForm";
import { createLandingAction } from "@/app/admin/actions";

export default function NewLandingPage() {
  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)]">
      <AdminHeader />

      <main className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="text-xl font-semibold text-[var(--color-brand-text)]">Nueva landing</h1>
        <div className="mt-4">
          <LandingForm action={createLandingAction} submitLabel="Crear landing" />
        </div>
      </main>
    </div>
  );
}
