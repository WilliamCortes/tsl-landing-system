"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createServerClient } from "@/lib/supabase/server";
import {
  ADMIN_SESSION_COOKIE,
  getExpectedSessionToken,
  verifyAdminPassword,
} from "@/lib/auth/adminSession";
import { parseLandingForm } from "@/lib/utils/landingForm";

export interface AdminFormState {
  error?: string;
  /** Valores enviados, para repoblar el formulario si la acción falla. */
  fieldValues?: Record<string, string>;
}

function formDataToFieldValues(formData: FormData): Record<string, string> {
  return Object.fromEntries(
    Array.from(formData.entries(), ([key, value]) => [key, String(value)])
  );
}

export async function loginAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  const password = String(formData.get("password") ?? "");

  if (!verifyAdminPassword(password)) {
    return { error: "Contraseña incorrecta" };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, getExpectedSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
  redirect("/admin/login");
}

export async function toggleActivoAction(id: string, activo: boolean): Promise<void> {
  const supabase = createServerClient();
  const { error } = await supabase.from("landing_pages").update({ activo }).eq("id", id);

  if (error) {
    throw new Error(`No se pudo actualizar la landing: ${error.message}`);
  }

  revalidatePath("/admin");
}

export async function createLandingAction(
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  const fieldValues = formDataToFieldValues(formData);

  let values;
  try {
    values = parseLandingForm(formData);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Datos inválidos", fieldValues };
  }

  const supabase = createServerClient();
  const { error } = await supabase.from("landing_pages").insert(values);

  if (error) {
    if (error.code === "23505") {
      return { error: `Ya existe una landing con el slug "${values.slug}"`, fieldValues };
    }
    return { error: `No se pudo crear la landing: ${error.message}`, fieldValues };
  }

  revalidatePath("/admin");
  redirect("/admin");
}

export async function updateLandingAction(
  id: string,
  _prevState: AdminFormState,
  formData: FormData
): Promise<AdminFormState> {
  const fieldValues = formDataToFieldValues(formData);

  let values;
  try {
    values = parseLandingForm(formData);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Datos inválidos", fieldValues };
  }

  const supabase = createServerClient();
  const { error } = await supabase.from("landing_pages").update(values).eq("id", id);

  if (error) {
    if (error.code === "23505") {
      return { error: `Ya existe una landing con el slug "${values.slug}"`, fieldValues };
    }
    return { error: `No se pudo guardar la landing: ${error.message}`, fieldValues };
  }

  revalidatePath("/admin");
  revalidatePath(`/landing/${values.slug}`);
  redirect("/admin");
}
