import type {
  CapstoneProject,
  GlossaryTerm,
  InterviewCard,
  MiniProject,
  SectionId,
  StudyPlanDay,
} from "@/lib/types";

const question = (
  category: string,
  questionText: string,
  answer: string,
  spokenAnswer: string,
  explanation: string,
  tags: string[],
): InterviewCard => ({
  category,
  question: questionText,
  answer,
  spokenAnswer,
  explanation,
  tags,
});

export const defaultOllamaSettings = {
  baseUrl: process.env.NEXT_PUBLIC_OLLAMA_BASE_URL ?? "http://127.0.0.1:11434",
  model: process.env.NEXT_PUBLIC_OLLAMA_MODEL ?? "llama3.2:3b",
  temperature: Number(process.env.NEXT_PUBLIC_OLLAMA_TEMPERATURE ?? "0.3"),
};

export const sectionCards: Array<{
  id: SectionId;
  title: string;
  description: string;
  accent: string;
}> = [
  {
    id: "career",
    title: "Career Launch",
    description: "Progress tracking, 30-day study plan, capstone projects, and recruiter-facing guidance.",
    accent: "var(--accent-ink)",
  },
  {
    id: "flagship",
    title: "Flagship Project",
    description: "A persistent local AI Study Assistant with saved notes, retrieval, citations, and chat history.",
    accent: "var(--accent-mint)",
  },
  {
    id: "stats",
    title: "Probability + Statistics",
    description: "Probability, distributions, Bayes intuition, CLT, Naive Bayes, and PCA for interviews.",
    accent: "var(--accent-gold)",
  },
  {
    id: "classic",
    title: "Classic ML",
    description: "Features, labels, regression, scaling, and decision boundaries with toy datasets.",
    accent: "var(--accent-coral)",
  },
  {
    id: "neural",
    title: "Neural Networks",
    description: "Tiny network, forward pass, activations, and one-step training animation.",
    accent: "var(--accent-gold)",
  },
  {
    id: "genai",
    title: "GenAI",
    description: "Tokens, embeddings, prompting, RAG, and a local Ollama playground.",
    accent: "var(--accent-sky)",
  },
  {
    id: "mcp",
    title: "MCP",
    description: "Plain-English explanation plus a toy client and tool server demo.",
    accent: "var(--accent-mint)",
  },
  {
    id: "agents",
    title: "Agents",
    description: "Planning, memory, tools, reflection, and step-by-step execution traces.",
    accent: "var(--accent-rose)",
  },
  {
    id: "jargon",
    title: "AI Jargon Dictionary",
    description: "Searchable, interview-safe terms with tiny examples.",
    accent: "var(--accent-lilac)",
  },
  {
    id: "projects",
    title: "Mini Projects",
    description: "Three beginner project blueprints that map to entry-level AI/ML roles.",
    accent: "var(--accent-ink)",
  },
  {
    id: "interview",
    title: "AI/ML Interview Prep",
    description: "A larger searchable bank of AI, ML, stats, deep learning, GenAI, and system-design questions.",
    accent: "var(--accent-coral)",
  },
  {
    id: "sql",
    title: "SQL Interview Prep",
    description: "Queries, joins, grouping, windows, normalization, and database basics for data/ML interviews.",
    accent: "var(--accent-sky)",
  },
  {
    id: "coding",
    title: "Python + C++ Coding Prep",
    description: "Language fundamentals, complexity, debugging, and common coding interview patterns.",
    accent: "var(--accent-mint)",
  },
];

export const learningPath = [
  "Career plan + progress tracking",
  "Build a flagship local project",
  "Data + features + labels",
  "Probability + statistics basics",
  "Loss function",
  "Gradient descent",
  "Linear/logistic regression",
  "Neural nets",
  "Embeddings",
  "Transformers",
  "Prompting",
  "RAG",
  "Tool calling",
  "MCP",
  "Agents",
  "SQL basics",
  "Python + C++ interview coding",
];

export const progressChecklist = [
  "Finish the loss + gradient lesson",
  "Finish the probability + statistics lesson",
  "Finish the classic ML lesson",
  "Finish the neural networks lesson",
  "Use the GenAI chat playground with local Ollama",
  "Run at least 3 SQL practice queries",
  "Run at least 2 Judge0 coding problems",
  "Review 20 AI/ML interview questions aloud",
  "Build 1 mini-project end to end",
  "Write a resume-ready project summary",
];

export const capstoneProjects: CapstoneProject[] = [
  {
    title: "Local AI Study Assistant",
    goal: "Build a local-first RAG app that answers questions over study notes with citations and fallback behavior.",
    stack: ["Next.js", "Ollama", "Postgres or local file store", "Docker"],
    deliverables: [
      "Document upload and chunking",
      "Retrieval pipeline with citations",
      "Answer quality examples",
      "Clear README with architecture",
    ],
    evaluation: [
      "Citation accuracy on a small note set",
      "Latency for retrieval plus answer generation",
      "Failure handling when no relevant chunk exists",
    ],
    recruiterPitch:
      "I built a local-first AI assistant that retrieves grounded context before answering, which let me discuss RAG, retrieval quality, latency, and reliability tradeoffs.",
  },
  {
    title: "Student Performance Prediction Dashboard",
    goal: "Train and explain a regression/classification workflow around student outcomes with transparent evaluation.",
    stack: ["Python", "scikit-learn or custom logic", "Next.js dashboard", "Docker"],
    deliverables: [
      "Clean dataset and feature selection notes",
      "Train/validation/test evaluation",
      "Error analysis and model comparison",
      "Interactive demo in the app",
    ],
    evaluation: [
      "MSE or MAE for regression",
      "Precision/recall/F1 for classification variant",
      "Short write-up of overfitting vs underfitting behavior",
    ],
    recruiterPitch:
      "I built an end-to-end ML project from data preparation to evaluation and UI explanation, so I can explain model quality and feature tradeoffs clearly.",
  },
  {
    title: "Coding Practice Platform Extension",
    goal: "Extend this repo’s Judge0 integration with attempt history, hidden testcases, and AI feedback scaffolding.",
    stack: ["Next.js API routes", "Judge0", "Postgres", "Docker"],
    deliverables: [
      "Saved submissions per user or session",
      "Problem-level visible and hidden testcases",
      "Normalized scoring pipeline",
      "Feedback-ready schema for future AI hints",
    ],
    evaluation: [
      "Pass rate across visible testcases",
      "Result normalization coverage",
      "Clear API boundaries between app logic and execution provider",
    ],
    recruiterPitch:
      "I extended a coding interview platform with isolated execution infrastructure, modular provider design, and room for feedback and analytics.",
  },
];

