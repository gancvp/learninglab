# Vibe Coding Guide

Use Codex incrementally. Do not ask for a giant rewrite unless you are ready to review a giant diff.

## Good prompting pattern

1. Start with context.
2. Ask for one change.
3. Ask Codex to explain touched files.
4. Run locally.
5. Refine based on what actually happened.

## Example prompts

- "Inspect this app and add a progress tracker to the dashboard."
- "Extend the RAG demo to support PDF text extraction, but keep the current text upload path working."
- "Add one more classic ML demo for regularization and explain it for interviews."
- "Refactor the GenAI module into smaller components without changing behavior."

## Safe extension habits

- Keep one feature per prompt.
- Ask for tests when touching utility logic.
- Ask Codex to preserve beginner-friendly comments.
- Prefer replacing MVP placeholders only after the simple version works.
- Verify local Ollama behavior after any API change.

## Good review questions

- Which files changed and why?
- What assumptions did you make?
- What edge cases did you handle?
- What should I test manually?
- What remains MVP or simplified?

## When to slow down

- If a diff touches many unrelated files.
- If local AI behavior becomes less transparent.
- If the code stops being easy for a student to follow.
