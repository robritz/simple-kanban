import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_TTL_MS, createSessionToken, safeEqual, verifySessionToken } from "./session";

const COOKIE = "simple_kanban_session";

function password(): string | null {
  return process.env.SIMPLE_KANBAN_PASSWORD || null;
}

export function isLoginConfigured(): boolean {
  return password() !== null;
}

export async function isSignedIn(): Promise<boolean> {
  const pw = password();
  if (!pw) return false;
  return verifySessionToken((await cookies()).get(COOKIE)?.value, pw);
}

/** Use at the top of every page and server action that touches the Board. */
export async function requireSignedIn(): Promise<void> {
  if (!(await isSignedIn())) redirect("/login");
}

export async function signIn(attempt: string): Promise<boolean> {
  const pw = password();
  if (!pw || !safeEqual(attempt, pw)) return false;
  (await cookies()).set(COOKIE, await createSessionToken(pw), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  });
  return true;
}

export async function signOut(): Promise<void> {
  (await cookies()).delete(COOKIE);
}
