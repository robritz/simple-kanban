import "server-only";
import { sql } from "./db";
import { COLUMNS, emptyBoard, findTicket, moveTicket, type Board, type ColumnId, type TicketInput } from "./board";

type Row = { id: string; title: string; description: string | null; due_date: string | null; column: ColumnId };

/** Every unarchived Ticket, grouped by Column in Position order. */
export async function getBoard(): Promise<Board> {
  const rows = (await sql`
    SELECT id, title, description, to_char(due_date, 'YYYY-MM-DD') AS due_date, "column"
    FROM tickets
    WHERE archived_at IS NULL
    ORDER BY "column", position, created_at DESC
  `) as Row[];
  const board = emptyBoard();
  for (const r of rows) {
    board[r.column].push({ id: r.id, title: r.title, description: r.description, dueDate: r.due_date });
  }
  return board;
}

/** New Tickets take the top Position in To-do. */
export async function createTicket(input: TicketInput): Promise<void> {
  await sql.transaction([
    sql`UPDATE tickets SET position = position + 1 WHERE "column" = 'todo' AND archived_at IS NULL`,
    sql`INSERT INTO tickets (title, description, due_date, "column", position)
        VALUES (${input.title}, ${input.description}, ${input.dueDate}, 'todo', 0)`,
  ]);
}

export async function updateTicket(id: string, input: TicketInput): Promise<boolean> {
  const rows = await sql`
    UPDATE tickets SET title = ${input.title}, description = ${input.description}, due_date = ${input.dueDate}
    WHERE id = ${id} AND archived_at IS NULL
    RETURNING id
  `;
  return rows.length > 0;
}

/** Move a Ticket to `toColumn` at `toIndex`, renumbering the affected Columns. */
export async function moveTicketTo(id: string, toColumn: ColumnId, toIndex: number): Promise<boolean> {
  const before = await getBoard();
  const from = findTicket(before, id);
  if (!from) return false;
  const after = moveTicket(before, id, toColumn, toIndex);

  const ids: string[] = [];
  const columns: string[] = [];
  const positions: number[] = [];
  for (const { id: column } of COLUMNS) {
    if (column !== from.column && column !== toColumn) continue;
    after[column].forEach((t, i) => {
      ids.push(t.id);
      columns.push(column);
      positions.push(i);
    });
  }

  await sql`
    UPDATE tickets AS t
    SET "column" = v.col::ticket_column, position = v.pos
    FROM unnest(${ids}::uuid[], ${columns}::text[], ${positions}::int[]) AS v(id, col, pos)
    WHERE t.id = v.id
  `;
  return true;
}

/** Archive every Ticket in Complete. */
export async function archiveComplete(): Promise<number> {
  const rows = await sql`
    UPDATE tickets SET archived_at = now()
    WHERE "column" = 'complete' AND archived_at IS NULL
    RETURNING id
  `;
  return rows.length;
}
