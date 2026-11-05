import { redirect } from "next/navigation";
import { isLoginConfigured, isSignedIn } from "@/lib/auth";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isSignedIn()) redirect("/");
  return (
    <main className="login">
      <h1 className="visually-hidden">Sign in to Simple Kanban</h1>
      {isLoginConfigured() ? (
        <LoginForm />
      ) : (
        <p className="card login-card error">Login is not configured: set SIMPLE_KANBAN_PASSWORD.</p>
      )}
    </main>
  );
}
