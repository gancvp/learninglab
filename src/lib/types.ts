export type SectionId =
  | "dashboard"
  | "career"
  | "flagship"
  | "loss"
  | "stats"
  | "classic"
  | "neural"
  | "genai"
  | "mcp"
  | "agents"
  | "jargon"
  | "projects"
  | "interview"
  | "sql"
  | "coding";

export type OllamaSettings = {
  baseUrl: string;
  model: string;
  temperature: number;
};

export type GlossaryTerm = {
  term: string;
  definition: string;
  whyItMatters: string;
  example: string;
};

export type InterviewCard = {
  category: string;
  question: string;
  answer: string;
  spokenAnswer: string;
  explanation: string;
  tags: string[];
};

export type MiniProject = {
  title: string;
  conceptLearned: string;
  architecture: string[];
  folderStructure: string[];
  nextSteps: string[];
  interviewPitch: string;
};

export type CapstoneProject = {
  title: string;
  goal: string;
  stack: string[];
  deliverables: string[];
  evaluation: string[];
  recruiterPitch: string;
};

export type StudyPlanDay = {
  day: number;
  title: string;
  focus: string;
  tasks: string[];
  outcome: string;
};
