import { describe, expect, it } from "vitest";
import { emptyBoard, moveTicket, validateTicketInput, type Board, type Ticket } from "./board";

const t = (id: string): Ticket => ({ id, title: id, description: null, dueDate: null });
const ids = (board: Board) =>
  Object.fromEntries(Object.entries(board).map(([k, v]) => [k, v.map((x) => x.id)]));

function board(layout: Partial<Record<keyof Board, string[]>>): Board {
  const b = emptyBoard();
  for (const [col, list] of Object.entries(layout)) b[col as keyof Board] = list!.map(t);
  return b;
}

describe("moveTicket", () => {
  it("moves a Ticket to another Column at a chosen Position", () => {
    const b = board({ todo: ["a", "b"], blocked: ["x", "y"] });
    expect(ids(moveTicket(b, "a", "blocked", 1))).toMatchObject({ todo: ["b"], blocked: ["x", "a", "y"] });
  });

  it("moves backwards across Columns", () => {
    const b = board({ todo: ["a"], complete: ["z"] });
    expect(ids(moveTicket(b, "z", "todo", 0))).toMatchObject({ todo: ["z", "a"], complete: [] });
  });

  it("reorders within a Column", () => {
    const b = board({ todo: ["a", "b", "c"] });
    expect(ids(moveTicket(b, "a", "todo", 2)).todo).toEqual(["b", "c", "a"]);
    expect(ids(moveTicket(b, "c", "todo", 0)).todo).toEqual(["c", "a", "b"]);
  });

  it("clamps out-of-range Positions", () => {
    const b = board({ todo: ["a"], blocked: ["x"] });
    expect(ids(moveTicket(b, "a", "blocked", 99)).blocked).toEqual(["x", "a"]);
    expect(ids(moveTicket(b, "a", "blocked", -5)).blocked).toEqual(["a", "x"]);
  });

  it("does not mutate the input and ignores unknown ids", () => {
    const b = board({ todo: ["a", "b"] });
    moveTicket(b, "a", "complete", 0);
    expect(ids(b).todo).toEqual(["a", "b"]);
    expect(moveTicket(b, "nope", "complete", 0)).toBe(b);
  });
});

describe("validateTicketInput", () => {
  it("requires a non-blank title", () => {
    expect(validateTicketInput({ title: "   " }).ok).toBe(false);
  });

  it("trims and nulls empty optionals", () => {
    expect(validateTicketInput({ title: " Do it ", description: "  ", dueDate: "" })).toEqual({
      ok: true,
      value: { title: "Do it", description: null, dueDate: null },
    });
  });

  it("limits description to 280 characters", () => {
    expect(validateTicketInput({ title: "x", description: "a".repeat(280) }).ok).toBe(true);
    expect(validateTicketInput({ title: "x", description: "a".repeat(281) }).ok).toBe(false);
  });

  it("accepts only real calendar dates", () => {
    expect(validateTicketInput({ title: "x", dueDate: "2026-02-28" }).ok).toBe(true);
    expect(validateTicketInput({ title: "x", dueDate: "2026-02-30" }).ok).toBe(false);
    expect(validateTicketInput({ title: "x", dueDate: "tomorrow" }).ok).toBe(false);
  });
});
