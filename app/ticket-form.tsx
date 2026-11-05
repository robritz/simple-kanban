"use client";

import { useState, useTransition } from "react";
import { DESCRIPTION_MAX, type Ticket } from "@/lib/board";
import type { ActionResult } from "./actions";

/**
 * A card-shaped form for creating or editing a Ticket in place on the Board.
 * Enter in the title saves, ⌘/Ctrl+Enter saves from anywhere, Escape cancels.
 */
export function TicketForm({
  ticket,
  onSubmit,
  onDone,
}: {
  ticket?: Ticket;
  onSubmit: (form: FormData) => Promise<ActionResult>;
  onDone: () => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState(ticket?.description ?? "");
  const [pending, startTransition] = useTransition();

  return (
    <form
      className="card card-form"
      aria-label={ticket ? "Edit ticket" : "New ticket"}
      action={(form) =>
        startTransition(async () => {
          const result = await onSubmit(form);
          if (result.ok) onDone();
          else setError(result.error);
        })
      }
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onDone();
        } else if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          e.currentTarget.requestSubmit();
        }
      }}
    >
      <input
        name="title"
        className="field-title"
        aria-label="Title"
        placeholder="Title"
        required
        autoFocus
        defaultValue={ticket?.title}
      />
      <textarea
        name="description"
        aria-label="Description"
        placeholder="Description (optional)"
        rows={2}
        maxLength={DESCRIPTION_MAX}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <label className="field-due">
        <span>Due</span>
        <input name="dueDate" type="date" defaultValue={ticket?.dueDate ?? ""} />
      </label>
      {error && <p className="error">{error}</p>}
      <div className="form-footer">
        <span className="counter muted">
          {description.length}/{DESCRIPTION_MAX}
        </span>
        <button type="button" className="text" onClick={onDone}>
          Cancel
        </button>
        <button type="submit" className="primary" disabled={pending}>
          {pending ? "Saving…" : ticket ? "Save" : "Add"}
        </button>
      </div>
    </form>
  );
}
