import { redirect } from "next/navigation";
import { isSignedIn } from "@/lib/auth";

/**
 * Renders its children only for a signed-in visitor; everyone else goes to /login.
 * Children are not rendered (so their data is not fetched) until the check passes —
 * keep data loading inside a child component, not in the page that wraps it.
 *
 * This guards pages only. Server actions are separate endpoints and check
 * `requireSignedIn()` themselves.
 */
export async function AuthGate({ children }: { children: React.ReactNode }) {
  if (!(await isSignedIn())) redirect("/login");
  return children;
}
