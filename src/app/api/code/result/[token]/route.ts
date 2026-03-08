import { NextResponse } from "next/server";
import { pollJudge0Result } from "@/lib/judge0";

export async function GET(
  _request: Request,
  context: { params: Promise<{ token: string }> },
) {
  try {
    const { token } = await context.params;
    const result = await pollJudge0Result(token);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown Judge0 result error." },
      { status: 500 },
    );
  }
}
