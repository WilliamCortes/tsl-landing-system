import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from "@/lib/auth/adminSession";

const PUBLIC_ADMIN_PATHS = new Set(["/admin/login"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ADMIN_PATHS.has(pathname)) {
    return NextResponse.next();
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (!isValidSessionToken(token)) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
