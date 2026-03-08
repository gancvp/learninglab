"use client";

import * as React from "react";
import { glossaryTerms } from "@/lib/content";
import { chunkText } from "@/lib/rag";
import type { GlossaryTerm, OllamaSettings } from "@/lib/types";

type GenAiLabProps = {
  settings: OllamaSettings;
};

const presetPrompts = [
  {
    label: "Summarization",
    prompt: "Summarize why gradient descent matters for a beginner in 5 bullet points.",
  },
  {
    label: "Classification",
    prompt: "Classify this sentence as positive, neutral, or negative: 'The lecture was clear but too long.' Explain briefly.",
  },
  {
    label: "Extraction",
    prompt: "Extract the names, dates, and tools from: 'On March 5, Maya used Python and Ollama to build a chatbot demo.'",
  },
  {
    label: "Code generation",
    prompt: "Write a small Python function that computes mean squared error for two lists.",
  },
  {
    label: "Tutoring",
    prompt: "Teach me embeddings like I am a final-year college student preparing for an interview.",
  },
];

export function GenAiLab({ settings }: GenAiLabProps) {
  const [prompt, setPrompt] = React.useState(presetPrompts[0].prompt);
  const [messages, setMessages] = React.useState<Array<{ role: string; content: string }>>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [ragText, setRagText] = React.useState("");
  const [ragQuestion, setRagQuestion] = React.useState("What does the document say about gradient descent?");
  const [ragResult, setRagResult] = React.useState<{
    answer: string;
    citations: Array<{ id: string; text: string }>;
  } | null>(null);
  const [ragLoading, setRagLoading] = React.useState(false);

  async function sendPrompt() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          settings,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Chat request failed");
      }
      setMessages((current) => [
        { role: "user", content: prompt },
        { role: "assistant", content: data.response },
        ...current,
      ]);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unknown chat error");
    } finally {
      setLoading(false);
    }
  }

  async function runRag() {
    setRagLoading(true);
    setRagResult(null);
    setError("");
    try {
      const response = await fetch("/api/rag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: ragQuestion,
          text: ragText,
          settings,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "RAG request failed");
      }
      setRagResult(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unknown RAG error");
    } finally {
      setRagLoading(false);
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    const text = await file.text();
    setRagText(text);
  }

  const localChunks = React.useMemo(() => chunkText(ragText), [ragText]);

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Module 3</p>
          <h2>GenAI Basics</h2>
          <p className="muted">Explanations are simple, but the system behavior is transparent. You can inspect prompts, retrieved chunks, and errors.</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {[
          ["Tokens", "Small text pieces the model reads and predicts."],
          ["Embeddings", "Meaning vectors that let similar text stay close together."],
          ["Context window", "How much text the model can look at once."],
          ["Prompting", "Instructions + examples that steer the model."],
          ["Zero-shot / few-shot", "No examples vs a few examples inside the prompt."],
          ["Temperature", "Randomness control. Lower is steadier, higher is more creative."],
          ["Hallucination", "Unsupported answer that sounds confident."],
          ["RAG", "Retrieve useful context before generating."],
          ["Fine-tuning", "Additional training for a narrower domain."],
          ["Tool calling", "Ask a tool to do structured work instead of guessing."],
        ].map(([title, description]) => (
          <article key={title} className="dashboard-card static-card">
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>

      <div className="two-column">
        <div className="panel inset-panel">
          <div className="section-heading compact">
            <div>
              <h3>Local Ollama chat playground</h3>
              <p className="muted">Configured by the settings panel. Errors are surfaced directly if Ollama is unavailable.</p>
            </div>
          </div>
          <div className="prompt-grid">
            {presetPrompts.map((preset) => (
              <button key={preset.label} className="chip action-chip" onClick={() => setPrompt(preset.prompt)}>
                {preset.label}
              </button>
            ))}
          </div>
          <textarea
            className="text-area"
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
          />
          <button className="primary-button" onClick={sendPrompt} disabled={loading}>
            {loading ? "Running locally..." : "Send to Ollama"}
          </button>
          {error ? <p className="error-text">{error}</p> : null}
          <div className="message-stack">
            {messages.map((message, index) => (
              <article key={`${message.role}-${index}`} className={`message-card ${message.role}`}>
                <strong>{message.role === "user" ? "You" : "Local model"}</strong>
                <p>{message.content}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="panel inset-panel">
          <div className="section-heading compact">
            <div>
              <h3>Simple RAG demo</h3>
              <p className="muted">MVP note: retrieval uses a transparent keyword-overlap baseline, not embeddings yet.</p>
            </div>
          </div>
          <input type="file" accept=".txt,.md" onChange={handleFileUpload} />
          <textarea
            className="text-area"
            placeholder="Or paste your own notes here..."
            value={ragText}
            onChange={(event) => setRagText(event.target.value)}
          />
          <input
            className="text-input"
            value={ragQuestion}
            onChange={(event) => setRagQuestion(event.target.value)}
            placeholder="Ask a question about the uploaded notes"
          />
          <button className="primary-button" onClick={runRag} disabled={ragLoading || !ragText.trim()}>
            {ragLoading ? "Retrieving..." : "Retrieve + Answer"}
          </button>
          <div className="formula-box">
            <p>Chunks created: <strong>{localChunks.length}</strong></p>
            <p>Retrieval method: <strong>Keyword overlap baseline</strong></p>
          </div>
          {ragResult ? (
            <div className="message-stack">
              <article className="message-card assistant">
                <strong>Answer</strong>
                <p>{ragResult.answer}</p>
              </article>
              {ragResult.citations.map((citation) => (
                <article key={citation.id} className="message-card citation">
                  <strong>{citation.id}</strong>
                  <p>{citation.text}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function FlagshipStudyAssistant({ settings }: GenAiLabProps) {
  const learnerKey = "local-student";
  const [title, setTitle] = React.useState("Gradient Descent Notes");
  const [content, setContent] = React.useState("");
  const [question, setQuestion] = React.useState("What do my notes say about gradient descent?");
  const [documents, setDocuments] = React.useState<
    Array<{ id: number; title: string; content: string; created_at: string; updated_at: string }>
  >([]);
  const [recentSessions, setRecentSessions] = React.useState<
    Array<{ id: number; title: string; created_at: string; answer: string }>
  >([]);
  const [result, setResult] = React.useState<{
    answer: string;
    citations: Array<{ id: string; title: string; text: string }>;
  } | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [savingDoc, setSavingDoc] = React.useState(false);
  const [error, setError] = React.useState("");

  const loadDocuments = React.useCallback(async () => {
    const response = await fetch(`/api/flagship/documents?learnerKey=${learnerKey}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error ?? "Failed to load flagship documents");
    }
    setDocuments(data.documents);
  }, []);

  React.useEffect(() => {
    loadDocuments().catch((requestError) => {
      setError(requestError instanceof Error ? requestError.message : "Unknown flagship load error");
    });
  }, [loadDocuments]);

  async function saveDocument() {
    setSavingDoc(true);
    setError("");
    try {
      const response = await fetch("/api/flagship/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          learnerKey,
          title,
          content,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to save document");
      }
      setDocuments((current) => [data.document, ...current]);
      setContent("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unknown save error");
    } finally {
      setSavingDoc(false);
    }
  }

  async function askQuestion() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/flagship/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          learnerKey,
          question,
          settings,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to ask flagship question");
      }
      setResult({
        answer: data.answer,
        citations: data.citations,
      });
      setRecentSessions(data.recentSessions);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unknown flagship ask error");
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    setTitle(file.name.replace(/\.[^.]+$/, ""));
    setContent(await file.text());
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Flagship Project</p>
          <h2>Local AI Study Assistant</h2>
          <p className="muted">
            This is a real portfolio project inside the repo: persistent note storage, retrieval over saved documents, local Ollama answering, citations, and saved session history.
          </p>
        </div>
      </div>

      <div className="three-column">
        <article className="panel inset-panel">
          <h3>What it demonstrates</h3>
          <p>Local-first AI, RAG, persistence, API design, Docker, and practical product thinking.</p>
        </article>
        <article className="panel inset-panel">
          <h3>How to pitch it</h3>
          <p>I built a local study assistant that stores notes, retrieves grounded context, answers with citations, and saves learning sessions.</p>
        </article>
        <article className="panel inset-panel">
          <h3>Evaluation hooks</h3>
          <p>Track document count, citation quality, fallback behavior, and response usefulness on study questions.</p>
        </article>
      </div>

      <div className="two-column">
        <div className="panel inset-panel">
          <h3>Add study notes</h3>
          <input className="text-input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Document title" />
          <input type="file" accept=".txt,.md" onChange={handleFileUpload} />
          <textarea
            className="text-area"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Paste lecture notes, revision summaries, or interview prep notes..."
          />
          <button className="primary-button" onClick={saveDocument} disabled={savingDoc || !title.trim() || !content.trim()}>
            {savingDoc ? "Saving note..." : "Save to study library"}
          </button>
        </div>

        <div className="panel inset-panel">
          <h3>Ask your saved notes</h3>
          <input className="text-input" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question over saved study notes" />
          <button className="primary-button" onClick={askQuestion} disabled={loading || documents.length === 0}>
            {loading ? "Searching notes..." : "Ask study assistant"}
          </button>
          <div className="formula-box">
            <p><strong>Saved documents:</strong> {documents.length}</p>
            <p><strong>Execution path:</strong> note library -&gt; retrieval -&gt; Ollama answer -&gt; saved session</p>
          </div>
          {error ? <p className="error-text">{error}</p> : null}
          {result ? (
            <div className="message-stack">
              <article className="message-card assistant">
                <strong>Answer</strong>
                <p>{result.answer}</p>
              </article>
              {result.citations.map((citation) => (
                <article key={citation.id} className="message-card citation">
                  <strong>{citation.title} [{citation.id}]</strong>
                  <p>{citation.text}</p>
                </article>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="two-column">
        <div className="panel inset-panel">
          <h3>Study library</h3>
          <div className="qa-grid">
            {documents.map((document) => (
              <article key={document.id} className="panel inset-panel">
                <h3>{document.title}</h3>
                <p className="muted">{new Date(document.updated_at).toLocaleString()}</p>
                <p>{document.content.slice(0, 220)}{document.content.length > 220 ? "..." : ""}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="panel inset-panel">
          <h3>Recent study sessions</h3>
          <div className="qa-grid">
            {recentSessions.map((session) => (
              <article key={session.id} className="panel inset-panel">
                <h3>{session.title}</h3>
                <p className="muted">{new Date(session.created_at).toLocaleString()}</p>
                <p>{session.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function JargonDictionary() {
  const [query, setQuery] = React.useState("");

  const filteredTerms = React.useMemo(
    () =>
      glossaryTerms.filter((term) =>
        [term.term, term.definition, term.example]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Searchable Glossary</p>
          <h2>AI Jargon Dictionary</h2>
          <p className="muted">Each term has a one-line definition, why it matters, and a tiny example.</p>
        </div>
      </div>
      <input
        className="text-input"
        placeholder="Search terms like embedding, RAG, loss, or guardrails"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <div className="dictionary-grid">
        {filteredTerms.map((term) => (
          <GlossaryCard key={term.term} term={term} />
        ))}
      </div>
    </section>
  );
}

function GlossaryCard({ term }: { term: GlossaryTerm }) {
  return (
    <article className="panel inset-panel">
      <h3>{term.term}</h3>
      <p><strong>Definition:</strong> {term.definition}</p>
      <p><strong>Why it matters:</strong> {term.whyItMatters}</p>
      <p><strong>Tiny example:</strong> {term.example}</p>
    </article>
  );
}