export const studyPlan: StudyPlanDay[] = [
  {
    day: 1,
    title: "Reset and baseline",
    focus: "Understand the app and measure your current level.",
    tasks: ["Run the app locally", "Review dashboard modules", "Attempt 5 interview questions aloud"],
    outcome: "You know where you are weak.",
  },
  {
    day: 2,
    title: "Features and labels",
    focus: "Data basics",
    tasks: ["Complete data/feature/label concepts", "Write 3 toy examples", "Review train/validation/test split"],
    outcome: "You can explain supervised learning inputs and outputs.",
  },
  {
    day: 3,
    title: "Loss intuition",
    focus: "Why models need an objective",
    tasks: ["Use loss lesson", "Compare MSE and cross-entropy", "Explain prediction vs loss aloud"],
    outcome: "You can explain what loss measures.",
  },
  {
    day: 4,
    title: "Gradient descent",
    focus: "Optimization basics",
    tasks: ["Move the sliders in the gradient lesson", "Explain learning rate tradeoffs", "Write a 4-line summary"],
    outcome: "You can explain how parameters get updated.",
  },
  {
    day: 5,
    title: "Probability basics",
    focus: "Uncertainty",
    tasks: ["Review probability module", "Explain conditional probability", "Solve 3 quick examples"],
    outcome: "You can answer basic stats screening questions.",
  },
  {
    day: 6,
    title: "Mean and variance",
    focus: "Statistics foundations",
    tasks: ["Review mean/variance/std", "Explain bias vs variance", "Practice examples from memory"],
    outcome: "You can explain spread and stability.",
  },
  {
    day: 7,
    title: "CLT, Bayes, Naive Bayes",
    focus: "Classic interviewer favorites",
    tasks: ["Review CLT", "Explain Bayes theorem", "Walk through Naive Bayes toy example"],
    outcome: "You can handle core probability questions.",
  },
  {
    day: 8,
    title: "Linear and logistic regression",
    focus: "Classic ML models",
    tasks: ["Use regression demos", "Explain when to use each", "Compare outputs and losses"],
    outcome: "You can explain basic supervised models clearly.",
  },
  {
    day: 9,
    title: "Overfitting and scaling",
    focus: "Generalization",
    tasks: ["Review overfitting charts", "Explain regularization", "Practice feature scaling reasoning"],
    outcome: "You can explain why models fail on unseen data.",
  },
  {
    day: 10,
    title: "PCA and dimensionality reduction",
    focus: "Feature compression",
    tasks: ["Use PCA demo", "Explain principal components", "Give one interview-safe example"],
    outcome: "You can explain PCA without hand-waving.",
  },
  {
    day: 11,
    title: "Neural network forward pass",
    focus: "Tiny network mechanics",
    tasks: ["Use neural network animation", "Explain neuron and ReLU", "Trace one pass on paper"],
    outcome: "You can explain hidden layers and activations.",
  },
  {
    day: 12,
    title: "Backpropagation",
    focus: "Gradient flow in networks",
    tasks: ["Review backprop explanation", "Explain why gradients can vanish", "Summarize one training step"],
    outcome: "You can describe NN training simply.",
  },
  {
    day: 13,
    title: "Embeddings and transformers",
    focus: "Modern AI fundamentals",
    tasks: ["Review GenAI cards", "Explain embeddings and attention", "Give one transformer example"],
    outcome: "You can answer LLM fundamentals questions.",
  },
  {
    day: 14,
    title: "Prompting and temperature",
    focus: "LLM interaction basics",
    tasks: ["Use local chat playground", "Compare prompt styles", "Explain temperature and hallucination"],
    outcome: "You can discuss prompting practically.",
  },
  {
    day: 15,
    title: "RAG",
    focus: "Grounded LLM systems",
    tasks: ["Use local RAG demo", "Explain retrieval vs generation", "Summarize one failure mode"],
    outcome: "You can explain why RAG matters.",
  },
  {
    day: 16,
    title: "Tool calling and MCP",
    focus: "Structured AI systems",
    tasks: ["Review MCP module", "Explain tool calling", "Compare prompting vs tools vs MCP"],
    outcome: "You can explain AI system integration clearly.",
  },
  {
    day: 17,
    title: "Agents",
    focus: "Multi-step AI systems",
    tasks: ["Review agents demo", "Explain planning, memory, tools", "Summarize agent vs workflow"],
    outcome: "You can answer agent basics without buzzwords.",
  },
  {
    day: 18,
    title: "SQL joins and grouping",
    focus: "Database querying",
    tasks: ["Run SQL presets", "Explain JOIN types", "Write one GROUP BY query"],
    outcome: "You can handle basic SQL screens.",
  },
  {
    day: 19,
    title: "Window functions and ranking",
    focus: "Intermediate SQL",
    tasks: ["Run ranking query", "Explain ROW_NUMBER vs RANK", "Practice running totals"],
    outcome: "You can handle common analytics SQL questions.",
  },
  {
    day: 20,
    title: "Python coding basics",
    focus: "Coding interview setup",
    tasks: ["Review Python interview bank", "Run one Judge0 problem", "Explain dict vs list vs set"],
    outcome: "You can answer beginner Python questions confidently.",
  },
  {
    day: 21,
    title: "C++ coding basics",
    focus: "Systems-flavored coding prep",
    tasks: ["Review C++ interview bank", "Run one Judge0 problem", "Explain pointer vs reference and RAII"],
    outcome: "You can handle core C++ theory questions.",
  },
  {
    day: 22,
    title: "DSA pattern practice",
    focus: "Problem-solving",
    tasks: ["Practice two pointers or binary search", "State time and space complexity aloud", "Review one failed attempt"],
    outcome: "You can communicate coding logic under pressure.",
  },
  {
    day: 23,
    title: "Capstone selection",
    focus: "Portfolio building",
    tasks: ["Choose one capstone", "Define deliverables", "Write project scope in 10 lines"],
    outcome: "You have a focused project plan.",
  },
  {
    day: 24,
    title: "Capstone build day 1",
    focus: "Core functionality",
    tasks: ["Implement main flow", "Capture screenshots", "Write a short architecture note"],
    outcome: "Project has an end-to-end skeleton.",
  },
  {
    day: 25,
    title: "Capstone build day 2",
    focus: "Evaluation",
    tasks: ["Add metrics", "Add error handling", "Document tradeoffs"],
    outcome: "Project is defensible in an interview.",
  },
  {
    day: 26,
    title: "Capstone polish",
    focus: "Presentation",
    tasks: ["Clean README", "Add demo instructions", "Write interview pitch"],
    outcome: "Project looks resume-ready.",
  },
  {
    day: 27,
    title: "Resume and GitHub polish",
    focus: "Presentation assets",
    tasks: ["Write bullet points for project", "Polish repo README", "Check screenshots and naming"],
    outcome: "You have recruiter-facing material.",
  },
  {
    day: 28,
    title: "Mock interview day",
    focus: "Speaking clearly",
    tasks: ["Answer 15 questions aloud", "Time yourself", "Refine weak answers"],
    outcome: "Your explanations sound natural.",
  },
  {
    day: 29,
    title: "Mixed interview drill",
    focus: "ML + SQL + coding",
    tasks: ["1 ML explanation", "2 SQL queries", "1 coding problem", "1 project pitch"],
    outcome: "You can switch contexts smoothly.",
  },
  {
    day: 30,
    title: "Final readiness check",
    focus: "Consolidation",
    tasks: ["Review cheat sheet", "Review capstone pitch", "Apply to roles with polished links"],
    outcome: "You have a job-focused portfolio and interview story.",
  },
];

