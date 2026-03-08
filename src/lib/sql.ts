import { Pool } from "pg";

let pool: Pool | null = null;

export function getSqlPool() {
  if (pool) {
    return pool;
  }

  pool = new Pool({
    host: process.env.POSTGRES_HOST ?? "127.0.0.1",
    port: Number(process.env.POSTGRES_PORT ?? "5432"),
    user: process.env.POSTGRES_USER ?? "postgres",
    password: process.env.POSTGRES_PASSWORD ?? "postgres",
    database: process.env.POSTGRES_DB ?? "ai_learning_lab",
  });

  return pool;
}

export function isSafeSqlQuery(query: string) {
  const normalized = query.trim().toLowerCase();

  if (!normalized) {
    return { ok: false, reason: "Query is empty." };
  }

  const forbidden = [
    "insert ",
    "update ",
    "delete ",
    "drop ",
    "alter ",
    "truncate ",
    "create ",
    "grant ",
    "revoke ",
  ];

  if (!normalized.startsWith("select") && !normalized.startsWith("with")) {
    return { ok: false, reason: "Only SELECT and WITH queries are allowed in the playground." };
  }

  if (forbidden.some((keyword) => normalized.includes(keyword))) {
    return { ok: false, reason: "Only read-only SQL is allowed in the playground." };
  }

  return { ok: true as const };
}
