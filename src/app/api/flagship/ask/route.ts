import { NextResponse } from "next/server";
import { ensureAppTables, ensureLearnerProfile } from "@/lib/app-db";
import { callOllama } from "@/lib/ollama";
import { defaultOllamaSettings } from "@/lib/content";
import { chunkText, rankChunks } from "@/lib/rag";
import { getSqlPool } from "@/lib/sql";
import type { OllamaSettings } from "@/lib/types";

const defaultLearnerKey = "local-student";

export async function POST(request: Request) {
  try {
    await ensureAppTables();
    const body = (await request.json()) as {
      learnerKey?: string;
      displayName?: string;
      question?: string;
      settings?: OllamaSettings;
    };

    if (!body.question?.trim()) {
      return NextResponse.json({ error: "question is required." }, { status: 400 });
    }

    const learnerKey = body.learnerKey ?? defaultLearnerKey;
    await ensureLearnerProfile(learnerKey, body.displayName ?? "Local Student");
    const pool = getSqlPool();

    const documentsResult = await pool.query(
      `SELECT id, title, content FROM flagship_documents WHERE learner_key = $1 ORDER BY updated_at DESC`,
      [learnerKey],
    );

    if (documentsResult.rows.length === 0) {
      return NextResponse.json(
        { error: "No saved documents found. Add study notes to the flagship workspace first." },
        { status: 400 },
      );
    }

    const chunks = documentsResult.rows.flatMap((document) =>
      chunkText(document.content).map((chunk) => ({
        id: `${document.id}:${chunk.id}`,
        text: chunk.text,
        title: document.title,
      })),
    );

    const ranked = rankChunks(body.question, chunks).slice(0, 4);
    const citations = ranked
      .map((chunk) => {
        const fullChunk = chunks.find((item) => item.id === chunk.id);
        if (!fullChunk) {
          return null;
        }
        return {
          id: fullChunk.id,
          title: fullChunk.title,
          text: fullChunk.text,
        };
      })
      .filter((item): item is { id: string; title: string; text: string } => item !== null);

    const context = citations
      .map((citation) => `[${citation.id}] ${citation.title}: ${citation.text}`)
      .join("\n\n");

    let answer = "No answer generated.";
    try {
      const result = await callOllama(
        `Answer the question using only the study-note context below. Cite chunk ids like [12:chunk-1].\n\nQuestion: ${body.question}\n\nContext:\n${context}`,
        body.settings ?? defaultOllamaSettings,
        "You are a helpful local study assistant. Stay grounded in the provided notes.",
      );
      answer = result.response.trim();
    } catch {
      answer = `MVP fallback: review these retrieved notes first: ${citations.map((citation) => citation.id).join(", ")}.`;
    }

    const sessionTitle = body.question.length > 60 ? `${body.question.slice(0, 57)}...` : body.question;
    const sessionResult = await pool.query(
      `INSERT INTO flagship_sessions (learner_key, title) VALUES ($1, $2) RETURNING id, created_at`,
      [learnerKey, sessionTitle],
    );

    const sessionId = sessionResult.rows[0].id;

    await pool.query(
      `INSERT INTO flagship_messages (session_id, role, content, citations)
       VALUES ($1, 'user', $2, '[]'::jsonb),
              ($1, 'assistant', $3, $4::jsonb)`,
      [sessionId, body.question, answer, JSON.stringify(citations)],
    );

    const historyResult = await pool.query(
      `
        SELECT fs.id, fs.title, fs.created_at,
               COALESCE((
                 SELECT fm.content
                 FROM flagship_messages fm
                 WHERE fm.session_id = fs.id AND fm.role = 'assistant'
                 ORDER BY fm.created_at DESC
                 LIMIT 1
               ), '') AS answer
        FROM flagship_sessions fs
        WHERE fs.learner_key = $1
        ORDER BY fs.created_at DESC
        LIMIT 10
      `,
      [learnerKey],
    );

    return NextResponse.json({
      answer,
      citations,
      recentSessions: historyResult.rows,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown flagship ask error." },
      { status: 500 },
    );
  }
}
