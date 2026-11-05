"use server";

import { revalidatePath } from "next/cache";
import { isColumnId, validateTicketInput } from "@/lib/board";
import * as tickets from "@/lib/tickets";

export type ActionResult = { ok: true } | { ok: false; error: string };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function readForm(form: FormData) {
  return validateTicketInput({
    title: form.get("title"),
    description: form.get("description"),
    dueDate: form.get("dueDate"),
  });
}

export async function createTicketAction(form: FormData): Promise<ActionResult> {
  const input = readForm(form);
  if (!input.ok) return input;
  await tickets.createTicket(input.value);
  revalidatePath("/");
  return { ok: true };
}

export async function updateTicketAction(id: string, form: FormData): Promise<ActionResult> {
  if (!UUID.test(id)) return { ok: false, error: "Unknown ticket." };
  const input = readForm(form);
  if (!input.ok) return input;
  const found = await tickets.updateTicket(id, input.value);
  revalidatePath("/");
  return found ? { ok: true } : { ok: false, error: "Ticket no longer exists." };
}

export async function moveTicketAction(id: string, column: string, index: number): Promise<ActionResult> {
  if (!UUID.test(id) || !isColumnId(column) || !Number.isInteger(index))
    return { ok: false, error: "Invalid move." };
  const found = await tickets.moveTicketTo(id, column, index);
  revalidatePath("/");
  return found ? { ok: true } : { ok: false, error: "Ticket no longer exists." };
}

export async function archiveCompleteAction(): Promise<ActionResult> {
  await tickets.archiveComplete();
  revalidatePath("/");
  return { ok: true };
}
