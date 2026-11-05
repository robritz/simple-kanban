# Simple Kanban

A single, barebones kanban board for tracking personal work through four fixed stages.

## Language

**Board**:
The one surface showing every unarchived Ticket, laid out in four Columns.
_Avoid_: Project, workspace

**Column**:
One of four fixed stages a Ticket can be in: **To-do**, **In progress**, **Blocked**, **Complete**. Columns cannot be added, renamed or removed.
_Avoid_: Status, lane, category, list

**Complete**:
The final Column. The only Column whose Tickets can be archived.
_Avoid_: Completed, Done

**Ticket**:
A unit of work with a title (required), a short description (optional, at most 280 characters) and a due date (optional, date only). Shown on the Board as a card.
_Avoid_: Card (except when talking about its visual form), task, item, issue

**Position**:
A Ticket's place within its Column, top to bottom. New Tickets take the top Position in To-do.
_Avoid_: Order, rank, priority

**Move**:
Dragging a Ticket to any Column, in either direction, at a chosen Position — or to a new Position within the same Column.
_Avoid_: Promote, advance

**Archive**:
Removing every Ticket in Complete from the Board in one action. Archived Tickets are kept but not shown anywhere. Archive is not deletion.
_Avoid_: Delete, clear, purge
