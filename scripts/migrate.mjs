import { readFile } from "node:fs/promises";
import { Pool } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL_UNPOOLED ?? process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const pool = new Pool({ connectionString: url });
const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");
await pool.query(schema);
await pool.end();
console.log("Schema applied.");