export const glossaryTerms: GlossaryTerm[] = [
  {
    term: "probability",
    definition: "A number between 0 and 1 that describes how likely an event is.",
    whyItMatters: "Many ML models and interview questions rely on uncertainty and likelihood.",
    example: "A fair coin has probability 0.5 of landing heads.",
  },
  {
    term: "conditional probability",
    definition: "The probability of one event given that another event already happened.",
    whyItMatters: "This is the language of Bayes' rule and many classifiers.",
    example: "Probability of rain given dark clouds.",
  },
  {
    term: "Bayes theorem",
    definition: "A rule for updating probability when new evidence arrives.",
    whyItMatters: "It explains Naive Bayes and how evidence changes beliefs.",
    example: "Update spam probability after seeing the word 'free'.",
  },
  {
    term: "mean",
    definition: "The average value of a set of numbers.",
    whyItMatters: "It is a basic summary statistic and appears in many interview questions.",
    example: "The mean of 2, 4, and 6 is 4.",
  },
  {
    term: "variance",
    definition: "How spread out values are around the mean.",
    whyItMatters: "Variance helps explain noise, stability, and the bias-variance tradeoff.",
    example: "Scores tightly packed near the average have low variance.",
  },
  {
    term: "standard deviation",
    definition: "The square root of variance, in the same units as the data.",
    whyItMatters: "It is easier to interpret than raw variance.",
    example: "If exam scores have standard deviation 5, most scores are fairly close to the mean.",
  },
  {
    term: "central limit theorem",
    definition: "Sample means tend to look normally distributed when the sample size is large enough.",
    whyItMatters: "It explains why averages are so useful in statistics and experiments.",
    example: "Average height from many random groups often forms a bell-shaped curve.",
  },
  {
    term: "naive bayes",
    definition: "A classifier that uses Bayes' rule and assumes features are conditionally independent.",
    whyItMatters: "It is simple, fast, and common in basic text classification interviews.",
    example: "Predict spam from word counts like 'free' and 'offer'.",
  },
  {
    term: "PCA",
    definition: "Principal Component Analysis: a way to reduce dimensions while keeping as much variance as possible.",
    whyItMatters: "It helps visualize data, compress features, and remove redundancy.",
    example: "Project 20 correlated features down to 2 main directions.",
  },
  {
    term: "join",
    definition: "A SQL operation that combines rows from tables using related keys.",
    whyItMatters: "Interviewers often test whether you can correctly combine datasets.",
    example: "Join orders with customers on customer_id.",
  },
  {
    term: "window function",
    definition: "A SQL function that computes over related rows without collapsing them into one row.",
    whyItMatters: "Common in analytics interviews for ranking and running totals.",
    example: "ROW_NUMBER() over each department ordered by salary.",
  },
  {
    term: "time complexity",
    definition: "A rough measure of how runtime grows with input size.",
    whyItMatters: "Coding interviews often ask for a correct solution and its complexity.",
    example: "Binary search runs in O(log n).",
  },
  {
    term: "dataset",
    definition: "A collection of examples used to train or test a model.",
    whyItMatters: "Bad data usually leads to bad model behavior.",
    example: "A table of student study hours and exam scores.",
  },
  {
    term: "feature",
    definition: "An input value the model uses to make a prediction.",
    whyItMatters: "Features are the clues the model learns from.",
    example: "Study hours, attendance, and assignment score.",
  },
  {
    term: "label",
    definition: "The correct answer the model should learn to predict.",
    whyItMatters: "Without labels, supervised learning cannot measure how wrong it is.",
    example: "Whether an email is spam or not spam.",
  },
  {
    term: "inference",
    definition: "Using a trained model to make a prediction on new data.",
    whyItMatters: "Training teaches; inference is what happens in real use.",
    example: "Predicting score for a new student record.",
  },
  {
    term: "training",
    definition: "The process of adjusting model parameters to reduce loss.",
    whyItMatters: "This is where the model actually learns patterns.",
    example: "Running 200 epochs of gradient descent.",
  },
  {
    term: "epoch",
    definition: "One full pass through the training data.",
    whyItMatters: "Too few epochs can underfit; too many can overfit.",
    example: "If you have 100 rows and see all 100 once, that is 1 epoch.",
  },
  {
    term: "batch",
    definition: "A smaller chunk of training examples processed together.",
    whyItMatters: "Batches make training faster and more memory-friendly.",
    example: "Training on 32 examples at a time.",
  },
  {
    term: "learning rate",
    definition: "How big a step the model takes during each update.",
    whyItMatters: "Too big can overshoot; too small can be very slow.",
    example: "A learning rate of 0.05 moves weights cautiously.",
  },
  {
    term: "regularization",
    definition: "A technique that discourages overly complex models.",
    whyItMatters: "It helps control overfitting.",
    example: "Adding a penalty for very large weights.",
  },
  {
    term: "embedding",
    definition: "A numeric vector that captures semantic meaning.",
    whyItMatters: "Embeddings power search, clustering, and RAG retrieval.",
    example: "Two similar sentences get vectors that are close together.",
  },
  {
    term: "transformer",
    definition: "A neural architecture built around attention.",
    whyItMatters: "Modern LLMs are usually transformers.",
    example: "GPT-style models use transformer blocks.",
  },
  {
    term: "attention",
    definition: "A way for a model to focus on relevant parts of the input.",
    whyItMatters: "It helps the model connect related words or tokens.",
    example: "In 'the cat sat on the mat', attention can link 'cat' with 'sat'.",
  },
  {
    term: "context window",
    definition: "The amount of text a model can consider at one time.",
    whyItMatters: "If key information falls outside the window, the model cannot use it.",
    example: "A short context window might miss earlier instructions.",
  },
  {
    term: "hallucination",
    definition: "A confident-looking answer that is false or unsupported.",
    whyItMatters: "You need checks, citations, or retrieval to reduce risk.",
    example: "Inventing a research paper that does not exist.",
  },
  {
    term: "RAG",
    definition: "Retrieval-Augmented Generation: fetch useful context before answering.",
    whyItMatters: "It grounds answers in real documents instead of memory alone.",
    example: "Search your notes, then answer with cited snippets.",
  },
  {
    term: "agent",
    definition: "A system that can plan, use tools, observe results, and continue.",
    whyItMatters: "Agents can handle multi-step tasks better than plain chatbots.",
    example: "Plan a study schedule, use a calculator, then refine the plan.",
  },
  {
    term: "tool calling",
    definition: "Letting the model ask software functions to do specific work.",
    whyItMatters: "Tools connect the model to calculators, search, and databases.",
    example: "The model calls a weather tool instead of guessing the forecast.",
  },
  {
    term: "MCP",
    definition: "Model Context Protocol: a standard way to connect models to tools and context.",
    whyItMatters: "It makes tool integration cleaner and more reusable.",
    example: "One MCP tool server can be used by many AI clients.",
  },
  {
    term: "fine-tuning",
    definition: "Training a base model further on a smaller specialized dataset.",
    whyItMatters: "Useful when prompts and RAG are not enough.",
    example: "Fine-tuning a model on company-specific support tickets.",
  },
  {
    term: "guardrails",
    definition: "Rules and checks that keep an AI system safe and on task.",
    whyItMatters: "They reduce harmful outputs and prevent fragile workflows.",
    example: "Blocking answers that lack citations in a RAG app.",
  },
];

