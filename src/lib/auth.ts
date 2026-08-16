import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "phonesmart_admin";

/**
 * Senha do painel administrativo.
 * Em produção, defina a variável de ambiente ADMIN_PASSWORD na Vercel.
 */
function adminPassword() {
  return process.env.ADMIN_PASSWORD ?? "phonesmart2024";
}

/** Gera o valor que fica guardado no cookie (nunca a senha em texto puro). */
export function sessionToken() {
  return createHash("sha256")
    .update(`phonesmart::${adminPassword()}`)
    .digest("hex");
}

/** Compara a senha digitada com a configurada, sem vazar tempo de execução. */
export function checkPassword(input: string) {
  const a = Buffer.from(createHash("sha256").update(input).digest("hex"));
  const b = Buffer.from(createHash("sha256").update(adminPassword()).digest("hex"));
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

/** Diz se o visitante atual já fez login no painel. */
export async function isAdminAuthenticated() {
  const jar = await cookies();
  return jar.get(ADMIN_COOKIE)?.value === sessionToken();
}
