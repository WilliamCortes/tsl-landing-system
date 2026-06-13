"use client";

import { useEffect, useState } from "react";

export interface UseCountdownResult {
  totalSeconds: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function toRemaining(targetTimestamp: number): UseCountdownResult {
  const totalSeconds = Math.max(0, Math.floor((targetTimestamp - Date.now()) / 1000));
  return {
    totalSeconds,
    minutes: Math.floor(totalSeconds / 60),
    seconds: totalSeconds % 60,
    expired: totalSeconds <= 0,
  };
}

export function useCountdown(targetTimestamp: number, onExpire?: () => void): UseCountdownResult {
  const [remaining, setRemaining] = useState(() => toRemaining(targetTimestamp));

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining(toRemaining(targetTimestamp));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTimestamp]);

  useEffect(() => {
    if (remaining.expired) {
      onExpire?.();
    }
  }, [remaining.expired, onExpire]);

  return remaining;
}