export const aiMlInterviewCards: InterviewCard[] = [
  question("Foundations", "What is the difference between AI, ML, deep learning, and GenAI?", "AI is the broad field of making systems act intelligently. ML is a subset where systems learn from data. Deep learning is ML with neural networks. GenAI is the part focused on generating new content such as text, images, code, or audio.", "AI is the umbrella term. ML learns from data. Deep learning uses neural nets. GenAI creates new content.", "Interviewers use this question to check whether you can separate broad category labels from actual technical approaches.", ["ai", "ml", "dl", "genai"]),
  question("Foundations", "What is supervised vs unsupervised vs reinforcement learning?", "Supervised learning uses labeled examples. Unsupervised learning finds structure without labels. Reinforcement learning learns through rewards from actions in an environment.", "Supervised has answers, unsupervised finds patterns, reinforcement learns from rewards.", "A short three-part answer is usually enough unless the interviewer asks for examples.", ["supervised", "unsupervised", "rl"]),
  question("Data", "What is a feature and what is a label?", "A feature is an input signal used for prediction. A label is the target answer the model should learn.", "Features are clues; labels are the correct answers.", "Keep this very concrete with an example like email words as features and spam or not spam as the label.", ["feature", "label", "data"]),
  question("Data", "What is train, validation, and test split?", "Train data teaches the model. Validation data helps tune choices like hyperparameters. Test data is the final unbiased check on unseen examples.", "Train learns, validation tunes, test checks final generalization.", "The key idea is that test data should stay untouched until the end.", ["train", "validation", "test"]),
  question("Statistics", "What is the difference between probability and statistics?", "Probability starts with assumptions and asks what outcomes are likely. Statistics starts with observed data and tries to infer what process or parameters likely produced it.", "Probability goes from assumptions to outcomes. Statistics goes from data back to assumptions.", "This question checks if you can think both forward and backward about uncertainty.", ["probability", "statistics"]),
  question("Statistics", "What are mean, variance, and standard deviation?", "Mean is the average. Variance measures spread around the mean. Standard deviation is the square root of variance, so it is easier to interpret because it has the same units as the data.", "Mean is the center. Variance and standard deviation measure spread.", "A good answer connects variance to instability or noise in real data.", ["mean", "variance", "std"]),
  question("Statistics", "What is the central limit theorem?", "If you repeatedly sample from a population and compute the average, the distribution of those sample means tends toward a normal distribution as sample size grows.", "CLT means sample averages often form a bell curve as sample size grows.", "Mentioning sample means is important; CLT is not about the raw data becoming normal.", ["clt", "sampling"]),
  question("Statistics", "What is Bayes' theorem?", "Bayes' theorem updates the probability of a hypothesis after seeing evidence. It connects prior belief, likelihood, and posterior belief.", "Bayes says update your belief after seeing new evidence.", "This matters for Naive Bayes and for reasoning about uncertainty in general.", ["bayes", "probability"]),
  question("Modeling", "What is linear regression?", "Linear regression predicts a continuous number by fitting a weighted linear combination of features.", "Linear regression predicts a number with a line or weighted sum.", "A simple example is predicting score from study hours.", ["linear regression", "regression"]),
  question("Modeling", "What is logistic regression?", "Logistic regression predicts the probability of a class, usually binary, by applying a sigmoid to a linear score.", "Logistic regression predicts a class probability, not a raw continuous target.", "Interviewers like to hear the phrase probability between 0 and 1.", ["logistic regression", "classification"]),
  question("Optimization", "What is a loss function?", "A loss function measures how wrong predictions are. Training tries to minimize this value.", "Loss is a score for how wrong the model is.", "Pair it with one example like MSE for regression or cross-entropy for classification.", ["loss", "optimization"]),
  question("Optimization", "What is gradient descent?", "Gradient descent updates model parameters in the direction that reduces loss. The gradient gives the direction, and the learning rate controls step size.", "Gradient descent is repeated small updates using slope information to reduce loss.", "If pressed, explain overshooting with a high learning rate and slow progress with a low learning rate.", ["gradient descent", "learning rate"]),
  question("Optimization", "What is the difference between MSE and cross-entropy?", "MSE is common for regression and squares prediction errors. Cross-entropy is common for classification and heavily penalizes confident wrong predictions.", "MSE is for numeric regression mistakes. Cross-entropy is for classification confidence mistakes.", "This shows you understand why the loss should match the prediction task.", ["mse", "cross-entropy"]),
  question("Generalization", "What is bias vs variance?", "Bias comes from an overly simple model that misses patterns. Variance comes from a model that fits the training set too closely and does not generalize well.", "High bias underfits. High variance overfits.", "A short answer should connect the tradeoff to model complexity and generalization.", ["bias", "variance"]),
  question("Generalization", "What is overfitting and how do you reduce it?", "Overfitting means performing well on training data but poorly on unseen data because the model learned noise. Reduce it with more data, regularization, simpler models, early stopping, or data augmentation.", "Overfitting is memorizing the training set too much. You reduce it with regularization, better data, or simpler models.", "Interviewers usually want both definition and mitigation.", ["overfitting", "regularization"]),
  question("Generalization", "What is underfitting?", "Underfitting happens when the model is too simple or undertrained to learn the real pattern in the data.", "Underfitting means the model is too weak to capture the pattern.", "A useful contrast is high training error and high validation error.", ["underfitting"]),
  question("Evaluation", "What is precision, recall, and F1 score?", "Precision is how many predicted positives were actually positive. Recall is how many actual positives were found. F1 balances precision and recall with their harmonic mean.", "Precision asks 'when I said yes, was I right?' Recall asks 'did I find the real positives?' F1 balances both.", "Mention class imbalance if you want to sound practical.", ["precision", "recall", "f1"]),
  question("Evaluation", "What is a confusion matrix?", "A confusion matrix counts true positives, false positives, true negatives, and false negatives for a classifier.", "It is a table showing correct and incorrect predictions by class.", "It is often the easiest way to explain precision and recall.", ["confusion matrix"]),
  question("Evaluation", "What is ROC-AUC?", "ROC-AUC measures how well a classifier ranks positives ahead of negatives across thresholds.", "AUC tells you how well the classifier separates classes across many thresholds.", "Useful when the interviewer asks about threshold-independent metrics.", ["roc", "auc"]),
  question("Features", "Why do we scale features?", "Feature scaling helps optimization behave better when features have different numeric ranges, especially for gradient-based models.", "Scaling prevents one big-range feature from dominating the update steps.", "Mention that tree-based models usually care less about scaling.", ["scaling", "features"]),
  question("Features", "What is one-hot encoding?", "One-hot encoding turns a categorical value into binary indicator columns so models can use it numerically.", "It turns categories into yes/no columns.", "A quick example is city = Chennai, Delhi, Mumbai becoming three columns.", ["encoding", "categorical"]),
  question("Features", "What is multicollinearity?", "Multicollinearity means features are strongly correlated with each other, which can make linear model coefficients unstable.", "Highly correlated features can make some models harder to interpret.", "This is a good setup for mentioning PCA or regularization.", ["multicollinearity"]),
  question("Algorithms", "What is Naive Bayes and why is it naive?", "Naive Bayes is a probabilistic classifier based on Bayes' theorem. It assumes features are conditionally independent given the class, which is the naive simplification.", "Naive Bayes uses Bayes' rule and assumes features act independently inside each class.", "This is a classic beginner interview question, especially for text classification.", ["naive bayes", "bayes"]),
  question("Algorithms", "What is PCA?", "PCA finds new orthogonal directions called principal components that capture the most variance in the data, then projects the data onto fewer of those directions.", "PCA rotates the data to keep the most informative directions.", "Be careful not to call PCA a feature selection method; it creates new features.", ["pca", "dimensionality reduction"]),
  question("Algorithms", "What is k-means clustering?", "K-means partitions data into k clusters by repeatedly assigning points to the nearest centroid and updating centroids.", "K-means groups points around learned centers.", "The interviewer may ask about choosing k or about sensitivity to initialization.", ["kmeans", "clustering"]),
  question("Algorithms", "What is a decision tree and random forest?", "A decision tree splits data by feature-based rules. A random forest builds many trees on random subsets and combines them to improve robustness.", "A tree is one rule-based model; a random forest is many trees voting together.", "This is a good place to mention lower variance from ensembling.", ["tree", "random forest"]),
  question("Deep Learning", "What is a neuron, activation function, and backpropagation?", "A neuron computes a weighted sum plus bias, then applies an activation function. Activation functions add non-linearity. Backpropagation computes gradients layer by layer so weights can be updated.", "A neuron computes, an activation bends the function, and backprop sends error backward.", "Interviewers want to know whether you understand training flow, not full calculus.", ["neuron", "activation", "backprop"]),
  question("Deep Learning", "What are ReLU, sigmoid, and softmax?", "ReLU outputs max(0, x) and is common in hidden layers. Sigmoid maps to 0 to 1 and is common for binary probabilities. Softmax converts scores into a probability distribution across multiple classes.", "ReLU is for hidden layers, sigmoid for binary probability, softmax for multiclass probability.", "The key is matching each activation to its typical use.", ["relu", "sigmoid", "softmax"]),
  question("Deep Learning", "What is vanishing gradient?", "Vanishing gradient happens when gradients become very small in deep networks, making early layers learn slowly.", "The gradient shrinks so much that some layers barely update.", "A common mitigation answer is ReLU, better initialization, normalization, or architectures like residual connections.", ["vanishing gradient"]),
  question("Deep Learning", "What is batch normalization?", "Batch normalization normalizes intermediate activations during training, which often stabilizes and speeds up learning.", "It keeps internal activations in a healthier range during training.", "You do not need to oversell it as magic; it is a practical stability trick.", ["batch norm"]),
  question("GenAI", "What is a token, embedding, and context window?", "A token is a small chunk of text. An embedding is a vector representation of meaning. The context window is how much text the model can consider at once.", "Tokens are text pieces, embeddings are meaning vectors, and context window is the model's working memory size.", "This is a common LLM fundamentals question.", ["token", "embedding", "context window"]),
  question("GenAI", "What is temperature in an LLM?", "Temperature controls randomness in generation. Lower temperature is more deterministic, while higher temperature gives more varied outputs.", "Low temperature is steadier. High temperature is more creative but less predictable.", "A practical answer ties temperature to task type: low for extraction, higher for brainstorming.", ["temperature"]),
  question("GenAI", "What is hallucination and how do you reduce it?", "Hallucination is when a model produces unsupported or false content. You reduce it with better prompts, retrieval, citations, tool use, validation, and human review where needed.", "Hallucination is confident nonsense. Reduce it with grounding and checks.", "Keep the answer practical rather than philosophical.", ["hallucination", "grounding"]),
  question("GenAI", "What is RAG?", "RAG retrieves relevant context from documents or systems and injects that context into the prompt before generation.", "RAG means fetch context first, then answer with it.", "A good answer mentions why it helps: fresher, more grounded answers without full fine-tuning.", ["rag"]),
  question("GenAI", "What is fine-tuning and when would you use it?", "Fine-tuning continues training a base model on a more specific dataset. Use it when prompting and retrieval are not enough and you need more consistent domain behavior.", "Fine-tuning teaches the base model a narrower style or behavior.", "Good interview signal: say that many use cases can start with prompting plus RAG before fine-tuning.", ["fine-tuning"]),
  question("Systems", "What is tool calling?", "Tool calling lets the model request structured external functions such as search, calculator, or database lookups instead of guessing.", "Tool calling means the model can ask software to do precise work.", "This is a bridge concept between LLMs and real products.", ["tool calling"]),
  question("Systems", "What is MCP?", "MCP is a standard way for AI clients to connect to tools and context providers using a shared protocol.", "MCP is a common contract for plugging tools and context into AI apps.", "The key idea is standardization and reuse across clients and servers.", ["mcp"]),
  question("Systems", "What is an agent and how is it different from a workflow?", "An agent can choose actions dynamically based on observations, tools, and goals. A workflow follows a fixed developer-defined sequence of steps.", "A workflow follows a script. An agent decides what to do next.", "The contrast between fixed and adaptive behavior is what most interviewers want.", ["agent", "workflow"]),
  question("MLOps", "What is data leakage?", "Data leakage happens when information from validation, test, or the future accidentally enters training, causing unrealistically good results.", "Leakage means the model got unfair hints.", "A common example is scaling or imputing using the full dataset before splitting.", ["data leakage"]),
  question("MLOps", "What is model drift?", "Model drift is when data or relationships change over time so model performance degrades after deployment.", "Drift means the world changed and the old model no longer fits as well.", "A complete answer mentions monitoring and retraining.", ["drift", "deployment"]),
];

