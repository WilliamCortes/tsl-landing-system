"use client";

import { useEffect, useState } from "react";
import { useVisitState } from "@/lib/hooks/useVisitState";
import CountdownTimer from "@/components/landing/CountdownTimer";
import VideoPlayer from "@/components/landing/VideoPlayer";
import ImageCarousel from "@/components/landing/ImageCarousel";
import PriceBlock from "@/components/landing/PriceBlock";
import HandAnimations from "@/components/landing/HandAnimations";
import CtaButton from "@/components/landing/CtaButton";
import BenefitsList from "@/components/landing/BenefitsList";
import CategoryBadge from "@/components/landing/CategoryBadge";
import ExpiredState from "@/components/landing/ExpiredState";
import PaymentStatusBanner from "@/components/landing/PaymentStatusBanner";
import type { LandingExperienceProps } from "@/types/landing";
import { fetchWompiTransaction, type WompiEnv, type WompiTransactionStatus } from "@/lib/utils/wompi";

export default function LandingExperience({ landing }: LandingExperienceProps) {
  const { state, countdownTarget, startEstado2 } = useVisitState(landing.slug, landing.duracion_oferta_minutos);
  const [paymentStatus, setPaymentStatus] = useState<WompiTransactionStatus | null>(null);

  useEffect(() => {
    if (state === "estado2" && countdownTarget === null) {
      startEstado2();
    }
  }, [state, countdownTarget, startEstado2]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const transactionId = params.get("id");
    const env = params.get("env") as WompiEnv | null;

    if (!transactionId || !env) {
      return;
    }

    fetchWompiTransaction(transactionId, env).then((transaction) => {
      if (transaction) {
        setPaymentStatus(transaction.status);
      }
    });
  }, []);

  if (state === "expired") {
    return countdownTarget !== null ? (
      <ExpiredState variant="waiting-for-estado2" nextAvailableAt={countdownTarget} />
    ) : (
      <ExpiredState variant="final" />
    );
  }

  const isEstado2 = state === "estado2";
  const precioOriginal = isEstado2 ? landing.precio_oferta_estado1 : landing.precio_original;
  const precioOferta = isEstado2 ? landing.precio_oferta_estado2 : landing.precio_oferta_estado1;
  const label = landing.texto_cta ?? "Comprar ahora";

  return (
    <div className="mx-auto flex w-full max-w-[680px] flex-1 flex-col gap-4 px-6 py-12">
      {paymentStatus && <PaymentStatusBanner status={paymentStatus} />}

      {countdownTarget !== null && (
        <CountdownTimer targetTimestamp={countdownTarget} variant={isEstado2 ? "secondary" : "urgent"} />
      )}

      {!isEstado2 && landing.video_url && <VideoPlayer videoUrl={landing.video_url} />}

      {isEstado2 && landing.imagenes_carrusel.length > 0 && (
        <ImageCarousel images={landing.imagenes_carrusel} />
      )}

      {isEstado2 && (
        <p className="text-sm font-semibold text-[var(--color-urgency)]">
          Precio aumentado desde tu última visita
        </p>
      )}

      <CategoryBadge categoria={landing.categoria} tipoBadge={landing.tipo_badge} />
      <h1 className="text-2xl font-semibold text-[var(--color-ink)]">{landing.nombre_oferta}</h1>
      {landing.subtitulo && <p className="text-[var(--color-brand-text)]">{landing.subtitulo}</p>}

      <PriceBlock precioOriginal={precioOriginal} precioOferta={precioOferta} moneda={landing.moneda} />

      <BenefitsList beneficios={landing.beneficios} />

      <HandAnimations />

      <CtaButton
        label={label}
        slug={landing.slug}
        wompiPublicKey={landing.wompi_public_key}
        wompiReference={landing.wompi_reference}
        amountInCents={Math.round(precioOferta * 100)}
        currency={landing.moneda}
      />
    </div>
  );
}
