import { describe, expect, it } from "vitest";
import { normalizeJudge0Result } from "@/lib/judge0";

describe("judge0 normalization", () => {
  it("normalizes a successful Judge0 response", () => {
    const result = normalizeJudge0Result({
      token: "abc123",
      stdout: "5\n",
      stderr: null,
      compile_output: null,
      time: "0.01",
      memory: 1024,
      status: {
        id: 3,
        description: "Accepted",
      },
    });

    expect(result.passed).toBe(true);
    expect(result.stdout).toBe("5\n");
    expect(result.status).toBe("Accepted");
  });
});
