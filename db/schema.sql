DO $$ BEGIN
  CREATE TYPE ticket_column AS ENUM ('todo', 'in_progress', 'blocked', 'complete');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS tickets (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title       text NOT NULL CHECK (length(btrim(title)) > 0),
  description varchar(280),
  due_date    date,
  "column"    ticket_column NOT NULL DEFAULT 'todo',
  position    integer NOT NULL,
  archived_at timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS tickets_board_idx
  ON tickets ("column", position) WHERE archived_at IS NULL;
