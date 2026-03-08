# AI Learning Lab

AI Learning Lab is a local-first educational and interview-preparation platform for entry-level AI/ML roles. It combines concept lessons, interactive demos, coding execution, SQL practice, and a career-launch workflow in one Next.js repo.

## Why this repo matters

- It teaches core AI/ML concepts with interactive explanations instead of only static notes.
- It includes local Ollama workflows, SQL practice, and Judge0-backed coding execution.
- It now includes a 30-day placement-focused study plan, progress tracking, and resume-grade capstone guidance.
- It is structured to be extended into a stronger portfolio or internal interview-prep product.

## Stack

- Next.js 16 + React 19 + TypeScript
- Recharts for simple visuals
- Local Ollama integration through API routes
- Postgres-backed SQL playground
- Judge0-backed code execution service
- Vitest for starter utility tests

## What is included

- Home dashboard with module cards and learning path
- Dedicated loss function + gradient descent visual lesson
- Probability and statistics module with interviewer-style fundamentals
- Classic ML demos with charts
- Tiny neural network walkthrough
- GenAI concept cards
- Local Ollama chat playground
- Transparent MVP RAG demo with keyword retrieval baseline
- MCP teaching demo with toy tool server flow
- Agents teaching demos with visible execution traces
- Searchable jargon dictionary
- Expanded AI/ML interview bank with searchable explanations
- SQL interview preparation section
- Python and C++ coding interview preparation section
- Example + sample app + playground guidance for interview concepts
- Career Launch section with progress tracking and a 30-day study plan
- Resume-grade capstone project guidance with evaluation metrics and recruiter-facing pitches
- Persistent Postgres-backed progress tracking and coding attempt history
- Built-in flagship Local AI Study Assistant project with saved notes and chat history
- Docker support for the app, Postgres, Adminer, and Judge0 sidecars
- Mini-project blueprints
- Teacher Notes, Student Cheat Sheet, and Vibe Coding Guide

## Project structure

```text
src/
  app/
    api/
      attempts/route.ts
      chat/route.ts
      code/
        result/[token]/route.ts
        run-sample/route.ts
        submit/route.ts
      flagship/
        ask/route.ts
        documents/route.ts
      progress/route.ts
      rag/route.ts
      sql/route.ts
    globals.css
    layout.tsx
    page.tsx
  components/
    ai-learning-lab.tsx
    career-labs.tsx
    genai-labs.tsx
    ml-labs.tsx
    system-labs.tsx
  lib/
    app-db.ts
    coding-content.ts
    content.ts
    ml.ts
    judge0.ts
    ollama.ts
    rag.ts
    sql-presets.ts
    sql.ts
    types.ts
tests/
  judge0.test.ts
  ml.test.ts
  rag.test.ts
  sql.test.ts
sample-data/
  gradient-descent-notes.txt
```

## Install

1. Make sure Node.js 20+ is installed.
2. Install dependencies:

```bash
npm install
```

3. Optional: copy environment defaults:

```bash
cp .env.example .env.local
```

4. Make sure Ollama is running locally.
5. Make sure the configured model exists locally. Example:

```bash
ollama pull llama3.2:3b
```

## Run locally

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Run with Docker

This is the easiest way to get the SQL playground working on a new machine.

```bash
docker compose up --build
```

Services:

- App: `http://localhost:${APP_PORT:-3000}`
- Postgres: `localhost:${POSTGRES_EXPOSED_PORT:-5432}`
- Adminer: `http://localhost:${ADMINER_PORT:-8080}`
- Judge0 API: `http://localhost:${JUDGE0_PORT:-2358}`

Notes:

- The Docker app container uses `host.docker.internal:11434` to reach Ollama on your Mac.
- The Postgres container is seeded automatically from `docker/postgres/init.sql`.
- Adminer is optional, but useful if the student wants to inspect tables visually.
- Judge0 runs as an isolated execution backend with its own Redis and Postgres services.
- The app reaches Judge0 over the internal Docker network using `http://judge0:2358`.
- On Apple Silicon, Judge0 is pinned to `linux/amd64` by default because the upstream image may not provide a native `arm64` variant.
- If `3000` is already in use, set `APP_PORT=3001` in `.env.local` before running `docker compose up --build`.

## Environment config example

`.env.example`:

```bash
NEXT_PUBLIC_OLLAMA_BASE_URL=http://127.0.0.1:11434
NEXT_PUBLIC_OLLAMA_MODEL=llama3.2:3b
NEXT_PUBLIC_OLLAMA_TEMPERATURE=0.3
APP_PORT=3000
ADMINER_PORT=8080
JUDGE0_PORT=2358
POSTGRES_EXPOSED_PORT=5432
JUDGE0_PLATFORM=linux/amd64
JUDGE0_BASE_URL=http://127.0.0.1:2358
JUDGE0_AUTH_TOKEN=
JUDGE0_POLL_INTERVAL_MS=1000
JUDGE0_MAX_POLL_ATTEMPTS=20
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=ai_learning_lab
```

