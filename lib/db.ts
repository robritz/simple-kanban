import "server-only";
import { neon } from "@neondatabase/serverless";

const url = process.env.SIMPLE_KANBAN_DATABASE_URL;
if (!url) throw new Error("SIMPLE_KANBAN_DATABASE_URL is not set");

export const sql = neon(url);
