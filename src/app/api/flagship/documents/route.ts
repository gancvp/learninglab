import { NextResponse } from "next/server";
import { ensureAppTables, ensureLearnerProfile } from "@/lib/app-db";
import { getSqlPool } from "@/lib/sql";

const defaultLearnerKey = "local-student";

export async function GET(request: Request) {
  try {
    await ensureAppTables();
    const url = new URL(request.url);
    const learnerKey = url.searchParams.get("learnerKey") ?? defaultLearnerKey;
    const pool = getSqlPool();

    const result = await pool.query(
      `
        SELECT id, title, content, created_at, updated_at
        FROM flagship_documents
        WHERE learner_key = $1
        ORDER BY updated_at DESC
      `,
      [learnerKey],
    );

    return NextResponse.json({ documents: result.rows });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown flagship documents error." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    await ensureAppTables();
    const body = (await request.json()) as {
      learnerKey?: string;
      displayName?: string;
      title?: string;
      content?: string;
    };

    if (!body.title?.trim() || !body.content?.trim()) {
      return NextResponse.json({ error: "title and content are required." }, { status: 400 });
    }

    const learnerKey = body.learnerKey ?? defaultLearnerKey;
    await ensureLearnerProfile(learnerKey, body.displayName ?? "Local Student");
    const pool = getSqlPool();

    const result = await pool.query(
      `
        INSERT INTO flagship_documents (learner_key, title, content)
        VALUES ($1, $2, $3)
        RETURNING id, title, content, created_at, updated_at
      `,
      [learnerKey, body.title.trim(), body.content.trim()],
    );

    return NextResponse.json({ document: result.rows[0] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown flagship save error." },
      { status: 500 },
    );
  }
}