export const sqlInterviewCards: InterviewCard[] = [
  question("SQL Basics", "What is the difference between WHERE and HAVING?", "WHERE filters rows before grouping. HAVING filters groups after aggregation.", "WHERE is before GROUP BY. HAVING is after aggregation.", "This is a very common screening question.", ["sql", "where", "having"]),
  question("SQL Basics", "What is the difference between INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN?", "INNER JOIN keeps only matching rows. LEFT JOIN keeps all left rows plus matches. RIGHT JOIN keeps all right rows plus matches. FULL OUTER JOIN keeps all rows from both sides with NULLs where no match exists.", "INNER is overlap only. LEFT keeps the left table. RIGHT keeps the right. FULL keeps everything.", "A quick Venn-diagram style explanation is effective.", ["joins"]),
  question("SQL Basics", "What is GROUP BY used for?", "GROUP BY collects rows with the same key values so aggregate functions like COUNT, SUM, or AVG can be applied per group.", "GROUP BY lets you aggregate per category.", "Mention that non-aggregated selected columns usually must appear in the GROUP BY clause.", ["group by", "aggregation"]),
  question("SQL Basics", "What is the difference between COUNT(*), COUNT(column), and COUNT(DISTINCT column)?", "COUNT(*) counts rows. COUNT(column) counts non-NULL values in that column. COUNT(DISTINCT column) counts distinct non-NULL values.", "Star counts rows, column skips NULLs, distinct counts unique non-NULLs.", "Interviewers often use this to test NULL awareness.", ["count", "null"]),
  question("SQL Basics", "What is a primary key and foreign key?", "A primary key uniquely identifies a row in a table. A foreign key references a primary key in another table to represent relationships.", "Primary key identifies a row. Foreign key links tables.", "This checks whether you understand relational structure.", ["keys", "schema"]),
  question("Querying", "How do you find duplicate rows?", "Use GROUP BY on the relevant columns and filter with HAVING COUNT(*) > 1.", "Group the suspected duplicate columns and keep groups with count greater than one.", "A practical interviewer follow-up is how to delete duplicates safely.", ["duplicates"]),
  question("Querying", "How do you get the second highest salary?", "A common approach is to use DENSE_RANK or ROW_NUMBER over salary descending and then select rank 2. Another is a subquery with MAX less than the top salary.", "Rank salaries descending and take rank 2.", "This question often expands into ties, duplicates, and NULLs.", ["ranking", "salary"]),
  question("Querying", "What are window functions?", "Window functions compute values over a set of related rows while still returning each original row, unlike GROUP BY which collapses rows.", "They calculate over a window of rows without reducing the result to one row per group.", "Examples include ROW_NUMBER, RANK, SUM OVER, and LAG.", ["window functions"]),
  question("Querying", "What is the difference between ROW_NUMBER, RANK, and DENSE_RANK?", "ROW_NUMBER gives unique sequential numbers. RANK gives ties the same rank and leaves gaps. DENSE_RANK gives ties the same rank without gaps.", "ROW_NUMBER never ties, RANK skips after ties, DENSE_RANK does not skip.", "This is an analytics interview classic.", ["row_number", "rank", "dense_rank"]),
  question("Querying", "How do you calculate a running total?", "Use SUM(value) OVER (PARTITION BY ... ORDER BY ...).", "A running total is usually SUM OVER ordered rows.", "Be ready to explain partitioning versus ordering.", ["running total", "window"]),
  question("Querying", "How do you find missing dates or missing ids?", "Generate or reference the full expected set, then left join actual data and filter where the actual side is NULL.", "Create the full expected range, left join the real table, and keep missing matches.", "This shows practical analysis thinking, not just syntax recall.", ["gaps", "missing data"]),
  question("Design", "What is normalization?", "Normalization organizes relational tables to reduce redundancy and update anomalies, usually by splitting data into related tables.", "Normalization reduces repeated data and keeps updates cleaner.", "A simple example is separating customer info from order records.", ["normalization"]),
  question("Design", "What is denormalization and when might you use it?", "Denormalization intentionally keeps some repeated or precomputed data to simplify or speed up reads, especially in analytics systems.", "Denormalization trades some storage and duplication for simpler or faster queries.", "Interviewers want to see tradeoff thinking, not blind rules.", ["denormalization"]),
  question("Performance", "What is an index and what tradeoff does it introduce?", "An index is a data structure that speeds up reads on searched columns, but it uses storage and can slow inserts, updates, and deletes.", "Indexes make reads faster but writes more expensive.", "A strong answer mentions that indexing every column is usually a bad idea.", ["index"]),
  question("Performance", "What is the difference between clustered and non-clustered index?", "A clustered index changes the physical order of table data around the indexed key, while a non-clustered index is a separate lookup structure.", "Clustered affects physical row order. Non-clustered is an additional structure.", "Database behavior differs by engine, but this high-level explanation is usually enough.", ["clustered index"]),
  question("NULLs", "How does NULL behave in SQL?", "NULL means missing or unknown, not zero or empty string. Comparisons with NULL usually require IS NULL or IS NOT NULL instead of equals.", "NULL means unknown, so you handle it with IS NULL rather than equals.", "This is a common source of bugs in joins and filters.", ["null"]),
  question("Advanced", "What is a CTE and when would you use it?", "A CTE, or Common Table Expression, is a named temporary result defined with WITH that helps structure complex queries.", "A CTE is a readable named subquery for the next query block.", "It is often used to make layered logic easier to debug.", ["cte"]),
  question("Advanced", "What is the difference between UNION and UNION ALL?", "UNION removes duplicates, while UNION ALL keeps them.", "UNION deduplicates, UNION ALL does not.", "Mention that UNION ALL is usually faster because it skips duplicate removal.", ["union"]),
];

