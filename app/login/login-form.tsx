"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(loginAction, { error: null });
  return (
    <form action={action} className="card login-card">
      <label>
        Password
        <input name="password" type="password" autoComplete="current-password" required autoFocus />
      </label>
      {state.error && <p className="error" role="alert">{state.error}</p>}
      <button type="submit" className="primary" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
