export type Judge0SubmissionRequest = {
  language_id: number;
  source_code: string;
  stdin?: string;
  expected_output?: string;
};

export type Judge0NormalizedResult = {
  token: string;
  statusId: number;
  status: string;
  stdout: string;
  stderr: string;
  compileOutput: string;
  time: string;
  memory: number | null;
  passed: boolean;
};

type Judge0SubmissionResponse = {
  token: string;
};

type Judge0ResultResponse = {
  token: string;
  stdout: string | null;
  stderr: string | null;
  compile_output: string | null;
  time: string | null;
  memory: number | null;
  status: {
    id: number;
    description: string;
  };
};

export type ExecutionProvider = {
  submit(submission: Judge0SubmissionRequest): Promise<{ token: string }>;
  getResult(token: string): Promise<Judge0NormalizedResult>;
};

const terminalStatuses = new Set([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]);

function getJudge0Config() {
  return {
    baseUrl: process.env.JUDGE0_BASE_URL ?? "http://judge0:2358",
    authToken: process.env.JUDGE0_AUTH_TOKEN ?? "",
    pollIntervalMs: Number(process.env.JUDGE0_POLL_INTERVAL_MS ?? "1000"),
    maxPollAttempts: Number(process.env.JUDGE0_MAX_POLL_ATTEMPTS ?? "20"),
  };
}

function buildHeaders() {
  const { authToken } = getJudge0Config();
  return {
    "Content-Type": "application/json",
    ...(authToken ? { "X-Auth-Token": authToken } : {}),
  };
}

async function judge0Fetch<T>(path: string, init?: RequestInit) {
  const { baseUrl } = getJudge0Config();
  const response = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      ...buildHeaders(),
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Judge0 request failed with status ${response.status}: ${text}`);
  }

  return response.json() as Promise<T>;
}

export function normalizeJudge0Result(result: Judge0ResultResponse): Judge0NormalizedResult {
  return {
    token: result.token,
    statusId: result.status.id,
    status: result.status.description,
    stdout: result.stdout ?? "",
    stderr: result.stderr ?? "",
    compileOutput: result.compile_output ?? "",
    time: result.time ?? "",
    memory: result.memory,
    passed: result.status.id === 3,
  };
}

export const judge0Provider: ExecutionProvider = {
  async submit(submission) {
    // The app talks to the provider through this abstraction so Judge0 can
    // later be replaced without changing route handlers or UI components.
    const response = await judge0Fetch<Judge0SubmissionResponse>("/submissions?base64_encoded=false&wait=false", {
      method: "POST",
      body: JSON.stringify(submission),
    });

    return { token: response.token };
  },

  async getResult(token) {
    const result = await judge0Fetch<Judge0ResultResponse>(`/submissions/${token}?base64_encoded=false`);
    return normalizeJudge0Result(result);
  },
};

export async function pollJudge0Result(token: string) {
  const { pollIntervalMs, maxPollAttempts } = getJudge0Config();

  for (let attempt = 0; attempt < maxPollAttempts; attempt += 1) {
    const result = await judge0Provider.getResult(token);
    if (terminalStatuses.has(result.statusId)) {
      return result;
    }

    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }

  throw new Error("Judge0 result polling timed out.");
}

export async function runSampleTestcases(
  languageId: number,
  sourceCode: string,
  testcases: Array<{ input: string; expectedOutput: string; explanation?: string }>,
) {
  const results = [];

  for (const testcase of testcases) {
    // We keep testcase orchestration in the app layer. Judge0 is only the
    // isolated execution engine, which keeps scoring and feedback extensible.
    const submission = await judge0Provider.submit({
      language_id: languageId,
      source_code: sourceCode,
      stdin: testcase.input,
      expected_output: testcase.expectedOutput,
    });

    const result = await pollJudge0Result(submission.token);
    results.push({
      ...result,
      input: testcase.input,
      expectedOutput: testcase.expectedOutput,
      explanation: testcase.explanation ?? "",
    });
  }

  return results;
}
