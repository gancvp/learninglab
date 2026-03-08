import { NextResponse } from "next/server";
import { judge0Provider } from "@/lib/judge0";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      languageId?: number;
      sourceCode?: string;
      stdin?: string;
      expectedOutput?: string;
    };

    if (!body.languageId || !body.sourceCode?.trim()) {
      return NextResponse.json(
        { error: "languageId and sourceCode are required." },
        { status: 400 },
      );
    }

    const submission = await judge0Provider.submit({
      language_id: body.languageId,
      source_code: body.sourceCode,
      stdin: body.stdin,
      expected_output: body.expectedOutput,
    });

    return NextResponse.json(submission);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown Judge0 submit error." },
      { status: 500 },
    );
  }
}
