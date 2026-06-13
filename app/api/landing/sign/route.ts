import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import type { SignRequestBody, SignResponseBody } from "@/types/landing";

export async function POST(request: Request) {
  let body: Partial<SignRequestBody>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { slug, reference, amountInCents, currency } = body;

  if (
    typeof slug !== "string" ||
    !slug ||
    typeof reference !== "string" ||
    !reference ||
    typeof amountInCents !== "number" ||
    !Number.isFinite(amountInCents) ||
    typeof currency !== "string" ||
    !currency
  ) {
    return NextResponse.json({ error: "Parámetros inválidos" }, { status: 400 });
  }

  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("landing_pages")
    .select("wompi_integrity_key")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: "Error al consultar la landing" }, { status: 500 });
  }

  if (!data) {
    return NextResponse.json({ error: "Landing no encontrada" }, { status: 404 });
  }

  const signature = createHash("sha256")
    .update(`${reference}${amountInCents}${currency}${data.wompi_integrity_key}`)
    .digest("hex");

  const responseBody: SignResponseBody = { signature };
  return NextResponse.json(responseBody);
}
