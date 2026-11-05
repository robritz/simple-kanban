/**
 * Stateless session tokens: `<expiresAtMs>.<hmac>`, signed with a key derived
 * from the password. Changing the password signs everyone out.
 */
export const SESSION_TTL_MS = 30 * 24 * 60 * 60 * 1000;

const encoder = new TextEncoder();

async function sign(password: string, payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(`simple-kanban-session:${password}`),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return Buffer.from(mac).toString("base64url");
}

/** Compare without leaking where the strings differ. */
export function safeEqual(a: string, b: string): boolean {
  const ab = encoder.encode(a);
  const bb = encoder.encode(b);
  let diff = ab.length ^ bb.length;
  for (let i = 0; i < Math.max(ab.length, bb.length); i++) diff |= (ab[i] ?? 0) ^ (bb[i] ?? 0);
  return diff === 0;
}

export async function createSessionToken(password: string, now = Date.now()): Promise<string> {
  const expires = String(now + SESSION_TTL_MS);
  return `${expires}.${await sign(password, expires)}`;
}

export async function verifySessionToken(
  token: string | undefined,
  password: string,
  now = Date.now(),
): Promise<boolean> {
  if (!token) return false;
  const [expires, mac, ...rest] = token.split(".");
  if (rest.length || !/^\d+$/.test(expires ?? "") || !mac) return false;
  if (Number(expires) <= now) return false;
  return safeEqual(mac, await sign(password, expires));
}
