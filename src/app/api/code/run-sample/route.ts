import { NextResponse } from "next/server";
import { runSampleTestcases } from "@/lib/judge0";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      languageId?: number;
      sourceCode?: string;
      testcases?: Array<{ input: string; expectedOutput: string; explanation?: string }>;
    };

    if (!body.languageId || !body.sourceCode?.trim() || !body.testcases?.length) {
      return NextResponse.json(
        { error: "languageId, sourceCode, and at least one testcase are required." },
        { status: 400 },
      );
    }

    const results = await runSampleTestcases(body.languageId, body.sourceCode, body.testcases);

    return NextResponse.json({
      results,
      summary: {
        total: results.length,
        passed: results.filter((item) => item.passed).length,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown Judge0 sample-run error." },
      { status: 500 },
    );
  }
}
