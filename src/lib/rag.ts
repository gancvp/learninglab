export type Chunk = {
  id: string;
  text: string;
};

export function chunkText(text: string, chunkSize = 280): Chunk[] {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return [];
  }

  const sentences = normalized.split(/(?<=[.!?])\s+/);
  const chunks: Chunk[] = [];
  let current = "";

  sentences.forEach((sentence) => {
    const candidate = current ? `${current} ${sentence}` : sentence;
    if (candidate.length > chunkSize && current) {
      chunks.push({
        id: `chunk-${chunks.length + 1}`,
        text: current.trim(),
      });
      current = sentence;
      return;
    }
    current = candidate;
  });

  if (current.trim()) {
    chunks.push({
      id: `chunk-${chunks.length + 1}`,
      text: current.trim(),
    });
  }

  return chunks;
}

function tokenize(text: string) {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

export function rankChunks(query: string, chunks: Chunk[]) {
  const queryTokens = tokenize(query);

  return [...chunks]
    .map((chunk) => {
      const chunkTokens = tokenize(chunk.text);
      const overlap = queryTokens.filter((token) => chunkTokens.includes(token)).length;
      return {
        ...chunk,
        score: overlap / Math.max(1, queryTokens.length),
      };
    })
    .sort((left, right) => right.score - left.score);
}
