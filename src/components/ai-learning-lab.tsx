"use client";

import * as React from "react";
import { defaultOllamaSettings } from "@/lib/content";
import type { OllamaSettings, SectionId } from "@/lib/types";
import {
  DashboardSection,
  ClassicMlLab,
  LossGradientLab,
  NeuralNetworkLab,
  ProbabilityStatsLab,
} from "@/components/ml-labs";
import { FlagshipStudyAssistant, GenAiLab, JargonDictionary } from "@/components/genai-labs";
import { AgentsLab, McpLab } from "@/components/system-labs";
import {
  CareerLaunchLab,
  CodingInterviewPrep,
  InterviewPrep,
  MiniProjectsSection,
  SqlInterviewPrep,
} from "@/components/career-labs";

const sectionOrder: Array<{ id: SectionId; label: string }> = [
  { id: "dashboard", label: "Dashboard" },
  { id: "career", label: "Career Launch" },
  { id: "flagship", label: "Flagship Project" },
  { id: "loss", label: "Loss + Gradient" },
  { id: "stats", label: "Prob + Stats" },
  { id: "classic", label: "Classic ML" },
  { id: "neural", label: "Neural Nets" },
  { id: "genai", label: "GenAI" },
  { id: "mcp", label: "MCP" },
  { id: "agents", label: "Agents" },
  { id: "jargon", label: "Jargon" },
  { id: "projects", label: "Mini Projects" },
  { id: "interview", label: "AI/ML Interview" },
  { id: "sql", label: "SQL Prep" },
  { id: "coding", label: "Coding Prep" },
];

const storageKey = "ai-learning-lab-settings";

export function AiLearningLab() {
  const [activeSection, setActiveSection] = React.useState<SectionId>("dashboard");
  const [settings, setSettings] = React.useState<OllamaSettings>(defaultOllamaSettings);
  const [settingsOpen, setSettingsOpen] = React.useState(false);

  React.useEffect(() => {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      return;
    }
    try {
      setSettings(JSON.parse(saved));
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(settings));
  }, [settings]);

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Local-first study app</p>
          <h1>AI Learning Lab</h1>
          <p className="muted">A polished MVP for a final-year student preparing for entry-level AI/ML roles.</p>
        </div>
        <nav className="nav-list">
          {sectionOrder.map((section) => (
            <button
              key={section.id}
              className={`nav-button ${activeSection === section.id ? "active" : ""}`}
              onClick={() => setActiveSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </nav>
        <button className="primary-button" onClick={() => setSettingsOpen((current) => !current)}>
          {settingsOpen ? "Hide settings" : "Open settings"}
        </button>
        {settingsOpen ? (
          <div className="panel inset-panel settings-panel">
            <label>
              Ollama base URL
              <input
                className="text-input"
                value={settings.baseUrl}
                onChange={(event) => setSettings((current) => ({ ...current, baseUrl: event.target.value }))}
              />
            </label>
            <label>
              Model name
              <input
                className="text-input"
                value={settings.model}
                onChange={(event) => setSettings((current) => ({ ...current, model: event.target.value }))}
              />
            </label>
            <label>
              Temperature
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={settings.temperature}
                onChange={(event) =>
                  setSettings((current) => ({
                    ...current,
                    temperature: Number(event.target.value),
                  }))
                }
              />
              <span>{settings.temperature.toFixed(1)}</span>
            </label>
          </div>
        ) : null}
      </aside>

      <div className="content-area">
        <header className="topbar">
          <div>
            <p className="eyebrow">Learning workspace</p>
            <h2>{sectionOrder.find((section) => section.id === activeSection)?.label}</h2>
          </div>
          <div className="hero-chip-row">
            <span className="chip">Ollama: {settings.model}</span>
            <span className="chip">Temp: {settings.temperature.toFixed(1)}</span>
            <span className="chip">MVP but complete</span>
          </div>
        </header>

        <div className="section-stack">
          {activeSection === "dashboard" ? <DashboardSection onJump={(sectionId) => setActiveSection(sectionId as SectionId)} /> : null}
          {activeSection === "career" ? <CareerLaunchLab /> : null}
          {activeSection === "flagship" ? <FlagshipStudyAssistant settings={settings} /> : null}
          {activeSection === "loss" ? <LossGradientLab /> : null}
          {activeSection === "stats" ? <ProbabilityStatsLab /> : null}
          {activeSection === "classic" ? <ClassicMlLab /> : null}
          {activeSection === "neural" ? <NeuralNetworkLab /> : null}
          {activeSection === "genai" ? <GenAiLab settings={settings} /> : null}
          {activeSection === "mcp" ? <McpLab /> : null}
          {activeSection === "agents" ? <AgentsLab /> : null}
          {activeSection === "jargon" ? <JargonDictionary /> : null}
          {activeSection === "projects" ? <MiniProjectsSection /> : null}
          {activeSection === "interview" ? <InterviewPrep /> : null}
          {activeSection === "sql" ? <SqlInterviewPrep /> : null}
          {activeSection === "coding" ? <CodingInterviewPrep /> : null}
        </div>
      </div>
    </main>
  );
}
