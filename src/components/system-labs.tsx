"use client";

import * as React from "react";

export function McpLab() {
  const [mode, setMode] = React.useState<"prompting" | "tool-calling" | "mcp">("mcp");
  const [selectedTool, setSelectedTool] = React.useState("weather");

  const tools = {
    weather: "Returns a fake weather report for campus.",
    calculator: "Evaluates study-hour math like 2 + 3 * 4.",
    notes: "Looks up saved notes about AI topics.",
  };

  const flowByMode = {
    prompting: ["User asks", "Model guesses from memory", "Answer returned"],
    "tool-calling": ["User asks", "Model decides a tool is useful", "Tool is called", "Answer returned"],
    mcp: ["User asks client", "Client discovers tool schema", "Structured MCP request", "Tool server response", "Model uses result", "Answer returned"],
  };

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Module 4</p>
          <h2>MCP Basics</h2>
          <p className="muted">Model = AI. Context = information it needs. Protocol = standard way to connect them safely and clearly.</p>
        </div>
      </div>

      <div className="three-column">
        <article className="panel inset-panel">
          <h3>Plain prompting</h3>
          <p>The model only sees your prompt. It cannot reliably use live tools unless the app adds them.</p>
        </article>
        <article className="panel inset-panel">
          <h3>Tool calling</h3>
          <p>The app lets the model request a tool, often with a custom function schema.</p>
        </article>
        <article className="panel inset-panel">
          <h3>MCP-style integration</h3>
          <p>The client and tool server use a standard contract, so discovery and invocation are more reusable.</p>
        </article>
      </div>

      <div className="two-column">
        <div className="panel inset-panel">
          <h3>Toy tool server</h3>
          <select value={selectedTool} onChange={(event) => setSelectedTool(event.target.value)}>
            {Object.keys(tools).map((tool) => (
              <option key={tool} value={tool}>
                {tool}
              </option>
            ))}
          </select>
          <div className="formula-box">
            <p>Discovered tool: <strong>{selectedTool}</strong></p>
            <p>Schema summary: {tools[selectedTool as keyof typeof tools]}</p>
            <p>Fake response: <strong>{selectedTool === "weather" ? "28°C and clear." : selectedTool === "calculator" ? "14 study-hours total." : "Found 3 notes about embeddings."}</strong></p>
          </div>
        </div>

        <div className="panel inset-panel">
          <h3>Client flow diagram</h3>
          <div className="prompt-grid">
            <button className={`chip action-chip ${mode === "prompting" ? "selected" : ""}`} onClick={() => setMode("prompting")}>
              Prompting
            </button>
            <button className={`chip action-chip ${mode === "tool-calling" ? "selected" : ""}`} onClick={() => setMode("tool-calling")}>
              Tool calling
            </button>
            <button className={`chip action-chip ${mode === "mcp" ? "selected" : ""}`} onClick={() => setMode("mcp")}>
              MCP
            </button>
          </div>
          <div className="flow-row">
            {flowByMode[mode].map((step) => (
              <div key={step} className="flow-node">
                {step}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function AgentsLab() {
  const [goal, setGoal] = React.useState("Plan a weekend study schedule");
  const [topic, setTopic] = React.useState("Transformers");

  const studyAgentTrace = [
    { label: "User goal", value: goal },
    { label: "Plan", value: "Split the weekend into review blocks, problem practice, break time, and interview revision." },
    { label: "Tool used", value: "Calculator: 2 days x 4 focused hours = 8 hours available." },
    { label: "Observation", value: "Neural networks and GenAI need more time than MCP revision." },
    { label: "Final answer", value: "Saturday: ML + NN. Sunday: GenAI + interview practice + recap." },
  ];

  const researchAgentTrace = [
    { label: "User goal", value: `Research ${topic} using retrieval + summarization` },
    { label: "Plan", value: "Retrieve notes, rank the relevant chunks, summarize the useful ones." },
    { label: "Tool used", value: "Notes lookup" },
    { label: "Observation", value: `${topic} is strongly connected to attention, token mixing, and long-context reasoning.` },
    { label: "Final answer", value: `${topic} can be explained as an architecture that uses attention to focus on relevant tokens while producing outputs.` },
  ];

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Module 5</p>
          <h2>Agents Basics</h2>
          <p className="muted">An agent is more than a chatbot. It can plan, use tools, observe, retry, and continue until it reaches a goal.</p>
        </div>
      </div>

      <div className="concept-grid">
        <article className="concept-card">
          <h3>Planning</h3>
          <p>Break a large goal into smaller steps.</p>
        </article>
        <article className="concept-card">
          <h3>Memory</h3>
          <p>Keep important facts from earlier steps.</p>
        </article>
        <article className="concept-card">
          <h3>Tools</h3>
          <p>Use calculators, retrieval, or APIs instead of guessing.</p>
        </article>
        <article className="concept-card">
          <h3>Reflection / retry</h3>
          <p>Check the result and correct the next step if needed.</p>
        </article>
      </div>

      <div className="two-column">
        <div className="panel inset-panel">
          <h3>Agent demo 1: weekend study planner</h3>
          <input className="text-input" value={goal} onChange={(event) => setGoal(event.target.value)} />
          <div className="trace-list">
            {studyAgentTrace.map((item) => (
              <div key={item.label} className="trace-item">
                <strong>{item.label}</strong>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel inset-panel">
          <h3>Agent demo 2: retrieval + summarization</h3>
          <input className="text-input" value={topic} onChange={(event) => setTopic(event.target.value)} />
          <div className="trace-list">
            {researchAgentTrace.map((item) => (
              <div key={item.label} className="trace-item">
                <strong>{item.label}</strong>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
