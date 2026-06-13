"use client";

import { useState } from "react";
import CountdownTimer from "@/components/landing/CountdownTimer";

export default function CountdownTimerDemo() {
  const [target] = useState(() => Date.now() + 10 * 60 * 1000);

  return (
    <div className="flex flex-wrap gap-4">
      <CountdownTimer targetTimestamp={target} variant="urgent" />
      <CountdownTimer targetTimestamp={target} variant="secondary" />
    </div>
  );
}
