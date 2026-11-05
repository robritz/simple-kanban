"use server";

import { redirect } from "next/navigation";
import { signIn, signOut } from "@/lib/auth";

export type LoginState = { error: string | null };

export async function loginAction(_prev: LoginState, form: FormData): Promise<LoginState> {
  const attempt = form.get("password");
  if (typeof attempt !== "string" || !(await signIn(attempt))) {
    // Slow down guessing a little.
    await new Promise((r) => setTimeout(r, 500));
    return { error: "Wrong password." };
  }
  redirect("/");
}

export async function logoutAction(): Promise<void> {
  await signOut();
  redirect("/login");
}
