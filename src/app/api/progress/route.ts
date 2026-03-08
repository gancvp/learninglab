import { NextResponse } from "next/server";
import { ensureAppTables, ensureLearnerProfile } from "@/lib/app-db";
import { progressChecklist } from "@/lib/content";
import { getSqlPool } from "@/lib/sql";

const defaultLearnerKey = "local-student";

export async function GET(request: Request) {
  try {
    await ensureAppTables();
    const url = new URL(request.url);
    const learnerKey = url.searchParams.get("learnerKey") ?? defaultLearnerKey;
    const pool = getSqlPool();

    await ensureLearnerProfile(learnerKey);

    const [profileResult, progressResult, attemptsResult] = await Promise.all([
      pool.query(
        `SELECT learner_key, display_name FROM learner_profiles WHERE learner_key = $1`,
        [learnerKey],
      ),
      pool.query(
        `SELECT item_key, completed, updated_at
         FROM learning_progress
         WHERE learner_key = $1
         ORDER BY updated_at DESC`,
        [learnerKey],
      ),
      pool.query(
        `SELECT problem_id, language, execution_mode, status, passed_count, total_count, created_at
         FROM coding_attempts
         WHERE learner_key = $1
         ORDER BY created_at DESC
         LIMIT 10`,
        [learnerKey],
      ),
    ]);

    return NextResponse.json({
      learnerKey,
      displayName: profileResult.rows[0]?.display_name ?? "Local Student",
      checklist: progressChecklist.map((item) => {
        const matched = progressResult.rows.find((row) => row.item_key === item);
        return {
          item,
          completed: matched?.completed ?? false,
          updatedAt: matched?.updated_at ?? null,
        };
      }),
      recentAttempts: attemptsResult.rows,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown progress error." },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    await ensureAppTables();
    const body = (await request.json()) as {
      learnerKey?: string;
      displayName?: string;
      itemKey?: string;
      completed?: boolean;
    };

    const learnerKey = body.learnerKey ?? defaultLearnerKey;
    if (!body.itemKey) {
      return NextResponse.json({ error: "itemKey is required." }, { status: 400 });
    }

    await ensureLearnerProfile(learnerKey, body.displayName ?? "Local Student");

    const pool = getSqlPool();
    await pool.query(
      `
        INSERT INTO learning_progress (learner_key, item_key, completed)
        VALUES ($1, $2, $3)
        ON CONFLICT (learner_key, item_key)
        DO UPDATE SET
          completed = EXCLUDED.completed,
          updated_at = NOW()
      `,
      [learnerKey, body.itemKey, Boolean(body.completed)],
    );

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown progress update error." },
      { status: 500 },
    );
  }
}
