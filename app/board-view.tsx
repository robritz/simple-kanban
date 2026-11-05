"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { COLUMNS, findTicket, isColumnId, moveTicket, type Board, type ColumnId, type Ticket } from "@/lib/board";
import { archiveCompleteAction, createTicketAction, moveTicketAction, updateTicketAction } from "./actions";
import { TicketDialog } from "./ticket-dialog";

type Editing = { mode: "new" } | { mode: "edit"; ticket: Ticket } | null;

export function BoardView({ initial }: { initial: Board }) {
  const router = useRouter();
  const [board, setBoard] = useState(initial);
  const [dragStart, setDragStart] = useState<Board | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [editing, setEditing] = useState<Editing>(null);
  const [archiving, startArchive] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Adopt fresh server data, except mid-drag.
  useEffect(() => {
    if (!activeId) setBoard(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const columnOf = (b: Board, id: string): ColumnId | null =>
    isColumnId(id) ? id : (findTicket(b, id)?.column ?? null);

  function onDragStart({ active }: DragStartEvent) {
    setActiveId(String(active.id));
    setDragStart(board);
  }

  // Cross-Column moves happen live while dragging so the card shows where it will land.
  function onDragOver({ active, over }: DragOverEvent) {
    if (!over) return;
    const id = String(active.id);
    const from = columnOf(board, id);
    const to = columnOf(board, String(over.id));
    if (!from || !to || from === to) return;
    const overIndex = isColumnId(String(over.id))
      ? board[to].length
      : board[to].findIndex((t) => t.id === over.id);
    setBoard(moveTicket(board, id, to, overIndex));
  }

  function onDragEnd({ active, over }: DragEndEvent) {
    const id = String(active.id);
    const original = dragStart;
    setActiveId(null);
    setDragStart(null);
    if (!over || !original) {
      if (original) setBoard(original);
      return;
    }
    const to = columnOf(board, String(over.id));
    if (!to) return;
    const overIndex = isColumnId(String(over.id))
      ? board[to].length - 1
      : board[to].findIndex((t) => t.id === over.id);
    const next = moveTicket(board, id, to, overIndex);
    setBoard(next);

    const before = findTicket(original, id);
    const after = findTicket(next, id)!;
    if (before && before.column === after.column && before.index === after.index) return;

    moveTicketAction(id, after.column, after.index).then((result) => {
      if (!result.ok) {
        setError(result.error);
        setBoard(original);
        router.refresh();
      }
    });
  }

  function onDragCancel() {
    if (dragStart) setBoard(dragStart);
    setActiveId(null);
    setDragStart(null);
  }

  function archive() {
    const count = board.complete.length;
    if (!confirm(`Archive ${count} ticket${count === 1 ? "" : "s"} in Complete?`)) return;
    startArchive(async () => {
      setBoard((b) => ({ ...b, complete: [] }));
      const result = await archiveCompleteAction();
      if (!result.ok) setError(result.error);
    });
  }

  const activeTicket = activeId ? findTicketById(board, activeId) : null;

  return (
    <main>
      <header className="topbar">
        <h1>Simple Kanban</h1>
        <button className="primary" onClick={() => setEditing({ mode: "new" })}>
          + New ticket
        </button>
      </header>

      {error && (
        <p className="error banner" role="alert">
          {error} <button onClick={() => setError(null)}>Dismiss</button>
        </p>
      )}

      <DndContext
        id="board"
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        onDragCancel={onDragCancel}
      >
        <div className="board">
          {COLUMNS.map((col) => (
            <Column
              key={col.id}
              id={col.id}
              label={col.label}
              tickets={board[col.id]}
              onOpen={(ticket) => setEditing({ mode: "edit", ticket })}
              action={
                col.id === "complete" ? (
                  <button onClick={archive} disabled={archiving || board.complete.length === 0}>
                    Archive
                  </button>
                ) : null
              }
            />
          ))}
        </div>
        <DragOverlay>{activeTicket ? <Card ticket={activeTicket} column={columnOf(board, activeTicket.id) ?? "todo"} overlay /> : null}</DragOverlay>
      </DndContext>

      {editing?.mode === "new" && (
        <TicketDialog heading="New ticket" submitLabel="Add" onSubmit={createTicketAction} onClose={() => setEditing(null)} />
      )}
      {editing?.mode === "edit" && (
        <TicketDialog
          heading="Edit ticket"
          submitLabel="Save"
          ticket={editing.ticket}
          onSubmit={(form) => updateTicketAction(editing.ticket.id, form)}
          onClose={() => setEditing(null)}
        />
      )}
    </main>
  );
}

function findTicketById(board: Board, id: string): Ticket | null {
  const at = findTicket(board, id);
  return at ? board[at.column][at.index] : null;
}

function Column({
  id,
  label,
  tickets,
  onOpen,
  action,
}: {
  id: ColumnId;
  label: string;
  tickets: Ticket[];
  onOpen: (t: Ticket) => void;
  action: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  return (
    <section className="column" aria-label={label}>
      <header>
        <h2>
          {label} <span className="count">{tickets.length}</span>
        </h2>
        {action}
      </header>
      <SortableContext items={tickets.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <ol ref={setNodeRef} className={`cards${isOver ? " over" : ""}`}>
          {tickets.map((t) => (
            <SortableCard key={t.id} ticket={t} column={id} onOpen={onOpen} />
          ))}
        </ol>
      </SortableContext>
    </section>
  );
}

function SortableCard({ ticket, column, onOpen }: { ticket: Ticket; column: ColumnId; onOpen: (t: Ticket) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: ticket.id });
  return (
    <li
      ref={setNodeRef}
      style={{ transform: CSS.Translate.toString(transform), transition }}
      className={isDragging ? "placeholder" : undefined}
      {...attributes}
      {...listeners}
      onClick={() => onOpen(ticket)}
      onKeyDown={(e) => {
        listeners?.onKeyDown?.(e);
        if (e.key === "Enter" && !e.defaultPrevented) onOpen(ticket);
      }}
    >
      <Card ticket={ticket} column={column} />
    </li>
  );
}

function Card({ ticket, column, overlay }: { ticket: Ticket; column: ColumnId; overlay?: boolean }) {
  const now = useToday();
  const overdue = now !== null && column !== "complete" && ticket.dueDate !== null && ticket.dueDate < now;
  return (
    <article className={`card${overlay ? " overlay" : ""}`}>
      <h3>{ticket.title}</h3>
      {ticket.description && <p>{ticket.description}</p>}
      {ticket.dueDate && (
        <time dateTime={ticket.dueDate} className={overdue ? "due overdue" : "due"}>
          Due {formatDate(ticket.dueDate)}
        </time>
      )}
    </article>
  );
}

/** Local date, resolved after mount so server and client render the same markup. */
function useToday(): string | null {
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => setValue(today()), []);
  return value;
}

function today(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
