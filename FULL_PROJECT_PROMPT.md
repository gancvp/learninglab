# Full Project Prompt

This file captures the working product prompt that drove the current repo, plus the major follow-up expansion requests. It is intended to be checked into git so the project scope is visible without needing chat history.

## Original build prompt

Build a local-first educational web app called `AI Learning Lab` for a college final-year student preparing for entry-level AI/ML roles.

Environment and constraints:

- MacBook Air
- Ollama already running locally
- Use a stack that is easy to run locally
- Prefer a simple setup
- All AI features should work locally first using Ollama APIs where possible
- Keep the codebase beginner-friendly, well-structured, and heavily commented
- The app should feel polished, modern, and interactive, but not over-engineered
- Create a complete working MVP, not just stubs

Main teaching goals:

1. Classic ML basics
2. Neural networks basics
3. GenAI basics
4. MCP basics
5. Agents basics
6. New AI jargon with simple examples
7. Vibe-coding workflow inside VS Code / Codex

Teaching style:

- simple
- visual
- example-driven
- mathematically honest
- beginner-safe
- practical for interviews

Core product requirements:

- Home dashboard with cards for Classic ML, Neural Networks, GenAI, MCP, Agents, AI Jargon Dictionary, Mini Projects, Interview Prep
- Learning Path section
- Classic ML demos:
  - linear regression
  - logistic regression
  - train/validation/test split
  - overfitting vs underfitting
  - feature scaling
  - classification decision boundary
- Neural networks module with:
  - input layer
  - one hidden layer
  - output layer
  - forward pass
  - loss
  - gradient descent update
- Dedicated loss function and gradient descent lesson
- GenAI module with:
  - concept cards
  - local chat playground backed by Ollama
  - preset prompts
  - simple RAG demo
- MCP module with toy tool server and client flow
- Agents module with planning and step trace
- Searchable AI jargon dictionary
- Interview prep module with flashcards, quiz mode, and concise spoken-style answers
- Mini-project section with 3 beginner project blueprints

Technical implementation requirements:

- Full project structure
- README with exact run steps
- install steps
- env config examples
- charts/visualizations
- settings panel for Ollama base URL, model name, and temperature
- graceful Ollama error handling
- starter tests for key functions

Extra docs required:

1. `Teacher Notes`
2. `Student Cheat Sheet`
3. `Vibe Coding Guide`

Requested build order:

1. scaffold the project
2. implement the dashboard
3. implement the loss function + gradient descent visual module first
4. then the Ollama chat playground
5. then the jargon dictionary
6. then the remaining modules

## Follow-up curriculum expansion

Add interview-heavy fundamentals:

- probability
- statistics
- Naive Bayes
- central limit theorem
- PCA
- other commonly asked interviewer topics

Expand interview coverage:

- more AI/ML interview questions with explanation
- SQL interview preparation
- programming language coding interview prep for Python and C++

For each concept:

1. show the example
2. build sample apps and explain them
3. add playground apps as well

Add Docker support as needed for local use on the student machine.

## Judge0 integration prompt

Integrate a self-hosted coding execution service into the existing project.

Requirements:

- inspect existing repo structure and compose setup
- integrate Judge0 as a sidecar
- do not replace the app architecture
- add Judge0, Judge0 worker, Judge0 Postgres, and Judge0 Redis
- wire the main app to call Judge0 over the internal Docker network
- add env vars safely
- add backend integration for:
  - submit code
  - poll/check result
  - run sample testcases
  - normalize execution response
- keep the integration modular for:
  - attempt history
  - AI feedback on incorrect solutions
  - problem-level testcase management
  - language-specific starter templates
- keep SQL practice separate from Judge0
- add README notes for startup, architecture, and next steps

Technical preference:

- Judge0 is an isolated execution backend
- main app owns business logic, scoring, hints, and progress tracking
- execution provider should be swappable later

## Job-readiness expansion

Turn the repo into a more job-winning version by adding:

- resume-grade capstone projects
- project evaluation metrics
- recruiter-facing README polish
- progress tracking
- a 30-day placement-focused study plan inside the app

Then add:

- persistent attempt history and learning progress saved in Postgres
- one fully built flagship capstone project inside the repo

The flagship project chosen:

- `Local AI Study Assistant`

Expected characteristics:

- persistent note storage
- retrieval over saved notes
- local Ollama answering
- citations
- saved session history

## Coding-prep expansion

Expand the Judge0-backed coding runner beyond a tiny warm-up set.

Goals:

- cover the main interview patterns
- show how to approach each problem
- provide starter code
- provide reference solutions
- support both Python and C++

Important note:

The requirement was interpreted as a large FAANG-style representative bank, not a claim to include every real FAANG question ever asked.

Additional requested improvements:

- company-style sets like Amazon, Google, Meta, General FAANG
- Blind 75 / NeetCode 150 style curated tracks
- solved / unsolved markers
- hidden testcase themes

## SQL-prep expansion

Add SQL coding challenges, including:

- 15 predominantly asked SQL questions
- difficulty filters
- company-style sets
- hidden solutions until reveal
- ability to load the model answer into the live SQL playground

## Small UI request

Add a vertical bar in the left menu.

## Current repo direction

The repo now aims to be:

- a local-first AI/ML learning platform
- an interview-prep system
- a coding and SQL practice platform
- a portfolio-quality flagship project base
- a job-readiness tracker

## Maintenance note

If the project scope changes further, append new prompt sections here instead of relying only on chat history.
