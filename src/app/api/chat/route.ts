import { NextResponse } from "next/server";
import { callOllama } from "@/lib/ollama";
import { defaultOllamaSettings } from "@/lib/content";
import type { OllamaSettings } from "@/lib/types";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      prompt?: string;
      settings?: OllamaSettings;
    };

    if (!body.prompt?.trim()) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }

    const settings = body.settings ?? defaultOllamaSettings;
    const response = await callOllama(
      body.prompt,
      settings,
      "You are a calm AI tutor for a final-year college student. Keep answers simple, practical, and mathematically honest.",
    );

    return NextResponse.json({ response: response.response.trim() });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? `${error.message}. Check that Ollama is running and the chosen model is available locally.`
            : "Unknown Ollama error.",
      },
      { status: 500 },
    );
  }
}
