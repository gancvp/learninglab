import { NextResponse } from "next/server";
import { getSqlPool, isSafeSqlQuery } from "@/lib/sql";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { query?: string };
    const query = body.query ?? "";
    const safety = isSafeSqlQuery(query);

    if (!safety.ok) {
      return NextResponse.json({ error: safety.reason }, { status: 400 });
    }

    const pool = getSqlPool();
    const result = await pool.query(query);

    return NextResponse.json({
      rows: result.rows,
      rowCount: result.rowCount,
      columns: result.fields.map((field) => field.name),
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `${error.message}. Make sure Docker Postgres is running or your local DB env vars are correct.`
            : "Unknown SQL error.",
      },
      { status: 500 },
    );
  }
}
