import { getSqlPool } from "@/lib/sql";

let initialized = false;

// These tables support persistent learning progress, coding attempts, and
// the flagship local study-assistant project without replacing the existing schema.
export async function ensureAppTables() {
  if (initialized) {
    return;
  }

  const pool = getSqlPool();
  await pool.query(`
    CREATE TABLE IF NOT EXISTS learner_profiles (
      id SERIAL PRIMARY KEY,
      learner_key TEXT NOT NULL UNIQUE,
      display_name TEXT NOT NULL DEFAULT 'Local Student',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS learning_progress (
      id SERIAL PRIMARY KEY,
      learner_key TEXT NOT NULL,
      item_key TEXT NOT NULL,
      completed BOOLEAN NOT NULL DEFAULT FALSE,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      UNIQUE (learner_key, item_key)
    );

    CREATE TABLE IF NOT EXISTS coding_attempts (
      id SERIAL PRIMARY KEY,
      learner_key TEXT NOT NULL,
      problem_id TEXT NOT NULL,
      language TEXT NOT NULL,
      execution_mode TEXT NOT NULL,
      source_code TEXT NOT NULL,
      stdin TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL,
      passed_count INT,
      total_count INT,
      stdout TEXT NOT NULL DEFAULT '',
      stderr TEXT NOT NULL DEFAULT '',
      compile_output TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS flagship_documents (
      id SERIAL PRIMARY KEY,
      learner_key TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS flagship_sessions (
      id SERIAL PRIMARY KEY,
      learner_key TEXT NOT NULL,
      title TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS flagship_messages (
      id SERIAL PRIMARY KEY,
      session_id INT NOT NULL REFERENCES flagship_sessions(id) ON DELETE CASCADE,
      role TEXT NOT NULL,
      content TEXT NOT NULL,
      citations JSONB NOT NULL DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);

  initialized = true;
}

export async function ensureLearnerProfile(learnerKey: string, displayName = "Local Student") {
  await ensureAppTables();
  const pool = getSqlPool();
  await pool.query(
    `
      INSERT INTO learner_profiles (learner_key, display_name)
      VALUES ($1, $2)
      ON CONFLICT (learner_key)
      DO UPDATE SET
        display_name = EXCLUDED.display_name,
        updated_at = NOW()
    `,
    [learnerKey, displayName],
  );
}
