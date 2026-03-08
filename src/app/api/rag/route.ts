import { NextResponse } from "next/server";
import { defaultOllamaSettings } from "@/lib/content";
import { callOllama } from "@/lib/ollama";
import { chunkText, rankChunks } from "@/lib/rag";
import type { OllamaSettings } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      question?: string;
      text?: string;
      settings?: OllamaSettings;
    };

    if (!body.question?.trim() || !body.text?.trim()) {
      return NextResponse.json(
        { error: "Both question and document text are required." },
        { status: 400 },
      );
    }

    const chunks = chunkText(body.text);
    const ranked = rankChunks(body.question, chunks).slice(0, 3);
    const citations = ranked.map(({ id, text }) => ({ id, text }));

    if (ranked.length === 0) {
      return NextResponse.json({
        answer: "No relevant chunks were found by the simple retrieval baseline.",
        citations: [],
      });
    }

    const context = ranked.map((chunk) => `[${chunk.id}] ${chunk.text}`).join("\n\n");

    try {
      const settings = body.settings ?? defaultOllamaSettings;
      const response = await callOllama(
        `Answer the question using only the context below. Quote chunk ids like [chunk-1] when you use them.\n\nQuestion: ${body.question}\n\nContext:\n${context}`,
        settings,
        "You are a helpful RAG tutor. If the answer is not in the context, say so clearly.",
      );

      return NextResponse.json({
        answer: response.response.trim(),
        citations,
      });
    } catch {
      const fallbackAnswer = `MVP fallback summary: the most relevant chunks are ${ranked
        .map((chunk) => chunk.id)
        .join(", ")}. Use those citations to answer the question manually if Ollama is unavailable.`;

      return NextResponse.json({
        answer: fallbackAnswer,
        citations,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown RAG error.",
      },
      { status: 500 },
    );
  }
}