You can also change these live inside the app settings panel.

## Ollama notes

- The chat playground sends prompts to `/api/chat`.
- The RAG demo sends text to `/api/rag`.
- The SQL playground sends read-only queries to `/api/sql`.
- The coding runner submits code to `/api/code/submit`, polls `/api/code/result/[token]`, and batch-runs sample tests through `/api/code/run-sample`.
- Progress tracking persists through `/api/progress`.
- Coding attempts persist through `/api/attempts`.
- The flagship study assistant persists notes and sessions through `/api/flagship/documents` and `/api/flagship/ask`.
- If Ollama is unavailable, the UI shows the error message clearly.
- The RAG demo is intentionally transparent: retrieval is a simple keyword-overlap baseline for MVP clarity.
- The SQL playground is intentionally read-only and blocks destructive statements.
- Judge0 is treated as a swappable execution provider. The app owns problem logic, scoring, hints, and progress.

## Judge0 integration

How to start the stack:

```bash
cp .env.example .env.local
docker compose up --build
```

How the app talks to Judge0:

- `web` calls Judge0 over the internal Docker network using `JUDGE0_BASE_URL=http://judge0:2358`.
- The provider abstraction is implemented in [src/lib/judge0.ts](/Users/ganeshsankarasubramanian/agentmcp/src/lib/judge0.ts).
- Route handlers in [src/app/api/code/submit/route.ts](/Users/ganeshsankarasubramanian/agentmcp/src/app/api/code/submit/route.ts), [src/app/api/code/result/[token]/route.ts](/Users/ganeshsankarasubramanian/agentmcp/src/app/api/code/result/[token]/route.ts), and [src/app/api/code/run-sample/route.ts](/Users/ganeshsankarasubramanian/agentmcp/src/app/api/code/run-sample/route.ts) keep Judge0 isolated from browser code.
- The coding-prep UI uses those app-owned endpoints, which leaves room for attempt history, scoring, and AI feedback later.

What to extend next:

- Add user authentication instead of relying on the current local learner profile key.
- Add per-problem hidden testcases and score aggregation.
- Generate AI feedback only after normalized execution results are available.
- Add starter-template libraries and more problem types.

## SQL sandbox direction

- Keep SQL practice separate from Judge0. That is the safer architecture.
- The current repo already uses a dedicated Postgres path for SQL exercises.
- The next sensible step is a resettable or disposable practice database per challenge set, rather than forcing SQL through the code execution engine.
- A good future design is: challenge metadata in the app, seeded practice schemas in isolated Postgres databases, and reset hooks the app can call before each attempt.

## Tests

Run lint:

```bash
npm run lint
```

Run starter tests:

```bash
npm run test
```

Build production bundle:

```bash
npm run build
```

## Sample data

Use [sample-data/gradient-descent-notes.txt](/Users/ganeshsankarasubramanian/agentmcp/sample-data/gradient-descent-notes.txt) with the RAG demo if you want a quick local document.

## Beginner extension ideas

- Replace keyword retrieval with real embeddings from a local embedding model.
- Add saved progress per module.
- Add more quiz types with answer validation.
- Add small downloadable notebooks for each ML topic.
- Add more seeded SQL datasets and multi-table exercises.
- Add more coding playgrounds for graphs, sliding window, and dynamic programming.
- Add persistent attempt history around the new Judge0 execution layer.

## How this app teaches job-ready fundamentals

- It ties theory to visible model behavior instead of hiding everything behind text.
- It uses interview-safe explanations for probability, statistics, loss, gradient descent, neural nets, RAG, MCP, agents, SQL, and coding basics.
- It shows practical local AI workflows with Ollama instead of only cloud APIs.
- It includes project blueprints that can become portfolio pieces.
- It now covers the wider screening surface that entry-level AI/ML interviews often test: ML theory, SQL, and programming fundamentals.
- It encourages incremental debugging and verification, which is exactly how entry-level engineers should build AI apps.

## Job-winning upgrade path

- Finish the learning modules and interview banks.
- Use the Career Launch section to track progress and follow the 30-day plan.
- Use the built-in Local AI Study Assistant as the main flagship project and polish it with screenshots, evaluation notes, and a public README.
- Convert one capstone into a polished public portfolio project with screenshots, metrics, and a short architecture write-up.
- Practice spoken answers daily so the project work turns into interview-ready communication.
