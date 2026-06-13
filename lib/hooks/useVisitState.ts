"use client";

import { useCallback, useEffect, useState } from "react";
import type { LandingVisitState, UseVisitStateResult, VisitRecord } from "@/types/landing";

const HOUR_MS = 60 * 60 * 1000;

function storageKey(slug: string): string {
  return `tsl_landing_${slug}`;
}

function readRecord(slug: string): VisitRecord | null {
  try {
    const raw = window.localStorage.getItem(storageKey(slug));
    return raw ? (JSON.parse(raw) as VisitRecord) : null;
  } catch {
    return null;
  }
}

function writeRecord(slug: string, record: VisitRecord): void {
  try {
    window.localStorage.setItem(storageKey(slug), JSON.stringify(record));
  } catch {
    // localStorage no disponible (incógnito estricto): se sigue sin persistencia
  }
}

function createRecord(durationMinutes: number, now: number): VisitRecord {
  return {
    firstVisitAt: now,
    state1ExpiresAt: now + durationMinutes * 60_000,
    state2AvailableAt: now + 24 * HOUR_MS,
    state2ExpiresAt: null,
  };
}

function deriveState(
  record: VisitRecord,
  now: number,
): { state: LandingVisitState; countdownTarget: number | null } {
  if (now < record.state1ExpiresAt) {
    return { state: "estado1", countdownTarget: record.state1ExpiresAt };
  }
  if (now < record.state2AvailableAt) {
    // 'expired' (waiting-for-estado2): countdownTarget = cuándo estará disponible estado2
    return { state: "expired", countdownTarget: record.state2AvailableAt };
  }
  if (record.state2ExpiresAt !== null && now < record.state2ExpiresAt) {
    return { state: "estado2", countdownTarget: record.state2ExpiresAt };
  }
  if (record.state2ExpiresAt === null) {
    // estado2 disponible pero aún no iniciado: el llamador debe invocar startEstado2()
    return { state: "estado2", countdownTarget: null };
  }
  // 'expired' (final): no hay más transiciones
  return { state: "expired", countdownTarget: null };
}

export function useVisitState(slug: string, durationMinutes: number): UseVisitStateResult {
  const [record, setRecord] = useState<VisitRecord | null>(null);
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const initialNow = Date.now();
    const existing = readRecord(slug);
    const initial = existing ?? createRecord(durationMinutes, initialNow);
    if (!existing) {
      writeRecord(slug, initial);
    }

    // Sincroniza el estado inicial con localStorage (sistema externo) al montar.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRecord(initial);
    setNow(initialNow);

    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [slug, durationMinutes]);

  const startEstado2 = useCallback(() => {
    setRecord((current) => {
      if (!current || current.state2ExpiresAt !== null) {
        return current;
      }
      const updated: VisitRecord = { ...current, state2ExpiresAt: Date.now() + durationMinutes * 60_000 };
      writeRecord(slug, updated);
      return updated;
    });
  }, [slug, durationMinutes]);

  if (!record || now === null) {
    return { state: "estado1", countdownTarget: null, startEstado2 };
  }

  return { ...deriveState(record, now), startEstado2 };
}
