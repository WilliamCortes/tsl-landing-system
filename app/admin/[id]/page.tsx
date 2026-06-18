import { notFound } from "next/navigation";
import AdminHeader from "@/components/admin/AdminHeader";
import LandingForm from "@/components/admin/LandingForm";
import { updateLandingAction } from "@/app/admin/actions";
import { createServerClient } from "@/lib/supabase/server";
import type { LandingPage } from "@/types/landing";

interface EditLandingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditLandingPage({ params }: EditLandingPageProps) {
  const { id } = await params;

  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("landing_pages")
    .select("*")
    .eq("id", id)
    .maybeSingle<LandingPage>();

  if (error) {
    throw new Error(`Error consultando landing_pages: ${error.message}`);
  }

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface-alt)]">
      <AdminHeader />

      <main className="mx-auto max-w-3xl px-6 py-8">
        <h1 className="text-xl font-semibold text-[var(--color-brand-text)]">
          Editar landing
          <span className="ml-2 text-sm font-normal text-[var(--color-strike)]">
            /landing/{data.slug}
          </span>
        </h1>
        <div className="mt-4">
          <LandingForm
            action={updateLandingAction.bind(null, id)}
            initialValues={data}
            submitLabel="Guardar cambios"
          />
        </div>
      </main>
    </div>
  );
}
