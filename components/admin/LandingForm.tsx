"use client";

import { useActionState } from "react";
import Link from "next/link";
import type { AdminFormState } from "@/app/admin/actions";
import { LANDING_CATEGORIES } from "@/lib/utils/landingForm";
import { CATEGORY_BADGES } from "@/lib/utils/categoryBadges";
import type { LandingPage } from "@/types/landing";

const initialState: AdminFormState = {};

export interface LandingFormProps {
  action: (state: AdminFormState, formData: FormData) => Promise<AdminFormState>;
  initialValues?: LandingPage;
  submitLabel: string;
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-[var(--color-brand-text)]">{label}</span>
      {children}
      {hint && <span className="text-xs text-[var(--color-strike)]">{hint}</span>}
    </label>
  );
}

const inputClass =
  "rounded-md border border-black/15 px-3 py-2 text-sm outline-none focus:border-[var(--color-brand-blue)]";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-4 rounded-lg border border-black/10 bg-white p-5">
      <legend className="px-1 text-sm font-semibold text-[var(--color-brand-text)]">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

export default function LandingForm({ action, initialValues, submitLabel }: LandingFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);
  const v = initialValues;

  // Si la acción falló, repuebla el formulario con lo que el usuario envió
  // en lugar de los valores iniciales (para no perder lo ya escrito).
  function dv(name: string, fallback: string | number | undefined): string | number | undefined {
    return state.fieldValues?.[name] ?? fallback;
  }

  return (
    <form action={formAction} className="flex flex-col gap-6">
      <Section title="Información general">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Slug" hint="Solo minúsculas, números y guiones. Define la URL /landing/<slug>.">
            <input
              name="slug"
              defaultValue={dv("slug", v?.slug)}
              required
              pattern="[a-z0-9]+(-[a-z0-9]+)*"
              placeholder="finca-el-eden"
              className={inputClass}
            />
          </Field>
          <Field label="Categoría">
            <select
              name="categoria"
              defaultValue={dv("categoria", v?.categoria ?? "otro")}
              required
              className={inputClass}
            >
              {LANDING_CATEGORIES.map((categoria) => (
                <option key={categoria} value={categoria}>
                  {CATEGORY_BADGES[categoria].emoji} {CATEGORY_BADGES[categoria].label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Nombre de la oferta">
          <input
            name="nombre_oferta"
            defaultValue={dv("nombre_oferta", v?.nombre_oferta)}
            required
            placeholder="Finca El Edén - Escapada Todo Incluido"
            className={inputClass}
          />
        </Field>

        <Field label="Subtítulo" hint="Opcional. Texto corto debajo del título.">
          <textarea
            name="subtitulo"
            defaultValue={dv("subtitulo", v?.subtitulo ?? "")}
            rows={2}
            className={inputClass}
          />
        </Field>

        <Field label="Badge personalizado" hint="Opcional. Sobreescribe el texto del badge de la categoría.">
          <input
            name="tipo_badge"
            defaultValue={dv("tipo_badge", v?.tipo_badge ?? "")}
            placeholder="Combo especial"
            className={inputClass}
          />
        </Field>

        <Field label="Beneficios" hint="Uno por línea.">
          <textarea
            name="beneficios"
            defaultValue={dv("beneficios", v?.beneficios?.join("\n") ?? "")}
            rows={4}
            placeholder={"Piscina privada\nDesayuno incluido"}
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Precios">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Precio original">
            <input
              type="number"
              name="precio_original"
              defaultValue={dv("precio_original", v?.precio_original)}
              required
              min={0}
              step="0.01"
              className={inputClass}
            />
          </Field>
          <Field label="Precio oferta (estado 1)" hint="Primer countdown.">
            <input
              type="number"
              name="precio_oferta_estado1"
              defaultValue={dv("precio_oferta_estado1", v?.precio_oferta_estado1)}
              required
              min={0}
              step="0.01"
              className={inputClass}
            />
          </Field>
          <Field label="Precio oferta (estado 2)" hint="Tras vencer el estado 1.">
            <input
              type="number"
              name="precio_oferta_estado2"
              defaultValue={dv("precio_oferta_estado2", v?.precio_oferta_estado2)}
              required
              min={0}
              step="0.01"
              className={inputClass}
            />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Moneda">
            <input
              name="moneda"
              defaultValue={dv("moneda", v?.moneda ?? "COP")}
              required
              maxLength={3}
              className={inputClass}
            />
          </Field>
          <Field label="Duración de la oferta (minutos)" hint="Duración del countdown del estado 1.">
            <input
              type="number"
              name="duracion_oferta_minutos"
              defaultValue={dv("duracion_oferta_minutos", v?.duracion_oferta_minutos ?? 15)}
              required
              min={1}
              step="1"
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Multimedia">
        <Field label="URL del video" hint="Opcional. Embed de YouTube/Vimeo.">
          <input
            name="video_url"
            defaultValue={dv("video_url", v?.video_url ?? "")}
            placeholder="https://www.youtube.com/embed/..."
            className={inputClass}
          />
        </Field>
        <Field label="Imágenes del carrusel" hint="Una URL por línea.">
          <textarea
            name="imagenes_carrusel"
            defaultValue={dv("imagenes_carrusel", v?.imagenes_carrusel?.join("\n") ?? "")}
            rows={4}
            placeholder={"https://example.com/1.jpg\nhttps://example.com/2.jpg"}
            className={inputClass}
          />
        </Field>
      </Section>

      <Section title="Pago (Wompi)">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Referencia Wompi">
            <input
              name="wompi_reference"
              defaultValue={dv("wompi_reference", v?.wompi_reference)}
              required
              placeholder="FINCA-EDEN-001"
              className={inputClass}
            />
          </Field>
          <Field label="Texto del botón (CTA)" hint='Opcional. Por defecto "Comprar ahora".'>
            <input
              name="texto_cta"
              defaultValue={dv("texto_cta", v?.texto_cta ?? "")}
              placeholder="Quiero mi oferta"
              className={inputClass}
            />
          </Field>
          <Field label="Llave pública Wompi">
            <input
              name="wompi_public_key"
              defaultValue={dv("wompi_public_key", v?.wompi_public_key)}
              required
              className={inputClass}
            />
          </Field>
          <Field label="Llave de integridad Wompi" hint="Secreta. Solo se usa en el servidor.">
            <input
              name="wompi_integrity_key"
              defaultValue={dv("wompi_integrity_key", v?.wompi_integrity_key)}
              required
              type="password"
              className={inputClass}
            />
          </Field>
        </div>
      </Section>

      <Section title="Visibilidad">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="activo"
            defaultChecked={
              state.fieldValues ? state.fieldValues.activo === "on" : v?.activo ?? true
            }
            className="h-4 w-4 rounded border-black/20"
          />
          <span className="text-sm font-medium text-[var(--color-brand-text)]">
            Landing activa (visible públicamente)
          </span>
        </label>
      </Section>

      {state.error && (
        <p className="rounded-md bg-[var(--color-urgency)]/10 px-4 py-3 text-sm font-medium text-[var(--color-urgency)]">
          {state.error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="rounded-md bg-[var(--color-brand-blue)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {pending ? "Guardando..." : submitLabel}
        </button>
        <Link
          href="/admin"
          className="text-sm font-medium text-[var(--color-strike)] hover:text-[var(--color-brand-text)]"
        >
          Cancelar
        </Link>
      </div>
    </form>
  );
}