export const sqlPracticeChallenges = [
  {
    title: "Top 3 students by average score",
    difficulty: "easy",
    companies: ["General FAANG", "Amazon", "Meta"],
    prompt: "Using students and grades, return the top 3 students ranked by average score.",
    tables: "students, grades",
    hint: "JOIN first, then GROUP BY student, ORDER BY AVG(score) DESC, LIMIT 3.",
    answer: `SELECT s.name, ROUND(AVG(g.score), 2) AS avg_score
FROM students s
JOIN grades g ON s.id = g.student_id
GROUP BY s.name
ORDER BY avg_score DESC
LIMIT 3;`,
  },
  {
    title: "Students who never took Deep Learning Intro",
    difficulty: "medium",
    companies: ["General FAANG", "Amazon"],
    prompt: "Find students who do not have a grade record for the Deep Learning Intro course.",
    tables: "students, grades, courses",
    hint: "Use LEFT JOIN with a NULL check or NOT EXISTS.",
    answer: `SELECT s.name
FROM students s
WHERE NOT EXISTS (
  SELECT 1
  FROM grades g
  JOIN courses c ON c.id = g.course_id
  WHERE g.student_id = s.id
    AND c.title = 'Deep Learning Intro'
);`,
  },
  {
    title: "Course-wise pass percentage",
    difficulty: "medium",
    companies: ["General FAANG", "Meta"],
    prompt: "For each course, compute the percentage of students scoring 60 or above.",
    tables: "courses, grades",
    hint: "Use conditional aggregation with COUNT and division.",
    answer: `SELECT
  c.title,
  ROUND(
    100.0 * COUNT(*) FILTER (WHERE g.score >= 60) / NULLIF(COUNT(*), 0),
    2
  ) AS pass_percentage
FROM courses c
LEFT JOIN grades g ON c.id = g.course_id
GROUP BY c.title
ORDER BY c.title;`,
  },
  {
    title: "Latest exam per student",
    difficulty: "medium",
    companies: ["General FAANG", "Google", "Meta"],
    prompt: "Return each student’s most recent exam record.",
    tables: "students, grades, courses",
    hint: "Use ROW_NUMBER() OVER (PARTITION BY student ORDER BY exam_date DESC).",
    answer: `WITH ranked AS (
  SELECT
    s.name,
    c.title,
    g.score,
    g.exam_date,
    ROW_NUMBER() OVER (PARTITION BY s.id ORDER BY g.exam_date DESC) AS rn
  FROM students s
  JOIN grades g ON s.id = g.student_id
  JOIN courses c ON c.id = g.course_id
)
SELECT name, title, score, exam_date
FROM ranked
WHERE rn = 1
ORDER BY name;`,
  },
  {
    title: "Second highest scorer in each course",
    difficulty: "medium",
    companies: ["General FAANG", "Amazon", "Google"],
    prompt: "Find the second-highest score for each course, keeping ties sensible.",
    tables: "grades, courses, students",
    hint: "Use DENSE_RANK partitioned by course.",
    answer: `WITH ranked AS (
  SELECT
    c.title,
    s.name,
    g.score,
    DENSE_RANK() OVER (PARTITION BY c.id ORDER BY g.score DESC) AS score_rank
  FROM grades g
  JOIN students s ON s.id = g.student_id
  JOIN courses c ON c.id = g.course_id
)
SELECT title, name, score
FROM ranked
WHERE score_rank = 2
ORDER BY title, name;`,
  },
  {
    title: "Students scoring above course average",
    difficulty: "medium",
    companies: ["General FAANG", "Google"],
    prompt: "List students whose score is higher than the average score of that same course.",
    tables: "students, grades, courses",
    hint: "Use a subquery or window AVG per course.",
    answer: `SELECT
  s.name,
  c.title,
  g.score
FROM grades g
JOIN students s ON s.id = g.student_id
JOIN courses c ON c.id = g.course_id
JOIN (
  SELECT course_id, AVG(score) AS avg_score
  FROM grades
  GROUP BY course_id
) course_avg ON course_avg.course_id = g.course_id
WHERE g.score > course_avg.avg_score
ORDER BY c.title, g.score DESC;`,
  },
  {
    title: "Department-wise average performance",
    difficulty: "easy",
    companies: ["General FAANG", "Amazon"],
    prompt: "Compute the average grade score by department.",
    tables: "students, grades",
    hint: "JOIN students to grades, GROUP BY department.",
    answer: `SELECT
  s.department,
  ROUND(AVG(g.score), 2) AS avg_score
FROM students s
JOIN grades g ON s.id = g.student_id
GROUP BY s.department
ORDER BY avg_score DESC;`,
  },
  {
    title: "Students taking more than one course",
    difficulty: "easy",
    companies: ["General FAANG", "Meta"],
    prompt: "Return students who have grade records in more than one distinct course.",
    tables: "students, grades",
    hint: "GROUP BY student and filter with HAVING COUNT(DISTINCT course_id) > 1.",
    answer: `SELECT
  s.name,
  COUNT(DISTINCT g.course_id) AS course_count
FROM students s
JOIN grades g ON s.id = g.student_id
GROUP BY s.name
HAVING COUNT(DISTINCT g.course_id) > 1
ORDER BY course_count DESC, s.name;`,
  },
  {
    title: "Running count of exams over time",
    difficulty: "medium",
    companies: ["General FAANG", "Google", "Meta"],
    prompt: "Show cumulative number of exams taken ordered by exam date.",
    tables: "grades",
    hint: "Use COUNT(*) OVER (ORDER BY exam_date).",
    answer: `SELECT
  exam_date,
  COUNT(*) OVER (ORDER BY exam_date, id) AS running_exam_count
FROM grades
ORDER BY exam_date, id;`,
  },
  {
    title: "Hard courses with average below 80",
    difficulty: "easy",
    companies: ["General FAANG", "Amazon"],
    prompt: "Find hard courses whose average score is below 80.",
    tables: "courses, grades",
    hint: "Filter difficulty, GROUP BY course, use HAVING AVG(score) < 80.",
    answer: `SELECT
  c.title,
  ROUND(AVG(g.score), 2) AS avg_score
FROM courses c
JOIN grades g ON c.id = g.course_id
WHERE c.difficulty = 'hard'
GROUP BY c.title
HAVING AVG(g.score) < 80
ORDER BY avg_score;`,
  },
  {
    title: "Students with scores in all courses",
    difficulty: "hard",
    companies: ["General FAANG", "Google"],
    prompt: "Return students who have at least one grade in every available course.",
    tables: "students, grades, courses",
    hint: "Compare COUNT(DISTINCT course_id) per student with total course count.",
    answer: `SELECT
  s.name
FROM students s
JOIN grades g ON s.id = g.student_id
GROUP BY s.id, s.name
HAVING COUNT(DISTINCT g.course_id) = (SELECT COUNT(*) FROM courses)
ORDER BY s.name;`,
  },
  {
    title: "Most popular course",
    difficulty: "easy",
    companies: ["General FAANG", "Amazon", "Meta"],
    prompt: "Find the course with the highest number of grade records.",
    tables: "courses, grades",
    hint: "GROUP BY course, ORDER BY COUNT(*) DESC, LIMIT 1.",
    answer: `SELECT
  c.title,
  COUNT(*) AS exam_count
FROM courses c
JOIN grades g ON c.id = g.course_id
GROUP BY c.title
ORDER BY exam_count DESC, c.title
LIMIT 1;`,
  },
  {
    title: "Gap between score and course max",
    difficulty: "medium",
    companies: ["General FAANG", "Meta"],
    prompt: "For each grade row, show how far it is from the maximum score of that course.",
    tables: "grades, students, courses",
    hint: "Use MAX(score) OVER (PARTITION BY course_id).",
    answer: `SELECT
  s.name,
  c.title,
  g.score,
  MAX(g.score) OVER (PARTITION BY g.course_id) - g.score AS gap_to_course_max
FROM grades g
JOIN students s ON s.id = g.student_id
JOIN courses c ON c.id = g.course_id
ORDER BY c.title, gap_to_course_max, s.name;`,
  },
  {
    title: "Students with improving scores",
    difficulty: "hard",
    companies: ["General FAANG", "Google", "Amazon"],
    prompt: "Find students whose later exam score is higher than an earlier one.",
    tables: "students, grades",
    hint: "Use LAG(score) OVER (PARTITION BY student_id ORDER BY exam_date).",
    answer: `WITH scored AS (
  SELECT
    s.name,
    g.exam_date,
    g.score,
    LAG(g.score) OVER (PARTITION BY s.id ORDER BY g.exam_date) AS previous_score
  FROM students s
  JOIN grades g ON s.id = g.student_id
)
SELECT DISTINCT name
FROM scored
WHERE previous_score IS NOT NULL
  AND score > previous_score
ORDER BY name;`,
  },
  {
    title: "Monthly exam volume",
    difficulty: "easy",
    companies: ["General FAANG", "Amazon", "Meta"],
    prompt: "Return the number of exams taken per month.",
    tables: "grades",
    hint: "DATE_TRUNC('month', exam_date) and GROUP BY that value.",
    answer: `SELECT
  DATE_TRUNC('month', exam_date) AS month_start,
  COUNT(*) AS exam_count
FROM grades
GROUP BY month_start
ORDER BY month_start;`,
  },
];

