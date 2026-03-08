import { NextResponse } from "next/server";
import { ensureAppTables, ensureLearnerProfile } from "@/lib/app-db";
import { getSqlPool } from "@/lib/sql";

const defaultLearnerKey = "local-student";

export async function GET(request: Request) {
  try {
    await ensureAppTables();
    const url = new URL(request.url);
    const learnerKey = url.searchParams.get("learnerKey") ?? defaultLearnerKey;
    const limit = Number(url.searchParams.get("limit") ?? "20");

    const pool = getSqlPool();
    const result = await pool.query(
      `
        SELECT id, problem_id, language, execution_mode, status, passed_count, total_count,
               stdout, stderr, compile_output, created_at
        FROM coding_attempts
        WHERE learner_key = $1
        ORDER BY created_at DESC
        LIMIT $2
      `,
      [learnerKey, limit],
    );

    return NextResponse.json({ attempts: result.rows });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown attempts fetch error." },
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
      problemId?: string;
      language?: string;
      executionMode?: string;
      sourceCode?: string;
      stdin?: string;
      status?: string;
      passedCount?: number | null;
      totalCount?: number | null;
      stdout?: string;
      stderr?: string;
      compileOutput?: string;
    };

    if (!body.problemId || !body.language || !body.executionMode || !body.sourceCode || !body.status) {
      return NextResponse.json(
        { error: "problemId, language, executionMode, sourceCode, and status are required." },
        { status: 400 },
      );
    }

    const learnerKey = body.learnerKey ?? defaultLearnerKey;
    await ensureLearnerProfile(learnerKey, body.displayName ?? "Local Student");
    const pool = getSqlPool();

    const result = await pool.query(
      `
        INSERT INTO coding_attempts (
          learner_key, problem_id, language, execution_mode, source_code, stdin,
          status, passed_count, total_count, stdout, stderr, compile_output
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING id, created_at
      `,
      [
        learnerKey,
        body.problemId,
        body.language,
        body.executionMode,
        body.sourceCode,
        body.stdin ?? "",
        body.status,
        body.passedCount ?? null,
        body.totalCount ?? null,
        body.stdout ?? "",
        body.stderr ?? "",
        body.compileOutput ?? "",
      ],
    );

    return NextResponse.json({ ok: true, attempt: result.rows[0] });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown attempts save error." },
      { status: 500 },
    );
  }
}
