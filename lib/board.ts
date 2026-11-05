export const COLUMNS = [
  { id: "todo", label: "To-do" },
  { id: "in_progress", label: "In progress" },
  { id: "blocked", label: "Blocked" },
  { id: "complete", label: "Complete" },
] as const;

export type ColumnId = (typeof COLUMNS)[number]["id"];

export const DESCRIPTION_MAX = 280;

export type Ticket = {
  id: string;
  title: string;
  description: string | null;
  /** ISO date, YYYY-MM-DD */
  dueDate: string | null;
};

/** Ticket ids in each Column, top Position first. */
export type Board = Record<ColumnId, Ticket[]>;

export function emptyBoard(): Board {
  return { todo: [], in_progress: [], blocked: [], complete: [] };
}

export function isColumnId(value: unknown): value is ColumnId {
  return COLUMNS.some((c) => c.id === value);
}

export function findTicket(board: Board, id: string): { column: ColumnId; index: number } | null {
  for (const { id: column } of COLUMNS) {
    const index = board[column].findIndex((t) => t.id === id);
    if (index !== -1) return { column, index };
  }
  return null;
}

/**
 * Move a Ticket to `toColumn` at `toIndex` (clamped). `toIndex` is the Ticket's
 * final index in the destination Column. Returns a new Board; the input is untouched.
 */
export function moveTicket(board: Board, id: string, toColumn: ColumnId, toIndex: number): Board {
  const from = findTicket(board, id);
  if (!from) return board;
  const next: Board = { ...board, [from.column]: [...board[from.column]] };
  const [ticket] = next[from.column].splice(from.index, 1);
  const dest = from.column === toColumn ? next[from.column] : [...board[toColumn]];
  const index = Math.max(0, Math.min(toIndex, dest.length));
  dest.splice(index, 0, ticket);
  next[toColumn] = dest;
  return next;
}

export type TicketInput = { title: string; description: string | null; dueDate: string | null };

export type ValidationResult = { ok: true; value: TicketInput } | { ok: false; error: string };

export function validateTicketInput(raw: {
  title?: unknown;
  description?: unknown;
  dueDate?: unknown;
}): ValidationResult {
  const title = typeof raw.title === "string" ? raw.title.trim() : "";
  if (!title) return { ok: false, error: "Title is required." };

  const descriptionRaw = typeof raw.description === "string" ? raw.description.trim() : "";
  if (descriptionRaw.length > DESCRIPTION_MAX)
    return { ok: false, error: `Description must be at most ${DESCRIPTION_MAX} characters.` };

  const dueRaw = typeof raw.dueDate === "string" ? raw.dueDate.trim() : "";
  if (dueRaw && !isValidDate(dueRaw)) return { ok: false, error: "Due date must be a valid date." };

  return {
    ok: true,
    value: { title, description: descriptionRaw || null, dueDate: dueRaw || null },
  };
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const d = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}