export const pythonInterviewCards: InterviewCard[] = [
  question("Python Basics", "What is the difference between a list and a tuple?", "A list is mutable, while a tuple is immutable.", "Lists can change; tuples cannot.", "This is often used to test whether you know Python data structure basics.", ["python", "list", "tuple"]),
  question("Python Basics", "What is the difference between a list, set, and dictionary?", "A list keeps ordered items, a set keeps unique items without duplicates, and a dictionary maps keys to values.", "List is ordered, set is unique, dictionary is key-value.", "A good answer can add typical use cases like deduplication for sets.", ["python", "dict", "set"]),
  question("Python Basics", "What are *args and **kwargs?", "*args collects extra positional arguments and **kwargs collects extra keyword arguments.", "*args is extra positional inputs, **kwargs is extra named inputs.", "Keep it short and correct.", ["python", "args", "kwargs"]),
  question("Python Basics", "What is a generator?", "A generator yields values lazily one at a time instead of building the entire result in memory at once.", "A generator produces values on demand.", "Interviewers often want to hear the memory-efficiency angle.", ["python", "generator"]),
  question("Python Basics", "What is the difference between deepcopy and shallow copy?", "A shallow copy copies the outer container but still references nested objects. A deep copy recursively copies nested objects too.", "Shallow copy shares nested objects; deep copy duplicates them.", "This question often exposes bugs with nested lists or dicts.", ["python", "copy"]),
  question("Python Coding", "What is the time complexity of looking up a key in a dictionary?", "Average-case lookup in a Python dictionary is O(1), though worst-case can degrade in pathological cases.", "Dictionary lookup is usually O(1).", "The interviewer usually wants average-case complexity.", ["python", "complexity"]),
  question("Python Coding", "How would you reverse a string?", "You can use slicing like s[::-1], or build a reversed iterator and join it.", "A common Python answer is s[::-1].", "If asked in a coding round, explain readability and complexity.", ["python", "strings"]),
  question("Python Coding", "How do you detect if a string is a palindrome?", "Compare the string to its reverse, often after normalizing case and removing non-alphanumeric characters if the problem requires that.", "Normalize if needed, then compare the string with its reverse.", "The interviewer may care about edge cases more than syntax.", ["python", "palindrome"]),
  question("Python Coding", "How do you count word frequencies?", "Use a dictionary or collections.Counter to increment counts per token.", "Use a hash map or Counter.", "This checks basic problem decomposition.", ["python", "hash map"]),
  question("Python Coding", "What is a Pythonic way to transform a list?", "List comprehensions are a concise way to filter or map lists in Python.", "Use a list comprehension for compact readable transforms.", "Do not overuse them when they become unreadable.", ["python", "list comprehension"]),
  question("Python Coding", "What common coding interview patterns should you know in Python?", "Hash maps, two pointers, sliding window, binary search, DFS/BFS, heaps, and dynamic programming are common patterns.", "Know the standard patterns: hash map, two pointers, sliding window, binary search, graph traversal, heaps, and DP.", "This shows preparation strategy, not just language syntax.", ["python", "patterns"]),
  question("Python Debugging", "What is the difference between == and is?", "== compares values, while is compares object identity.", "== asks if values are equal; is asks if they are literally the same object.", "This is a classic Python gotcha.", ["python", "identity"]),
];

