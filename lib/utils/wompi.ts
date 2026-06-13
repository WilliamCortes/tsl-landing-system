const WIDGET_SCRIPT_URL = "https://checkout.wompi.co/widget.js";

export type WompiEnv = "test" | "prod";

export type WompiTransactionStatus =
  | "APPROVED"
  | "PENDING"
  | "DECLINED"
  | "VOIDED"
  | "ERROR";

export interface WompiTransaction {
  id: string;
  status: WompiTransactionStatus;
  reference: string;
}

export interface OpenWompiWidgetOptions {
  publicKey: string;
  currency: string;
  amountInCents: number;
  reference: string;
  signature: string;
  redirectUrl: string;
  onResult: (transaction: WompiTransaction | null) => void;
}

declare global {
  interface Window {
    WidgetCheckout?: new (config: {
      currency: string;
      amountInCents: number;
      reference: string;
      publicKey: string;
      signature: { integrity: string };
      redirectUrl: string;
    }) => {
      open: (callback: (result: { transaction?: WompiTransaction }) => void) => void;
    };
  }
}

/** Deriva el entorno de Wompi (sandbox vs producción) a partir de la llave pública. */
export function getWompiEnv(publicKey: string): WompiEnv {
  return publicKey.startsWith("pub_test_") ? "test" : "prod";
}

export function getWompiApiBaseUrl(env: WompiEnv): string {
  return env === "test" ? "https://sandbox.wompi.co/v1" : "https://production.wompi.co/v1";
}

let scriptLoadPromise: Promise<void> | null = null;

/** Inyecta el script del widget de Wompi una sola vez (idempotente). */
export function ensureWompiScriptLoaded(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("ensureWompiScriptLoaded solo puede usarse en el navegador"));
  }

  if (window.WidgetCheckout) {
    return Promise.resolve();
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGET_SCRIPT_URL}"]`);

    if (existing) {
      if (window.WidgetCheckout) {
        resolve();
        return;
      }
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("No se pudo cargar el widget de Wompi")));
      return;
    }

    const script = document.createElement("script");
    script.src = WIDGET_SCRIPT_URL;
    script.async = true;
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("No se pudo cargar el widget de Wompi")));
    document.body.appendChild(script);
  });

  return scriptLoadPromise;
}

/** Abre el widget de checkout de Wompi. Requiere que ensureWompiScriptLoaded() ya haya resuelto. */
export function openWompiWidget(options: OpenWompiWidgetOptions): void {
  if (typeof window === "undefined" || !window.WidgetCheckout) {
    throw new Error("El widget de Wompi no está disponible");
  }

  const checkout = new window.WidgetCheckout({
    currency: options.currency,
    amountInCents: options.amountInCents,
    reference: options.reference,
    publicKey: options.publicKey,
    signature: { integrity: options.signature },
    redirectUrl: options.redirectUrl,
  });

  checkout.open((result) => {
    options.onResult(result.transaction ?? null);
  });
}

/** Consulta el estado de una transacción en la API de Wompi (sandbox o producción). */
export async function fetchWompiTransaction(id: string, env: WompiEnv): Promise<WompiTransaction | null> {
  const response = await fetch(`${getWompiApiBaseUrl(env)}/transactions/${id}`);

  if (!response.ok) {
    return null;
  }

  const body = (await response.json()) as { data?: WompiTransaction };
  return body.data ?? null;
}
