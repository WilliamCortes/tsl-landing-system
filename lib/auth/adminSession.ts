import { createHmac, timingSafeEqual } from "crypto";

/**
 * Sesión mínima para /admin: contraseña compartida + cookie con un token
 * HMAC fijo (no hay usuarios, roles ni expiración por sesión individual).
 */
export const ADMIN_SESSION_COOKIE = "tsl_admin_session";

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("Falta ADMIN_SESSION_SECRET en las variables de entorno");
  }
  return secret;
}

export function getExpectedSessionToken(): string {
  return createHmac("sha256", getSessionSecret()).update("tsl-admin-session").digest("hex");
}

export function isValidSessionToken(token: string | undefined): boolean {
  if (!token) return false;

  const expected = Buffer.from(getExpectedSessionToken());
  const actual = Buffer.from(token);

  if (expected.length !== actual.length) return false;
  return timingSafeEqual(expected, actual);
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("Falta ADMIN_PASSWORD en las variables de entorno");
  }

  const expectedBuf = Buffer.from(expected);
  const actualBuf = Buffer.from(password);

  if (expectedBuf.length !== actualBuf.length) return false;
  return timingSafeEqual(expectedBuf, actualBuf);
}
