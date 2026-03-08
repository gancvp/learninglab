# Student Cheat Sheet

## Core ideas

- Feature: input clue
- Label: correct answer
- Probability: how likely an event is
- Statistics: learning from observed data
- Prediction: model guess
- Error: guess minus truth
- Loss: one number for how wrong the model is
- Gradient: which way to move
- Learning rate: how big a step to take
- Mean: average
- Variance: spread around the average
- Standard deviation: square root of variance

## Interview one-liners

- AI is the broad field; ML learns from data; DL uses neural networks; GenAI creates content.
- Supervised learning uses labels. Unsupervised learning finds patterns without labels.
- Probability goes from assumptions to outcomes. Statistics goes from data back to assumptions.
- CLT means sample averages often become bell-shaped as sample size grows.
- Naive Bayes is a simple probabilistic classifier using Bayes' rule plus an independence assumption.
- PCA reduces dimensions by keeping the directions with the most variance.
- Overfitting means the model memorizes the training set too much.
- Bias is being too simple. Variance is reacting too much to the training data.
- Training updates model parameters. Inference uses the trained model on new inputs.
- Embeddings turn meaning into vectors.
- Transformers use attention to connect relevant tokens.
- RAG retrieves useful context before generating an answer.
- Tool calling lets the model use software functions instead of guessing.
- MCP is a standard way to connect models to tools and context.
- An agent can plan and use tools over multiple steps. A workflow follows a fixed script.
- WHERE filters rows before grouping; HAVING filters groups after aggregation.
- INNER JOIN keeps matches only; LEFT JOIN keeps all left rows.
- Window functions compute over related rows without collapsing them.
- In Python, list is mutable and tuple is immutable.
- In Python, `==` checks value equality and `is` checks object identity.
- In C++, pointers can be null and reassigned; references are aliases.
- In C++, RAII means resource cleanup is tied to object lifetime.

## Safe answer pattern

1. Define the term simply.
2. Give one tiny example.
3. Say why it matters in a real system.

## Good project talking points

- What was the input?
- What was the output?
- What loss or evaluation metric did you use?
- What went wrong first?
- What did you improve next?

## Final reminder

If you can explain loss, gradient descent, embeddings, RAG, tool calling, MCP, and agents in plain English, you are already ahead of many beginners.
