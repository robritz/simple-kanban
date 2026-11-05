"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { DESCRIPTION_MAX, type Ticket } from "@/lib/board";
import type { ActionResult } from "./actions";

export function TicketDialog({
  ticket,
  heading,
  submitLabel,
  onSubmit,
  onClose,
}: {
  ticket?: Ticket;
  heading: string;
  submitLabel: string;
  onSubmit: (form: FormData) => Promise<ActionResult>;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [description, setDescription] = useState(ticket?.description ?? "");
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    ref.current?.showModal();
  }, []);

  return (
    <dialog ref={ref} className="dialog" onClose={onClose} onClick={(e) => e.target === ref.current && onClose()}>
      <form
        action={(form) =>
          startTransition(async () => {
            const result = await onSubmit(form);
            if (result.ok) onClose();
            else setError(result.error);
          })
        }
      >
        <h2>{heading}</h2>
        <label>
          Title
          <input name="title" required autoFocus defaultValue={ticket?.title} />
        </label>
        <label>
          Description <span className="muted">(optional)</span>
          <textarea
            name="description"
            rows={3}
            maxLength={DESCRIPTION_MAX}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <span className="counter muted">
            {description.length}/{DESCRIPTION_MAX}
          </span>
        </label>
        <label>
          Due date <span className="muted">(optional)</span>
          <input name="dueDate" type="date" defaultValue={ticket?.dueDate ?? ""} />
        </label>
        {error && <p className="error">{error}</p>}
        <div className="actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="primary" disabled={pending}>
            {pending ? "Saving…" : submitLabel}
          </button>
        </div>
      </form>
    </dialog>
  );
}
