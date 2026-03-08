"use client";

import * as React from "react";
import {
  aiMlInterviewCards,
  capstoneProjects,
  miniProjects,
  progressChecklist,
  pythonInterviewCards,
  sqlPracticeChallenges,
  sqlInterviewCards,
  studyPlan,
  cppInterviewCards,
} from "@/lib/content";
import { codingProblems, getTemplate, type SupportedCodingLanguage } from "@/lib/coding-content";
import { sqlPresetQueries } from "@/lib/sql-presets";
import type { InterviewCard } from "@/lib/types";

export function InterviewPrep() {
  return (
    <QuestionBank
      title="AI/ML Interview Preparation"
      eyebrow="Interview Prep"
      description="Searchable questions with detailed answers, spoken-style versions, and explanation blocks that tell you what the interviewer is really testing."
      cards={aiMlInterviewCards}
      showQuiz
      categories={["All", "Foundations", "Data", "Statistics", "Modeling", "Optimization", "Generalization", "Evaluation", "Features", "Algorithms", "Deep Learning", "GenAI", "Systems", "MLOps"]}
      track="aiml"
    />
  );
}

export function CareerLaunchLab() {
  const learnerKey = "local-student";
  const [displayName, setDisplayName] = React.useState("Local Student");
  const [completed, setCompleted] = React.useState<string[]>([]);
  const [recentAttempts, setRecentAttempts] = React.useState<
    Array<{ problem_id: string; language: string; execution_mode: string; status: string; passed_count: number | null; total_count: number | null; created_at: string }>
  >([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const loadProgress = React.useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/progress?learnerKey=${learnerKey}`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to load progress");
      }
      setDisplayName(data.displayName);
      setCompleted(data.checklist.filter((item: { item: string; completed: boolean }) => item.completed).map((item: { item: string }) => item.item));
      setRecentAttempts(data.recentAttempts);
      setError("");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unknown progress load error");
    } finally {
      setLoading(false);
    }
  }, [learnerKey]);

  React.useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const completionRate = Math.round((completed.length / progressChecklist.length) * 100);

  async function toggleItem(item: string) {
    const nextCompleted = !completed.includes(item);
    setCompleted((current) =>
      nextCompleted ? [...current, item] : current.filter((value) => value !== item),
    );
    try {
      const response = await fetch("/api/progress", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          learnerKey,
          displayName,
          itemKey: item,
          completed: nextCompleted,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to save progress");
      }
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unknown progress save error");
      loadProgress();
    }
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Career Launch</p>
          <h2>Job-Focused Upgrade Path</h2>
          <p className="muted">This section turns the repo into a structured placement plan instead of only a concept library.</p>
        </div>
      </div>

      <div className="three-column">
        <article className="panel inset-panel">
          <h3>Progress tracker</h3>
          <p><strong>{completed.length}</strong> of <strong>{progressChecklist.length}</strong> milestones complete</p>
          <p className="muted">Current completion: {completionRate}%</p>
        </article>
        <article className="panel inset-panel">
          <h3>Recruiter signal</h3>
          <p>What gets interviews is not only knowledge. It is visible projects, clear explanations, and proof you can ship and debug.</p>
        </article>
        <article className="panel inset-panel">
          <h3>Execution rule</h3>
          <p>Finish lessons, build one capstone deeply, practice SQL and coding daily, and rehearse spoken answers.</p>
        </article>
      </div>

      <div className="panel inset-panel">
        <h3>Learner profile</h3>
        <div className="control-grid">
          <label>
            Display name
            <input className="text-input" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
          </label>
          <label>
            Local learner key
            <input className="text-input" value={learnerKey} readOnly />
          </label>
        </div>
        {loading ? <p className="muted">Loading persistent progress from Postgres...</p> : null}
        {error ? <p className="error-text">{error}</p> : null}
      </div>

      <div className="panel inset-panel">
        <h3>Progress checklist</h3>
        <div className="checklist-grid">
          {progressChecklist.map((item) => {
            const checked = completed.includes(item);
            return (
              <label key={item} className={`checklist-item ${checked ? "checked" : ""}`}>
                <input type="checkbox" checked={checked} onChange={() => toggleItem(item)} />
                <span>{item}</span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="panel inset-panel">
        <h3>Recent coding attempts</h3>
        <div className="qa-grid">
          {recentAttempts.map((attempt, index) => (
            <article key={`${attempt.problem_id}-${attempt.created_at}-${index}`} className="panel inset-panel">
              <h3>{attempt.problem_id}</h3>
              <p><strong>Language:</strong> {attempt.language}</p>
              <p><strong>Mode:</strong> {attempt.execution_mode}</p>
              <p><strong>Status:</strong> {attempt.status}</p>
              <p><strong>Score:</strong> {attempt.passed_count ?? 0} / {attempt.total_count ?? 0}</p>
              <p className="muted">{new Date(attempt.created_at).toLocaleString()}</p>
            </article>
          ))}
          {recentAttempts.length === 0 ? <p className="muted">No saved attempts yet. Run coding problems to start building history.</p> : null}
        </div>
      </div>

      <div className="panel inset-panel">
        <h3>30-day placement-focused study plan</h3>
        <div className="qa-grid">
          {studyPlan.map((day) => (
            <article key={day.day} className="panel inset-panel">
              <p className="eyebrow">Day {day.day}</p>
              <h3>{day.title}</h3>
              <p><strong>Focus:</strong> {day.focus}</p>
              <p><strong>Tasks:</strong> {day.tasks.join(" | ")}</p>
              <p className="muted"><strong>Outcome:</strong> {day.outcome}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="panel inset-panel">
        <h3>Resume-grade capstone projects</h3>
        <div className="project-grid">
          {capstoneProjects.map((project) => (
            <article key={project.title} className="panel inset-panel">
              <h3>{project.title}</h3>
              <p><strong>Goal:</strong> {project.goal}</p>
              <p><strong>Stack:</strong> {project.stack.join(", ")}</p>
              <p><strong>Deliverables:</strong> {project.deliverables.join(" | ")}</p>
              <p><strong>Evaluation:</strong> {project.evaluation.join(" | ")}</p>
              <p className="muted"><strong>Recruiter-facing pitch:</strong> {project.recruiterPitch}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SqlInterviewPrep() {
  const [sqlDifficulty, setSqlDifficulty] = React.useState("All");
  const [sqlCompany, setSqlCompany] = React.useState("All");
  const [sqlAnswerIndex, setSqlAnswerIndex] = React.useState<number | null>(null);
  const [loadedSqlQuery, setLoadedSqlQuery] = React.useState(sqlPracticeChallenges[0].answer);
  const sqlCompanies = React.useMemo(
    () => ["All", ...Array.from(new Set(sqlPracticeChallenges.flatMap((challenge) => challenge.companies)))],
    [],
  );
  const filteredSqlChallenges = React.useMemo(
    () =>
      sqlPracticeChallenges.filter(
        (challenge) =>
          (sqlDifficulty === "All" || challenge.difficulty === sqlDifficulty.toLowerCase()) &&
          (sqlCompany === "All" || challenge.companies.includes(sqlCompany)),
      ),
    [sqlCompany, sqlDifficulty],
  );

  return (
    <section className="panel">
      <div className="three-column">
        <article className="panel inset-panel">
          <h3>Question bank size</h3>
          <p><strong>{sqlInterviewCards.length}</strong> SQL theory and explanation cards.</p>
        </article>
        <article className="panel inset-panel">
          <h3>Practice challenge count</h3>
          <p><strong>{filteredSqlChallenges.length}</strong> predominantly asked SQL query challenges in the current filter.</p>
        </article>
        <article className="panel inset-panel">
          <h3>Best use</h3>
          <p>Review the question bank, then solve the challenge prompts in the live SQL playground below.</p>
        </article>
      </div>
      <QuestionBank
        title="SQL Interview Preparation"
        eyebrow="SQL Prep"
        description="Practice the database questions that show up in data analyst, ML, AI engineering, and backend-heavy interviews."
        cards={sqlInterviewCards}
        categories={["All", "SQL Basics", "Querying", "Design", "Performance", "NULLs", "Advanced"]}
        spotlight={[
          "Know joins, grouping, and window functions cold.",
          "Always mention NULL behavior when relevant.",
          "For query questions, explain both logic and edge cases like ties or duplicates.",
        ]}
        track="sql"
      />
      <section className="panel inset-panel">
        <div className="section-heading">
          <div>
            <p className="eyebrow">SQL Coding Questions</p>
            <h3>15 common SQL interview challenges</h3>
            <p className="muted">These are the types of query-writing prompts that repeatedly show up in data and ML interviews.</p>
          </div>
        </div>
        <div className="control-grid">
          <label>
            Challenge difficulty
            <select value={sqlDifficulty} onChange={(event) => setSqlDifficulty(event.target.value)}>
              {["All", "Easy", "Medium", "Hard"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            Company-style set
            <select value={sqlCompany} onChange={(event) => setSqlCompany(event.target.value)}>
              {sqlCompanies.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="qa-grid">
          {filteredSqlChallenges.map((challenge, index) => (
            <article key={challenge.title} className="panel inset-panel">
              <p className="eyebrow">Challenge {index + 1}</p>
              <h3>{challenge.title}</h3>
              <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
              <p><strong>Company-style sets:</strong> {challenge.companies.join(", ")}</p>
              <p><strong>Prompt:</strong> {challenge.prompt}</p>
              <p><strong>Tables:</strong> {challenge.tables}</p>
              <p className="muted"><strong>Approach hint:</strong> {challenge.hint}</p>
              <div className="prompt-grid">
                <button className="primary-button secondary-button" onClick={() => setLoadedSqlQuery(challenge.answer)}>
                  Load answer in playground
                </button>
                <button
                  className="primary-button"
                  onClick={() =>
                    setSqlAnswerIndex((current) => (current === index ? null : index))
                  }
                >
                  {sqlAnswerIndex === index ? "Hide solution" : "Reveal solution"}
                </button>
              </div>
              {sqlAnswerIndex === index ? <pre className="code-block">{challenge.answer}</pre> : null}
            </article>
          ))}
        </div>
      </section>
      <SqlPlayground initialQuery={loadedSqlQuery} />
    </section>
  );
}

export function CodingInterviewPrep() {
  const [language, setLanguage] = React.useState<"python" | "cpp">("python");
  const [difficultyFilter, setDifficultyFilter] = React.useState("All");
  const [patternFilter, setPatternFilter] = React.useState("All");
  const [companyFilter, setCompanyFilter] = React.useState("All");
  const [trackFilter, setTrackFilter] = React.useState("All");
  const [recentAttempts, setRecentAttempts] = React.useState<
    Array<{ problem_id: string; status: string; passed_count: number | null; total_count: number | null }>
  >([]);
  const availablePatterns = React.useMemo(
    () => ["All", ...Array.from(new Set(codingProblems.map((problem) => problem.pattern)))],
    [],
  );
  const availableCompanies = React.useMemo(
    () => ["All", ...Array.from(new Set(codingProblems.flatMap((problem) => problem.companies)))],
    [],
  );
  const availableTracks = React.useMemo(
    () => ["All", ...Array.from(new Set(codingProblems.flatMap((problem) => problem.tracks)))],
    [],
  );
  const filteredProblemCount = codingProblems.filter(
    (problem) =>
      (difficultyFilter === "All" || problem.difficulty === difficultyFilter.toLowerCase()) &&
      (patternFilter === "All" || problem.pattern === patternFilter) &&
      (companyFilter === "All" || problem.companies.includes(companyFilter)) &&
      (trackFilter === "All" || problem.tracks.includes(trackFilter)),
  ).length;

  React.useEffect(() => {
    fetch("/api/attempts?learnerKey=local-student&limit=100")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data.attempts)) {
          setRecentAttempts(data.attempts);
        }
      })
      .catch(() => {
        // Non-blocking; coding practice still works without history.
      });
  }, []);

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Coding Prep</p>
          <h2>Programming Interview Preparation</h2>
          <p className="muted">Covers a larger FAANG-style Python and C++ problem bank across the core interview patterns, with approaches and reference solutions.</p>
        </div>
      </div>

      <div className="prompt-grid">
        <button className={`chip action-chip ${language === "python" ? "selected" : ""}`} onClick={() => setLanguage("python")}>
          Python
        </button>
        <button className={`chip action-chip ${language === "cpp" ? "selected" : ""}`} onClick={() => setLanguage("cpp")}>
          C++
        </button>
      </div>

      <div className="three-column">
        {[
          `${language === "python" ? pythonInterviewCards.length : cppInterviewCards.length} interview theory cards available.`,
          `${filteredProblemCount} coding problems available in the Judge0-backed runner.`,
          `${companyFilter === "All" ? "General practice" : companyFilter} | ${trackFilter === "All" ? "All tracks" : trackFilter}`,
        ].map((tip, index) => (
          <article key={`${tip}-${index}`} className="panel inset-panel">
            <h3>Interview habit</h3>
            <p>{tip}</p>
          </article>
        ))}
      </div>

      <div className="control-grid">
        <label>
          Difficulty filter
          <select value={difficultyFilter} onChange={(event) => setDifficultyFilter(event.target.value)}>
            {["All", "easy", "medium", "hard"].map((item) => (
              <option key={item} value={item}>
                {item === "All" ? item : item[0].toUpperCase() + item.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label>
          Pattern filter
          <select value={patternFilter} onChange={(event) => setPatternFilter(event.target.value)}>
            {availablePatterns.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          Company-style set
          <select value={companyFilter} onChange={(event) => setCompanyFilter(event.target.value)}>
            {availableCompanies.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
        <label>
          Curated track
          <select value={trackFilter} onChange={(event) => setTrackFilter(event.target.value)}>
            {availableTracks.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <QuestionBank
        title={language === "python" ? "Python Interview Bank" : "C++ Interview Bank"}
        eyebrow={language === "python" ? "Python" : "C++"}
        description={
          language === "python"
            ? "Python questions focus on containers, generators, copying, complexity, and common coding patterns."
            : "C++ questions focus on memory, RAII, references, OOP basics, STL containers, and modern C++ ideas."
        }
        cards={language === "python" ? pythonInterviewCards : cppInterviewCards}
        categories={
          language === "python"
            ? ["All", "Python Basics", "Python Coding", "Python Debugging"]
            : ["All", "C++ Basics", "C++ OOP", "C++ Modern", "C++ Coding", "C++ Complexity"]
        }
        track={language === "python" ? "python" : "cpp"}
      />
      <CodingPlayground
        language={language}
        difficultyFilter={difficultyFilter}
        patternFilter={patternFilter}
        companyFilter={companyFilter}
        trackFilter={trackFilter}
        recentAttempts={recentAttempts}
      />
    </section>
  );
}

function QuestionBank({
  title,
  eyebrow,
  description,
  cards,
  categories,
  showQuiz = false,
  spotlight = [],
  track,
}: {
  title: string;
  eyebrow: string;
  description: string;
  cards: InterviewCard[];
  categories: string[];
  showQuiz?: boolean;
  spotlight?: string[];
  track: "aiml" | "sql" | "python" | "cpp";
}) {
  const [category, setCategory] = React.useState("All");
  const [query, setQuery] = React.useState("");
  const [index, setIndex] = React.useState(0);
  const [showAnswer, setShowAnswer] = React.useState(false);
  const [quizMode, setQuizMode] = React.useState(false);
  const [score, setScore] = React.useState({ correct: 0, attempts: 0 });

  const filteredCards = React.useMemo(() => {
    return cards.filter((card) => {
      const categoryMatch = category === "All" || card.category === category;
      const queryMatch =
        !query.trim() ||
        [card.question, card.answer, card.explanation, card.tags.join(" "), card.category]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase());

      return categoryMatch && queryMatch;
    });
  }, [cards, category, query]);

  React.useEffect(() => {
    setIndex(0);
    setShowAnswer(false);
  }, [category, query]);

  const currentCard = filteredCards[index] ?? null;
  const support = currentCard ? getConceptSupport(currentCard, track) : null;

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <p className="muted">{description}</p>
        </div>
      </div>

      {spotlight.length > 0 ? (
        <div className="three-column">
          {spotlight.map((item) => (
            <article key={item} className="panel inset-panel">
              <h3>What to remember</h3>
              <p>{item}</p>
            </article>
          ))}
        </div>
      ) : null}

      <div className="control-grid">
        <label>
          Search questions
          <input
            className="text-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by concept, keyword, or tag"
          />
        </label>
        <label>
          Filter by category
          <select value={category} onChange={(event) => setCategory(event.target.value)}>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      {showQuiz ? (
        <div className="prompt-grid">
          <button className={`chip action-chip ${!quizMode ? "selected" : ""}`} onClick={() => setQuizMode(false)}>
            Study mode
          </button>
          <button className={`chip action-chip ${quizMode ? "selected" : ""}`} onClick={() => setQuizMode(true)}>
            Quiz mode
          </button>
        </div>
      ) : null}

      <div className="panel inset-panel flashcard">
        <p className="eyebrow">
          {filteredCards.length === 0 ? "No matches" : `Question ${index + 1} / ${filteredCards.length}`}
        </p>
        {quizMode ? <p className="muted">Score: {score.correct} / {score.attempts}</p> : null}
        {currentCard ? (
          <>
            <h3>{currentCard.question}</h3>
            <p className="muted">Category: {currentCard.category}</p>
            <div className="hero-chip-row">
              {currentCard.tags.map((tag) => (
                <span key={tag} className="chip">
                  {tag}
                </span>
              ))}
            </div>
            {showAnswer ? (
              <div className="message-stack">
                <article className="message-card assistant">
                  <strong>Detailed answer</strong>
                  <p>{currentCard.answer}</p>
                </article>
                <article className="message-card citation">
                  <strong>Explain like interviewer asked me</strong>
                  <p>{currentCard.spokenAnswer}</p>
                </article>
                <article className="message-card user">
                  <strong>Why this question matters</strong>
                  <p>{currentCard.explanation}</p>
                </article>
              </div>
            ) : (
              <p className="muted">
                {quizMode
                  ? "Try answering out loud first, then reveal the explanation."
                  : "Reveal the detailed answer, spoken answer, and why this question matters."}
              </p>
            )}
          </>
        ) : (
          <p className="muted">No questions matched the current filter.</p>
        )}
      </div>

      {support ? (
        <div className="three-column">
          <article className="panel inset-panel">
            <h3>1. Example</h3>
            <p>{support.example}</p>
          </article>
          <article className="panel inset-panel">
            <h3>2. Sample App</h3>
            <p><strong>{support.sampleApp.title}</strong></p>
            <p>{support.sampleApp.description}</p>
            <p className="muted">How to explain it: {support.sampleApp.explain}</p>
          </article>
          <article className="panel inset-panel">
            <h3>3. Playground</h3>
            <p><strong>{support.playground.title}</strong></p>
            <p>{support.playground.description}</p>
            <p className="muted">Try this in the repo: {support.playground.tryHere}</p>
          </article>
        </div>
      ) : null}

      <div className="prompt-grid">
        <button
          className="primary-button secondary-button"
          onClick={() => setIndex((current) => (filteredCards.length ? (current - 1 + filteredCards.length) % filteredCards.length : 0))}
          disabled={filteredCards.length === 0}
        >
          Previous
        </button>
        <button className="primary-button" onClick={() => setShowAnswer((current) => !current)} disabled={!currentCard}>
          {showAnswer ? "Hide answer" : "Show answer"}
        </button>
        <button
          className="primary-button secondary-button"
          onClick={() => setIndex((current) => (filteredCards.length ? (current + 1) % filteredCards.length : 0))}
          disabled={filteredCards.length === 0}
        >
          Next
        </button>
        {quizMode ? (
          <>
            <button
              className="primary-button"
              onClick={() =>
                setScore((current) => ({
                  correct: current.correct + 1,
                  attempts: current.attempts + 1,
                }))
              }
              disabled={!currentCard}
            >
              Mark correct
            </button>
            <button
              className="primary-button secondary-button"
              onClick={() =>
                setScore((current) => ({
                  correct: current.correct,
                  attempts: current.attempts + 1,
                }))
              }
              disabled={!currentCard}
            >
              Mark incorrect
            </button>
          </>
        ) : null}
      </div>

      <div className="qa-grid">
        {filteredCards.map((card) => (
          <article key={`${card.category}-${card.question}`} className="panel inset-panel">
            <p className="eyebrow">{card.category}</p>
            <h3>{card.question}</h3>
            <p>{card.spokenAnswer}</p>
            <p className="muted">{card.explanation}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function SqlPlayground({ initialQuery }: { initialQuery?: string }) {
  const [query, setQuery] = React.useState(initialQuery ?? sqlPresetQueries[0].query);
  const [result, setResult] = React.useState<{ columns: string[]; rows: Record<string, unknown>[]; rowCount: number } | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }, [initialQuery]);

  async function runQuery() {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/sql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "SQL query failed");
      }
      setResult(data);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unknown SQL error");
      setResult(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="panel inset-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">SQL Playground App</p>
          <h3>Run local SQL against Docker Postgres</h3>
          <p className="muted">The playground uses seeded student, course, and grade tables. Queries are restricted to read-only SELECT and WITH statements.</p>
        </div>
      </div>
      <div className="prompt-grid">
        {sqlPresetQueries.map((preset) => (
          <button key={preset.label} className="chip action-chip" onClick={() => setQuery(preset.query)}>
            {preset.label}
          </button>
        ))}
      </div>
      <textarea className="text-area code-area" value={query} onChange={(event) => setQuery(event.target.value)} />
      <button className="primary-button" onClick={runQuery} disabled={loading}>
        {loading ? "Running query..." : "Run SQL"}
      </button>
      {error ? <p className="error-text">{error}</p> : null}
      <div className="formula-box">
        <p><strong>Seeded tables:</strong> students, courses, grades</p>
        <p><strong>Local support container:</strong> `postgres` + optional `adminer` at `http://localhost:8080`</p>
      </div>
      {result ? (
        <div className="table-wrap">
          <p className="muted">Rows returned: {result.rowCount}</p>
          <table className="data-table">
            <thead>
              <tr>
                {result.columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {result.columns.map((column) => (
                    <td key={`${rowIndex}-${column}`}>{String(row[column] ?? "NULL")}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  );
}

function CodingPlayground({
  language,
  difficultyFilter,
  patternFilter,
  companyFilter,
  trackFilter,
  recentAttempts,
}: {
  language: SupportedCodingLanguage;
  difficultyFilter: string;
  patternFilter: string;
  companyFilter: string;
  trackFilter: string;
  recentAttempts: Array<{ problem_id: string; status: string; passed_count: number | null; total_count: number | null }>;
}) {
  const learnerKey = "local-student";
  const filteredProblems = React.useMemo(
    () =>
      codingProblems.filter(
        (problem) =>
          (difficultyFilter === "All" || problem.difficulty === difficultyFilter) &&
          (patternFilter === "All" || problem.pattern === patternFilter) &&
          (companyFilter === "All" || problem.companies.includes(companyFilter)) &&
          (trackFilter === "All" || problem.tracks.includes(trackFilter)),
      ),
    [companyFilter, difficultyFilter, patternFilter, trackFilter],
  );
  const [problemId, setProblemId] = React.useState(filteredProblems[0]?.id ?? codingProblems[0].id);
  const template = React.useMemo(() => getTemplate(problemId, language), [problemId, language]);
  const currentProblem = React.useMemo(
    () => filteredProblems.find((problem) => problem.id === problemId) ?? filteredProblems[0] ?? codingProblems[0],
    [filteredProblems, problemId],
  );
  const solvedProblemIds = React.useMemo(() => {
    return new Set(
      recentAttempts
        .filter((attempt) => {
          if (attempt.total_count && attempt.passed_count !== null) {
            return attempt.passed_count === attempt.total_count;
          }
          return attempt.status.toLowerCase() === "accepted";
        })
        .map((attempt) => attempt.problem_id),
    );
  }, [recentAttempts]);
  const [code, setCode] = React.useState(template?.starterCode ?? "");
  const [customInput, setCustomInput] = React.useState(currentProblem.sampleTestcases[0]?.input ?? "");
  const [sampleResult, setSampleResult] = React.useState<{
    summary: { total: number; passed: number };
    results: Array<{
      token: string;
      status: string;
      passed: boolean;
      stdout: string;
      stderr: string;
      compileOutput: string;
      input: string;
      expectedOutput: string;
      explanation?: string;
    }>;
  } | null>(null);
  const [customRunResult, setCustomRunResult] = React.useState<{
    token: string;
    status: string;
    stdout: string;
    stderr: string;
    compileOutput: string;
  } | null>(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState<"" | "sample" | "custom">("");

  React.useEffect(() => {
    if (filteredProblems.length > 0 && !filteredProblems.some((problem) => problem.id === problemId)) {
      setProblemId(filteredProblems[0].id);
    }
  }, [filteredProblems, problemId]);

  React.useEffect(() => {
    setCode(template?.starterCode ?? "");
    setCustomInput(currentProblem.sampleTestcases[0]?.input ?? "");
    setSampleResult(null);
    setCustomRunResult(null);
  }, [template, currentProblem]);

  async function runSampleTests() {
    if (!template) {
      return;
    }

    setLoading("sample");
    setError("");
    setCustomRunResult(null);
    try {
      const response = await fetch("/api/code/run-sample", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          languageId: template.judge0LanguageId,
          sourceCode: code,
          testcases: currentProblem.sampleTestcases,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Sample testcase run failed");
      }
      setSampleResult(data);
      void saveAttempt({
        learnerKey,
        problemId: currentProblem.id,
        language,
        executionMode: "sample-tests",
        sourceCode: code,
        stdin: currentProblem.sampleTestcases.map((item) => item.input).join("\n---\n"),
        status: `${data.summary.passed}/${data.summary.total} passed`,
        passedCount: data.summary.passed,
        totalCount: data.summary.total,
        stdout: data.results.map((item: { stdout: string }) => item.stdout).join("\n---\n"),
        stderr: data.results.map((item: { stderr: string }) => item.stderr).join("\n---\n"),
        compileOutput: data.results.map((item: { compileOutput: string }) => item.compileOutput).join("\n---\n"),
      });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unknown Judge0 error");
      setSampleResult(null);
    } finally {
      setLoading("");
    }
  }

  async function runCustomInput() {
    if (!template) {
      return;
    }

    setLoading("custom");
    setError("");
    setSampleResult(null);
    try {
      const submitResponse = await fetch("/api/code/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          languageId: template.judge0LanguageId,
          sourceCode: code,
          stdin: customInput,
        }),
      });
      const submission = await submitResponse.json();
      if (!submitResponse.ok) {
        throw new Error(submission.error ?? "Code submission failed");
      }

      const resultResponse = await fetch(`/api/code/result/${submission.token}`);
      const result = await resultResponse.json();
      if (!resultResponse.ok) {
        throw new Error(result.error ?? "Result polling failed");
      }

      setCustomRunResult(result);
      void saveAttempt({
        learnerKey,
        problemId: currentProblem.id,
        language,
        executionMode: "custom-input",
        sourceCode: code,
        stdin: customInput,
        status: result.status,
        passedCount: null,
        totalCount: null,
        stdout: result.stdout ?? "",
        stderr: result.stderr ?? "",
        compileOutput: result.compileOutput ?? "",
      });
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unknown Judge0 error");
      setCustomRunResult(null);
    } finally {
      setLoading("");
    }
  }

  async function saveAttempt(payload: {
    learnerKey: string;
    problemId: string;
    language: string;
    executionMode: string;
    sourceCode: string;
    stdin: string;
    status: string;
    passedCount: number | null;
    totalCount: number | null;
    stdout: string;
    stderr: string;
    compileOutput: string;
  }) {
    // The app stores business-level attempt history in Postgres so progress,
    // review, and future AI feedback stay independent of the execution engine.
    try {
      await fetch("/api/attempts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
    } catch {
      // Attempt logging should not block the learning experience.
    }
  }

  return (
    <section className="panel inset-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Coding Playground App</p>
          <h3>Judge0-backed coding runner</h3>
          <p className="muted">
            Use starter templates, sample testcases, and custom input runs. The app owns the business logic while Judge0 acts as the isolated execution backend.
          </p>
        </div>
      </div>

      <div className="control-grid">
        <label>
          Practice problem
            <select value={problemId} onChange={(event) => setProblemId(event.target.value)}>
            {filteredProblems.map((problem) => (
              <option key={problem.id} value={problem.id}>
                {solvedProblemIds.has(problem.id) ? "[Solved] " : "[Unsolved] "} {problem.title}
              </option>
            ))}
          </select>
        </label>
        <label>
          Language
          <input className="text-input" value={template?.label ?? "Unknown"} readOnly />
        </label>
      </div>

      <div className="three-column">
        <article className="panel inset-panel">
          <h3>Problem</h3>
          <p>{currentProblem.description}</p>
          <p className="muted">Difficulty: {currentProblem.difficulty}</p>
          <p className="muted">Status: {solvedProblemIds.has(currentProblem.id) ? "Solved" : "Unsolved"}</p>
        </article>
        <article className="panel inset-panel">
          <h3>Pattern + concepts</h3>
          <p><strong>Pattern:</strong> {currentProblem.pattern}</p>
          <p>{currentProblem.concepts.join(", ")}</p>
          <p><strong>Company-style sets:</strong> {currentProblem.companies.join(", ")}</p>
          <p><strong>Curated tracks:</strong> {currentProblem.tracks.join(", ")}</p>
        </article>
        <article className="panel inset-panel">
          <h3>Extension point</h3>
          <p>Store submissions, score them, and attach AI feedback later without changing the Judge0 contract.</p>
        </article>
      </div>

      <div className="panel inset-panel">
        <h3>How to approach this problem</h3>
        <div className="qa-grid">
          {currentProblem.approach.map((step, index) => (
            <article key={`${currentProblem.id}-approach-${index}`} className="panel inset-panel">
              <p className="eyebrow">Step {index + 1}</p>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="panel inset-panel">
        <h3>Hidden testcase themes</h3>
        <div className="qa-grid">
          {currentProblem.hiddenTestcaseGroups.map((group) => (
            <article key={`${currentProblem.id}-${group.label}`} className="panel inset-panel">
              <h3>{group.label}</h3>
              <p>{group.focus}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="two-column">
        <div className="panel inset-panel">
          <h3>Starter code</h3>
          <textarea className="text-area code-area" value={code} onChange={(event) => setCode(event.target.value)} />
          <div className="prompt-grid">
            <button className="primary-button secondary-button" onClick={() => setCode(template?.starterCode ?? "")}>
              Reset template
            </button>
            <button className="primary-button secondary-button" onClick={() => setCode(template?.referenceSolution ?? "")}>
              Load reference solution
            </button>
            <button className="primary-button" onClick={runSampleTests} disabled={loading !== "" || !template}>
              {loading === "sample" ? "Running sample tests..." : "Run sample tests"}
            </button>
          </div>
        </div>

        <div className="panel inset-panel">
          <h3>Custom input runner</h3>
          <textarea className="text-area code-area" value={customInput} onChange={(event) => setCustomInput(event.target.value)} />
          <div className="prompt-grid">
            <button className="primary-button" onClick={runCustomInput} disabled={loading !== "" || !template}>
              {loading === "custom" ? "Executing..." : "Run custom input"}
            </button>
          </div>
          <div className="formula-box">
            <p><strong>Execution path:</strong> app API -&gt; Judge0 submit -&gt; poll result -&gt; normalized response</p>
            <p><strong>Provider swap ready:</strong> the app calls its own API routes, not Judge0 directly from the browser.</p>
          </div>
        </div>
      </div>

      {error ? <p className="error-text">{error}</p> : null}

      {sampleResult ? (
        <div className="panel inset-panel">
          <h3>Sample testcase evaluation</h3>
          <p className="muted">
            Passed {sampleResult.summary.passed} / {sampleResult.summary.total}
          </p>
          <div className="qa-grid">
            {sampleResult.results.map((item, index) => (
              <article key={`${item.token}-${index}`} className="panel inset-panel">
                <h3>Sample {index + 1}</h3>
                <p><strong>Status:</strong> {item.status}</p>
                <p><strong>Passed:</strong> {item.passed ? "Yes" : "No"}</p>
                <p><strong>Input:</strong> {JSON.stringify(item.input)}</p>
                <p><strong>Expected:</strong> {JSON.stringify(item.expectedOutput)}</p>
                <p><strong>Output:</strong> {JSON.stringify(item.stdout)}</p>
                {item.stderr ? <p><strong>stderr:</strong> {item.stderr}</p> : null}
                {item.compileOutput ? <p><strong>compile output:</strong> {item.compileOutput}</p> : null}
                {item.explanation ? <p className="muted">{item.explanation}</p> : null}
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <div className="panel inset-panel">
        <h3>Reference solution walkthrough</h3>
        <pre className="code-block">{template?.referenceSolution ?? "No solution available."}</pre>
      </div>

      {customRunResult ? (
        <div className="panel inset-panel">
          <h3>Custom run result</h3>
          <p><strong>Status:</strong> {customRunResult.status}</p>
          <p><strong>stdout:</strong> {customRunResult.stdout || "(empty)"}</p>
          {customRunResult.stderr ? <p><strong>stderr:</strong> {customRunResult.stderr}</p> : null}
          {customRunResult.compileOutput ? <p><strong>compile output:</strong> {customRunResult.compileOutput}</p> : null}
        </div>
      ) : null}
    </section>
  );
}

function getConceptSupport(card: InterviewCard, track: "aiml" | "sql" | "python" | "cpp") {
  if (track === "sql") {
    return {
      example: `Interview example: ${card.question} can be answered with a small student-and-grades analytics example using joins, grouping, or windows.`,
      sampleApp: {
        title: "Campus Performance Dashboard",
        description:
          "A tiny analytics app that reads students, courses, and grades from Postgres and shows top performers, pass counts, and ranking queries.",
        explain: "Say that the app demonstrates joins, aggregations, ranking, and read-only analytics queries over relational data.",
      },
      playground: {
        title: "Live SQL Runner",
        description: "Use the local Postgres playground below with seeded tables and preset queries.",
        tryHere: "SQL Interview Prep -> SQL Playground App",
      },
    };
  }

  if (track === "python") {
    return {
      example: `Example: ${card.question} often appears in a small coding problem where you transform input data and explain time complexity.`,
      sampleApp: {
        title: "Text Frequency Analyzer",
        description:
          "A small Python utility that counts tokens in local notes, which is useful for preprocessing and hash-map reasoning.",
        explain: "Say that it shows dictionaries, counting, input cleaning, and complexity analysis in a compact way.",
      },
      playground: {
        title: "Python Trace Playground",
        description: "Use the local word-frequency playground below to connect hash-map logic to code.",
        tryHere: "Coding Prep -> Python trace playground",
      },
    };
  }

  if (track === "cpp") {
    return {
      example: `Example: ${card.question} often becomes a short systems-style explanation plus a small array or memory-management coding task.`,
      sampleApp: {
        title: "Binary Search Tutor",
        description:
          "A compact C++ console app that explains arrays, indices, references, and complexity through a binary-search example.",
        explain: "Say that it shows clean function design, STL use, and clear O(log n) reasoning.",
      },
      playground: {
        title: "C++ Binary Search Trace",
        description: "Use the local trace playground below to see left, right, and mid change step by step.",
        tryHere: "Coding Prep -> C++ trace playground",
      },
    };
  }

  return {
    example: `Example: ${card.question} should be answered with a small concrete case, such as predicting student scores, ranking documents, or reducing spam.`,
    sampleApp: {
      title: inferAiSampleApp(card.tags),
      description: inferAiAppDescription(card.tags),
      explain: inferAiInterviewPitch(card.tags),
    },
    playground: {
      title: inferAiPlayground(card.tags),
      description: "This repo already includes a matching interactive section so the student can move from theory to behavior immediately.",
      tryHere: inferAiPlaygroundLocation(card.tags),
    },
  };
}

function inferAiSampleApp(tags: string[]) {
  if (tags.includes("rag") || tags.includes("mcp") || tags.includes("agent")) {
    return "Local AI Assistant with Retrieval";
  }
  if (tags.includes("naive bayes") || tags.includes("classification")) {
    return "Spam Email Classifier";
  }
  if (tags.includes("pca") || tags.includes("clt") || tags.includes("probability")) {
    return "Student Analytics Explorer";
  }
  return "Student Score Predictor";
}

function inferAiAppDescription(tags: string[]) {
  if (tags.includes("rag") || tags.includes("mcp") || tags.includes("agent")) {
    return "A local Ollama app that retrieves notes, optionally uses tools, and answers with grounded context.";
  }
  if (tags.includes("naive bayes") || tags.includes("classification")) {
    return "A toy text-classification app that predicts spam from simple word features.";
  }
  if (tags.includes("pca") || tags.includes("clt") || tags.includes("probability")) {
    return "A small dashboard that visualizes averages, distributions, and dimensionality reduction on student data.";
  }
  return "A simple regression app that predicts student performance from study features.";
}

function inferAiInterviewPitch(tags: string[]) {
  if (tags.includes("rag") || tags.includes("mcp") || tags.includes("agent")) {
    return "Explain how retrieval, tool use, and structured context reduce hallucination and make the system more reliable.";
  }
  if (tags.includes("naive bayes") || tags.includes("classification")) {
    return "Explain features, labels, probabilities, and how evaluation changes with precision and recall.";
  }
  if (tags.includes("pca") || tags.includes("clt") || tags.includes("probability")) {
    return "Explain uncertainty, spread, and how reducing dimensions can help visualization or simplify modeling.";
  }
  return "Explain features, labels, loss, gradient descent, and how the model improves over epochs.";
}

function inferAiPlayground(tags: string[]) {
  if (tags.includes("rag") || tags.includes("mcp") || tags.includes("agent")) {
    return "Local GenAI / RAG Playground";
  }
  if (tags.includes("pca") || tags.includes("clt") || tags.includes("probability")) {
    return "Probability + Statistics Playground";
  }
  if (tags.includes("neuron") || tags.includes("backprop")) {
    return "Neural Network Playground";
  }
  return "ML Fundamentals Playground";
}

function inferAiPlaygroundLocation(tags: string[]) {
  if (tags.includes("rag") || tags.includes("mcp") || tags.includes("agent")) {
    return "GenAI, MCP, and Agents modules";
  }
  if (tags.includes("pca") || tags.includes("clt") || tags.includes("probability")) {
    return "Probability + Statistics module";
  }
  if (tags.includes("neuron") || tags.includes("backprop")) {
    return "Neural Networks module";
  }
  return "Loss + Gradient and Classic ML modules";
}

export function MiniProjectsSection() {
  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Mini Projects</p>
          <h2>Beginner project blueprints</h2>
          <p className="muted">Use these to turn concepts into portfolio-ready stories.</p>
        </div>
      </div>
      <div className="project-grid">
        {miniProjects.map((project) => (
          <article key={project.title} className="panel inset-panel">
            <h3>{project.title}</h3>
            <p><strong>Concept learned:</strong> {project.conceptLearned}</p>
            <p><strong>Architecture diagram:</strong> {project.architecture.join(" -> ")}</p>
            <p><strong>Folder structure:</strong> {project.folderStructure.join(" | ")}</p>
            <p><strong>Next steps:</strong> {project.nextSteps.join(" ")}</p>
            <p><strong>What to say in interview:</strong> {project.interviewPitch}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