export const cppInterviewCards: InterviewCard[] = [
  question("C++ Basics", "What is the difference between stack and heap allocation?", "Stack allocation is usually automatic and tied to scope. Heap allocation is dynamic and lasts until explicitly freed or managed by smart pointers.", "Stack is automatic scoped memory. Heap is dynamic memory.", "This is foundational for C++ memory reasoning.", ["c++", "memory"]),
  question("C++ Basics", "What is the difference between pointer and reference?", "A pointer can be reassigned and can be null. A reference is an alias to an existing object and is typically not reseated or null in normal use.", "Pointers can be null and reassigned. References are stable aliases.", "Keep it simple and avoid corner-case overcomplication.", ["c++", "pointer", "reference"]),
  question("C++ Basics", "What is RAII?", "RAII means Resource Acquisition Is Initialization. Resources such as memory, files, or locks are tied to object lifetime so cleanup happens automatically in destructors.", "RAII means objects clean up resources automatically when they go out of scope.", "This is one of the most important C++ design ideas.", ["c++", "raii"]),
  question("C++ Basics", "What are constructors and destructors?", "Constructors initialize objects. Destructors run when objects are destroyed and are often used for cleanup.", "Constructors set up objects; destructors clean them up.", "The interviewer may ask how this connects to RAII.", ["c++", "constructor", "destructor"]),
  question("C++ Basics", "What is the difference between struct and class in C++?", "They are almost the same except the default access is public for struct and private for class.", "The main difference is default access level.", "This is short and factual.", ["c++", "struct", "class"]),
  question("C++ OOP", "What is polymorphism?", "Polymorphism lets code use a common interface while actual behavior depends on the concrete type, often through virtual functions.", "Polymorphism means one interface, different runtime behavior.", "This is a classic OOP question.", ["c++", "polymorphism"]),
  question("C++ OOP", "What is virtual function and why use virtual destructor?", "A virtual function supports runtime dispatch through a base-class pointer or reference. A virtual destructor ensures correct cleanup when deleting derived objects through a base pointer.", "Virtual enables runtime dispatch. Virtual destructor ensures proper cleanup through base pointers.", "Missing virtual destructors is a common bug topic.", ["c++", "virtual"]),
  question("C++ Modern", "What are smart pointers?", "Smart pointers such as unique_ptr, shared_ptr, and weak_ptr manage ownership and cleanup more safely than raw pointers.", "Smart pointers automate ownership and cleanup.", "A strong answer distinguishes unique ownership from shared ownership.", ["c++", "smart pointers"]),
  question("C++ Modern", "What is the difference between std::vector and std::array?", "std::vector is dynamically sized and heap-backed. std::array has fixed size known at compile time and behaves like a value object.", "vector is dynamic; array is fixed-size.", "Interviewers may follow up with performance and memory locality.", ["c++", "vector", "array"]),
  question("C++ Modern", "What is move semantics?", "Move semantics let resources be transferred from temporary or expiring objects instead of copied, which improves efficiency.", "Move semantics transfer ownership instead of making expensive copies.", "The keywords are rvalue reference and efficient resource transfer.", ["c++", "move semantics"]),
  question("C++ Coding", "What common coding patterns should you know in C++ interviews?", "Arrays, strings, hash maps, stacks, queues, trees, graphs, binary search, two pointers, sliding window, heaps, and dynamic programming are common.", "Know the standard problem patterns and be able to implement them cleanly in C++.", "Language syntax matters less than clear logic plus complexity analysis.", ["c++", "patterns"]),
  question("C++ Complexity", "What is the time complexity of binary search and when can you use it?", "Binary search is O(log n) and works when the search space is ordered or can be checked monotonically.", "Binary search is O(log n) on ordered or monotonic spaces.", "This is useful for both arrays and answer-space search problems.", ["c++", "binary search"]),
];

export const miniProjects: MiniProject[] = [
  {
    title: "Student Score Predictor",
    conceptLearned: "Regression, feature engineering, evaluation, and simple deployment thinking.",
    architecture: ["CSV data", "Feature processing", "Regression model", "Prediction UI"],
    folderStructure: ["data/", "notebooks/", "model/", "app/", "README.md"],
    nextSteps: [
      "Collect a slightly larger dataset.",
      "Compare linear regression with a tree-based model.",
      "Add model metrics and error analysis.",
    ],
    interviewPitch:
      "I built a regression project that predicts student scores from simple study features and used it to explain feature selection, loss, and evaluation.",
  },
  {
    title: "Spam Classifier",
    conceptLearned: "Text preprocessing, binary classification, confusion matrix, and threshold thinking.",
    architecture: ["Text dataset", "Tokenization", "Vectorizer", "Classifier", "Label prediction"],
    folderStructure: ["data/", "src/preprocess/", "src/train/", "src/app/", "tests/"],
    nextSteps: [
      "Add precision and recall tracking.",
      "Try logistic regression and naive Bayes.",
      "Create a small API endpoint for predictions.",
    ],
    interviewPitch:
      "I built a binary text classifier and used it to talk about labels, features, false positives, and practical evaluation tradeoffs.",
  },
  {
    title: "Local Document Q&A with Ollama",
    conceptLearned: "Local LLM integration, chunking, retrieval, prompting, and citation discipline.",
    architecture: ["Document upload", "Chunking", "Retrieval", "Prompt assembly", "Ollama answer"],
    folderStructure: ["documents/", "src/lib/rag.ts", "src/app/api/", "src/components/", "README.md"],
    nextSteps: [
      "Swap keyword retrieval with embeddings.",
      "Store chunks in a vector database.",
      "Add answer evaluation and feedback logging.",
    ],
    interviewPitch:
      "I built a local-first RAG app with transparent chunk retrieval and citations, which let me explain how grounded answering differs from plain prompting.",
  },
];
